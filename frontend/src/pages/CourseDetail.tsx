import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Clock, GraduationCap, IndianRupee, Building2, TrendingUp } from 'lucide-react';
import { courses } from '../data/courses';
import { useApp } from '../context/AppContext';

const placementRoadmap = [
  { year: 'Year 1', focus: 'Build fundamentals', skills: 'Core subject basics, communication skills, one programming/tool skill', projects: 'One small personal project or assignment portfolio' },
  { year: 'Year 2', focus: 'Go deeper', skills: 'Specialisation basics, first real tools of the trade', projects: 'One mini project applying what you\u2019ve learned' },
  { year: 'Year 3', focus: 'Build real experience', skills: 'Advanced tools, internship-ready skills', projects: '1\u20132 solid projects + a summer internship' },
  { year: 'Final Year', focus: 'Get placement ready', skills: 'Interview prep, aptitude, mock interviews', projects: 'A capstone project + placement training completion' },
];

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find((c) => c.id === courseId);
  const { toggleSavedCourse, isCourseSaved } = useApp();

  useEffect(() => { window.scrollTo(0, 0); }, [courseId]);

  if (!course) return <Navigate to="/courses-exams" replace />;

  const saved = isCourseSaved(course.id);

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link to="/courses-exams" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600">
          <ArrowLeft size={16} /> Back to Courses & Exams
        </Link>

        <div className="mt-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 text-3xl shadow-brand">
              {course.emoji}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-600">{course.stream}</span>
              <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">{course.name}</h1>
            </div>
          </div>
          <button
            onClick={() => toggleSavedCourse(course.id)}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300"
          >
            <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-brand-600' : ''} />
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        <p className="mt-5 text-lg leading-relaxed text-slate-600">{course.description}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBox icon={Clock} label="Duration" value={course.duration} />
          <StatBox icon={GraduationCap} label="Eligibility" value={course.eligibility} />
          <StatBox icon={IndianRupee} label="Avg. Fees" value={course.avgFees} />
          <StatBox icon={TrendingUp} label="Entrance" value={course.entranceExams[0]} />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-display font-bold text-slate-900">
              <Building2 size={18} className="text-brand-600" /> Top Colleges (sample)
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {course.topColleges.map((c) => <li key={c}>\u2022 {c}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-100 p-6">
            <h3 className="mb-3 font-display font-bold text-slate-900">Career Options After This Course</h3>
            <div className="flex flex-wrap gap-2">
              {course.careerOptions.map((c) => (
                <span key={c} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">From Course to Placement</h2>
          <p className="mt-2 text-slate-600">A year-by-year roadmap to graduate placement-ready \u2014 adapt it to {course.name}'s specific tools and subjects.</p>

          <div className="mt-6 space-y-4">
            {placementRoadmap.map((r) => (
              <div key={r.year} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{r.year} \u2014 {r.focus}</p>
                <p className="mt-2 text-sm text-slate-700"><strong>Skills to build:</strong> {r.skills}</p>
                <p className="mt-1 text-sm text-slate-700"><strong>Projects:</strong> {r.projects}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ChecklistCard title="Resume & Profile Checklist" items={['Clear, achievement-based resume', 'LinkedIn headline & summary written', 'GitHub or portfolio with real projects', 'Certificates listed with dates']} />
            <ChecklistCard title="Interview Preparation" items={['Aptitude practice (numbers, logic, verbal)', 'Core subject revision', 'Mock technical/HR interviews', 'Group discussion practice']} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/placement-training" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">
              Start Placement Training
            </Link>
            <Link to="/internships-jobs" className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300">
              Browse Internships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
      <Icon size={20} className="mx-auto text-brand-600" />
      <p className="mt-2 text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 font-display text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-100 p-5">
      <h4 className="mb-2 font-display font-bold text-slate-900">{title}</h4>
      <ul className="space-y-1.5 text-sm text-slate-600">
        {items.map((i) => <li key={i}>\u2713 {i}</li>)}
      </ul>
    </div>
  );
}
