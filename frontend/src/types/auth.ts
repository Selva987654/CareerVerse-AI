export type Role = 'student' | 'parent' | 'college' | 'recruiter' | 'mentor' | 'admin';

export interface StudentProfile {
  educationLevel?: string;
  currentCourseOrClass?: string;
  stream?: string;
  marksOrCgpa?: number;
  location?: string;
  careerInterest?: string;
  skills?: string;
  preferredCourse?: string;
  preferredCollegeType?: string;
  financialRequirement?: string;
}

export interface AuthUser {
  id: string;
  role: Role;
  name: string;
  email: string;
  profileImage?: string;
  provider?: 'LOCAL' | 'GOOGLE';
  profileComplete?: boolean;
  demoAccount?: boolean;
  meta?: Record<string, string>;
}

export const ROLE_LABELS: Record<Role, string> = {
  student: 'Student',
  parent: 'Parent',
  college: 'College / Placement Officer',
  recruiter: 'Recruiter / Company',
  mentor: 'Mentor / Placement Trainer',
  admin: 'Admin',
};

export const ROLE_DASHBOARD_PATH: Record<Role, string> = {
  student: '/student-dashboard',
  parent: '/parent-dashboard',
  college: '/college-dashboard',
  recruiter: '/recruiter-dashboard',
  mentor: '/mentor-dashboard',
  admin: '/admin-dashboard',
};
