import React, { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  Lock, 
  LayoutDashboard, 
  GraduationCap, 
  Calendar, 
  Bell, 
  Wallet, 
  FileCheck, 
  CreditCard, 
  LogOut,
  ChevronRight,
  ChevronLeft,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  QrCode,
  ArrowLeft,
  Upload,
  Search,
  Settings,
  Users,
  BookOpen,
  DollarSign,
  Copy,
  Mail,
  Wifi,
  Loader2,
  Monitor,
  Video,
  ClipboardList,
  ExternalLink,
  Menu,
  MessageCircle,
  FileText,
  FileDigit,
  Layers,
  MonitorPlay,
  FileEdit,
  Library,
  Fingerprint,
  LogIn,
  MessageSquare,
  FolderOpen,
  Wrench,
  Home,
  UserSquare2,
  Link,
  RefreshCw,
  X,
  UserPlus,
  Edit2,
  Trash2
} from "lucide-react";
import { validateCPF, formatCPF } from "./utils/validation";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { resetDB, COURSES, db as localDB, initialData } from "./storage";
import { supabase, isSupabaseConfigured } from "./lib/supabase";
import { dbService as remoteDB } from "./services/dbService";
import { User, DashboardData, AppSettings, Grade, Schedule, Announcement, Payment, Activity, Exam, OnlineClass, NewsItem } from "./types";

const db = isSupabaseConfigured ? remoteDB : localDB;

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getCollegeName = (settings: AppSettings | null) => {
  const name = settings?.college_name || "Barão da Torre Academy";
  if (name === "Barão de Mauá" || name === "Barão da Torre") return "Barão da Torre Academy";
  return name;
};

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";

interface LoginViewProps {
  appSettings: AppSettings | null;
  handleLogin: (e: React.FormEvent) => void;
  matricula: string;
  setMatricula: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  error: string;
  loading: boolean;
  onForgotClick: () => void;
  onSignUpClick: () => void;
}

const LoginView = ({ appSettings, handleLogin, matricula, setMatricula, password, setPassword, error, loading, onForgotClick, onSignUpClick }: LoginViewProps) => {
  console.log("LoginView rendering...");
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920)' }}
      >
        <div className="absolute inset-0 bg-[#00678a]/80 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="w-24 h-24 bg-white p-3 rounded-3xl shadow-2xl">
            <img src={appSettings?.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-tight">
              {getCollegeName(appSettings)}
            </h1>
            <div className="h-px w-12 bg-white/30 mx-auto my-2" />
            <h2 className="text-sm font-bold text-white/80 uppercase tracking-[0.4em]">Bem-vindo</h2>
          </div>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* Matricula Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <UserIcon className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              className="w-full bg-white h-12 pl-10 pr-10 rounded-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
              placeholder="Matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <input 
              type="password" 
              className="w-full bg-white h-12 pl-10 pr-10 rounded-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-2">
            <button type="button" onClick={onForgotClick} className="text-xs text-white/70 hover:text-white transition-colors underline underline-offset-2 text-right">
              Esqueci minha senha/matrícula
            </button>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-500/20 border border-red-500/50 text-white rounded-lg text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="pt-6 space-y-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-[#00a2b1] hover:bg-[#00c2d1] text-white font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,162,177,0.3)] transition-all active:scale-95 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
            </button>

            <button 
              type="button"
              onClick={onSignUpClick}
              className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 flex items-center justify-center"
            >
              Inscrição
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

interface AdminDashboardProps {
  appSettings: any;
  setAppSettings: (val: any) => void;
  handleLogout: () => void;
  setShowToast: (val: any) => void;
}

const AdminNavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 p-3 transition-all",
      active ? "bg-white/20 text-white font-bold rounded-xl" : "text-white/60 hover:bg-white/5 hover:text-white rounded-xl"
    )}
  >
    {React.cloneElement(icon, { size: 20 })}
    <span className="font-semibold">{label}</span>
  </button>
);

const AdminDashboard = ({ appSettings, setAppSettings, handleLogout, setShowToast }: AdminDashboardProps) => {
  const [students, setStudents] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState("students");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOnlineClassModal, setShowOnlineClassModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [editingOnlineClass, setEditingOnlineClass] = useState<OnlineClass | null>(null);
  const [onlineClasses, setOnlineClasses] = useState<OnlineClass[]>([]);
  const [disciplines, setDisciplines] = useState<Schedule[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [generatingData, setGeneratingData] = useState(false);

  // Discipline Form State
  const [showDisciplineModal, setShowDisciplineModal] = useState(false);
  const [editingDiscipline, setEditingDiscipline] = useState<Schedule | null>(null);
  const [dName, setDName] = useState("");
  const [dProfessor, setDProfessor] = useState("");
  const [dRoom, setDRoom] = useState("");
  const [dDay, setDDay] = useState("Segunda-feira");
  const [dTime, setDTime] = useState("");
  const [dCourses, setDCourses] = useState<string[]>([]);

  // Online Class Form State
  const [ocDisciplineId, setOcDisciplineId] = useState<number | "">("");
  const [ocDisciplineName, setOcDisciplineName] = useState("");
  const [ocCourses, setOcCourses] = useState<string[]>([]);
  const [ocLink, setOcLink] = useState("");
  const [ocDate, setOcDate] = useState("");
  const [ocDayOfWeek, setOcDayOfWeek] = useState("Segunda-feira");
  const [ocTime, setOcTime] = useState("");
  const [ocMandatory, setOcMandatory] = useState(true);

  // Exam Form State
  const [showExamModal, setShowExamModal] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [exDisciplineId, setExDisciplineId] = useState<number | "">("");
  const [exDisciplineName, setExDisciplineName] = useState("");
  const [exCourses, setExCourses] = useState<string[]>([]);
  const [exLink, setExLink] = useState("");
  const [exDate, setExDate] = useState("");
  const [exTime, setExTime] = useState("");
  const [exType, setExType] = useState("P1");
  
  const handleToggleStatus = async (student: User) => {
    try {
      const newStatus = student.status === 'blocked' ? 'active' : 'blocked';
      await db.updateStudent(student.id, { status: newStatus });
      fetchStudents();
      setShowToast({ show: true, message: "Status do aluno atualizado!", type: 'success' });
    } catch (error) {
      alert("Erro ao atualizar status do aluno");
    }
  };
  
  // New/Edit Student Form
  const [newName, setNewName] = useState("");
  const [newMatricula, setNewMatricula] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newSemester, setNewSemester] = useState("1");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newValidity, setNewValidity] = useState("12/2026");
  const [newRegularity, setNewRegularity] = useState("Regular");
  const [isUploading, setIsUploading] = useState(false);
  const [newCpf, setNewCpf] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newEnrollmentDate, setNewEnrollmentDate] = useState("");
  const [newBirthState, setNewBirthState] = useState("");
  const [newNationality, setNewNationality] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newMaritalStatus, setNewMaritalStatus] = useState("");
  const [newShortName, setNewShortName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEnrollmentProofUrls, setNewEnrollmentProofUrls] = useState<any>({
    barao: "",
    retro: "",
    uni: "",
    uniplan: "",
    modern: ""
  });

  const [isSaving, setIsSaving] = useState(false);

  const fetchStudents = async () => {
    try {
      const studentsData = await db.getStudents();
      setStudents(studentsData || []);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchPayments = async () => {
    try {
      const paymentsData = await db.getPayments();
      setPayments(paymentsData || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  const fetchOnlineClasses = async () => {
    try {
      const data = await db.getOnlineClasses();
      setOnlineClasses(data || []);
    } catch (err) {
      console.error("Error fetching online classes:", err);
    }
  };

  const fetchDisciplines = async () => {
    console.log("Fetching disciplines...");
    try {
      const data = await db.getDisciplines();
      console.log("Disciplines fetched:", data);
      setDisciplines(data || []);
    } catch (err) {
      console.error("Error fetching disciplines:", err);
    }
  };

  const fetchExams = async () => {
    try {
      const data = await db.getExams();
      setExams(data || []);
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  useEffect(() => {
    console.log("AdminDashboard mounted. Supabase configured:", isSupabaseConfigured);
    fetchStudents();
    fetchPayments();
    fetchOnlineClasses();
    fetchDisciplines();
    fetchExams();
  }, []);

  const handleOpenEditOnlineClass = (oc: OnlineClass) => {
    setEditingOnlineClass(oc);
    setOcDisciplineId(oc.discipline_id);
    setOcDisciplineName(oc.discipline_name);
    setOcCourses(oc.course ? (Array.isArray(oc.course) ? oc.course : [oc.course]) : []);
    setOcLink(oc.link);
    setOcDate(oc.date);
    setOcDayOfWeek(oc.day_of_week || "Segunda-feira");
    setOcTime(oc.time);
    setOcMandatory(oc.mandatory);
    setShowOnlineClassModal(true);
  };

  const handleCloseOnlineClassModal = () => {
    setShowOnlineClassModal(false);
    setEditingOnlineClass(null);
    setOcDisciplineId("");
    setOcDisciplineName("");
    setOcCourses([]);
    setOcLink("");
    setOcDate("");
    setOcDayOfWeek("Segunda-feira");
    setOcTime("");
    setOcMandatory(true);
  };

  const handleOpenEditDiscipline = (d: Schedule) => {
    setEditingDiscipline(d);
    setDName(d.name);
    setDProfessor(d.professor);
    setDRoom(d.room);
    setDDay(d.day_of_week);
    setDTime(d.time);
    setDCourses(Array.isArray(d.course) ? d.course : d.course ? [d.course] : []);
    setShowDisciplineModal(true);
  };

  const handleCloseDisciplineModal = () => {
    setShowDisciplineModal(false);
    setEditingDiscipline(null);
    setDName("");
    setDProfessor("");
    setDRoom("");
    setDDay("Segunda-feira");
    setDTime("");
    setDCourses([]);
  };

  const handleOpenEditExam = (e: Exam) => {
    setEditingExam(e);
    setExDisciplineId(e.discipline_id);
    setExDisciplineName(e.discipline_name);
    setExCourses(e.course ? (Array.isArray(e.course) ? e.course : [e.course]) : []);
    setExLink(e.link || "");
    setExDate(e.date);
    setExTime(e.time);
    setExType(e.type);
    setShowExamModal(true);
  };

  const handleCloseExamModal = () => {
    setShowExamModal(false);
    setEditingExam(null);
    setExDisciplineId("");
    setExDisciplineName("");
    setExCourses([]);
    setExLink("");
    setExDate("");
    setExTime("");
    setExType("P1");
  };

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure course is a string if it's an array, as the DB likely expects a string based on initialData
      const courseValue = Array.isArray(exCourses) ? exCourses.join(', ') : (exCourses || "");
      
      const examData = {
        discipline_id: Number(exDisciplineId),
        discipline_name: exDisciplineName,
        course: courseValue,
        link: exLink,
        date: exDate,
        time: exTime,
        type: exType
      };

      if (editingExam) {
        await db.updateExam(editingExam.id, examData);
        setShowToast({ show: true, message: "Prova atualizada!", type: 'success' });
      } else {
        await db.addExam(examData);
        setShowToast({ show: true, message: "Prova agendada!", type: 'success' });
      }
      handleCloseExamModal();
      fetchExams();
    } catch (err) {
      console.error("Error saving exam:", err);
      alert("Erro ao salvar prova");
    }
  };

  const handleDeleteExam = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esta prova?")) {
      try {
        await db.deleteExam(id);
        fetchExams();
        setShowToast({ show: true, message: "Prova excluída!", type: 'success' });
      } catch (err) {
        console.error("Error deleting exam:", err);
      }
    }
  };

  const handleSaveDiscipline = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving discipline...", { dName, dProfessor, dRoom, dDay, dTime, dCourses });
    try {
      // Ensure course is a string if it's an array
      const courseValue = Array.isArray(dCourses) ? dCourses.join(', ') : (dCourses || "");
      
      const dData = {
        name: dName,
        professor: dProfessor,
        room: dRoom,
        day_of_week: dDay,
        time: dTime,
        course: courseValue
      };

      if (editingDiscipline) {
        console.log("Updating existing discipline:", editingDiscipline.id);
        await db.updateDiscipline(editingDiscipline.id, dData);
      } else {
        console.log("Adding new discipline");
        await db.addDiscipline(dData);
      }
      handleCloseDisciplineModal();
      fetchDisciplines();
      setShowToast({ show: true, message: "Disciplina salva com sucesso!", type: 'success' });
    } catch (err) {
      console.error("Error saving discipline:", err);
      setShowToast({ show: true, message: "Erro ao salvar disciplina: " + (err instanceof Error ? err.message : String(err)), type: 'error' });
    }
  };

  const handleDeleteDiscipline = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta disciplina?")) {
      try {
        await db.deleteDiscipline(id);
        fetchDisciplines();
        setShowToast({ show: true, message: "Disciplina excluída com sucesso!", type: 'success' });
      } catch (err) {
        setShowToast({ show: true, message: "Erro ao excluir disciplina.", type: 'error' });
      }
    }
  };

  const handleSaveOnlineClass = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSaveOnlineClass triggered");
    console.log("Form State:", { ocDisciplineId, ocDisciplineName, ocCourses, ocLink, ocDayOfWeek, ocTime });
    
    if (!ocDisciplineId || ocDisciplineId === 0) {
      setShowToast({ show: true, message: "Por favor, selecione uma disciplina.", type: 'error' });
      return;
    }

    if (!ocLink) {
      setShowToast({ show: true, message: "Por favor, insira o link da aula.", type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      // Ensure course is a string if it's an array, as the DB likely expects a string based on initialData
      const courseValue = Array.isArray(ocCourses) ? ocCourses.join(', ') : (ocCourses || "");
      
      const ocData = {
        discipline_id: Number(ocDisciplineId),
        discipline_name: ocDisciplineName,
        course: courseValue,
        link: ocLink,
        date: ocDate || new Date().toISOString().split('T')[0],
        time: ocTime,
        mandatory: ocMandatory,
        day_of_week: ocDayOfWeek
      };

      console.log("Saving Online Class Data:", ocData);
      
      if (editingOnlineClass) {
        console.log("Updating online class ID:", editingOnlineClass.id);
        await db.updateOnlineClass(editingOnlineClass.id, ocData);
        setShowToast({ show: true, message: "Aula online atualizada com sucesso!", type: 'success' });
      } else {
        console.log("Adding new online class...");
        const result = await db.addOnlineClass(ocData);
        console.log("Add result:", result);
        setShowToast({ show: true, message: "Aula online cadastrada com sucesso!", type: 'success' });
      }
      
      console.log("Save successful, closing modal and fetching data...");
      handleCloseOnlineClassModal();
      fetchOnlineClasses();
    } catch (err: any) {
      console.error("Error saving online class:", err);
      setShowToast({ show: true, message: "Erro ao salvar aula online: " + (err.message || "Erro desconhecido"), type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteOnlineClass = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta aula?")) {
      try {
        await db.deleteOnlineClass(id);
        fetchOnlineClasses();
        setShowToast({ show: true, message: "Aula excluída com sucesso!", type: 'success' });
      } catch (err) {
        setShowToast({ show: true, message: "Erro ao excluir aula.", type: 'error' });
      }
    }
  };

  const handleOpenEdit = (student: User) => {
    setEditingStudent(student);
    setNewName(student.name);
    setNewMatricula(student.matricula);
    setNewPassword(student.password || "");
    setNewCourse(student.course || "");
    setNewSemester(String(student.semester || 1));
    setNewPhotoUrl(student.photo_url || "");
    setNewValidity(student.validity || "12/2026");
    setNewRegularity(student.regularity || "Regular");
    setNewCpf(student.cpf || "");
    setNewBirthDate(formatDate(student.birth_date) || "");
    setNewEnrollmentDate(formatDate(student.enrollment_date) || "");
    setNewBirthState(student.birth_state || "");
    setNewNationality(student.nationality || "");
    setNewGender(student.gender || "");
    setNewMaritalStatus(student.marital_status || "");
    setNewShortName(student.short_name || "");
    setNewEmail(student.email || "");
    setNewEnrollmentProofUrls(student.enrollment_proof_urls || {
      barao: student.enrollment_proof_url || "",
      retro: student.enrollment_proof_url || "",
      uni: student.enrollment_proof_url || "",
      uniplan: student.enrollment_proof_url || "",
      modern: student.enrollment_proof_url || ""
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingStudent(null);
    setNewName("");
    setNewMatricula("");
    setNewPassword("");
    setNewCourse("");
    setNewSemester("1");
    setNewPhotoUrl("");
    setNewValidity("12/2026");
    setNewRegularity("Regular");
    setNewCpf("");
    setNewBirthDate("");
    setNewEnrollmentDate("");
    setNewBirthState("");
    setNewNationality("");
    setNewGender("");
    setNewMaritalStatus("");
    setNewShortName("");
    setNewEmail("");
    setNewEnrollmentProofUrls({ barao: "", retro: "", uni: "", uniplan: "", modern: "" });
  };

  const handleGenerateFictionalData = async () => {
    console.log("handleGenerateFictionalData clicked");
    setGeneratingData(true);
    try {
      const count = await db.generateAllFictionalData();
      console.log("Generation result count:", count);
      if (count > 0) {
        setShowToast({ show: true, message: "Dados gerados com sucesso!", type: 'success' });
        fetchStudents();
        fetchPayments();
      } else {
        alert("Todos os alunos já possuem notas e boletos gerados.");
      }
    } catch (error) {
      console.error("Erro ao gerar dados:", error);
      alert("Erro ao gerar dados fictícios. Verifique o console para mais detalhes.");
    } finally {
      setGeneratingData(false);
    }
  };

  const handleGenerateStudentData = async (studentId: number) => {
    try {
      await db.generateStudentFictionalData(studentId);
      alert("Notas e boletos gerados com sucesso para este aluno!");
      fetchStudents();
      fetchPayments();
    } catch (error) {
      console.error("Erro ao gerar dados do aluno:", error);
      alert("Erro ao gerar dados do aluno.");
    }
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        console.log("Updating student:", editingStudent.id, { 
          name: newName, 
          enrollment_proof_urls: newEnrollmentProofUrls 
        });
        await db.updateStudent(editingStudent.id, {
          name: newName,
          matricula: newMatricula,
          password: newPassword,
          course: newCourse,
          semester: parseInt(newSemester),
          photo_url: newPhotoUrl,
          validity: newValidity,
          regularity: newRegularity,
          cpf: newCpf,
          birth_date: parseDate(newBirthDate),
          enrollment_date: parseDate(newEnrollmentDate),
          birth_state: newBirthState,
          nationality: newNationality,
          gender: newGender,
          marital_status: newMaritalStatus,
          short_name: newShortName,
          email: newEmail,
          enrollment_proof_urls: newEnrollmentProofUrls
        });
      } else {
        await db.addStudent({
          name: newName,
          matricula: newMatricula,
          password: newPassword || "aluno123",
          course: newCourse,
          semester: parseInt(newSemester),
          photo_url: newPhotoUrl,
          validity: newValidity,
          regularity: newRegularity,
          cpf: newCpf,
          birth_date: parseDate(newBirthDate),
          enrollment_date: parseDate(newEnrollmentDate),
          birth_state: newBirthState,
          nationality: newNationality,
          gender: newGender,
          marital_status: newMaritalStatus,
          short_name: newShortName,
          email: newEmail,
          enrollment_proof_urls: newEnrollmentProofUrls
        });
      }
      handleCloseModal();
      await fetchStudents();
      alert("Dados do aluno salvos com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar dados do aluno.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 p-6 flex flex-col bg-[#00a2b1] text-white">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-white flex items-center justify-center overflow-hidden p-1 rounded-full shadow-lg">
            <img src={appSettings?.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-xl font-bold leading-tight">
            {`${getCollegeName(appSettings)} Admin`}
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <AdminNavItem icon={<Users />} label="Alunos" active={activeTab === "students"} onClick={() => setActiveTab("students")} />
          <AdminNavItem icon={<MonitorPlay />} label="Aulas Online" active={activeTab === "online-classes"} onClick={() => setActiveTab("online-classes")} />
          <AdminNavItem icon={<FileText />} label="Provas Online" active={activeTab === "exams"} onClick={() => setActiveTab("exams")} />
          <AdminNavItem icon={<BookOpen />} label="Disciplinas" active={activeTab === "disciplines"} onClick={() => setActiveTab("disciplines")} />
          <AdminNavItem icon={<Bell />} label="Comunicados" active={activeTab === "announcements"} onClick={() => setActiveTab("announcements")} />
          <AdminNavItem icon={<DollarSign />} label="Financeiro" active={activeTab === "financial"} onClick={() => setActiveTab("financial")} />
          <AdminNavItem icon={<Settings />} label="Configurações" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 p-3 transition-colors text-white/60 hover:text-white">
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-slate-50">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeTab === "students" ? "Gerenciamento de Alunos" : 
               activeTab === "online-classes" ? "Aulas Online EAD" :
               activeTab === "exams" ? "Provas Online" :
               activeTab === "disciplines" ? "Disciplinas" :
               activeTab === "announcements" ? "Comunicados" : 
               activeTab === "settings" ? "Configurações" : "Financeiro"}
            </h2>
            <div className={`mt-1 flex items-center gap-2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase w-fit ${isSupabaseConfigured ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
              {isSupabaseConfigured ? 'Supabase Conectado' : 'Modo Local (Offline)'}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {(activeTab === "students" || activeTab === "financial" || activeTab === "online-classes" || activeTab === "exams" || activeTab === "disciplines") && (
              <>
                {(activeTab !== "online-classes" && activeTab !== "exams" && activeTab !== "disciplines") && (
                  <button 
                    onClick={handleGenerateFictionalData}
                    disabled={generatingData}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors border-2 disabled:opacity-50 bg-white text-[#00a2b1] border-[#00a2b1] hover:bg-[#00a2b1]/5"
                    title="Gerar notas e boletos para alunos sem dados"
                  >
                    {generatingData ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                    <span>{generatingData ? "Gerando..." : "Gerar Dados"}</span>
                  </button>
                )}
                {activeTab === "students" && (
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors bg-[#00a2b1] text-white hover:bg-[#008f9d]"
                  >
                    <Plus className="w-5 h-5" /> Novo Aluno
                  </button>
                )}
                {activeTab === "online-classes" && (
                  <button 
                    onClick={() => setShowOnlineClassModal(true)}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors bg-[#00a2b1] text-white hover:bg-[#008f9d]"
                  >
                    <Plus className="w-5 h-5" /> Nova Aula
                  </button>
                )}
                {activeTab === "disciplines" && (
                  <button 
                    onClick={() => setShowDisciplineModal(true)}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors bg-[#00a2b1] text-white hover:bg-[#008f9d]"
                  >
                    <Plus className="w-5 h-5" /> Nova Disciplina
                  </button>
                )}
                {activeTab === "exams" && (
                  <button 
                    onClick={() => setShowExamModal(true)}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors bg-[#00a2b1] text-white hover:bg-[#008f9d]"
                  >
                    <Plus className="w-5 h-5" /> Agendar Prova
                  </button>
                )}
              </>
            )}
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg transition-colors text-[#00a2b1] hover:bg-[#00a2b1]/10"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {activeTab === "students" ? (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Buscar aluno pelo nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 border-slate-200 focus:ring-[#00a2b1]"
              />
            </div>
            <div className="card overflow-hidden p-0">
              <table className="w-full text-left">
              <thead className="border-b bg-[#00a2b1] text-white border-[#00a2b1]">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase">Aluno</th>
                  <th className="p-4 text-xs font-bold uppercase">Matrícula</th>
                  <th className="p-4 text-xs font-bold uppercase">Curso</th>
                  <th className="p-4 text-xs font-bold uppercase">Semestre</th>
                  <th className="p-4 text-xs font-bold uppercase">Status</th>
                  <th className="p-4 text-xs font-bold uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.filter(s => (s.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())).map((s, index) => (
                  <tr 
                    key={`admin-student-row-${s.id || index}-${index}`} 
                    className="transition-colors cursor-pointer group hover:bg-slate-50"
                    onClick={() => handleOpenEdit(s)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={s.photo_url} className="w-10 h-10 object-cover rounded-lg" alt="" referrerPolicy="no-referrer" />
                        <span className="font-bold transition-colors text-slate-700 group-hover:text-[#00a2b1]">{s.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm text-slate-500">{s.matricula}</td>
                    <td className="p-4 text-sm text-slate-600">{s.course}</td>
                    <td className="p-4 text-sm text-slate-600">{s.semester}º</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        s.status === 'blocked' ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                      )}>
                        {s.status === 'blocked' ? 'Bloqueado' : 'Ativo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(s);
                          }}
                          className={cn(
                            "px-3 py-1 font-bold text-xs transition-all rounded-lg",
                            s.status === 'blocked' ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white hover:bg-red-700"
                          )}
                        >
                          {s.status === 'blocked' ? 'Liberar' : 'Bloquear'}
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEdit(s);
                          }}
                          className="px-3 py-1 font-bold text-xs transition-all bg-[#00a2b1]/10 text-[#00a2b1] rounded-lg hover:bg-[#00a2b1] hover:text-white"
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        ) : activeTab === "online-classes" ? (
          <div className="space-y-6">
            <div className="card p-0 overflow-hidden">
              <table className="w-full text-left">
                <thead className="border-b bg-[#00a2b1] text-white border-[#00a2b1]">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase">Disciplina</th>
                    <th className="p-4 text-xs font-bold uppercase">Curso</th>
                    <th className="p-4 text-xs font-bold uppercase">Data/Hora</th>
                    <th className="p-4 text-xs font-bold uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {onlineClasses.map((oc, index) => (
                    <tr key={`admin-oc-${oc.id || index}-${index}`} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700">{oc.discipline_name}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[200px]">{oc.link}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">
                          {oc.course}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {(oc.day_of_week || (oc.date ? new Date(oc.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long' }) : '')).split('-')[0].charAt(0).toUpperCase() + (oc.day_of_week || (oc.date ? new Date(oc.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long' }) : '')).split('-')[0].slice(1).toLowerCase()} às {oc.time}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenEditOnlineClass(oc)}
                            className="p-2 text-[#00a2b1] hover:bg-[#00a2b1]/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteOnlineClass(oc.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {onlineClasses.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400">
                        Nenhuma aula online cadastrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "disciplines" ? (
          <div className="space-y-6">
            <div className="card p-0 overflow-hidden">
              <table className="w-full text-left">
                <thead className="border-b bg-[#00a2b1] text-white border-[#00a2b1]">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase">Disciplina</th>
                    <th className="p-4 text-xs font-bold uppercase">Professor</th>
                    <th className="p-4 text-xs font-bold uppercase">Curso</th>
                    <th className="p-4 text-xs font-bold uppercase">Horário</th>
                    <th className="p-4 text-xs font-bold uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {disciplines.map((d, index) => (
                    <tr key={`admin-d-${d.id || index}-${index}`} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-700">{d.name}</td>
                      <td className="p-4 text-sm text-slate-600">{d.professor}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(d.course) ? (
                            d.course.map((c, i) => (
                              <span key={`d-course-tag-${d.id}-${i}`} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-bold uppercase">
                                {c}
                              </span>
                            ))
                          ) : (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-bold uppercase">
                              {d.course || "Não vinculado"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-xs text-slate-500">
                        {d.day_of_week}, {d.time}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenEditDiscipline(d)}
                            className="p-2 text-[#00a2b1] hover:bg-[#00a2b1]/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteDiscipline(d.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "exams" ? (
          <div className="space-y-6">
            <div className="card p-0 overflow-hidden">
              <table className="w-full text-left">
                <thead className="border-b bg-[#00a2b1] text-white border-[#00a2b1]">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase">Disciplina</th>
                    <th className="p-4 text-xs font-bold uppercase">Curso</th>
                    <th className="p-4 text-xs font-bold uppercase">Data/Hora</th>
                    <th className="p-4 text-xs font-bold uppercase">Tipo</th>
                    <th className="p-4 text-xs font-bold uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {exams.map((exam, index) => (
                    <tr key={`admin-exam-${exam.id || index}-${index}`} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700">{exam.discipline_name}</span>
                          {exam.link && (
                            <span className="text-[10px] text-slate-400 truncate max-w-[200px]">{exam.link}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(exam.course) ? (
                            exam.course.map((c, i) => (
                              <span key={`exam-course-tag-${exam.id}-${i}`} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-bold uppercase">
                                {c}
                              </span>
                            ))
                          ) : (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-bold uppercase">
                              {exam.course || "Todos"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {new Date(exam.date + 'T00:00:00').toLocaleDateString('pt-BR')} às {exam.time}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase">
                          {exam.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenEditExam(exam)}
                            className="p-2 text-[#00a2b1] hover:bg-[#00a2b1]/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteExam(exam.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {exams.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-400">
                        Nenhuma prova agendada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "settings" ? (
          <div className="max-w-2xl space-y-8">
            <div className="card space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Configurações do Aplicativo</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome da Instituição</label>
                  <input 
                    type="text" 
                    className="input-field w-full" 
                    placeholder="Ex: Barão da Torre"
                    value={appSettings?.college_name || ""}
                    onChange={async (e) => {
                      const newSettings = await db.updateAppSettings({ college_name: e.target.value });
                      setAppSettings(newSettings);
                    }}
                  />
                </div>

                <div className="space-y-1 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-500 uppercase">Logo da Instituição</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden p-2">
                        <img src={appSettings?.logo_url} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="input-field flex-1" 
                            placeholder="URL da Imagem"
                            value={appSettings?.logo_url?.startsWith('data:') ? 'Imagem carregada localmente' : appSettings?.logo_url}
                            onChange={async (e) => {
                              const newSettings = await db.updateAppSettings({ logo_url: e.target.value });
                              setAppSettings(newSettings);
                            }}
                          />
                        </div>
                        <label className="block cursor-pointer">
                          <div className="btn-primary flex items-center justify-center gap-2 py-2 text-sm">
                            <Upload className="w-4 h-4" /> Importar Arquivo
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const newSettings = await db.updateAppSettings({ logo_url: reader.result as string });
                                  setAppSettings(newSettings);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-red-600 uppercase mb-4">Zona de Perigo</h4>
                  <p className="text-sm text-slate-500 mb-4">
                    Isso irá redefinir todo o banco de dados para os valores iniciais. Todos os novos alunos e alterações serão perdidos.
                  </p>
                  <button 
                    onClick={() => {
                      if (window.confirm("Tem certeza que deseja redefinir o banco de dados?")) {
                        resetDB();
                        window.location.reload();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                  >
                    <AlertCircle className="w-4 h-4" /> Redefinir Banco de Dados
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-blue-600 uppercase mb-4">Ferramentas de Dados</h4>
                  <p className="text-sm text-slate-500 mb-4">
                    Isso irá restaurar as aulas online, notícias e comunicados padrão para o banco de dados (Supabase ou Local).
                  </p>
                  <button 
                    onClick={async () => {
                      if (window.confirm("Deseja restaurar as aulas online e notícias padrão?")) {
                        try {
                          await db.bootstrapDatabase(initialData);
                          setShowToast({ show: true, message: "Dados restaurados com sucesso!", type: "success" });
                          window.location.reload();
                        } catch (err) {
                          setShowToast({ show: true, message: "Erro ao restaurar dados.", type: "error" });
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> Restaurar Dados de Demonstração
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "financial" ? (
          <div className="space-y-6">
            <div className="card p-0 overflow-hidden">
              <table className="w-full text-left">
                <thead className="border-b bg-[#00a2b1] text-white border-[#00a2b1]">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase">Aluno</th>
                    <th className="p-4 text-xs font-bold uppercase">Vencimento</th>
                    <th className="p-4 text-xs font-bold uppercase">Valor</th>
                    <th className="p-4 text-xs font-bold uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.slice(0, 50).map((p, index) => {
                    const student = students.find(s => Number(s.id) === Number(p.student_id));
                    return (
                      <tr key={`admin-pay-${p.id || index}-${index}`} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-700">{student?.name || "Aluno Desconhecido"}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({student?.matricula})</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 font-mono">{p.due_date}</td>
                        <td className="p-4 text-sm font-bold text-slate-700">R$ {p.amount.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                            p.status === "Pago" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                          )}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {payments.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400">
                        Nenhum boleto encontrado. Clique em "Gerar Dados" na aba Alunos para popular o financeiro.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card text-center py-20 text-slate-400">
            Módulo em desenvolvimento para esta demonstração.
          </div>
        )}
      </div>

      {/* Add/Edit Student Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto modal-container"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingStudent ? "Editar Aluno" : "Cadastrar Novo Aluno"}
              </h3>
              
              {editingStudent && (
                <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-blue-900">Dados Fictícios</h4>
                    <p className="text-[10px] text-blue-600">Gere notas e boletos de teste para este aluno.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleGenerateStudentData(editingStudent.id)}
                    className="flex items-center gap-2 py-2 px-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> Gerar Agora
                  </button>
                </div>
              )}

              <form onSubmit={handleSaveStudent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                  <input type="text" className="input-field" value={newName} onChange={e => setNewName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Matrícula</label>
                    <input type="text" className="input-field" value={newMatricula} onChange={e => setNewMatricula(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Senha do Aluno</label>
                    <input type="text" className="input-field" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Senha atual" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Semestre</label>
                    <select className="input-field" value={newSemester} onChange={e => setNewSemester(e.target.value)}>
                      {[1,2,3,4,5,6,7,8,9,10].map((n, i) => <option key={`sem-opt-${n}-${i}`} value={n}>{n}º Semestre</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Curso</label>
                    <select className="input-field" value={newCourse} onChange={e => setNewCourse(e.target.value)} required>
                      <option value="">Selecione um curso</option>
                      {COURSES.map((c, i) => <option key={`course-opt-${c}-${i}`} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Validade</label>
                    <input type="text" className="input-field" value={newValidity} onChange={e => setNewValidity(e.target.value)} placeholder="MM/AAAA" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Estado</label>
                    <select className="input-field" value={newRegularity} onChange={e => setNewRegularity(e.target.value)}>
                      <option value="Regular">Regular</option>
                      <option value="Irregular">Irregular</option>
                      <option value="Trancado">Trancado</option>
                      <option value="Formado">Formado</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">CPF</label>
                    <input type="text" className="input-field" value={newCpf} onChange={e => setNewCpf(e.target.value)} placeholder="000.000.000-00" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Data de Nascimento</label>
                    <input type="text" className="input-field" value={newBirthDate} onChange={e => setNewBirthDate(e.target.value)} placeholder="DD/MM/AAAA" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Data de Cadastro de Matrícula</label>
                  <input type="text" className="input-field" value={newEnrollmentDate} onChange={e => setNewEnrollmentDate(e.target.value)} placeholder="DD/MM/AAAA" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Estado de Nascimento</label>
                    <input type="text" className="input-field" value={newBirthState} onChange={e => setNewBirthState(e.target.value)} placeholder="Ex: SP" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nacionalidade</label>
                    <input type="text" className="input-field" value={newNationality} onChange={e => setNewNationality(e.target.value)} placeholder="Ex: Brasileira" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sexo</label>
                    <select className="input-field" value={newGender} onChange={e => setNewGender(e.target.value)}>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Estado Civil</label>
                    <select className="input-field" value={newMaritalStatus} onChange={e => setNewMaritalStatus(e.target.value)}>
                      <option value="Solteiro">Solteiro(a)</option>
                      <option value="Casado">Casado(a)</option>
                      <option value="Divorciado">Divorciado(a)</option>
                      <option value="Viúvo">Viúvo(a)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">E-mail do Aluno</label>
                  <input type="email" className="input-field" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="exemplo@instituicao.br" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome Abreviado</label>
                  <input type="text" className="input-field" value={newShortName} onChange={e => setNewShortName(e.target.value)} placeholder="Ex: João" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Foto do Aluno</label>
                  <div className="flex items-center gap-4">
                    {newPhotoUrl && (
                      <img 
                        src={newPhotoUrl} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100" 
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="input-field flex items-center justify-center gap-2 bg-slate-50 border-dashed border-2 hover:bg-slate-100 transition-colors">
                        <Upload className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-500 font-medium">
                          {newPhotoUrl ? "Trocar Foto" : "Importar Foto"}
                        </span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewPhotoUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Comprovantes por Tema</h4>
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin text-[#00a2b1]" />}
                  </div>
                  
                  {[
                    { id: 'barao', name: 'Tema Barão da Torre' },
                    { id: 'modern', name: 'Tema Moderno' },
                    { id: 'retro', name: 'Tema Retrô' },
                    { id: 'uni', name: 'Tema Uni' },
                    { id: 'uniplan', name: 'Tema Uniplan' }
                  ].map((theme, i) => (
                    <div key={`theme-proof-upload-${theme.id}-${i}`} className="space-y-2 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                        <span>{theme.name}</span>
                        {newEnrollmentProofUrls[theme.id] && (
                          <span className="text-[8px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={10} /> Carregado
                          </span>
                        )}
                      </label>
                      
                      <div className="flex flex-col gap-2">
                        <input 
                          type="file" 
                          accept=".pdf,image/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setIsUploading(true);
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onloadend = () => {
                                setNewEnrollmentProofUrls((prev: any) => ({ ...prev, [theme.id]: reader.result as string }));
                                setIsUploading(false);
                              };
                            }
                          }}
                          className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#00a2b1]/10 file:text-[#00a2b1] hover:file:bg-[#00a2b1]/20 cursor-pointer"
                        />
                        
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                          <Link className="w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="OU COLE O LINK DO PDF" 
                            className="bg-transparent outline-none text-[10px] font-bold w-full uppercase placeholder:text-slate-300"
                            value={newEnrollmentProofUrls[theme.id] && !newEnrollmentProofUrls[theme.id].startsWith('data:') ? newEnrollmentProofUrls[theme.id] : ""}
                            onChange={(e) => setNewEnrollmentProofUrls((prev: any) => ({ ...prev, [theme.id]: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handleCloseModal} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-3">
                    {editingStudent ? "Salvar Alterações" : "Cadastrar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Online Class Modal */}
      <AnimatePresence>
        {showOnlineClassModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseOnlineClassModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto modal-container"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingOnlineClass ? "Editar Aula Online" : "Nova Aula Online"}
              </h3>
              
              <form onSubmit={handleSaveOnlineClass} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Disciplina</label>
                  <select 
                    className="input-field" 
                    value={ocDisciplineId} 
                    onChange={e => {
                      const id = Number(e.target.value);
                      setOcDisciplineId(id);
                      const d = disciplines.find(disc => disc.id === id);
                      if (d) {
                        setOcDisciplineName(d.name);
                        setOcCourses(d.course ? (Array.isArray(d.course) ? d.course : [d.course]) : []);
                      }
                    }} 
                  >
                    <option value="">Selecione uma disciplina</option>
                    {disciplines.length === 0 && (
                      <option disabled value="">Nenhuma disciplina cadastrada</option>
                    )}
                    {disciplines.map(d => (
                      <option key={`oc-disc-opt-${d.id}`} value={d.id}>{d.name} ({Array.isArray(d.course) ? d.course.join(', ') : d.course})</option>
                    ))}
                  </select>
                  {disciplines.length === 0 && (
                    <p className="text-[10px] text-red-500 font-bold mt-1">
                      Você precisa cadastrar pelo menos uma disciplina antes de criar uma aula online.
                    </p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Cursos Vinculados (Confirmar)</label>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {COURSES.map((c, i) => (
                      <label key={`oc-course-check-${c}-${i}`} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1 rounded transition-colors">
                        <input 
                          type="checkbox" 
                          checked={ocCourses.includes(c)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOcCourses([...ocCourses, c]);
                            } else {
                              setOcCourses(ocCourses.filter(item => item !== c));
                            }
                          }}
                          className="w-4 h-4 text-[#00a2b1] rounded focus:ring-[#00a2b1]"
                        />
                        <span className="text-xs font-medium text-slate-700">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Link da Aula (Google Meet/Zoom)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={ocLink} 
                    onChange={e => setOcLink(e.target.value)} 
                    placeholder="https://meet.google.com/..." 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Dia da Semana</label>
                    <select 
                      className="input-field" 
                      value={ocDayOfWeek} 
                      onChange={e => setOcDayOfWeek(e.target.value)} 
                      required
                    >
                      <option value="Segunda-feira">Segunda-feira</option>
                      <option value="Terça-feira">Terça-feira</option>
                      <option value="Quarta-feira">Quarta-feira</option>
                      <option value="Quinta-feira">Quinta-feira</option>
                      <option value="Sexta-feira">Sexta-feira</option>
                      <option value="Sábado">Sábado</option>
                      <option value="Domingo">Domingo</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Hora</label>
                    <input type="time" className="input-field" value={ocTime} onChange={e => setOcTime(e.target.value)} required />
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input 
                    type="checkbox" 
                    id="ocMandatory" 
                    checked={ocMandatory} 
                    onChange={e => setOcMandatory(e.target.checked)}
                    className="w-4 h-4 text-[#00a2b1] rounded focus:ring-[#00a2b1]"
                  />
                  <label htmlFor="ocMandatory" className="text-sm font-bold text-slate-700">Aula Obrigatória</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={handleCloseOnlineClassModal} 
                    className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors"
                    disabled={isSaving}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      editingOnlineClass ? "Salvar Alterações" : "Cadastrar Aula"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Discipline Modal */}
      <AnimatePresence>
        {showDisciplineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseDisciplineModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto modal-container"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingDiscipline ? "Editar Disciplina" : "Nova Disciplina"}
              </h3>
              
              <form onSubmit={handleSaveDiscipline} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome da Disciplina</label>
                  <input type="text" className="input-field" value={dName} onChange={e => setDName(e.target.value)} required />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Professor</label>
                  <input type="text" className="input-field" value={dProfessor} onChange={e => setDProfessor(e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sala</label>
                    <input type="text" className="input-field" value={dRoom} onChange={e => setDRoom(e.target.value)} placeholder="Ex: Sala 101" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Cursos Vinculados</label>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      {COURSES.map((c, i) => (
                        <label key={`d-course-check-${c}-${i}`} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1 rounded transition-colors">
                          <input 
                            type="checkbox" 
                            checked={dCourses.includes(c)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setDCourses([...dCourses, c]);
                              } else {
                                setDCourses(dCourses.filter(item => item !== c));
                              }
                            }}
                            className="w-4 h-4 text-[#00a2b1] rounded focus:ring-[#00a2b1]"
                          />
                          <span className="text-xs font-medium text-slate-700">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Dia da Semana</label>
                    <select className="input-field" value={dDay} onChange={e => setDDay(e.target.value)}>
                      {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Horário</label>
                    <input type="text" className="input-field" value={dTime} onChange={e => setDTime(e.target.value)} placeholder="Ex: 08:00 - 10:00" required />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handleCloseDisciplineModal} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-3">
                    {editingDiscipline ? "Salvar Alterações" : "Cadastrar Disciplina"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Exam Modal */}
      <AnimatePresence>
        {showExamModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseExamModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto modal-container"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingExam ? "Editar Prova" : "Agendar Nova Prova"}
              </h3>
              
              <form onSubmit={handleSaveExam} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Disciplina</label>
                  <select 
                    className="input-field" 
                    value={exDisciplineId} 
                    onChange={e => {
                      const id = Number(e.target.value);
                      setExDisciplineId(id);
                      const d = disciplines.find(disc => disc.id === id);
                      if (d) {
                        setExDisciplineName(d.name);
                        setExCourses(d.course ? (Array.isArray(d.course) ? d.course : [d.course]) : []);
                      }
                    }} 
                    required
                  >
                    <option value="">Selecione uma disciplina</option>
                    {disciplines.map(d => (
                      <option key={`ex-disc-opt-${d.id}`} value={d.id}>{d.name} ({Array.isArray(d.course) ? d.course.join(', ') : d.course})</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Cursos Vinculados (Confirmar)</label>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {COURSES.map((c, i) => (
                      <label key={`ex-course-check-${c}-${i}`} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1 rounded transition-colors">
                        <input 
                          type="checkbox" 
                          checked={exCourses.includes(c)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setExCourses([...exCourses, c]);
                            } else {
                              setExCourses(exCourses.filter(item => item !== c));
                            }
                          }}
                          className="w-4 h-4 text-[#00a2b1] rounded focus:ring-[#00a2b1]"
                        />
                        <span className="text-xs font-medium text-slate-700">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Link da Prova (Opcional para Online)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={exLink} 
                    onChange={e => setExLink(e.target.value)} 
                    placeholder="https://link-da-prova.com" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Data</label>
                    <input type="date" className="input-field" value={exDate} onChange={e => setExDate(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Hora</label>
                    <input type="time" className="input-field" value={exTime} onChange={e => setExTime(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Tipo de Avaliação</label>
                  <select className="input-field" value={exType} onChange={e => setExType(e.target.value)} required>
                    <option value="P1">P1 - Primeira Prova</option>
                    <option value="P2">P2 - Segunda Prova</option>
                    <option value="Final">Prova Final</option>
                    <option value="Recuperação">Recuperação</option>
                    <option value="Trabalho">Trabalho</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handleCloseExamModal} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-3">
                    {editingExam ? "Salvar Alterações" : "Agendar Prova"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  if (dateStr.includes('/')) return dateStr;
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return parts.join('/');
    }
  }
  return dateStr;
};

const parseDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      if (parts[2].length === 4) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return parts.join('-');
    }
  }
  return dateStr;
};


const ForgotRecoveryModal = ({ 
  isOpen, 
  onClose, 
  step, 
  setStep, 
  type, 
  setType, 
  email, 
  setEmail, 
  otp,
  setOtp,
  result, 
  isLoading, 
  onAction 
}: any) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl"
      >
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Recuperar Acesso</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-8">
          {step === 'options' ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 font-medium mb-6">Qual informação você esqueceu?</p>
              <button 
                onClick={() => { setType('password'); setStep('input'); }}
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl flex items-center gap-4 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Minha Senha</p>
                  <p className="text-xs text-slate-500">Resetar senha via e-mail</p>
                </div>
              </button>
              <button 
                onClick={() => { setType('matricula'); setStep('input'); }}
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl flex items-center gap-4 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <UserSquare2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Minha Matrícula</p>
                  <p className="text-xs text-slate-500">Ver meu RA/Matrícula</p>
                </div>
              </button>
            </div>
          ) : step === 'input' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep('options')} className="p-2 bg-slate-100 rounded-xl">
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                </button>
                <h4 className="font-bold text-slate-700">Informe seu E-mail</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">Informe o e-mail cadastrado para recuperar sua {type === 'password' ? 'senha' : 'matrícula'}.</p>
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="email" 
                    className="input-field pl-12 h-14 rounded-2xl"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                onClick={onAction}
                disabled={!email || isLoading}
                className="w-full h-14 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "PROSSEGUIR"}
              </button>
            </div>
          ) : step === 'otp' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep('input')} className="p-2 bg-slate-100 rounded-xl">
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                </button>
                <h4 className="font-bold text-slate-700">Código de Verificação</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">Digite o código de 6 dígitos enviado para <strong>{email}</strong>.</p>
              
              <div className="space-y-2">
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    maxLength={6}
                    className="input-field pl-12 h-14 rounded-2xl text-center text-2xl font-black tracking-[10px]"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <button 
                onClick={onAction}
                disabled={otp.length !== 6 || isLoading}
                className="w-full h-14 bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-green-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "VERIFICAR CÓDIGO"}
              </button>
            </div>
          ) : (
            <div className="text-center space-y-6 py-4">
              {result?.success ? (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">{type === 'password' ? 'E-mail Enviado!' : 'Sua Matrícula'}</h4>
                    <p className="text-sm text-slate-500 mt-2 px-4">
                      {type === 'password' ? result.message : (
                        <>Sua matrícula é: <span className="font-black text-indigo-600 text-lg">{result.matricula}</span></>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Ops! Algo deu errado</h4>
                    <p className="text-sm text-slate-500 mt-2">{result?.message}</p>
                  </div>
                </>
              )}

              <button 
                onClick={onClose}
                className="w-full h-14 bg-slate-900 text-white font-bold rounded-2xl active:scale-95 transition-all"
              >
                FECHAR
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SignUpModal = ({ 
  isOpen, 
  onClose, 
  successMatricula, 
  isLoading, 
  onSubmit
}: any) => {
  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [localConfirmPassword, setLocalConfirmPassword] = useState("");
  const [localBirthDate, setLocalBirthDate] = useState("");
  const [localCPF, setLocalCPF] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localCEP, setLocalCEP] = useState("");
  const [localCourse, setLocalCourse] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SignUpModal: Formulário submetido. Dados locais:", {
      name: localName,
      email: localEmail,
      course: localCourse
    });
    
    if (!localCourse) {
      console.warn("SignUpModal: Curso não selecionado.");
      return;
    }

    onSubmit({
      name: localName,
      email: localEmail,
      password: localPassword,
      confirmPassword: localConfirmPassword,
      birthDate: localBirthDate,
      cpf: localCPF,
      address: localAddress,
      city: localCity,
      cep: localCEP,
      course: localCourse
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        {successMatricula ? (
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Inscrição Realizada!</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Sua inscrição foi concluída com sucesso. Guarde seu número de matrícula (RA) abaixo para acessar o portal.
              </p>
            </div>
            
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sua Matrícula (RA)</span>
              <div className="text-3xl font-black text-blue-600 tracking-wider font-mono">
                {successMatricula}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-[10px] text-amber-800 font-medium leading-tight">
                Sua conta está em análise e aguarda liberação pelo administrador. Você poderá acessar o portal assim que for aprovado.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full h-14 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Concluído
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Nova Inscrição</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Seu nome"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="seu@email.com"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">CPF</label>
                    <input 
                      type="text" 
                      required
                      maxLength={14}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      placeholder="000.000.000-00"
                      value={localCPF}
                      onChange={(e) => setLocalCPF(formatCPF(e.target.value))}
                    />
                  </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Data Nasc.</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={localBirthDate}
                    onChange={(e) => setLocalBirthDate(e.target.value)}
                  />
                </div>
              </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Endereço</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="Rua, número, bairro"
                    value={localAddress}
                    onChange={(e) => setLocalAddress(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Cidade</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      placeholder="Sua cidade"
                      value={localCity}
                      onChange={(e) => setLocalCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">CEP</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      placeholder="00000-000"
                      value={localCEP}
                      onChange={(e) => setLocalCEP(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Curso</label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                  value={localCourse}
                  onChange={(e) => setLocalCourse(e.target.value)}
                >
                  <option value="">Selecione um curso</option>
                  {COURSES.map((c: string, i: number) => <option key={`signup-course-${c}-${i}`} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Senha</label>
                  <span className="text-[8px] font-bold text-blue-500 uppercase">Mínimo 6 dígitos</span>
                </div>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Crie uma senha segura"
                  value={localPassword}
                  onChange={(e) => setLocalPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Repita a senha"
                  value={localConfirmPassword}
                  onChange={(e) => setLocalConfirmPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 shrink-0"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Realizar Inscrição"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// Componentes de Overlay movidos para fora para evitar remounting flashes
const LoadingOverlay = ({ appSettings, onForceEnter }: { appSettings: any, onForceEnter: () => void }) => {
  const [showFallback, setShowFallback] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-[#00a2b1] z-[100] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-4 shadow-2xl mb-8">
        <img src={appSettings?.logo_url || "https://cdn-icons-png.flaticon.com/512/3135/3135810.png"} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      
      <div className="relative">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
      
      <h3 className="mt-6 text-2xl font-black text-white uppercase tracking-tight">
        {getCollegeName(appSettings)}
      </h3>
      <p className="mt-2 text-white/80 text-sm font-bold uppercase tracking-widest">
        {showFallback ? "Finalizando carregamento..." : "Carregando seu portal..."}
      </p>
      
      <div className="mt-10 w-40 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full bg-orange-500"
        />
      </div>

      {showFallback && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onForceEnter}
          className="mt-12 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all border border-white/20"
        >
          Demorando muito? Clique aqui para entrar
        </motion.button>
      )}
    </motion.div>
  );
};

const DashboardLoadingOverlay = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
  >
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center">
      <Loader2 className="w-12 h-12 text-[#00a2b1] animate-spin mb-4" />
      <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Carregando...</p>
    </div>
  </motion.div>
);

export default function App() {
  console.log("App component starting to render...");
  try {
    const [user, setUser] = useState<any | null>(null);
    const [view, setView] = useState<string>("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [debugInfo, setDebugInfo] = useState<string | null>(null);
    const [appSettings, setAppSettings] = useState<AppSettings | any>({
      logo_url: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
      primary_color: "#1fbba6",
      secondary_color: "#0066cc",
      theme: "barao",
      college_name: "Barão da Torre Academy"
    });
    const [isEnvMissing, setIsEnvMissing] = useState(false);
    
    const [data, setData] = useState<{
      grades: any[];
      schedule: any[];
      announcements: any[];
      payments: any[];
      activities: any[];
      exams: any[];
      online_classes: any[];
      news: any[];
    }>({
      grades: [],
      schedule: [],
      announcements: [],
      payments: [],
      activities: [],
      exams: [],
      online_classes: [],
      news: []
    });

    const [newsIndex, setNewsIndex] = useState(0);
    const [showProofUrl, setShowProofUrl] = useState<string | null>(null);

    useEffect(() => {
      console.log("App useEffect running...");
      
      // Listen for auth state changes (specifically for password recovery)
      if (isSupabaseConfigured && supabase) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
          console.log("Auth event:", event);
          if (event === 'PASSWORD_RECOVERY') {
            setShowResetModal(true);
          }
        });
        
        return () => {
          subscription.unsubscribe();
        };
      }

      if (!isSupabaseConfigured) {
        console.warn("Supabase is not configured. Using local storage.");
        setIsEnvMissing(true);
      } else {
        console.log("Supabase is configured. Using remote database.");
      }

      const loadSettings = async () => {
        console.log("Loading app settings...");
        try {
          const settings = await db.getAppSettings();
          console.log("App settings loaded:", settings);
          if (settings) {
            // Global override to ensure the name and logo are always updated
            if (settings.college_name === "Barão de Mauá" || settings.college_name === "Barão da Torre") {
              settings.college_name = "Barão da Torre Academy";
            }
            
            const oldLogos = [
              "https://lh3.googleusercontent.com/d/1X_m_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFYMUkJQx9MhrRDAOkp8HpK8qBnhc7WwLtw&s",
              "https://picsum.photos/seed/college/200/200",
              "/icon.png"
            ];
            if (oldLogos.includes(settings.logo_url)) {
              settings.logo_url = "https://cdn-icons-png.flaticon.com/512/3135/3135810.png";
            }
            
            // Force 'barao' theme
            settings.theme = "barao";
            
            setAppSettings(settings);
          }
        } catch (err) {
          console.error("Error loading app settings:", err);
        }
      };
      loadSettings();
    }, []);

    useEffect(() => {
      if (view === "dashboard" && data.news && data.news.length > 0) {
        const interval = setInterval(() => {
          setNewsIndex(prev => (prev + 1) % data.news.length);
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [view, data.news]);

    const [showToast, setShowToast] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({show: false, message: "", type: 'success'});
    useEffect(() => {
      if (showToast.show) {
        const timer = setTimeout(() => setShowToast(prev => ({...prev, show: false})), 3000);
        return () => clearTimeout(timer);
      }
    }, [showToast.show]);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [view]);

    const [isSimulatingLoading, setIsSimulatingLoading] = useState(false);
    
    // Safety net to prevent getting stuck on loading screen
    useEffect(() => {
      if (isSimulatingLoading) {
        const timer = setTimeout(() => {
          console.warn("Loading safety net triggered. Clearing isSimulatingLoading.");
          setIsSimulatingLoading(false);
          setLoading(false);
        }, 15000); // 15 seconds fallback
        return () => clearTimeout(timer);
      }
    }, [isSimulatingLoading]);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [editBirthState, setEditBirthState] = useState("");
    const [editNationality, setEditNationality] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editMaritalStatus, setEditMaritalStatus] = useState("");
    const [editShortName, setEditShortName] = useState("");
    const [editPhotoUrl, setEditPhotoUrl] = useState("");
    const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
    const [isDashboardLoading, setIsDashboardLoading] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [forgotOtp, setForgotOtp] = useState("");
    const [isResetLoading, setIsResetLoading] = useState(false);
    const [forgotStep, setForgotStep] = useState<'options' | 'input' | 'otp' | 'result'>('options');
    const [forgotType, setForgotType] = useState<'password' | 'matricula'>('password');
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotResult, setForgotResult] = useState<any>(null);
    const [isForgotLoading, setIsForgotLoading] = useState(false);

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isSignUpLoading, setIsSignUpLoading] = useState(false);
    const [signUpSuccessMatricula, setSignUpSuccessMatricula] = useState<string | null>(null);

    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");

    console.log("App state initialized. Current view:", view);

    const navigateTo = (newView: string) => {
      setIsDashboardLoading(true);
      setTimeout(() => {
        setView(newView);
        window.scrollTo(0, 0);
        setIsDashboardLoading(false);
      }, 1200);
    };

    const handleOpenProof = (targetUser: User) => {
      if (!targetUser) return;
      
      const url = targetUser.enrollment_proof_urls?.[appSettings?.theme || 'barao'] || targetUser.enrollment_proof_url;
      
      if (!url || url === "EMPTY") {
        setDebugInfo("Comprovante de matrícula não disponível para este aluno.");
        return;
      }
      
      // For external links, use window.open as usual
      if (!url.startsWith('data:')) {
        window.open(url, '_blank');
        return;
      }

      // For data URLs (PDF/Image), use the internal viewer to avoid blocked popups on Android
      setShowProofUrl(url);
    };

    const handleForgotAction = async () => {
      // Close mobile keyboard
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      if (!forgotEmail) return;
      setIsForgotLoading(true);
      
      try {
        if (forgotType === 'password') {
          if (forgotStep === 'input') {
            // Step 1: Send the OTP code
            const result = await db.forgotPassword(forgotEmail);
            if (result.error) {
              setForgotResult({ success: false, message: result.error });
              setForgotStep('result');
            } else {
              setForgotStep('otp');
            }
          } else if (forgotStep === 'otp') {
            // Step 2: Verify the OTP code
            const result = await db.verifyRecoveryCode(forgotEmail, forgotOtp);
            if (result.success) {
              setShowForgotModal(false);
              setShowResetModal(true);
            } else {
              setForgotResult({ success: false, message: "Código inválido ou expirado." });
              setForgotStep('result');
            }
          }
        } else {
          // For matricula, we still just show it on screen
          const foundUser = await db.getUserByEmail(forgotEmail);
          if (foundUser) {
            setForgotResult({ success: true, matricula: foundUser.matricula });
          } else {
            setForgotResult({ success: false, message: "E-mail não encontrado em nossa base de dados." });
          }
          setForgotStep('result');
        }
      } catch (err) {
        console.error("Forgot action error:", err);
        setForgotResult({ success: false, message: "Ocorreu um erro ao processar sua solicitação." });
        setForgotStep('result');
      } finally {
        setIsForgotLoading(false);
      }
    };

    const handleResetPassword = async () => {
      if (!newPassword) return;
      setIsResetLoading(true);
      try {
        const result = await db.updatePassword(newPassword);
        if (result.success) {
          setShowResetModal(false);
          setNewPassword("");
          setShowToast({ show: true, message: "Senha atualizada com sucesso!", type: 'success' });
          setTimeout(() => setShowToast({ show: false, message: "", type: 'success' }), 3000);
          setView('login');
        } else {
          alert(result.error || "Erro ao atualizar senha.");
        }
      } catch (err) {
        console.error("Reset password error:", err);
        alert("Erro ao processar solicitação.");
      } finally {
        setIsResetLoading(false);
      }
    };

    const resetForgotFlow = () => {
      setShowForgotModal(false);
      setForgotStep('options');
      setForgotEmail('');
      setForgotOtp('');
      setForgotResult(null);
    };

    const fetchStudentData = async (id: number) => {
      console.log(`Buscando dados para o aluno ID: ${id}`);
      let dashboardData = null;
      let attempt = 0;
      const maxRetries = 3;

      while (attempt < maxRetries) {
        try {
          attempt++;
          console.log(`Tentativa ${attempt} de buscar dashboard para ID ${id}`);
          
          // Adicionando timeout para a busca do dashboard
          const dashboardPromise = db.getStudentDashboard(id);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout ao buscar dados do dashboard")), 12000)
          );
          
          dashboardData = await Promise.race([dashboardPromise, timeoutPromise]) as DashboardData | null;
          
          if (dashboardData) break;
        } catch (error) {
          console.error(`Erro ao buscar dados (tentativa ${attempt}):`, error);
          if (attempt >= maxRetries) {
            console.error("Falha definitiva ao buscar dados do dashboard.");
            return;
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      if (!dashboardData) {
        console.warn("Nenhum dado retornado para o dashboard.");
        return;
      }
      
      // Auto-generate data if grades or payments are empty (indicates uninitialized student)
      const hasGrades = dashboardData.grades && dashboardData.grades.length > 0;
      const hasPayments = dashboardData.payments && dashboardData.payments.length > 0;

      if (!hasGrades || !hasPayments) {
        console.log("Dados vazios detectados. Gerando dados fictícios...");
        try {
          // Adicionando timeout para geração de dados
          const generatePromise = db.generateStudentFictionalData(id);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout ao gerar dados fictícios")), 15000)
          );
          
          await Promise.race([generatePromise, timeoutPromise]);
          dashboardData = await db.getStudentDashboard(id);
        } catch (error) {
          console.error("Erro ao gerar dados automáticos:", error);
        }
      }

      // Fix broken news images and titles
      if (dashboardData.news) {
        dashboardData.news = dashboardData.news.map((n: any) => {
          // Fix for "Bolsa de Estudo para Intercâmbio"
          if (n.title && n.title.toLowerCase().includes("bolsa") && n.title.toLowerCase().includes("intercâmbio")) {
            return { 
              ...n, 
              title: "Bolsa de Estudo para Intercâmbio",
              image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
            };
          }
          // Fix for "Simpósio de Farmácia e Medicina"
          if (n.title && n.title.toLowerCase().includes("simpósio") && n.title.toLowerCase().includes("farmácia")) {
            return { 
              ...n, 
              title: "Simpósio de Farmácia e Medicina",
              image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
            };
          }
          // General fix for broken Unsplash IDs if any others exist
          if (n.image && n.image.includes("1505751172107")) {
            return { ...n, image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=1000" };
          }
          if (n.image && n.image.includes("1523050335392")) {
            return { ...n, image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" };
          }
          return n;
        });
      }

      setData(dashboardData);

      // Auto-update past due payments to "Pago" (Fictional logic for demo)
      if (dashboardData.payments && dashboardData.payments.length > 0) {
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-11
        const currentYear = now.getFullYear();
        let hasUpdates = false;
        
        const updatedPayments = await Promise.all(dashboardData.payments.map(async (payment: any) => {
          if (payment.status === 'Em aberto') {
            const dateParts = payment.due_date.split('/');
            if (dateParts.length === 3) {
              const day = parseInt(dateParts[0]);
              const month = parseInt(dateParts[1]);
              const year = parseInt(dateParts[2]);
              
              // If due date is in a previous month of the same year OR in a previous year
              if (year < currentYear || (year === currentYear && (month - 1) < currentMonth)) {
                try {
                  console.log(`Sistema: Auto-pagando boleto vencido (${payment.due_date}) para manter portal em dia.`);
                  const updated = await db.updatePayment(payment.id, { status: 'Pago' });
                  hasUpdates = true;
                  return updated;
                } catch (err) {
                  console.error("Erro ao auto-pagar boleto:", err);
                  return payment;
                }
              }
            }
          }
          return payment;
        }));

        if (hasUpdates) {
          setData({ ...dashboardData, payments: updatedPayments });
        }
      }
    };

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Concurrency guard
      if (loading) return;

      // Close mobile keyboard
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      const cleanMatricula = matricula.trim();
      console.log(`handleLogin: Tentando login para matrícula: "${cleanMatricula}"`);

      if (!cleanMatricula || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
      }

      if (!navigator.onLine) {
        setError("Sem conexão com a internet. Verifique sua rede.");
        return;
      }

      setLoading(true);
      setError("");
      setDebugInfo(null);
      
      try {
        const maxRetries = 3;
        let attempt = 0;
        let userData = null;
        let lastError = null;

        while (attempt < maxRetries) {
          try {
            attempt++;
            if (attempt > 1) {
              setError(`Conexão instável, tentando novamente (${attempt}/${maxRetries})...`);
            }
            
            console.log(`Tentativa de login ${attempt}/${maxRetries} para matrícula: ${cleanMatricula}`);
            
            // Adicionando timeout para evitar que fique preso carregando infinitamente
            const loginPromise = db.login(cleanMatricula, password);
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error("A operação de login expirou. Verifique sua conexão.")), 10000)
            );
            
            userData = await Promise.race([loginPromise, timeoutPromise]) as User | null;
            console.log(`Resultado da tentativa ${attempt}:`, userData ? "Usuário encontrado" : "Usuário não encontrado");
            
            lastError = null;
            break; 
          } catch (err: any) {
            lastError = err;
            console.error(`Erro na tentativa ${attempt}:`, err);
            
            // Se for um erro de negócio (bloqueio, senha errada, etc), não tenta novamente
            const errorMsg = (err.message || String(err) || "").toLowerCase();
            
            // Se for um erro de conexão conhecido, retorna false para tentar novamente
            const isConnectionError = 
              errorMsg.includes("fetch") || 
              errorMsg.includes("network") || 
              errorMsg.includes("expirou") || 
              errorMsg.includes("timeout") ||
              errorMsg.includes("abort") ||
              errorMsg.includes("connection") ||
              errorMsg.includes("servidor instável");
            
            // Se NÃO for erro de conexão, assumimos que é erro de negócio (senha errada, etc)
            const isBusinessError = !isConnectionError || 
              errorMsg.includes("auth_error") ||
              errorMsg.includes("bloqueada") || 
              errorMsg.includes("incorret") || 
              errorMsg.includes("inválid") ||
              errorMsg.includes("não encontrado") ||
              errorMsg.includes("não encontrada") ||
              errorMsg.includes("invalid") ||
              errorMsg.includes("not found") ||
              errorMsg.includes("senha") ||
              errorMsg.includes("matrícula") ||
              errorMsg.includes("matricula") ||
              errorMsg.includes("credenciais");
            
            console.log(`Erro na tentativa ${attempt}: "${errorMsg}". É erro de negócio? ${isBusinessError}`);
            
            if (isBusinessError) {
              console.log("Interrompendo tentativas devido a erro de negócio.");
              break;
            }

            if (attempt >= maxRetries) break;
            
            // Wait before next attempt
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }

        if (lastError) {
          const errorMsg = (lastError.message || String(lastError) || "").toLowerCase();
          
          const isConnectionError = 
            errorMsg.includes("fetch") || 
            errorMsg.includes("network") || 
            errorMsg.includes("expirou") || 
            errorMsg.includes("timeout") ||
            errorMsg.includes("abort") ||
            errorMsg.includes("connection") ||
            errorMsg.includes("servidor instável");

          const isBusinessError = !isConnectionError || 
            errorMsg.includes("auth_error") ||
            errorMsg.includes("bloqueada") || 
            errorMsg.includes("incorret") || 
            errorMsg.includes("inválid") ||
            errorMsg.includes("não encontrado") ||
            errorMsg.includes("não encontrada") ||
            errorMsg.includes("invalid") ||
            errorMsg.includes("not found") ||
            errorMsg.includes("senha") ||
            errorMsg.includes("matrícula") ||
            errorMsg.includes("matricula") ||
            errorMsg.includes("credenciais");

          if (isBusinessError) {
            // Remove o prefixo AUTH_ERROR: se existir para mostrar uma mensagem limpa
            const cleanMessage = lastError.message ? lastError.message.replace("AUTH_ERROR: ", "") : "Matrícula ou senha incorretos.";
            setError(cleanMessage);
            
            // Adiciona informação extra de debug para o usuário
            if (lastError.message && lastError.message.includes("RLS")) {
              setDebugInfo("Erro de RLS: O banco bloqueou a leitura. Verifique as políticas no Supabase.");
            } else {
              setDebugInfo("Detalhe técnico: " + (lastError.message || "Erro desconhecido"));
            }
          } else {
            setError("Sem conexão com a internet ou servidor instável. Verifique sua rede e tente novamente.");
          }
          
          setDebugInfo(lastError.message || "Erro de conexão");
          setLoading(false);
          return;
        }

        if (userData) {
          console.log("Login retornado pelo DB:", userData);
          if (userData.status === 'blocked') {
            setError("Sua conta está bloqueada. Aguarde a liberação pelo administrador.");
            setLoading(false);
            return;
          }
          
          console.log("Login bem-sucedido para:", userData.name);
          if (userData.role === 'admin') {
            setUser(userData);
            setView("admin-dashboard");
            setLoading(false);
          } else {
            // Fluxo de aluno com carregamento simulado
            setEditBirthState(userData.birth_state || "");
            setEditNationality(userData.nationality || "");
            setEditGender(userData.gender || "");
            setEditMaritalStatus(userData.marital_status || "");
            setEditShortName(userData.short_name || "");
            setEditPhotoUrl(userData.photo_url || "");
            setIsSimulatingLoading(true);
            
            // Atraso levemente maior para garantir cobertura total do overlay
            setTimeout(() => {
              // Set user and view
              setUser(userData);
              if (userData.regularity && userData.regularity !== 'Regular') {
                setView("financial");
                setError("Sua conta possui pendências. Por favor, regularize sua situação financeira para acessar o portal completo.");
              } else {
                setView("dashboard");
              }

              // Start fetching data in the background
              const loadData = async () => {
                try {
                  console.log("Iniciando busca de dados do aluno...");
                  await fetchStudentData(userData.id);
                  console.log("Dados do aluno carregados com sucesso.");
                } catch (err) {
                  console.error("Erro ao processar dados do aluno:", err);
                } finally {
                  // Sincronizado com a animação da barra (3s) + um pequeno fôlego (200ms)
                  setTimeout(() => {
                    setIsSimulatingLoading(false);
                    setLoading(false);
                    console.log("Processo de login finalizado.");
                  }, 3200);
                }
              };
              
              loadData();
            }, 150);
          }
        } else {
          console.warn("Login falhou: Credenciais incorretas ou usuário não encontrado.");
          setError("Matrícula ou senha incorretos.");
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Erro fatal no handleLogin:", err);
        setError("Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.");
        setIsSimulatingLoading(false);
        setLoading(false);
      }
    };

    const handleLogout = () => {
      console.log("Logging out...");
      setUser(null);
      setView("login");
      setMatricula("");
      setPassword("");
    };

    const resetLocalData = () => {
      if (window.confirm("Isso irá apagar todos os dados locais (alunos, notas, pagamentos) e restaurar o sistema para o estado inicial. Deseja continuar?")) {
        localStorage.clear();
        // Also clear IndexedDB if possible
        if (window.indexedDB) {
          const databases = ["edumanager_files"];
          databases.forEach(dbName => {
            const req = window.indexedDB.deleteDatabase(dbName);
            req.onsuccess = () => console.log(`Database ${dbName} deleted`);
          });
        }
        window.location.reload();
      }
    };

    const testConnection = async () => {
      if (!isSupabaseConfigured) {
        setDebugInfo("Você está no modo LOCAL STORAGE (Offline).\n\nPara usar o Supabase (Remoto):\n1. Vá no menu 'Settings' (ícone de engrenagem no canto superior direito do AI Studio).\n2. Adicione as chaves:\n   - VITE_SUPABASE_URL\n   - VITE_SUPABASE_ANON_KEY\n3. Salve e reinicie o servidor.");
        return;
      }

      setLoading(true);
      setDebugInfo("Testando conexão com Supabase...");
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Tempo limite de conexão excedido (10s). Verifique se a URL do Supabase está correta.")), 10000)
      );

      try {
        const connectionPromise = (async () => {
          // Check users table
          const { data: usersData, error: usersError, count } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });
          
          if (usersError) return { error: usersError };

          // Check other tables
          const tables = ['app_settings', 'schedules', 'announcements', 'news', 'online_classes', 'exams'];
          const missingTables = [];
          
          for (const table of tables) {
            const { error } = await supabase.from(table).select('id').limit(1);
            if (error) missingTables.push(table);
          }

          return { usersError, count, missingTables };
        })();

        const result: any = await Promise.race([connectionPromise, timeoutPromise]);
        const { usersError, count, missingTables } = result;
          
        if (usersError) {
          setDebugInfo(`Erro de Conexão: ${usersError.message || "Erro desconhecido"}\nDetalhes: ${usersError.details || "Nenhum"}\nDica: ${usersError.hint || "Nenhuma"}\nCódigo: ${usersError.code || "N/A"}`);
        } else {
          // Check if admin exists
          const { data: adminData, error: adminError } = await supabase
            .from('users')
            .select('matricula, role')
            .ilike('matricula', 'admin')
            .single();

          let adminStatus = "";
          if (adminError) {
            adminStatus = `\n⚠️ Usuário 'admin' NÃO encontrado no banco remoto!`;
          } else {
            adminStatus = `\n✅ Usuário 'admin' encontrado no Supabase (Role: ${adminData.role})`;
          }

          let tablesStatus = "";
          if (missingTables && missingTables.length > 0) {
            tablesStatus = `\n❌ Tabelas faltando no Supabase: ${missingTables.join(', ')}\n\n⚠️ Você PRECISA rodar o script SQL no Supabase SQL Editor primeiro!`;
          } else {
            tablesStatus = `\n✅ Todas as tabelas encontradas no Supabase.`;
          }

          setDebugInfo(`Conexão OK!\nTotal de usuários no banco: ${count}${adminStatus}${tablesStatus}\nURL: ${import.meta.env.VITE_SUPABASE_URL}`);
        }
      } catch (err: any) {
        setDebugInfo(`Erro Crítico: ${err.message}\n\nIsso pode ser um erro de rede ou URL inválida.`);
      } finally {
        setLoading(false);
      }
    };

    const emergencyLogin = () => {
      const adminUser = {
        id: 1,
        matricula: "admin",
        password: "admin",
        name: "Administrador (Emergência)",
        role: "admin",
        status: "active"
      };
      setUser(adminUser);
      setView("admin-dashboard");
    };

    const restoreData = async () => {
      console.log("restoreData clicked. initialData:", initialData);
      setLoading(true);
      setDebugInfo("Restaurando dados de exemplo... Por favor, aguarde.");
      try {
        if (!initialData) {
          throw new Error("Dados iniciais não encontrados no código.");
        }
        // @ts-ignore
        await db.bootstrapDatabase(initialData);
        console.log("db.bootstrapDatabase finished successfully");
        setDebugInfo("✅ Dados restaurados com sucesso no " + (isSupabaseConfigured ? "Supabase" : "Local Storage") + "!\n\nAgora você pode tentar logar com admin/admin.");
        
        if (!isSupabaseConfigured) {
          setTimeout(() => window.location.reload(), 2000);
        }
      } catch (err: any) {
        console.error("Error in restoreData:", err);
        setDebugInfo("❌ Erro ao restaurar dados: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    const handleSignUp = async (signUpData: any) => {
      // Close mobile keyboard
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      console.log("handleSignUp started", signUpData);

      if (signUpData.password.length < 6) {
        setShowToast({ 
          show: true, 
          message: "A senha deve ter pelo menos 6 dígitos.", 
          type: 'error' 
        });
        return;
      }

      if (!validateCPF(signUpData.cpf)) {
        setShowToast({ 
          show: true, 
          message: "CPF inválido. Verifique o número digitado.", 
          type: 'error' 
        });
        return;
      }

      if (signUpData.password !== signUpData.confirmPassword) {
        setShowToast({ 
          show: true, 
          message: "As senhas não coincidem. Verifique e tente novamente.", 
          type: 'error' 
        });
        return;
      }

      setIsSignUpLoading(true);
      try {
        console.log("handleSignUp: Iniciando processo de inscrição...");
        // Generate matrícula: 4 digits year + 4 random digits
        const year = new Date().getFullYear().toString();
        const random = Math.floor(1000 + Math.random() * 9000).toString();
        const generatedMatricula = year + random;

        console.log("handleSignUp: Chamando db.signUp com matrícula:", generatedMatricula, "e senha (len):", signUpData.password?.length);
        
        // Add a timeout to the signUp call
        const signUpPromise = db.signUp({
          name: signUpData.name,
          email: signUpData.email,
          matricula: generatedMatricula,
          password: signUpData.password,
          course: signUpData.course,
          cpf: signUpData.cpf,
          birth_date: signUpData.birthDate,
          address: signUpData.address,
          city: signUpData.city,
          cep: signUpData.cep
        });

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("A operação de inscrição expirou. Verifique sua conexão ou tente novamente.")), 20000)
        );

        await Promise.race([signUpPromise, timeoutPromise]);
        console.log("handleSignUp: db.signUp concluído com sucesso");
        
        setSignUpSuccessMatricula(generatedMatricula);
        setShowToast({ 
          show: true, 
          message: "Inscrição realizada com sucesso!", 
          type: 'success' 
        });
      } catch (err: any) {
        console.error("Erro em handleSignUp:", err);
        setShowToast({ 
          show: true, 
          message: err.message || "Erro ao realizar inscrição. Tente novamente.", 
          type: 'error' 
        });
      } finally {
        console.log("handleSignUp: Processo finalizado.");
        setIsSignUpLoading(false);
      }
    };




    // Views
    const renderView = () => {
      if (view === "login" || !user) {
        return (
          <LoginView 
            appSettings={appSettings}
            handleLogin={handleLogin}
            matricula={matricula}
            setMatricula={setMatricula}
            password={password}
            setPassword={setPassword}
            error={error}
            loading={loading}
            onForgotClick={() => setShowForgotModal(true)}
            onSignUpClick={() => setShowSignUpModal(true)}
          />
        );
      }

      switch (view) {
        case "dashboard": return <StudentDashboard />;
      case "grades": return <GradesView />;
      case "schedule": return <ScheduleView />;
      case "announcements": return <AnnouncementsView />;
      case "financial": return <FinancialView />;
      case "activities": return <ActivitiesView />;
      case "exams": return <ExamsView />;
      case "online-classes": return <OnlineClassesView />;
      case "card": return <VirtualCardView />;
      case "profile": return <ProfileView />;
      case "library": return <LibraryView />;
      case "admin-dashboard": return (
        <AdminDashboard 
          appSettings={appSettings}
          setAppSettings={setAppSettings}
          handleLogout={handleLogout}
          setShowToast={setShowToast}
        />
      );
      default: return null;
    }
  };

  const StudentDashboard = () => (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Barao Theme Header */}
      <div className="bg-[#00a2b1] text-white p-4 pt-4 pb-2 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/students/800/400" 
            alt="Background" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex justify-between items-center relative z-10">
          <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
            <img src={appSettings?.logo_url || "https://cdn-icons-png.flaticon.com/512/3135/3135810.png"} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-md transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => navigateTo("announcements")}
              className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md relative"
            >
              <Bell className="w-5 h-5 text-white" />
              {data.announcements?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {data.announcements.length}
                </span>
              )}
            </button>
            <div className="w-20 h-20 bg-white rounded-full overflow-hidden border border-white/50 shadow-md">
              <img 
                src={user?.photo_url || DEFAULT_AVATAR} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barao News Hero */}
      <div className="p-4 -mt-4 relative z-20">
        <div className="relative group">
          <AnimatePresence mode="wait">
            <motion.div 
              key={newsIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={data.news && data.news.length > 0 ? data.news[newsIndex].image : "https://picsum.photos/seed/event/800/400"} 
                  alt="News" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                  <img src={appSettings.logo_url} alt="Logo" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                  <span className="text-[8px] font-black text-slate-800 uppercase tracking-tighter">{getCollegeName(appSettings)}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-orange-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-widest mb-1 inline-block">Destaque</span>
                  <h3 className="text-white text-lg font-black leading-tight line-clamp-2 drop-shadow-md">
                    {data.news && data.news.length > 0 ? data.news[newsIndex].title : "Carregando notícias..."}
                  </h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {data.news && data.news.length > 0 ? data.news[newsIndex].description : ""}
                </p>
                <div className="flex items-center justify-between">
                  <button className="text-[#00a2b1] text-xs font-black uppercase tracking-widest flex items-center gap-1 group/btn">
                    Saiba Mais <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <div className="flex gap-1.5">
                    {data.news && data.news.map((_, i) => (
                      <button 
                        key={`news-dot-nav-${i}`} 
                        onClick={() => setNewsIndex(i)}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-500",
                          i === newsIndex ? "bg-[#00a2b1] w-5" : "bg-slate-200"
                        )} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={() => setNewsIndex(prev => (prev - 1 + (data.news?.length || 1)) % (data.news?.length || 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity z-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setNewsIndex(prev => (prev + 1) % (data.news?.length || 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity z-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Quick Links Grid */}
      <div className="p-6 grid gap-4 grid-cols-2 -mt-6">
        <DashboardCard icon={<MonitorPlay />} label="Aulas Online EAD" color="bg-blue-500" onClick={() => navigateTo("online-classes")} />
        <DashboardCard icon={<FileText />} label="Provas Online" color="bg-blue-500" onClick={() => navigateTo("exams")} />
        <DashboardCard icon={<GraduationCap />} label="Notas e Faltas" color="bg-blue-500" onClick={() => navigateTo("grades")} />
        <DashboardCard icon={<Calendar />} label="Horario de Aulas" color="bg-blue-500" onClick={() => navigateTo("schedule")} />
        <DashboardCard icon={<Bell />} label="Comunicados" color="bg-blue-500" onClick={() => navigateTo("announcements")} />
        <DashboardCard icon={<CreditCard />} label="Cartão Virtual" color="bg-blue-500" onClick={() => navigateTo("card")} />
        <DashboardCard icon={<Wallet />} label="Financeiro" color="bg-blue-500" onClick={() => navigateTo("financial")} />
        <DashboardCard icon={<Library />} label="Atividade Complementar" color="bg-blue-500" onClick={() => navigateTo("activities")} />
        <DashboardCard icon={<UserIcon />} label="Perfil" color="bg-blue-500" onClick={() => navigateTo("profile")} />
        <DashboardCard icon={<BookOpen />} label="Biblioteca Online" color="bg-blue-500" onClick={() => navigateTo("library")} />
      </div>
    </div>
  );

  const DashboardCard = ({ icon, label, color, onClick }: any) => {
    const getIconColor = () => {
      if (label.includes("Notas")) return "text-blue-600";
      if (label.includes("Horario")) return "text-teal-500";
      if (label.includes("Comunicados")) return "text-indigo-600";
      if (label.includes("Cartão")) return "text-pink-600";
      if (label.includes("Financeiro")) return "text-blue-500";
      if (label.includes("Atividade")) return "text-blue-600";
      if (label.includes("Online")) return "text-orange-500";
      if (label.includes("Provas")) return "text-red-500";
      return "text-blue-600";
    };

    return (
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-start justify-between p-4 h-40 active:scale-95 transition-all"
      >
        <div className={getIconColor()}>
          {React.cloneElement(icon, { size: 32 })}
        </div>
        <span className="text-sm font-bold text-slate-700 text-left leading-tight">{label}</span>
      </motion.button>
    );
  };

  const ViewHeader = ({ title, onBack }: { title: string, onBack: () => void }) => (
    <div className="p-4 pt-10 flex items-center justify-between sticky top-0 z-50 shadow-md bg-[#00a2b1] text-white">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 transition-colors text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-medium tracking-wide">{title}</h2>
      </div>
      <button 
        onClick={handleLogout}
        className="p-2 rounded-xl transition-all active:scale-95 text-white hover:bg-white/10"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );

  const GradesView = () => {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <ViewHeader title="Consulta de Notas" onBack={() => navigateTo("dashboard")} />
        
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-slate-500 uppercase tracking-wide">NOTAS DE PROVAS</h1>
            <div className="h-0.5 bg-[#00a2b1] w-full mt-2" />
          </div>

          {data.grades.length > 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="col-span-8">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Disciplina</span>
                </div>
                <div className="col-span-4 text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Notas</span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-100">
                {data.grades.map((grade, index) => (
                  <div key={`grade-row-${grade.id || index}-${index}`} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-slate-50 transition-colors">
                    <div className="col-span-8">
                      <p className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                        {grade.discipline_name}
                      </p>
                    </div>
                    <div className="col-span-4 flex justify-end gap-6">
                      <div className="text-center min-w-[40px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">AV</p>
                        <p className="text-lg font-bold text-[#00a2b1]">
                          {grade.final_grade.toFixed(1).replace('.', ',')}
                        </p>
                      </div>
                      <div className="text-center min-w-[40px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">AVS</p>
                        <p className="text-lg font-bold text-slate-200">-</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Sincronizando notas...</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Estamos preparando seu boletim. Isso pode levar alguns segundos.
                </p>
              </div>
            </div>
          )}

          {data.grades.length > 0 && (
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => window.print()}
                className="bg-white border border-slate-200 text-slate-600 px-8 py-3 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-95"
              >
                Imprimir Boletim
              </button>
            </div>
          )}
        </div>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-[#00a2b1] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-105 transition-transform active:scale-95">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-sm">Posso ajudar?</span>
          </button>
        </div>
      </div>
    );
  };

  const GradeItem = ({ label, value, highlight }: any) => (
    <div className="text-center p-2 bg-slate-50 rounded-2xl">
      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">{label}</p>
      <p className={cn(
        "text-lg font-bold",
        highlight ? "text-[#00a2b1]" : "text-slate-700"
      )}>{value}</p>
    </div>
  );

  const ScheduleView = () => (
    <div className="min-h-screen bg-slate-50">
      <ViewHeader title="Horário de Aulas" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-6">
        {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map((day, dayIdx) => {
          const dayClasses = data.schedule.filter(s => {
            const isSameDay = s.day_of_week === day;
            const userCourse = user?.course?.toLowerCase();
            const matchesCourse = s.course ? (
              Array.isArray(s.course) 
                ? s.course.some(c => c.toLowerCase() === userCourse)
                : s.course.split(',').map((c: string) => c.trim().toLowerCase()).includes(userCourse || "")
            ) : true; // If no course specified, show to everyone
            return isSameDay && matchesCourse;
          });
          if (dayClasses.length === 0) return null;
          return (
            <div key={`day-group-section-${day}-${dayIdx}`} className="space-y-3">
              <h3 className="font-bold uppercase text-xs tracking-widest ml-1 text-slate-400">{day}</h3>
              {dayClasses.map((item, index) => (
                <div key={`schedule-row-${dayIdx}-${item.id || index}-${index}`} className="card flex gap-4 items-center">
                  <div className="w-16 text-center pr-4 border-r border-slate-100">
                    <p className="text-sm font-bold text-[#00a2b1]">{item.time.split(' - ')[0]}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{item.time.split(' - ')[1]}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.professor} • {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const AnnouncementsView = () => (
    <div className="min-h-screen bg-slate-50">
      <ViewHeader title="Comunicados" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-4">
        {[...data.announcements]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((ann, index) => (
            <div key={`ann-full-list-${ann.id || index}-${index}`} className={cn(
              "card relative overflow-hidden",
              ann.important && "border-l-4 border-l-[#00a2b1]"
            )}>
            {ann.important && (
              <div className="absolute top-0 right-0 text-[8px] font-bold px-2 py-1 uppercase bg-[#00a2b1] text-white rounded-bl-lg">
                Importante
              </div>
            )}
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">{ann.date}</p>
            <h3 className="font-bold mb-2 text-slate-900">{ann.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{ann.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const FinancialView = () => (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ViewHeader title="Financeiro" onBack={() => navigateTo("dashboard")} />
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Extrato Financeiro</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Mensalidades e Taxas</p>
        </div>

        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
          {data.payments.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {[...data.payments]
                .sort((a, b) => {
                  const [dayA, monthA, yearA] = a.due_date.split('/').map(Number);
                  const [dayB, monthB, yearB] = b.due_date.split('/').map(Number);
                  const dateA = new Date(yearA, monthA - 1, dayA).getTime();
                  const dateB = new Date(yearB, monthB - 1, dayB).getTime();
                  return dateA - dateB;
                })
                .map((pay, index) => (
                  <div key={`payment-item-${pay.id || index}-${index}`} className="p-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm",
                        pay.status === "Pago" ? "bg-emerald-50 text-emerald-500" : "bg-orange-50 text-orange-500"
                      )}>
                        {pay.status === "Pago" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Vencimento</p>
                        <p className="font-bold text-slate-900">{pay.due_date}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-tighter",
                      pay.status === "Pago" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {pay.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-end pl-13">
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Valor da Parcela</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-slate-400">R$</span>
                        <span className="text-2xl font-black text-slate-900">{pay.amount.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                    
                    {pay.status !== "Pago" && (
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(pay.pix_code);
                          setShowToast({ show: true, message: "Código PIX copiado!", type: 'success' });
                        }}
                        className="px-5 py-2.5 text-xs font-black uppercase tracking-widest flex items-center gap-2 bg-[#00a2b1] text-white rounded-2xl shadow-lg active:scale-95 transition-all hover:bg-[#008a96]"
                      >
                        <Copy className="w-4 h-4" /> Copiar PIX
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6">
              <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Tudo em dia!</h3>
              <p className="text-sm text-slate-400 mt-2">Nenhum boleto pendente ou futuro encontrado em sua conta.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ActivitiesView = () => {
    const [title, setTitle] = useState("");
    const [hours, setHours] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await db.addActivity({
        student_id: user?.id,
        title,
        hours: parseInt(hours),
        certificate_url: "https://example.com/cert.pdf"
      });
      setShowForm(false);
      fetchStudentData(user!.id);
    };

    const totalHours = data.activities
      .filter(a => a.status === 'approved')
      .reduce((acc, curr) => acc + curr.hours, 0);

    return (
      <div className="min-h-screen bg-slate-50">
        <ViewHeader title="Atividades Complementares" onBack={() => navigateTo("dashboard")} />
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="p-6 shadow-xl flex justify-between items-center bg-[#00a2b1] text-white rounded-3xl">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Acumulado</p>
              <p className="text-3xl font-bold">{totalHours}h</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Meta</p>
              <p className="text-xl font-bold">200h</p>
            </div>
          </div>

          <button 
            onClick={() => setShowForm(true)}
            className="w-full py-4 font-bold flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-[#00a2b1] hover:text-[#00a2b1] transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Enviar Novo Certificado
          </button>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Histórico de Envios</h3>
            {data.activities.map((act, index) => (
              <div key={`activity-item-${act.id || index}-${index}`} className="card flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">{act.title}</h4>
                  <p className="text-xs text-slate-500">{act.hours} horas</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn(
                    "px-2 py-1 rounded-lg text-[8px] font-bold uppercase",
                    act.status === 'approved' ? "bg-emerald-100 text-emerald-700" :
                    act.status === 'rejected' ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {act.status === 'approved' ? "Aprovado" : act.status === 'rejected' ? "Rejeitado" : "Em análise"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Novo Envio</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Título da Atividade</label>
                    <input type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Carga Horária</label>
                    <input type="number" className="input-field" value={hours} onChange={e => setHours(e.target.value)} required />
                  </div>
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Toque para selecionar o certificado</p>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-4">Enviar para Análise</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const LibraryView = () => (
    <div className="min-h-screen bg-slate-50">
      <ViewHeader title="Biblioteca Online" onBack={() => navigateTo("dashboard")} />
      <div className="p-6">
        <div className="bg-white rounded-[40px] p-10 text-center shadow-xl border border-slate-100 flex flex-col items-center gap-8">
          <div className="w-24 h-24 bg-[#00a2b1]/10 rounded-full flex items-center justify-center text-[#00a2b1]">
            <BookOpen size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">Biblioteca Digital</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
              Acesse milhares de livros, artigos científicos e materiais de estudo diretamente do seu portal.
            </p>
          </div>
          <button className="bg-[#00a2b1] text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-[#00a2b1]/20 active:scale-95 transition-all">
            Acessar Acervo Completo
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="card p-6 flex flex-col gap-4 hover:border-[#00a2b1] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <p className="font-bold text-sm text-slate-700">Artigos FAPESP</p>
          </div>
          <div className="card p-6 flex flex-col gap-4 hover:border-[#00a2b1] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Search size={24} />
            </div>
            <p className="font-bold text-sm text-slate-700">Base Scielo</p>
          </div>
        </div>
      </div>
    </div>
  );

  const VirtualCardView = () => (
    <div className={cn(
      "min-h-screen flex flex-col overflow-y-auto pb-20",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : 
      appSettings?.theme === 'uni' ? "bg-[#f5f6f8]" : 
      appSettings?.theme === 'barao' ? "bg-slate-50" : "bg-slate-900"
    )}>
      {appSettings?.theme === 'retro' ? (
        <>
          {/* Header Section (Blue) */}
          <div className="bg-[#00678a] text-white pt-12 pb-20 px-6 flex flex-col items-center text-center relative">
            <button onClick={() => navigateTo("dashboard")} className="absolute top-10 left-6 p-2 text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="relative mb-4">
              <img 
                src={user?.photo_url || DEFAULT_AVATAR} 
                className="w-24 h-24 rounded-full border-4 border-white/20 object-cover shadow-xl"
                alt="Profile"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-lg">
                <div className="bg-slate-100 p-1 rounded-full">
                  <UserIcon className="w-3 h-3 text-slate-600" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-white/80 text-sm mb-1">{user?.email || "aluno@baraodatorre.br"}</p>
            <p className="text-white/80 text-sm">{user?.matricula}</p>
            
            <div className="absolute bottom-4 right-6 opacity-60">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>

          {/* Card Section */}
          <div className="px-6 -mt-12 relative z-10">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Top (Blue Gradient) */}
              <div className="bg-gradient-to-br from-[#00678a] to-[#00a2b1] p-8 pb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <div className="absolute top-6 right-8 text-white/40">
                  <Wifi className="w-8 h-8 rotate-90" />
                </div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white p-1.5 rounded-lg shadow-sm">
                    <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{getCollegeName(appSettings)}</h3>
                </div>
                <p className="text-white/60 text-xs mt-4 font-medium uppercase tracking-widest">{user?.course || "Marketing Digital"}</p>
              </div>
              
              {/* Card Bottom (White) */}
              <div className="p-8 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Matrícula</p>
                  <p className="text-slate-900 font-bold text-sm">{user?.matricula}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Estado</p>
                  <p className="text-slate-900 font-bold text-sm">{user?.regularity || "Regular"}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Validade</p>
                  <div className="flex items-center justify-end gap-1.5">
                    {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />}
                    <p className="text-slate-900 font-bold text-sm">{user?.validity || "10 Set 2026"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Info Section (Retro) */}
          <div className="px-6 mt-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Nome Completo</p>
                <p className="text-slate-900 font-bold">{user?.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">CPF</p>
                  <p className="text-slate-900 font-bold">{user?.cpf || "000.000.000-00"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Data de Nascimento</p>
                  <p className="text-slate-900 font-bold">{formatDate(user?.birth_date) || "01/01/2000"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="p-6 mt-4">
            <h4 className="text-slate-900 font-bold mb-4 ml-2">Ações rápidas</h4>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleOpenProof(user!)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <div className="p-3 bg-slate-50 rounded-xl">
                  <FileCheck className="w-8 h-8 text-[#00678a]" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase text-center leading-tight">Comprovante de matrícula</span>
              </button>

              <button 
                onClick={() => {
                  const subject = encodeURIComponent(`Cartão Virtual - ${user?.name}`);
                  const body = encodeURIComponent(`Olá,\n\nSegue os dados do meu Cartão Virtual da ${getCollegeName(appSettings)}:\n\nNome: ${user?.name}\nMatrícula: ${user?.matricula}\nCurso: ${user?.course}\n\nAtenciosamente.`);
                  window.location.href = `mailto:?subject=${subject}&body=${body}`;
                  setShowToast({ show: true, message: "E-mail enviado!", type: 'success' });
                }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Mail className="w-8 h-8 text-[#00678a]" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase text-center leading-tight">Enviar por e-mail</span>
              </button>
            </div>
          </div>

          {/* Informações Simplificadas (Retro) */}
          <div className="px-6 mt-6">
            <div className="w-full space-y-1 text-center border-b border-slate-100 pb-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dados do Estudante</p>
              <h4 className="text-base font-black text-slate-800 leading-tight">{user?.name}</h4>
              <div className="flex items-center justify-center gap-6 mt-1">
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Nascimento</p>
                  <p className="text-xs font-bold text-slate-700">{formatDate(user?.birth_date)}</p>
                </div>
                <div className="w-px h-5 bg-slate-100" />
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">CPF</p>
                  <p className="text-xs font-bold text-slate-700">{user?.cpf}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section (Retro) */}
          <div className="p-8 flex flex-col items-center">
            <div className="p-4 mb-6 bg-white border-2 border-slate-100 rounded-3xl shadow-sm">
              <QRCodeSVG value={`STUDENT:${user?.matricula}`} size={160} />
            </div>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold text-center max-w-xs mb-8">
              Apresente para acesso e meia-entrada
            </p>
          </div>

        </>
      ) : (
        <>
          <div className={cn(
            "p-6 pt-12 flex items-center justify-between sticky top-0 z-50 shadow-md",
            appSettings?.theme === 'uni' ? "bg-gradient-to-b from-[#002b6b] to-[#0044a8] text-white" : 
            appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white" :
            appSettings?.theme === 'retro' ? "bg-[#00678a] text-white" : 
            appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white" : "bg-slate-900 text-white"
          )}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateTo("dashboard")} 
                className={cn(
                  "p-2 rounded-xl transition-all active:scale-95",
                  "bg-white/10 text-white"
                )}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-medium tracking-wide text-white">
                Cartão Virtual
              </h2>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-xl transition-all active:scale-95 bg-white/10 text-white hover:bg-white/20"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className={cn(
            "flex-1 flex items-center justify-center p-6 relative",
            appSettings?.theme === 'uni' && "bg-[#f5f6f8]"
          )}>
            {appSettings?.theme === 'uni' && (
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0044a8] to-transparent opacity-20" />
            )}
            <div className="w-full max-w-sm relative z-10">
              <div className="pb-[62.5%]" /> {/* Aspect ratio hack 1.6:1 */}
              <motion.div 
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                className={cn(
                  "absolute inset-0 shadow-2xl overflow-hidden flex flex-col rounded-xl",
                  appSettings?.theme === 'uni' 
                    ? "bg-white" 
                    : appSettings?.theme === 'uniplan'
                    ? "bg-white p-6 rounded-3xl border-2 border-[#e31a22]/10"
                    : appSettings?.theme === 'barao'
                    ? "bg-white p-4 rounded-3xl border border-slate-100"
                    : "bg-gradient-to-br from-brand-blue to-brand-teal p-6 rounded-3xl"
                )}
              >
                {appSettings?.theme === 'uni' ? (
                  <>
                    {/* Uni Theme Card Design (With Photo) */}
                    <div className="bg-white p-3 flex gap-3 items-start">
                      <div className="w-16 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                        <img src={user?.photo_url || DEFAULT_AVATAR} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-black italic tracking-tighter text-[#fbdf07] drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">UNIP</span>
                        </div>
                        <div className="bg-[#e31e24] px-1.5 py-0.5 mt-1 -ml-1 transform -skew-x-12 w-fit">
                          <span className="text-[7px] font-bold text-white uppercase tracking-tighter italic">Universidade Paulista</span>
                        </div>
                      </div>
                      <div className="text-right pt-1 flex flex-col items-end">
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight leading-tight max-w-[80px]">{user?.course?.toUpperCase() || "ADMINISTRAÇÃO"}</span>
                        <div className="text-slate-400 mt-1">
                          <Wifi className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>

                    {/* Middle Section (Blue Gradient) */}
                    <div className="flex-1 bg-gradient-to-b from-[#b3d4ff] to-[#d9e9ff] p-3 px-4 flex justify-between items-center border-y border-blue-100">
                      <div className="space-y-1.5">
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">MATRICULA:</span>
                          <span className="text-[9px] font-bold text-slate-700">{user?.matricula}</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">SEMESTRE:</span>
                          <span className="text-[9px] font-bold text-slate-700">{user?.semester || "1"}º SEMESTRE</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">IDENTIDADE:</span>
                          <span className="text-[9px] font-bold text-slate-700">{user?.cpf || "457696059"}</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">DATA NASCIMENTO:</span>
                          <span className="text-[9px] font-bold text-slate-700">{formatDate(user?.birth_date) || "11/05/1989"}</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">NOME:</span>
                          <span className="text-[9px] font-bold text-slate-700 leading-tight">{user?.name?.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="bg-white p-1 rounded-sm shadow-sm border border-blue-100 flex-shrink-0">
                        <QRCodeSVG value={`STUDENT:${user?.matricula}`} size={60} />
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="bg-white p-2 px-4 text-right flex items-center justify-end gap-1.5">
                      {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />}
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Validade: {user?.validity?.toUpperCase() || "JUN/2024"}</span>
                    </div>
                  </>
                ) : appSettings?.theme === 'uniplan' ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-black italic tracking-tighter text-[#e31a22] leading-none">UNIPLAN</h3>
                        <p className="text-[6px] font-bold text-slate-400 uppercase tracking-widest mt-1">Centro Universitário Planalto</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="px-2 py-0.5 bg-[#e31a22] rounded text-[8px] font-bold text-white uppercase mb-1">
                          Estudante
                        </div>
                        <Wifi className="w-5 h-5 text-[#e31a22] rotate-90" />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-center mb-4">
                      <div className="w-20 h-24 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-inner">
                        <img src={user?.photo_url || DEFAULT_AVATAR} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-black text-slate-800 leading-tight mb-0.5">{user?.name?.toUpperCase()}</h4>
                        <p className="text-[9px] font-bold text-[#e31a22] uppercase mb-2">{user?.course}</p>
                        
                        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                          <div>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">Matrícula</p>
                            <p className="text-[10px] font-black text-slate-700">{user?.matricula}</p>
                          </div>
                          <div>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">Semestre</p>
                            <p className="text-[10px] font-black text-slate-700">{user?.semester || "1"}º</p>
                          </div>
                          <div>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">Validade</p>
                            <div className="flex items-center gap-1">
                              {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />}
                              <p className="text-[10px] font-black text-slate-700">{user?.validity || "12/2026"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-end items-end border-t border-slate-100 pt-3">
                      <div className="text-right">
                        <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">Status Acadêmico</p>
                        <div className="flex items-center gap-1 justify-end">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <p className="text-[10px] font-black text-slate-700 uppercase">{user?.regularity || "Ativo"}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : appSettings?.theme === 'barao' ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-white flex items-center justify-center p-1 rounded-full shadow-md border border-slate-50">
                        <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <h3 className="text-base font-black text-[#00a2b1] leading-tight">{getCollegeName(appSettings)}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Cartão de Identificação</p>
                          <Wifi className="w-3.5 h-3.5 text-[#00a2b1] rotate-90" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mb-4">
                      <div className="w-20 h-28 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        <img src={user?.photo_url || DEFAULT_AVATAR} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-xs font-black text-slate-800 leading-tight mb-0.5">{user?.name?.toUpperCase()}</h4>
                        <p className="text-[9px] font-bold text-[#00a2b1] uppercase mb-2">{user?.course}</p>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Matrícula</p>
                              <p className="text-[10px] font-black text-slate-700">{user?.matricula}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Semestre</p>
                              <p className="text-[10px] font-black text-slate-700">{user?.semester || "1"}º Semestre</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Estado do Aluno</p>
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <p className="text-[10px] font-black text-slate-700 uppercase">{user?.regularity || "ATIVO"}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Validade</p>
                              <p className="text-[10px] font-black text-slate-700">{user?.validity || "10/2026"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-end items-end">
                    </div>
                  </>
                ) : (
                  <>
                    {/* Card Design Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-teal/20 rounded-full -ml-10 -mb-10 blur-2xl" />
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white flex-shrink-0 overflow-hidden shadow-sm rounded-xl">
                          <div 
                            className="w-full h-full bg-center bg-no-repeat bg-contain" 
                            style={{ backgroundImage: `url(${appSettings.logo_url})` }}
                          />
                        </div>
                        <h3 className="font-bold tracking-tight text-lg leading-tight text-white">{getCollegeName(appSettings)}</h3>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="px-3 py-1 backdrop-blur-md bg-white/20 rounded-full text-white">
                          <p className="text-[10px] font-bold uppercase">Estudante</p>
                        </div>
                        <div className="text-white/60">
                          <Wifi className="w-8 h-8 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex gap-4 items-end">
                      <img 
                        src={user?.photo_url || DEFAULT_AVATAR} 
                        className="w-20 h-24 flex-shrink-0 object-cover shadow-lg rounded-xl border-2 border-white/30"
                        alt="Student"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 pb-1">
                        <h4 className="font-bold text-lg leading-tight mb-1 text-white">{user?.name}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-teal-100">
                          {user?.course} <span className="ml-4 opacity-80">{user?.semester}º Semestre</span>
                        </p>
                        <div className="mt-3 flex gap-4">
                          <div>
                            <p className="text-[8px] font-bold uppercase text-teal-100">Matrícula</p>
                            <p className="text-xs font-mono font-bold text-white">{user?.matricula}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase text-teal-100">Validade</p>
                            <div className="flex items-center gap-1.5">
                              {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                              <p className="text-xs font-bold text-white">{user?.validity || "12/2026"}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase text-teal-100">Estado</p>
                            <p className="text-xs font-bold text-white">{user?.regularity || "Regular"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          <div className="p-8 flex flex-col items-center bg-white rounded-t-[40px]">
            {/* Informações Simplificadas */}
            <div className="w-full space-y-1 mb-6 text-center border-b border-slate-50 pb-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dados do Estudante</p>
              <h4 className="text-base font-black text-slate-800 leading-tight">{user?.name}</h4>
              <div className="flex items-center justify-center gap-6 mt-1">
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Nascimento</p>
                  <p className="text-xs font-bold text-slate-700">{formatDate(user?.birth_date)}</p>
                </div>
                <div className="w-px h-5 bg-slate-100" />
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">CPF</p>
                  <p className="text-xs font-bold text-slate-700">{user?.cpf}</p>
                </div>
              </div>
            </div>

            {appSettings?.theme === 'uni' && (
              <div className="flex flex-col items-center py-10">
                <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Wifi className="w-20 h-20 text-blue-600 rotate-90" />
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest text-center">
                  Aproxime do leitor para acesso
                </p>
              </div>
            )}
            {appSettings?.theme !== 'uni' && (
              <>
                <div className="p-4 mb-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <QRCodeSVG value={`STUDENT:${user?.matricula}`} size={180} />
                </div>
                <p className="text-slate-400 text-[10px] text-center max-w-xs mb-8 italic">
                  Apresente este QR Code para acesso às dependências da Academy. Este documento é de uso interno e não substitui a Carteira de Identificação Estudantil (CIE), não garantindo benefícios legais como meia-entrada.
                </p>
              </>
            )}

            <button 
              onClick={() => handleOpenProof(user!)}
              className={cn(
                "w-full py-4 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all",
                appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white rounded-2xl" :
                appSettings?.theme === 'retro' ? "bg-[#00a2b1] text-white rounded-xl" : 
                appSettings?.theme === 'uni' ? "bg-[#0044a8] text-white rounded-2xl" : 
                appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white rounded-2xl" : "bg-brand-teal text-white rounded-2xl"
              )}
            >
              <FileCheck className="w-5 h-5" /> Comprovante de matrícula
            </button>

            {appSettings?.theme !== 'uni' && (
              <>
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent(`Cartão Virtual - ${user?.name}`);
                    const body = encodeURIComponent(`Olá,\n\nSegue os dados do meu Cartão Virtual da ${getCollegeName(appSettings)}:\n\nNome: ${user?.name}\nMatrícula: ${user?.matricula}\nCurso: ${user?.course}\n\nAtenciosamente.`);
                    window.location.href = `mailto:?subject=${subject}&body=${body}`;
                    setShowToast({ show: true, message: "E-mail enviado com sucesso!", type: 'success' });
                  }}
                  className={cn(
                    "w-full py-4 mt-4 font-bold flex items-center justify-center gap-2 transition-all active:scale-95",
                    appSettings?.theme === 'retro' ? "bg-white text-[#00678a] border border-slate-200 rounded-xl" : "bg-slate-100 text-slate-700 rounded-2xl hover:bg-slate-200"
                  )}
                >
                  <Mail className="w-5 h-5" /> Enviar por e-mail
                </button>
              </>
            )}

            {appSettings?.theme === 'uni' && (
              <button 
                onClick={handleLogout}
                className="w-full py-4 mt-4 bg-slate-100 text-slate-700 font-bold rounded-2xl"
              >
                Sair da Conta
              </button>
            )}

          </div>
        </>
      )}
    </div>
  );

  const ExamsView = () => {
    const removeAccents = (str: string) => 
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filteredExams = data.exams.filter(exam => {
      // Course filter
      if (exam.course) {
        const userCourse = removeAccents((user?.course || "").toLowerCase());
        if (userCourse) {
          let hasCourse = false;
          if (Array.isArray(exam.course)) {
            hasCourse = exam.course.some(c => removeAccents(c.toLowerCase()) === userCourse);
          } else {
            // Handle potential JSON string or comma-separated string
            let courseStr = exam.course;
            // If it looks like a JSON array string, clean it up
            if (courseStr.startsWith('[') && courseStr.endsWith(']')) {
              try {
                const parsed = JSON.parse(courseStr);
                if (Array.isArray(parsed)) {
                  hasCourse = parsed.some(c => removeAccents(c.toLowerCase()) === userCourse);
                }
              } catch (e) {
                // Not JSON, just clean it up
                courseStr = courseStr.replace(/[\[\]"]/g, '');
              }
            }
            
            if (!hasCourse) {
              const courses = courseStr.split(',').map((c: string) => 
                removeAccents(c.trim().replace(/[\[\]"]/g, '').toLowerCase())
              );
              hasCourse = courses.includes(userCourse);
            }
          }
          if (!hasCourse) return false;
        }
      }

      // Date filter: only show future exams (today or later)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const examDate = new Date(exam.date + 'T00:00:00');
      return examDate >= today;
    });

    return (
      <div className="min-h-screen bg-slate-50">
        <ViewHeader title="Provas Online" onBack={() => navigateTo("dashboard")} />
        <div className="p-6 space-y-4">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => (
              <div key={`exam-row-${exam.id || index}-${index}`} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{exam.discipline_name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Avaliação {exam.type}</p>
                  </div>
                  <div className="px-3 py-1 bg-[#00a2b1]/10 text-[#00a2b1] rounded-xl">
                    <p className="text-[10px] font-bold uppercase">Data</p>
                    <p className="text-sm font-bold">{new Date(exam.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium">{exam.time}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      {exam.link ? (
                        <Wifi className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">{exam.link ? "Online" : "Presencial"}</span>
                    </div>
                  </div>
                  {exam.link && (
                    <button 
                      onClick={() => window.open(exam.link, '_blank')}
                      className="px-4 py-2 bg-[#00a2b1] text-white text-[10px] font-bold uppercase rounded-lg shadow-lg active:scale-95 transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-3 h-3" /> Acessar Prova
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="card text-center py-12 text-slate-400">
              Nenhuma prova agendada para seu curso.
            </div>
          )}
        </div>
      </div>
    );
  };

  const OnlineClassesView = () => {
    const limitedClasses = data.online_classes.filter(cls => {
      if (!cls.course) return true;
      const userCourse = user?.course?.toLowerCase();
      if (!userCourse) return false;

      console.log("Filtrando Aula Online:", cls.discipline_name, "| Curso da Aula:", cls.course, "| Curso do Aluno:", user?.course);

      if (Array.isArray(cls.course)) {
        return cls.course.some(c => c.toLowerCase() === userCourse);
      }
      
      // Handle comma-separated string from Supabase
      const courses = cls.course.split(',').map((c: string) => c.trim().toLowerCase());
      return courses.includes(userCourse);
    });

    return (
      <div className="min-h-screen bg-slate-50">
        <ViewHeader title="Aulas Online EAD" onBack={() => navigateTo("dashboard")} />
        <div className="p-6 space-y-4">
          {limitedClasses.length > 0 ? (
            limitedClasses.map((cls, index) => (
              <div key={`online-class-row-${cls.id || index}-${index}`} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{cls.discipline_name}</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="text-xs text-slate-500">
                        {cls.day_of_week ? (cls.day_of_week.split('-')[0].charAt(0).toUpperCase() + cls.day_of_week.split('-')[0].slice(1).toLowerCase()) : (cls.date ? new Date(cls.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0].charAt(0).toUpperCase() + new Date(cls.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0].slice(1).toLowerCase() : 'Sem data')} • {cls.time}
                      </p>
                      <div className="flex items-center gap-2">
                        {cls.mandatory && (
                          <span className="text-[8px] font-bold px-2 py-1 uppercase tracking-wider bg-[#00a2b1]/10 text-[#00a2b1] rounded-lg">
                            Obrigatória
                          </span>
                        )}
                        {(() => {
                          const courses = Array.isArray(cls.course) 
                            ? cls.course 
                            : (cls.course ? cls.course.split(',').map((c: string) => c.trim()) : []);
                          
                          if (courses.length === 0) {
                            return (
                              <span className="text-[8px] font-bold px-2 py-1 uppercase tracking-wider bg-slate-100 text-slate-500 rounded-lg">
                                Não vinculado
                              </span>
                            );
                          }

                          return courses.map((c: string, i: number) => (
                            <span key={`oc-course-tag-${cls.id}-${i}`} className="text-[8px] font-bold px-2 py-1 uppercase tracking-wider bg-slate-100 text-slate-500 rounded-lg">
                              {c}
                            </span>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-orange-50 text-orange-500 rounded-2xl">
                    <Monitor className="w-6 h-6" />
                  </div>
                </div>
                <button 
                  onClick={() => window.open(cls.link, '_blank')}
                  className="w-full py-4 font-bold flex items-center justify-center gap-2 shadow-lg bg-[#00a2b1] text-white rounded-2xl active:scale-95 transition-all"
                >
                  <ExternalLink className="w-5 h-5" /> Acessar Aula Online
                </button>
              </div>
            ))
          ) : (
            <div className="card text-center py-12 text-slate-400">
              Nenhuma aula online agendada para seu curso nesta semana.
            </div>
          )}

          <div className="pt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">Links de Acesso Rápido</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => window.open('https://meet.google.com', '_blank')}
                className="card p-4 flex flex-col items-center gap-3 hover:border-[#00a2b1] transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-700">Google Meet</span>
              </button>
              <button 
                onClick={() => window.open('https://zoom.us', '_blank')}
                className="card p-4 flex flex-col items-center gap-3 hover:border-[#00a2b1] transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-700">Zoom</span>
              </button>
              <button 
                onClick={() => window.open('https://teams.microsoft.com', '_blank')}
                className="card p-4 flex flex-col items-center gap-3 hover:border-[#00a2b1] transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-700">MS Teams</span>
              </button>
              <button 
                onClick={() => window.open('https://classroom.google.com', '_blank')}
                className="card p-4 flex flex-col items-center gap-3 hover:border-[#00a2b1] transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-700">Classroom</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    setError("");
    try {
      let finalPhotoUrl = user.photo_url;

      if (selectedPhotoFile) {
        // Delete old photo if it exists
        if (user.photo_url && user.photo_url.includes('student-photos')) {
          try {
            const urlParts = user.photo_url.split('/student-photos/');
            if (urlParts.length > 1) {
              // Strip query parameters if present (e.g., ?t=...)
              const oldPath = urlParts[1].split('?')[0];
              await db.deleteFile('student-photos', oldPath);
            }
          } catch (deleteErr) {
            console.warn("Could not delete old photo:", deleteErr);
          }
        }

        // Upload to Supabase Storage
        const fileExt = selectedPhotoFile.name.split('.').pop();
        // Using a deterministic filename to avoid multiplying files
        const fileName = `${user.id}.${fileExt}`;
        const filePath = `avatars/${fileName}`;
        
        try {
          const publicUrl = await db.uploadFile('student-photos', filePath, selectedPhotoFile);
          // Add timestamp for cache busting
          finalPhotoUrl = `${publicUrl}?t=${Date.now()}`;
        } catch (uploadErr: any) {
          console.error("Upload error details:", uploadErr);
          setError("Erro ao enviar a foto. Verifique sua conexão com a internet.");
          setIsSavingProfile(false);
          return;
        }
      }

      const updated = await db.updateStudent(user.id, {
        birth_state: editBirthState,
        nationality: editNationality,
        gender: editGender,
        marital_status: editMaritalStatus,
        short_name: editShortName,
        photo_url: finalPhotoUrl
      });
      
      setUser(updated);
      setEditPhotoUrl(updated.photo_url || "");
      setIsEditingProfile(false);
      setSelectedPhotoFile(null);
      setShowToast({ show: true, message: "Perfil atualizado!", type: 'success' });
      console.log("Profile updated successfully!");
    } catch (err: any) {
      console.error("Erro ao salvar perfil:", err);
      setError("Erro de conexão ao salvar o perfil. Verifique sua rede.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const ProfileView = () => (
    <div className="min-h-screen pb-20 bg-slate-50">
      <ViewHeader 
        title="Meu Perfil" 
        onBack={() => navigateTo("dashboard")} 
      />
      
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-xl mb-4 border-[#00a2b1] relative">
              <img 
                src={editPhotoUrl || user?.photo_url || DEFAULT_AVATAR} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {isEditingProfile && (
                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="w-8 h-8 text-white mb-1" />
                  <span className="text-[10px] text-white font-bold uppercase">Alterar Foto</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedPhotoFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditPhotoUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
            {isEditingProfile && (
              <div className="absolute -right-4 bottom-4 flex flex-col items-center gap-1">
                <button 
                  onClick={() => {
                    const input = document.getElementById('profile-photo-input');
                    if (input) input.click();
                  }}
                  className="bg-white p-3 rounded-full shadow-xl border border-slate-100 text-[#00a2b1] hover:bg-slate-50 transition-all active:scale-90 flex items-center justify-center group"
                  title="Trocar Foto"
                >
                  <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <input 
                    id="profile-photo-input"
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedPhotoFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditPhotoUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </button>
                <span className="text-[9px] font-black text-[#00a2b1] bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-100 uppercase">Trocar Foto</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-black text-slate-800 text-center">{user?.name}</h2>
          <p className="text-sm font-bold uppercase tracking-widest mt-1 text-[#00a2b1]">
            {user?.course}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4">
          <div className="card space-y-4">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Informações Acadêmicas</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Matrícula</p>
                <p className="text-sm font-black text-slate-700">{user?.matricula}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Semestre</p>
                <p className="text-sm font-black text-slate-700">{user?.semester}º Semestre</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Validade</p>
                <p className="text-sm font-black text-slate-700">{user?.validity}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <p className="text-sm font-black text-slate-700 uppercase">{user?.regularity}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Data de Cadastro</p>
                <p className="text-sm font-black text-slate-700">{formatDate(user?.enrollment_date)}</p>
              </div>
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Dados Pessoais</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nome Completo</p>
                  <p className="text-sm font-black text-slate-700">{user?.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">CPF</p>
                  <p className="text-sm font-black text-slate-700">{user?.cpf}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Data de Nascimento</p>
                  <p className="text-sm font-black text-slate-700">{formatDate(user?.birth_date)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Estado de Nascimento</p>
                  {isEditingProfile ? (
                    <input 
                      type="text" 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editBirthState}
                      onChange={(e) => setEditBirthState(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.birth_state}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nacionalidade</p>
                  {isEditingProfile ? (
                    <input 
                      type="text" 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editNationality}
                      onChange={(e) => setEditNationality(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.nationality}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sexo</p>
                  {isEditingProfile ? (
                    <select 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editGender}
                      onChange={(e) => setEditGender(e.target.value)}
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.gender}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Estado Civil</p>
                  {isEditingProfile ? (
                    <select 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editMaritalStatus}
                      onChange={(e) => setEditMaritalStatus(e.target.value)}
                    >
                      <option value="Solteiro">Solteiro(a)</option>
                      <option value="Casado">Casado(a)</option>
                      <option value="Divorciado">Divorciado(a)</option>
                      <option value="Viúvo">Viúvo(a)</option>
                    </select>
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.marital_status}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nome Abreviado</p>
                  {isEditingProfile ? (
                    <input 
                      type="text" 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editShortName}
                      onChange={(e) => setEditShortName(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.short_name}</p>
                  )}
                </div>
              </div>

              {isEditingProfile && (
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => {
                      setIsEditingProfile(false);
                      setEditPhotoUrl(user?.photo_url || "");
                    }}
                    className="flex-1 py-2 text-xs font-bold text-slate-500 uppercase bg-slate-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="flex-1 py-2 text-xs font-bold text-white uppercase bg-blue-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSavingProfile ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </button>
                </div>
              )}

              {!isEditingProfile && (
                <button 
                  onClick={() => {
                    setEditBirthState(user?.birth_state || "");
                    setEditNationality(user?.nationality || "");
                    setEditGender(user?.gender || "");
                    setEditMaritalStatus(user?.marital_status || "");
                    setEditShortName(user?.short_name || "");
                    setEditPhotoUrl(user?.photo_url || "");
                    setIsEditingProfile(true);
                  }}
                  className="w-full py-3 text-xs font-bold text-blue-600 uppercase bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Alterar Dados Cadastrais
                </button>
              )}
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Configurações de Conta</h3>
            
            <button 
              onClick={handleLogout}
              className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all border border-red-100"
            >
              <LogOut className="w-5 h-5" /> Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto md:max-w-none bg-slate-50 min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isSimulatingLoading && (
          <LoadingOverlay 
            appSettings={appSettings} 
            onForceEnter={() => {
              setIsSimulatingLoading(false);
              setLoading(false);
            }} 
          />
        )}
        {isDashboardLoading && <DashboardLoadingOverlay />}
      </AnimatePresence>
      
      <AnimatePresence>
        {showProofUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-10"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full w-full max-w-4xl mx-auto"
            >
              <div className="p-4 bg-slate-900 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <span className="font-bold text-sm">Comprovante de Matrícula</span>
                </div>
                <button 
                  onClick={() => setShowProofUrl(null)} 
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-hidden bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
                {showProofUrl.includes('application/pdf') ? (
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center shadow-inner">
                      <FileText className="w-12 h-12 text-red-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900">Documento PDF</h4>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto">
                        O sistema detectou um documento PDF. Como ele não pode ser visualizado diretamente no navegador móvel, toque no botão abaixo para abri-lo.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        try {
                          const parts = showProofUrl.split(';base64,');
                          const contentType = parts[0].split(':')[1];
                          const raw = window.atob(parts[1]);
                          const uInt8Array = new Uint8Array(raw.length);
                          for (let i = 0; i < raw.length; i++) uInt8Array[i] = raw.charCodeAt(i);
                          const blob = new Blob([uInt8Array], { type: contentType });
                          const blobUrl = URL.createObjectURL(blob);
                          
                          const link = document.createElement('a');
                          link.href = blobUrl;
                          link.target = '_blank';
                          link.download = 'comprovante_matricula.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } catch (e) {
                          window.open(showProofUrl, '_blank');
                        }
                      }}
                      className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                    >
                      <ExternalLink className="w-5 h-5" /> ABRIR DOCUMENTO
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                    <img 
                      src={showProofUrl} 
                      className="max-w-full h-auto object-contain rounded-lg shadow-sm" 
                      alt="Comprovante Imagem" 
                    />
                  </div>
                )}
                
                <div className="mt-8 p-4 bg-white border border-slate-200 rounded-2xl w-full max-w-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Opção de Backup</p>
                  <a 
                    href={showProofUrl} 
                    download="comprovante.pdf"
                    className="flex items-center justify-center gap-2 text-[#00a2b1] font-bold text-sm hover:underline"
                  >
                    <Upload className="w-4 h-4 rotate-180" /> Baixar via Navegador
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        <ForgotRecoveryModal 
          key="forgot-modal"
          isOpen={showForgotModal}
          onClose={resetForgotFlow}
          step={forgotStep}
          setStep={setForgotStep}
          type={forgotType}
          setType={setForgotType}
          email={forgotEmail}
          setEmail={setForgotEmail}
          otp={forgotOtp}
          setOtp={setForgotOtp}
          result={forgotResult}
          isLoading={isForgotLoading}
          onAction={handleForgotAction}
        />
        
        {/* Reset Password Modal */}
        <AnimatePresence>
          {showResetModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl"
              >
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Nova Senha</h3>
                </div>
                <div className="p-8 space-y-6">
                  <p className="text-sm text-slate-500 font-medium">Digite sua nova senha abaixo para recuperar o acesso.</p>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="password" 
                      className="input-field pl-12 h-14 rounded-2xl"
                      placeholder="Nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleResetPassword}
                    disabled={!newPassword || isResetLoading}
                    className="w-full h-14 bg-[#00a2b1] text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isResetLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "ATUALIZAR SENHA"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <SignUpModal 
          key="signup-modal"
          isOpen={showSignUpModal}
          onClose={() => { setShowSignUpModal(false); setSignUpSuccessMatricula(null); }}
          successMatricula={signUpSuccessMatricula}
          isLoading={isSignUpLoading}
          onSubmit={handleSignUp}
        />
      </AnimatePresence>
      {renderView()}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={cn(
              "fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl z-[100]",
              showToast.type === 'error' ? "bg-red-600 text-white" : "bg-slate-800 text-white"
            )}
          >
            {showToast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5 text-[#00a2b1]" />}
            <span className="font-bold text-sm">{showToast.message || "Operação realizada!"}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    );
  } catch (err: any) {
    console.error("CRITICAL ERROR in App component:", err);
    return (
      <div style={{ padding: '20px', color: 'red', backgroundColor: 'white', minHeight: '100vh', overflow: 'auto' }}>
        <h1>Critical Error in App Component</h1>
        <p><strong>Message:</strong> {err.message || "An unknown error occurred during App initialization."}</p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>{err.stack}</pre>
        <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#00a2b1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reload Page</button>
      </div>
    );
  }
}
