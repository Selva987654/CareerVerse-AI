import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { AIOutput } from './AIOutput';

type Field = { name: string; label: string; placeholder?: string; type?: 'text' | 'textarea' | 'number' };

interface Props {
  title: string;
  subtitle: string;
  tool: string;
  fields: Field[];
  sampleOutput: string[];
}

export function AIToolForm({ title, subtitle, tool, fields, sampleOutput }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const preventInputEnterSubmit = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    const prompt = Object.entries(values).map(([k, v]) => `${k}: ${v}`).join('\n');
    try {
      const res = await api.askGemini(prompt, tool);
      setAnswer(res.answer);
    } catch {
      const details = Object.entries(values).filter(([, value]) => value.trim()).map(([key, value]) => `- ${key}: ${value}`).join('\n');
      setAnswer(`Demo guidance (AI is temporarily unavailable)\n\n${sampleOutput.map((item, index) => `${index + 1}. ${item}: Review this area using the details you entered and tailor it to your target role.`).join('\n')}\n\nYour details\n${details || '- Add your details and retry for a personalised result.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300"><ArrowLeft size={15} /> Back to AI Tools</Link>
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 p-8 text-white shadow-brand sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            <Sparkles size={14} /> Gemini API-ready
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-white/85">{subtitle}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleGenerate} onKeyDown={preventInputEnterSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <label key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700">{field.label}</span>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={values[field.name] ?? ''}
                      onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <input
                      type={field.type ?? 'text'}
                      value={values[field.name] ?? ''}
                      onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  )}
                </label>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Generate with AI
            </button>
          </form>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">Output should include</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {sampleOutput.map((item) => <li key={item} className="rounded-xl bg-white p-3 shadow-sm">{item}</li>)}
            </ul>
          </div>
        </div>

        {answer && (
          <div className="mt-8">
            <AIOutput text={answer} />
          </div>
        )}
      </div>
    </div>
  );
}
