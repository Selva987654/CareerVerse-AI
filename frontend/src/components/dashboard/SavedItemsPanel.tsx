import { Bookmark, Briefcase, Heart, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { careers } from '../../data/careers';
import { courses } from '../../data/courses';
import { opportunities } from '../../data/opportunities';
import { useApp } from '../../context/AppContext';
import { Panel } from './DashboardWidgets';

export function SavedItemsPanel() {
  const { savedCareers, savedCourses, savedOpportunities } = useApp();
  const savedCareerItems = careers.filter((career) => savedCareers.includes(career.id));
  const savedCourseItems = courses.filter((course) => savedCourses.includes(course.id));
  const savedOpportunityItems = savedOpportunities.map((id) => opportunities.find((opportunity) => opportunity.id === id) ?? {
    id,
    title: `Saved opportunity ${id}`,
    type: 'Opportunity',
  });
  const total = savedCareerItems.length + savedCourseItems.length + savedOpportunities.length;

  return (
    <Panel title="Your saved & liked items">
      {total === 0 ? (
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Like or save a career, course, job, or internship and it will appear here.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {savedCareerItems.slice(0, 4).map((career) => (
            <Link key={career.id} to={`/career-guide/${career.id}`} className="rounded-xl border border-slate-200 p-3 hover:border-brand-300 hover:bg-brand-50/40">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-rose-600"><Heart size={14} fill="currentColor" /> Career</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{career.name}</p>
            </Link>
          ))}
          {savedCourseItems.slice(0, 4).map((course) => (
            <Link key={course.id} to={`/courses-exams/courses/${course.id}`} className="rounded-xl border border-slate-200 p-3 hover:border-brand-300 hover:bg-brand-50/40">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-600"><GraduationCap size={14} /> Course</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{course.name}</p>
            </Link>
          ))}
          {savedOpportunityItems.slice(0, 4).map((opportunity) => (
            <Link key={opportunity.id} to="/internships-jobs" className="rounded-xl border border-slate-200 p-3 hover:border-brand-300 hover:bg-brand-50/40">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-600"><Briefcase size={14} /> {opportunity.type}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{opportunity.title}</p>
            </Link>
          ))}
        </div>
      )}
      {total > 12 && <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-500"><Bookmark size={13} /> {total - 12} more saved items are kept in your account.</p>}
    </Panel>
  );
}
