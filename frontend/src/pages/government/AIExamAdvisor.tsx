import { useMemo, useState } from 'react';
import { Bot, Brain, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { api } from '../../services/api';
import { governmentExams } from '../../data/governmentExams';
import { AIOutput } from '../../components/AIOutput';
import { BackToAITools } from '../../components/BackToAITools';

interface AdvisorForm {
  qualification: string;
  age: string;
  state: string;
  interest: string;
  studyTime: string;
  language: string;
}

const initialForm: AdvisorForm = {
  qualification: 'BCA / Degree student',
  age: '20',
  state: 'Tamil Nadu',
  interest: 'Government office job + technology related role',
  studyTime: '3 hours per day',
  language: 'Tamil + English',
};

export default function AIExamAdvisor() {
  const [form, setForm] = useState(initialForm);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const localMatches = useMemo(() => {
    const interest = form.interest.toLowerCase();
    return governmentExams.filter((exam) => {
      const haystack = `${exam.name} ${exam.category} ${exam.bestFor} ${exam.qualification}`.toLowerCase();
      return interest.split(/\s|\+/).some((word) => word.length > 3 && haystack.includes(word)) || exam.category.includes('Tamil Nadu') || exam.category.includes('Central');
    }).slice(0, 4);
  }, [form.interest]);

  const prompt = `Act as a career guidance assistant for Indian students. Suggest government exams for this student and give eligibility match, preparation plan, official apply reminder, and 90-day timetable. Student profile: Qualification: ${form.qualification}, Age: ${form.age}, State: ${form.state}, Interest: ${form.interest}, Study time: ${form.studyTime}, Language: ${form.language}. Keep answer practical, student-friendly and avoid fake links.`;

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setAnswer('');
    try {
      const res = await api.askGemini(prompt, 'government-exam-advisor');
      setAnswer(res.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI request failed. Showing local fallback suggestions below.');
      setAnswer(`Based on your profile, start with these exams: ${localMatches.map((exam) => exam.shortName).join(', ')}. Use official portals only, check eligibility, then create a 90-day plan with daily aptitude/reasoning, current affairs, and weekly mock tests.`);
    } finally {
      setLoading(false);
    }
  };

  const update = (key: keyof AdvisorForm, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <BackToAITools />
      <SectionHeader
        eyebrow="Gemini AI ready"
        title="AI Government Exam Advisor"
        lead="Generate personalised exam suggestions and study plans through the backend AI service."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900"><Brain className="text-brand-600" /> Student profile</h2>
          <div className="mt-5 grid gap-4">
            {([
              ['qualification', 'Qualification'],
              ['age', 'Age'],
              ['state', 'State'],
              ['interest', 'Preferred job / interest'],
              ['studyTime', 'Daily study time'],
              ['language', 'Preferred language'],
            ] as [keyof AdvisorForm, string][]).map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
                <input
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </label>
            ))}
          </div>
          <button onClick={handleGenerate} disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700 disabled:opacity-60">
            {loading ? <Loader2 className="animate-spin" size={17} /> : <Sparkles size={17} />} Generate AI plan
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900"><Bot className="text-brand-600" /> AI result</h2>
          {error && <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">{error}</p>}
          {answer ? (
            <div className="mt-5">
              <AIOutput title="AI Government Exam Plan" text={answer} />
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              Fill the profile and click generate. If live AI is unavailable, this page still shows local fallback suggestions.
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-display text-lg font-bold text-slate-900">Local recommended starting exams</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {localMatches.map((exam) => (
                <div key={exam.id} className="rounded-2xl bg-brand-50 p-4">
                  <p className="flex items-center gap-2 font-semibold text-brand-900"><CheckCircle2 size={17} /> {exam.shortName}</p>
                  <p className="mt-1 text-xs leading-5 text-brand-800">{exam.category} - {exam.preparationTime}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
