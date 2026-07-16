import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';
import { dailyUpdates } from '../data/dailyUpdates';

export function UpdatesTicker() {
  const items = [...dailyUpdates, ...dailyUpdates];

  return (
    <div className="border-y border-slate-100 bg-slate-900">
      <div className="flex items-center">
        <Link
          to="/daily-updates"
          className="z-10 flex flex-shrink-0 items-center gap-2 bg-brand-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white"
        >
          <Radio size={14} className="animate-pulse" /> Live Updates
        </Link>
        <div className="group relative flex-1 overflow-hidden py-2.5">
          <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
            {items.map((u, i) => (
              <Link
                key={`${u.id}-${i}`}
                to="/daily-updates"
                className="flex flex-shrink-0 items-center gap-2 text-xs font-medium text-slate-200 hover:text-white"
              >
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">{u.category}</span>
                {u.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
