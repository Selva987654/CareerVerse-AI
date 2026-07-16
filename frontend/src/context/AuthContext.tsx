import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { AuthUser, Role, StudentProfile } from '../types/auth';
import { api } from '../services/api';

const USER_STORAGE_KEY = 'cv_auth_user';
const TOKEN_STORAGE_KEY = 'cv_auth_token';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string, role?: Role) => Promise<{ ok: boolean; error?: string }>;
  setSession: (token: string, user: AuthUser) => void;
  logout: () => void;
  profile: StudentProfile | null;
  profileLoading: boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const hydrateProfile = useCallback(async (authUser: AuthUser) => {
    if (authUser.role !== 'student') {
      setProfile(null);
      return;
    }
    setProfileLoading(true);
    try {
      const saved = await api.studentProfile();
      setProfile(saved.profileComplete === false ? null : saved);
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const setSession = useCallback((token: string, authUser: AuthUser) => {
    setUser(authUser);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
    void hydrateProfile(authUser);
  }, [hydrateProfile]);

  useEffect(() => {
    let active = true;
    const restore = async () => {
      try {
        const raw = localStorage.getItem(USER_STORAGE_KEY);
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!token) return;
        if (raw) setUser(JSON.parse(raw));
        try {
          const current = await api.me();
          if (active) {
            setUser(current);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(current));
            void hydrateProfile(current);
          }
        } catch {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(USER_STORAGE_KEY);
          if (active) setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    restore();
    return () => { active = false; };
  }, [hydrateProfile]);

  const login = useCallback(async (email: string, password: string, role?: Role) => {
    try {
      const res = await api.login(email, password, role);
      setSession(res.token, res.user);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Login failed. Please check backend connection and credentials.',
      };
    }
  }, [setSession]);

  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, setSession, logout, profile, profileLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
