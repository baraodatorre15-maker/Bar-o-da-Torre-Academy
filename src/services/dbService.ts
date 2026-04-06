import { supabase } from '../lib/supabase';
import { User, DashboardData, AppSettings, Activity, Grade, Schedule, NewsItem, Announcement, Payment, Exam, OnlineClass } from '../types';
import { generateTuitionPayments, generateRandomGrades, generateExamsForStudent, db } from '../storage';

const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * This service acts as a facade for the database operations.
 * It uses Supabase for all operations.
 */
export const dbService = {
  // Auth
  login: async (matricula: string, pass: string): Promise<User | null> => {
    if (!supabase) {
      console.error('Supabase client is not initialized. Cannot perform login.');
      return null;
    }
    console.log(`Attempting login for matricula: ${matricula}`);
    // Case-insensitive search for matricula
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .ilike('matricula', matricula)
      .eq('password', pass)
      .single();

    console.log('Supabase response:', { data, error });

    if (error) {
      if (error.code === 'PGRST116') {
        console.warn(`Login failed: No user found with matricula ${matricula} and the provided password.`);
        throw new Error("AUTH_ERROR: Matrícula ou senha incorretos.");
      }
      if (error.message?.includes('relation "users" does not exist')) {
        console.error('Supabase table "users" is missing. Please run the SQL migration.');
        throw new Error("AUTH_ERROR: Erro de configuração: Tabela 'users' não encontrada no Supabase.");
      }
      console.error('Login error from Supabase:', error.message, error.details, error.hint, error.code);
      throw new Error(error.message || "Erro de conexão com o banco de dados.");
    }
    
    if (!data) {
      console.warn('Login failed: No user found with these credentials.');
      throw new Error("AUTH_ERROR: Matrícula ou senha incorretos.");
    }
    
    console.log('Login successful for:', data.name);
    return data as User;
  },

  // Online Classes
  getOnlineClasses: async (): Promise<OnlineClass[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('online_classes')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Get online classes error:', error);
      return [];
    }
    return data as OnlineClass[];
  },

  addOnlineClass: async (onlineClass: any): Promise<OnlineClass> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    console.log('Supabase: Adding online class:', onlineClass);
    const { data, error } = await supabase
      .from('online_classes')
      .insert([onlineClass])
      .select()
      .single();

    if (error) {
      console.error('Supabase: Add online class error:', error);
      throw error;
    }
    console.log('Supabase: Online class added successfully:', data);
    return data as OnlineClass;
  },

  updateOnlineClass: async (id: number, onlineClass: any): Promise<OnlineClass> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    console.log(`Supabase: Updating online class ${id}:`, onlineClass);
    const { data, error } = await supabase
      .from('online_classes')
      .update(onlineClass)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase: Update online class error:', error);
      throw error;
    }
    console.log('Supabase: Online class updated successfully:', data);
    return data as OnlineClass;
  },

  deleteOnlineClass: async (id: number): Promise<void> => {
    if (!supabase) return db.deleteOnlineClass(id);
    const { error } = await supabase
      .from('online_classes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete online class error:', error);
      throw error;
    }
  },

  // Disciplines
  getDisciplines: async (): Promise<Schedule[]> => {
    if (!supabase) return db.getDisciplines();
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Get disciplines error:', error);
      return db.getDisciplines();
    }
    return data as Schedule[];
  },

  addDiscipline: async (discipline: any): Promise<Schedule> => {
    console.log('dbService: addDiscipline', discipline);
    if (!supabase) return db.addDiscipline(discipline);
    const { data, error } = await supabase
      .from('schedules')
      .insert([discipline])
      .select()
      .single();

    if (error) {
      console.error('Add discipline error:', error);
      throw error;
    }
    console.log('dbService: addDiscipline success', data);
    return data as Schedule;
  },

  updateDiscipline: async (id: number, discipline: any): Promise<Schedule> => {
    console.log('dbService: updateDiscipline', id, discipline);
    if (!supabase) return db.updateDiscipline(id, discipline);
    const { data, error } = await supabase
      .from('schedules')
      .update(discipline)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update discipline error:', error);
      throw error;
    }
    console.log('dbService: updateDiscipline success', data);
    return data as Schedule;
  },

  deleteDiscipline: async (id: number): Promise<void> => {
    if (!supabase) return db.deleteDiscipline(id);
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete discipline error:', error);
      throw error;
    }
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      console.error('Get user by email error:', error);
      return null;
    }
    return data as User;
  },

  // Students
  getStudents: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'student');

    if (error) {
      console.error('Get students error:', error);
      return [];
    }
    return data as User[];
  },

  addStudent: async (student: any): Promise<User> => {
    const { photo_url, enrollment_proof_url, ...rest } = student;
    
    // 1. Insert student first to get ID
    const { data, error } = await supabase
      .from('users')
      .insert([rest])
      .select()
      .single();

    if (error) {
      console.error('Add student error:', error);
      throw error;
    }

    const newStudent = data as User;
    let finalPhotoUrl = photo_url;
    let finalProofUrl = enrollment_proof_url;
    let finalProofUrls = student.enrollment_proof_urls;

    // 2. Handle photo upload if it's a data URL
    if (photo_url && photo_url.startsWith('data:')) {
      try {
        const fileExt = photo_url.split(';')[0].split('/')[1];
        const file = dataURLtoFile(photo_url, `${newStudent.id}.${fileExt}`);
        finalPhotoUrl = await dbService.uploadFile('student-photos', `avatars/${newStudent.id}.${fileExt}`, file);
      } catch (uploadError) {
        console.error('Error uploading photo in addStudent:', uploadError);
      }
    }

    // 3. Handle enrollment proof upload if it's a data URL
    if (enrollment_proof_url && enrollment_proof_url.startsWith('data:')) {
      try {
        const fileExt = enrollment_proof_url.split(';')[0].split('/')[1];
        const file = dataURLtoFile(enrollment_proof_url, `proof_${newStudent.id}.${fileExt}`);
        finalProofUrl = await dbService.uploadFile('student-photos', `proofs/${newStudent.id}.${fileExt}`, file);
      } catch (uploadError) {
        console.error('Error uploading proof in addStudent:', uploadError);
      }
    }

    // 4. Handle enrollment proof urls map if it exists
    if (student.enrollment_proof_urls) {
      finalProofUrls = { ...student.enrollment_proof_urls };
      for (const themeId in finalProofUrls) {
        const url = finalProofUrls[themeId];
        if (url && url.startsWith('data:')) {
          try {
            const fileExt = url.split(';')[0].split('/')[1];
            const file = dataURLtoFile(url, `proof_${newStudent.id}_${themeId}.${fileExt}`);
            finalProofUrls[themeId] = await dbService.uploadFile('student-photos', `proofs/${newStudent.id}_${themeId}.${fileExt}`, file);
          } catch (uploadError) {
            console.error(`Error uploading proof for theme ${themeId} in addStudent:`, uploadError);
          }
        }
      }
    }

    // 5. Update student with final URLs if they changed
    if (finalPhotoUrl !== photo_url || finalProofUrl !== enrollment_proof_url || finalProofUrls !== student.enrollment_proof_urls) {
      const { data: updatedData, error: updateError } = await supabase
        .from('users')
        .update({ 
          photo_url: finalPhotoUrl, 
          enrollment_proof_url: finalProofUrl,
          enrollment_proof_urls: finalProofUrls
        })
        .eq('id', newStudent.id)
        .select()
        .single();
      
      if (!updateError) return updatedData as User;
    }

    return newStudent;
  },

  updateStudent: async (id: number, updatedData: any): Promise<User> => {
    let finalPhotoUrl = updatedData.photo_url;
    let finalProofUrl = updatedData.enrollment_proof_url;
    let finalProofUrls = updatedData.enrollment_proof_urls;

    // 1. Handle photo upload if it's a data URL
    if (updatedData.photo_url && updatedData.photo_url.startsWith('data:')) {
      try {
        const fileExt = updatedData.photo_url.split(';')[0].split('/')[1];
        const file = dataURLtoFile(updatedData.photo_url, `${id}.${fileExt}`);
        finalPhotoUrl = await dbService.uploadFile('student-photos', `avatars/${id}.${fileExt}`, file);
      } catch (uploadError) {
        console.error('Error uploading photo in updateStudent:', uploadError);
      }
    }

    // 2. Handle enrollment proof upload if it's a data URL
    if (updatedData.enrollment_proof_url && updatedData.enrollment_proof_url.startsWith('data:')) {
      try {
        const fileExt = updatedData.enrollment_proof_url.split(';')[0].split('/')[1];
        const file = dataURLtoFile(updatedData.enrollment_proof_url, `proof_${id}.${fileExt}`);
        finalProofUrl = await dbService.uploadFile('student-photos', `proofs/${id}.${fileExt}`, file);
      } catch (uploadError) {
        console.error('Error uploading proof in updateStudent:', uploadError);
      }
    }

    // 3. Handle enrollment proof urls map if it exists
    if (updatedData.enrollment_proof_urls) {
      finalProofUrls = { ...updatedData.enrollment_proof_urls };
      for (const themeId in finalProofUrls) {
        const url = finalProofUrls[themeId];
        if (url && url.startsWith('data:')) {
          try {
            const fileExt = url.split(';')[0].split('/')[1];
            const file = dataURLtoFile(url, `proof_${id}_${themeId}.${fileExt}`);
            finalProofUrls[themeId] = await dbService.uploadFile('student-photos', `proofs/${id}_${themeId}.${fileExt}`, file);
          } catch (uploadError) {
            console.error(`Error uploading proof for theme ${themeId} in updateStudent:`, uploadError);
          }
        }
      }
    }

    const dataToUpdate = { 
      ...updatedData, 
      photo_url: finalPhotoUrl,
      enrollment_proof_url: finalProofUrl,
      enrollment_proof_urls: finalProofUrls
    };

    const { data, error } = await supabase
      .from('users')
      .update(dataToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update student error:', error);
      throw error;
    }
    return data as User;
  },

  generateAllFictionalData: async (): Promise<number> => {
    console.log('Starting generateAllFictionalData...');
    const { data: students, error: studentsError } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'student');

    if (studentsError) {
      console.error('Error fetching students for data generation:', studentsError);
      throw studentsError;
    }

    if (!students || students.length === 0) {
      console.warn('No students found to generate data for.');
      return 0;
    }

    console.log(`Found ${students.length} students. Checking data...`);
    let updatedCount = 0;
    for (const student of students) {
      // Check if student has payments
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('id')
        .eq('student_id', student.id)
        .limit(1);

      if (paymentsError) {
        console.error(`Error checking payments for student ${student.id}:`, paymentsError);
        continue;
      }

      if (!payments || payments.length === 0) {
        console.log(`Generating payments for student ${student.id}...`);
        const studentPayments = generateTuitionPayments(student.id).map(({ id, ...rest }) => rest);
        const { error: insertError } = await supabase.from('payments').insert(studentPayments);
        if (insertError) {
          console.error(`Error inserting payments for student ${student.id}:`, insertError);
        } else {
          updatedCount++;
        }
      }

      // Check if student has grades
      const { data: grades, error: gradesError } = await supabase
        .from('grades')
        .select('id')
        .eq('student_id', student.id)
        .limit(1);

      if (gradesError) {
        console.error(`Error checking grades for student ${student.id}:`, gradesError);
        continue;
      }

      if (!grades || grades.length === 0) {
        console.log(`Generating grades for student ${student.id}...`);
        const studentGrades = generateRandomGrades(student.id, student.course, student.semester).map(({ id, ...rest }) => rest);
        const { error: insertError } = await supabase.from('grades').insert(studentGrades);
        if (insertError) {
          console.error(`Error inserting grades for student ${student.id}:`, insertError);
        } else {
          updatedCount++;
        }
      }
    }
    console.log(`Generation finished. Updated count: ${updatedCount}`);
    return updatedCount;
  },

  generateStudentFictionalData: async (studentId: number): Promise<boolean> => {
    console.log(`Regenerating data for student ${studentId}...`);
    const { data: student, error: studentError } = await supabase
      .from('users')
      .select('*')
      .eq('id', studentId)
      .single();

    if (studentError) {
      console.error(`Error fetching student ${studentId}:`, studentError);
      throw studentError;
    }

    const semesterNum = Number(student.semester) || 1;

    // Clear existing student-specific data
    console.log(`Deleting existing data for student ${studentId}...`);
    await supabase.from('payments').delete().eq('student_id', studentId);
    await supabase.from('grades').delete().eq('student_id', studentId);

    // Generate new
    console.log(`Inserting new data for student ${studentId} (Semester ${semesterNum})...`);
    const studentPayments = generateTuitionPayments(student.id, semesterNum).map(({ id, ...rest }) => rest);
    const { error: payError } = await supabase.from('payments').insert(studentPayments);
    if (payError) console.error(`Error inserting payments for student ${studentId}:`, payError);

    const studentGrades = generateRandomGrades(student.id, student.course, semesterNum).map(({ id, ...rest }) => rest);
    const { error: gradeError } = await supabase.from('grades').insert(studentGrades);
    if (gradeError) console.error(`Error inserting grades for student ${studentId}:`, gradeError);

    // For exams, we generate them for the course if they don't exist or just add them
    // To avoid duplicates in a real app we'd check, but for this "Generate Data" feature we'll just add them
    console.log(`Generating exams for course ${student.course}...`);
    const studentExams = generateExamsForStudent(student.id, student.course, semesterNum).map(({ id, ...rest }) => rest);
    const { error: examError } = await supabase.from('exams').insert(studentExams);
    if (examError) console.error(`Error inserting exams for student ${studentId}:`, examError);

    console.log(`Regeneration finished for student ${studentId}.`);
    return true;
  },

  getPayments: async (): Promise<Payment[]> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*');

    if (error) {
      console.error('Get payments error:', error);
      return [];
    }
    return data as Payment[];
  },

  // Dashboard
  getStudentDashboard: async (studentId: number): Promise<DashboardData> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');

    const results = await Promise.all([
      supabase.from('grades').select('*').eq('student_id', studentId),
      supabase.from('schedules').select('*'),
      supabase.from('news').select('*'),
      supabase.from('announcements').select('*'),
      supabase.from('payments').select('*').eq('student_id', studentId),
      supabase.from('activities').select('*').eq('student_id', studentId),
      supabase.from('exams').select('*'),
      supabase.from('online_classes').select('*')
    ]);

    for (const res of results) {
      if (res.error) {
        console.error('Dashboard fetch error:', res.error);
        throw res.error;
      }
    }

    const [
      gradesRes,
      scheduleRes,
      newsRes,
      announcementsRes,
      paymentsRes,
      activitiesRes,
      examsRes,
      onlineClassesRes
    ] = results;

    return {
      grades: (gradesRes.data || []) as Grade[],
      schedule: (scheduleRes.data || []) as Schedule[],
      news: (newsRes.data || []) as NewsItem[],
      announcements: (announcementsRes.data || []) as Announcement[],
      payments: (paymentsRes.data || []) as Payment[],
      activities: (activitiesRes.data || []) as Activity[],
      exams: (examsRes.data || []) as Exam[],
      online_classes: (onlineClassesRes.data || []) as OnlineClass[]
    };
  },

  // Payments
  updatePayment: async (id: number, payment: any): Promise<Payment> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    const { data, error } = await supabase
      .from('payments')
      .update(payment)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update payment error:', error);
      throw error;
    }
    return data as Payment;
  },

  // Exam Management
  getExams: async (): Promise<Exam[]> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Fetch exams error:', error);
      return [];
    }
    return data as Exam[];
  },

  addExam: async (exam: Omit<Exam, 'id'>): Promise<Exam | null> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    const { data, error } = await supabase
      .from('exams')
      .insert([exam])
      .select()
      .single();

    if (error) {
      console.error('Add exam error:', error);
      return null;
    }
    return data as Exam;
  },

  updateExam: async (examId: number, exam: Partial<Exam>): Promise<boolean> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    const { error } = await supabase
      .from('exams')
      .update(exam)
      .eq('id', examId);

    if (error) {
      console.error('Update exam error:', error);
      return false;
    }
    return true;
  },

  deleteExam: async (examId: number): Promise<boolean> => {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', examId);

    if (error) {
      console.error('Delete exam error:', error);
      return false;
    }
    return true;
  },

  // Activities
  addActivity: async (activity: any): Promise<Activity> => {
    const { data, error } = await supabase
      .from('activities')
      .insert([activity])
      .select()
      .single();

    if (error) {
      console.error('Add activity error:', error);
      throw error;
    }
    return data as Activity;
  },

  // Settings
  getAppSettings: async (): Promise<AppSettings> => {
    if (!supabase) {
      console.warn('Supabase client is not initialized. Returning default settings.');
      return {
        logo_url: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
        primary_color: "#1fbba6",
        secondary_color: "#0066cc",
        theme: "barao",
        college_name: "Barão da Torre Academy"
      };
    }
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Get app settings error:', error);
      // Return default settings if not found
      return {
        logo_url: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
        primary_color: "#1e3a8a",
        secondary_color: "#3b82f6",
        theme: "barao",
        college_name: "Barão da Torre Academy"
      };
    }
    return data as AppSettings;
  },

  updateAppSettings: async (settings: any): Promise<AppSettings> => {
    if (!supabase) {
      console.error('Supabase client is not initialized. Cannot update settings.');
      return settings;
    }
    // We assume there's only one row in app_settings, or we update the first one
    const { data: currentSettings } = await supabase.from('app_settings').select('id').single();
    
    let result;
    if (currentSettings) {
      result = await supabase
        .from('app_settings')
        .update(settings)
        .eq('id', currentSettings.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('app_settings')
        .insert([settings])
        .select()
        .single();
    }

    if (result.error) {
      console.error('Update app settings error:', result.error);
      throw result.error;
    }
    return result.data as AppSettings;
  },

  // Storage
  uploadFile: async (bucket: string, path: string, file: File): Promise<string> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload file error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  },

  deleteFile: async (bucket: string, path: string): Promise<void> => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  },

  signUp: async (signUpData: any): Promise<User> => {
    console.log("remoteDB.signUp started", signUpData);
    // Check if matricula already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('matricula', signUpData.matricula)
      .maybeSingle();

    if (existingUser) {
      console.warn("Matricula already exists in remote DB:", signUpData.matricula);
      throw new Error('Esta matrícula já está cadastrada.');
    }

    // Insert new user with blocked status
    const newUser = {
      ...signUpData,
      role: 'student',
      status: 'blocked',
      semester: '1',
      regularity: 'Regular',
      enrollment_date: new Date().toISOString().split('T')[0],
      validity: '12/2026',
      photo_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${signUpData.matricula}`
    };

    console.log("Inserting new user into remote DB...", newUser);
    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (error) {
      console.error('Sign up error in remote DB (insert user):', error);
      throw error;
    }

    console.log("User inserted successfully. ID:", data.id, "Generating initial data...");
    // Generate initial data (payments, grades and exams)
    try {
      const semesterNum = Number(data.semester) || 1;
      
      console.log("Generating payments for semester:", semesterNum);
      const studentPayments = generateTuitionPayments(data.id, semesterNum).map(({ id, ...rest }) => rest);
      const { error: payError } = await supabase.from('payments').insert(studentPayments);
      if (payError) console.error("Error inserting payments:", payError);
      
      console.log("Generating grades...");
      const studentGrades = generateRandomGrades(data.id, data.course, semesterNum).map(({ id, ...rest }) => rest);
      const { error: gradeError } = await supabase.from('grades').insert(studentGrades);
      if (gradeError) console.error("Error inserting grades:", gradeError);

      console.log("Generating exams...");
      const studentExams = generateExamsForStudent(data.id, data.course, semesterNum).map(({ id, ...rest }) => rest);
      const { error: examError } = await supabase.from('exams').insert(studentExams);
      if (examError) console.error("Error inserting exams:", examError);
      
      console.log("Initial data generation step completed");
    } catch (genError) {
      console.error('Error in initial data generation block:', genError);
    }

    console.log("remoteDB.signUp finished successfully");
    return data as User;
  },

  bootstrapDatabase: async (initialData: any) => {
    if (!supabase) return;
    console.log("Bootstrapping remote database with initial data...");
    
    // Helper to handle upsert errors
    const upsertTable = async (table: string, data: any[], conflictColumn: string = 'id') => {
      console.log(`Upserting ${data.length} rows into ${table}...`);
      const { error } = await supabase.from(table).upsert(data, { onConflict: conflictColumn });
      if (error) {
        console.error(`Error bootstrapping ${table}:`, error);
        throw new Error(`Erro na tabela ${table}: ${error.message}`);
      }
      else console.log(`Successfully bootstrapped ${table}`);
    };

    try {
      // 1. Users
      await upsertTable('users', initialData.users.map(({ id, ...rest }: any) => rest), 'matricula');

      // 2. Schedules (from disciplines)
      if (initialData.disciplines) {
        await upsertTable('schedules', initialData.disciplines.map(({ id, ...rest }: any) => rest));
      }

      // 3. Announcements
      await upsertTable('announcements', initialData.announcements.map(({ id, ...rest }: any) => rest));

      // 4. News
      await upsertTable('news', initialData.news.map(({ id, ...rest }: any) => rest));

      // 5. Online Classes
      await upsertTable('online_classes', initialData.online_classes.map(({ id, ...rest }: any) => rest));

      // 6. Exams
      await upsertTable('exams', initialData.exams.map(({ id, ...rest }: any) => rest));

      // 7. App Settings
      await upsertTable('app_settings', [{ 
        id: 1, 
        college_name: "Barão da Torre Academy",
        theme: "barao",
        primary_color: "#1fbba6",
        secondary_color: "#0066cc"
      }]);

      console.log("Bootstrap finished successfully.");
    } catch (err: any) {
      console.error("Bootstrap failed:", err);
      throw err;
    }
  }
};
