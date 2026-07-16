import { Heart, IndianRupee, GraduationCap, ShieldCheck, MessageCircle, ArrowRight, Sparkles, Building2, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Panel, StatCard } from '../../components/dashboard/DashboardWidgets';
import { useAuth } from '../../context/AuthContext';
import { RealAccountProfile } from '../../components/dashboard/RealAccountProfile';
import { SavedItemsPanel } from '../../components/dashboard/SavedItemsPanel';

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Parent Dashboard" subtitle={`Tracking ${user?.meta?.child ?? 'your child'}\u2019s career journey`}>
      {user && <div className="mb-6"><RealAccountProfile role="parent" /></div>}
      <div className="mb-6"><SavedItemsPanel /></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Heart} label="Child's Interest" value="Science / Tech" />
        <StatCard icon={GraduationCap} label="Suggested Streams" value="3" accent="indigo" />
        <StatCard icon={ShieldCheck} label="Backup Options" value="4" accent="amber" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Suggested Streams for Your Child">
            <div className="grid gap-3 sm:grid-cols-3">
              {['Science (PCM)', 'Science (PCB)', 'Commerce'].map((s) => (
                <div key={s} className="rounded-xl border border-slate-200 p-4 text-center">
                  <p className="text-sm font-semibold text-slate-800">{s}</p>
                  <p className="mt-1 text-xs text-slate-500">Good fit based on interests</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Course Cost Planning">
            <div className="space-y-3">
              {[
                { name: 'B.Tech (Government College)', cost: '\u20b94 \u2013 8 LPA total' },
                { name: 'B.Tech (Private College)', cost: '\u20b98 \u2013 18 LPA total' },
                { name: 'MBBS (Government)', cost: '\u20b91 \u2013 6 LPA total' },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <IndianRupee size={14} className="text-brand-600" /> {c.name}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{c.cost}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">Sample estimates \u2014 actual fees vary by college and state.</p>
          </Panel>

          <Panel title="Future Scope & Backup Career Options">
            <p className="text-sm text-slate-600">
              Every path we recommend includes a backup option, so your child isn't limited to a single outcome.
              Explore full explanations in the Parents guide.
            </p>
            <Link to="/parents" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Read Parent Guidance <ArrowRight size={14} />
            </Link>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Parent Quick Actions">
            <div className="space-y-2">
              {[
                { to: '/ai-tools/career-quiz', label: 'AI Career Quiz', icon: Sparkles },
                { to: '/colleges-counselling', label: 'College Counselling', icon: Building2 },
                { to: '/scholarships', label: 'Scholarships', icon: IndianRupee },
                { to: '/education-loans', label: 'Education Loans', icon: Landmark },
                { to: '/government-exams', label: 'Government Exam Options', icon: Landmark },
              ].map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Icon size={18} className="text-brand-600" /> {label}
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Scholarship Options">
            <div className="space-y-2 text-sm text-slate-600">
              <p>\u2022 National Merit Scholarship</p>
              <p>\u2022 State Government Scholarships</p>
              <p>\u2022 College-specific need-based aid</p>
            </div>
            <Link to="/colleges-counselling" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Scholarship Finder <ArrowRight size={14} />
            </Link>
          </Panel>

          <Panel title="Parent Q&A" action={<MessageCircle size={18} className="text-slate-400" />}>
            <p className="text-sm text-slate-600">
              Have concerns about pressure, safety, or the right path? Get simple answers in the Parents section.
            </p>
            <Link to="/parents" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Ask a Question <ArrowRight size={14} />
            </Link>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
