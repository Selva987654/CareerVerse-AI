import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, RotateCcw, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { AIOutput } from '../../components/AIOutput';

const fields = [
  ['education', 'Education level', '12th / Diploma / BCA / B.Tech'], ['stream', 'Stream or department', 'Science / CSE / Commerce'],
  ['marks', 'Marks or CGPA', '82% / 8.2'], ['interests', 'Interests', 'Technology, problem solving, design'],
  ['skills', 'Skills', 'Python, communication, SQL'], ['careerField', 'Preferred career field', 'Software / Finance / Healthcare'],
  ['environment', 'Preferred work environment', 'Remote / office / field / hybrid'], ['city', 'Preferred city', 'Chennai / Coimbatore / Remote'],
] as const;

const demo = [
  ['Software Developer', 92, 'Strong fit for technology, problem solving and continuous learning.', 'JavaScript, Java, Git, SQL', 'Full Stack Development; DSA Foundations', 'Product companies, IT services, startups', '₹3.5–12 LPA', 'Build two deployable projects and practise DSA daily.'],
  ['Data Analyst', 87, 'Combines analytical thinking with practical business insight.', 'Excel, SQL, Python, Power BI', 'Google Data Analytics; Power BI', 'Analytics, consulting, banking, retail', '₹4–10 LPA', 'Create a dashboard portfolio using a public dataset.'],
  ['UI/UX Designer', 81, 'Matches creative interests and user-focused problem solving.', 'Figma, research, prototyping, communication', 'Google UX Design; Figma Essentials', 'SaaS, agencies, product design', '₹3–9 LPA', 'Publish two end-to-end case studies.'],
  ['Cloud Support Engineer', 78, 'Suitable for technical learners who enjoy systems and troubleshooting.', 'Linux, networking, cloud, scripting', 'AWS Cloud Practitioner; Azure Fundamentals', 'Cloud operations, DevOps support, IT services', '₹4–11 LPA', 'Earn a foundation certification and complete cloud labs.'],
  ['Business Analyst', 74, 'Balances communication, structured thinking and technology awareness.', 'Requirements, Excel, SQL, presentation', 'Business Analysis Foundation; Agile Basics', 'Consulting, fintech, enterprise software', '₹4–10 LPA', 'Practise requirement documents and stakeholder case studies.'],
] as const;

function demoText() {
  return demo.map((r, i) => `${i + 1}. ${r[0]} | Match: ${r[1]}%\nReason: ${r[2]}\nRequired skills: ${r[3]}\nRecommended courses: ${r[4]}\nCareer opportunities: ${r[5]}\nSalary range: ${r[6]}\nSuggested next steps: ${r[7]}`).join('\n\n');
}

export default function AICareerQuiz() {
  const [profile, setProfile] = useState<Record<string, string>>({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  const generate = async (e?: FormEvent) => {
    e?.preventDefault(); setLoading(true); setNotice(''); setResult('');
    const prompt = `Recommend exactly five careers for this Indian student. For every career include career title, match percentage, reason, required skills, recommended courses, career opportunities, salary range and suggested next steps.\n${Object.entries(profile).map(([k,v]) => `${k}: ${v || 'Not specified'}`).join('\n')}`;
    try { const res = await api.askGemini(prompt, 'AI Career Recommendation'); setResult(res.answer); }
    catch { setResult(demoText()); setNotice('Gemini is currently unavailable. Showing reliable demo recommendations; you can retry.'); }
    finally { setLoading(false); }
  };

  return <div className="bg-white py-10 sm:py-14"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"><ArrowLeft size={15}/> Back to AI Tools</Link>
    <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 p-8 text-white shadow-brand sm:p-10"><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase"><Sparkles size={14}/> Gemini + demo fallback</span><h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">AI Career Recommendation</h1><p className="mt-3 text-white/85">Build your profile and receive five practical career matches with skills, courses, opportunities and next steps.</p></div>
    <form onSubmit={generate} className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><div className="grid gap-4 sm:grid-cols-2">{fields.map(([key,label,placeholder]) => <label key={key}><span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span><input required value={profile[key] || ''} onChange={e => setProfile(p => ({...p,[key]:e.target.value}))} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"/></label>)}</div><button disabled={loading} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{loading?<Loader2 className="animate-spin" size={16}/>:<Sparkles size={16}/>} Generate five matches</button></form>
    {notice && <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800"><span>{notice}</span><button onClick={()=>generate()} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5"><RotateCcw size={14}/> Retry</button></div>}
    {result && <div className="mt-6"><AIOutput title="Your career recommendations" text={result} /></div>}
  </div></div>;
}
