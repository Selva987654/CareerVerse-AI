import { useState, useMemo } from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { dailyUpdates, updateCategories } from '../data/dailyUpdates';

const importanceColor: Record<string, string> = {
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
};

export default function DailyUpdates() {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(
    () => (category === 'All' ? dailyUpdates : dailyUpdates.filter((u) => u.category === category)),
    [category]
  );

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Daily Updates"
          title="Stay on top of education & career news"
          lead="Exam alerts, counselling updates, scholarships, and hiring news \u2014 all in one feed. Sample data for demonstration."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {updateCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === c ? 'bg-brand-600 text-white shadow-brand' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((u) => (
            <div key={u.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{u.category}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${importanceColor[u.importance]}`}>{u.importance} priority</span>
                <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar size={12} /> {u.date}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{u.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{u.summary}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Source: {u.source}</span>
                <a
                  href={u.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Read more <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
