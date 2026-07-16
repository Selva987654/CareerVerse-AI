import { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { comparisons } from '../data/comparisons';

export default function CareerComparison() {
  const [activeId, setActiveId] = useState(comparisons[0].id);
  const active = comparisons.find((c) => c.id === activeId)!;

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Comparison Tools"
          title="Compare your options side by side"
          lead="Choosing between two paths? See the real trade-offs before you decide."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {comparisons.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeId === c.id
                  ? 'bg-brand-600 text-white shadow-brand'
                  : 'border border-slate-200 text-slate-600 hover:border-brand-300'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-card">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Factor</th>
                {active.options.map((opt) => (
                  <th key={opt} className="px-5 py-4 text-left font-display text-base font-bold text-slate-900">{opt}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {active.rows.map((row) => (
                <tr key={row.label}>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-5 py-4 text-sm text-slate-600">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-slate-400">Sample comparison data for guidance \u2014 always verify specifics for your target college or company.</p>
      </div>
    </div>
  );
}
