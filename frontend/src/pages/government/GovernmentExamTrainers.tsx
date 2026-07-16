import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Users, Video } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { governmentTrainers } from '../../data/governmentExams';

export default function GovernmentExamTrainers() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Trainer support"
        title="Government exam trainers and placement mentors"
        lead="A separate trainer page with profile cards, subjects, mode, location, demo videos, course cards and guidance booking flow."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {governmentTrainers.map((trainer) => (
          <Link key={trainer.id} to={`/government-exam-trainers/${trainer.id}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-500 text-xl font-bold text-white shadow-brand">
                {trainer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">{trainer.name}</h2>
                <p className="mt-1 text-sm font-medium text-brand-700">{trainer.category}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{trainer.about}</p>
            <div className="mt-5 grid gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2"><Star size={16} className="text-amber-500" /> {trainer.rating} rating - {trainer.experience}</span>
              <span className="inline-flex items-center gap-2"><Users size={16} className="text-brand-600" /> {trainer.studentsTrained} students trained</span>
              <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-brand-600" /> {trainer.location} - {trainer.mode}</span>
              <span className="inline-flex items-center gap-2"><Video size={16} className="text-brand-600" /> Demo video and guidance sessions</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {trainer.subjects.slice(0, 3).map((subject) => (
                <span key={subject} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{subject}</span>
              ))}
            </div>
            <span className="mt-6 inline-flex items-center gap-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-brand group-hover:bg-brand-700">
              View trainer profile <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
