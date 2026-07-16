import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, CheckCircle2, MessageCircle, Star, Video } from 'lucide-react';
import { governmentTrainers, guidanceVideos } from '../../data/governmentExams';

export default function TrainerDetail() {
  const { trainerId } = useParams();
  const trainer = governmentTrainers.find((item) => item.id === trainerId) ?? governmentTrainers[0];
  const videos = guidanceVideos.filter((video) => video.trainerId === trainer.id);

  return (
    <div className="bg-gradient-to-b from-brand-50/60 via-white to-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/government-exam-trainers" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
          <ArrowLeft size={16} /> Back to trainers
        </Link>
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-600 p-8 text-white">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 text-3xl font-bold">
                {trainer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <h1 className="mt-5 font-display text-3xl font-bold">{trainer.name}</h1>
              <p className="mt-2 text-brand-50">{trainer.category}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><Star size={16} /> {trainer.rating} rating</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Trainer profile</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">{trainer.experience} guidance for serious aspirants</h2>
              <p className="mt-4 text-slate-600 leading-7">{trainer.about}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Mode</p><p className="font-semibold text-slate-900">{trainer.mode}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Location</p><p className="font-semibold text-slate-900">{trainer.location}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Language</p><p className="font-semibold text-slate-900">{trainer.language}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Students</p><p className="font-semibold text-slate-900">{trainer.studentsTrained}</p></div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"><CalendarCheck size={16} /> Book guidance</button>
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300"><MessageCircle size={16} /> Ask doubt</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl font-bold text-slate-900">Course cards</h2>
          <div className="mt-5 space-y-3">
            {trainer.courses.map((course) => (
              <div key={course} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-600" />
                <div><p className="font-semibold text-slate-900">{course}</p><p className="text-sm text-slate-600">Includes timetable, weekly test, doubt support and performance tracking.</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl font-bold text-slate-900">Guidance videos</h2>
          <div className="mt-5 space-y-3">
            {(videos.length ? videos : guidanceVideos.slice(0, 2)).map((video) => (
              <a key={video.id} href={video.videoUrl} target="_blank" rel="noreferrer" className="block rounded-2xl bg-slate-50 p-4 hover:bg-brand-50">
                <p className="flex items-center gap-2 font-semibold text-slate-900"><Video size={17} className="text-brand-600" /> {video.title}</p>
                <p className="mt-1 text-sm text-slate-600">{video.duration} - {video.language} - {video.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
