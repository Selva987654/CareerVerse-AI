import { useState } from 'react';
import { CheckCircle2, MessageCircleQuestion } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const commonQuestions = [
  {
    q: 'Is engineering still worth it for my child?',
    a: 'Yes, if your child genuinely enjoys Math and problem-solving. Engineering still offers strong salaries and job security, especially in software, electronics, and core branches with skills. Avoid choosing it only because it is "safe" — interest matters more than ever in a competitive market.',
  },
  {
    q: 'My child wants to pursue Arts/Design instead of a "standard" career. Should I allow it?',
    a: "Creative and humanities careers — design, journalism, civil services, psychology — have grown significantly in income and respect over the last decade. What matters most is your child's genuine interest and willingness to work hard. A career chosen with passion usually outperforms one chosen out of fear.",
  },
  {
    q: 'How much should I push my child toward a particular stream?',
    a: "Guide, don't dictate. Share information about options, costs, and outcomes — then let your child make an informed choice. Decisions made under pressure often lead to dropouts or unhappiness later, even in safe careers.",
  },
  {
    q: 'What if my child fails an entrance exam?',
    a: 'One exam does not define a career. There are multiple paths to every field — state-level colleges, diploma-to-degree routes, and skill-based certifications. Encourage resilience and explore backup options early.',
  },
];

export default function Parents() {
  const ref = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Parent Guidance"
          title="Simple, honest guidance to support your child's career journey."
          lead="No jargon, no pressure tactics — just clear information to help you have better conversations with your child about their future."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal>
          <TipCard title="Listen first" desc="Understand what your child enjoys before suggesting a path." />
          <TipCard title="Share real data" desc="Use salary and growth facts instead of opinions or comparisons." />
          <TipCard title="Allow exploration" desc="Let them try internships, courses, or projects before committing." />
        </div>

        <div className="mt-14" data-reveal>
          <h3 className="font-display text-xl font-bold text-slate-900">
            Common questions parents ask
          </h3>
          <div className="mt-6 space-y-3">
            {commonQuestions.map((item, i) => (
              <div key={item.q} className="rounded-2xl border border-slate-100 bg-white shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="flex items-center gap-3 font-display font-bold text-slate-900">
                    <MessageCircleQuestion size={18} className="flex-shrink-0 text-brand-600" />
                    {item.q}
                  </span>
                  <span className="flex-shrink-0 text-2xl text-slate-400">
                    {openIndex === i ? '−' : '+'}
                  </span>
                </button>
                {openIndex === i && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-14 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-10"
          data-reveal
        >
          <h3 className="font-display text-xl font-bold text-slate-900">
            A simple cost-planning checklist
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Use this to plan finances for your child's education realistically.
          </p>
          <ul className="mt-5 space-y-3">
            {[
              'Estimate total course fees (tuition + hostel + materials)',
              'Check government and private scholarships for the course',
              'Compare education loan interest rates from 2–3 banks',
              'Set aside a separate emergency fund for unexpected costs',
              'Discuss budget openly with your child before college selection',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TipCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
      <p className="font-display font-bold text-slate-900">{title}</p>
      <p className="mt-1.5 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
