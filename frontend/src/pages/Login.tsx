import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  GraduationCap, Users, Building2, Briefcase, UserCheck, ShieldCheck,
  ArrowLeft, Eye, EyeOff, Compass, Mail, Lock, Chrome,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Role, ROLE_DASHBOARD_PATH, ROLE_LABELS } from '../types/auth';

interface RoleCardDef {
  role: Role;
  icon: typeof GraduationCap;
  title: string;
  desc: string;
}

const demoCredentials: Record<Role, { email: string; password: string }> = {
  student: { email: 'student@careerverse.demo', password: 'demo123' },
  parent: { email: 'parent@careerverse.demo', password: 'demo123' },
  college: { email: 'college@careerverse.demo', password: 'demo123' },
  recruiter: { email: 'recruiter@careerverse.demo', password: 'demo123' },
  mentor: { email: 'trainer@careerverse.demo', password: 'demo123' },
  admin: { email: 'admin@careerverse.demo', password: 'admin123' },
};

const roleCards: RoleCardDef[] = [
  { role: 'student', icon: GraduationCap, title: 'Student Login', desc: '10th, 12th, diploma, college students & graduates' },
  { role: 'parent', icon: Users, title: 'Parent Login', desc: 'Guide your child\'s career with clarity' },
  { role: 'college', icon: Building2, title: 'College / Placement Officer', desc: 'Manage students & placement training' },
  { role: 'recruiter', icon: Briefcase, title: 'Recruiter / Company', desc: 'Post jobs & internships, hire talent' },
  { role: 'mentor', icon: UserCheck, title: 'Mentor / Placement Trainer', desc: 'Run training sessions & mock interviews' },
  { role: 'admin', icon: ShieldCheck, title: 'Admin Login', desc: 'Manage the full CareerVerse AI platform' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from;

  useEffect(() => {
    if (location.pathname === '/admin-login' || location.pathname === '/admin') {
      setSelectedRole('admin');
    }
    if (location.pathname === '/mentor') {
      setSelectedRole('mentor');
    }
  }, [location.pathname]);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setError('');
    setEmail('');
    setPassword('');
  };

  const fillDemoLogin = () => {
    if (!selectedRole) return;
    setEmail(demoCredentials[selectedRole].email);
    setPassword(demoCredentials[selectedRole].password);
    setError('');
  };

  const handleGoogleLogin = () => {
    window.location.href = `${api.apiBaseUrl}/api/auth/google/start?role=${selectedRole ?? 'student'}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setSubmitting(true);
    setError('');
    const res = await login(email, password, selectedRole);
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? 'Login failed. Make sure the Spring Boot backend is running.');
      return;
    }
    navigate(from ?? ROLE_DASHBOARD_PATH[selectedRole], { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-brand-50/60 via-white to-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 font-display text-xl font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-brand">
              <Compass size={20} aria-hidden="true" />
            </span>
            CareerVerse<span className="text-brand-600"> AI</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Secure login</h1>
          <p className="mt-2 text-slate-600">Login with MySQL demo/database credentials or continue with Google OAuth. New Google students continue to profile setup.</p>
          {from && (
            <p className="mx-auto mt-4 max-w-xl rounded-2xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">
              Login is required for this feature. After a successful login, the requested page will open automatically.
            </p>
          )}
        </div>

        {!selectedRole ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roleCards.map(({ role, icon: Icon, title, desc }) => (
              <button
                key={role}
                onClick={() => handleSelectRole(role)}
                className="group rounded-2xl border border-slate-200 bg-white/80 p-6 text-left shadow-card backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
                <p className="mt-1.5 text-sm text-slate-600">{desc}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md">
            <button
              onClick={() => setSelectedRole(null)}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600"
            >
              <ArrowLeft size={16} /> Choose a different role
            </button>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
              <h2 className="font-display text-xl font-bold text-slate-900">{ROLE_LABELS[selectedRole]}</h2>
              <p className="mt-1 text-sm text-slate-500">Demo login is available, but it is seeded in MySQL by the Spring Boot backend, not hardcoded in the frontend.</p>

              {selectedRole !== 'admin' && (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
                >
                  <Chrome size={18} /> Continue with Google
                </button>
              )}

              {selectedRole === 'admin' && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Admin login is email/password only. Create the admin record in MySQL with a BCrypt password.
                </div>
              )}

              <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-800">
                <div className="font-semibold">Database demo login</div>
                <div className="mt-1 font-mono text-xs">{demoCredentials[selectedRole].email} / {demoCredentials[selectedRole].password}</div>
                <button type="button" onClick={fillDemoLogin} className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-700 shadow-sm hover:bg-brand-100">Fill demo credentials</button>
              </div>

              <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <span className="h-px flex-1 bg-slate-200" /> Database login <span className="h-px flex-1 bg-slate-200" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                  <div className="relative">
                    <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 pl-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                  <div className="relative">
                    <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 pl-10 pr-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand transition-all hover:bg-brand-700 disabled:opacity-60"
                >
                  {submitting ? 'Signing in...' : `Sign in as ${ROLE_LABELS[selectedRole]}`}
                </button>
              </form>
              <p className="mt-5 text-center text-sm text-slate-600">New to CareerVerse? <Link to="/register" className="font-semibold text-brand-700 hover:underline">Create a new account</Link></p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
