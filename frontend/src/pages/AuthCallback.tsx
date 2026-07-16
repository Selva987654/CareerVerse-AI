import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthUser, ROLE_DASHBOARD_PATH } from '../types/auth';

export default function AuthCallback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setSession } = useAuth();

  useEffect(() => {
    let active = true;
    const complete = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const userParam = params.get('user');

      if (!token || !userParam) {
        if (active) setError('Google login callback did not include token/user. Check backend OAuth success handler.');
        return;
      }

      try {
        const callbackUser = JSON.parse(decodeURIComponent(userParam)) as AuthUser;
      // The callback payload is only a bootstrap hint. Refresh the signed-in user from the API.
      localStorage.setItem('cv_auth_token', token);
      if (callbackUser.provider === 'GOOGLE') {
        ['cv_saved_careers', 'cv_saved_courses', 'cv_quiz_result', 'cv_education_level', 'cv_progress', 'cv_applications', 'cv_saved_opportunities'].forEach((key) => localStorage.removeItem(key));
      }
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (!response.ok) throw new Error('Unable to refresh authenticated Google profile');
        const user = await response.json() as AuthUser;
        if (!active) return;
        setSession(token, user);
        if (user.provider === 'GOOGLE' && user.profileComplete === false) {
          navigate('/profile-setup', { replace: true });
        } else {
          navigate(ROLE_DASHBOARD_PATH[user.role], { replace: true });
        }
      } catch {
        if (active) setError('Unable to read Google login user data.');
      }
    };
    void complete();
    return () => { active = false; };
  }, [navigate, setSession]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <ShieldCheck size={28} />
      </div>
      <h1 className="font-display text-3xl font-bold text-slate-900">Completing Google login</h1>
      {error ? (
        <>
          <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          <Link to="/login" className="mt-5 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white">Back to login</Link>
        </>
      ) : (
        <p className="mt-3 text-slate-600">Please wait while CareerVerse AI creates your secure session.</p>
      )}
    </div>
  );
}
