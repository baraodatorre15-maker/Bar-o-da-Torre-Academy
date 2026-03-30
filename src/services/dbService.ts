import { supabase } from '../lib/supabase';
import { User, DashboardData, AppSettings, Activity, Grade, Schedule, NewsItem, Announcement, Payment, Exam, OnlineClass } from '../types';
import { generateTuitionPayments, generateRandomGrades } from '../storage';

/**
 * This service acts as a facade for the database operations.
 * It uses Supabase for all operations.
 */
export const dbService = {
  // Auth
  login: async (matricula: string, pass: string): Promise<User | null> => {
    console.log(`Attempting login for matricula: ${matricula}`);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('matricula', matricula)
      .eq('password', pass)
      .single();

    if (error) {
      console.error('Login error from Supabase:', error.message, error.details, error.hint);
      return null;
    }
    
    if (!data) {
      console.warn('Login failed: No user found with these credentials.');
      return null;
    }
    
    console.log('Login successful for:', data.name);
    return data as User;
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
    const { data, error } = await supabase
      .from('users')
      .insert([student])
      .select()
      .single();

    if (error) {
      console.error('Add student error:', error);
      throw error;
    }
    return data as User;
  },

  updateStudent: async (id: number, updatedData: any): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .update(updatedData)
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

    // Clear existing
    console.log(`Deleting existing data for student ${studentId}...`);
    await supabase.from('payments').delete().eq('student_id', studentId);
    await supabase.from('grades').delete().eq('student_id', studentId);

    // Generate new
    console.log(`Inserting new data for student ${studentId}...`);
    const studentPayments = generateTuitionPayments(student.id).map(({ id, ...rest }) => rest);
    const { error: payError } = await supabase.from('payments').insert(studentPayments);
    if (payError) console.error(`Error inserting payments for student ${studentId}:`, payError);

    const studentGrades = generateRandomGrades(student.id, student.course, student.semester).map(({ id, ...rest }) => rest);
    const { error: gradeError } = await supabase.from('grades').insert(studentGrades);
    if (gradeError) console.error(`Error inserting grades for student ${studentId}:`, gradeError);

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
    const [
      gradesRes,
      scheduleRes,
      newsRes,
      announcementsRes,
      paymentsRes,
      activitiesRes,
      examsRes,
      onlineClassesRes
    ] = await Promise.all([
      supabase.from('grades').select('*').eq('student_id', studentId),
      supabase.from('schedules').select('*'),
      supabase.from('news').select('*'),
      supabase.from('announcements').select('*'),
      supabase.from('payments').select('*').eq('student_id', studentId),
      supabase.from('activities').select('*').eq('student_id', studentId),
      supabase.from('exams').select('*'),
      supabase.from('online_classes').select('*')
    ]);

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
        college_name: "Faculdade Barão da Torre"
      };
    }
    return data as AppSettings;
  },

  updateAppSettings: async (settings: any): Promise<AppSettings> => {
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
    // Check if matricula already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('matricula', signUpData.matricula)
      .maybeSingle();

    if (existingUser) {
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

    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (error) {
      console.error('Sign up error:', error);
      throw error;
    }

    // Generate initial data (payments and grades)
    try {
      const studentPayments = generateTuitionPayments(data.id).map(({ id, ...rest }) => rest);
      await supabase.from('payments').insert(studentPayments);
      
      const studentGrades = generateRandomGrades(data.id, data.course, 1).map(({ id, ...rest }) => rest);
      await supabase.from('grades').insert(studentGrades);
    } catch (genError) {
      console.error('Error generating initial data for new student:', genError);
    }

    return data as User;
  }
};
