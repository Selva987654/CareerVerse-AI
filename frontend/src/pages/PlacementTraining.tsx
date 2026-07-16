import { useState } from 'react';
import { Award, BarChart3, ClipboardCheck, Clock, ExternalLink, Flame, Target } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { ProgressBar } from '../components/dashboard/DashboardWidgets';

interface ModuleLink {
  label: string;
  url: string;
}

interface Module {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  tasks: string[];
  links: ModuleLink[];
}

const modules: Module[] = [
  {
    title: 'Aptitude',
    difficulty: 'Beginner',
    time: '2 weeks',
    tasks: ['Number series practice', 'Percentages & ratios', 'Timed mock tests'],
    links: [
      { label: 'IndiaBIX Aptitude', url: 'https://www.indiabix.com/aptitude/questions-and-answers/' },
      { label: 'Testbook Aptitude', url: 'https://testbook.com/aptitude-practice' },
    ],
  },
  {
    title: 'Logical Reasoning',
    difficulty: 'Beginner',
    time: '1 week',
    tasks: ['Pattern recognition', 'Puzzles', 'Blood relations'],
    links: [
      { label: 'IndiaBIX Reasoning', url: 'https://www.indiabix.com/logical-reasoning/questions-and-answers/' },
      { label: 'GeeksforGeeks Puzzles', url: 'https://www.geeksforgeeks.org/puzzles/' },
    ],
  },
  {
    title: 'Verbal Ability',
    difficulty: 'Beginner',
    time: '1 week',
    tasks: ['Reading comprehension', 'Grammar basics', 'Vocabulary building'],
    links: [
      { label: 'IndiaBIX Verbal', url: 'https://www.indiabix.com/verbal-ability/questions-and-answers/' },
      { label: 'Grammarly Handbook', url: 'https://www.grammarly.com/blog/category/handbook/' },
    ],
  },
  {
    title: 'Coding',
    difficulty: 'Intermediate',
    time: '4 weeks',
    tasks: ['Arrays & strings', 'Basic DSA problems', 'Daily coding practice'],
    links: [
      { label: 'LeetCode Practice', url: 'https://leetcode.com/problemset/' },
      { label: 'HackerRank Skills', url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript' },
      { label: 'GFG DSA', url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/' },
    ],
  },
  {
    title: 'Technical Interview',
    difficulty: 'Advanced',
    time: '3 weeks',
    tasks: ['Core subject revision', 'Project explanation practice', 'System design basics'],
    links: [
      { label: 'InterviewBit', url: 'https://www.interviewbit.com/' },
      { label: 'GFG Interview Corner', url: 'https://www.geeksforgeeks.org/company-interview-corner/' },
    ],
  },
  {
    title: 'HR Interview',
    difficulty: 'Intermediate',
    time: '1 week',
    tasks: ['Common HR questions', 'STAR method answers', 'Salary negotiation basics'],
    links: [
      { label: 'Naukri HR Questions', url: 'https://www.naukri.com/blog/common-hr-interview-questions-and-answers/' },
      { label: 'Indeed Interview Guide', url: 'https://www.indeed.com/career-advice/interviewing' },
    ],
  },
  {
    title: 'Resume Preparation',
    difficulty: 'Beginner',
    time: '3 days',
    tasks: ['Format & structure', 'Action verbs', 'ATS-friendly formatting'],
    links: [
      { label: 'Canva Resume Templates', url: 'https://www.canva.com/resumes/templates/' },
      { label: 'Overleaf Resume Templates', url: 'https://www.overleaf.com/gallery/tagged/cv' },
      { label: 'AI Resume Builder', url: '/ai-tools/resume-builder' },
    ],
  },
  {
    title: 'Group Discussion',
    difficulty: 'Intermediate',
    time: '1 week',
    tasks: ['Current affairs prep', 'Structured speaking', 'Active listening practice'],
    links: [
      { label: 'GD Topics', url: 'https://www.indiabix.com/group-discussion/topics-with-answers/' },
      { label: 'Current Affairs', url: 'https://www.gktoday.in/current-affairs/' },
    ],
  },
];

const questions: Record<string, { q: string; options: string[]; answer: number; explanation: string }> = {
  Aptitude: { q: 'A price increases from 200 to 250. What is the percentage increase?', options: ['20%', '25%', '40%', '50%'], answer: 1, explanation: 'Increase is 50; 50/200 × 100 = 25%.' },
  'Logical Reasoning': { q: 'All coders solve problems. Mira is a coder. What follows?', options: ['Mira solves problems', 'Mira is a designer', 'Nothing follows', 'All problem solvers code'], answer: 0, explanation: 'The conclusion follows directly from the two statements.' },
  'Verbal Ability': { q: 'Choose the grammatically correct sentence.', options: ['She have completed it.', 'She has completed it.', 'She having completed it.', 'She complete it.'], answer: 1, explanation: 'A singular subject uses “has” in the present perfect tense.' },
  Coding: { q: 'What is the typical lookup time of a hash map?', options: ['O(1) average', 'O(n²)', 'O(log n) always', 'O(n!)'], answer: 0, explanation: 'A well-distributed hash map has O(1) average lookup.' },
  'Technical Interview': { q: 'Which HTTP method is normally idempotent?', options: ['POST', 'PUT', 'CONNECT', 'PATCH always'], answer: 1, explanation: 'Repeating the same PUT should leave the resource in the same state.' },
  'HR Interview': { q: 'Which answer structure is best for behavioural examples?', options: ['STAR', 'FIFO', 'CRUD', 'SWOT only'], answer: 0, explanation: 'STAR means Situation, Task, Action and Result.' },
  'Group Discussion': { q: 'What is the strongest GD behaviour?', options: ['Interrupt often', 'Listen and build on points', 'Speak continuously', 'Avoid evidence'], answer: 1, explanation: 'Active listening and constructive contribution demonstrate teamwork.' },
  'Resume Preparation': { q: 'Which bullet is most ATS-friendly?', options: ['Worked on app', 'Built a React app improving load time by 25%', 'I did many things', 'Project was good'], answer: 1, explanation: 'It combines an action verb, relevant keyword and measurable result.' },
};

const difficultyColor: Record<Module['difficulty'], string> = {
  Beginner: 'bg-green-50 text-green-700',
  Intermediate: 'bg-amber-50 text-amber-700',
  Advanced: 'bg-red-50 text-red-600',
};

export default function PlacementTraining() {
  const [progress, setProgress] = useState<Record<string, number>>(() => { try { return JSON.parse(localStorage.getItem('cv_placement_progress') || '{}'); } catch { return {}; } });
  const [active, setActive] = useState(''); const [selected, setSelected] = useState<number | null>(null); const [history, setHistory] = useState<{module:string;score:number;date:string}[]>(() => { try { return JSON.parse(localStorage.getItem('cv_placement_history') || '[]'); } catch { return []; } });

  const complete = (title: string) => {
    setProgress((prev) => { const next={ ...prev, [title]: 100 }; localStorage.setItem('cv_placement_progress',JSON.stringify(next)); return next; });
  };
  const submitAnswer=(title:string)=>{if(selected===null)return;const score=selected===questions[title].answer?100:0;setProgress(p=>{const next={...p,[title]:Math.max(p[title]||0,score?60:20)};localStorage.setItem('cv_placement_progress',JSON.stringify(next));return next});setHistory(h=>{const next=[{module:title,score,date:new Date().toLocaleDateString()},...h].slice(0,20);localStorage.setItem('cv_placement_history',JSON.stringify(next));return next})};
  const readiness=Math.round(Object.values(progress).reduce((a,b)=>a+b,0)/modules.length); const weak=modules.filter(m=>(progress[m.title]||0)<50).map(m=>m.title);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Placement Training" title="Get placement-ready, module by module" lead="Track your progress and open useful practice links for aptitude, coding, resume, HR, GD and mock interviews." />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-2xl bg-brand-50 p-4"><Target className="text-brand-600"/><p className="mt-2 text-xs text-slate-500">Daily practice goal</p><b>20 minutes</b></div><div className="rounded-2xl bg-amber-50 p-4"><Flame className="text-amber-600"/><p className="mt-2 text-xs text-slate-500">Learning streak</p><b>{history.length ? Math.min(7,history.length) : 0} days</b></div><div className="rounded-2xl bg-emerald-50 p-4"><Award className="text-emerald-600"/><p className="mt-2 text-xs text-slate-500">Badges</p><b>{Object.values(progress).filter(x=>x===100).length} earned</b></div><div className="rounded-2xl bg-indigo-50 p-4"><BarChart3 className="text-indigo-600"/><p className="mt-2 text-xs text-slate-500">Placement-readiness score</p><b>{readiness}%</b></div></div>
      <div className="mb-6 rounded-2xl border border-slate-200 p-4 text-sm"><b>Recommended next activity:</b> {weak[0] || 'Take a timed mixed mock test'} <span className="ml-3 text-slate-500">Weak topics: {weak.join(', ') || 'None detected'}</span></div>
      {active && <div className="mb-6 rounded-3xl border border-brand-200 bg-brand-50 p-6"><p className="text-xs font-bold uppercase text-brand-600">Timed practice · 60 seconds</p><h3 className="mt-2 font-display text-lg font-bold">{questions[active].q}</h3><div className="mt-4 grid gap-2">{questions[active].options.map((o,i)=><button key={o} onClick={()=>setSelected(i)} className={`rounded-xl border bg-white p-3 text-left text-sm ${selected===i?'border-brand-500':''}`}>{o}</button>)}</div><button onClick={()=>submitAnswer(active)} className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white">Submit answer</button>{selected!==null&&history[0]?.module===active&&<p className="mt-3 rounded-xl bg-white p-3 text-sm"><b>{selected===questions[active].answer?'Correct.':'Review answer.'}</b> {questions[active].explanation}</p>}</div>}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => {
          const pct = progress[m.title] ?? 0;
          return (
            <div key={m.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-slate-900">{m.title}</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyColor[m.difficulty]}`}>{m.difficulty}</span>
              </div>
              <p className="mb-3 flex items-center gap-1.5 text-xs text-slate-500">
                <Clock size={13} /> Estimated: {m.time}
              </p>
              <ul className="mb-4 space-y-1 text-sm text-slate-600">
                {m.tasks.map((t) => (
                  <li key={t} className="flex items-start gap-1.5">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" /> {t}
                  </li>
                ))}
              </ul>

              <div className="mb-4 flex flex-wrap gap-2">
                {m.links.map((link) => {
                  const internal = link.url.startsWith('/');
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target={internal ? undefined : '_blank'}
                      rel={internal ? undefined : 'noreferrer'}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {link.label} {!internal && <ExternalLink size={12} />}
                    </a>
                  );
                })}
              </div>

              <ProgressBar label="Progress" value={pct} />
              <button onClick={()=>{setActive(m.title);setSelected(null)}} className="mt-3 w-full rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700">Practice / Timed Test</button>
              <button
                onClick={() => complete(m.title)}
                disabled={pct === 100}
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pct === 100 ? (
                  <><ClipboardCheck size={14} /> Completed</>
                ) : (
                  <><BarChart3 size={14} /> Mark as Completed</>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
