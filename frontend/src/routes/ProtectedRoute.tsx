import { ReactNode } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { LockKeyhole, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  allow?: Role[];
}

export function ProtectedRoute({ children, allow }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return (
      <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50/90 p-4 shadow-card">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
              <LockKeyhole size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-base font-bold text-slate-900">Login required</h1>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                Please log in to access this feature. After login, this page will open automatically.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-brand hover:bg-brand-700"
                >
                  <LogIn size={14} /> Login
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-brand-300"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (allow && !allow.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
