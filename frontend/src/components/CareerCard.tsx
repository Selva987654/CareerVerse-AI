import { Link } from 'react-router-dom';
import { Heart, TrendingUp, IndianRupee, ArrowRight } from 'lucide-react';
import { Career } from '../data/careers';
import { useApp } from '../context/AppContext';

const colorMap: Record<string, string> = {
  indigo: 'from-indigo-500 to-indigo-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  green: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-500 to-amber-600',
  slate: 'from-slate-500 to-slate-600',
  teal: 'from-teal-500 to-teal-600',
  orange: 'from-orange-500 to-orange-600',
  rose: 'from-rose-500 to-rose-600',
  blue: 'from-blue-500 to-blue-600',
  violet: 'from-violet-500 to-violet-600',
  cyan: 'from-cyan-500 to-cyan-600',
};

export function CareerCard({ career, delay = 0 }: { career: Career; delay?: number }) {
  const { toggleSavedCareer, isCareerSaved } = useApp();
  const saved = isCareerSaved(career.id);
  const gradient = colorMap[career.color] || colorMap.indigo;

  return (
    <article
      data-reveal
      data-reveal-delay={delay}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-2xl shadow-md`}
          aria-hidden="true"
        >
          {career.emoji}
        </div>
        <button
          onClick={() => toggleSavedCareer(career.id)}
          aria-label={saved ? `Remove ${career.name} from saved` : `Save ${career.name}`}
          aria-pressed={saved}
          className="rounded-full p-2 text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
        >
          <Heart size={20} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-rose-500' : ''} />
        </button>
      </div>

      <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
        {career.category}
      </span>
      <h3 className="font-display text-lg font-bold text-slate-900">{career.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{career.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {career.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="flex items-center gap-1.5 font-semibold text-slate-700">
          <IndianRupee size={14} className="text-brand-600" /> {career.avgSalary}
        </span>
        <span className="flex items-center gap-1.5 text-slate-500">
          <TrendingUp size={14} className="text-emerald-500" /> {career.demandLevel}
        </span>
      </div>

      <Link
        to={`/careers/${career.id}`}
        className="mt-5 flex items-center justify-center gap-1.5 rounded-full bg-slate-50 py-2.5 text-sm font-semibold text-slate-800 transition-colors group-hover:bg-brand-600 group-hover:text-white"
      >
        View Full Details <ArrowRight size={16} />
      </Link>
    </article>
  );
}
