import { useState } from 'react';
import { Award, ExternalLink, IndianRupee, Landmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';

type Category = 'Merit' | 'Need-based' | 'Community' | 'Girls' | 'Sports' | 'Technical' | 'Tamil Nadu';

interface Scholarship {
  name: string;
  provider: string;
  eligibility: string;
  amount: string;
  category: Category;
  link: string;
  note: string;
}

const scholarships: Scholarship[] = [
  { name: 'Central Sector Scheme of Scholarship', provider: 'Government of India / National Scholarship Portal', eligibility: 'Class 12 top percentile students with family income criteria as per official rules.', amount: 'Annual scholarship as per NSP rules', category: 'Merit', link: 'https://scholarships.gov.in/', note: 'Use NSP for latest dates and renewal rules.' },
  { name: 'Post-Matric Scholarship', provider: 'National Scholarship Portal / State portals', eligibility: 'Eligible SC/ST/OBC/minority/community students after 10th as per income/category rules.', amount: 'Tuition support + maintenance allowance where applicable', category: 'Community', link: 'https://scholarships.gov.in/', note: 'Check both central and Tamil Nadu scholarship portals.' },
  { name: 'AICTE Pragati Scholarship for Girls', provider: 'AICTE', eligibility: 'Girl students admitted to AICTE-approved technical diploma/degree courses as per official notification.', amount: 'Up to official yearly scholarship limit', category: 'Girls', link: 'https://www.aicte-india.org/', note: 'Good for diploma/engineering girls in technical education.' },
  { name: 'AICTE Saksham Scholarship', provider: 'AICTE', eligibility: 'Specially-abled students in AICTE-approved technical courses as per official eligibility.', amount: 'As per AICTE notification', category: 'Technical', link: 'https://www.aicte-india.org/', note: 'Verify disability percentage, income and course approval.' },
  { name: 'Tamil Nadu Government Scholarship Portal', provider: 'Government of Tamil Nadu', eligibility: 'Tamil Nadu students under eligible community/income/course rules.', amount: 'Varies by scheme', category: 'Tamil Nadu', link: 'https://tnadtwscholarship.tn.gov.in/', note: 'Use official TN portal or college office for scheme-specific details.' },
  { name: 'Tamil Nadu First Graduate Concession', provider: 'Government of Tamil Nadu / Counselling process', eligibility: 'First graduate students subject to official counselling and certificate rules.', amount: 'Fee concession where applicable', category: 'Tamil Nadu', link: 'https://www.tneaonline.org/', note: 'Useful for engineering counselling; verify with TNEA/college office.' },
  { name: 'National Means-cum-Merit Scholarship', provider: 'Government of India / State education departments', eligibility: 'Eligible school students based on income and qualifying examination.', amount: 'As per NMMS rules', category: 'Need-based', link: 'https://scholarships.gov.in/', note: 'For school-level financial support.' },
  { name: 'Minority Scholarship Schemes', provider: 'Government minority scholarship portals', eligibility: 'Students from notified minority communities as per income/course rules.', amount: 'Tuition and maintenance support where applicable', category: 'Community', link: 'https://scholarships.gov.in/', note: 'Always confirm current availability and deadlines.' },
  { name: 'Sports Scholarship / Talent Support', provider: 'Sports Authority / State sports bodies', eligibility: 'State/national level sports achievers based on official sports certificates.', amount: 'Varies by achievement and scheme', category: 'Sports', link: 'https://yas.nic.in/', note: 'Students should keep certificates and event records ready.' },
  { name: 'Institution Merit Scholarship', provider: 'College / University', eligibility: 'High marks or rank during admission or semester performance.', amount: 'Fee waiver / concession varies by college', category: 'Merit', link: '#', note: 'Ask the college admission office before joining.' },
  { name: 'Private Foundation Scholarship', provider: 'NGO / trust / foundation', eligibility: 'Usually merit + family income + course criteria.', amount: 'Varies by foundation', category: 'Need-based', link: '#', note: 'Verify authenticity before sharing documents.' },
  { name: 'Single Girl Child / Women Education Support', provider: 'Government / institution schemes', eligibility: 'Girl students as per official scheme rules.', amount: 'Varies by scheme', category: 'Girls', link: 'https://scholarships.gov.in/', note: 'Useful for arts, science, commerce and technical education.' },
];

const categories = ['All', 'Merit', 'Need-based', 'Community', 'Girls', 'Sports', 'Technical', 'Tamil Nadu'] as const;

export default function Scholarships() {
  const [filter, setFilter] = useState<typeof categories[number]>('All');
  const filtered = filter === 'All' ? scholarships : scholarships.filter((s) => s.category === filter);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Colleges & Counselling" title="Scholarship Finder" lead="More scholarship options for Tamil Nadu, technical courses, girls, community, need-based and merit students. Always verify dates and eligibility on official portals." />
      <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-brand-50 to-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="flex items-center gap-2 text-sm font-bold text-slate-900"><Landmark size={17} className="text-brand-600" /> Fund your education in the right order</p><p className="mt-1 text-sm text-slate-600">Check scholarships first, then compare verified education-loan schemes for the remaining cost.</p></div>
        <Link to="/education-loans" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">Compare loans <ArrowRight size={15} /></Link>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === c ? 'bg-brand-600 text-white shadow-brand' : 'border border-slate-200 text-slate-600 hover:border-brand-300'}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Award size={18} /></span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{s.category}</span>
            </div>
            <h3 className="font-display font-bold text-slate-900">{s.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{s.provider}</p>
            <p className="mt-2 text-sm text-slate-600">{s.eligibility}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-brand-700"><IndianRupee size={14} /> {s.amount}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{s.note}</p>
            {s.link !== '#' && <a href={s.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-brand-300">Official / Info Link <ExternalLink size={13} /></a>}
          </div>
        ))}
      </div>
    </div>
  );
}
