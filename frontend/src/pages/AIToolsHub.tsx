import { Link } from 'react-router-dom';
import {
  Sparkles, UserRound, MessagesSquare, CreditCard, Route, Gauge, Linkedin, ClipboardCheck, ArrowRight, Landmark,
  FileText, Mic, GitCompare, MailCheck, GraduationCap,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { featureIsRelevant, type ProfileFeature } from '../utils/profileAccess';

const tools = [
  { icon: GraduationCap, title: 'AI Career Quiz', desc: 'Ask AI to analyse marks, stream, skills and goals to suggest best careers.', to: '/ai-tools/career-quiz', feature: 'careers' as ProfileFeature },
  { icon: GitCompare, title: 'AI Career Comparison', desc: 'Compare 2 or 3 careers with salary, skills, demand, difficulty and final advice.', to: '/ai-tools/career-comparison', feature: 'careers' as ProfileFeature },
  { icon: Route, title: 'Career Roadmap Generator', desc: 'Generate a personalised roadmap from your stage to your goal.', to: '/ai-tools/career-path-simulator', feature: 'careers' as ProfileFeature },
  { icon: FileText, title: 'Resume Analysis & Builder', desc: 'Check an existing resume or create a new one-page resume with a role-based template.', to: '/ai-tools/resume-builder', feature: 'placement' as ProfileFeature },
  { icon: Linkedin, title: 'AI LinkedIn Enhancer', desc: 'Improve headline, About section, project description and post captions.', to: '/ai-tools/linkedin-enhancer', feature: 'placement' as ProfileFeature },
  { icon: Mic, title: 'AI Mock Interview', desc: 'Practice role-based technical and HR questions with AI feedback.', to: '/ai-tools/mock-interview', feature: 'placement' as ProfileFeature },
  { icon: MailCheck, title: 'AI Internship Email Writer', desc: 'Generate application/enquiry mail for internship apply now pages.', to: '/ai-tools/internship-email', feature: 'internships' as ProfileFeature },
  { icon: Landmark, title: 'AI Government Exam Advisor', desc: 'Get suitable government exams, eligibility match and 90-day preparation plan.', to: '/ai-tools/government-exam-advisor', feature: 'exams' as ProfileFeature },
  { icon: Gauge, title: 'Skill Gap Analyzer', desc: 'Compare your current skills against what your dream role needs.', to: '/ai-tools/skill-gap', feature: 'careers' as ProfileFeature },
  { icon: ClipboardCheck, title: 'Placement Readiness Analyzer', desc: 'Score resume, LinkedIn, GitHub, aptitude and interview readiness.', to: '/ai-tools/readiness-analyzer', feature: 'placement' as ProfileFeature },
  { icon: Sparkles, title: 'AI Career Path Simulator', desc: 'Answer a few questions and get matching career paths.', to: '/ai-tools/career-path-simulator', feature: 'careers' as ProfileFeature },
  { icon: UserRound, title: 'Future Me Simulator', desc: 'See what life could look like 5 years into a chosen career.', to: '/ai-tools/future-me', feature: 'careers' as ProfileFeature },
  { icon: MessagesSquare, title: 'AI Career Twin Chat', desc: 'Ask career questions and get instant AI-backed guidance.', to: '/ai-tools/career-twin', feature: 'careers' as ProfileFeature },
  { icon: CreditCard, title: 'Career Passport', desc: 'Profile, quiz result, saved careers and progress in one place.', to: '/career-passport', feature: 'careers' as ProfileFeature },
];

export default function AIToolsHub() {
  const { user, profile } = useAuth();
  const visibleTools = tools.filter((tool) => featureIsRelevant(tool.feature, profile, user));
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="AI Tools"
        title="Smarter AI tools for career, college, internship and placement"
        lead="Gemini API-ready tools for career quiz, comparison, resume building, LinkedIn improvement, internship emails, government exams and mock interviews."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTools.map(({ icon: Icon, title, desc, to }) => (
          <Link
            key={title}
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
              Start tool <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
