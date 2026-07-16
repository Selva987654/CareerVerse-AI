import { AIToolForm } from '../../components/AIToolForm';

export default function AILinkedInEnhancer() {
  return <AIToolForm title="AI LinkedIn Enhancer" subtitle="Improve headline, about section, project description and weekly LinkedIn post ideas for placement." tool="AI LinkedIn Enhancer" fields={[
    { name: 'headline', label: 'Current headline', placeholder: 'BCA Student | Web Developer' },
    { name: 'about', label: 'Current about section', placeholder: 'Paste your current About section', type: 'textarea' },
    { name: 'skills', label: 'Skills', placeholder: 'React, Java, MySQL, AWS' },
    { name: 'project', label: 'Main project', placeholder: 'CareerVerse AI career guidance platform' },
    { name: 'goal', label: 'Career goal', placeholder: 'Java Full Stack Developer internship' },
  ]} sampleOutput={['Better LinkedIn headline', 'Improved About section', 'Project description for Featured section', 'Skills to add', 'Post caption ideas']} />;
}
