import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, ExternalLink, Globe, Route } from 'lucide-react';
import { entranceExams } from '../data/courses';

const commonApplyProcess = [
  'Open the official exam website only. Do not apply from unknown links.',
  'Read the latest notification, eligibility, age limit, documents and fee details.',
  'Complete registration with correct mobile number and email ID.',
  'Fill personal, academic and category details carefully.',
  'Upload photo, signature and documents in the required size and format.',
  'Pay the fee if applicable, submit the form and download the application PDF.',
  'Track admit card, exam date, answer key and result from the same official portal.',
];

function officialUrl(site: string) {
  if (site.startsWith('http')) return site;
  return `https://${site}`;
}

export default function EntranceExamDetail() {
  const { examId } = useParams();
  const exam = entranceExams.find((item) => item.id === examId) ?? entranceExams[0];
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/courses-exams?tab=exams" className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300"><ArrowLeft size={15} /> Back to Entrance Exams</Link>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <main className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
            <span className="text-4xl" aria-hidden="true">{exam.emoji}</span>
            <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{exam.name}</h1>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-600">{exam.fullForm}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{exam.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Info title="Field" value={exam.field} />
              <Info title="Eligibility" value={exam.eligibility} />
              <Info title="Frequency" value={exam.frequency} />
              <Info title="Important dates" value={exam.importantDates} />
            </div>
            <section className="mt-8">
              <h2 className="font-display text-xl font-bold text-slate-900">Preparation process</h2>
              <ul className="mt-3 space-y-2">
                {exam.tips.map((tip) => <li key={tip} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" /> {tip}</li>)}
              </ul>
            </section>
            <section className="mt-8">
              <h2 className="font-display text-xl font-bold text-slate-900">How to apply</h2>
              <ol className="mt-3 space-y-2">
                {commonApplyProcess.map((step, i) => <li key={step} className="flex gap-3 rounded-xl bg-brand-50 p-3 text-sm text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>{step}</li>)}
              </ol>
            </section>
          </main>
          <aside className="h-fit rounded-3xl border border-brand-100 bg-brand-50 p-6 shadow-card sm:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900">Navigate official process</h2>
            <p className="mt-2 text-sm text-slate-600">Use these actions to move from information to official application safely.</p>
            <div className="mt-5 space-y-3">
              <a href={officialUrl(exam.officialWebsite)} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm hover:text-brand-700"><span className="inline-flex items-center gap-2"><Globe size={15} /> Official Website</span><ExternalLink size={14} /></a>
              <Link to="/ai-tools/government-exam-advisor" className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm hover:text-brand-700"><span className="inline-flex items-center gap-2"><Route size={15} /> Generate Study Plan</span></Link>
              <Link to="/daily-updates" className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm hover:text-brand-700"><span className="inline-flex items-center gap-2"><Calendar size={15} /> Check Updates</span></Link>
            </div>
            <div className="mt-6 rounded-2xl bg-white p-4 text-xs leading-relaxed text-slate-600 shadow-sm">
              Always verify dates, syllabus and application fee from official notification before applying.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p><p className="mt-1 text-sm font-semibold text-slate-800">{value}</p></div>;
}
