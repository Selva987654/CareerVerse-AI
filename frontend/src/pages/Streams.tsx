import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { streamOptions } from '../data/courses';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Streams() {
  const ref = useScrollReveal();
  const [activeId, setActiveId] = useState(streamOptions[0].id);
  const active = streamOptions.find((s) => s.id === activeId)!;

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Stream Selector"
          title="Choose your stream after 10th."
          lead="Your stream shapes your subjects for the next 2 years and influences your college options. Pick based on genuine interest, not pressure."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-1" data-reveal>
            {streamOptions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                aria-pressed={activeId === s.id}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                  activeId === s.id
                    ? 'border-brand-500 bg-brand-50 shadow-brand'
                    : 'border-slate-100 hover:border-brand-200'
                }`}
              >
                <span className="text-3xl" aria-hidden="true">{s.emoji}</span>
                <div>
                  <p className="font-display font-bold text-slate-900">{s.label}</p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div
            className="rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-8 lg:col-span-2"
            data-reveal
            data-reveal-delay="100"
          >
            <span className="text-4xl" aria-hidden="true">{active.emoji}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-slate-900">{active.label}</h3>
            <p className="mt-2 text-base leading-relaxed text-slate-600">{active.desc}</p>

            <h4 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-500">
              Careers this stream leads to
            </h4>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {active.careers.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  <CheckCircle2 size={16} className="flex-shrink-0 text-brand-600" />
                  {c}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"
              >
                Explore Courses <ArrowRight size={16} />
              </Link>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
              >
                Not sure? Take the Quiz
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-12 rounded-2xl border border-amber-100 bg-amber-50 p-6 text-sm text-amber-900"
          data-reveal
        >
          <strong>Good to know:</strong> Your stream does not permanently lock your future. Many
          successful professionals switched fields later through entrance exams, certifications,
          or further study. Choose what interests you most right now — you can always adapt later.
        </div>
      </div>
    </div>
  );
}
