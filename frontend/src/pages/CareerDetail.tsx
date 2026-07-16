import { ReactNode, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  IndianRupee,
  TrendingUp,
  GraduationCap,
  Clock,
  Briefcase,
  Sparkles,
  ShieldAlert,
  Repeat,
} from 'lucide-react';
import { careers } from '../data/careers';
import { useApp } from '../context/AppContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

const automationRiskByCategory: Record<string, { risk: string; aiImpact: string }> = {
  Technology: { risk: 'Low \u2013 Medium', aiImpact: 'AI tools speed up coding but increase demand for people who can design, review, and direct AI-assisted work.' },
  Healthcare: { risk: 'Low', aiImpact: 'AI assists diagnosis and admin work, but hands-on care and judgement remain human-led.' },
  Commerce: { risk: 'Medium', aiImpact: 'Routine accounting is increasingly automated; advisory and strategic roles stay valuable.' },
  Law: { risk: 'Low \u2013 Medium', aiImpact: 'AI speeds up research and drafting, but arguing cases and judgement remain human-led.' },
  Education: { risk: 'Low', aiImpact: 'AI supports content creation, but mentoring and classroom engagement stay human-centred.' },
  Engineering: { risk: 'Low \u2013 Medium', aiImpact: 'Design and simulation tools improve productivity without replacing on-ground engineering judgement.' },
  Design: { risk: 'Medium', aiImpact: 'AI generates first drafts fast; strong human taste, brand sense, and iteration remain essential.' },
  Marketing: { risk: 'Medium', aiImpact: 'AI automates content and analytics; strategy, brand voice, and creativity stay valuable.' },
  Business: { risk: 'Low', aiImpact: 'AI supports data-driven decisions, but ownership, strategy, and leadership remain human.' },
};

export default function CareerDetail() {
  const { careerId } = useParams<{ careerId: string }>();
  const career = careers.find((c) => c.id === careerId);
  const { toggleSavedCareer, isCareerSaved, markProgress } = useApp();
  const ref = useScrollReveal();

  useEffect(() => {
    if (career) markProgress('careersExplored');
  }, [career, markProgress]);

  if (!career) return <Navigate to="/career-guide" replace />;

  const saved = isCareerSaved(career.id);
  const aiInfo = automationRiskByCategory[career.category] ?? { risk: 'Medium', aiImpact: 'AI is changing how this work gets done \u2014 staying updated with new tools keeps you ahead.' };
  const backupOptions = careers.filter((c) => c.category === career.category && c.id !== career.id).slice(0, 3);

  return (
    <div ref={ref} className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/career-guide"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600"
        >
          <ArrowLeft size={16} /> Back to all careers
        </Link>

        <div className="mt-6 flex items-start justify-between" data-reveal>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 text-3xl shadow-brand">
              {career.emoji}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-600">
                {career.category}
              </span>
              <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                {career.name}
              </h1>
            </div>
          </div>
          <button
            onClick={() => toggleSavedCareer(career.id)}
            aria-pressed={saved}
            aria-label={saved ? 'Remove from saved careers' : 'Save this career'}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-rose-500' : ''} />
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        <p className="mt-5 text-lg leading-relaxed text-slate-600" data-reveal>
          {career.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2" data-reveal>
          {career.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">
              {tag}
            </span>
          ))}
        </div>

        {/* Key stats grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4" data-reveal>
          <StatBox icon={IndianRupee} label="Average Salary" value={career.avgSalary} />
          <StatBox icon={TrendingUp} label="Top Salary" value={career.topSalary} />
          <StatBox icon={Clock} label="Duration" value={career.duration} />
          <StatBox icon={Sparkles} label="Demand" value={career.demandLevel} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InfoCard icon={GraduationCap} title="Eligibility">
            <p className="text-sm leading-relaxed text-slate-600">{career.eligibility}</p>
          </InfoCard>
          <InfoCard icon={Briefcase} title="Job Roles">
            <ul className="flex flex-wrap gap-2">
              {career.jobRoles.map((role) => (
                <li key={role} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  {role}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>

        <InfoCard icon={Sparkles} title="Required Skills" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {career.skills.map((skill) => (
              <li key={skill} className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                {skill}
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard icon={TrendingUp} title="Future Scope" className="mt-6">
          <p className="text-sm leading-relaxed text-slate-600">{career.futureScope}</p>
        </InfoCard>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InfoCard icon={ShieldAlert} title="AI Impact & Automation Risk">
            <p className="mb-2 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Automation risk: {aiInfo.risk}
            </p>
            <p className="text-sm leading-relaxed text-slate-600">{aiInfo.aiImpact}</p>
          </InfoCard>
          <InfoCard icon={Repeat} title="Backup Career Options">
            {backupOptions.length === 0 ? (
              <p className="text-sm text-slate-500">Explore the full Career Guide for related paths.</p>
            ) : (
              <ul className="space-y-2">
                {backupOptions.map((c) => (
                  <li key={c.id}>
                    <Link to={`/career-guide/${c.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-brand-600">
                      <span>{c.emoji}</span> {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </InfoCard>
        </div>

        {/* Roadmap */}
        <div className="mt-12" data-reveal>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Step-by-step roadmap
          </h2>
          <p className="mt-2 text-slate-600">
            A realistic path from beginner to job-ready for {career.name}.
          </p>

          <ol className="mt-8 space-y-6 border-l-2 border-slate-100 pl-8">
            {career.roadmap.map((step) => (
              <li key={step.step} className="relative" data-reveal data-reveal-delay={step.step * 60}>
                <span className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {step.step}
                </span>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-slate-900">{step.title}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap gap-4" data-reveal>
          <Link
            to="/courses-exams?tab=exams"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"
          >
            Check entrance exams
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300"
          >
            Track my progress
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }: { icon: typeof IndianRupee; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
      <Icon size={20} className="mx-auto text-brand-600" />
      <p className="mt-2 text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 font-display text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
  className = '',
}: {
  icon: typeof GraduationCap;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-100 p-6 ${className}`} data-reveal>
      <div className="mb-3 flex items-center gap-2">
        <Icon size={18} className="text-brand-600" />
        <h3 className="font-display font-bold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}
