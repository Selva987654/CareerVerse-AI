import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ROLE_DASHBOARD_PATH } from '../types/auth';

export default function CompleteProfile() {
  const { user, setSession } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    educationLevel: '',
    currentCourseOrClass: '',
    stream: '',
    marksOrCgpa: '',
    location: '',
    careerInterest: '',
    skills: '',
    preferredCourse: '',
    preferredCollegeType: '',
    financialRequirement: '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('cv_auth_token') || '';
      await api.saveStudentProfile({
        ...form,
        marksOrCgpa: Number(form.marksOrCgpa),
      });
      setSession(token, { ...user, profileComplete: true });
      navigate(ROLE_DASHBOARD_PATH[user.role], { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save profile. Check backend connection.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-brand-50/70 via-white to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-brand-100 bg-white p-7 shadow-card">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-700"><Sparkles size={16} /> Continue setup</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">Complete your student profile</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Google saved your name, email and photo. Now add study details so AI career quiz, college finder, internship suggestions and roadmap pages can give better results.
              </p>
            </div>
            {user?.profileImage && <img src={user.profileImage} alt="Google profile" className="h-20 w-20 rounded-2xl object-cover shadow-card" />}
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-card md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">Education level
            <input value={form.educationLevel} onChange={(e) => update('educationLevel', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">Stream
            <input value={form.stream} onChange={(e) => update('stream', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">Current course or class
            <input value={form.currentCourseOrClass} onChange={(e) => update('currentCourseOrClass', e.target.value)} placeholder="Class 12 / BCA final year / MBA" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">Marks / CGPA
            <input type="number" value={form.marksOrCgpa} onChange={(e) => update('marksOrCgpa', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">Location
            <div className="relative mt-2">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={form.location} onChange={(e) => update('location', e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
            </div>
          </label>
          <label className="block text-sm font-semibold text-slate-700">Career interest
            <input value={form.careerInterest} onChange={(e) => update('careerInterest', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">Preferred course
            <input value={form.preferredCourse} onChange={(e) => update('preferredCourse', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">Skills
            <textarea value={form.skills} onChange={(e) => update('skills', e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">Preferred college type
            <input value={form.preferredCollegeType} onChange={(e) => update('preferredCollegeType', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">Financial requirement
            <input value={form.financialRequirement} onChange={(e) => update('financialRequirement', e.target.value)} placeholder="Scholarship first / need partial loan / need full funding" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 md:col-span-2">{error}</p>}
          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700 disabled:opacity-60">
              <GraduationCap size={18} /> {saving ? 'Saving...' : 'Save and continue'}
            </button>
            <button type="button" onClick={() => user && navigate(ROLE_DASHBOARD_PATH[user.role])} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700">
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
