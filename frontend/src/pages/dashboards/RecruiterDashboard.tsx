/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Briefcase, Users, CheckCircle2, Filter, Building2, Plus, X, MailCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Panel, StatCard } from '../../components/dashboard/DashboardWidgets';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { RealAccountProfile } from '../../components/dashboard/RealAccountProfile';
import { SavedItemsPanel } from '../../components/dashboard/SavedItemsPanel';

const candidates = [
  { name: 'Aarav Kumar', course: 'B.Tech CSE', location: 'Chennai', readiness: 82, status: 'Shortlisted' },
  { name: 'Fathima S.', course: 'B.Tech CSE', location: 'Bengaluru', readiness: 91, status: 'Interview Scheduled' },
  { name: 'Rahul Verma', course: 'BCA', location: 'Pune', readiness: 74, status: 'Applied' },
];

const initialJob = {
  title: '',
  companyName: '',
  location: '',
  workMode: 'Hybrid',
  salary: '',
  experience: 'Fresher',
  applyEmail: '',
  enquiryEmail: '',
  companyWebsite: '',
  eligibility: '',
  skillsRequired: '',
  responsibilities: '',
  selectionProcess: 'Resume shortlist -> Interview -> Selection',
};

type JobForm = typeof initialJob;

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [form, setForm] = useState<JobForm>({
    ...initialJob,
    companyName: user?.meta?.company ?? 'Demo Recruiter Company',
    applyEmail: user?.email ?? '',
    enquiryEmail: user?.email ?? '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [applicants,setApplicants]=useState(candidates);

  useEffect(() => {
    api.recruiterJobs()
      .then(setJobs)
      .catch(() => setJobs([]));
  }, []);

  const totalApplicants = useMemo(() => jobs.length * 18 + 247, [jobs.length]);

  const update = (field: keyof JobForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitJob = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!form.title.trim() || !form.companyName.trim() || !form.applyEmail.trim()) {
      setError('Job title, company name and apply email are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await api.createRecruiterJob(form);
      setJobs((current) => [res.job, ...current]);
      setMessage('Job post published successfully. It is now available in public jobs.');
      setShowForm(false);
      setForm({
        ...initialJob,
        companyName: form.companyName,
        applyEmail: form.applyEmail,
        enquiryEmail: form.enquiryEmail || form.applyEmail,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to publish job post.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Recruiter Dashboard" subtitle={user?.meta?.company ?? 'Company Profile'}>
      {user && <div className="mb-6"><RealAccountProfile role="recruiter" /></div>}
      <div className="mb-6"><SavedItemsPanel /></div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Building2 size={16} /> {user?.meta?.company ?? form.companyName}
        </div>
        <button
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? 'Close Form' : 'Post a Job / Internship'}
        </button>
      </div>

      {message && <p className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}
      {error && <p className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}

      {showForm && (
        <Panel title="Create Job / Internship Post">
          <form onSubmit={submitJob} className="grid gap-4 lg:grid-cols-2">
            <Field label="Job Title" value={form.title} onChange={(v) => update('title', v)} placeholder="Frontend Developer Intern" required />
            <Field label="Company Name" value={form.companyName} onChange={(v) => update('companyName', v)} placeholder="Your company name" required />
            <Field label="Location" value={form.location} onChange={(v) => update('location', v)} placeholder="Coimbatore / Remote" />
            <Field label="Work Mode" value={form.workMode} onChange={(v) => update('workMode', v)} placeholder="Remote / Hybrid / On-site" />
            <Field label="Salary / Stipend" value={form.salary} onChange={(v) => update('salary', v)} placeholder="Rs. 10,000/month or 3-5 LPA" />
            <Field label="Experience" value={form.experience} onChange={(v) => update('experience', v)} placeholder="Fresher / 0-1 year" />
            <Field label="Apply Email" type="email" value={form.applyEmail} onChange={(v) => update('applyEmail', v)} placeholder="hr@company.com" required />
            <Field label="Enquiry Email" type="email" value={form.enquiryEmail} onChange={(v) => update('enquiryEmail', v)} placeholder="info@company.com" />
            <Field label="Company Website" value={form.companyWebsite} onChange={(v) => update('companyWebsite', v)} placeholder="https://company.com" />
            <Field label="Skills Required" value={form.skillsRequired} onChange={(v) => update('skillsRequired', v)} placeholder="React, Java, SQL" />
            <TextArea label="Eligibility" value={form.eligibility} onChange={(v) => update('eligibility', v)} placeholder="BCA / B.Sc / BE students with project portfolio" />
            <TextArea label="Responsibilities" value={form.responsibilities} onChange={(v) => update('responsibilities', v)} placeholder="Build UI pages, fix bugs, coordinate with team" />
            <TextArea label="Selection Process" value={form.selectionProcess} onChange={(v) => update('selectionProcess', v)} placeholder="Resume -> Task -> Interview" />
            <div className="flex items-end">
              <button disabled={saving} className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
                {saving ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </Panel>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Active Posts" value={jobs.length || 3} />
        <StatCard icon={Users} label="Total Applicants" value={String(totalApplicants)} accent="indigo" />
        <StatCard icon={CheckCircle2} label="Shortlisted" value="34" accent="amber" />
        <StatCard icon={Filter} label="Avg. Readiness Match" value="79%" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Candidate Pipeline">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-2">Candidate</th>
                    <th className="pb-2">Course</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Readiness</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applicants.map((c) => (
                    <tr key={c.name}>
                      <td className="py-2.5 font-medium text-slate-800">{c.name}</td>
                      <td className="py-2.5 text-slate-500">{c.course}</td>
                      <td className="py-2.5 text-slate-500">{c.location}</td>
                      <td className="py-2.5 font-semibold text-brand-600">{c.readiness}%</td>
                      <td className="py-2.5">
                        <select value={c.status} onChange={e=>setApplicants(all=>all.map(x=>x.name===c.name?{...x,status:e.target.value}:x))} className="rounded-full border-0 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          {['Applied','Under Review','Shortlisted','Interview Scheduled','Selected','Rejected'].map(s=><option key={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Your Job & Internship Posts">
            <div className="space-y-3">
              {(jobs.length ? jobs : [
                { title: 'Frontend Developer Intern', workMode: 'Internship', id: 'sample-1', companyName: form.companyName },
                { title: 'Software Engineer - Fresher', workMode: 'Full-time', id: 'sample-2', companyName: form.companyName },
                { title: 'Data Analyst', workMode: 'Full-time', id: 'sample-3', companyName: form.companyName },
              ]).map((j: any) => (
                <div key={j.id ?? j.title} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{j.title}</p>
                    <p className="text-xs text-slate-500">{j.companyName} - {j.workMode || 'Job'}</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-600">{j.id ? 'Published' : 'Sample'}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Recruiter Quick Actions">
            <div className="space-y-2">
              {[
                { to: '/jobs', label: 'View Live Jobs Page', icon: Briefcase },
                { to: '/ai-tools/internship-email', label: 'AI Outreach Email Helper', icon: MailCheck },
                { to: '/ai-tools/readiness-analyzer', label: 'Candidate Readiness Tool', icon: Sparkles },
              ].map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Icon size={18} className="text-brand-600" /> {label}
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Filter Candidates">
            <div className="space-y-3 text-sm">
              {['Skills', 'Course', 'Location', 'Graduation Year', 'Placement Readiness Score'].map((f) => (
                <label key={f} className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  {f}
                </label>
              ))}
            </div>
          </Panel>

          <Panel title="College Placement Officer Contacts">
            <div className="space-y-2 text-sm text-slate-600">
              <p>SRM Institute of Technology</p>
              <p>Anna University - Placement Cell</p>
              <p>VIT Chennai</p>
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}{required && <span className="text-rose-500"> *</span>}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block lg:col-span-2">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
    </label>
  );
}
