import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Compass, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLE_DASHBOARD_PATH } from '../types/auth';
import { featureIsRelevant, type ProfileFeature } from '../utils/profileAccess';

const links = [
  { to: '/', label: 'Home' },
  { to: '/discover', label: 'Discover', feature: 'streams' as ProfileFeature },
  { to: '/career-guide', label: 'Career Guide', feature: 'careers' as ProfileFeature },
  { to: '/courses-exams', label: 'Courses & Exams', feature: 'courses' as ProfileFeature },
  { to: '/government-exams', label: 'Gov Exams', feature: 'exams' as ProfileFeature },
  { to: '/colleges-counselling', label: 'Colleges & Counselling', feature: 'colleges' as ProfileFeature },
  { to: '/internships-jobs', label: 'Internships & Jobs', feature: 'internships' as ProfileFeature },
  { to: '/ai-tools', label: 'AI Tools', feature: 'aiTools' as ProfileFeature },
  { to: '/parents', label: 'Parents' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, profile } = useAuth();
  const visibleLinks = links.filter((link) => !link.feature || featureIsRelevant(link.feature, profile, user));
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-brand">
            <Compass size={20} aria-hidden="true" />
          </span>
          CareerVerse<span className="text-brand-600"> AI</span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {visibleLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-slate-700 hover:border-brand-300"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
                {user.name.split(' ')[0]}
                <ChevronDown size={14} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-card-hover">
                  <Link
                    to={ROLE_DASHBOARD_PATH[user.role]}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition-all hover:bg-brand-700 hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 xl:hidden">
          <div className="flex flex-col gap-1">
            {visibleLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link
                  to={ROLE_DASHBOARD_PATH[user.role]}
                  className="mt-2 rounded-lg bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
