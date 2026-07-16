import type { AuthUser, StudentProfile } from '../types/auth';

export type StudentStage = 'school' | 'college' | 'graduate' | 'unknown';
export type ProfileFeature =
  | 'streams'
  | 'courses'
  | 'exams'
  | 'scholarships'
  | 'loans'
  | 'colleges'
  | 'careers'
  | 'internships'
  | 'jobs'
  | 'placement'
  | 'higherStudies'
  | 'careerSwitch'
  | 'aiTools';

const textOf = (profile?: StudentProfile | null) =>
  [profile?.educationLevel, profile?.currentCourseOrClass, profile?.stream, profile?.preferredCourse]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

export function getStudentStage(profile?: StudentProfile | null): StudentStage {
  const text = textOf(profile);
  if (!text) return 'unknown';
  if (/school|class\s*[1-9]|class\s*1[0-2]|grade|secondary|higher secondary|\bsslc\b|\bhsc\b|\b10th\b|\b12th\b|nursery/.test(text)) return 'school';
  if (/graduate|graduated|postgraduate|post graduate|master|\bpg\b|passed out|working professional/.test(text)) return 'graduate';
  if (/college|undergraduate|under graduate|bachelor|diploma|final year|\bdegree\b|b\.?tech|b\.?e\.?|bca|bsc|ba\b|bcom|mca|m\.?tech/.test(text)) return 'college';
  return 'unknown';
}

const stageFeatures: Record<Exclude<StudentStage, 'unknown'>, ProfileFeature[]> = {
  school: ['streams', 'courses', 'exams', 'scholarships', 'loans', 'colleges', 'careers', 'aiTools'],
  college: ['courses', 'exams', 'scholarships', 'loans', 'colleges', 'careers', 'internships', 'jobs', 'placement', 'higherStudies', 'aiTools'],
  graduate: ['courses', 'exams', 'scholarships', 'loans', 'colleges', 'careers', 'internships', 'jobs', 'placement', 'higherStudies', 'careerSwitch', 'aiTools'],
};

export function featureIsRelevant(feature: ProfileFeature, profile?: StudentProfile | null, user?: AuthUser | null) {
  if (!user || user.role !== 'student') return true;
  const stage = getStudentStage(profile);
  return stage === 'unknown' || stageFeatures[stage].includes(feature);
}

export function profileSummary(profile?: StudentProfile | null) {
  const stage = getStudentStage(profile);
  if (stage === 'school') return 'School pathway';
  if (stage === 'college') return 'College pathway';
  if (stage === 'graduate') return 'Graduate pathway';
  return 'Complete your profile for personalised recommendations';
}
