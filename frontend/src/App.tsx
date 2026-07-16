 import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { BackToTop } from './components/BackToTop';
import { ProtectedRoute } from './routes/ProtectedRoute';

import Home from './pages/Home';
import DiscoverHub from './pages/DiscoverHub';
import Streams from './pages/Streams';
import Courses from './pages/Courses';
import CoursesExamsHub from './pages/CoursesExamsHub';
import CourseDetail from './pages/CourseDetail';
import Careers from './pages/Careers';
import CareerGuideHub from './pages/CareerGuideHub';
import CareerDetail from './pages/CareerDetail';
import Exams from './pages/Exams';
import Colleges from './pages/Colleges';
import CollegesCounsellingHub from './pages/CollegesCounsellingHub';
import Scholarships from './pages/Scholarships';
import EducationLoans from './pages/EducationLoans';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import InternshipDetail from './pages/InternshipDetail';
import InternshipsJobsHub from './pages/InternshipsJobsHub';
import CareerSwitch from './pages/CareerSwitch';
import CareerComparison from './pages/CareerComparison';
import DailyUpdates from './pages/DailyUpdates';
import Parents from './pages/Parents';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import Login from './pages/Login';
import Register from './pages/Register';
import DashboardRedirect from './pages/DashboardRedirect';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';
import CollegeDashboard from './pages/dashboards/CollegeDashboard';
import RecruiterDashboard from './pages/dashboards/RecruiterDashboard';
import MentorDashboard from './pages/dashboards/MentorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

import AIToolsHub from './pages/AIToolsHub';
import CareerPathSimulator from './pages/ai-tools/CareerPathSimulator';
import SkillGapAnalyzer from './pages/ai-tools/SkillGapAnalyzer';
import ReadinessAnalyzer from './pages/ai-tools/ReadinessAnalyzer';
import CareerTwinChat from './pages/ai-tools/CareerTwinChat';
import FutureMeSimulator from './pages/ai-tools/FutureMeSimulator';
import CareerPassport from './pages/CareerPassport';
import PlacementTraining from './pages/PlacementTraining';
import GovernmentExams from './pages/government/GovernmentExams';
import GovernmentExamDetail from './pages/government/GovernmentExamDetail';
import GovernmentExamTrainers from './pages/government/GovernmentExamTrainers';
import TrainerDetail from './pages/government/TrainerDetail';
import LiveGovernmentUpdates from './pages/government/LiveGovernmentUpdates';
import AIExamAdvisor from './pages/government/AIExamAdvisor';
import AuthCallback from './pages/AuthCallback';
import CompleteProfile from './pages/CompleteProfile';
import GoogleProfileSetup from './pages/GoogleProfileSetup';
import AICareerQuiz from './pages/ai-new/AICareerQuiz';
import AICareerComparison from './pages/ai-new/AICareerComparison';
import AIResumeBuilder from './pages/ai-new/AIResumeBuilder';
import AILinkedInEnhancer from './pages/ai-new/AILinkedInEnhancer';
import EntranceExamDetail from './pages/EntranceExamDetail';
import TrendingCourses from './pages/TrendingCourses';
import AIMockInterview from './pages/ai-new/AIMockInterview';
import AIInternshipEmailWriter from './pages/ai-new/AIInternshipEmailWriter';
import LinkedInGuide from './pages/LinkedInGuide';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="flex min-h-screen flex-col bg-white">
          <ScrollToTop />
          <Navbar />
          <main id="main-content" className="flex-1">
            <Routes>
              {/* Core */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/complete-profile" element={<ProtectedRoute allow={['student']}><CompleteProfile /></ProtectedRoute>} />
              <Route path="/profile-setup" element={<ProtectedRoute allow={['student', 'parent', 'college', 'mentor', 'recruiter']}><GoogleProfileSetup /></ProtectedRoute>} />
              <Route path="/admin-login" element={<Login />} />

              {/* Discover (merged: Assessment, Quiz, Streams, Comparison) */}
              <Route path="/discover" element={<DiscoverHub />} />
              <Route path="/streams" element={<Streams />} />
              <Route path="/quiz" element={<ProtectedRoute><AICareerQuiz /></ProtectedRoute>} />

              {/* Career Guide (merged: Careers, Career Switch) */}
              <Route path="/career-guide" element={<CareerGuideHub />} />
              <Route path="/career-guide/:careerId" element={<ProtectedRoute><CareerDetail /></ProtectedRoute>} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:careerId" element={<ProtectedRoute><CareerDetail /></ProtectedRoute>} />
              <Route path="/switch" element={<ProtectedRoute><CareerSwitch /></ProtectedRoute>} />

              {/* Government Exam Guidance */}
              <Route path="/government-exams" element={<GovernmentExams />} />
              <Route path="/government-exams/:examId" element={<ProtectedRoute><GovernmentExamDetail /></ProtectedRoute>} />
              <Route path="/government-exam-trainers" element={<GovernmentExamTrainers />} />
              <Route path="/government-exam-trainers/:trainerId" element={<TrainerDetail />} />
              <Route path="/exam-live-updates" element={<ProtectedRoute><LiveGovernmentUpdates /></ProtectedRoute>} />
              <Route path="/ai-tools/government-exam-advisor" element={<ProtectedRoute><AIExamAdvisor /></ProtectedRoute>} />

              {/* Courses & Exams (merged: Courses, Exams) */}
              <Route path="/courses-exams" element={<CoursesExamsHub />} />
              <Route path="/courses-exams/courses/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/exams/:examId" element={<ProtectedRoute><EntranceExamDetail /></ProtectedRoute>} />

              {/* Colleges & Counselling (merged: Finder, Scholarships) */}
              <Route path="/colleges-counselling" element={<CollegesCounsellingHub />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/scholarships" element={<ProtectedRoute><Scholarships /></ProtectedRoute>} />
              <Route path="/education-loans" element={<ProtectedRoute><EducationLoans /></ProtectedRoute>} />

              {/* Internships & Jobs (merged: Jobs, Trending Courses, Placement Training) */}
              <Route path="/internships-jobs" element={<InternshipsJobsHub />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:jobId" element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />
              <Route path="/internships" element={<Jobs />} />
              <Route path="/internships/:internshipId" element={<ProtectedRoute><InternshipDetail /></ProtectedRoute>} />
              <Route path="/trending-courses" element={<ProtectedRoute><TrendingCourses /></ProtectedRoute>} />
              <Route path="/placement-training" element={<ProtectedRoute><PlacementTraining /></ProtectedRoute>} />
              <Route path="/linkedin-guide" element={<ProtectedRoute><LinkedInGuide /></ProtectedRoute>} />

              {/* AI Tools */}
              <Route path="/ai-tools" element={<AIToolsHub />} />
              <Route path="/ai-tools/career-path-simulator" element={<ProtectedRoute><CareerPathSimulator /></ProtectedRoute>} />
              <Route path="/ai-tools/future-me" element={<ProtectedRoute><FutureMeSimulator /></ProtectedRoute>} />
              <Route path="/ai-tools/career-twin" element={<ProtectedRoute><CareerTwinChat /></ProtectedRoute>} />
              <Route path="/ai-tools/skill-gap" element={<ProtectedRoute><SkillGapAnalyzer /></ProtectedRoute>} />
              <Route path="/ai-tools/readiness-analyzer" element={<ProtectedRoute><ReadinessAnalyzer /></ProtectedRoute>} />
              <Route path="/ai-tools/career-quiz" element={<ProtectedRoute><AICareerQuiz /></ProtectedRoute>} />
              <Route path="/ai-tools/career-comparison" element={<ProtectedRoute><AICareerComparison /></ProtectedRoute>} />
              <Route path="/ai-tools/resume-builder" element={<ProtectedRoute><AIResumeBuilder /></ProtectedRoute>} />
              <Route path="/ai-tools/linkedin-enhancer" element={<ProtectedRoute><AILinkedInEnhancer /></ProtectedRoute>} />
              <Route path="/ai-tools/mock-interview" element={<ProtectedRoute><AIMockInterview /></ProtectedRoute>} />
              <Route path="/ai-tools/internship-email" element={<ProtectedRoute><AIInternshipEmailWriter /></ProtectedRoute>} />
              <Route path="/career-passport" element={<ProtectedRoute><CareerPassport /></ProtectedRoute>} />

              {/* Comparison tools & daily updates */}
              <Route path="/compare" element={<ProtectedRoute><CareerComparison /></ProtectedRoute>} />
              <Route path="/daily-updates" element={<ProtectedRoute><DailyUpdates /></ProtectedRoute>} />

              {/* Parents */}
              <Route path="/parents" element={<Parents />} />

              {/* Dashboards (protected, role-based) */}
              <Route path="/dashboard" element={<DashboardRedirect />} />
              <Route
                path="/student-dashboard"
                element={<ProtectedRoute allow={['student']}><StudentDashboard /></ProtectedRoute>}
              />
              <Route
                path="/parent-dashboard"
                element={<ProtectedRoute allow={['parent']}><ParentDashboard /></ProtectedRoute>}
              />
              <Route
                path="/college-dashboard"
                element={<ProtectedRoute allow={['college']}><CollegeDashboard /></ProtectedRoute>}
              />
              <Route
                path="/recruiter-dashboard"
                element={<ProtectedRoute allow={['recruiter']}><RecruiterDashboard /></ProtectedRoute>}
              />
              <Route
                path="/mentor-dashboard"
                element={<ProtectedRoute allow={['mentor']}><MentorDashboard /></ProtectedRoute>}
              />
              <Route
                path="/admin-dashboard"
                element={<ProtectedRoute allow={['admin']}><AdminDashboard /></ProtectedRoute>}
              />

              {/* Legacy aliases kept for the AI Tools hub / discover cross-links */}
              <Route path="/mentor" element={<Login />} />
              <Route path="/admin" element={<Login />} />

              {/* Misc */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
