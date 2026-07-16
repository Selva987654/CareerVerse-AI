import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Globe, Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';
import { entranceExams } from '../data/courses';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const fields = ['All', ...new Set(entranceExams.map((e) => e.field))];
const url = (site: string) => site.startsWith('http') ? site : `https://${site}`;

export default function Exams() {
  const ref = useScrollReveal();
  const [query, setQuery] = useState('');
  const [field, setField] = useState('All');

  const filtered = useMemo(() => {
    return entranceExams.filter((e) => {
      const matchesField = field === 'All' || e.field === field;
      const matchesQuery = query.trim() === '' || e.name.toLowerCase().includes(query.toLowerCase()) || e.fullForm.toLowerCase().includes(query.toLowerCase()) || e.field.toLowerCase().includes(query.toLowerCase());
      return matchesField && matchesQuery;
    });
  }, [query, field]);

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Entrance Exam Guide"
          title="Click any exam to see details, process and official apply navigation."
          lead="Every card opens a detail page with eligibility, important dates, preparation plan, how to apply and official website action."
        />
        <div className="flex flex-col gap-4 sm:flex-row" data-reveal>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search exams (e.g. JEE, NEET, CLAT, TNEA, CUET)" aria-label="Search exams" className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
          </div>
          <select value={field} onChange={(e) => setField(e.target.value)} aria-label="Filter by field" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium focus:border-brand-400 focus:ring-2 focus:ring-brand-100">
            {fields.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((exam, i) => (
            <article key={exam.id} data-reveal data-reveal-delay={i * 60} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{exam.emoji}</span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{exam.field}</span>
                  <h3 className="font-display text-lg font-bold text-slate-900">{exam.name}</h3>
                  <p className="text-xs text-slate-500">{exam.fullForm}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{exam.description}</p>
              <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div><dt className="text-xs font-semibold uppercase text-slate-400">Eligibility</dt><dd className="text-slate-700">{exam.eligibility}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-slate-400">Frequency</dt><dd className="text-slate-700">{exam.frequency}</dd></div>
              </dl>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600"><Calendar size={14} className="flex-shrink-0 text-brand-600" />{exam.importantDates}</div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500"><Globe size={14} className="flex-shrink-0" /> {exam.officialWebsite}</div>
              <div className="mt-4 rounded-xl bg-indigo-50 p-4">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-indigo-700"><Lightbulb size={14} /> Preparation Tips</p>
                <ul className="space-y-1 text-sm text-indigo-900">{exam.tips.slice(0, 3).map((tip) => <li key={tip}>• {tip}</li>)}</ul>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={`/exams/${exam.id}`} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">View details & process <ArrowRight size={14} /></Link>
                <a href={url(exam.officialWebsite)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Official site <ExternalLink size={14} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
