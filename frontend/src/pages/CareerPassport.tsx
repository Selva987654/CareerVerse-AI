import { CreditCard, BookMarked, Compass, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { ProgressBar } from '../components/dashboard/DashboardWidgets';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { careers } from '../data/careers';
import { courses } from '../data/courses';
import { quizResults } from '../data/quiz';

export default function CareerPassport() {
  const { user } = useAuth();
  const { savedCareers, savedCourses, quizResult, progress, applications } = useApp();

  const savedCareerItems = careers.filter((c) => savedCareers.includes(c.id));
  const savedCourseItems = courses.filter((c) => savedCourses.includes(c.id));
  const result = quizResult ? quizResults[quizResult.resultId] : null;
  const progressPct = Math.round((Object.values(progress).filter(Boolean).length / 4) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Your Profile" title="Career Passport" lead="Everything you've explored and saved, in one place." />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-600 to-indigo-600 p-7 text-white shadow-brand">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold backdrop-blur">
            {user ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : <CreditCard />}
          </span>
          <div>
            <p className="font-display text-2xl font-bold">{user?.name ?? 'Guest Explorer'}</p>
            <p className="text-sm text-white/80">{user?.email ?? 'Log in to save your passport permanently'}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
            <Award size={18} className="text-brand-600" /> Career Quiz Result
          </h3>
          {result ? (
            <div>
              <p className="text-3xl">{result.emoji}</p>
              <p className="mt-1 font-semibold text-slate-800">{result.title}</p>
              <p className="mt-1 text-sm text-slate-600">{result.description}</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-500">You haven't taken the Career Quiz yet.</p>
              <Link to="/discover" className="mt-2 inline-block text-sm font-semibold text-brand-600">Take the quiz</Link>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
            <Target size={18} className="text-brand-600" /> Roadmap Progress
          </h3>
          <ProgressBar label="Overall progress" value={progressPct} />
          <p className="mt-3 text-xs text-slate-500">Complete the quiz, choose a stream, explore careers, and view a roadmap to reach 100%.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:col-span-2">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
            <BookMarked size={18} className="text-brand-600" /> Saved Careers ({savedCareerItems.length})
          </h3>
          {savedCareerItems.length === 0 ? (
            <p className="text-sm text-slate-500">No careers saved yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {savedCareerItems.map((c) => (
                <Link key={c.id} to={`/career-guide/${c.id}`} className="rounded-full bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700">
                  {c.emoji} {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:col-span-2">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
            <Compass size={18} className="text-brand-600" /> Saved Courses ({savedCourseItems.length})
          </h3>
          {savedCourseItems.length === 0 ? (
            <p className="text-sm text-slate-500">No courses saved yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {savedCourseItems.map((c) => (
                <span key={c.id} className="rounded-full bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                  {c.emoji} {c.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:col-span-2">
          <h3 className="mb-3 font-display text-lg font-bold text-slate-900">Applications ({applications.length})</h3>
          {applications.length === 0 ? (
            <p className="text-sm text-slate-500">No applications yet. Browse Internships & Jobs to apply.</p>
          ) : (
            <div className="space-y-2">
              {applications.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm">
                  <span className="font-medium text-slate-700 capitalize">{a.type} \u2014 {a.id}</span>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold capitalize text-indigo-700">{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
