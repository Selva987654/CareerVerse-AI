export interface DailyUpdate {
  id: string;
  title: string;
  category: string;
  date: string;
  source: string;
  summary: string;
  importance: 'High' | 'Medium' | 'Low';
  link: string;
}

export const dailyUpdates: DailyUpdate[] = [
  { id: 'u1', title: 'JEE Main 2027 registration opens next week', category: 'Entrance Exam Alerts', date: '2 Jul 2026', source: 'NTA', summary: 'Applications for JEE Main Session 1 open soon. Check eligibility and prepare your documents early.', importance: 'High', link: 'https://jeemain.nta.nic.in' },
  { id: 'u2', title: 'CUET UG exam pattern revised for 2027', category: 'Education News', date: '1 Jul 2026', source: 'UGC', summary: 'The exam pattern has been simplified with fewer optional subjects. Review the new structure before starting prep.', importance: 'Medium', link: 'https://cuet.samarth.ac.in' },
  { id: 'u3', title: 'State engineering counselling schedule released', category: 'Counselling Updates', date: '30 Jun 2026', source: 'State Admissions Board', summary: 'Choice filling and seat allotment dates are now published. Keep your documents ready ahead of round 1.', importance: 'High', link: '#' },
  { id: 'u4', title: 'New merit scholarship for STEM girls announced', category: 'Scholarship Updates', date: '29 Jun 2026', source: 'AICTE', summary: 'A new scholarship supports girl students pursuing engineering and technology courses with full tuition coverage.', importance: 'Medium', link: '#' },
  { id: 'u5', title: 'AI & Data Science emerging as top trending course', category: 'Trending Courses', date: '28 Jun 2026', source: 'Industry Report', summary: 'Enrollment in AI-focused undergraduate programs has grown sharply as companies prioritise AI-ready graduates.', importance: 'Medium', link: '#' },
  { id: 'u6', title: 'Summer internship drive opens for first-year students', category: 'Internship Alerts', date: '27 Jun 2026', source: 'CareerVerse Partners', summary: 'Several partner companies are now accepting applications for beginner-friendly summer internships.', importance: 'High', link: '#' },
  { id: 'u7', title: 'IT sector hiring picks up for fresher roles', category: 'Hiring News', date: '26 Jun 2026', source: 'Industry Report', summary: 'Fresh graduate hiring in software roles is trending upward this quarter compared to last year.', importance: 'Medium', link: '#' },
  { id: 'u8', title: 'SSC CGL 2026 notification expected soon', category: 'Government Job Alerts', date: '25 Jun 2026', source: 'SSC', summary: 'The Staff Selection Commission is expected to release the CGL notification in the coming weeks.', importance: 'High', link: '#' },
  { id: 'u9', title: 'Cloud computing and cybersecurity top future skills list', category: 'Future Skills', date: '24 Jun 2026', source: 'Industry Report', summary: 'A new skills report places cloud computing, cybersecurity, and AI literacy among the most in-demand skills.', importance: 'Low', link: '#' },
  { id: 'u10', title: 'Major FMCG company announces campus hiring drive', category: 'Company Hiring', date: '23 Jun 2026', source: 'Company Press Release', summary: 'A leading consumer goods company will visit select campuses this placement season for management trainee roles.', importance: 'Medium', link: '#' },
  { id: 'u11', title: 'Engineering college placement drive results strong this year', category: 'College Placement Drives', date: '22 Jun 2026', source: 'College Placement Cell', summary: 'Early placement numbers show improved offers compared to the previous placement season.', importance: 'Low', link: '#' },
  { id: 'u12', title: 'NEET UG counselling document checklist updated', category: 'Counselling Updates', date: '21 Jun 2026', source: 'Medical Counselling Committee', summary: 'A revised document checklist has been published ahead of the counselling rounds \u2014 review it before your slot.', importance: 'High', link: '#' },
];

export const updateCategories = [
  'All',
  'Education News',
  'Entrance Exam Alerts',
  'Counselling Updates',
  'Scholarship Updates',
  'Trending Courses',
  'Internship Alerts',
  'Hiring News',
  'Government Job Alerts',
  'Future Skills',
  'Company Hiring',
  'College Placement Drives',
];
