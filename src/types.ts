
export interface User {
  id: number;
  matricula: string;
  password?: string;
  name: string;
  course?: string;
  semester?: number;
  validity?: string;
  regularity?: string;
  cpf?: string;
  birth_date?: string;
  enrollment_date?: string;
  birth_state?: string;
  nationality?: string;
  gender?: string;
  marital_status?: string;
  short_name?: string;
  email?: string;
  address?: string;
  city?: string;
  cep?: string;
  role: 'admin' | 'student';
  status?: 'active' | 'blocked';
  photo_url?: string;
  enrollment_proof_url?: string;
  enrollment_proof_urls?: Record<string, string>;
}

export interface Schedule {
  id: number;
  name: string;
  professor: string;
  room: string;
  day_of_week: string;
  time: string;
  course?: string | string[]; // Linked course(s)
}

export interface Grade {
  id: number;
  student_id: number;
  discipline_id: number;
  discipline_name: string;
  grade_b1: number;
  grade_b2: number;
  final_grade: number;
  absences: number;
  status: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export interface Payment {
  id: number;
  student_id: number;
  amount: number;
  due_date: string;
  status: 'Pago' | 'Em aberto';
  pix_code: string;
}

export interface Activity {
  id: number;
  student_id: number;
  title: string;
  hours: number;
  status: 'approved' | 'pending' | 'rejected';
  certificate_url: string;
}

export interface Exam {
  id: number;
  discipline_id: number;
  discipline_name: string;
  date: string;
  time: string;
  type: string;
  course?: string | string[]; // Linked course(s)
  link?: string; // Online exam link
}

export interface OnlineClass {
  id: number;
  discipline_id: number;
  discipline_name: string;
  course: string | string[]; // Can be linked to multiple courses
  link: string;
  date: string;
  day_of_week: string;
  time: string;
  mandatory: boolean;
}

export interface AppSettings {
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  theme: string;
  college_name: string;
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface DashboardData {
  grades: Grade[];
  schedule: Schedule[];
  news: NewsItem[];
  announcements: Announcement[];
  payments: Payment[];
  activities: Activity[];
  exams: Exam[];
  online_classes: OnlineClass[];
}
