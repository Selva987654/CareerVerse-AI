import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { careers, categories } from '../data/careers';
import { CareerCard } from '../components/CareerCard';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Careers() {
  const ref = useScrollReveal();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return careers.filter((c) => {
      const matchesCategory = category === 'All' || c.category === category;
      const matchesQuery =
        query.trim() === '' ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
        c.jobRoles.some((r) => r.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Explorer"
          title="Browse career paths with real details."
          lead="Eligibility, skills, salary, job roles, and future scope — everything you need to evaluate a career."
        />

        <div className="flex flex-col gap-4 sm:flex-row" data-reveal>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by career, skill, or job role"
              aria-label="Search careers"
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          >
            <option>All</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-slate-500" data-reveal>
          Showing {filtered.length} of {careers.length} careers
        </p>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-10 text-center" data-reveal>
            <p className="font-display text-lg font-bold text-slate-800">No careers found</p>
            <p className="mt-2 text-sm text-slate-500">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <CareerCard key={c.id} career={c} delay={i * 60} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
