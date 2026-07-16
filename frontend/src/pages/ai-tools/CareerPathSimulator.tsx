import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, Loader2 } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { runCareerSimulator, SimulatorResult } from './simulatorEngine';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { AIOutput } from '../../components/AIOutput';
import { BackToAITools } from '../../components/BackToAITools';

const interestOptions = [
  { id: 'tech', label: 'Technology & Coding' },
  { id: 'science', label: 'Science & Research' },
  { id: 'creative', label: 'Creative & Design' },
  { id: 'business', label: 'Business & Strategy' },
  { id: 'social', label: 'Helping People' },
  { id: 'leadership', label: 'Leading Teams' },
];

export default function CareerPathSimulator() {
  const [stage, setStage] = useState('12th');
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState('medium');
  const [workStyle, setWorkStyle] = useState('team');
  const [dreamCareer, setDreamCareer] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState<SimulatorResult[] | null>(null);
  const [aiAnswer, setAiAnswer] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const { toggleSavedCareer, isCareerSaved, markProgress } = useApp();

  const toggleInterest = (id: string) => {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const preventInputEnterSubmit = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const r = runCareerSimulator({ stage, interests, budget, workStyle, dreamCareer, city });
    setResults(r);
    setAiAnswer('');
    setLoadingAi(true);
    markProgress('careersExplored');
    const prompt = `
Generate a personalised career path recommendation for this user.
Use the local top matches as supporting data, but explain like an AI career counsellor.
Return:
1. Best 3 career paths
2. Why each path fits
3. Course/college direction
4. Skills and projects to build
5. 30/60/90 day action plan

User profile:
Stage: ${stage}
Interests: ${interests.join(', ')}
Budget: ${budget}
Work style: ${workStyle}
Dream career: ${dreamCareer || 'Not given'}
City: ${city || 'Not given'}

Local matches:
${r.map(({ career, matchScore, reason }) => `${career.name} (${matchScore}%): ${reason}`).join('\n')}
`;
    try {
      const res = await api.askGemini(prompt, 'AI Career Path Simulator');
      setAiAnswer(res.answer);
    } catch {
      setAiAnswer(`Demo roadmap (AI is temporarily unavailable)\n\n1. Start with the highest local career match shown below.\n2. Learn its core skills in a structured 30-day plan.\n3. Build one small project and publish the result.\n4. Update your resume and portfolio with measurable outcomes.\n5. Apply for relevant internships and review progress every week.`);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <BackToAITools />
        <SectionHeader
          eyebrow="AI Tools"
          title="AI Career Path Simulator"
        lead="Answer a few quick questions and get local matching plus AI-generated roadmap guidance."
      />

      {!results ? (
        <form onSubmit={handleSubmit} onKeyDown={preventInputEnterSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Your current stage</label>
              <select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none">
                {['10th', '12th', 'Diploma', 'College', 'Graduate', 'Career Switcher'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">City / preferred location</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Chennai" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">What excites you the most? (pick 1-3)</label>
            <div className="grid gap-2 sm:grid-cols-3">
              {interestOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => toggleInterest(opt.id)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                    interests.includes(opt.id)
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Family / course budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none">
                <option value="low">Low (government college / low fees)</option>
                <option value="medium">Medium</option>
                <option value="high">High (private college is fine)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Preferred work style</label>
              <select value={workStyle} onChange={(e) => setWorkStyle(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none">
                <option value="team">Working in a team</option>
                <option value="independent">Working independently / freelance</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Dream career (optional)</label>
            <input value={dreamCareer} onChange={(e) => setDreamCareer(e.target.value)} placeholder="e.g. Software Engineer" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
          </div>

          <button
            type="submit"
            disabled={interests.length === 0 || loadingAi}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingAi ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Generate My Career Paths
          </button>
          {interests.length === 0 && <p className="mt-2 text-xs text-slate-400">Pick at least one interest to continue.</p>}
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Based on your answers, here are your top 3 career paths.</p>
            <button
              onClick={() => setResults(null)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              <RotateCcw size={14} /> Start over
            </button>
          </div>

          {(loadingAi || aiAnswer) && (
            <>
              {loadingAi ? (
                <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm font-semibold text-brand-700 shadow-card">
                  <Loader2 size={16} className="animate-spin" /> Generating personalised roadmap...
                </div>
              ) : (
                <AIOutput title="Personalised AI Roadmap" text={aiAnswer} />
              )}
            </>
          )}

          {results.map(({ career, matchScore, reason }, i) => (
            <div key={career.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">{career.emoji}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-600">#{i + 1} Match</p>
                    <h3 className="font-display text-xl font-bold text-slate-900">{career.name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-brand-600">{matchScore}%</p>
                  <p className="text-xs text-slate-500">match score</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{reason}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Salary Range</p>
                  <p className="text-sm font-semibold text-slate-800">{career.avgSalary}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Demand</p>
                  <p className="text-sm font-semibold text-slate-800">{career.demandLevel}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Eligibility</p>
                  <p className="text-sm font-semibold text-slate-800">{career.eligibility}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link to={`/career-guide/${career.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  View Full Roadmap <ArrowRight size={14} />
                </Link>
                <button
                  onClick={() => toggleSavedCareer(career.id)}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300"
                >
                  {isCareerSaved(career.id) ? 'Saved \u2713' : 'Save this career'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
