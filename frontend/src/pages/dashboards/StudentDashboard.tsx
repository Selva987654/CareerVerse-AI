import { BookMarked, Compass, Calendar, ClipboardCheck, Briefcase, Linkedin, FileText, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatCard, ProgressBar, Panel, EmptyState } from '../../components/dashboard/DashboardWidgets';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { careers } from '../../data/careers';
import { courses } from '../../data/courses';
import { RealAccountProfile } from '../../components/dashboard/RealAccountProfile';
import { featureIsRelevant, profileSummary } from '../../utils/profileAccess';
import { SavedItemsPanel } from '../../components/dashboard/SavedItemsPanel';

export default function StudentDashboard() {
  const { user, profile } = useAuth();
  const { savedCareers, savedCourses, quizResult, progress, applications } = useApp();

  const savedCareerItems = careers.filter((c) => savedCareers.includes(c.id));
  const savedCourseItems = courses.filter((c) => savedCourses.includes(c.id));

  const progressSteps = Object.values(progress).filter(Boolean).length;
  const progressPct = Math.round((progressSteps / 4) * 100);
  const relevant = (feature: Parameters<typeof featureIsRelevant>[0]) => featureIsRelevant(feature, profile, user);
  const quickActions = [
    { to: '/career-passport', label: 'View Career Passport', icon: FileText, feature: 'careers' as const },
    { to: '/ai-tools', label: 'Open AI Career Tools', icon: Sparkles, feature: 'aiTools' as const },
    { to: '/placement-training', label: 'Placement Training', icon: ClipboardCheck, feature: 'placement' as const },
    { to: '/linkedin-guide', label: 'LinkedIn Readiness', icon: Linkedin, feature: 'placement' as const },
    { to: '/internships-jobs', label: 'Browse Jobs & Internships', icon: Briefcase, feature: 'internships' as const },
    { to: '/scholarships', label: 'Find Scholarships', icon: BookMarked, feature: 'scholarships' as const },
    { to: '/education-loans', label: 'Compare Education Loans', icon: Target, feature: 'loans' as const },
  ].filter((action) => relevant(action.feature));

  return (
    <DashboardLayout
      title={`Welcome, ${user?.name.split(' ')[0]}`}
      subtitle={`${profileSummary(profile)} · ${profile?.stream ?? 'Stream not selected yet'}`}
    >
      {user && <div className="mb-6"><RealAccountProfile role="student" /></div>}
      <div className="mb-6"><SavedItemsPanel /></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookMarked} label="Saved Careers" value={savedCareerItems.length} />
        <StatCard icon={Compass} label="Saved Courses" value={savedCourseItems.length} accent="indigo" />
        <StatCard icon={Briefcase} label="Applications" value={applications.length} accent="amber" />
        <StatCard icon={Target} label="Roadmap Progress" value={`${progressPct}%`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Your Roadmap Progress">
            <div className="space-y-4">
              <ProgressBar label="Career Quiz" value={progress.quizDone ? 100 : 0} />
              <ProgressBar label="Stream Selected" value={progress.streamChosen ? 100 : 0} />
              <ProgressBar label="Careers Explored" value={progress.careersExplored ? 100 : 0} />
              <ProgressBar label="Roadmap Viewed" value={progress.roadmapViewed ? 100 : 0} />
            </div>
            {!quizResult && (
              <Link
                to="/discover"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Take the Career Quiz <ArrowRight size={16} />
              </Link>
            )}
          </Panel>

          <Panel title="Saved Careers">
            {savedCareerItems.length === 0 ? (
              <EmptyState text="You haven't saved any careers yet. Explore Career Guide to save your favourites." />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {savedCareerItems.map((c) => (
                  <Link
                    key={c.id}
                    to={`/career-guide/${c.id}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-brand-300 hover:bg-brand-50/50"
                  >
                    <span className="text-2xl">{c.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.avgSalary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Saved Courses">
            {savedCourseItems.length === 0 ? (
              <EmptyState text="No saved courses yet. Browse Courses & Exams to save options." />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {savedCourseItems.map((c) => (
                  <Link
                    key={c.id}
                    to={`/courses-exams/courses/${c.id}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-brand-300 hover:bg-brand-50/50"
                  >
                    <span className="text-2xl">{c.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Quick Actions">
            <div className="space-y-2">
              {quickActions.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Icon size={18} className="text-brand-600" /> {label}
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Upcoming Exam Reminders">
            <div className="space-y-3">
              {[
                { name: 'JEE Main Session 2', date: 'Apr 2027' },
                { name: 'CUET UG', date: 'May 2027' },
              ].map((e) => (
                <div key={e.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brand-600" />
                    <span className="text-sm font-medium text-slate-700">{e.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{e.date}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">Sample reminders \u2014 connect a backend for live exam dates.</p>
          </Panel>

          <Panel title="Recommended Next Action">
            <div className="rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                {quizResult ? 'Explore careers matching your quiz result' : 'Take the 3-minute Career Quiz'}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {quizResult
                  ? 'See personalised career paths based on your answers.'
                  : 'Discover streams and careers that match your interests.'}
              </p>
              <Link
                to="/discover"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
              >
                Go to Discover <ArrowRight size={14} />
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
