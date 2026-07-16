import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { faqs } from '../data/faq';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FAQ() {
  const ref = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions."
          lead="Quick, honest answers to the questions students and parents ask us most."
        />

        <div className="space-y-3" data-reveal>
          {faqs.map((item, i) => (
            <div key={item.question} className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-display font-bold text-slate-900">{item.question}</span>
                <span className="flex-shrink-0 text-2xl leading-none text-slate-400">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center"
          data-reveal
        >
          <p className="font-display font-bold text-slate-900">Still have a question?</p>
          <p className="mt-1 text-sm text-slate-600">
            Talk to one of our career counsellors — it's free.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"
          >
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
