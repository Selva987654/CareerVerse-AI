import { useEffect, useState } from 'react';
import { CheckCircle2, UserRound } from 'lucide-react';
import { Panel } from './DashboardWidgets';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { demoProfiles } from '../../data/demoProfiles';

export function RealAccountProfile({ role }: { role: string }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Record<string, string>>(user?.demoAccount ? (demoProfiles[role] ?? {}) : {});
  useEffect(() => {
    api.roleProfile().then(result => {
      try {
        setProfile(result.profileData ? JSON.parse(result.profileData) : (user?.demoAccount ? (demoProfiles[role] ?? {}) : {}));
      } catch {
        setProfile(user?.demoAccount ? (demoProfiles[role] ?? {}) : {});
      }
    }).catch(() => setProfile(user?.demoAccount ? (demoProfiles[role] ?? {}) : {}));
  }, [role, user?.demoAccount]);
  const entries = Object.entries(profile).filter(([key, value]) => key !== 'logo' && value);
  return <Panel title={`Your ${role} profile`}>
    <div className="flex items-center gap-3 rounded-2xl bg-brand-50 p-4"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600"><UserRound size={20} /></span><div><p className="font-semibold text-slate-900">{user?.name}</p><p className="text-xs text-slate-500">{user?.email}</p></div></div>
    {user?.profileComplete ? <><p className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 size={16} /> {user.demoAccount ? 'Demo profile loaded for testing.' : 'Profile completed. Only your saved information is shown.'}</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{entries.map(([key, value]) => <div key={key} className="rounded-xl border border-slate-200 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{key.replace(/[A-Z]/g, letter => ` ${letter}`).trim()}</p><p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{value}</p></div>)}</div></> : <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">Complete your {role} profile to continue.</p>}
  </Panel>;
}
