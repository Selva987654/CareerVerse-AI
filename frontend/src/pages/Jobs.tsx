/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { Briefcase, CheckCircle2, IndianRupee, MapPin, Bookmark, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useApp } from '../context/AppContext';
import { opportunities } from '../data/opportunities';
import { api } from '../services/api';
import { useEffect } from 'react';

const categories = ['All', 'Tech', 'Data', 'Design', 'Marketing'];
const types = ['All', 'Internship', 'Full-time'];

export default function Jobs() {
  const ref = useScrollReveal();
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [query, setQuery] = useState('');
  const { hasApplied, applyTo, applications, savedOpportunities, toggleSavedOpportunity, withdrawApplication } = useApp();
  const [live, setLive] = useState<any[]>([]);
  const [tab, setTab] = useState<'opportunities'|'applications'>('opportunities');
  useEffect(() => { Promise.all([api.publicJobs(), api.publicInternships()]).then(([jobs, internships]) => setLive([...jobs.map((j:any)=>({ ...j, id:`job-${j.id}`, _live:true, company:j.companyName, type:'Full-time', category:'Tech', skills:(j.skillsRequired||'').split(',').filter(Boolean), stipendOrSalary:j.salary, workMode:j.workMode })), ...internships.map((j:any)=>({ ...j, id:`internship-${j.id}`, _live:true, company:j.companyName||j.company, type:'Internship', category:j.category||'Tech', skills:(j.skillsRequired||j.skills||'').split?.(',').filter(Boolean)||[], stipendOrSalary:j.stipend||j.salary, workMode:j.workMode }))])).catch(()=>setLive([])); }, []);
  const allOpportunities = useMemo(() => live.length ? [...live, ...opportunities] : opportunities, [live]);

  const filtered = useMemo(() => allOpportunities.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesType = type === 'All' || item.type === type;
    const haystack = `${item.title} ${item.company} ${item.location} ${item.skills.join(' ')}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query.toLowerCase());
    return matchesCategory && matchesType && matchesQuery;
  }), [category, type, query, allOpportunities]);

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Internship & Job Hub"
          title="Click View Details to apply with full information."
          lead="Old UI is kept, but every job and internship now opens a full detail page with eligibility, skills, responsibilities, documents, selection process, apply email, enquiry email, website, submit form and Gmail/Mail button."
        />
        <div className="mb-6 flex gap-2"><button onClick={()=>setTab('opportunities')} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab==='opportunities'?'bg-brand-600 text-white':'bg-slate-100'}`}>Jobs & Internships</button><button onClick={()=>setTab('applications')} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab==='applications'?'bg-brand-600 text-white':'bg-slate-100'}`}>Application History ({applications.length})</button></div>

        {tab === 'applications' ? <div className="space-y-3">{applications.length===0?<p className="rounded-2xl bg-slate-50 p-6 text-slate-600">No applications yet.</p>:applications.map(a=>{const job=allOpportunities.find(x=>x.id===a.id);return <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 p-5 shadow-card"><div><h3 className="font-bold">{job?.title||a.id}</h3><p className="text-xs text-slate-500">Applied {new Date(a.appliedAt).toLocaleDateString()}</p></div><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{a.status}</span><button onClick={()=>withdrawApplication(a.id)} className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600"><XCircle size={14}/> Withdraw</button></div>})}</div> : <>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-card" data-reveal>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_2fr]">
            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium">
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search role, company, city, skill..." className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium" />
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500" data-reveal>Showing {filtered.length} opportunities</p>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((job, i) => {
            const applied = hasApplied(job.id);
            const detailPath = job.type === 'Internship' ? `/internships/${job.id}` : `/jobs/${job.id}`;
            return (
              <article key={job.id} data-reveal data-reveal-delay={i * 60} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Briefcase size={20} /></span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-bold text-slate-900">{job.title}</h3>
                        <p className="text-sm text-slate-500">{job.company}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${job.type === 'Internship' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{job.type}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location} · {job.workMode}</span>
                      <span className="flex items-center gap-1.5"><IndianRupee size={14} /> {job.stipendOrSalary}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.slice(0, 5).map((s: string) => <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{s}</span>)}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {job._live ? <button onClick={()=>applyTo(job.id, job.type==='Internship'?'internship':'job')} className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700">{applied?'Application tracked':'Apply & Track'}</button> : <Link to={detailPath} className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700">View Full Details / Apply Now</Link>}
                      <Link to="/ai-tools/internship-email" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-brand-300">Improve Email with AI</Link>
                      <button onClick={()=>toggleSavedOpportunity(job.id)} className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold"><Bookmark size={14} fill={savedOpportunities.includes(job.id)?'currentColor':'none'}/>{savedOpportunities.includes(job.id)?'Saved':'Save'}</button>
                      {applied && <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700"><CheckCircle2 size={14} /> Saved</span>}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        </>}
      </div>
    </div>
  );
}
