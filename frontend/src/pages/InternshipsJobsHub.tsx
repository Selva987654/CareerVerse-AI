import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabBar } from '../components/TabBar';
import Jobs from './Jobs';
import TrendingCourses from './TrendingCourses';
import PlacementTraining from './PlacementTraining';
import { useAuth } from '../context/AuthContext';
import { featureIsRelevant, type ProfileFeature } from '../utils/profileAccess';

const tabs: Array<{ id: string; label: string; feature?: ProfileFeature }> = [
  { id: 'jobs', label: 'Jobs & Internships', feature: 'internships' },
  { id: 'courses', label: 'Trending Courses', feature: 'courses' },
  { id: 'training', label: 'Placement Training', feature: 'placement' },
];

export default function InternshipsJobsHub() {
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
      {active === 'jobs' && <Jobs />}
      {active === 'courses' && <TrendingCourses />}
      {active === 'training' && <PlacementTraining />}
    </div>
  );
}
