import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { quizQuestions, quizResults } from '../data/quiz';
import { careers } from '../data/careers';
import { CareerCard } from '../components/CareerCard';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useApp } from '../context/AppContext';

export default function Quiz() {
  const ref = useScrollReveal();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { setQuizResult, markProgress } = useApp();

  const question = quizQuestions[step];
  const progressPct = ((step + (showResult ? 1 : 0)) / quizQuestions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    setSelected(optionIndex);
  };

  const handleNext = () => {
    if (selected === null) return;
    const option = question.options[selected];
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);
    setSelected(null);

    if (step + 1 < quizQuestions.length) {
      setStep(step + 1);
    } else {
      const topKey = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setQuizResult({ resultId: topKey, scores: newScores, takenAt: new Date().toISOString() });
      markProgress('quizDone');
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setScores({});
    setSelected(null);
    setShowResult(false);
  };

  const topResultKey = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];
  const result = topResultKey ? quizResults[topResultKey] : null;
  const maxScore = result ? Math.max(...Object.values(scores)) : 0;

  const matchedCareers = result
    ? careers.filter((c) => result.careers.some((recommended) => recommended.toLowerCase() === c.name.toLowerCase())).slice(0, 4)
    : [];
  const displayedCareers = matchedCareers.length > 0 ? matchedCareers : careers.slice(0, 4);

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Quiz"
          title={showResult ? 'Your Career Match' : 'Discover your career direction.'}
          lead={
            showResult
              ? undefined
              : 'Answer 6 quick questions honestly. There are no wrong answers — only insights about you.'
          }
        />

        {!showResult ? (
          <div data-reveal>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-600 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Question {step + 1} of {quizQuestions.length}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                {question.question}
              </h2>
              <div className="mt-6 space-y-3">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    aria-pressed={selected === i}
                    className={`w-full rounded-xl border p-4 text-left text-sm font-medium transition-all sm:text-base ${
                      selected === i
                        ? 'border-brand-500 bg-brand-50 text-brand-800 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => step > 0 && setStep(step - 1)}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-slate-500 disabled:opacity-40"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step + 1 === quizQuestions.length ? 'See Results' : 'Next'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          result && (
            <div data-reveal>
              <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-indigo-50 p-8 text-center sm:p-10">
                <span className="text-5xl" aria-hidden="true">{result.emoji}</span>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                  {result.title}
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-slate-600">
                  {result.description}
                </p>
              </div>

              {/* DNA-style score breakdown */}
              <div className="mt-8 space-y-3">
                {Object.entries(scores)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([key, val]) => (
                    <div key={key}>
                      <div className="mb-1 flex justify-between text-sm font-medium text-slate-600">
                        <span className="capitalize">{quizResults[key]?.title || key}</span>
                        <span>{Math.round((val / maxScore) * 100)}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-500"
                          style={{ width: `${(val / maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-12">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Careers that match you
                  </h3>
                  {matchedCareers.length === 0 && <p className="mt-2 text-sm text-slate-500">Showing popular demo recommendations based on your strongest quiz result.</p>}
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {displayedCareers.map((c, i) => (
                      <CareerCard key={c.id} career={c} delay={i * 80} />
                    ))}
                  </div>
                </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-brand-300"
                >
                  <RotateCcw size={16} /> Retake Quiz
                </button>
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"
                >
                  Explore All Careers <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
