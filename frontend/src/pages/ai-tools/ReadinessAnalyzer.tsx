import { useState } from 'react';
import { ClipboardCheck, Loader2, Sparkles } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { api } from '../../services/api';
import { AIOutput } from '../../components/AIOutput';
import { BackToAITools } from '../../components/BackToAITools';

const factors = [
  { key: 'resume', label: 'Resume quality (0\u201310)' },
  { key: 'linkedin', label: 'LinkedIn profile completeness (0\u201310)' },
  { key: 'github', label: 'GitHub / portfolio projects (0\u201310)' },
  { key: 'aptitude', label: 'Aptitude practice level (0\u201310)' },
  { key: 'interview', label: 'Mock interview practice (0\u201310)' },
  { key: 'communication', label: 'Communication confidence (0\u201310)' },
] as const;

export default function ReadinessAnalyzer() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(factors.map((f) => [f.key, 5]))
  );
  const [aiAnswer, setAiAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const overall = Math.round(
    (Object.values(scores).reduce((a, b) => a + b, 0) / (factors.length * 10)) * 100
  );

  const band =
    overall >= 80 ? { label: 'Placement Ready', color: 'text-green-700 bg-green-50' } :
    overall >= 55 ? { label: 'Almost There', color: 'text-amber-700 bg-amber-50' } :
    { label: 'Needs Focused Prep', color: 'text-red-600 bg-red-50' };

  const generatePlan = async () => {
    setAiAnswer('');
    setLoading(true);
    const prompt = `
Analyze this placement readiness score and create a practical improvement plan.
Return:
1. Overall readiness interpretation
2. Lowest areas to fix first
3. Resume/LinkedIn/GitHub actions
4. Aptitude and interview practice plan
5. 2-week urgent action checklist

Overall score: ${overall}%
Scores:
${factors.map((f) => `${f.label}: ${scores[f.key]}/10`).join('\n')}
`;
    try {
      const res = await api.askGemini(prompt, 'Placement Readiness Analyzer');
      setAiAnswer(res.answer);
    } catch {
      setAiAnswer(`Demo placement plan (AI is temporarily unavailable)\n\n1. Focus first on the lowest-scoring readiness factor shown above.\n2. Practise aptitude and communication for 20 minutes daily.\n3. Complete two role-relevant projects and document the results.\n4. Improve resume keywords and LinkedIn proof of work.\n5. Take one mock interview each week and record improvements.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <BackToAITools />
      <SectionHeader eyebrow="AI Tools" title="Placement Readiness Analyzer" lead="Rate yourself honestly on each factor to get your overall readiness score." />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="space-y-5">
          {factors.map((f) => (
            <div key={f.key}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <label htmlFor={f.key} className="font-medium text-slate-700">{f.label}</label>
                <span className="font-semibold text-brand-600">{scores[f.key]}</span>
              </div>
              <input
                id={f.key}
                type="range"
                min={0}
                max={10}
                value={scores[f.key]}
                onChange={(e) => setScores((prev) => ({ ...prev, [f.key]: Number(e.target.value) }))}
                className="w-full accent-brand-600"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 p-6 text-center">
          <ClipboardCheck className="mx-auto mb-2 text-brand-600" size={28} />
          <p className="font-display text-4xl font-bold text-slate-900">{overall}%</p>
          <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${band.color}`}>{band.label}</span>
          <p className="mt-3 text-sm text-slate-600">
            Focus on your lowest-scoring areas first \u2014 they bring your overall score down the most.
          </p>
        </div>

        <button
          type="button"
          onClick={generatePlan}
          disabled={loading}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Generate AI Placement Plan
        </button>

        {(loading || aiAnswer) && (
          <div className="mt-6">
            {loading ? (
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm font-semibold text-brand-700 shadow-card">
                <Loader2 size={16} className="animate-spin" /> Generating plan...
              </div>
            ) : (
              <AIOutput title="AI Placement Plan" text={aiAnswer} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
