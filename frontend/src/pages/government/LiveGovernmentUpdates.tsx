import { useMemo, useState } from 'react';
import { CalendarDays, ExternalLink, Filter, Radio, Search } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { examUpdates } from '../../data/governmentExams';

const updateTypes = ['All', 'Notification', 'Vacancy', 'Admit Card', 'Result', 'Answer Key', 'Exam Date'];

export default function LiveGovernmentUpdates() {
  const [type, setType] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => examUpdates.filter((update) => {
    const matchesType = type === 'All' || update.type === type;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [update.examName, update.title, update.description, update.source].join(' ').toLowerCase().includes(q);
    return matchesType && matchesQuery;
  }), [type, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Live updates"
        title="Vacancies, results, admit cards and official exam alerts"
        lead="For a student-safe system, updates are shown from official sources and admin can verify/publish each item before it appears in production."
      />
      <div className="mb-6 rounded-3xl bg-slate-900 p-6 text-white shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-200"><Radio size={15} /> Live update design</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Admin verified + official link based</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">The project supports manual admin publishing now and can later add scheduled official-page monitoring in Spring Boot.</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-sm">
            <p className="font-semibold text-white">Update tabs</p>
            <p className="mt-1 text-slate-300">Notifications, vacancies, admit cards, results, answer keys and document verification.</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:grid-cols-[1fr_240px]">
        <label className="relative block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search results, vacancy, TNPSC, SSC..." className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100">
          {updateTypes.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((update) => (
          <article key={update.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card hover:border-brand-300">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{update.type}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{update.status}</span>
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-slate-900">{update.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{update.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Exam</p><p className="font-semibold text-slate-900">{update.examName}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Posted</p><p className="font-semibold text-slate-900">{update.postedDate}</p></div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"><CalendarDays size={16} /> Source: {update.source}</p>
              <a href={update.officialLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700">Open official link <ExternalLink size={13} /></a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-brand-300 bg-brand-50 p-5 text-sm leading-6 text-brand-900">
        <p className="font-bold"><Filter className="mr-2 inline" size={16} /> Advanced implementation idea</p>
        <p className="mt-1">In Spring Boot, add a scheduler that checks official pages daily, saves detected updates to MySQL as draft records, and lets admin approve them. This avoids fake notifications and keeps the website trustworthy.</p>
      </div>
    </div>
  );
}
