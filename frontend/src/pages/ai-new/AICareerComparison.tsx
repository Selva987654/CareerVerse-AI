import { AIToolForm } from '../../components/AIToolForm';

export default function AICareerComparison() {
  return <AIToolForm title="AI Career Comparison" subtitle="Compare 2 or 3 careers with eligibility, course path, salary, demand, difficulty and best choice for the student." tool="AI Career Comparison" fields={[
    { name: 'career1', label: 'Career 1', placeholder: 'Software Developer' },
    { name: 'career2', label: 'Career 2', placeholder: 'Data Analyst' },
    { name: 'career3', label: 'Career 3 optional', placeholder: 'UI UX Designer' },
    { name: 'studentProfile', label: 'Student details', placeholder: 'BCA student, React/Java basics, Coimbatore, wants internship', type: 'textarea' },
  ]} sampleOutput={['Side-by-side comparison', 'Eligibility and course needed', 'Skills and projects needed', 'Salary and future demand', 'Final best choice with reason']} />;
}
