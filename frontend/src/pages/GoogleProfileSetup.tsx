import { useMemo, useState } from 'react';
import { Building2, CheckCircle2, GraduationCap, Save, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ROLE_DASHBOARD_PATH, type Role } from '../types/auth';

const roleFields: Record<Exclude<Role, 'admin'>, Array<[string, string, boolean]>> = {
  college: [
    ['collegeName', 'College name', true], ['institutionCode', 'Institution code', true], ['collegeType', 'College type', true],
    ['affiliatedUniversity', 'Affiliated university', true], ['accreditation', 'Accreditation', true], ['officialEmail', 'Official email', true],
    ['contactNumber', 'Contact number', true], ['website', 'Website', true], ['address', 'Address', true], ['district', 'District', true],
    ['state', 'State', true], ['availableCourses', 'Available courses', true], ['placementInformation', 'Placement information', true],
    ['collegeDescription', 'College description', true], ['logo', 'College logo upload', false],
  ],
  student: [['educationLevel', 'Education level', true], ['currentCourseOrClass', 'Current course or class', true], ['stream', 'Stream or department', true], ['marksOrCgpa', 'Marks / CGPA', true], ['location', 'Preferred location', true], ['careerInterest', 'Career interest', true], ['skills', 'Skills', true], ['preferredCourse', 'Preferred course', true], ['preferredCollegeType', 'Preferred college type', true], ['financialRequirement', 'Financial requirement', true]],
  parent: [['childName', 'Student / child name', true], ['relationship', 'Relationship', true], ['location', 'Location', true], ['concerns', 'Career guidance concerns', true]],
  mentor: [['expertise', 'Expertise', true], ['experience', 'Experience', true], ['languages', 'Languages', true], ['mode', 'Online / offline mode', true], ['availability', 'Available slots', true], ['bio', 'Profile description', true]],
  recruiter: [['companyName', 'Company name', true], ['designation', 'Designation', true], ['industry', 'Industry', true], ['website', 'Website', true], ['location', 'Company location', true], ['hiringFocus', 'Hiring focus', true]],
};

export default function GoogleProfileSetup() {
  const { user, setSession } = useAuth();
  const navigate = useNavigate();
  const role = user?.role && user.role !== 'admin' ? user.role : 'student';
  const fields = useMemo(() => roleFields[role], [role]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!user) return null;

  const update = (key: string, value: string) => setValues(current => ({ ...current, [key]: value }));
  const uploadLogo = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update('logo', String(reader.result || file.name));
    reader.readAsDataURL(file);
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setError('');
    try {
      if (role === 'student') {
        await api.saveStudentProfile({ educationLevel: values.educationLevel || '', currentCourseOrClass: values.currentCourseOrClass || '', stream: values.stream || '', marksOrCgpa: Number(values.marksOrCgpa || 0), location: values.location || '', careerInterest: values.careerInterest || '', skills: values.skills || '', preferredCourse: values.preferredCourse || '', preferredCollegeType: values.preferredCollegeType || '', financialRequirement: values.financialRequirement || '' });
      } else {
        await api.saveRoleProfile(values);
      }
      const refreshed = await api.me();
      setSession(localStorage.getItem('cv_auth_token') || '', refreshed);
      navigate(ROLE_DASHBOARD_PATH[refreshed.role], { replace: true });
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save your profile.'); }
    finally { setSaving(false); }
  };

  const Icon = role === 'college' ? Building2 : role === 'student' ? GraduationCap : UserRound;
  return <div className="bg-gradient-to-b from-brand-50/70 via-white to-white py-12"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <div className="mb-8 rounded-3xl border border-brand-100 bg-white p-7 shadow-card"><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-700"><Icon size={16} /> Google profile setup</p><h1 className="mt-2 font-display text-3xl font-bold text-slate-900">Complete your {role} profile to continue.</h1><p className="mt-2 text-slate-600">Google provided only your name, email and profile image. Add your own details below; no demo profile data is used.</p><div className="mt-3 flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 size={16} className="text-emerald-600" /> {user.email}</div></div>
    <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-card md:grid-cols-2">{fields.map(([key, label, required]) => <label key={key} className={['address','availableCourses','placementInformation','collegeDescription','bio','concerns'].includes(key) ? 'md:col-span-2 text-sm font-semibold text-slate-700' : 'text-sm font-semibold text-slate-700'}>{label}{required && <span className="text-rose-500"> *</span>}{key === 'logo' ? <input type="file" accept="image/*" required={required} onChange={e => uploadLogo(e.target.files?.[0])} className="mt-2 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /> : ['address','availableCourses','placementInformation','collegeDescription','bio','concerns'].includes(key) ? <textarea required={required} value={values[key] || ''} onChange={e => update(key,e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" /> : <input required={required} type={key.toLowerCase().includes('email') ? 'email' : key === 'marksOrCgpa' ? 'number' : 'text'} value={values[key] || ''} onChange={e => update(key,e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />}</label>)}
      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 md:col-span-2">{error}</p>}<div className="md:col-span-2"><button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"><Save size={17} /> {saving ? 'Saving profile...' : 'Save profile and continue'}</button></div>
    </form>
  </div></div>;
}
