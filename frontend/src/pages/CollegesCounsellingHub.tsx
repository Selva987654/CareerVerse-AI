import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabBar } from '../components/TabBar';
import Colleges from './Colleges';
import Scholarships from './Scholarships';
import Contact from './Contact';
import EducationLoans from './EducationLoans';
import { useAuth } from '../context/AuthContext';
import { featureIsRelevant, type ProfileFeature } from '../utils/profileAccess';

const tabs: Array<{ id: string; label: string; feature?: ProfileFeature }> = [
  { id: 'colleges', label: 'College Finder', feature: 'colleges' },
  { id: 'counselling', label: 'Career Counselling', feature: 'careers' },
  { id: 'scholarships', label: 'Scholarships', feature: 'scholarships' },
  { id: 'loans', label: 'Education Loans', feature: 'loans' },
];

export default function CollegesCounsellingHub() {
  const { user, profile } = useAuth();
  const visibleTabs = tabs.filter((tab) => !tab.feature || featureIsRelevant(tab.feature, profile, user));
  const [params, setParams] = useSearchParams();
  const initial = params.get('tab') && visibleTabs.some((t) => t.id === params.get('tab')) ? params.get('tab')! : visibleTabs[0].id;
  const [active, setActive] = useState(initial);

  const handleChange = (id: string) => {
    setActive(id);
    setParams({ tab: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <TabBar tabs={visibleTabs} active={active} onChange={handleChange} />
      {active === 'colleges' && <Colleges />}
      {active === 'counselling' && <Contact />}
      {active === 'scholarships' && <Scholarships />}
      {active === 'loans' && <EducationLoans />}
    </div>
  );
}
