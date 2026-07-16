import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabBar } from '../components/TabBar';
import Careers from './Careers';
import CareerSwitch from './CareerSwitch';

const tabs = [
  { id: 'careers', label: 'Explore Careers' },
  { id: 'switch', label: 'Career Switch' },
];

export default function CareerGuideHub() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('tab') && tabs.some((t) => t.id === params.get('tab')) ? params.get('tab')! : 'careers';
  const [active, setActive] = useState(initial);

  const handleChange = (id: string) => {
    setActive(id);
    setParams({ tab: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <TabBar tabs={tabs} active={active} onChange={handleChange} />
      {active === 'careers' && <Careers />}
      {active === 'switch' && <CareerSwitch />}
    </div>
  );
}
