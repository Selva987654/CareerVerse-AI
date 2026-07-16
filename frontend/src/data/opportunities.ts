export type OpportunityType = 'Internship' | 'Full-time';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  location: string;
  workMode: string;
  stipendOrSalary: string;
  category: string;
  beginnerFriendly: boolean;
  duration: string;
  eligibility: string;
  skills: string[];
  responsibilities: string[];
  documents: string[];
  selectionProcess: string[];
  applyEmail: string;
  enquiryEmail: string;
  website: string;
  applyNote: string;
}

export const opportunities: Opportunity[] = [
  {
    id: 'frontend-intern',
    title: 'React Frontend Developer Intern',
    company: 'AFTEC Global Solutions',
    type: 'Internship',
    location: 'Coimbatore',
    workMode: 'Hybrid',
    stipendOrSalary: 'Certificate / performance based',
    category: 'Tech',
    beginnerFriendly: true,
    duration: '1 - 3 months',
    eligibility: 'BCA, B.Sc CS, BE CSE or any student with HTML, CSS, JavaScript and React basics.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Responsive UI'],
    responsibilities: ['Build clean React pages', 'Fix UI bugs', 'Connect frontend API calls', 'Test mobile responsive design', 'Prepare daily progress notes'],
    documents: ['Resume PDF', 'GitHub or portfolio link', 'College ID / bonafide if available'],
    selectionProcess: ['Email application', 'Resume screening', 'Small UI task', 'HR/technical discussion'],
    applyEmail: 'ags@aftecglobalsolutions.com',
    enquiryEmail: 'ags@aftecglobalsolutions.com',
    website: 'https://aftecglobalsolutions.com/',
    applyNote: 'Attach resume and project links. Mention CareerVerse AI or SkillSwap if you have built it.'
  },
  {
    id: 'springboot-intern',
    title: 'Java Spring Boot Intern',
    company: 'CareerVerse Demo Company',
    type: 'Internship',
    location: 'Remote',
    workMode: 'Online',
    stipendOrSalary: 'Project / certificate based',
    category: 'Tech',
    beginnerFriendly: true,
    duration: '2 months',
    eligibility: 'Students with Java basics, MySQL basics and interest in backend development.',
    skills: ['Java', 'Spring Boot', 'REST API', 'MySQL', 'Postman'],
    responsibilities: ['Create REST API endpoints', 'Write entity/repository/service code', 'Connect MySQL database', 'Test APIs with Postman'],
    documents: ['Resume PDF', 'GitHub link', 'Small Java project if available'],
    selectionProcess: ['Resume screening', 'Java basics interview', 'Mini backend task'],
    applyEmail: 'careers@careerverse.demo',
    enquiryEmail: 'support@careerverse.demo',
    website: 'https://example.com',
    applyNote: 'Show one Java or full-stack project in your email to improve selection chance.'
  },
  {
    id: 'data-analyst-intern',
    title: 'Data Analyst Intern',
    company: 'InsightEdge Analytics',
    type: 'Internship',
    location: 'Chennai / Remote',
    workMode: 'Remote',
    stipendOrSalary: '₹5,000 - ₹10,000/month',
    category: 'Data',
    beginnerFriendly: true,
    duration: '2 - 4 months',
    eligibility: 'Any degree student with Excel, SQL and basic data analysis knowledge.',
    skills: ['Excel', 'SQL', 'Power BI', 'Python basics', 'Communication'],
    responsibilities: ['Clean datasets', 'Create dashboards', 'Prepare weekly reports', 'Explain insights in simple words'],
    documents: ['Resume PDF', 'Sample dashboard optional', 'LinkedIn profile optional'],
    selectionProcess: ['Resume screening', 'Dataset task', 'Short interview'],
    applyEmail: 'internships@insightedge.example',
    enquiryEmail: 'talent@insightedge.example',
    website: 'https://example.com/insightedge',
    applyNote: 'Attach any Excel/Power BI dashboard screenshot or GitHub notebook if available.'
  },
  {
    id: 'uiux-intern',
    title: 'UI/UX Design Intern',
    company: 'DesignNest Studio',
    type: 'Internship',
    location: 'Chennai',
    workMode: 'Hybrid',
    stipendOrSalary: '₹7,000/month',
    category: 'Design',
    beginnerFriendly: true,
    duration: '2 months',
    eligibility: 'Students with Figma basics and at least one UI redesign or case study.',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'User research', 'Visual design'],
    responsibilities: ['Create wireframes', 'Design mobile screens', 'Improve user flows', 'Present design decisions'],
    documents: ['Resume PDF', 'Figma portfolio link', 'Behance/Dribbble optional'],
    selectionProcess: ['Portfolio review', 'Design task', 'Discussion'],
    applyEmail: 'designjobs@designnest.example',
    enquiryEmail: 'studio@designnest.example',
    website: 'https://example.com/designnest',
    applyNote: 'A small portfolio is more important than only certificates for design roles.'
  },
  {
    id: 'fullstack-job',
    title: 'Junior Full Stack Developer',
    company: 'NextBridge Software',
    type: 'Full-time',
    location: 'Coimbatore',
    workMode: 'On-site',
    stipendOrSalary: '₹3.0 - ₹4.5 LPA',
    category: 'Tech',
    beginnerFriendly: false,
    duration: 'Full time',
    eligibility: 'BCA, B.Sc CS, BE CSE or MCA with at least 2 full-stack projects.',
    skills: ['React', 'Java', 'Spring Boot', 'MySQL', 'Git'],
    responsibilities: ['Build full-stack features', 'Write clean APIs', 'Fix bugs', 'Coordinate with UI team'],
    documents: ['Resume PDF', 'GitHub profile', 'Portfolio link'],
    selectionProcess: ['Resume shortlist', 'Technical test', 'Technical interview', 'HR round'],
    applyEmail: 'jobs@nextbridge.example',
    enquiryEmail: 'hr@nextbridge.example',
    website: 'https://example.com/nextbridge',
    applyNote: 'Mention your strongest project and live demo link in the email.'
  },
  {
    id: 'marketing-job',
    title: 'Digital Marketing Executive',
    company: 'GrowthHive Media',
    type: 'Full-time',
    location: 'Trichy',
    workMode: 'Remote',
    stipendOrSalary: '₹2.2 - ₹3.0 LPA',
    category: 'Marketing',
    beginnerFriendly: true,
    duration: 'Full time',
    eligibility: 'Any degree with marketing interest, content writing and social media basics.',
    skills: ['SEO', 'Social Media', 'Canva', 'Analytics', 'Content writing'],
    responsibilities: ['Manage campaigns', 'Write content', 'Track metrics', 'Improve engagement'],
    documents: ['Resume PDF', 'Sample posts/portfolio optional'],
    selectionProcess: ['Resume shortlist', 'Content task', 'HR discussion'],
    applyEmail: 'careers@growthhive.example',
    enquiryEmail: 'hello@growthhive.example',
    website: 'https://example.com/growthhive',
    applyNote: 'Include two sample post ideas for the company to stand out.'
  }
  ,
  {
    id: 'indra-data-science-internship',
    title: 'Data Science Internship / Training Enquiry',
    company: 'Indra Institute of Education',
    type: 'Internship',
    location: 'Coimbatore',
    workMode: 'Offline / Enquiry',
    stipendOrSalary: 'Training + internship certificate details from institute',
    category: 'Data',
    beginnerFriendly: true,
    duration: 'Flexible / institute schedule',
    eligibility: 'Students from BCA, B.Sc CS, B.Com Analytics, BE, MCA or any graduate interested in data science.',
    skills: ['Python', 'SQL', 'Data Analysis', 'Machine Learning', 'Power BI'],
    responsibilities: ['Attend practical training sessions', 'Work on live/project datasets', 'Build portfolio dashboards', 'Prepare a final mini project', 'Submit daily/weekly learning report'],
    documents: ['Resume PDF', 'College ID if student', 'Basic project or GitHub link if available'],
    selectionProcess: ['Course/internship enquiry', 'Counsellor call', 'Batch confirmation', 'Training and project allocation'],
    applyEmail: 'enquiry@indrainstitute.com',
    enquiryEmail: 'info@indrainstitute.com',
    website: 'https://indrainstitute.com/courses/data-scientist-master-programme/',
    applyNote: 'Mention that you are applying through CareerVerse AI for Data Science internship/training enquiry.'
  },
  {
    id: 'indra-ai-ml-internship',
    title: 'AI & Machine Learning Internship / Course Enquiry',
    company: 'Indra Institute of Education',
    type: 'Internship',
    location: 'Coimbatore',
    workMode: 'Offline / Enquiry',
    stipendOrSalary: 'Training + project certificate details from institute',
    category: 'Tech',
    beginnerFriendly: true,
    duration: 'Flexible / institute schedule',
    eligibility: 'Students with basic programming interest and desire to learn AI, ML, Python and generative AI concepts.',
    skills: ['Python', 'AI', 'Machine Learning', 'Deep Learning', 'Generative AI'],
    responsibilities: ['Learn AI fundamentals', 'Practice Python and ML tasks', 'Build a simple AI mini project', 'Prepare project explanation for resume/viva'],
    documents: ['Resume PDF', 'College ID if student', 'Previous project details optional'],
    selectionProcess: ['Enquiry email', 'Counsellor discussion', 'Eligibility and timing confirmation', 'Batch allocation'],
    applyEmail: 'info@indrainstitute.com',
    enquiryEmail: 'enquiry@indrainstitute.com',
    website: 'https://indrainstitute.com/artificial-intelligence/',
    applyNote: 'Ask about AI course, internship project support, duration, fees and available batches.'
  },
  {
    id: 'indra-java-fullstack-training',
    title: 'Java Full Stack Training / Internship Enquiry',
    company: 'Indra Institute of Education',
    type: 'Internship',
    location: 'Coimbatore',
    workMode: 'Offline / Enquiry',
    stipendOrSalary: 'Training + placement support details from institute',
    category: 'Tech',
    beginnerFriendly: true,
    duration: 'Flexible / institute schedule',
    eligibility: 'BCA, B.Sc CS, BE CSE, MCA or any student wanting Java full-stack project skills.',
    skills: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    responsibilities: ['Learn Java backend basics', 'Build full-stack mini project', 'Practice interview questions', 'Prepare GitHub/project explanation'],
    documents: ['Resume PDF', 'Basic Java project optional', 'College ID if student'],
    selectionProcess: ['Enquiry', 'Batch details', 'Training confirmation', 'Project work'],
    applyEmail: 'enquiry@indrainstitute.com',
    enquiryEmail: 'info@indrainstitute.com',
    website: 'https://indrainstitute.com/',
    applyNote: 'Mention your current Java level and ask for Java full-stack training/internship batch details.'
  },
  {
    id: 'indra-cloud-devops-training',
    title: 'Cloud & DevOps Training / Internship Enquiry',
    company: 'Indra Institute of Education',
    type: 'Internship',
    location: 'Coimbatore',
    workMode: 'Offline / Enquiry',
    stipendOrSalary: 'Training + project/certificate details from institute',
    category: 'Tech',
    beginnerFriendly: true,
    duration: 'Flexible / institute schedule',
    eligibility: 'Students interested in AWS, cloud support, networking and DevOps foundation roles.',
    skills: ['AWS', 'Linux', 'Networking', 'Cloud', 'DevOps'],
    responsibilities: ['Learn cloud basics', 'Practice Linux/networking tasks', 'Build deployment project', 'Prepare cloud resume points'],
    documents: ['Resume PDF', 'College ID if student', 'Any cloud certificate optional'],
    selectionProcess: ['Enquiry', 'Counsellor call', 'Batch confirmation', 'Practical training'],
    applyEmail: 'info@indrainstitute.com',
    enquiryEmail: 'enquiry@indrainstitute.com',
    website: 'https://indrainstitute.com/',
    applyNote: 'Ask about AWS/Cloud/DevOps course duration, project support, fee and placement guidance.'
  }

];

export function getOpportunityById(id?: string) {
  return opportunities.find((item) => item.id === id);
}

export function buildApplicationEmail(item: Opportunity, values: { name?: string; email?: string; phone?: string; message?: string }) {
  return `Dear Hiring Team,\n\nI am interested in applying for the ${item.title} ${item.type === 'Internship' ? 'internship' : 'role'} at ${item.company}.\n\nMy details:\nName: ${values.name || ''}\nEmail: ${values.email || ''}\nPhone: ${values.phone || ''}\n\nRelevant skills: ${item.skills.join(', ')}\n\n${values.message || item.applyNote}\n\nI have attached my resume for your reference.\n\nThank you.`;
}
