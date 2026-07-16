import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink, FileText, Route } from 'lucide-react';
import { governmentExams } from '../../data/governmentExams';

function DetailBlock({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>
      <Tag className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            {ordered ? <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{index + 1}</span> : <CheckCircle2 size={17} className="mt-1 shrink-0 text-brand-600" />}
            {item}
          </li>
        ))}
      </Tag>
    </section>
  );
}

export default function GovernmentExamDetail() {
  const { examId } = useParams();
  const exam = governmentExams.find((item) => item.id === examId) ?? governmentExams[0];
  return (
    <div className="bg-gradient-to-b from-brand-50/60 via-white to-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/government-exams" className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300"><ArrowLeft size={16} /> Back to government exams</Link>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-card">{exam.category}</span>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{exam.name}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{exam.bestFor}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={exam.officialLinks.apply} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">Official apply link <ExternalLink size={16} /></a>
              <a href={exam.officialLinks.notification} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300">Notification / syllabus <FileText size={16} /></a>
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="font-display text-xl font-bold text-slate-900">Important facts</h2>
            <div className="mt-5 space-y-4 text-sm">
              <Info title="Conducting body" value={exam.conductingBody} />
              <Info title="Qualification" value={exam.qualification} />
              <Info title="Age limit" value={exam.ageLimit} />
              <Info title="Preparation time" value={exam.preparationTime} />
              <Info title="Difficulty" value={exam.difficulty} />
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <DetailBlock title="Selection process" items={exam.selectionProcess} />
        <DetailBlock title="Exam pattern" items={exam.examPattern} />
        <DetailBlock title="Syllabus focus" items={exam.syllabus} />
        <DetailBlock title="How to apply" items={exam.howToApply} ordered />
        <DetailBlock title="Preparation roadmap" items={exam.preparationRoadmap} ordered />
        <DetailBlock title="Documents required" items={exam.documents} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-card">
            <Route size={28} className="text-brand-300" />
            <h2 className="mt-4 font-display text-2xl font-bold">Need personal plan?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Open AI Exam Advisor and generate a custom 30/60/90 day plan using your study hours and weak subjects.</p>
            <Link to="/ai-tools/government-exam-advisor" className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">Open AI advisor</Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl font-bold text-slate-900">Official links only</h2>
            <p className="mt-2 text-sm text-slate-600">Avoid fake notifications. Apply, admit card and result should be checked only from official portals.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {Object.entries(exam.officialLinks).map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-700"><span className="capitalize">{label}</span><ExternalLink size={15} /></a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return <div><p className="font-semibold text-slate-900">{title}</p><p className="text-slate-600">{value}</p></div>;
}
