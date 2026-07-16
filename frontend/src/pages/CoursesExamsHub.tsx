import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabBar } from '../components/TabBar';
import Courses from './Courses';
import Exams from './Exams';

const tabs = [
  { id: 'courses', label: 'Courses' },
  { id: 'exams', label: 'Entrance Exams' },
];

export default function CoursesExamsHub() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('tab') && tabs.some((t) => t.id === params.get('tab')) ? params.get('tab')! : 'courses';
  const [active, setActive] = useState(initial);

  const handleChange = (id: string) => {
    setActive(id);
    setParams({ tab: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <TabBar tabs={tabs} active={active} onChange={handleChange} />
      {active === 'courses' && <Courses />}
      {active === 'exams' && <Exams />}
    </div>
  );
}
