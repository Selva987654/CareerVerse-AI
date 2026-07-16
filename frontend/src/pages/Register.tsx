import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ROLE_LABELS, type Role } from '../types/auth';

const registerRoles: Role[] = ['student', 'parent', 'college', 'recruiter', 'mentor'];

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', role: 'student' as Role });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const { setSession } = useAuth();
  const navigate = useNavigate();

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must contain at least 6 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setSaving(true);
    try {
      const response = await api.register({ fullName: form.fullName, email: form.email, password: form.password, role: form.role });
      setSession(response.token, response.user);
      navigate(form.role === 'student' ? '/complete-profile' : '/profile-setup', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create your account.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-brand-50/60 via-white to-white py-12">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 font-display text-xl font-bold text-slate-900"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-brand"><Compass size={20} /></span>CareerVerse<span className="text-brand-600"> AI</span></Link>
          <h1 className="font-display text-3xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600">Your profile, saves, applications, and dashboard data stay connected to this account.</p>
        </div>
        <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card">
          <label className="block text-sm font-semibold text-slate-700">Full name<div className="relative mt-2"><UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input required value={form.fullName} onChange={(event) => update('fullName', event.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" placeholder="Your name" /></div></label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Email<div className="relative mt-2"><Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" placeholder="name@example.com" /></div></label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Account type<select value={form.role} onChange={(event) => update('role', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100">{registerRoles.map((role) => <option key={role} value={role}>{ROLE_LABELS[role]}</option>)}</select></label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Password<div className="relative mt-2"><Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input required type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => update('password', event.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 pr-11 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" placeholder="At least 6 characters" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Confirm password<input required type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" /></label>
          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          <button disabled={saving} className="mt-6 w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700 disabled:opacity-60">{saving ? 'Creating account...' : 'Create account'}</button>
          <Link to="/login" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-brand-700"><ArrowLeft size={15} /> Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
}
