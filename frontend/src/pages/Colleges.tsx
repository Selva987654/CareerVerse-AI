import { useMemo, useState } from 'react';
import { Building2, Calculator, ChevronDown, ExternalLink, Filter, MapPin, Search, Star } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { collegeCategories, collegeOfficialLinks, tamilNaduColleges } from '../data/collegeFinder';

const all = 'All';
const artsScienceCommerce = 'Arts & Science & Commerce';
const pageSize = 12;

const categoryOptions = [
  all,
  'Engineering',
  artsScienceCommerce,
  'Medical',
  'Paramedical',
  'Law',
  'Design',
  'Diploma',
  'Computer Applications',
  'Management',
];

const categoryDescriptions: Record<string, string> = {
  All: 'Browse every listed Tamil Nadu college category.',
  Engineering: 'B.E, B.Tech and branch-based TNEA options.',
  'Arts & Science & Commerce': 'B.A, B.Sc, B.Com, BBA and mixed arts-science colleges.',
  Medical: 'MBBS and medical colleges with NEET guidance.',
  Paramedical: 'Nursing, allied health and healthcare programmes.',
  Law: 'Integrated law and LL.B admission options.',
  Design: 'Design, fashion, architecture and portfolio-based courses.',
  Diploma: 'Polytechnic and technical diploma colleges.',
  'Computer Applications': 'BCA, B.Sc CS, IT and MCA-focused colleges.',
  Management: 'BBA, MBA and business-school options.',
};

const matchesSelectedCategory = (collegeCategory: string, selectedCategory: string) => {
  if (selectedCategory === all) return true;
  if (selectedCategory === artsScienceCommerce) return ['Arts', 'Science', 'Commerce'].includes(collegeCategory);
  return collegeCategory === selectedCategory;
};

export default function Colleges() {
  const ref = useScrollReveal();
  const [category, setCategory] = useState(all);
  const [marks, setMarks] = useState('');
  const [community, setCommunity] = useState(all);
  const [district, setDistrict] = useState(all);
  const [course, setCourse] = useState(all);
  const [type, setType] = useState(all);
  const [admission, setAdmission] = useState(all);
  const [branch, setBranch] = useState(all);
  const [query, setQuery] = useState('');
  const [maximumFee, setMaximumFee] = useState('');
  const [hostelRequired, setHostelRequired] = useState('No preference');
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const resetList = () => setVisibleCount(pageSize);

  const districts = useMemo(() => [all, ...Array.from(new Set(tamilNaduColleges.map((c) => c.district))).sort()], []);
  const courses = useMemo(() => [all, ...Array.from(new Set(tamilNaduColleges.filter((c) => matchesSelectedCategory(c.category, category)).flatMap((c) => c.courses))).sort()], [category]);
  const types = useMemo(() => [all, ...Array.from(new Set(tamilNaduColleges.filter((c) => matchesSelectedCategory(c.category, category)).map((c) => c.collegeType))).sort()], [category]);
  const branches = useMemo(() => [all, ...Array.from(new Set(tamilNaduColleges.flatMap((c) => c.branches || []))).sort()], []);
  const officialLinks = useMemo(() => collegeOfficialLinks.filter((link) => link.categories.includes(category)), [category]);

  const filtered = useMemo(() => {
    const markNumber = Number(marks || 0);
    return tamilNaduColleges.filter((c) => {
      const matchesCategory = matchesSelectedCategory(c.category, category);
      const matchesMarks = !marks || markNumber >= c.minMarks;
      const matchesDistrict = district === all || c.district === district;
      const matchesCourse = course === all || c.courses.includes(course);
      const matchesType = type === all || c.collegeType === type;
      const matchesAdmission = admission === all || c.admissionMode.toLowerCase().includes(admission.toLowerCase());
      const matchesBranch = branch === all || (c.branches || []).includes(branch);
      const haystack = `${c.name} ${c.category} ${c.district} ${c.city} ${c.location} ${c.collegeType} ${c.admissionMode} ${c.courses.join(' ')} ${(c.branches || []).join(' ')}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query.toLowerCase());
      return matchesCategory && matchesMarks && matchesDistrict && matchesCourse && matchesType && matchesAdmission && matchesBranch && matchesQuery;
    });
  }, [category, marks, district, course, type, admission, branch, query]);

  const orderedFiltered = useMemo(() => {
    if (category !== all) return filtered;
    const buckets = collegeCategories.map((cat) => filtered.filter((college) => college.category === cat));
    const mixed: typeof filtered = [];
    let row = 0;
    let added = true;
    while (added) {
      added = false;
      buckets.forEach((bucket) => {
        if (bucket[row]) {
          mixed.push(bucket[row]);
          added = true;
        }
      });
      row += 1;
    }
    return mixed;
  }, [category, filtered]);

  const visible = orderedFiltered.slice(0, visibleCount);
  const activeCount = tamilNaduColleges.filter((c) => matchesSelectedCategory(c.category, category)).length;
  const markNumber = Number(marks || 0);
  const communityRelaxation: Record<string, number> = { All: 0, OC: 0, BC: 2, BCM: 2.5, MBC: 3, SC: 5, SCA: 5.5, ST: 6 };
  const predictorColleges = marks ? tamilNaduColleges.filter((c) =>
    matchesSelectedCategory(c.category, category) && (district === all || c.district === district) &&
    (course === all || c.courses.includes(course)) && (branch === all || c.branches?.includes(branch)) &&
    (type === all || c.collegeType === type)
  ).map(c => {
    const target = (c.cutoff || c.minMarks) - (communityRelaxation[community] || 0);
    const gap = markNumber - target;
    return { ...c, target, chance: gap >= 5 ? 'Safe' : gap >= -5 ? 'Moderate-Chance' : 'Ambitious', chancePct: Math.max(15, Math.min(96, Math.round(65 + gap * 4))) };
  }).sort((a, b) => b.chancePct - a.chancePct).slice(0, 12) : [];

  const updateFilter = (setter: (value: string) => void, value: string) => {
    setter(value);
    resetList();
  };

  const selectCategory = (cat: string) => {
    setCategory(cat);
    setCourse(all);
    setType(all);
    setBranch(all);
    resetList();
  };

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Tamil Nadu College Finder"
          title="Find Engineering, Arts & Science, Commerce, Medical, Law and other Tamil Nadu college categories."
          lead="Filters work by category, marks, admission mode, district, course, college type, branch and search. Official links change based on the selected category."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" data-reveal>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`rounded-2xl border p-4 text-left shadow-card transition-all hover:-translate-y-1 ${category === cat ? 'border-brand-500 bg-brand-600 text-white shadow-brand' : 'border-slate-100 bg-white text-slate-800 hover:border-brand-200'}`}
            >
              <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${category === cat ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-600'}`}>
                <Building2 size={18} />
              </span>
              <span className="block font-display text-base font-bold">{cat === all ? 'All Colleges' : cat}</span>
              <span className={`mt-1 block text-xs leading-5 ${category === cat ? 'text-white/80' : 'text-slate-500'}`}>{categoryDescriptions[cat]}</span>
              <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${category === cat ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {tamilNaduColleges.filter((college) => matchesSelectedCategory(college.category, cat)).length} colleges
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[310px_1fr]" data-reveal>
          <aside className="h-fit rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-card">
            <div className="mb-5 flex items-center gap-2">
              <Filter size={18} className="text-brand-600" />
              <h3 className="font-display text-lg font-bold text-slate-900">Filters</h3>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Marks / TNEA Cutoff</span>
                <input value={marks} onChange={(e) => updateFilter(setMarks, e.target.value)} placeholder="e.g. 75 or 190" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Community / Category</span>
                <select value={community} onChange={(e) => updateFilter(setCommunity, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                  {[all, 'OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'].map((x) => <option key={x}>{x}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Admission Mode</span>
                <select value={admission} onChange={(e) => updateFilter(setAdmission, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                  {[all, 'Merit', 'Management quota', 'TNEA', 'TNGASA', 'NEET', 'Entrance', 'University admission'].map((x) => <option key={x}>{x}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">District</span>
                <select value={district} onChange={(e) => updateFilter(setDistrict, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                  {districts.map((d) => <option key={d}>{d}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Course</span>
                <select value={course} onChange={(e) => updateFilter(setCourse, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                  {courses.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              {(category === all || category === 'Engineering') && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700">Preferred Branch</span>
                  <select value={branch} onChange={(e) => updateFilter(setBranch, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                    {branches.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
              )}
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">College Type</span>
                <select value={type} onChange={(e) => updateFilter(setType, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                  {types.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Search name / location</span>
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={query} onChange={(e) => updateFilter(setQuery, e.target.value)} placeholder="Coimbatore, BCA, CSE..." className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
                </div>
              </label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Maximum fee</span><input value={maximumFee} onChange={(e) => setMaximumFee(e.target.value)} placeholder="e.g. Rs. 1,00,000/year" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Hostel requirement</span><select value={hostelRequired} onChange={(e) => setHostelRequired(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"><option>No preference</option><option>Required</option><option>Not required</option></select></label>
              <button onClick={resetList} className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">Search</button>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-4">
              <div className="flex items-center gap-2">
                <Calculator size={17} className="text-brand-600" />
                <h4 className="font-display text-sm font-bold text-slate-900">Cutoff / marks predictor</h4>
              </div>
              {marks ? (
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <p><b>{predictorColleges.length}</b> strong matches found for {marks} marks {community !== all ? `(${community})` : ''}.</p>
                  {predictorColleges.slice(0, 3).map((c) => (
                    <p key={c.id} className="rounded-xl bg-brand-50 px-3 py-2 font-semibold text-brand-800">{c.name} · {c.category} · Min {c.minMarks}{c.cutoff ? ` / TNEA ${c.cutoff}+` : ''}</p>
                  ))}
                  <p className="pt-1 text-[11px] leading-relaxed text-slate-500">This is a guidance estimate only. Verify engineering cutoff from the official TNEA cutoff portal and other admissions from official college/admission portals.</p>
                </div>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-slate-500">Enter marks/cutoff to see suggested colleges. Works for all categories; engineering also shows TNEA cutoff notes.</p>
              )}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-500">Donation is shown as safer <b>management quota/admission mode</b>. Always confirm fee and seat details only from the official portal or college office.</p>
          </aside>

          <section>
            {marks && <div className="mb-8 rounded-3xl border border-brand-100 bg-brand-50 p-5">
              <h2 className="font-display text-2xl font-bold text-slate-900">College cutoff prediction</h2>
              <p className="mt-1 text-sm text-slate-600">Community: {community}. Maximum fee: {maximumFee || 'No limit'}. Hostel: {hostelRequired}.</p>
              {(['Safe', 'Moderate-Chance', 'Ambitious'] as const).map((group) => <div key={group} className="mt-5">
                <h3 className="font-bold text-brand-800">{group} Colleges</h3>
                <div className="mt-2 grid gap-3 xl:grid-cols-2">{predictorColleges.filter((c) => c.chance === group).map((c) => <article key={c.id} className="rounded-2xl bg-white p-4 text-sm shadow-sm">
                  <h4 className="font-bold text-slate-900">{c.name}</h4><p className="mt-1 text-slate-600">{c.district} · {course === all ? c.courses[0] : course} · {branch === all ? (c.branches?.[0] || 'General') : branch}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs"><span>Previous cutoff: {c.cutoff || c.minMarks}</span><span>Estimated chance: {c.chancePct}%</span><span>Fee: {c.feesRange}</span><span>Hostel: Contact college</span><span>Placement rating: {c.rating}/5</span><a className="font-bold text-brand-600" href={c.officialLink} target="_blank" rel="noreferrer">Official website</a></div>
                </article>)}</div>
              </div>)}
              <p className="mt-5 text-xs font-semibold text-slate-600">This prediction is based on sample or previous-year data and does not guarantee admission.</p>
            </div>}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900">{category === all ? 'All Tamil Nadu' : category} Colleges ({filtered.length})</h2>
                <p className="mt-1 text-sm text-slate-500">Total {activeCount} records in this category. Showing {visible.length} now. Use Show More to view all matches.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {officialLinks.map((p) => (
                  <a key={p.name} href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700 hover:bg-brand-100">
                    {p.name} <ExternalLink size={13} />
                  </a>
                ))}
              </div>
            </div>

            {category === 'Medical' && (
              <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                Medical admission usually requires NEET and official counselling. Check the NTA NEET and Tamil Nadu Medical Selection links before applying.
              </div>
            )}

            <div className="grid gap-5 xl:grid-cols-2">
              {visible.map((c) => (
                <article key={c.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition-colors hover:border-brand-200">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">{c.category} · {c.collegeType}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600"><Star size={13} fill="currentColor" /> {c.rating}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{c.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600"><MapPin size={14} /> {c.location}, {c.district}</p>

                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Courses</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.courses.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item}</span>)}
                    </div>
                  </div>

                  {c.branches && (
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Engineering Branches</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {c.branches.map((item) => <span key={item} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{item}</span>)}
                      </div>
                    </div>
                  )}

                  <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                    <p><strong>Min marks:</strong> {c.minMarks}%</p>
                    <p><strong>Admission:</strong> {c.admissionMode}</p>
                    <p><strong>Fees:</strong> {c.feesRange}</p>
                    <p><strong>City:</strong> {c.city}</p>
                    {c.cutoff && <p className="sm:col-span-2"><strong>TNEA cutoff note:</strong> {c.cutoff}+ approx</p>}
                    {c.categoryCutoffs && <p className="sm:col-span-2"><strong>Category/branch note:</strong> {c.categoryCutoffs}</p>}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.highlights.map((h) => <span key={h} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{h}</span>)}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href={c.officialLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Official Link <ExternalLink size={14} /></a>
                    <a href={c.mapLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300">Map</a>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <p className="font-display text-lg font-bold text-slate-900">No colleges found</p>
                <p className="mt-2 text-sm text-slate-500">Try All Colleges, reduce marks, or choose another district/course.</p>
              </div>
            )}

            {visible.length < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button onClick={() => setVisibleCount((count) => count + pageSize)} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700">
                  Show More Colleges <ChevronDown size={16} />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
