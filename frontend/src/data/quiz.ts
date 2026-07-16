export interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; scores: Record<string, number> }[];
}

export interface QuizResultType {
  id: string;
  title: string;
  description: string;
  careers: string[];
  emoji: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which activity sounds most enjoyable to you?',
    options: [
      { text: 'Solving puzzles, coding, or fixing gadgets', scores: { tech: 3, science: 2 } },
      { text: 'Drawing, designing, or creating something visual', scores: { creative: 3, design: 2 } },
      { text: 'Leading a team or planning an event', scores: { business: 3, leadership: 2 } },
      { text: 'Helping people solve problems or feel better', scores: { social: 3, healthcare: 2 } },
    ],
  },
  {
    id: 2,
    question: 'In school, which subjects did/do you enjoy the most?',
    options: [
      { text: 'Math and Physics', scores: { tech: 2, science: 3 } },
      { text: 'Biology and Chemistry', scores: { healthcare: 3, science: 2 } },
      { text: 'Business Studies and Economics', scores: { business: 3 } },
      { text: 'History, Languages, or Arts', scores: { social: 2, creative: 2 } },
    ],
  },
  {
    id: 3,
    question: 'What kind of work environment excites you?',
    options: [
      { text: 'A tech startup with fast-moving projects', scores: { tech: 3, business: 1 } },
      { text: 'A creative studio or design agency', scores: { creative: 3, design: 2 } },
      { text: 'A hospital, clinic, or research lab', scores: { healthcare: 3, science: 1 } },
      { text: 'An office where I lead and manage people', scores: { business: 2, leadership: 3 } },
    ],
  },
  {
    id: 4,
    question: 'Pick a weekend activity you would genuinely enjoy:',
    options: [
      { text: 'Building a small app or learning to code', scores: { tech: 3 } },
      { text: 'Sketching, photography, or making content', scores: { creative: 3, design: 2 } },
      { text: 'Reading about businesses, stocks, or startups', scores: { business: 3 } },
      { text: 'Volunteering or tutoring someone', scores: { social: 3, healthcare: 1 } },
    ],
  },
  {
    id: 5,
    question: 'What matters most to you in a career?',
    options: [
      { text: 'High salary and fast growth', scores: { tech: 1, business: 2 } },
      { text: 'Creative freedom and self-expression', scores: { creative: 3, design: 1 } },
      { text: 'Helping and impacting people\'s lives', scores: { social: 2, healthcare: 3 } },
      { text: 'Stability and respect in society', scores: { business: 1, science: 2 } },
    ],
  },
  {
    id: 6,
    question: 'How do you prefer to solve problems?',
    options: [
      { text: 'Logically, step by step, with data', scores: { tech: 2, science: 3 } },
      { text: 'Creatively, thinking outside the box', scores: { creative: 3, design: 2 } },
      { text: 'By talking to people and understanding feelings', scores: { social: 3 } },
      { text: 'By making quick decisions and taking charge', scores: { business: 2, leadership: 3 } },
    ],
  },
];

export const quizResults: Record<string, QuizResultType> = {
  tech: {
    id: 'tech',
    title: 'The Tech Innovator',
    description: 'You think logically, love solving problems, and are drawn to technology. A career in tech could be deeply satisfying and rewarding for you.',
    careers: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Cybersecurity Specialist'],
    emoji: '💻',
  },
  science: {
    id: 'science',
    title: 'The Curious Scientist',
    description: 'You are analytical, detail-oriented, and curious about how things work. Science and research-based careers suit your mind well.',
    careers: ['Doctor', 'Research Scientist', 'Civil Engineer', 'Data Scientist'],
    emoji: '🔬',
  },
  creative: {
    id: 'creative',
    title: 'The Creative Visionary',
    description: 'You see the world differently and love expressing ideas visually or through storytelling. Creative careers will let your imagination shine.',
    careers: ['UX/UI Designer', 'Graphic Designer', 'Content Creator', 'Filmmaker'],
    emoji: '🎨',
  },
  design: {
    id: 'design',
    title: 'The Design Thinker',
    description: 'You notice details, care about aesthetics, and enjoy making things both beautiful and functional. Design careers are a strong match.',
    careers: ['UX/UI Designer', 'Graphic Designer', 'Product Designer', 'Architect'],
    emoji: '✏️',
  },
  business: {
    id: 'business',
    title: 'The Strategic Builder',
    description: 'You think in terms of growth, strategy, and opportunity. Business and management careers fit your practical, ambitious mindset.',
    careers: ['Entrepreneur', 'Chartered Accountant', 'Digital Marketer', 'Product Manager'],
    emoji: '📈',
  },
  leadership: {
    id: 'leadership',
    title: 'The Natural Leader',
    description: 'You enjoy guiding others, making decisions, and taking charge of outcomes. Leadership-driven careers will use your strengths well.',
    careers: ['Entrepreneur', 'Product Manager', 'Project Manager', 'Civil Services Officer'],
    emoji: '🚀',
  },
  social: {
    id: 'social',
    title: 'The People Helper',
    description: 'You care deeply about people and find meaning in helping others. Careers centered on service and connection will fulfil you.',
    careers: ['Teacher', 'Doctor', 'Lawyer', 'Social Worker'],
    emoji: '🤝',
  },
  healthcare: {
    id: 'healthcare',
    title: 'The Healer',
    description: 'You are compassionate, patient, and interested in health and wellbeing. Healthcare careers align beautifully with your nature.',
    careers: ['Doctor', 'Nurse', 'Pharmacist', 'Physiotherapist'],
    emoji: '⚕️',
  },
};
