import { useMemo, useState, type FormEvent } from 'react';
import { ArrowLeft, Briefcase, CheckCircle2, ClipboardCheck, Download, FileUp, Loader2, Sparkles, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { AIOutput } from '../../components/AIOutput';
import { api } from '../../services/api';

const initial = { name: '', email: '', phone: '', role: '', education: '', skills: '', projects: '', experience: '', summary: '', job: '' };
const sections = ['Contact details', 'Professional summary', 'Education', 'Skills', 'Projects', 'Experience'];
const builderFields = ['name', 'email', 'phone', 'role', 'education', 'skills', 'projects', 'experience', 'summary'] as const;
const roleTemplates = [
  { name: 'Software Developer', style: 'Technical Project', skills: 'JavaScript, React, Java, SQL, Git', summary: 'Fresher software developer with hands-on experience building responsive applications and solving practical problems.', focus: 'Projects, technical skills and GitHub work' },
  { name: 'Data Analyst', style: 'Analytics', skills: 'Excel, SQL, Python, Power BI, Data Visualization', summary: 'Detail-oriented data analyst skilled in transforming raw data into clear dashboards and actionable insights.', focus: 'Tools, dashboards and measurable insights' },
  { name: 'UI/UX Designer', style: 'Creative Portfolio', skills: 'Figma, User Research, Wireframing, Prototyping, Design Systems', summary: 'User-focused UI/UX designer who creates accessible digital experiences through research, prototyping and iteration.', focus: 'Portfolio links, case studies and design process' },
  { name: 'Digital Marketing', style: 'Campaign Results', skills: 'SEO, Social Media, Google Analytics, Content Strategy, Ads', summary: 'Creative digital marketing fresher focused on content, campaign analysis and audience growth across digital channels.', focus: 'Campaign metrics, content and certifications' },
  { name: 'Finance & Accounting', style: 'Professional Finance', skills: 'Excel, Tally, Financial Analysis, GST, Accounting', summary: 'Organized finance graduate with a sound foundation in accounting, reporting and spreadsheet-based analysis.', focus: 'Education, certifications and accuracy' },
  { name: 'HR & Recruitment', style: 'People Operations', skills: 'Recruitment, Communication, HR Operations, Excel, Onboarding', summary: 'People-focused HR fresher with strong communication, coordination and candidate-management abilities.', focus: 'Communication, internships and coordination' },
  { name: 'Core Engineering', style: 'Engineering Project', skills: 'AutoCAD, MATLAB, Quality Control, Technical Documentation, Safety', summary: 'Practical engineering graduate with project experience, sound fundamentals and a disciplined approach to quality and safety.', focus: 'Technical projects, tools and industrial training' },
] as const;

type ResumeMode = 'analysis' | 'builder';

export default function AIResumeBuilder() {
  const [mode, setMode] = useState<ResumeMode>('analysis');
  const [form, setForm] = useState(initial);
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [fallback, setFallback] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof roleTemplates)[number]>(roleTemplates[0]);

  const resumeSource = resumeText || Object.entries(form).filter(([key]) => key !== 'job').map(([key, value]) => `${key}: ${value}`).join('\n');
  const keywords = useMemo(() => Array.from(new Set(form.job.toLowerCase().match(/[a-z+#.]{3,}/g) || [])).filter(k => !resumeSource.toLowerCase().includes(k)).slice(0, 10), [form.job, resumeSource]);
  const sectionHits = sections.filter(section => resumeSource.toLowerCase().includes(section.split(' ')[0].toLowerCase())).length;
  const score = Math.max(25, Math.min(100, 42 + sectionHits * 6 + (/@/.test(resumeSource) ? 5 : 0) + (/project|experience|internship/i.test(resumeSource) ? 8 : 0) - Math.min(20, keywords.length * 2)));

  const updateField = (key: string, value: string) => setForm(current => ({ ...current, [key]: value }));

  const chooseMode = (nextMode: ResumeMode) => {
    setMode(nextMode);
    setUploadError('');
    setAnalysis('');
  };

  const chooseTemplate = (template: typeof roleTemplates[number]) => {
    setSelectedTemplate(template);
    setForm(current => ({ ...current, role: template.name, skills: template.skills, summary: template.summary }));
  };

  const readPdfResume = async (selectedFile?: File) => {
    setUploadError('');
    setUploadMessage('');
    setResumeText('');
    setAnalysis('');
    if (!selectedFile) { setFile(''); return; }
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Please upload a valid PDF resume.');
      setFile('');
      return;
    }
    setFile(selectedFile.name);
    setExtracting(true);
    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
      const document = await pdfjs.getDocument({ data: await selectedFile.arrayBuffer() }).promise;
      const pages: string[] = [];
      for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
        const page = await document.getPage(pageNumber);
        const content = await page.getTextContent();
        pages.push(content.items.map(item => ('str' in item ? item.str : '')).join(' '));
      }
      const extracted = pages.join('\n').replace(/\s+/g, ' ').trim();
      if (extracted.length < 40) throw new Error('No readable text was found. Please upload a text-based PDF or enter the details manually.');
      setResumeText(extracted);
      setUploadMessage(`${document.numPages} page PDF read successfully. ${extracted.split(/\s+/).length} words are ready for analysis.`);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Unable to read this PDF resume.');
    } finally {
      setExtracting(false);
    }
  };

  const analyze = async (event: FormEvent) => {
    event.preventDefault();
    if (extracting) return;
    if (!resumeText) {
      setUploadError('Please upload your existing PDF resume before analysis.');
      return;
    }
    if (!form.job.trim()) {
      setUploadError('Please enter the target job description before analysis.');
      return;
    }
    setLoading(true);
    setFallback(false);
    setAnalysis('');
    setUploadError('');
    const prompt = `Analyze the actual resume content below against the target job description. Do not invent experience or qualifications. Return plain text only with short headings and concise points. Do not use asterisks, Markdown symbols, tables or code fences. Include: ATS score out of 100, section scores, matched keywords, missing keywords, strengths, weaknesses, grammar suggestions and the three most useful improvements.\n\nTARGET JOB DESCRIPTION:\n${form.job}\n\nRESUME CONTENT (${resumeText ? 'EXTRACTED FROM UPLOADED PDF' : 'ENTERED IN FORM'}):\n${resumeSource.slice(0, 24000)}`;
    try {
      setAnalysis((await api.askGemini(prompt, 'AI Resume Analyzer')).answer);
    } catch {
      setFallback(true);
      setAnalysis(`ATS score: ${score}/100\n\nResume analyzed: ${file || 'Manually entered resume'}\n\nSection scores\n${sections.map(section => `- ${section}: ${resumeSource.toLowerCase().includes(section.split(' ')[0].toLowerCase()) ? Math.min(95, score + 5) : Math.max(35, score - 18)}/100`).join('\n')}\n\nMissing keywords: ${keywords.join(', ') || 'No major keyword gaps detected'}\n\nStrengths\nThe resume has readable content and an ATS-friendly text structure.\n\nImprovements\nAdd measurable results, role-specific keywords and portfolio links based only on your real experience.`);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (key: string) => {
    const isLong = ['projects', 'summary', 'job'].includes(key);
    const label = key === 'job' ? 'Target job description' : key === 'role' ? 'Target role' : key;
    return (
      <label key={key} className={isLong ? 'sm:col-span-2' : ''}>
        <span className="mb-1 block text-sm font-semibold capitalize text-slate-700">{label}</span>
        {isLong ? (
          <textarea required={key === 'job'} rows={key === 'job' ? 4 : 3} value={form[key as keyof typeof form]} onChange={event => updateField(key, event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        ) : (
          <input value={form[key as keyof typeof form]} onChange={event => updateField(key, event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        )}
      </label>
    );
  };

  return (
    <div className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 print:hidden"><ArrowLeft size={15} /> Back to AI Tools</Link>

        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 p-8 text-white shadow-brand print:hidden">
          <h1 className="font-display text-3xl font-bold">Resume Centre</h1>
          <p className="mt-2 max-w-2xl text-white/85">Choose one option: check an existing resume or create a new one.</p>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 print:hidden" aria-label="Resume options">
          <button type="button" onClick={() => chooseMode('analysis')} className={`rounded-3xl border p-6 text-left transition ${mode === 'analysis' ? 'border-brand-500 bg-brand-50 shadow-brand' : 'border-slate-200 bg-white hover:border-brand-300'}`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white"><ClipboardCheck size={21} /></span>
            <div className="mt-4 flex items-center justify-between gap-3"><h2 className="font-display text-xl font-bold text-slate-900">Resume Analysis</h2>{mode === 'analysis' && <CheckCircle2 size={19} className="text-brand-600" />}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Upload your existing resume and get an ATS score, missing keywords and clear improvement tips.</p>
          </button>
          <button type="button" onClick={() => chooseMode('builder')} className={`rounded-3xl border p-6 text-left transition ${mode === 'builder' ? 'border-brand-500 bg-brand-50 shadow-brand' : 'border-slate-200 bg-white hover:border-brand-300'}`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white"><Wrench size={21} /></span>
            <div className="mt-4 flex items-center justify-between gap-3"><h2 className="font-display text-xl font-bold text-slate-900">Resume Builder</h2>{mode === 'builder' && <CheckCircle2 size={19} className="text-brand-600" />}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Start from a role template, add your details and download a clean one-page resume.</p>
          </button>
        </section>

        {mode === 'analysis' ? (
          <section className="mt-8 rounded-3xl border border-slate-200 p-6 shadow-card print:hidden">
            <div className="flex items-center gap-2"><ClipboardCheck size={20} className="text-brand-600" /><h2 className="font-display text-xl font-bold text-slate-900">Check your existing resume</h2></div>
            <p className="mt-1 text-sm text-slate-500">Upload your resume and enter the target job description. No other details are needed.</p>
            <form onSubmit={analyze} className="mt-6">
              <div className="grid gap-4">{renderField('job')}</div>
              <label className={`mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed p-4 text-sm font-semibold ${resumeText ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-brand-300 bg-brand-50 text-brand-700'}`}><FileUp size={20} />{extracting ? 'Reading text from PDF...' : file || 'Upload existing PDF resume'}<input className="hidden" type="file" accept="application/pdf,.pdf" disabled={extracting} onChange={event => void readPdfResume(event.target.files?.[0])} /></label>
              {uploadMessage && <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"><CheckCircle2 size={15} className="mr-1 inline" />{uploadMessage}</p>}
              {uploadError && <p className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{uploadError}</p>}
              {resumeText && <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><summary className="cursor-pointer text-sm font-semibold text-slate-700">Preview extracted resume text</summary><p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap text-xs leading-5 text-slate-600">{resumeText}</p></details>}
              <button type="submit" disabled={loading || extracting} className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{loading || extracting ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} {extracting ? 'Reading PDF...' : loading ? 'Analyzing resume...' : 'Analyze resume'}</button>
            </form>
            {analysis && <div className="mt-6">{fallback && <p className="mb-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">Demo analysis used because Gemini is unavailable.</p>}<AIOutput title="Resume Analysis Result" text={analysis} /></div>}
          </section>
        ) : (
          <>
            <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-card print:hidden">
              <div className="flex items-center gap-2"><Briefcase size={20} className="text-brand-600" /><h2 className="font-display text-xl font-bold text-slate-900">1. Choose a role template</h2></div>
              <p className="mt-1 text-sm text-slate-500">The template fills a starting summary and skills list. Replace them with your real details.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{roleTemplates.map(template => <button type="button" key={template.name} onClick={() => chooseTemplate(template)} className={`rounded-2xl border p-4 text-left transition ${selectedTemplate.name === template.name ? 'border-brand-500 bg-white shadow-brand' : 'border-slate-200 bg-white hover:border-brand-300'}`}><div className="flex items-start justify-between gap-2"><div><h3 className="font-bold text-slate-900">{template.name}</h3><p className="mt-1 text-xs font-semibold text-brand-600">{template.style} template</p></div>{selectedTemplate.name === template.name && <CheckCircle2 size={18} className="text-brand-600" />}</div><p className="mt-2 text-xs leading-5 text-slate-500">Best focus: {template.focus}</p></button>)}</div>
            </section>

            <div className="mt-8 grid gap-8 lg:grid-cols-2 print:block">
              <section className="rounded-3xl border border-slate-200 p-6 shadow-card print:hidden"><h2 className="font-display text-xl font-bold text-slate-900">2. Add your details</h2><p className="mt-1 text-sm text-slate-500">Use real information only. You can edit the preview on this page by changing these fields.</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{builderFields.map(renderField)}</div></section>
              <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card print:border-0 print:shadow-none"><div className="mb-5 flex justify-between print:hidden"><div><h2 className="font-display text-xl font-bold">3. Resume preview</h2><p className="text-xs font-semibold text-brand-600">{selectedTemplate.style} · {selectedTemplate.name}</p></div><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"><Download size={14} /> Download PDF</button></div><div className="border-t-4 border-brand-600 pt-5"><h1 className="text-3xl font-bold text-slate-900">{form.name || 'Your Name'}</h1><p className="text-sm text-slate-500">{form.email || 'email@example.com'} {form.phone && `· ${form.phone}`}</p><h3 className="mt-5 font-bold uppercase tracking-wide text-brand-700">Professional Summary</h3><p className="mt-1 text-sm leading-6 text-slate-700">{form.summary || selectedTemplate.summary}</p>{[['Education', form.education], ['Skills', form.skills], ['Projects', form.projects], ['Experience', form.experience]].map(([heading, text]) => <div key={heading}><h3 className="mt-5 border-b font-bold uppercase tracking-wide text-brand-700">{heading}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{text || `Add ${heading.toLowerCase()} details`}</p></div>)}</div></section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
