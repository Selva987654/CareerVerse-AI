import { useMemo, useState } from 'react';
import { ExternalLink, Mail, Search, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

type CourseOffer = {
  id: string;
  title: string;
  category: string;
  mode: string;
  duration: string;
  provider: string;
  location: string;
  description: string;
  skills: string[];
  suitableFor: string;
  applyLink: string;
  enquiryEmail: string;
};

const courseOffers: CourseOffer[] = [
  { id: 'indra-data-scientist', title: 'Data Scientist Master Programme', category: 'Data & AI', mode: 'Classroom / Enquiry', duration: 'Job-oriented programme', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'Practical data science learning path covering Python, analytics, machine learning and visualisation tools.', skills: ['Python', 'SQL', 'Machine Learning', 'Tableau', 'Power BI'], suitableFor: 'BCA, B.Sc CS, BE, MCA and graduates moving into data roles.', applyLink: 'https://indrainstitute.com/courses/data-scientist-master-programme/', enquiryEmail: 'enquiry@indrainstitute.com' },
  { id: 'indra-ai', title: 'Artificial Intelligence (AI)', category: 'Data & AI', mode: 'Classroom / Enquiry', duration: 'Skill programme', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'AI training path focused on machine learning, deep learning, Python and generative AI concepts.', skills: ['AI', 'ML', 'Python', 'Deep Learning', 'Generative AI'], suitableFor: 'Students who want AI project, placement and future-ready technical skills.', applyLink: 'https://indrainstitute.com/artificial-intelligence/', enquiryEmail: 'info@indrainstitute.com' },
  { id: 'indra-data-analytics', title: 'Data Analytics', category: 'Data & AI', mode: 'Classroom / Enquiry', duration: 'Short-term job skill course', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'Hands-on analytics course with Python/data handling, reports, dashboards and business insights.', skills: ['Excel', 'Python', 'Data Cleaning', 'Dashboard', 'Analytics'], suitableFor: 'Commerce, BBA, BCA and engineering students interested in analyst roles.', applyLink: 'https://indrainstitute.com/courses/data-analytics/', enquiryEmail: 'enquiry@indrainstitute.com' },
  { id: 'indra-java-cloud', title: 'Java Cloud Architect', category: 'Software Development', mode: 'Classroom / Enquiry', duration: 'Job assured style track', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'Java + cloud focused path for students targeting backend/full-stack/cloud roles.', skills: ['Java', 'Spring Boot', 'Cloud', 'SQL', 'REST API'], suitableFor: 'Java full-stack learners and career switchers.', applyLink: 'https://indrainstitute.com/', enquiryEmail: 'info@indrainstitute.com' },
  { id: 'indra-mern-aws', title: 'MERN Stack with AWS', category: 'Software Development', mode: 'Classroom / Enquiry', duration: 'Project-based programme', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'Modern web development with MongoDB, Express, React, Node and AWS deployment exposure.', skills: ['MongoDB', 'Express', 'React', 'Node.js', 'AWS'], suitableFor: 'Students who want frontend/backend projects and web developer portfolio.', applyLink: 'https://indrainstitute.com/', enquiryEmail: 'enquiry@indrainstitute.com' },
  { id: 'indra-python-cloud', title: 'PyCloud Architect', category: 'Cloud Computing', mode: 'Classroom / Enquiry', duration: 'Skill programme', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'Python + cloud track for automation, backend, cloud basics and modern deployment skills.', skills: ['Python', 'Cloud', 'Automation', 'APIs', 'Linux basics'], suitableFor: 'Students who know basic programming and want cloud-ready skills.', applyLink: 'https://indrainstitute.com/', enquiryEmail: 'info@indrainstitute.com' },
  { id: 'indra-devops', title: 'SNE + Cloud & DevOps', category: 'Cloud Computing', mode: 'Classroom / Enquiry', duration: 'Career track', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'Networking, cloud and DevOps oriented track for infrastructure and deployment careers.', skills: ['Networking', 'Linux', 'Cloud', 'DevOps', 'Deployment'], suitableFor: 'Students interested in system admin, cloud support and DevOps careers.', applyLink: 'https://indrainstitute.com/', enquiryEmail: 'enquiry@indrainstitute.com' },
  { id: 'indra-cyber', title: 'SNE + Cloud & CEH', category: 'Cyber Security', mode: 'Classroom / Enquiry', duration: 'Career track', provider: 'Indra Institute of Education', location: 'Coimbatore', description: 'Networking, cloud and ethical hacking route for cybersecurity foundation learners.', skills: ['Networking', 'Security', 'Cloud', 'Ethical Hacking', 'Linux'], suitableFor: 'Students interested in cyber security support and ethical hacking basics.', applyLink: 'https://indrainstitute.com/', enquiryEmail: 'info@indrainstitute.com' },
];

const categories = ['All', ...Array.from(new Set(courseOffers.map((c) => c.category)))];

export default function TrendingCourses() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => courseOffers.filter((course) => {
    const matchesCategory = category === 'All' || course.category === category;
    const haystack = `${course.title} ${course.category} ${course.description} ${course.skills.join(' ')} ${course.provider}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trending Courses"
          title="Apply for job-oriented courses and training programmes."
          lead="This section focuses on practical course offers, enquiry email, apply link and career usage."
        />
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-card">
          <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search AI, Java, MERN, AWS, Data Science..." className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium" />
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => {
            const mail = `mailto:${course.enquiryEmail}?subject=${encodeURIComponent(`Course Enquiry - ${course.title}`)}&body=${encodeURIComponent(`Dear Indra Institute Team,

I want to know more about ${course.title}.

Name:
Phone:
Qualification:
Preferred timing:

Thank you.`)}`;
            return (
              <article key={course.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700"><Sparkles size={13} /> {course.category}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{course.title}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-700">{course.provider} · {course.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{course.description}</p>
                <div className="mt-4 grid gap-2 text-sm text-slate-700">
                  <p><strong>Mode:</strong> {course.mode}</p>
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Best for:</strong> {course.suitableFor}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{skill}</span>)}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={course.applyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Apply / View <ExternalLink size={14} /></a>
                  <a href={mail} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"><Mail size={14} /> Enquire</a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
