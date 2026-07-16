/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthUser, Role } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL || `${API_BASE_URL}/api/auth/google/start`;

interface LoginResponse {
  token: string;
  user: AuthUser;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('cv_auth_token');
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const contentType = res.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    const message = typeof body === 'object' && body && 'message' in body
      ? String((body as { message: unknown }).message)
      : `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body as T;
}

export const api = {
  apiBaseUrl: API_BASE_URL,
  googleAuthUrl: GOOGLE_AUTH_URL,

  async login(email: string, password: string, role?: Role) {
    return request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  },

  async register(payload: { fullName: string; email: string; password: string; role: Role }) {
    return request<LoginResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async me() {
    return request<AuthUser>('/api/auth/me');
  },


  async saveStudentProfile(payload: {
    educationLevel: string;
    currentCourseOrClass: string;
    stream: string;
    marksOrCgpa: number;
    location: string;
    careerInterest: string;
    skills: string;
    preferredCourse: string;
    preferredCollegeType: string;
    financialRequirement: string;
  }) {
    return request<{ message: string; profileComplete: boolean }>('/api/profile/student', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async studentProfile() {
    return request<import('../types/auth').StudentProfile & { profileComplete?: boolean }>('/api/profile/student');
  },

  async saveRoleProfile(payload: Record<string, string>) {
    return request<{ message: string; profileComplete: boolean }>('/api/profile/role', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async roleProfile() {
    return request<{ profileComplete: boolean; role: string; profileData?: string }>('/api/profile/role');
  },

  async askGemini(prompt: string, tool: string) {
    const response = await request<{ answer: string }>('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, tool }),
    });
    if (!response.answer || !response.answer.trim()) {
      throw new Error('AI returned an empty response');
    }
    return { answer: response.answer.trim() };
  },

  async recruiterJobs() {
    return request<any[]>('/api/recruiter/jobs');
  },

  async createRecruiterJob(payload: {
    title: string;
    companyName: string;
    location: string;
    workMode: string;
    salary: string;
    experience: string;
    applyEmail: string;
    enquiryEmail: string;
    companyWebsite: string;
    eligibility: string;
    skillsRequired: string;
    responsibilities: string;
    selectionProcess: string;
  }) {
    return request<{ status: string; message: string; job: any }>('/api/recruiter/jobs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async publicCareers() { return request<any[]>('/api/public/careers'); },
  async publicCourses() { return request<any[]>('/api/public/courses'); },
  async publicColleges() { return request<any[]>('/api/public/colleges'); },
  async publicInternships() { return request<any[]>('/api/public/internships'); },
  async publicJobs() { return request<any[]>('/api/public/jobs'); },
  async publicTrainers() { return request<any[]>('/api/public/trainers'); },
  async publicVideos() { return request<any[]>('/api/public/guidance-videos'); },
  async publicExamUpdates() { return request<any[]>('/api/public/exam-updates'); },
  async publicGovernmentExams() { return request<any[]>('/api/public/government-exams'); },
};
