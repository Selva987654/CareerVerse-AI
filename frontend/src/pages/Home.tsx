import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Briefcase,
  Users,
  Sparkles,
  Search,
  Map,
  ListChecks,
  PlayCircle,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { educationLevels } from '../data/courses';
import { careers } from '../data/careers';
import { CareerCard } from '../components/CareerCard';
import { SectionHeader } from '../components/SectionHeader';
import { UpdatesTicker } from '../components/UpdatesTicker';

const journeySteps = [
  { icon: Search, title: 'Discover', desc: 'Tell us your stage and interests. We map out where you are.' },
  { icon: ListChecks, title: 'Decide', desc: 'Take the Career Quiz and compare paths with real data.' },
  { icon: Map, title: 'Plan', desc: 'Get a clear, step-by-step roadmap built for your goal.' },
  { icon: Briefcase, title: 'Act', desc: 'Find exams, colleges, internships, and jobs to move forward.' },
];

const guidanceVideos = [
  {
    title: 'Career Guidance Class',
    trainer: 'Student Guidance Staff',
    desc: 'A short class-style session for choosing stream, course and career direction after school or college.',
    to: '/discover',
    accent: 'from-brand-600 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'College Admission Guidance',
    trainer: 'College Counselling Staff',
    desc: 'Understand marks, category, counselling links, college filters and how to verify official admission details.',
    to: '/colleges-counselling',
    accent: 'from-emerald-600 to-teal-700',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function Home() {
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-brand-200/60 to-indigo-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-100/60 to-rose-100/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <Sparkles size={16} /> Built for every stage of your career journey
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
                Confused about your career?{' '}
                <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
                  Find your direction.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                CareerVerse AI is a complete guidance platform for school students, college
                students, graduates, job seekers, career switchers, and parents — helping you
                choose the right stream, course, skills, and career, step by step.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Take the Free Career Quiz <ArrowRight size={18} />
                </Link>
                <Link
                  to="/discover"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-brand-300"
                >
                  Explore Career Paths
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-6">
                <Stat num="50+" label="Career paths" />
                <Stat num="10" label="Guidance tools" />
                <Stat num="100%" label="Free to use" />
              </div>
            </div>

            <div className="relative" data-reveal data-reveal-delay="150">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card-hover sm:p-8">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Compass size={20} />
                  </span>
                  <div>
                    <p className="font-display font-bold text-slate-900">Where are you right now?</p>
                    <p className="text-sm text-slate-500">Pick your stage to get started</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {educationLevels.slice(0, 6).map((lvl) => (
                    <Link
                      key={lvl.id}
                      to="/discover"
                      className="group flex flex-col gap-1 rounded-xl border border-slate-100 p-3.5 transition-all hover:border-brand-300 hover:bg-brand-50/50"
                    >
                      <span className="text-2xl" aria-hidden="true">{lvl.icon}</span>
                      <span className="text-sm font-semibold text-slate-800">{lvl.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-card sm:block animate-float"
                aria-hidden="true"
              >
                <p className="text-xs font-semibold text-slate-500">Career Match</p>
                <p className="font-display text-lg font-bold text-brand-600">92% fit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UpdatesTicker />

      {/* GUIDANCE VIDEOS */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4" data-reveal>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-600">Discover guidance</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">Quick staff-led guidance videos</h2>
            </div>
            <Link to="/discover" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300">
              View guidance hub <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {guidanceVideos.map((video, index) => (
              <Link
                key={video.title}
                to={video.to}
                data-reveal
                data-reveal-delay={index * 100}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className={`relative min-h-56 overflow-hidden bg-gradient-to-br ${video.accent} p-6 text-white`}>
                  <img src={video.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${video.accent} opacity-75`} />
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
                      <PlayCircle size={14} /> Guidance video
                    </span>
                    <div className="mt-20 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold">{video.title}</h3>
                        <p className="mt-1 text-sm text-white/85">{video.trainer}</p>
                      </div>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 transition-transform group-hover:scale-105">
                        <PlayCircle size={24} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-slate-600">{video.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who this is for"
            title="One platform. Every stage of the career journey."
            lead="Whether you are choosing a stream after 10th, picking a college course, hunting for your first job, or switching careers entirely — CareerVerse AI has guidance built specifically for you."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AudienceCard icon={GraduationCap} title="School & 10th/12th Students" desc="Choose the right stream and entrance exam with confidence." delay={0} />
            <AudienceCard icon={Briefcase} title="College Students & Graduates" desc="Build skills, find internships, and prepare for placements." delay={100} />
            <AudienceCard icon={Compass} title="Career Switchers" desc="Move into a new field with a clear, realistic transition plan." delay={200} />
            <AudienceCard icon={Users} title="Parents" desc="Understand your child's options with simple, honest information." delay={300} />
            <AudienceCard icon={Sparkles} title="Working Professionals" desc="Upskill and grow within your current career path." delay={400} />
            <AudienceCard icon={Map} title="Job Seekers" desc="Find the right roles, salary expectations, and growth scope." delay={500} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How it works"
            title="Four simple steps from confusion to clarity."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, i) => (
              <div
                key={step.title}
                data-reveal
                data-reveal-delay={i * 100}
                className="relative rounded-2xl bg-white p-6 shadow-card"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <step.icon size={20} />
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                {i < journeySteps.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-300 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CAREERS */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Popular career paths"
            title="See what a career actually looks like."
            lead="Real eligibility, real skills, real salary ranges — not vague descriptions."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careers.slice(0, 6).map((c, i) => (
              <CareerCard key={c.id} career={c} delay={i * 80} />
            ))}
          </div>
          <div className="mt-10 text-center" data-reveal>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-800 transition-all hover:border-brand-300 hover:bg-brand-50"
            >
              View all career paths <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE EVERY SECTION */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Everything in one place"
            title="Colleges, internships, AI tools, and more \u2014 all connected."
            lead="No more jumping between five different websites and YouTube videos."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <PreviewCard to="/colleges-counselling" title="College Counselling" desc="Find Tamil Nadu colleges and discover scholarships." icon={GraduationCap} />
            <PreviewCard to="/internships-jobs" title="Internships & Jobs" desc="Filtered listings plus trending training courses and placement tools." icon={Briefcase} />
            <PreviewCard to="/ai-tools" title="AI Tools" desc="Career Path Simulator, Skill Gap Analyzer, and more." icon={Sparkles} />
            <PreviewCard to="/placement-training" title="Placement Training" desc="Aptitude, interviews, GD practice \u2014 tracked module by module." icon={Compass} />
            <PreviewCard to="/parents" title="Parent Guidance" desc="Simple explanations of cost, safety, and future scope." icon={Users} />
            <PreviewCard to="/courses-exams" title="Courses & Exams" desc="34+ courses and every major entrance exam explained." icon={Map} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8" data-reveal>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Stop guessing. Start planning.
          </h2>
          <p className="mt-4 text-lg text-brand-50">
            Take the free 6-question Career Quiz and discover directions that genuinely fit you.
          </p>
          <Link
            to="/quiz"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5"
          >
            Start Free Quiz <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-slate-900">{num}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: typeof GraduationCap;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <div
      data-reveal
      data-reveal-delay={delay}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
    >
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={22} />
      </span>
      <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

function PreviewCard({
  to,
  title,
  desc,
  icon: Icon,
}: {
  to: string;
  title: string;
  desc: string;
  icon: typeof GraduationCap;
}) {
  return (
    <Link
      to={to}
      data-reveal
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover"
    >
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{desc}</p>
    </Link>
  );
}
