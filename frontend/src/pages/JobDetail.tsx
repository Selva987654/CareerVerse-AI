import { type FormEvent, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, CheckCircle2, Copy, ExternalLink, Mail, MapPin } from 'lucide-react';
import { buildApplicationEmail, getOpportunityById } from '../data/opportunities';
import { AIOutput } from '../components/AIOutput';
import { useApp } from '../context/AppContext';

export default function JobDetail() {
  const { jobId } = useParams();
  const job = getOpportunityById(jobId);
  const { applyTo, hasApplied } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const emailBody = useMemo(() => job ? buildApplicationEmail(job, form) : '', [job, form]);
  const mailto = job ? `mailto:${job.applyEmail}?cc=${job.enquiryEmail}&subject=${encodeURIComponent(`Job Application for ${job.title}`)}&body=${encodeURIComponent(emailBody)}` : '#';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!job) return;
    applyTo(job.id, 'job');
    setSubmitted(true);
  };

  if (!job || job.type !== 'Full-time') {
    return <div className="mx-auto max-w-4xl px-4 py-16"><div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card"><h1 className="font-display text-2xl font-bold">Job not found</h1><Link className="mt-4 inline-flex text-brand-600" to="/jobs">Back to jobs</Link></div></div>;
  }

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/jobs" className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300"><ArrowLeft size={15} /> Back to Jobs & Internships</Link>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <main className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700"><Briefcase size={14} /> Full-time Job</span>
            <h1 className="mt-4 font-display text-3xl font-bold text-slate-900">{job.title}</h1>
            <p className="mt-2 text-lg font-semibold text-brand-700">{job.company}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600"><span className="inline-flex items-center gap-1.5"><MapPin size={15} /> {job.location}</span><span>{job.workMode}</span><span>{job.stipendOrSalary}</span><span>{job.duration}</span></div>
            <Detail title="Eligibility" items={[job.eligibility]} />
            <Detail title="Skills Required" items={job.skills} pills />
            <Detail title="Responsibilities" items={job.responsibilities} />
            <Detail title="Documents Needed" items={job.documents} />
            <Detail title="Selection Process" items={job.selectionProcess} ordered />
          </main>
          <aside className="h-fit rounded-3xl border border-brand-100 bg-brand-50 p-6 shadow-card sm:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900">Apply by Email</h2>
            <p className="mt-2 text-sm text-slate-600">Fill details and open Gmail/Mail to send the prepared application email.</p>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Email</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Phone</span><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Message</span><textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={job.applyNote} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" /></label>
              <button type="submit" className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">Submit to Website</button>
            </form>
            {(submitted || hasApplied(job.id)) && <p className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"><CheckCircle2 size={16} /> Saved in application tracker.</p>}
            <div className="mt-5">
              <AIOutput title="Prepared Email Preview" text={emailBody} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => void navigator.clipboard.writeText(emailBody)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm"><Copy size={14} /> Copy Email</button>
              <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><Mail size={14} /> Open Gmail/Mail</a>
              <a href={job.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800"><ExternalLink size={14} /> Company Site</a>
              <Link to="/ai-tools/internship-email" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Improve with AI</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Detail({ title, items, pills = false, ordered = false }: { title: string; items: string[]; pills?: boolean; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>
      {pills ? <div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{item}</span>)}</div> : <Tag className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">{items.map((item) => <li key={item} className="rounded-xl bg-slate-50 p-3">{item}</li>)}</Tag>}
    </section>
  );
}
