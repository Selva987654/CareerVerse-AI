import { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface QuizResultState {
  resultId: string;
  scores: Record<string, number>;
  takenAt: string;
}

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Selected' | 'Rejected';

export interface ApplicationState {
  id: string;
  type: 'job' | 'internship';
  status: ApplicationStatus;
  appliedAt: string;
}

interface AppState {
  savedCareers: string[];
  toggleSavedCareer: (careerId: string) => void;
  isCareerSaved: (careerId: string) => boolean;
  savedCourses: string[];
  toggleSavedCourse: (courseId: string) => void;
  isCourseSaved: (courseId: string) => boolean;
  quizResult: QuizResultState | null;
  setQuizResult: (r: QuizResultState | null) => void;
  educationLevel: string | null;
  setEducationLevel: (id: string | null) => void;
  progress: {
    quizDone: boolean;
    streamChosen: boolean;
    careersExplored: boolean;
    roadmapViewed: boolean;
  };
  markProgress: (key: keyof AppState['progress']) => void;
  applications: ApplicationState[];
  applyTo: (id: string, type: 'job' | 'internship') => void;
  hasApplied: (id: string) => boolean;
  savedOpportunities: string[];
  toggleSavedOpportunity: (id: string) => void;
  withdrawApplication: (id: string) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function scopedKey(base: string, userId?: string) {
  return `${userId ? `cv_user_${userId}` : 'cv_guest'}_${base}`;
}

const demoSavedCareers = ['software-engineer', 'data-scientist'];
const demoSavedCourses = ['btech', 'bca'];
const demoSavedOpportunities = ['frontend-intern', 'springboot-intern'];

const defaultProgress = {
  quizDone: false,
  streamChosen: false,
  careersExplored: false,
  roadmapViewed: false,
};

const LEGACY_SAVE_MIGRATION_KEY = 'cv_scoped_saves_migrated_v1';

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isDemoUser = Boolean(user?.demoAccount);
  const storageScope = isDemoUser ? `cv_demo_${user?.id}` : user?.id ? `cv_user_${user.id}` : 'cv_guest';
  const [loadedScope, setLoadedScope] = useState(storageScope);
  const [savedCareers, setSavedCareers] = useState<string[]>(() => loadJSON(scopedKey('saved_careers'), []));
  const [savedCourses, setSavedCourses] = useState<string[]>(() => loadJSON(scopedKey('saved_courses'), []));
  const [quizResult, setQuizResult] = useState<QuizResultState | null>(() => loadJSON(scopedKey('quiz_result'), null));
  const [educationLevel, setEducationLevel] = useState<string | null>(() => loadJSON(scopedKey('education_level'), null));
  const [progress, setProgress] = useState(() => loadJSON(scopedKey('progress'), defaultProgress));
  const [applications, setApplications] = useState<ApplicationState[]>(() => loadJSON(scopedKey('applications'), []));
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(() => loadJSON(scopedKey('saved_opportunities'), []));

  useEffect(() => {
    if (loadedScope === storageScope) return;
    const userSavedCareers = loadJSON(`${storageScope}_saved_careers`, isDemoUser ? demoSavedCareers : []);
    const userSavedCourses = loadJSON(`${storageScope}_saved_courses`, isDemoUser ? demoSavedCourses : []);
    const userSavedOpportunities = loadJSON(`${storageScope}_saved_opportunities`, isDemoUser ? demoSavedOpportunities : []);
    const canMigrateLegacy = Boolean(user?.id) && !isDemoUser && !localStorage.getItem(LEGACY_SAVE_MIGRATION_KEY);
    const legacyCareers = canMigrateLegacy ? loadJSON<string[]>('cv_saved_careers', []) : [];
    const legacyCourses = canMigrateLegacy ? loadJSON<string[]>('cv_saved_courses', []) : [];
    const legacyOpportunities = canMigrateLegacy ? loadJSON<string[]>('cv_saved_opportunities', []) : [];
    setSavedCareers([...new Set([...userSavedCareers, ...legacyCareers])]);
    setSavedCourses([...new Set([...userSavedCourses, ...legacyCourses])]);
    setQuizResult(loadJSON(`${storageScope}_quiz_result`, null));
    setEducationLevel(loadJSON(`${storageScope}_education_level`, null));
    setProgress(loadJSON(`${storageScope}_progress`, defaultProgress));
    setApplications(loadJSON(`${storageScope}_applications`, []));
    setSavedOpportunities([...new Set([...userSavedOpportunities, ...legacyOpportunities])]);
    if (canMigrateLegacy) {
      localStorage.removeItem('cv_saved_careers');
      localStorage.removeItem('cv_saved_courses');
      localStorage.removeItem('cv_saved_opportunities');
      localStorage.setItem(LEGACY_SAVE_MIGRATION_KEY, 'true');
    }
    setLoadedScope(storageScope);
  }, [loadedScope, storageScope, user?.id, isDemoUser]);

  useEffect(() => { if (loadedScope === storageScope) localStorage.setItem(`${storageScope}_saved_careers`, JSON.stringify(savedCareers)); }, [loadedScope, storageScope, savedCareers]);
  useEffect(() => { if (loadedScope === storageScope) localStorage.setItem(`${storageScope}_saved_courses`, JSON.stringify(savedCourses)); }, [loadedScope, storageScope, savedCourses]);
  useEffect(() => { if (loadedScope === storageScope) localStorage.setItem(`${storageScope}_quiz_result`, JSON.stringify(quizResult)); }, [loadedScope, storageScope, quizResult]);
  useEffect(() => { if (loadedScope === storageScope) localStorage.setItem(`${storageScope}_education_level`, JSON.stringify(educationLevel)); }, [loadedScope, storageScope, educationLevel]);
  useEffect(() => { if (loadedScope === storageScope) localStorage.setItem(`${storageScope}_progress`, JSON.stringify(progress)); }, [loadedScope, storageScope, progress]);
  useEffect(() => { if (loadedScope === storageScope) localStorage.setItem(`${storageScope}_applications`, JSON.stringify(applications)); }, [loadedScope, storageScope, applications]);
  useEffect(() => { if (loadedScope === storageScope) localStorage.setItem(`${storageScope}_saved_opportunities`, JSON.stringify(savedOpportunities)); }, [loadedScope, storageScope, savedOpportunities]);

  const toggleSavedCareer = useCallback((careerId: string) => {
    setSavedCareers((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
  }, []);

  const isCareerSaved = useCallback(
    (careerId: string) => savedCareers.includes(careerId),
    [savedCareers]
  );

  const toggleSavedCourse = useCallback((courseId: string) => {
    setSavedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  }, []);

  const isCourseSaved = useCallback(
    (courseId: string) => savedCourses.includes(courseId),
    [savedCourses]
  );

  const markProgress = useCallback((key: keyof typeof progress) => {
    setProgress((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  const hasApplied = useCallback(
    (id: string) => applications.some((a) => a.id === id),
    [applications]
  );

  const applyTo = useCallback((id: string, type: 'job' | 'internship') => {
    setApplications((prev) =>
      prev.some((a) => a.id === id)
        ? prev
        : [...prev, { id, type, status: 'Applied', appliedAt: new Date().toISOString() }]
    );
  }, []);
  const toggleSavedOpportunity = useCallback((id: string) => setSavedOpportunities(p => p.includes(id) ? p.filter(x => x !== id) : [...p,id]), []);
  const withdrawApplication = useCallback((id: string) => setApplications(p => p.filter(a => a.id !== id)), []);
  const updateApplicationStatus = useCallback((id: string, status: ApplicationStatus) => setApplications(p => p.map(a => a.id === id ? {...a,status} : a)), []);

  const value = useMemo(
    () => ({
      savedCareers,
      toggleSavedCareer,
      isCareerSaved,
      savedCourses,
      toggleSavedCourse,
      isCourseSaved,
      quizResult,
      setQuizResult,
      educationLevel,
      setEducationLevel,
      progress,
      markProgress,
      applications,
      applyTo,
      hasApplied,
      savedOpportunities, toggleSavedOpportunity, withdrawApplication, updateApplicationStatus,
    }),
    [
      savedCareers, toggleSavedCareer, isCareerSaved,
      savedCourses, toggleSavedCourse, isCourseSaved,
      quizResult, educationLevel, progress, markProgress,
      applications, applyTo, hasApplied, savedOpportunities, toggleSavedOpportunity, withdrawApplication, updateApplicationStatus,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
