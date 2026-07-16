import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabBar } from '../components/TabBar';
import Discover from './Discover';
import Quiz from './Quiz';
import Streams from './Streams';
import CareerComparison from './CareerComparison';
import { useAuth } from '../context/AuthContext';
import { featureIsRelevant, type ProfileFeature } from '../utils/profileAccess';

const tabs: Array<{ id: string; label: string; feature?: ProfileFeature }> = [
  { id: 'assessment', label: 'Career Assessment', feature: 'careers' },
  { id: 'quiz', label: 'Career Quiz', feature: 'careers' },
  { id: 'streams', label: 'Stream Selector', feature: 'streams' },
  { id: 'compare', label: 'Career Comparison', feature: 'careers' },
];

export default function DiscoverHub() {
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
      {active === 'assessment' && <Discover />}
      {active === 'quiz' && <Quiz />}
      {active === 'streams' && <Streams />}
      {active === 'compare' && <CareerComparison />}
    </div>
  );
}
