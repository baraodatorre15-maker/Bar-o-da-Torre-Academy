// Local Storage based database for offline usage
const DB_KEY = "edumanager_db";
const FILE_DB_NAME = "edumanager_files";
const FILE_STORE_NAME = "files";

export const COURSES = [
  "Administração",
  "Design Gráfico",
  "Direito",
  "Engenharia de Software",
  "Farmácia",
  "Medicina",
  "Psicologia"
];

export const initialData = {
  users: [
    {
      id: 1,
      matricula: "admin",
      password: "1515",
      name: "Administrador Sistema",
      role: "admin",
      photo_url: "https://picsum.photos/seed/admin/200/200",
      status: "active"
    },
    {
      id: 2,
      matricula: "20220919",
      password: "123456",
      name: "Mateus Fernandes",
      course: "DESIGN GRÁFICO",
      semester: 1,
      validity: "12/2026",
      regularity: "Regular",
      cpf: "123.456.789-00",
      birth_date: "15/05/2000",
      enrollment_date: "10/02/2026",
      birth_state: "SP",
      nationality: "Brasileira",
      gender: "Masculino",
      marital_status: "Solteiro",
      short_name: "Mateus",
      email: "20220919@instituicao.br",
      role: "student",
      photo_url: "https://instagram.frao2-1.fna.fbcdn.net/v/t51.82787-19/524607852_18286724086249019_150308545640432068_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby44MjcuYzIifQ&_nc_ht=instagram.frao2-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QEPhcvkzy9ViP7b39p2MNHkbkwdI4kl3x-EvxFPwqvyhmYJ6FS11evaybGytG1aut8aU5-ODI52iErjDz3cf4jt&_nc_ohc=wI29r77OcMAQ7kNvwFqjlUA&_nc_gid=pSbilv59RtgUGh4TsBJ8bw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Afymj4_i98FGXX9UM24o4DbiO2w8Mx9jaX-dMDD6EWeVEw&oe=69B68DBD&_nc_sid=7a9f4b",
      enrollment_proof_url: "https://drive.google.com/file/d/1ajgIitZ0hD__BAKqdtTVSxuuYH0km3lR/view?usp=drive_link",
      enrollment_proof_urls: {},
      status: "active"
    },
    {
      id: 3,
      matricula: "2024001",
      password: "aluno123",
      name: "João Silva",
      course: "Engenharia de Software",
      semester: 3,
      validity: "12/2026",
      regularity: "Regular",
      cpf: "987.654.321-11",
      birth_date: "20/10/2002",
      enrollment_date: "10/02/2026",
      birth_state: "RJ",
      nationality: "Brasileira",
      gender: "Masculino",
      marital_status: "Solteiro",
      short_name: "João",
      email: "2024001@instituicao.br",
      role: "student",
      photo_url: "https://drive.google.com/file/d/1746yLwXeJWKoaOtfUa9lGwGyS7aahoe_/preview",
      enrollment_proof_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      enrollment_proof_urls: {},
      status: "active"
    },
    {
      id: 4,
      matricula: "20221515",
      password: "1515",
      name: "Guilherme Queiroz",
      course: "Farmácia",
      semester: 1,
      validity: "12/2026",
      regularity: "Regular",
      cpf: "456.789.123-22",
      birth_date: "05/02/1998",
      enrollment_date: "10/02/2026",
      birth_state: "MG",
      nationality: "Brasileira",
      gender: "Masculino",
      marital_status: "Solteiro",
      short_name: "Guilherme",
      email: "20221515@instituicao.br",
      role: "student",
      photo_url: "https://drive.google.com/file/d/1746yLwXeJWKoaOtfUa9lGwGyS7aahoe_/view?usp=drive_link",
      enrollment_proof_url: "https://drive.google.com/file/d/1DcbkK1ML2KukIqznDHqI9TcI7z-W78Kb/view?usp=drive_link",
      enrollment_proof_urls: {},
      status: "active"
    },
    {
      id: 5,
      matricula: "20252712",
      password: "2712",
      name: "Carlos Henrique Mesquita Seifert",
      course: "Farmácia",
      semester: 1,
      validity: "12/2026",
      regularity: "Regular",
      cpf: "321.654.987-33",
      birth_date: "12/12/2004",
      enrollment_date: "10/02/2026",
      birth_state: "PR",
      nationality: "Brasileira",
      gender: "Masculino",
      marital_status: "Solteiro",
      email: "20252712@instituicao.br",
      role: "student",
      photo_url: "https://picsum.photos/seed/student5/200/200",
      enrollment_proof_url: "https://drive.google.com/file/d/1oRkBd4jFEJJhmsZdVatoN8HMycL2IwhJ/view?usp=drive_link",
      enrollment_proof_urls: {},
      status: "active"
    }
  ],
  disciplines: [
    { id: 1, name: "Cálculo I", professor: "Dr. Marcelo Souza", room: "Sala 101", day_of_week: "Segunda-feira", time: "08:00 - 10:00" },
    { id: 2, name: "Programação Web", professor: "Prof. Fernando Henrique", room: "Lab 02", day_of_week: "Terça-feira", time: "10:00 - 12:00" },
    { id: 3, name: "Estrutura de Dados", professor: "Dra. Patrícia Gomes", room: "Sala 204", day_of_week: "Quarta-feira", time: "08:00 - 10:00" },
    { id: 4, name: "Química Orgânica", professor: "Dr. Cláudio Ferreira", room: "Lab 05", day_of_week: "Quinta-feira", time: "08:00 - 10:00" },
    { id: 5, name: "Anatomia Humana", professor: "Dra. Luciana Ribeiro", room: "Sala 302", day_of_week: "Sexta-feira", time: "10:00 - 12:00" },
    { id: 6, name: "Bioquímica Clínica", professor: "Prof. Sérgio Ramos", room: "Lab 03", day_of_week: "Segunda-feira", time: "14:00 - 16:00" },
    { id: 7, name: "Farmacologia I", professor: "Dra. Camila Rodrigues", room: "Sala 105", day_of_week: "Quarta-feira", time: "10:00 - 12:00" },
    { id: 8, name: "Direito Civil", professor: "Dr. Bruno Alves", room: "Sala 201", day_of_week: "Terça-feira", time: "19:00 - 21:00" },
    { id: 9, name: "Gestão Estratégica", professor: "Prof. Eduardo Jorge", room: "Sala 405", day_of_week: "Quinta-feira", time: "19:00 - 21:00" },
    { id: 10, name: "Psicologia Social", professor: "Dra. Aline Moraes", room: "Sala 102", day_of_week: "Segunda-feira", time: "08:00 - 10:00" },
    { id: 11, name: "Sistemas Operacionais", professor: "Prof. João Pereira", room: "Lab 01", day_of_week: "Sexta-feira", time: "08:00 - 10:00" },
    { id: 12, name: "Marketing Digital", professor: "Dra. Sandra Helena", room: "Sala 303", day_of_week: "Terça-feira", time: "14:00 - 16:00" }
  ],
  grades: [
    { id: 1, student_id: 2, discipline_id: 1, discipline_name: "Cálculo I", grade_b1: 8.5, grade_b2: 7.0, final_grade: 7.75, status: "Aprovado" },
    { id: 2, student_id: 2, discipline_id: 2, discipline_name: "Programação Web", grade_b1: 9.0, grade_b2: 0, final_grade: 4.5, status: "Em andamento" },
    { id: 3, student_id: 4, discipline_id: 4, discipline_name: "Química Orgânica", grade_b1: 7.5, grade_b2: 0, final_grade: 3.75, status: "Em andamento" },
    { id: 4, student_id: 4, discipline_id: 5, discipline_name: "Anatomia Humana", grade_b1: 8.0, grade_b2: 0, final_grade: 4.0, status: "Em andamento" },
    { id: 5, student_id: 5, discipline_id: 4, discipline_name: "Química Orgânica", grade_b1: 9.0, grade_b2: 0, final_grade: 4.5, status: "Em andamento" },
    { id: 6, student_id: 5, discipline_id: 5, discipline_name: "Anatomia Humana", grade_b1: 8.5, grade_b2: 0, final_grade: 4.25, status: "Em andamento" }
  ],
  announcements: [
    { id: 1, title: "Início das Rematrículas 2026.2", content: "As rematrículas para o próximo semestre começam dia 15/06/2026.", date: "2026-03-01", important: true },
    { id: 2, title: "Palestra: O Futuro da IA", content: "Não percam a palestra sobre o impacto da IA generativa no mercado de trabalho amanhã no auditório.", date: "2026-03-02", important: false },
    { id: 3, title: "Semana Acadêmica 2026", content: "Participe das palestras e workshops entre os dias 10 e 14 de maio. Inscrições no portal.", date: "2026-03-05", important: true },
    { id: 4, title: "Exame de Proficiência", content: "Inscrições abertas para o exame de proficiência em língua estrangeira até o fim do mês.", date: "2026-03-08", important: false },
    { id: 5, title: "Biblioteca: Horário Especial", content: "Durante o período de provas, a biblioteca funcionará em horário estendido até as 22h.", date: "2026-03-10", important: false }
  ],
  payments: [],
  activities: [
    { id: 1, student_id: 2, title: "Workshop de React", hours: 20, status: "approved", certificate_url: "#" },
    { id: 2, student_id: 2, title: "Curso de Python", hours: 40, status: "pending", certificate_url: "#" }
  ],
  exams: [
    { id: 1, discipline_id: 1, discipline_name: "Cálculo I", date: "2026-04-15", time: "08:00", type: "B1" },
    { id: 2, discipline_id: 2, discipline_name: "Programação Web", date: "2026-04-16", time: "10:00", type: "B1" },
    { id: 3, discipline_id: 3, discipline_name: "Estrutura de Dados", date: "2026-04-17", time: "08:00", type: "B1" },
    { id: 4, discipline_id: 4, discipline_name: "Química Orgânica", date: "2026-04-18", time: "08:00", type: "B1" },
    { id: 5, discipline_id: 5, discipline_name: "Anatomia Humana", date: "2026-04-19", time: "10:00", type: "B1" },
    { id: 6, discipline_id: 6, discipline_name: "Bioquímica Clínica", date: "2026-04-20", time: "14:00", type: "B1" },
    { id: 7, discipline_id: 7, discipline_name: "Farmacologia I", date: "2026-04-21", time: "10:00", type: "B1" },
    { id: 8, discipline_id: 8, discipline_name: "Direito Civil", date: "2026-04-22", time: "19:00", type: "B1" },
    { id: 9, discipline_id: 9, discipline_name: "Gestão Estratégica", date: "2026-04-23", time: "19:00", type: "B1" },
    { id: 10, discipline_id: 10, discipline_name: "Psicologia Social", date: "2026-04-24", time: "08:00", type: "B1" },
    { id: 11, discipline_id: 11, discipline_name: "Sistemas Operacionais", date: "2026-04-25", time: "08:00", type: "B1" },
    { id: 12, discipline_id: 12, discipline_name: "Marketing Digital", date: "2026-04-26", time: "14:00", type: "B1" }
  ],
  online_classes: [
    { id: 1, discipline_id: 1, discipline_name: "Cálculo I", link: "https://meet.google.com/aaa-bbbb-ccc", day_of_week: "Segunda-feira", time: "08:00", mandatory: true },
    { id: 2, discipline_id: 2, discipline_name: "Programação Web", link: "https://meet.google.com/abc-defg-hij", day_of_week: "Terça-feira", time: "10:00", mandatory: true },
    { id: 3, discipline_id: 3, discipline_name: "Estrutura de Dados", link: "https://meet.google.com/ddd-eeee-fff", day_of_week: "Quarta-feira", time: "08:00", mandatory: true },
    { id: 4, discipline_id: 4, discipline_name: "Química Orgânica", link: "https://meet.google.com/ggg-hhhh-iii", day_of_week: "Quinta-feira", time: "08:00", mandatory: true },
    { id: 5, discipline_id: 5, discipline_name: "Anatomia Humana", link: "https://meet.google.com/jjj-kkkk-lll", day_of_week: "Sexta-feira", time: "10:00", mandatory: true },
    { id: 6, discipline_id: 6, discipline_name: "Bioquímica Clínica", link: "https://meet.google.com/mmm-nnnn-ooo", day_of_week: "Segunda-feira", time: "14:00", mandatory: true },
    { id: 7, discipline_id: 7, discipline_name: "Farmacologia I", link: "https://meet.google.com/ppp-qqqq-rrr", day_of_week: "Quarta-feira", time: "10:00", mandatory: true },
    { id: 8, discipline_id: 8, discipline_name: "Direito Civil", link: "https://meet.google.com/sss-tttt-uuu", day_of_week: "Terça-feira", time: "19:00", mandatory: true },
    { id: 9, discipline_id: 9, discipline_name: "Gestão Estratégica", link: "https://meet.google.com/mno-pqrs-tuv", day_of_week: "Quinta-feira", time: "19:00", mandatory: true },
    { id: 10, discipline_id: 10, discipline_name: "Psicologia Social", link: "https://meet.google.com/vvv-wwww-xxx", day_of_week: "Segunda-feira", time: "08:00", mandatory: true },
    { id: 11, discipline_id: 11, discipline_name: "Sistemas Operacionais", link: "https://meet.google.com/yyy-zzzz-aaa", day_of_week: "Sexta-feira", time: "08:00", mandatory: true },
    { id: 12, discipline_id: 12, discipline_name: "Marketing Digital", link: "https://meet.google.com/xyz-uvwx-yz", day_of_week: "Terça-feira", time: "14:00", mandatory: true },
    // Additional Fictional Classes
    { id: 13, discipline_id: 1, discipline_name: "Cálculo I - Monitoria", link: "https://meet.google.com/mon-calc-1", day_of_week: "Sábado", time: "09:00", mandatory: false },
    { id: 14, discipline_id: 2, discipline_name: "Programação Web - Lab Extra", link: "https://meet.google.com/lab-web-extra", day_of_week: "Sábado", time: "14:00", mandatory: false },
    { id: 15, discipline_id: 11, discipline_name: "Sistemas Operacionais - Revisão", link: "https://meet.google.com/so-rev-1", day_of_week: "Domingo", time: "10:00", mandatory: false },
    { id: 16, discipline_id: 8, discipline_name: "Direito Civil - Prática Jurídica", link: "https://meet.google.com/dir-civ-prac", day_of_week: "Sábado", time: "10:00", mandatory: true },
    { id: 17, discipline_id: 9, discipline_name: "Gestão Estratégica - Case Study", link: "https://meet.google.com/gest-case-1", day_of_week: "Sábado", time: "11:00", mandatory: true },
    { id: 18, discipline_id: 4, discipline_name: "Química Orgânica - Grupo de Estudos", link: "https://meet.google.com/qui-est-1", day_of_week: "Sábado", time: "13:00", mandatory: false },
    { id: 19, discipline_id: 5, discipline_name: "Anatomia Humana - Atlas Digital", link: "https://meet.google.com/anat-atl-1", day_of_week: "Sábado", time: "15:00", mandatory: false },
    { id: 20, discipline_id: 6, discipline_name: "Bioquímica Clínica - Discussão de Casos", link: "https://meet.google.com/bioq-cas-1", day_of_week: "Domingo", time: "14:00", mandatory: false },
    { id: 21, discipline_id: 7, discipline_name: "Farmacologia I - Plantão de Dúvidas", link: "https://meet.google.com/farm-plan-1", day_of_week: "Sábado", time: "16:00", mandatory: false },
    { id: 22, discipline_id: 10, discipline_name: "Psicologia Social - Debate Aberto", link: "https://meet.google.com/psic-deb-1", day_of_week: "Domingo", time: "16:00", mandatory: false },
    { id: 23, discipline_id: 12, discipline_name: "Marketing Digital - Oficina de Tráfego", link: "https://meet.google.com/mark-traf-1", day_of_week: "Sábado", time: "17:00", mandatory: false }
  ],
  appSettings: {
    logo_url: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
    primary_color: "#1fbba6", // Teal from logo
    secondary_color: "#0066cc", // Blue from logo
    theme: "barao",
    college_name: "Barão da Torre"
  },
  news: [
    {
      id: 1,
      title: "Barão da Torre sedia evento do Coren-SP",
      description: "O encontro reuniu responsáveis técnicos e enfermeiros no anfiteatro da Unidade Central para discutir o futuro da enfermagem.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 2,
      title: "Novo Laboratório de Inovação",
      description: "Espaço contará com as tecnologias mais modernas para os cursos de Engenharia e Design, fomentando a criatividade.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 3,
      title: "Simpósio de Farmácia e Medicina",
      description: "Renomados especialistas discutem as tendências da saúde no Auditório Central com foco em novas terapias.",
      image: "https://images.unsplash.com/photo-1505751172107-129658a287ec?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 4,
      title: "Inscrições Abertas para o PEC 2026",
      description: "O Programa de Estímulo à Carreira oferece vagas em diversas áreas para alunos que buscam o primeiro estágio.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 5,
      title: "Projeto Rondon seleciona voluntários",
      description: "Alunos de todos os cursos podem participar da missão humanitária em julho, levando conhecimento ao interior.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 6,
      title: "Workshop de Inteligência Artificial",
      description: "Aprenda as ferramentas que estão transformando o mercado de trabalho em um workshop prático de 3 dias.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 7,
      title: "Bolsas de Estudo para Intercâmbio",
      description: "A Barão da Torre anuncia novas parcerias com universidades europeias para programas de intercâmbio em 2026.",
      image: "https://images.unsplash.com/photo-1523050335392-9bc567597280?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 8,
      title: "Inauguração da Nova Biblioteca",
      description: "Um espaço totalmente revitalizado com mais de 50 mil títulos e áreas de estudo individual e em grupo.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000"
    }
  ]
};

// IndexedDB helper for large files (PDFs and Photos)
const openFileDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FILE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FILE_STORE_NAME)) {
        db.createObjectStore(FILE_STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      alert("Erro ao abrir o banco de arquivos: " + request.error);
      reject(request.error);
    };
  });
};

export const fileDB = {
  save: async (key: string, data: string) => {
    try {
      const db = await openFileDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([FILE_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(FILE_STORE_NAME);
        const item = { id: key, data, timestamp: Date.now() };
        const request = store.keyPath ? store.put(item) : store.put(item, key);
        request.onsuccess = () => resolve();
        request.onerror = () => {
          alert("Erro ao gravar arquivo: " + request.error);
          reject(request.error);
        };
      });
    } catch (e: any) {
      alert("Falha no Banco de Arquivos (Save): " + e.message);
      throw e;
    }
  },
  get: async (key: string): Promise<string | null> => {
    try {
      const db = await openFileDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([FILE_STORE_NAME], 'readonly');
        const store = transaction.objectStore(FILE_STORE_NAME);
        const request = store.get(key);
        request.onsuccess = () => {
          const result = request.result;
          resolve(result ? result.data : null);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      return null;
    }
  },
  delete: async (key: string) => {
    try {
      const db = await openFileDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([FILE_STORE_NAME], "readwrite");
        const store = transaction.objectStore(FILE_STORE_NAME);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {}
  }
};

export const generateTuitionPayments = (studentId: number) => {
  const payments = [];
  const baseId = Date.now() + Math.floor(Math.random() * 1000);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  for (let month = 1; month <= 12; month++) {
    const dueDateStr = `10/${month.toString().padStart(2, '0')}/${currentYear}`;
    
    // Payments before current month are "Pago", current and future are "Em aberto"
    const status = month < currentMonth ? "Pago" : "Em aberto";
    
    payments.push({
      id: baseId + month + (studentId * 100),
      student_id: studentId,
      amount: 679.89,
      due_date: dueDateStr,
      status: status,
      pix_code: status === "Pago" ? "" : `00020126360014BR.GOV.BCB.PIX0114+55119999999995204000053039865407679.895802BR5913FACULDADE_EDU6009SAO_PAULO62070503***6304E2B1`
    });
  }
  return payments;
};

export const getDisciplinesByCourse = (course: string) => {
  const courseUpper = (course || "").toUpperCase();
  const disciplines = initialData.disciplines;
  
  if (courseUpper === "FARMÁCIA") {
    return disciplines.filter(d => [4, 5, 6, 7].includes(d.id));
  } else if (courseUpper === "ENGENHARIA DE SOFTWARE") {
    return disciplines.filter(d => [1, 2, 3, 11].includes(d.id));
  } else if (courseUpper === "DIREITO") {
    return disciplines.filter(d => [8].includes(d.id));
  } else if (courseUpper === "ADMINISTRAÇÃO") {
    return disciplines.filter(d => [9].includes(d.id));
  } else if (courseUpper === "PSICOLOGIA") {
    return disciplines.filter(d => [10].includes(d.id));
  } else if (courseUpper === "DESIGN GRÁFICO") {
    return disciplines.filter(d => [2, 12].includes(d.id));
  }
  
  return disciplines;
};

export const generateRandomGrades = (studentId: number, course: string, semester: number) => {
  const grades: any[] = [];
  const relevantDisciplines = getDisciplinesByCourse(course);

  relevantDisciplines.forEach((disc, index) => {
    const gradeB1 = Number((Math.random() * (10 - 4) + 4).toFixed(1));
    const gradeB2 = Number((Math.random() * (10 - 4) + 4).toFixed(1));
    const finalGrade = Number(((gradeB1 + gradeB2) / 2).toFixed(2));
    const absences = Math.floor(Math.random() * 10);
    
    grades.push({
      id: Date.now() + index + (studentId * 10),
      student_id: studentId,
      discipline_id: disc.id,
      discipline_name: disc.name,
      grade_b1: gradeB1,
      grade_b2: gradeB2,
      final_grade: finalGrade,
      absences: absences,
      status: finalGrade >= 6 ? "Aprovado" : "Em andamento"
    });
  });

  return grades;
};

export const getDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    return initialData;
  }
  const parsed = JSON.parse(data);
  
  // Aggressive migration to replace all occurrences of the old name in the database
  let dbString = JSON.stringify(parsed);
  const replacements = [
    { old: /Barão de Mauá/gi, new: "Barão da Torre" },
    { old: /Faculdade Barão de Mauá/gi, new: "Faculdade Barão da Torre" },
    { old: /Centro Universitário Barão de Mauá/gi, new: "Centro Universitário Barão da Torre" },
    { old: /baraodemaua\.br/gi, new: "baraodatorre.br" }
  ];
  
  let needsUpdate = false;
  replacements.forEach(({ old, new: newValue }) => {
    if (dbString.match(old)) {
      dbString = dbString.replace(old, newValue);
      needsUpdate = true;
    }
  });

  if (needsUpdate) {
    const updatedParsed = JSON.parse(dbString);
    saveDB(updatedParsed);
    return updatedParsed;
  }

  // Ensure appSettings exists even if DB was created before appSettings was added
  const oldLogos = [
    "https://lh3.googleusercontent.com/d/1X_m_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFYMUkJQx9MhrRDAOkp8HpK8qBnhc7WwLtw&s",
    "https://picsum.photos/seed/college/200/200",
    "/icon.png"
  ];
  if (!parsed.appSettings || oldLogos.includes(parsed.appSettings.logo_url)) {
    parsed.appSettings = { 
      ...(parsed.appSettings || {}), 
      logo_url: initialData.appSettings.logo_url,
      primary_color: parsed.appSettings?.primary_color || initialData.appSettings.primary_color,
      secondary_color: parsed.appSettings?.secondary_color || initialData.appSettings.secondary_color,
      college_name: parsed.appSettings?.college_name || initialData.appSettings.college_name
    };
    saveDB(parsed);
  }

  // Update announcements and payments to 2026 if they are still using 2024 dates (for demo purposes)
  const hasOldAnnouncements = parsed.announcements?.some((a: any) => a.date.includes("2024"));
  const hasOldPayments = parsed.payments?.some((p: any) => p.due_date.includes("2024"));
  const hasEmptyPayments = !parsed.payments || parsed.payments.length === 0;
  
  // Check if any student is missing payments
  const missingPayments = parsed.users
    .filter((u: any) => u.role === 'student')
    .some((u: any) => !parsed.payments?.some((p: any) => Number(p.student_id) === Number(u.id)));

  if (hasOldAnnouncements || hasOldPayments || hasEmptyPayments || missingPayments) {
    parsed.announcements = initialData.announcements;
    // Ensure all students have 2026 payments
    const newPayments = [...(parsed.payments || [])].filter(p => !p.due_date.includes("2024"));
    
    parsed.users.forEach((u: any) => {
      if (u.role === 'student') {
        const hasPayments = newPayments.some((p: any) => Number(p.student_id) === Number(u.id));
        if (!hasPayments) {
          newPayments.push(...generateTuitionPayments(u.id));
        }
      }
    });
    
    parsed.payments = newPayments;
    saveDB(parsed);
  }

  // Migration: Ensure all students have grades
  const studentsMissingGrades = parsed.users
    .filter((u: any) => u.role === 'student')
    .filter((u: any) => {
      const studentGrades = (parsed.grades || []).filter((g: any) => Number(g.student_id) === Number(u.id));
      return studentGrades.length === 0;
    });

  if (studentsMissingGrades.length > 0) {
    if (!parsed.grades) parsed.grades = [];
    studentsMissingGrades.forEach((s: any) => {
      const randomGrades = generateRandomGrades(s.id, s.course, s.semester);
      parsed.grades.push(...randomGrades);
    });
    saveDB(parsed);
  }

  // Migration: Ensure Mateus Fernandes is in the DB
  const hasMateus = parsed.users.some((u: any) => u.matricula === "20220919");
  if (!hasMateus) {
    const mateus = initialData.users.find(u => u.matricula === "20220919");
    if (mateus) {
      parsed.users.push(mateus);
      // Generate payments for him too
      parsed.payments.push(...generateTuitionPayments(mateus.id));
      saveDB(parsed);
    }
  }

  // Migration: Ensure Guilherme Queiroz is in the DB
  const hasGuilherme = parsed.users.some((u: any) => u.matricula === "20221515");
  if (!hasGuilherme) {
    const guilherme = initialData.users.find(u => u.matricula === "20221515");
    if (guilherme) {
      parsed.users.push(guilherme);
      // Generate payments for him too
      parsed.payments.push(...generateTuitionPayments(guilherme.id));
      saveDB(parsed);
    }
  }

  // Migration: Ensure Carlos Henrique Mesquita Seifert is in the DB
  const hasCarlos = parsed.users.some((u: any) => u.matricula === "20252712");
  if (!hasCarlos) {
    const carlos = initialData.users.find(u => u.matricula === "20252712");
    if (carlos) {
      parsed.users.push(carlos);
      // Generate payments for him too
      parsed.payments.push(...generateTuitionPayments(carlos.id));
      saveDB(parsed);
    }
  }

  // Migration: Update admin password if it's still the old one
  const adminUser = parsed.users.find((u: any) => u.matricula === "admin" && u.password === "admin123");
  if (adminUser) {
    adminUser.password = "1515";
    saveDB(parsed);
  }

  // Migration: Update professor names to national names
  const professorMap: Record<number, string> = {
    1: "Dr. Marcelo Souza",
    2: "Prof. Fernando Henrique",
    3: "Dra. Patrícia Gomes",
    4: "Dr. Cláudio Ferreira",
    5: "Dra. Luciana Ribeiro",
    6: "Prof. Sérgio Ramos",
    7: "Dra. Camila Rodrigues",
    8: "Dr. Bruno Alves",
    9: "Prof. Eduardo Jorge",
    10: "Dra. Aline Moraes",
    11: "Prof. João Pereira",
    12: "Dra. Sandra Helena"
  };

  let disciplinesChanged = false;
  parsed.disciplines.forEach((d: any) => {
    if (professorMap[d.id] && d.professor !== professorMap[d.id]) {
      d.professor = professorMap[d.id];
      disciplinesChanged = true;
    }
  });
  if (disciplinesChanged) saveDB(parsed);

  // Migration: Update payment status and announcement dates based on current month
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  let dataChanged = false;

  parsed.payments.forEach((p: any) => {
    const [day, month, year] = p.due_date.split("/").map(Number);
    const newStatus = (year < currentYear || (year === currentYear && month < currentMonth)) ? "Pago" : "Em aberto";
    if (p.status !== newStatus) {
      p.status = newStatus;
      p.pix_code = newStatus === "Pago" ? "" : `00020126360014BR.GOV.BCB.PIX0114+55119999999995204000053039865407679.895802BR5913FACULDADE_EDU6009SAO_PAULO62070503***6304E2B1`;
      dataChanged = true;
    }
  });

  parsed.announcements.forEach((ann: any, index: number) => {
    const day = (index + 1).toString().padStart(2, '0');
    const newDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day}`;
    if (ann.date !== newDate) {
      ann.date = newDate;
      dataChanged = true;
    }
  });

  if (dataChanged) saveDB(parsed);

  // Migration: Ensure online_classes and exams exist in the DB
  let structureChanged = false;
  
  if (!parsed.news || parsed.news.length === 0 || (parsed.news[0] && parsed.news[0].image && parsed.news[0].image.includes("picsum"))) {
    parsed.news = initialData.news;
    structureChanged = true;
  }

  // Migration: Ensure enrollment_proof_urls exists and is populated from enrollment_proof_url
  parsed.users = parsed.users.map((u: any) => {
    if (u.role === 'student' && !u.enrollment_proof_urls) {
      u.enrollment_proof_urls = {};
      if (u.enrollment_proof_url && u.enrollment_proof_url !== "EMPTY") {
        // By default, map the existing one to the current primary theme (Barao) or others
        const themes = ['barao', 'retro', 'uni', 'uniplan', 'modern'];
        themes.forEach(t => {
          u.enrollment_proof_urls[t] = u.enrollment_proof_url;
        });
      }
      structureChanged = true;
    }
    if (u.role === 'student' && !u.email) {
      u.email = `${u.matricula}@instituicao.br`;
      structureChanged = true;
    }
    return u;
  });
  if (!parsed.online_classes || parsed.online_classes.length < initialData.online_classes.length) {
    parsed.online_classes = initialData.online_classes;
    structureChanged = true;
  }
  
  if (!parsed.exams || parsed.exams.length < initialData.exams.length) {
    parsed.exams = initialData.exams;
    structureChanged = true;
  }

  // Migration: Ensure disciplines are up to date
  if (!parsed.disciplines || parsed.disciplines.length < initialData.disciplines.length) {
    parsed.disciplines = initialData.disciplines;
    structureChanged = true;
  }

  // Migration: Ensure all students have validity, regularity, cpf, birth_date and enrollment_date
  parsed.users.forEach((u: any) => {
    if (u.role === 'student') {
      if (!u.validity) u.validity = "12/2026";
      if (!u.regularity) u.regularity = "Regular";
      if (!u.cpf) u.cpf = "000.000.000-00";
      if (!u.birth_date) u.birth_date = "01/01/2000";
      if (!u.birth_state) u.birth_state = "SP";
      if (!u.nationality) u.nationality = "Brasileira";
      if (!u.gender) u.gender = "Masculino";
      if (!u.marital_status) u.marital_status = "Solteiro";
      if (!u.short_name) u.short_name = u.name.split(' ')[0];
      // Force update all to 10/02/2026 as requested
      if (u.enrollment_date !== "10/02/2026") {
        u.enrollment_date = "10/02/2026";
        structureChanged = true;
      }
      if (!u.status) {
        u.status = "active";
        structureChanged = true;
      }
    }
    if (u.role === 'admin' && !u.status) {
      u.status = "active";
      structureChanged = true;
    }
  });

  // Migration: Ensure appSettings has theme
  if (!parsed.appSettings.theme || parsed.appSettings.theme === "modern") {
    parsed.appSettings.theme = "barao";
  }

  saveDB(parsed);

  return parsed;
};

export const saveDB = (data: any) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const resetDB = () => {
  localStorage.removeItem(DB_KEY);
  return getDB();
};

export const db = {
  login: async (matricula: string, pass: string) => {
    const database = getDB();
    const user = database.users.find((u: any) => u.matricula === matricula && u.password === pass);
    
    if (user) {
      if (user.role === 'student' && user.status === 'blocked') {
        throw new Error("Sua conta está bloqueada. Aguarde a liberação pelo administrador.");
      }

      // Hydrate heavy files from IndexedDB only if they are missing in the main object
      if (!user.photo_url) {
        const storedPhoto = await fileDB.get(`photo_${user.id}`);
        if (storedPhoto) user.photo_url = storedPhoto;
      }
      
      if (!user.enrollment_proof_url) {
        const storedProof = await fileDB.get(`proof_${user.id}`);
        if (storedProof) {
          console.log("Hydrated proof from IndexedDB for user", user.id);
          user.enrollment_proof_url = storedProof;
        }
      }
    }
    
    return user;
  },
  getStudentDashboard: (studentId: number) => {
    const database = getDB();
    const user = database.users.find((u: any) => Number(u.id) === Number(studentId));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const relevantDisciplines = user ? getDisciplinesByCourse(user.course) : [];
    const relevantDisciplineIds = relevantDisciplines.map(d => d.id);

    return {
      grades: (database.grades || []).filter((g: any) => Number(g.student_id) === Number(studentId)),
      schedule: relevantDisciplines,
      news: database.news || [],
      announcements: database.announcements,
      payments: (database.payments || []).filter((p: any) => {
        if (Number(p.student_id) !== Number(studentId)) return false;
        if (p.status === "Pago") return true;
        
        // Filter out expired "Em aberto" payments
        const [day, month, year] = p.due_date.split("/").map(Number);
        const dueDate = new Date(year, month - 1, day);
        dueDate.setHours(0, 0, 0, 0);
        
        return dueDate >= today;
      }),
      activities: (database.activities || []).filter((a: any) => Number(a.student_id) === Number(studentId)),
      exams: (database.exams || []).filter((e: any) => relevantDisciplineIds.includes(e.discipline_id)),
      online_classes: (database.online_classes || []).filter((c: any) => relevantDisciplineIds.includes(c.discipline_id))
    };
  },
  getStudents: async () => {
    const database = getDB();
    const students = database.users.filter((u: any) => u.role === 'student');
    
    // Hydrate heavy files from IndexedDB only if missing
    for (const s of students) {
      if (!s.photo_url) {
        const storedPhoto = await fileDB.get(`photo_${s.id}`);
        if (storedPhoto) s.photo_url = storedPhoto;
      }
      
      if (!s.enrollment_proof_url) {
        const storedProof = await fileDB.get(`proof_${s.id}`);
        if (storedProof) {
          s.enrollment_proof_url = storedProof;
        }
      }
    }
    
    return students;
  },
  addStudent: async (student: any) => {
    const database = getDB();
    const id = Date.now();
    
    // Save heavy files to IndexedDB
    if (student.photo_url && student.photo_url.startsWith('data:')) {
      await fileDB.save(`photo_${id}`, student.photo_url);
    } else {
      await fileDB.delete(`photo_${id}`);
    }

    if (student.enrollment_proof_url && student.enrollment_proof_url.startsWith('data:')) {
      await fileDB.save(`proof_${id}`, student.enrollment_proof_url);
    } else {
      await fileDB.delete(`proof_${id}`);
    }

    const newStudent = {
      ...student,
      id,
      role: 'student',
      status: student.status || 'active'
    };

    // Don't store large Base64 strings in localStorage
    if (newStudent.photo_url && newStudent.photo_url.startsWith('data:')) {
      newStudent.photo_url = ""; 
    }
    if (newStudent.enrollment_proof_url && newStudent.enrollment_proof_url.startsWith('data:')) {
      newStudent.enrollment_proof_url = "";
    }

    database.users.push(newStudent);
    
    // Generate tuition for new student
    const studentPayments = generateTuitionPayments(newStudent.id);
    database.payments.push(...studentPayments);
    
    // Generate random grades for new student
    const studentGrades = generateRandomGrades(newStudent.id, newStudent.course, newStudent.semester);
    database.grades.push(...studentGrades);
    
    saveDB(database);
    return newStudent;
  },
  updateStudent: async (id: number, updatedData: any) => {
    const database = getDB();
    const index = database.users.findIndex((u: any) => u.id === id);
    if (index !== -1) {
      // Update heavy files in IndexedDB
      if (updatedData.photo_url !== undefined) {
        if (updatedData.photo_url && updatedData.photo_url.startsWith('data:')) {
          await fileDB.save(`photo_${id}`, updatedData.photo_url);
        } else {
          await fileDB.delete(`photo_${id}`);
        }
      }

      if (updatedData.enrollment_proof_url !== undefined) {
        if (updatedData.enrollment_proof_url && updatedData.enrollment_proof_url.startsWith('data:')) {
          const size = Math.round(updatedData.enrollment_proof_url.length / 1024);
          alert(`Salvando comprovante (${size} KB) para o Aluno ID ${id}...`);
          await fileDB.save(`proof_${id}`, updatedData.enrollment_proof_url);
        } else if (updatedData.enrollment_proof_url && !updatedData.enrollment_proof_url.startsWith('data:')) {
          alert(`Salvando link externo para o Aluno ID ${id}`);
        } else {
          await fileDB.delete(`proof_${id}`);
        }
      }

      const dataToSave = { ...updatedData };
      
      // Don't store large Base64 strings in localStorage
      if (dataToSave.photo_url && dataToSave.photo_url.startsWith('data:')) {
        dataToSave.photo_url = ""; 
      }
      if (dataToSave.enrollment_proof_url && dataToSave.enrollment_proof_url.startsWith('data:')) {
        dataToSave.enrollment_proof_url = "";
      }

      database.users[index] = { ...database.users[index], ...dataToSave };
      saveDB(database);
      
      // Return the updated user with the photo hydrated (if it was provided)
      const finalUser = { ...database.users[index] };
      if (updatedData.photo_url) finalUser.photo_url = updatedData.photo_url;
      if (updatedData.enrollment_proof_url) finalUser.enrollment_proof_url = updatedData.enrollment_proof_url;
      
      return finalUser;
    }
    throw new Error("Aluno não encontrado");
  },
  addActivity: (activity: any) => {
    const database = getDB();
    const newActivity = {
      ...activity,
      id: Date.now(),
      status: 'pending'
    };
    database.activities.push(newActivity);
    saveDB(database);
    return newActivity;
  },
  getAppSettings: () => {
    const database = getDB();
    return database.appSettings;
  },
  updateAppSettings: (settings: any) => {
    const database = getDB();
    database.appSettings = { ...database.appSettings, ...settings };
    saveDB(database);
    return database.appSettings;
  },
  generateAllFictionalData: async () => {
    const database = getDB();
    const students = database.users.filter((u: any) => u.role === 'student');
    let updatedCount = 0;

    for (const student of students) {
      // Check if student has payments
      const hasPayments = database.payments.some((p: any) => Number(p.student_id) === Number(student.id));
      if (!hasPayments) {
        const studentPayments = generateTuitionPayments(student.id);
        database.payments.push(...studentPayments);
        updatedCount++;
      }

      // Check if student has grades
      const hasGrades = database.grades.some((g: any) => Number(g.student_id) === Number(student.id));
      if (!hasGrades) {
        const studentGrades = generateRandomGrades(student.id, student.course, student.semester);
        database.grades.push(...studentGrades);
        updatedCount++;
      }
    }

    if (updatedCount > 0) {
      saveDB(database);
    }
    return updatedCount;
  },
  generateStudentFictionalData: async (studentId: number) => {
    const database = getDB();
    const student = database.users.find((u: any) => Number(u.id) === Number(studentId));
    if (!student) throw new Error("Aluno não encontrado");

    // Clear existing if any (to allow regeneration)
    database.payments = database.payments.filter((p: any) => Number(p.student_id) !== Number(studentId));
    database.grades = database.grades.filter((g: any) => Number(g.student_id) !== Number(studentId));

    // Generate new
    const studentPayments = generateTuitionPayments(student.id);
    database.payments.push(...studentPayments);

    const studentGrades = generateRandomGrades(student.id, student.course, student.semester);
    database.grades.push(...studentGrades);

    saveDB(database);
    return true;
  },
  getUserByEmail: async (email: string): Promise<any | null> => {
    const database = getDB();
    const student = database.users.find((u: any) => u.role === 'student' && u.email?.toLowerCase() === email.toLowerCase());
    return student || null;
  },
  getPayments: async () => {
    const database = getDB();
    return database.payments || [];
  },
  uploadFile: async (bucket: string, path: string, file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
  deleteFile: async (bucket: string, path: string): Promise<void> => {
    return Promise.resolve();
  },
  signUp: async (signUpData: any) => {
    const database = getDB();
    
    // Check if matricula already exists
    if (database.users.some((u: any) => u.matricula === signUpData.matricula)) {
      throw new Error("Esta matrícula já está cadastrada.");
    }

    const newId = database.users.length > 0 ? Math.max(...database.users.map((u: any) => u.id)) + 1 : 1;
    
    const newStudent = { 
      ...signUpData, 
      id: newId, 
      role: 'student',
      status: 'blocked', // Always blocked on sign up
      semester: 1,
      regularity: "Regular",
      enrollment_date: new Date().toLocaleDateString('pt-BR'),
      validity: "12/2026",
      enrollment_proof_urls: {}
    };

    database.users.push(newStudent);
    saveDB(database);

    // Generate initial data
    const studentPayments = generateTuitionPayments(newId);
    database.payments.push(...studentPayments);

    const studentGrades = generateRandomGrades(newId, newStudent.course, 1);
    database.grades.push(...studentGrades);

    saveDB(database);
    return newStudent;
  }
};
