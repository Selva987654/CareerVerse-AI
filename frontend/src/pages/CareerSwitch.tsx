import { useState } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const switchPaths = [
  { from: 'Any field', to: 'Full Stack Java Developer', timeline: '6–10 months', courses: ['Core Java', 'Spring Boot', 'React', 'MySQL'], jobs: ['Java Developer', 'Backend Developer', 'Full Stack Intern'], steps: ['Learn Java OOP, collections and exception handling', 'Build REST APIs with Spring Boot', 'Connect MySQL and authentication', 'Create 2 full-stack projects and deploy one', 'Apply for Java internship or junior developer roles'] },
  { from: 'Any field', to: 'MERN Stack Developer', timeline: '5–9 months', courses: ['HTML/CSS/JS', 'React', 'Node.js', 'MongoDB', 'AWS basics'], jobs: ['Frontend Developer', 'MERN Intern', 'Web Developer'], steps: ['Strengthen JavaScript fundamentals', 'Build React UI with routing and forms', 'Create Node/Express APIs with MongoDB', 'Deploy project and add GitHub README', 'Apply to web internships and freelance projects'] },
  { from: 'Commerce / Any degree', to: 'Data Analytics', timeline: '4–8 months', courses: ['Excel', 'SQL', 'Power BI', 'Python basics'], jobs: ['Data Analyst Intern', 'Business Analyst Trainee', 'MIS Executive'], steps: ['Master Excel formulas and dashboards', 'Learn SQL queries and joins', 'Create Power BI dashboards', 'Analyze 3 public datasets', 'Apply with dashboard screenshots and resume'] },
  { from: 'Any field', to: 'Data Science / AI', timeline: '8–12 months', courses: ['Python', 'Statistics', 'Machine Learning', 'Gen AI basics'], jobs: ['Data Science Intern', 'ML Intern', 'AI Project Trainee'], steps: ['Learn Python and math basics', 'Practice data cleaning and visualisation', 'Build ML models with simple datasets', 'Create AI mini project for portfolio', 'Apply for data/AI internships'] },
  { from: 'Any field', to: 'Cloud & DevOps', timeline: '6–12 months', courses: ['Linux', 'AWS', 'Networking', 'Docker', 'CI/CD'], jobs: ['Cloud Support Trainee', 'DevOps Intern', 'System Engineer'], steps: ['Learn Linux commands and networking basics', 'Study AWS core services', 'Deploy a small web app to cloud', 'Learn GitHub Actions or basic CI/CD', 'Apply for cloud support/devops trainee roles'] },
  { from: 'Any field', to: 'Cyber Security', timeline: '8–12 months', courses: ['Networking', 'Linux', 'Security basics', 'CEH foundation'], jobs: ['Security Analyst Trainee', 'SOC Intern', 'Cyber Security Intern'], steps: ['Learn networking and operating system basics', 'Understand common web security issues', 'Practice safe labs only', 'Build notes and security checklist portfolio', 'Apply for SOC/cybersecurity internships'] },
  { from: 'Any field', to: 'UI/UX Design', timeline: '4–8 months', courses: ['Figma', 'Design basics', 'Wireframes', 'UX research'], jobs: ['UI/UX Intern', 'Product Design Trainee', 'Graphic/UI Designer'], steps: ['Learn layout, spacing, colour and typography', 'Practice Figma components and prototypes', 'Redesign 3 existing app screens', 'Create case-study portfolio', 'Apply for design internships'] },
  { from: 'Any field', to: 'Digital Marketing', timeline: '3–6 months', courses: ['SEO', 'Google Ads', 'Social Media', 'Analytics'], jobs: ['Digital Marketing Executive', 'SEO Intern', 'Content Marketing Intern'], steps: ['Learn SEO and content basics', 'Create social media sample campaigns', 'Understand Google Analytics and Ads', 'Build 2 sample marketing case studies', 'Apply for marketing internships'] },
  { from: 'Any degree', to: 'Government Exam Preparation', timeline: '6–18 months', courses: ['Aptitude', 'Reasoning', 'Current Affairs', 'General Studies'], jobs: ['TNPSC', 'SSC', 'Banking', 'Railway'], steps: ['Choose exam based on qualification and age', 'Read official syllabus and previous papers', 'Create daily timetable', 'Take weekly mock tests', 'Track official notifications and apply on time'] },
  { from: 'Any degree', to: 'Banking & Finance', timeline: '4–8 months', courses: ['Quant', 'Reasoning', 'Banking Awareness', 'Excel'], jobs: ['IBPS Clerk', 'Bank PO', 'Financial Analyst Trainee'], steps: ['Prepare banking exam aptitude', 'Study banking awareness and current affairs', 'Practice mock tests', 'Improve English and interview basics', 'Apply for banking exams and finance internships'] },
  { from: 'Any field', to: 'Software Testing / QA', timeline: '3–6 months', courses: ['Manual Testing', 'Selenium basics', 'API Testing', 'Bug reporting'], jobs: ['QA Tester', 'Manual Testing Intern', 'Automation Testing Trainee'], steps: ['Learn SDLC/STLC and test cases', 'Practice manual testing on sample websites', 'Learn Postman API testing', 'Try Selenium basics', 'Apply for QA internships with sample bug reports'] },
  { from: 'Any field', to: 'Mobile App Developer', timeline: '6–10 months', courses: ['Java/Kotlin or Flutter', 'UI basics', 'Firebase', 'API integration'], jobs: ['Android Intern', 'Flutter Developer Intern', 'Mobile App Trainee'], steps: ['Learn app UI layouts', 'Build login and CRUD app', 'Connect Firebase or backend API', 'Publish APK/demo video', 'Apply for mobile development internships'] },
  { from: 'Any field', to: 'Business Analytics', timeline: '4–8 months', courses: ['Excel', 'SQL', 'Power BI/Tableau', 'Business reporting'], jobs: ['Business Analyst Intern', 'Operations Analyst', 'Reporting Analyst'], steps: ['Learn business metrics and Excel', 'Practice SQL reports', 'Build dashboards in Power BI', 'Create business case study', 'Apply with dashboard portfolio'] },
  { from: 'Any field', to: 'AI Tools / Prompt Engineering', timeline: '2–4 months', courses: ['AI tools', 'Prompt writing', 'Automation basics', 'Content workflows'], jobs: ['AI Tools Intern', 'Prompt Writer', 'Automation Assistant'], steps: ['Learn how AI tools work safely', 'Create prompts for resume, content and research', 'Build small AI workflow demos', 'Document before/after results', 'Apply for AI tools/support roles'] },
];

export default function CareerSwitch() {
  const ref = useScrollReveal();
  const [active, setActive] = useState(0);
  const path = switchPaths[active];

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Career Switch Guidance" title="Choose a new career path with course, process and job direction." lead="More switch options added: Java full stack, MERN, data, AI, cloud, cyber security, UI/UX, marketing, government exams and banking." />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" data-reveal>
          {switchPaths.map((p, i) => (
            <button key={p.to} onClick={() => setActive(i)} aria-pressed={active === i} className={`rounded-2xl border p-4 text-center transition-all ${active === i ? 'border-brand-500 bg-brand-50 shadow-brand' : 'border-slate-100 hover:border-brand-200'}`}>
              <p className="font-display text-sm font-bold text-slate-900">{p.to}</p>
              <p className="mt-1 text-xs text-slate-500">{p.timeline}</p>
            </button>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-10" data-reveal data-reveal-delay="100">
          <p className="text-sm font-semibold text-slate-500">Switching from {path.from} to</p>
          <h3 className="font-display text-2xl font-bold text-slate-900">{path.to}</h3>
          <p className="mt-1 text-sm font-medium text-brand-600">Realistic timeline: {path.timeline}</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ol className="space-y-3">
              {path.steps.map((step, i) => <li key={step} className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm text-slate-700 shadow-sm"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>{step}</li>)}
            </ol>
            <aside className="space-y-4">
              <Info title="Courses to learn" items={path.courses} />
              <Info title="Possible jobs/exams" items={path.jobs} />
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-display font-bold text-slate-900">Next navigation</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link to="/courses" className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white">Explore Courses</Link>
                  <Link to="/internships-jobs?tab=courses" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700">Trending Courses</Link>
                  <a href="https://indrainstitute.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700">Indra Institute <ExternalLink size={12} /></a>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal>
          <PrincipleCard title="Do not quit immediately" desc="Build skills and portfolio first. Switch with proof, not only interest." />
          <PrincipleCard title="Use transferable skills" desc="Communication, leadership and problem-solving still matter in a new field." />
          <PrincipleCard title="Apply with projects" desc="Certificates help, but projects and clear resume points make you stronger." />
        </div>
      </div>
    </div>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="font-display font-bold text-slate-900">{title}</p><div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{item}</span>)}</div></div>;
}

function PrincipleCard({ title, desc }: { title: string; desc: string }) {
  return <div className="rounded-2xl border border-slate-100 bg-white p-5"><CheckCircle2 size={20} className="text-brand-600" /><p className="mt-3 font-display font-bold text-slate-900">{title}</p><p className="mt-1.5 text-sm text-slate-600">{desc}</p></div>;
}
