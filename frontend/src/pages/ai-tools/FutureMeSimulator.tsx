import { useState } from 'react';
import { UserRound, Sparkles, Loader2 } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { careers } from '../../data/careers';
import { api } from '../../services/api';
import { AIOutput } from '../../components/AIOutput';
import { BackToAITools } from '../../components/BackToAITools';

export default function FutureMeSimulator() {
  const [careerId, setCareerId] = useState(careers[0].id);
  const [show, setShow] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const career = careers.find((c) => c.id === careerId)!;

  const simulate = async () => {
    setShow(true);
    setAiAnswer('');
    setLoading(true);
    const prompt = `
Create a realistic "Future Me" simulation for an Indian student choosing this career.
Return:
1. 5-year future snapshot
2. Daily work life
3. Skills mastered
4. Salary/growth expectation with caution that it varies
5. What to start this month

Career: ${career.name}
Description: ${career.description}
Salary range: ${career.avgSalary} to ${career.topSalary}
Demand: ${career.demandLevel}
Eligibility: ${career.eligibility}
Skills: ${career.skills.join(', ')}
Future scope: ${career.futureScope}
`;
    try {
      const res = await api.askGemini(prompt, 'Future Me Simulator');
      setAiAnswer(res.answer);
    } catch {
      setAiAnswer(`Demo future simulation (AI is temporarily unavailable)\n\nIn the next five years, consistent learning, practical projects and internships can move you from beginner to a confident professional in this field. Prioritise one specialization, build measurable proof of work, improve communication and review industry requirements every six months.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <BackToAITools />
      <SectionHeader eyebrow="AI Tools" title="Future Me Simulator" lead="See what your life could look like 5 years into a chosen career." />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Choose a career to simulate</label>
        <div className="flex flex-wrap gap-3">
          <select
            value={careerId}
            onChange={(e) => { setCareerId(e.target.value); setShow(false); setAiAnswer(''); }}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
            ))}
          </select>
          <button
            onClick={simulate}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Simulate
          </button>
        </div>

        {show && (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                <UserRound className="text-brand-600" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-600">5 years from now</p>
                <h3 className="font-display text-xl font-bold text-slate-900">You, as a {career.name}</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              You're earning around <strong>{career.topSalary}</strong> at a senior or specialist level. Demand for {career.name.toLowerCase()}s
              is {career.demandLevel.toLowerCase()}, so your job security is strong. You've moved beyond the basics into roles like{' '}
              {career.jobRoles.slice(0, 2).join(' or ')}, and mentoring juniors has become part of your routine.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{career.futureScope}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {career.tags.map((t) => (
                <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">{t}</span>
              ))}
            </div>
            {(loading || aiAnswer) && (
              <div className="mt-5">
                {loading ? (
                  <div className="rounded-2xl bg-white p-5 text-sm font-semibold text-brand-700 shadow-sm">
                    <Loader2 size={16} className="animate-spin" /> Generating future snapshot...
                  </div>
                ) : (
                  <AIOutput title="AI Future Simulation" text={aiAnswer} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
