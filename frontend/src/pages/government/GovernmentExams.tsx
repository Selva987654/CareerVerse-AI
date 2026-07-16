import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, CalendarDays, ExternalLink, Filter, Search, ShieldCheck, Users } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { examCategories, examUpdates, governmentExams } from '../../data/governmentExams';

const quickStats = [
  { label: 'Exam categories', value: '8+', icon: Filter },
  { label: 'Official links', value: 'Verified', icon: ShieldCheck },
  { label: 'Trainer cards', value: 'Separate page', icon: Users },
  { label: 'Live updates', value: 'Admin ready', icon: CalendarDays },
];

export default function GovernmentExams() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return governmentExams.filter((exam) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || [exam.name, exam.shortName, exam.category, exam.bestFor, exam.qualification]
        .join(' ')
        .toLowerCase()
        .includes(q);
      const matchesCategory = category === 'All' || exam.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="bg-gradient-to-b from-brand-50/60 via-white to-white">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-card">
              Government Exam Guidance System
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Choose, apply and prepare for government exams with one clear plan.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Explore UPSC, SSC, IBPS, RRB, TNPSC, TN TRB, TNUSRB and NTA exams with official links, eligibility, syllabus, how to apply, preparation roadmaps, trainer support and live update cards.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/exam-live-updates" className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">
                View live updates
              </Link>
              <Link to="/government-exam-trainers" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300">
                Find trainers
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-card backdrop-blur">
            <h2 className="font-display text-xl font-bold text-slate-900">Student flow</h2>
            <div className="mt-5 space-y-4">
              {['Select qualification and interest', 'AI suggests suitable exams', 'Check eligibility and official apply link', 'Follow roadmap, videos and trainer guidance', 'Track vacancy, admit card and result updates'].map((step, idx) => (
                <div key={step} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{idx + 1}</span>
                  <p className="text-sm font-medium text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <Icon className="text-brand-600" size={22} />
              <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Exam explorer"
          title="Find the right government exam"
          lead="Use filters to compare eligibility, difficulty, preparation time, official portals and career outcomes."
        />

        <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:grid-cols-[1fr_260px]">
          <label className="relative block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search UPSC, SSC, TNPSC, banking, railway..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option>All</option>
            {examCategories.map((cat) => <option key={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((exam) => (
            <article key={exam.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">{exam.category}</span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-slate-900">{exam.shortName}</h3>
                  <p className="mt-1 text-sm text-slate-500">{exam.conductingBody}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{exam.difficulty}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{exam.bestFor}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Qualification</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{exam.qualification}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Preparation</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{exam.preparationTime}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={exam.officialLinks.apply} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700">
                  Official apply <ExternalLink size={13} />
                </a>
                <Link to={`/government-exams/${exam.id}`} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100">
                  View full guide <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-card">
            <BookOpenCheck size={28} className="text-brand-300" />
            <h2 className="mt-4 font-display text-2xl font-bold">How this module helps</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The module avoids fake links and shows official website buttons. Admin can verify and publish latest notifications, while students can save exams, track applications and follow AI-assisted study plans.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {examUpdates.map((update) => (
              <Link key={update.id} to="/exam-live-updates" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:border-brand-300">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{update.status}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{update.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{update.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
