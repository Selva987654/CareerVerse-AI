export interface OfficialLinkSet {
  website: string;
  apply: string;
  notification: string;
  admitCard: string;
  result: string;
}

export interface GovernmentExam {
  id: string;
  name: string;
  shortName: string;
  category: string;
  conductingBody: string;
  bestFor: string;
  qualification: string;
  ageLimit: string;
  selectionProcess: string[];
  examPattern: string[];
  syllabus: string[];
  documents: string[];
  applicationFee: string;
  preparationTime: string;
  difficulty: 'Beginner' | 'Moderate' | 'High' | 'Very High';
  officialLinks: OfficialLinkSet;
  howToApply: string[];
  preparationRoadmap: string[];
  bestResources: string[];
  careerOutcomes: string[];
}

export interface ExamUpdate {
  id: string;
  examId: string;
  examName: string;
  type: 'Notification' | 'Vacancy' | 'Admit Card' | 'Result' | 'Answer Key' | 'Exam Date';
  title: string;
  description: string;
  postedDate: string;
  lastDate?: string;
  status: 'New' | 'Active' | 'Closing Soon' | 'Closed';
  officialLink: string;
  source: string;
}

export interface Trainer {
  id: string;
  name: string;
  category: string;
  subjects: string[];
  experience: string;
  language: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  location: string;
  rating: number;
  studentsTrained: string;
  about: string;
  courses: string[];
  successHighlights: string[];
}

export interface GuidanceVideo {
  id: string;
  title: string;
  category: string;
  trainerId: string;
  trainerName: string;
  duration: string;
  language: string;
  description: string;
  videoUrl: string;
}

const commonDocuments = [
  'Aadhaar card or valid government ID',
  'Passport-size photo and signature',
  '10th and 12th mark sheets',
  'Degree / diploma certificate where applicable',
  'Community certificate if applicable',
  'Income / disability / ex-serviceman certificate if applicable',
];

const commonHowToApply = [
  'Open only the official exam website or application portal.',
  'Complete one-time registration if the portal requires it.',
  'Choose the correct notification and verify eligibility before filling the form.',
  'Enter personal, educational, category and communication details carefully.',
  'Upload photo, signature and certificates in the required format.',
  'Pay the application fee if applicable and submit the form.',
  'Download the final submitted application PDF and save the registration number.',
  'Track admit card, exam date, answer key and result only from the official portal.',
];

export const governmentExams: GovernmentExam[] = [
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services Examination',
    shortName: 'UPSC CSE',
    category: 'Civil Services',
    conductingBody: 'Union Public Service Commission',
    bestFor: 'Students interested in IAS, IPS, IFS, IRS, administration, governance and public service.',
    qualification: 'Any recognised bachelor degree. Final-year students may apply subject to official notification conditions.',
    ageLimit: 'Usually 21-32 years for general category with relaxations as per rules. Always verify latest notification.',
    selectionProcess: ['Preliminary Examination', 'Main Examination', 'Personality Test / Interview', 'Medical and document verification'],
    examPattern: ['Prelims: objective GS + CSAT', 'Mains: descriptive papers', 'Interview: personality assessment'],
    syllabus: ['History', 'Polity', 'Geography', 'Economy', 'Environment', 'Science & Technology', 'Ethics', 'Essay', 'Current Affairs'],
    documents: commonDocuments,
    applicationFee: 'As per current UPSC notification; fee exemptions may apply to eligible categories.',
    preparationTime: '12 to 18 months',
    difficulty: 'Very High',
    officialLinks: {
      website: 'https://www.upsc.gov.in/',
      apply: 'https://upsconline.nic.in/',
      notification: 'https://www.upsc.gov.in/examinations/exam-notifications',
      admitCard: 'https://www.upsc.gov.in/e-admit-cards',
      result: 'https://www.upsc.gov.in/examinations/final-results',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Read the official syllabus and previous year papers before buying materials.',
      'Build NCERT foundation for history, geography, economy, polity and science.',
      'Read one newspaper daily and make short current affairs notes.',
      'Prepare prelims MCQs and mains answer writing together after basics.',
      'Take monthly full-length tests and revise weak areas.',
      'Practice essay, ethics and optional subject answer writing consistently.',
    ],
    bestResources: ['NCERT books', 'Official syllabus', 'Previous year papers', 'Newspaper', 'Government reports and schemes'],
    careerOutcomes: ['IAS', 'IPS', 'IFS', 'IRS', 'Central civil services'],
  },
  {
    id: 'ssc-cgl',
    name: 'Staff Selection Commission Combined Graduate Level',
    shortName: 'SSC CGL',
    category: 'Central Government',
    conductingBody: 'Staff Selection Commission',
    bestFor: 'Graduates who want central government office jobs in ministries and departments.',
    qualification: 'Bachelor degree from a recognised university; post-specific conditions may apply.',
    ageLimit: 'Varies by post; check current notification for age limits and relaxations.',
    selectionProcess: ['Computer Based Examination', 'Skill test where applicable', 'Document verification'],
    examPattern: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness', 'Computer knowledge for selected posts'],
    syllabus: ['Arithmetic', 'Algebra', 'Geometry', 'Reasoning', 'Vocabulary', 'Grammar', 'Current Affairs', 'Static GK'],
    documents: commonDocuments,
    applicationFee: 'As per SSC notification and category rules.',
    preparationTime: '6 to 12 months',
    difficulty: 'High',
    officialLinks: {
      website: 'https://ssc.gov.in/',
      apply: 'https://ssc.gov.in/login',
      notification: 'https://ssc.gov.in/notices',
      admitCard: 'https://ssc.gov.in/admit-card',
      result: 'https://ssc.gov.in/results',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Complete SSC one-time registration first.',
      'Build speed in arithmetic, percentages, ratio, time-work and DI.',
      'Practice reasoning topics daily with timed sets.',
      'Improve English grammar, vocabulary and reading speed.',
      'Revise static GK and daily current affairs.',
      'Attempt previous year papers and full mock tests with analysis.',
    ],
    bestResources: ['SSC syllabus', 'Previous year papers', 'Timed mock tests', 'Standard aptitude books', 'Current affairs notes'],
    careerOutcomes: ['Assistant Section Officer', 'Inspector', 'Auditor', 'Tax Assistant', 'Accountant'],
  },
  {
    id: 'ibps-po',
    name: 'IBPS Probationary Officer / Banking Exams',
    shortName: 'IBPS PO',
    category: 'Banking',
    conductingBody: 'Institute of Banking Personnel Selection',
    bestFor: 'Graduates interested in public sector banking, finance and customer service roles.',
    qualification: 'Bachelor degree; computer literacy and language requirements may vary by bank/post.',
    ageLimit: 'Usually 20-30 years for PO with relaxations as per rules; verify notification.',
    selectionProcess: ['Preliminary Exam', 'Main Exam', 'Interview for PO/SO roles', 'Document verification'],
    examPattern: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'General/Banking Awareness', 'Computer Aptitude'],
    syllabus: ['Simplification', 'DI', 'Puzzles', 'Seating Arrangement', 'Reading Comprehension', 'Banking Awareness', 'Current Affairs'],
    documents: commonDocuments,
    applicationFee: 'As per IBPS notification.',
    preparationTime: '6 to 9 months',
    difficulty: 'High',
    officialLinks: {
      website: 'https://www.ibps.in/',
      apply: 'https://www.ibps.in/',
      notification: 'https://www.ibps.in/crp-po-mt/',
      admitCard: 'https://www.ibps.in/',
      result: 'https://www.ibps.in/',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Practice basic arithmetic and DI calculation speed.',
      'Solve reasoning puzzles and seating arrangement daily.',
      'Read editorials for English comprehension.',
      'Follow banking awareness and financial current affairs.',
      'Take sectional mocks first, then full-length mocks.',
      'Prepare interview basics: banking terms, RBI, economy and personal profile.',
    ],
    bestResources: ['IBPS notifications', 'Banking awareness notes', 'Mock test platforms', 'Previous year papers'],
    careerOutcomes: ['Probationary Officer', 'Clerk', 'Specialist Officer', 'Regional Rural Bank roles'],
  },
  {
    id: 'rrb-ntpc',
    name: 'Railway Recruitment Board NTPC / Technician / Group D',
    shortName: 'RRB Exams',
    category: 'Railway',
    conductingBody: 'Railway Recruitment Boards',
    bestFor: '10th, 12th, ITI, diploma and degree students looking for Indian Railways jobs.',
    qualification: 'Depends on post: 10th, ITI, 12th, diploma or degree.',
    ageLimit: 'Varies by post and notification.',
    selectionProcess: ['Computer Based Test', 'Skill / typing / aptitude test where applicable', 'Physical test for selected posts', 'Document verification', 'Medical exam'],
    examPattern: ['Mathematics', 'General Intelligence & Reasoning', 'General Awareness', 'Science for technical posts'],
    syllabus: ['Number system', 'Reasoning', 'Current Affairs', 'Railway awareness', 'General science', 'Technical basics where applicable'],
    documents: commonDocuments,
    applicationFee: 'As per RRB notification and refund rules.',
    preparationTime: '4 to 8 months',
    difficulty: 'Moderate',
    officialLinks: {
      website: 'https://www.rrbapply.gov.in/',
      apply: 'https://www.rrbapply.gov.in/',
      notification: 'https://www.rrbapply.gov.in/',
      admitCard: 'https://www.rrbapply.gov.in/',
      result: 'https://www.rrbapply.gov.in/',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Identify correct RRB post based on qualification.',
      'Prepare maths and reasoning basics with speed practice.',
      'Study general awareness and railway-related current affairs.',
      'For technical posts, revise trade/diploma concepts.',
      'Practice CBT mock tests and previous year questions.',
      'Prepare documents and medical standards early.',
    ],
    bestResources: ['RRB official notification', 'Previous CBT papers', 'Basic maths and reasoning practice', 'General science notes'],
    careerOutcomes: ['NTPC posts', 'Technician', 'Junior Engineer', 'Group D railway posts'],
  },
  {
    id: 'tnpsc-group',
    name: 'TNPSC Group I / II / IIA / IV',
    shortName: 'TNPSC Groups',
    category: 'Tamil Nadu State Government',
    conductingBody: 'Tamil Nadu Public Service Commission',
    bestFor: 'Tamil Nadu students seeking state government administrative and clerical services.',
    qualification: 'Depends on group and post: 10th, 12th, degree or specific qualification.',
    ageLimit: 'Varies by group, post, community and notification.',
    selectionProcess: ['Preliminary / single written exam', 'Main written exam for selected groups', 'Interview for selected posts', 'Certificate verification'],
    examPattern: ['General Tamil / General English where applicable', 'General Studies', 'Aptitude and Mental Ability', 'Post-specific subjects'],
    syllabus: ['Tamil Nadu history and culture', 'Indian polity', 'Economy', 'Geography', 'Science', 'Current affairs', 'Aptitude'],
    documents: commonDocuments,
    applicationFee: 'One-time registration and exam fee as per TNPSC notification.',
    preparationTime: '6 to 12 months',
    difficulty: 'High',
    officialLinks: {
      website: 'https://www.tnpsc.gov.in/',
      apply: 'https://apply.tnpscexams.in/',
      notification: 'https://www.tnpsc.gov.in/English/Notification.aspx',
      admitCard: 'https://www.tnpsc.gov.in/English/Halltickets.aspx',
      result: 'https://www.tnpsc.gov.in/English/results.aspx',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Start with Tamil Nadu school books and official syllabus.',
      'Prepare General Tamil / English according to selected option.',
      'Study general studies with Tamil Nadu current affairs.',
      'Practice aptitude and mental ability daily.',
      'Solve TNPSC previous year papers topic-wise.',
      'Revise through short notes and attend mock tests.',
    ],
    bestResources: ['Tamil Nadu school textbooks', 'TNPSC syllabus', 'Previous year papers', 'Daily Tamil Nadu current affairs'],
    careerOutcomes: ['Deputy Collector', 'Sub Registrar', 'Assistant Section Officer', 'VAO', 'Junior Assistant and other posts'],
  },
  {
    id: 'tn-trb',
    name: 'Tamil Nadu Teachers Recruitment Board Exams',
    shortName: 'TN TRB',
    category: 'Teaching',
    conductingBody: 'Tamil Nadu Teachers Recruitment Board',
    bestFor: 'Aspirants targeting teacher, lecturer and assistant professor roles in Tamil Nadu.',
    qualification: 'Depends on post: D.El.Ed, B.Ed, PG, NET/SLET/PhD and other requirements.',
    ageLimit: 'As per post-wise official notification.',
    selectionProcess: ['Written examination / CBT', 'Certificate verification', 'Interview where applicable'],
    examPattern: ['Subject knowledge', 'Teaching aptitude / pedagogy', 'General knowledge where applicable'],
    syllabus: ['Subject syllabus', 'Pedagogy', 'Child development', 'Teaching methodology', 'Current education policies'],
    documents: commonDocuments,
    applicationFee: 'As per TRB notification.',
    preparationTime: '4 to 8 months',
    difficulty: 'High',
    officialLinks: {
      website: 'https://www.trb.tn.gov.in/',
      apply: 'https://www.trb.tn.gov.in/',
      notification: 'https://www.trb.tn.gov.in/notifications.php',
      admitCard: 'https://www.trb.tn.gov.in/',
      result: 'https://www.trb.tn.gov.in/results.php',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Read post-wise eligibility carefully before applying.',
      'Prepare subject knowledge deeply from standard textbooks.',
      'Study pedagogy and teaching methods.',
      'Practice previous TRB/TET papers.',
      'Take subject-wise and full-length mock tests.',
      'Keep certificates ready for verification.',
    ],
    bestResources: ['TRB syllabus', 'Subject textbooks', 'Previous year papers', 'Pedagogy notes'],
    careerOutcomes: ['Teacher', 'Lecturer', 'Assistant Professor', 'Graduate Teacher'],
  },
  {
    id: 'tnusrb-police',
    name: 'TNUSRB Police Constable / SI / Fireman',
    shortName: 'TNUSRB',
    category: 'Police / Uniformed Services',
    conductingBody: 'Tamil Nadu Uniformed Services Recruitment Board',
    bestFor: 'Students interested in police, jail warder, fireman and uniformed service careers.',
    qualification: 'Depends on post: 10th, 12th or degree with physical standards.',
    ageLimit: 'As per TNUSRB notification and community rules.',
    selectionProcess: ['Written exam', 'Physical Measurement Test', 'Endurance Test', 'Physical Efficiency Test', 'Document verification', 'Medical exam'],
    examPattern: ['General Knowledge', 'Psychology / aptitude', 'Tamil eligibility where applicable', 'Physical tests'],
    syllabus: ['General studies', 'Tamil Nadu current affairs', 'Reasoning', 'Police aptitude', 'Physical fitness'],
    documents: commonDocuments,
    applicationFee: 'As per TNUSRB notification.',
    preparationTime: '4 to 8 months',
    difficulty: 'Moderate',
    officialLinks: {
      website: 'https://www.tnusrb.tn.gov.in/',
      apply: 'https://www.tnusrb.tn.gov.in/',
      notification: 'https://www.tnusrb.tn.gov.in/',
      admitCard: 'https://www.tnusrb.tn.gov.in/',
      result: 'https://www.tnusrb.tn.gov.in/',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Check height, chest and physical standards before applying.',
      'Study general knowledge and Tamil Nadu current affairs.',
      'Practice reasoning and psychology questions.',
      'Train running, long jump, high jump and endurance safely.',
      'Take written mock tests and track physical performance.',
      'Prepare original certificates for verification.',
    ],
    bestResources: ['TNUSRB notification', 'Tamil Nadu GK notes', 'Reasoning practice', 'Physical training schedule'],
    careerOutcomes: ['Police Constable', 'Sub Inspector', 'Jail Warder', 'Fireman'],
  },
  {
    id: 'nta-cuet',
    name: 'NTA Entrance and Recruitment Exams',
    shortName: 'NTA Exams',
    category: 'Entrance / Recruitment',
    conductingBody: 'National Testing Agency',
    bestFor: 'Students applying for national-level entrance tests like CUET, NEET, JEE and other NTA conducted exams.',
    qualification: 'Depends on exam: 12th, degree or post-specific qualification.',
    ageLimit: 'Exam-specific rules; verify official information bulletin.',
    selectionProcess: ['Online application', 'Computer-based / pen-paper examination', 'Result / scorecard', 'Counselling or admission process'],
    examPattern: ['Subject test', 'General aptitude', 'Language test', 'Domain-specific sections depending on exam'],
    syllabus: ['Exam-specific syllabus from official bulletin', 'NCERT subjects for school-level entrance exams', 'Aptitude and language sections where applicable'],
    documents: commonDocuments,
    applicationFee: 'Exam-specific fee as per information bulletin.',
    preparationTime: '3 to 12 months depending on exam',
    difficulty: 'High',
    officialLinks: {
      website: 'https://nta.ac.in/',
      apply: 'https://exams.nta.ac.in/',
      notification: 'https://nta.ac.in/NoticeBoardArchive',
      admitCard: 'https://exams.nta.ac.in/',
      result: 'https://nta.ac.in/Result',
    },
    howToApply: commonHowToApply,
    preparationRoadmap: [
      'Download the correct information bulletin.',
      'Map syllabus to NCERT or standard textbooks.',
      'Build chapter-wise notes and question practice.',
      'Attempt mock tests in the official exam pattern.',
      'Track application correction, admit card and result dates.',
      'Follow counselling/admission rules after scorecard.',
    ],
    bestResources: ['NTA information bulletin', 'NCERT books', 'Mock tests', 'Previous year papers', 'Official answer keys'],
    careerOutcomes: ['College admission', 'Medical entrance', 'Engineering entrance', 'Central university admission'],
  },
];

export const examUpdates: ExamUpdate[] = [
  {
    id: 'update-tnpsc-1',
    examId: 'tnpsc-group',
    examName: 'TNPSC Group Exams',
    type: 'Notification',
    title: 'Check latest TNPSC notifications and application dates',
    description: 'Students can track group exam notifications, online application windows, hall tickets and results from the TNPSC official portal.',
    postedDate: 'Live official portal',
    status: 'Active',
    officialLink: 'https://apply.tnpscexams.in/',
    source: 'TNPSC Official Portal',
  },
  {
    id: 'update-ssc-1',
    examId: 'ssc-cgl',
    examName: 'SSC Exams',
    type: 'Vacancy',
    title: 'SSC One-Time Registration and exam applications',
    description: 'SSC candidates must complete one-time registration before applying for Commission examinations.',
    postedDate: 'Live official portal',
    status: 'Active',
    officialLink: 'https://ssc.gov.in/',
    source: 'SSC Official Portal',
  },
  {
    id: 'update-ibps-1',
    examId: 'ibps-po',
    examName: 'IBPS Banking Exams',
    type: 'Notification',
    title: 'IBPS CRP notifications and apply-online links',
    description: 'IBPS publishes common recruitment process notifications for PO, Clerk, SO and RRB banking posts.',
    postedDate: 'Live official portal',
    status: 'New',
    officialLink: 'https://www.ibps.in/',
    source: 'IBPS Official Portal',
  },
  {
    id: 'update-rrb-1',
    examId: 'rrb-ntpc',
    examName: 'RRB Railway Exams',
    type: 'Vacancy',
    title: 'RRB application portal for railway recruitment',
    description: 'Railway aspirants can track centralised application links, helpdesk information and current recruitment notices.',
    postedDate: 'Live official portal',
    status: 'Active',
    officialLink: 'https://www.rrbapply.gov.in/',
    source: 'RRB Official Apply Portal',
  },
];

export const governmentTrainers: Trainer[] = [
  {
    id: 'tnpsc-mentor-priya',
    name: 'Priya Raman',
    category: 'TNPSC & Tamil Nadu State Exams',
    subjects: ['General Tamil', 'General Studies', 'Aptitude', 'Tamil Nadu Current Affairs'],
    experience: '7+ years',
    language: 'Tamil + English',
    mode: 'Hybrid',
    location: 'Coimbatore / Online',
    rating: 4.8,
    studentsTrained: '3,500+',
    about: 'State-exam mentor focused on simple Tamil explanations, school-book foundations and weekly revision plans for TNPSC aspirants.',
    courses: ['TNPSC Group II Complete Batch', 'TNPSC Group IV Fast Track', 'General Tamil Daily Practice', 'Aptitude Weekend Booster'],
    successHighlights: ['120+ students cleared certificate verification stages', 'Weekly answer-key discussion sessions', 'Personal timetable review'],
  },
  {
    id: 'ssc-banking-arjun',
    name: 'Arjun Mehta',
    category: 'SSC, Banking & Railway Exams',
    subjects: ['Quantitative Aptitude', 'Reasoning', 'English', 'Mock Test Analysis'],
    experience: '9+ years',
    language: 'English + Hindi + Tamil basics',
    mode: 'Online',
    location: 'Online India',
    rating: 4.9,
    studentsTrained: '8,000+',
    about: 'Aptitude trainer who focuses on speed, accuracy, shortcut methods and post-mock error analysis for SSC, IBPS and RRB exams.',
    courses: ['SSC CGL Aptitude Batch', 'IBPS PO Mock Series', 'RRB CBT Reasoning Batch', 'English Grammar for Competitive Exams'],
    successHighlights: ['Daily speed drills', 'Sectional mock review', 'Interview basics for banking aspirants'],
  },
  {
    id: 'police-fitness-karthik',
    name: 'Karthik Selvan',
    category: 'Police & Uniformed Services',
    subjects: ['Physical Test Training', 'General Knowledge', 'Reasoning', 'Interview Discipline'],
    experience: '6+ years',
    language: 'Tamil + English',
    mode: 'Offline',
    location: 'Coimbatore',
    rating: 4.7,
    studentsTrained: '1,200+',
    about: 'Trainer for TNUSRB aspirants with a focus on physical standards, endurance, written exam basics and document readiness.',
    courses: ['TNUSRB Written + Physical Batch', 'Running Endurance Plan', 'Police GK Revision', 'Document Verification Guidance'],
    successHighlights: ['Fitness progress tracking', 'Weekly physical test simulation', 'Safe training methods'],
  },
];

export const guidanceVideos: GuidanceVideo[] = [
  {
    id: 'video-tnpsc-start',
    title: 'How to start TNPSC preparation from zero',
    category: 'TNPSC',
    trainerId: 'tnpsc-mentor-priya',
    trainerName: 'Priya Raman',
    duration: '18 min',
    language: 'Tamil',
    description: 'Explains syllabus reading, school-book planning, current affairs and mock test routine for beginners.',
    videoUrl: 'https://www.youtube.com/results?search_query=TNPSC+preparation+beginner+Tamil',
  },
  {
    id: 'video-ssc-speed',
    title: 'SSC and banking aptitude speed strategy',
    category: 'SSC / Banking',
    trainerId: 'ssc-banking-arjun',
    trainerName: 'Arjun Mehta',
    duration: '22 min',
    language: 'English',
    description: 'Covers arithmetic practice, time management and mock test review methods.',
    videoUrl: 'https://www.youtube.com/results?search_query=SSC+CGL+aptitude+speed+strategy',
  },
  {
    id: 'video-police-physical',
    title: 'Police exam physical test preparation plan',
    category: 'TNUSRB',
    trainerId: 'police-fitness-karthik',
    trainerName: 'Karthik Selvan',
    duration: '15 min',
    language: 'Tamil',
    description: 'Shows safe weekly physical preparation planning for running, endurance and measurement readiness.',
    videoUrl: 'https://www.youtube.com/results?search_query=TNUSRB+physical+test+training+Tamil',
  },
];

export const examCategories = Array.from(new Set(governmentExams.map((exam) => exam.category)));
