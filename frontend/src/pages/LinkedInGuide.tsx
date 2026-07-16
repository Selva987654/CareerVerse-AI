import { useState } from 'react';
import { Linkedin, Copy, Check } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { ProgressBar } from '../components/dashboard/DashboardWidgets';

const templates = [
  (role: string, skill: string) => `Aspiring ${role} | Learning ${skill} | Building real-world projects | Open to internships`,
  (role: string, skill: string) => `${role} in the making \u2014 passionate about ${skill} and solving real problems through technology`,
  (role: string, skill: string) => `Final-year student targeting ${role} roles | Skilled in ${skill} | Eager to contribute and learn`,
];

const checklistGroups: { title: string; items: string[] }[] = [
  { title: 'Resume Checklist', items: ['Clear contact info & photo optional', 'Concise summary (2-3 lines)', 'Projects with measurable outcomes', 'Skills section matched to target role', 'No spelling or formatting errors'] },
  { title: 'GitHub Checklist', items: ['Pinned repositories with README files', 'Clean, commented code', 'At least 3 real projects', 'Consistent commit history', 'Live demo links where possible'] },
  { title: 'Portfolio Checklist', items: ['Simple, fast-loading site', 'About section with your story', 'Project case studies, not just links', 'Contact / resume download button', 'Mobile-friendly design'] },
];

export default function LinkedInGuide() {
  const [role, setRole] = useState('Software Engineer');
  const [skill, setSkill] = useState('React & Node.js');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const headlines = templates.map((t) => t(role, skill));

  const copy = (text: string, i: number) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const totalItems = checklistGroups.reduce((sum, g) => sum + g.items.length, 0);
  const doneItems = Object.values(checked).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Internships & Jobs" title="LinkedIn & Placement Readiness Guide" lead="Generate a strong headline and track your resume, GitHub, and portfolio readiness." />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
          <Linkedin size={18} className="text-brand-600" /> LinkedIn Headline Generator
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Target role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Key skill(s)</label>
            <input value={skill} onChange={(e) => setSkill(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {headlines.map((h, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-700">{h}</p>
              <button onClick={() => copy(h, i)} className="flex-shrink-0 rounded-full border border-slate-300 p-2 text-slate-500 hover:border-brand-300 hover:text-brand-600">
                {copiedIdx === i ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-2 font-display text-lg font-bold text-slate-900">LinkedIn Readiness Score</h3>
        <ProgressBar label="Checklist completion" value={doneItems} max={totalItems} />

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {checklistGroups.map((g) => (
            <div key={g.title}>
              <p className="mb-2 text-sm font-semibold text-slate-800">{g.title}</p>
              <div className="space-y-1.5">
                {g.items.map((item) => {
                  const key = `${g.title}-${item}`;
                  return (
                    <label key={key} className="flex items-start gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={() => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      {item}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
