import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ExternalLink, FileCheck2, Landmark, Search, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { getStudentStage } from '../utils/profileAccess';

type StudyMode = 'India' | 'Abroad' | 'Both';
type LoanType = 'Government' | 'PSU bank' | 'Private bank' | 'Government portal';
type Collateral = 'No collateral' | 'Conditional' | 'Required';
type InterestBand = 'Below 8%' | '8–10%' | '10%+' | 'Variable';

interface LoanScheme {
  id: string;
  provider: string;
  scheme: string;
  type: LoanType;
  studyMode: StudyMode;
  courseTypes: string[];
  maxAmount: string;
  maxAmountValue: number;
  interestRate: string;
  interestBand: InterestBand;
  repayment: string;
  documents: string[];
  eligibility: string;
  collateral: Collateral;
  deadline: string;
  officialLink: string;
  applyLink: string;
  sourceNote: string;
  stages: Array<'school' | 'college' | 'graduate'>;
}

const commonDocuments = ['Admission / offer letter', 'Academic marksheets and certificates', 'Student and co-applicant KYC', 'Course fee / expense schedule', 'Income proof of co-applicant'];

const loanSchemes: LoanScheme[] = [
  {
    id: 'pm-vidyalaxmi', provider: 'Government of India / Vidya Lakshmi', scheme: 'PM-Vidyalaxmi application portal', type: 'Government portal', studyMode: 'Both',
    courseTypes: ['UG / PG degree', 'Professional course', 'Diploma'], maxAmount: 'Scheme and bank dependent', maxAmountValue: 0, interestRate: 'Bank and scheme specific', interestBand: 'Variable',
    repayment: 'Bank and scheme specific; compare sanctioned terms', documents: commonDocuments, eligibility: 'Indian students with admission to an eligible higher-education institution; subsidy eligibility is scheme-specific.', collateral: 'Conditional', deadline: 'No fixed deadline listed; check the active scheme', officialLink: 'https://www.vidyalakshmi.co.in/Students/', applyLink: 'https://pmvidyalaxmi.co.in/',
    sourceNote: 'The official portal lets students view, apply to and track multiple bank schemes. It does not ask applicants for payment.', stages: ['college', 'graduate'],
  },
  {
    id: 'sbi-student', provider: 'State Bank of India', scheme: 'SBI Student Loan Scheme', type: 'PSU bank', studyMode: 'Both',
    courseTypes: ['UG / PG degree', 'Medical / dental', 'Professional course'], maxAmount: 'India: up to ₹1 crore in eligible cases; abroad: up to ₹7.5 lakh under this scheme', maxAmountValue: 10000000, interestRate: 'From 9.15%–10.15% p.a. on the official rate page; floating', interestBand: '8–10%',
    repayment: 'Up to 15 years after course period + 12-month repayment holiday', documents: [...commonDocuments, 'Passport for studies abroad', 'Officially valid address document'], eligibility: 'Indian nationals with secured admission for higher education in India or abroad, subject to institution, course and credit criteria.', collateral: 'Conditional', deadline: 'Not applicable; apply after admission', officialLink: 'https://sbi.co.in/web/personal-banking/loans/education-loans/student-loan-scheme', applyLink: 'https://sbi.co.in/web/personal-banking/loans/education-loans/student-loan-scheme',
    sourceNote: 'SBI states no collateral / third-party guarantee up to ₹7.5 lakh and tangible collateral above that threshold, subject to terms.', stages: ['college', 'graduate'],
  },
  {
    id: 'sbi-global-ed-vantage', provider: 'State Bank of India', scheme: 'SBI Global Ed-Vantage', type: 'PSU bank', studyMode: 'Abroad',
    courseTypes: ['UG / PG degree', 'Professional course', 'Medical / dental'], maxAmount: 'Up to ₹3 crore with collateral; up to ₹50 lakh without collateral for select institutions', maxAmountValue: 30000000, interestRate: 'From 8.65%–9.15% p.a. on the official rate page; floating', interestBand: '8–10%',
    repayment: 'Up to 15 years after course period + repayment holiday as applicable', documents: [...commonDocuments, 'Passport', 'Visa / travel and university cost documents'], eligibility: 'Indian students admitted to eligible overseas institutions; institution list, co-applicant and security rules apply.', collateral: 'Conditional', deadline: 'Not applicable; apply after admission', officialLink: 'https://sbi.co.in/web/interest-rates/interest-rates/loan-schemes-interest-rates/education-loan-scheme', applyLink: 'https://sbi.co.in/web/personal-banking/loans/education-loans/student-loan-scheme',
    sourceNote: 'SBI publishes separate limits and pricing for select institutions and collateral categories; verify the final sanction terms.', stages: ['college', 'graduate'],
  },
  {
    id: 'baroda-vidya', provider: 'Bank of Baroda', scheme: 'Baroda Vidya Loan', type: 'PSU bank', studyMode: 'India',
    courseTypes: ['School education'], maxAmount: 'Up to ₹4 lakh', maxAmountValue: 400000, interestRate: 'Repo / BRLLR-linked; current rate is published by the bank', interestBand: 'Variable',
    repayment: 'Each yearly sub-limit: 12 equal monthly instalments; first due 12 months after first disbursement of that component', documents: ['KYC of applicant and co-applicant', 'Academic records', 'Proof of school admission', 'Schedule of expenses', 'Income proof where applicable'], eligibility: 'Indian national resident in India; student admitted to an accredited school from Nursery through Class XII; loan is in the parent’s name.', collateral: 'No collateral', deadline: 'Not applicable; apply after school admission', officialLink: 'https://bankofbaroda.bank.in/loans/education-loan/baroda-vidya', applyLink: 'https://bankofbaroda.bank.in/loans/education-loan/baroda-vidya',
    sourceNote: 'Bank of Baroda states no security, no margin and no processing/documentation charges for this school loan, subject to its terms.', stages: ['school'],
  },
  {
    id: 'icici-education', provider: 'ICICI Bank', scheme: 'ICICI Bank Education Loan', type: 'Private bank', studyMode: 'Both',
    courseTypes: ['UG / PG degree', 'Professional course', 'Medical / dental', 'Diploma'], maxAmount: 'India: up to ₹2 crore; international: up to ₹3 crore', maxAmountValue: 30000000, interestRate: 'Profile, institute, course and security dependent', interestBand: 'Variable',
    repayment: 'Up to 15 years, including course period, depending on amount and terms', documents: ['Student and co-applicant KYC', '10+2 / diploma and academic records', 'Admission confirmation', 'Fee and expense documents', 'Income documents for co-applicant'], eligibility: 'Indian applicants aged 16–35 with 10+2 or diploma and admission to a recognised/accredited institution in India or abroad.', collateral: 'Conditional', deadline: 'Not applicable; apply after admission / pre-admission enquiry', officialLink: 'https://www.icicibank.com/personal-banking/loans/education-loan', applyLink: 'https://www.icicibank.com/personal-banking/loans/education-loan',
    sourceNote: 'ICICI says collateral depends on whether the loan is secured; rates vary by applicant, institute and course.', stages: ['college', 'graduate'],
  },
];

const amountFilters = [
  { value: 'all', label: 'Any loan amount' },
  { value: '5', label: 'Up to ₹5 lakh', max: 500000 },
  { value: '25', label: '₹5–25 lakh', min: 500000, max: 2500000 },
  { value: '100', label: '₹25 lakh–₹1 crore', min: 2500000, max: 10000000 },
  { value: 'more', label: 'Above ₹1 crore', min: 10000000 },
];

export default function EducationLoans() {
  const { profile } = useAuth();
  const [search, setSearch] = useState('');
  const [studyMode, setStudyMode] = useState('all');
  const [courseType, setCourseType] = useState('all');
  const [amount, setAmount] = useState('all');
  const [provider, setProvider] = useState('all');
  const [interest, setInterest] = useState('all');
  const [collateral, setCollateral] = useState('all');
  const [location, setLocation] = useState('all');
  const [selected, setSelected] = useState<LoanScheme | null>(null);
  const stage = getStudentStage(profile);
  const profileLocation = profile?.location || 'your location';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const amountRule = amountFilters.find((item) => item.value === amount);
    return loanSchemes.filter((loan) => {
      const searchable = `${loan.provider} ${loan.scheme} ${loan.courseTypes.join(' ')} ${loan.eligibility}`.toLowerCase();
      const textMatch = !q || searchable.includes(q);
      const modeMatch = studyMode === 'all' || loan.studyMode === studyMode || loan.studyMode === 'Both';
      const courseMatch = courseType === 'all' || loan.courseTypes.includes(courseType);
      const amountMatch = amount === 'all' || loan.maxAmountValue === 0 || ((amountRule?.min === undefined || loan.maxAmountValue >= amountRule.min) && (amountRule?.max === undefined || loan.maxAmountValue <= amountRule.max));
      const providerMatch = provider === 'all' || loan.provider === provider;
      const interestMatch = interest === 'all' || loan.interestBand === interest;
      const collateralMatch = collateral === 'all' || loan.collateral === collateral;
      const locationMatch = location === 'all' || location.trim().toLowerCase() === 'india' || loan.studyMode !== 'Abroad';
      return textMatch && modeMatch && courseMatch && amountMatch && providerMatch && interestMatch && collateralMatch && locationMatch;
    }).sort((a, b) => {
      const aScore = a.stages.includes(stage as 'school' | 'college' | 'graduate') ? 1 : 0;
      const bScore = b.stages.includes(stage as 'school' | 'college' | 'graduate') ? 1 : 0;
      return bScore - aScore;
    });
  }, [amount, collateral, courseType, interest, location, provider, search, stage, studyMode]);

  const clearFilters = () => { setSearch(''); setStudyMode('all'); setCourseType('all'); setAmount('all'); setProvider('all'); setInterest('all'); setCollateral('all'); setLocation('all'); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Colleges & Counselling" title="Education Loans" lead="Compare education-finance options from official government portals and bank pages. Use scholarships first, then consider a loan for the remaining eligible expense." />

      <div className="mb-8 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-indigo-50 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-900"><ShieldCheck size={18} className="text-brand-600" /> Personalised funding path</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">For {profileLocation}, we recommend checking relevant scholarships on the <Link to="/scholarships" className="font-semibold text-brand-700 hover:underline">Scholarship Finder</Link> first. Then compare a loan only for the remaining fee, living and course costs.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700"><span className="rounded-full bg-white px-3 py-1.5">1. Scholarships</span><ArrowRight size={14} className="mt-1" /><span className="rounded-full bg-white px-3 py-1.5">2. Remaining cost</span><ArrowRight size={14} className="mt-1" /><span className="rounded-full bg-white px-3 py-1.5">3. Loan eligibility</span></div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Profile signal</p>
          <p className="mt-2 font-display text-lg font-bold text-slate-900">{profile?.financialRequirement || 'Add your financial requirement in your profile'}</p>
          <p className="mt-1 text-sm text-slate-600">Your education level and location help us rank the most relevant schemes. Final approval always belongs to the provider.</p>
        </div>
      </div>

      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="mb-4 flex items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm font-bold text-slate-900"><SlidersHorizontal size={17} className="text-brand-600" /> Search and filter loans</p><button onClick={clearFilters} className="text-xs font-semibold text-brand-700 hover:underline">Reset filters</button></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="relative sm:col-span-2"><span className="sr-only">Search loans</span><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bank, scheme or course" className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>
          <select value={studyMode} onChange={(event) => setStudyMode(event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"><option value="all">Study in India or abroad</option><option value="India">Study in India</option><option value="Abroad">Study abroad</option></select>
          <select value={courseType} onChange={(event) => setCourseType(event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"><option value="all">Any course type</option><option>School education</option><option>UG / PG degree</option><option>Professional course</option><option>Medical / dental</option><option>Diploma</option></select>
          <select value={amount} onChange={(event) => setAmount(event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm">{amountFilters.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
          <select value={provider} onChange={(event) => setProvider(event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"><option value="all">Any bank / provider</option><option>State Bank of India</option><option>Bank of Baroda</option><option>ICICI Bank</option><option>Government of India / Vidya Lakshmi</option></select>
          <select value={interest} onChange={(event) => setInterest(event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"><option value="all">Any interest rate</option><option>Below 8%</option><option>8–10%</option><option>10%+</option><option>Variable</option></select>
          <select value={collateral} onChange={(event) => setCollateral(event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"><option value="all">Any collateral type</option><option>No collateral</option><option>Conditional</option><option>Required</option></select>
          <input value={location === 'all' ? '' : location} onChange={(event) => setLocation(event.target.value || 'all')} placeholder={`Student location (e.g. ${profile?.location || 'Tamil Nadu'})`} className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold text-slate-600">{filtered.length} verified scheme{filtered.length === 1 ? '' : 's'} found</p><p className="text-xs text-slate-400">Rates and eligibility can change; verify on the official page before applying.</p></div>
      {filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center"><p className="font-semibold text-slate-800">No loan schemes match these filters.</p><button onClick={clearFilters} className="mt-3 text-sm font-semibold text-brand-700 hover:underline">Clear filters</button></div> : <div className="grid gap-5 lg:grid-cols-2">{filtered.map((loan) => <LoanCard key={loan.id} loan={loan} recommended={loan.stages.includes(stage as 'school' | 'college' | 'graduate')} onEligibility={() => setSelected(loan)} />)}</div>}

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><p className="font-bold">Safety note</p><p className="mt-1">CareerVerse does not collect loan applications or payments. Use only the official links on each card. Vidya Lakshmi specifically warns applicants about fake websites and payment requests.</p></div>

      {selected && <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-3 sm:items-center" role="dialog" aria-modal="true" aria-label="Loan eligibility checklist"><div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wide text-brand-600">Eligibility checklist</p><h2 className="mt-1 font-display text-xl font-bold text-slate-900">{selected.scheme}</h2><p className="mt-1 text-sm text-slate-500">{selected.provider}</p></div><button onClick={() => setSelected(null)} aria-label="Close" className="rounded-full p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button></div><div className="mt-5 rounded-xl bg-brand-50 p-4"><p className="text-sm font-semibold text-slate-900">Based on your profile</p><p className="mt-1 text-sm text-slate-600">{profile?.educationLevel || 'Education level not added'} · {profile?.currentCourseOrClass || 'Current course/class not added'} · {profile?.location || 'Location not added'}</p></div><p className="mt-5 text-sm leading-6 text-slate-600">{selected.eligibility}</p><p className="mt-4 text-sm font-semibold text-slate-800">Keep these documents ready</p><ul className="mt-2 grid gap-2 sm:grid-cols-2">{selected.documents.map((document) => <li key={document} className="flex gap-2 text-sm text-slate-600"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />{document}</li>)}</ul><div className="mt-5 flex flex-wrap gap-3"><a href={selected.applyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Apply Now <ExternalLink size={14} /></a><a href={selected.officialLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300">Read official terms <ExternalLink size={14} /></a></div></div></div>}
    </div>
  );
}

function LoanCard({ loan, recommended, onEligibility }: { loan: LoanScheme; recommended: boolean; onEligibility: () => void }) {
  return <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"><div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Landmark size={20} /></span><div className="flex flex-wrap justify-end gap-2"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{loan.type}</span>{recommended && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Recommended for you</span>}</div></div><h2 className="mt-4 font-display text-lg font-bold text-slate-900">{loan.scheme}</h2><p className="mt-1 text-xs font-semibold text-slate-500">{loan.provider} · Study {loan.studyMode === 'Both' ? 'in India or abroad' : `in ${loan.studyMode}`}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><Info label="Maximum loan" value={loan.maxAmount} /><Info label="Interest rate" value={loan.interestRate} /><Info label="Repayment" value={loan.repayment} /><Info label="Collateral" value={loan.collateral} /></div><p className="mt-4 text-sm leading-6 text-slate-600">{loan.eligibility}</p><div className="mt-4 flex flex-wrap gap-1.5">{loan.courseTypes.map((course) => <span key={course} className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600">{course}</span>)}</div><p className="mt-4 flex gap-2 text-xs leading-5 text-slate-500"><FileCheck2 size={15} className="mt-0.5 shrink-0 text-brand-600" /> {loan.documents.slice(0, 3).join(' · ')}{loan.documents.length > 3 ? ' · More on official page' : ''}</p><p className="mt-3 text-xs text-slate-500"><span className="font-semibold text-slate-700">Application deadline:</span> {loan.deadline}</p><div className="mt-auto flex flex-wrap gap-2 pt-5"><button onClick={onEligibility} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-700">Check Eligibility <ArrowRight size={14} /></button><a href={loan.applyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:border-brand-300">Apply Now <ExternalLink size={13} /></a></div><a href={loan.officialLink} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline">Official source and terms <ExternalLink size={12} /></a><p className="mt-2 text-[11px] leading-4 text-slate-400">{loan.sourceNote}</p></article>;
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold leading-5 text-slate-800">{value}</p></div>; }
