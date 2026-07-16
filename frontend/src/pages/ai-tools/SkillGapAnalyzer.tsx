import { useState } from 'react';
import { Gauge, Loader2, Sparkles } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { careers } from '../../data/careers';
import { api } from '../../services/api';
import { AIOutput } from '../../components/AIOutput';
import { BackToAITools } from '../../components/BackToAITools';

export default function SkillGapAnalyzer() {
  const [careerId, setCareerId] = useState(careers[0].id);
  const [known, setKnown] = useState<string[]>([]);
  const [aiAnswer, setAiAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const career = careers.find((c) => c.id === careerId)!;
  const toggle = (skill: string) => setKnown((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  const gapSkills = career.skills.filter((s) => !known.includes(s));
  const pct = Math.round((known.length / career.skills.length) * 100);

  const generatePlan = async () => {
    setAiAnswer('');
    setLoading(true);
    const prompt = `
Analyze the skill gap and create a learning plan.
Return:
1. Readiness score meaning
2. Missing skills priority order
3. Project ideas
4. Free/low-cost learning plan
5. 30-day weekly schedule

Target career: ${career.name}
Known skills: ${known.length ? known.join(', ') : 'None selected'}
Missing skills: ${gapSkills.length ? gapSkills.join(', ') : 'No listed gaps'}
Readiness score: ${pct}%
Eligibility: ${career.eligibility}
`;
    try {
      const res = await api.askGemini(prompt, 'Skill Gap Analyzer');
      setAiAnswer(res.answer);
    } catch {
      setAiAnswer(`Demo learning plan (AI is temporarily unavailable)\n\n1. Begin with the first missing core skill listed above.\n2. Learn the foundation and complete a guided exercise.\n3. Build a small project that proves the skill.\n4. Add the project link and outcome to your resume.\n5. Recheck your skill gap after 30 days.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <BackToAITools />
      <SectionHeader eyebrow="AI Tools" title="Skill Gap Analyzer" lead="Pick a target career and tick the skills you already have." />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Target career</label>
        <select
          value={careerId}
          onChange={(e) => { setCareerId(e.target.value); setKnown([]); setAiAnswer(''); }}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        >
          {careers.map((c) => (
            <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
          ))}
        </select>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-slate-700">Skills required for {career.name}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {career.skills.map((s) => (
              <label key={s} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
                <input type="checkbox" checked={known.includes(s)} onChange={() => toggle(s)} className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-800"><Gauge size={16} className="text-brand-600" /> Readiness for {career.name}</span>
            <span className="font-display text-xl font-bold text-brand-600">{pct}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          {gapSkills.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Skills to learn next</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {gapSkills.map((s) => (
                  <span key={s} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">{s}</span>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm font-medium text-green-700">You already know every listed skill \u2014 great start!</p>
          )}
        </div>

        <button
          type="button"
          onClick={generatePlan}
          disabled={loading}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Generate AI Learning Plan
        </button>

        {(loading || aiAnswer) && (
          <div className="mt-6">
            {loading ? (
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm font-semibold text-brand-700 shadow-card">
                <Loader2 size={16} className="animate-spin" /> Generating plan...
              </div>
            ) : (
              <AIOutput title="AI Learning Plan" text={aiAnswer} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
