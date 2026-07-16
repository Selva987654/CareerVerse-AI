import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BackToAITools() {
  return (
    <Link
      to="/ai-tools"
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
    >
      <ArrowLeft size={15} /> Back to AI Tools
    </Link>
  );
}
