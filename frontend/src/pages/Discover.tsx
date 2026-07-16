import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, CalendarDays, Languages, PlayCircle, Star, Users } from 'lucide-react';
import { educationLevels } from '../data/courses';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useApp } from '../context/AppContext';

export default function Discover() {
  const ref = useScrollReveal();
  const [activeId, setActiveId] = useState(educationLevels[0].id);
  const { setEducationLevel } = useApp();
  const active = educationLevels.find((l) => l.id === activeId)!;

  const handleSelect = (id: string) => {
    setActiveId(id);
    setEducationLevel(id);
  };

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Discovery"
          title="Where are you in your journey?"
          lead="Old CareerVerse UI is kept. Discover now also includes guide details, trainer photo cards and playable YouTube guidance videos for students."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" data-reveal>
          {educationLevels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => handleSelect(lvl.id)}
              aria-pressed={activeId === lvl.id}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${activeId === lvl.id ? 'border-brand-500 bg-brand-50 shadow-brand' : 'border-slate-100 bg-white hover:border-brand-200'}`}
            >
              <span className="text-3xl" aria-hidden="true">{lvl.icon}</span>
              <span className="text-xs font-semibold leading-tight text-slate-800 sm:text-sm">{lvl.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-10 lg:grid-cols-2" data-reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 shadow-sm">{active.icon} {active.label}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-slate-900">{active.desc}</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{active.guidance}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/quiz" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">Take Career Quiz <ArrowRight size={16} /></Link>
              <Link to="/streams" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300">Explore Streams</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-card">
            <h4 className="font-display text-base font-bold text-slate-900">Your next steps right now</h4>
            <ul className="mt-4 space-y-3">
              {active.nextSteps.map((step) => (
                <li key={step} className="flex items-start gap-3 text-sm text-slate-700"><CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-brand-600" />{step}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16" data-reveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-600">Trainers & guides</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">Guide details in Discover page</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Every guide card now shows photo, category, experience, subjects, language, mode, contact action and details.</p>
            </div>
            <Link to="/government-exam-trainers" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300 sm:inline-flex">View all trainers</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trainerCards.map((trainer) => (
              <article key={trainer.name} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                <img src={trainer.photo} alt={trainer.name} className="h-40 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-display font-bold text-slate-900">{trainer.name}</h4>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"><Star size={12} /> {trainer.rating}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-brand-700">{trainer.category}</p>
                  <p className="mt-2 text-sm text-slate-600">{trainer.details}</p>
                  <div className="mt-4 grid gap-2 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /> {trainer.experience}</span>
                    <span className="inline-flex items-center gap-1.5"><Languages size={13} /> {trainer.language}</span>
                    <span className="inline-flex items-center gap-1.5"><Users size={13} /> {trainer.mode}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {trainer.subjects.map((s) => <span key={s} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{s}</span>)}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={`mailto:${trainer.email}?subject=CareerVerse Guidance Enquiry`} className="rounded-full bg-brand-600 px-3 py-2 text-xs font-semibold text-white">Book Guide</a>
                    <Link to={`/government-exam-trainers/${trainer.id}`} className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Details</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16" data-reveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Guidance videos</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">Playable YouTube videos inside Discover</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Students can play career, TNEA, TNPSC, resume, LinkedIn and interview guidance videos directly on the page.</p>
            </div>
            <Link to="/ai-tools" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300 sm:inline-flex">Open AI tools</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {videoCards.map((video) => (
              <article key={video.title} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                <div className="aspect-video bg-slate-100">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-600"><PlayCircle size={14} /> {video.category}</p>
                  <h4 className="mt-2 font-display text-lg font-bold text-slate-900">{video.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{video.duration} · {video.trainer}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{video.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal>
          <QuickLink to="/streams" title="Stream Selector" desc="Science, Commerce, Arts, or Vocational — find your fit." />
          <QuickLink to="/courses" title="Course Explorer" desc="Engineering, Medical, Design, Law, and more." />
          <QuickLink to="/exams" title="Entrance Exam Guide" desc="JEE, NEET, CLAT, CAT — know what to prepare for." />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card">
      <div><p className="font-display font-bold text-slate-900">{title}</p><p className="mt-1 text-sm text-slate-500">{desc}</p></div>
      <ArrowRight size={18} className="flex-shrink-0 text-slate-300 transition-colors group-hover:text-brand-600" />
    </Link>
  );
}

const trainerCards = [
  { id: 'tnpsc-mentor-priya', name: 'Ravi Kumar', category: 'TNPSC & SSC Trainer', rating: '4.8', experience: '7+ years', language: 'Tamil + English', mode: 'Online / Coimbatore', subjects: ['General Studies', 'TN GK', 'Aptitude'], email: 'ravi.trainer@careerverse.demo', details: 'Guides TNPSC Group II/IV, SSC foundation, current affairs and weekly mock test strategy.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 'placement-mentor-priya', name: 'Priya Sharma', category: 'Placement & Resume Guide', rating: '4.7', experience: '6+ years', language: 'English + Tamil', mode: 'Online', subjects: ['Resume', 'LinkedIn', 'HR Interview'], email: 'priya.trainer@careerverse.demo', details: 'Helps students improve resume, LinkedIn profile, group discussion and mock interview confidence.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { id: 'ssc-banking-arjun', name: 'Arun Raj', category: 'Banking & Aptitude Trainer', rating: '4.6', experience: '5+ years', language: 'Tamil + English', mode: 'Hybrid', subjects: ['Quant', 'Reasoning', 'Banking'], email: 'arun.trainer@careerverse.demo', details: 'Specializes in IBPS, SSC, railway CBT, quant shortcuts and reasoning practice.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 'police-fitness-karthik', name: 'Career Guide Team', category: 'Student Career Mentor', rating: '4.9', experience: '8+ years', language: 'Tamil + English', mode: 'Online / Offline', subjects: ['Career Choice', 'College Finder', 'Internship'], email: 'guide@careerverse.demo', details: 'Supports career quiz, college finder, course choice, internship email and roadmap planning.', photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80' },
];

const videoCards = [
  { title: 'How to Choose Career After 12th', category: 'Career', duration: 'Student guide', trainer: 'Career Guide Team', youtubeId: 'pMyrjzXw_LA', desc: 'General career choice guidance. Replace this video ID with your preferred Tamil/English YouTube guide if needed.' },
  { title: 'How to Apply for TNEA', category: 'College', duration: 'Admission guide', trainer: 'Admissions Guide', youtubeId: 'Ywee5d7Ow9g', desc: 'Use this card for TNEA process, documents and counselling guidance. Official links are available in College Finder.' },
  { title: 'TNPSC Beginner Preparation Plan', category: 'Gov Exam', duration: 'Preparation guide', trainer: 'Ravi Kumar', youtubeId: 'OXGuLhHXwoo', desc: 'Preparation plan card for TNPSC/current affairs/aptitude. Replace with your own trainer video anytime.' },
  { title: 'Build Resume and LinkedIn for Internship', category: 'Placement', duration: 'Placement guide', trainer: 'Priya Sharma', youtubeId: 'ebGqNneImmw', desc: 'Resume, LinkedIn and placement readiness support. AI tools also help generate resume and LinkedIn content.' },
];
