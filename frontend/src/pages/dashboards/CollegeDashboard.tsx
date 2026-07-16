import { Users, Building2, TrendingUp, Handshake, CalendarDays, FileBarChart, Briefcase, ClipboardCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Panel, StatCard, ProgressBar } from '../../components/dashboard/DashboardWidgets';
import { useAuth } from '../../context/AuthContext';
import { RealAccountProfile } from '../../components/dashboard/RealAccountProfile';
import { SavedItemsPanel } from '../../components/dashboard/SavedItemsPanel';

const students = [
  { name: 'Aarav Kumar', dept: 'CSE', readiness: 82 },
  { name: 'Divya Iyer', dept: 'ECE', readiness: 68 },
  { name: 'Karthik Raj', dept: 'Mechanical', readiness: 55 },
  { name: 'Fathima S.', dept: 'CSE', readiness: 91 },
];

const departments = [
  { name: 'Computer Science', placed: 78 },
  { name: 'Electronics', placed: 61 },
  { name: 'Mechanical', placed: 49 },
  { name: 'Civil', placed: 44 },
];

export default function CollegeDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="College Dashboard" subtitle={user?.meta?.college ?? 'Placement Officer'}>
      {user && <div className="mb-6"><RealAccountProfile role="college" /></div>}
      <div className="mb-6"><SavedItemsPanel /></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Students" value="1,240" />
        <StatCard icon={Building2} label="Recruiter Connections" value="36" accent="indigo" />
        <StatCard icon={TrendingUp} label="Avg. Placement Readiness" value="71%" accent="amber" />
        <StatCard icon={CalendarDays} label="Upcoming Company Visits" value="5" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Student Placement Readiness">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-2">Student</th>
                    <th className="pb-2">Department</th>
                    <th className="pb-2">Readiness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((s) => (
                    <tr key={s.name}>
                      <td className="py-2.5 font-medium text-slate-800">{s.name}</td>
                      <td className="py-2.5 text-slate-500">{s.dept}</td>
                      <td className="py-2.5">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            s.readiness >= 75
                              ? 'bg-green-50 text-green-700'
                              : s.readiness >= 55
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {s.readiness}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Department-wise Placement Progress">
            <div className="space-y-4">
              {departments.map((d) => (
                <ProgressBar key={d.name} label={d.name} value={d.placed} />
              ))}
            </div>
          </Panel>

          <Panel title="Placement Training Batches">
            <div className="grid gap-3 sm:grid-cols-2">
              {['Aptitude Batch A', 'Mock Interview Batch B', 'GD Practice Batch C', 'Resume Building Batch D'].map((b) => (
                <div key={b} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {b}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="College Quick Actions">
            <div className="space-y-2">
              {[
                { to: '/placement-training', label: 'Placement Training Modules', icon: ClipboardCheck },
                { to: '/jobs', label: 'View Student Opportunities', icon: Briefcase },
                { to: '/ai-tools/readiness-analyzer', label: 'AI Readiness Analyzer', icon: Sparkles },
                { to: '/ai-tools/mock-interview', label: 'AI Mock Interview', icon: Sparkles },
              ].map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Icon size={18} className="text-brand-600" /> {label}
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Internship & Recruiter Requests" action={<Handshake size={18} className="text-slate-400" />}>
            <div className="space-y-2 text-sm">
              <div className="rounded-xl bg-slate-50 px-3 py-2.5">Infotech Solutions \u2014 40 openings</div>
              <div className="rounded-xl bg-slate-50 px-3 py-2.5">NextGen Systems \u2014 15 openings</div>
              <div className="rounded-xl bg-slate-50 px-3 py-2.5">CloudWorks Pvt Ltd \u2014 22 openings</div>
            </div>
          </Panel>

          <Panel title="Company Visit Schedule">
            <div className="space-y-2 text-sm text-slate-600">
              <p>\u2022 Infotech Solutions \u2014 12 Aug</p>
              <p>\u2022 NextGen Systems \u2014 20 Aug</p>
              <p>\u2022 CloudWorks Pvt Ltd \u2014 2 Sep</p>
            </div>
          </Panel>

          <Panel title="Student Reports" action={<FileBarChart size={18} className="text-slate-400" />}>
            <p className="text-sm text-slate-600">
              Generate department-wise and batch-wise placement reports for management review.
            </p>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
