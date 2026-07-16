import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { courses } from '../data/courses';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const streams = ['All', ...new Set(courses.map((c) => c.stream))];

export default function Courses() {
  const ref = useScrollReveal();
  const [query, setQuery] = useState('');
  const [stream, setStream] = useState('All');

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesStream = stream === 'All' || c.stream === stream;
      const matchesQuery =
        query.trim() === '' ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase());
      return matchesStream && matchesQuery;
    });
  }, [query, stream]);

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Course Explorer"
          title="Find the right course for your goals."
          lead="Compare duration, eligibility, fees, and career outcomes across all major courses."
        />

        <div className="flex flex-col gap-4 sm:flex-row" data-reveal>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses (e.g. Engineering, Design, Law)"
              aria-label="Search courses"
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <select
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            aria-label="Filter by stream"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          >
            {streams.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-slate-500" data-reveal>
          Showing {filtered.length} of {courses.length} courses
        </p>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-10 text-center" data-reveal>
            <p className="font-display text-lg font-bold text-slate-800">No courses found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term or choose "All" streams.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <Link
                key={c.id}
                to={`/courses-exams/courses/${c.id}`}
                data-reveal
                data-reveal-delay={i * 60}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">{c.emoji}</span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      {c.stream}
                    </span>
                    <h3 className="font-display font-bold text-slate-900">{c.name}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.description}</p>

                <dl className="mt-4 space-y-2 text-sm">
                  <Row label="Duration" value={c.duration} />
                  <Row label="Eligibility" value={c.eligibility} />
                  <Row label="Avg. Fees" value={c.avgFees} />
                </dl>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Leads to
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.careerOptions.slice(0, 3).map((opt) => (
                      <span
                        key={opt}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                {c.entranceExams[0] !== 'No entrance — enroll directly' && (
                  <div className="mt-4 rounded-xl bg-indigo-50 p-3 text-xs text-indigo-800">
                    <strong>Entrance exams:</strong> {c.entranceExams.join(', ')}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  );
}
