import { Link } from 'react-router-dom';
import { Compass, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white">
                <Compass size={20} aria-hidden="true" />
              </span>
              CareerVerse<span className="text-brand-600"> AI</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              A complete career guidance platform for school students, college students,
              graduates, job seekers, career switchers, and parents — built to make every
              career decision simple and clear.
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-brand-600" aria-hidden="true" /> hello@careerverse.ai
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-brand-600" aria-hidden="true" /> +91 7010612377
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-600" aria-hidden="true" /> Coimbatore, Tamil Nadu, India
              </p>
            </div>
          </div>

          <FooterCol
            title="Explore"
            links={[
              { to: '/discover', label: 'Career Discovery' },
              { to: '/daily-updates', label: 'Daily Updates' },
              { to: '/compare', label: 'Comparison Tools' },
              { to: '/quiz', label: 'Career Quiz' },
            ]}
          />
          <FooterCol
            title="Guidance"
            links={[
              { to: '/exams', label: 'Entrance Exams' },
              { to: '/colleges', label: 'College Guide' },
              { to: '/jobs', label: 'Jobs & Internships' },
              { to: '/switch', label: 'Career Switch' },
            ]}
          />
          <FooterCol
            title="For You"
            links={[
              { to: '/parents', label: 'Parent Guidance' },
              { to: '/dashboard', label: 'Your Dashboard' },
              { to: '/faq', label: 'FAQ' },
              { to: '/colleges-counselling?tab=counselling', label: 'Career Counselling' },
            ]}
          />
          <FooterCol
            title="Platform Access"
            links={[
              { to: '/login', label: 'College / Recruiter Login' },
              { to: '/login', label: 'Mentor / Trainer Login' },
              { to: '/admin-login', label: 'Admin Direct Login' },
              { to: '/ai-tools', label: 'AI Tools' },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} CareerVerse AI. All rights reserved.</p>
          <p>Made with care for every student's future.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-900">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-slate-600 transition-colors hover:text-brand-600">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
