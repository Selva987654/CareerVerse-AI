import { AIToolForm } from '../../components/AIToolForm';

export default function AIInternshipEmailWriter() {
  return <AIToolForm title="AI Internship Email Writer" subtitle="Create a professional internship application email with subject, body and enquiry message." tool="AI Internship Email Writer" fields={[
    { name: 'role', label: 'Internship role', placeholder: 'React Frontend Intern' },
    { name: 'company', label: 'Company name', placeholder: 'AFTEC Global Solutions' },
    { name: 'skills', label: 'Your skills', placeholder: 'HTML, CSS, JavaScript, React' },
    { name: 'projects', label: 'Projects', placeholder: 'CareerVerse AI, SkillSwap', type: 'textarea' },
    { name: 'emailTo', label: 'Apply email', placeholder: 'hr@example.com' },
  ]} sampleOutput={['Email subject', 'Professional application body', 'Short enquiry message', 'Attachment checklist', 'Follow-up message']} />;
}
