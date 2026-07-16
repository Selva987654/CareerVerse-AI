import {
  Users, GraduationCap, Building2, Briefcase, UserCheck, BookOpen,
  Compass, Newspaper, BarChart3, Settings, Sparkles, Download, Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Panel, StatCard } from '../../components/dashboard/DashboardWidgets';
import { careers } from '../../data/careers';
import { courses } from '../../data/courses';
import { SavedItemsPanel } from '../../components/dashboard/SavedItemsPanel';

const stats = [
  { icon: GraduationCap, label: 'Total Students', value: '12,480' },
  { icon: Users, label: 'Total Parents', value: '6,210' },
  { icon: Building2, label: 'Total Colleges', value: '84' },
  { icon: Briefcase, label: 'Total Companies', value: '312' },
  { icon: UserCheck, label: 'Total Recruiters', value: '540' },
  { icon: Compass, label: 'Total Mentors', value: '96' },
  { icon: BookOpen, label: 'Total Courses', value: courses.length },
  { icon: Compass, label: 'Total Careers', value: careers.length },
] as const;

const managementLinks = [
  'Users', 'Students', 'Parents', 'Colleges', 'Companies', 'Recruiters', 'Mentors',
  'Placement Trainers', 'Courses', 'Careers', 'Exams', 'Cutoff Sample Data',
  'Counselling Updates', 'Scholarships', 'Internships', 'Jobs', 'Daily Education Updates',
  'Hiring News', 'Placement Questions', 'Reports', 'Website Content',
];

const initialApprovals = [
  { name: 'Zenith Robotics Pvt Ltd', type: 'Company' },
  { name: 'Vellore Arts & Science College', type: 'College' },
  { name: 'Ananya Patel', type: 'Recruiter' },
];

export default function AdminDashboard() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [message, setMessage] = useState('');
  const [expired,setExpired]=useState(['Legacy QA Intern — expired 30 Jun','Campus Ambassador — expired 5 Jul']);
  const exportCsv=()=>{const rows=[['Metric','Value'],...stats.map(s=>[s.label,String(s.value)])];const blob=new Blob([rows.map(r=>r.join(',')).join('\n')],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='careerverse-admin-report.csv';a.click();URL.revokeObjectURL(url)};

  const decideApproval = (name: string, action: 'approved' | 'rejected') => {
    setApprovals((current) => current.filter((item) => item.name !== name));
    setMessage(`${name} ${action}.`);
  };

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Platform-wide analytics and management">
      <div className="mb-6"><SavedItemsPanel /></div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">Demo Analytics</span><button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><Download size={15}/> Export data as CSV</button></div>
      {message && <p className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Platform Analytics" action={<BarChart3 size={18} className="text-slate-400" />}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="font-display text-2xl font-bold text-slate-900">2,140</p>
                <p className="text-xs text-slate-500">Jobs & Internships Live</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="font-display text-2xl font-bold text-slate-900">318</p>
                <p className="text-xs text-slate-500">Daily Updates Posted</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="font-display text-2xl font-bold text-slate-900">68%</p>
                <p className="text-xs text-slate-500">Avg. Placement Readiness</p>
              </div>
            </div>
          </Panel>

          <Panel title="Pending Approvals">
            <div className="space-y-2">
              {approvals.length === 0 && <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">No pending approvals.</p>}
              {approvals.map((a) => (
                <div key={a.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.type} approval pending</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => decideApproval(a.name, 'approved')} className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Approve</button>
                    <button onClick={() => decideApproval(a.name, 'rejected')} className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Expired Opportunities">
            <div className="space-y-2">{expired.length===0?<p className="text-sm text-slate-500">No expired opportunities.</p>:expired.map(x=><div key={x} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"><span>{x}</span><button onClick={()=>setExpired(e=>e.filter(v=>v!==x))} className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600"><Trash2 size={14}/> Remove</button></div>)}</div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Admin Quick Actions">
            <div className="space-y-2">
              {[
                { to: '/ai-tools', label: 'Review AI Tools', icon: Sparkles },
                { to: '/jobs', label: 'Review Jobs & Internships', icon: Briefcase },
                { to: '/colleges-counselling', label: 'Review Colleges & Counselling', icon: Building2 },
                { to: '/government-exams', label: 'Review Government Exams', icon: Newspaper },
              ].map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Icon size={18} className="text-brand-600" /> {label}
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Manage Platform Content" action={<Settings size={18} className="text-slate-400" />}>
            <div className="flex flex-wrap gap-2">
              {managementLinks.map((l) => (
                <button
                  key={l}
                  onClick={() => setMessage(`${l} management view selected. Demo data is active until the backend returns records.`)}
                  className="cursor-pointer rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  {l}
                </button>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
              <Newspaper size={14} /> Sample admin console - connect a backend to make these fully manageable.
            </p>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
