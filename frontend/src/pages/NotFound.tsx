import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Compass size={32} />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  );
}
