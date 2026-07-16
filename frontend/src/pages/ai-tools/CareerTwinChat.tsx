import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { careers } from '../../data/careers';
import { api } from '../../services/api';
import { BackToAITools } from '../../components/BackToAITools';
import { cleanAIText } from '../../components/aiText';

interface Msg { role: 'user' | 'bot'; text: string; }

function getAnswer(question: string): string {
  const q = question.toLowerCase();

  const found = careers.find((c) => q.includes(c.name.toLowerCase()));
  if (found) {
    return `${found.name}: ${found.description} Average salary is ${found.avgSalary}, with demand currently ${found.demandLevel.toLowerCase()}. Eligibility: ${found.eligibility}.`;
  }
  if (q.includes('salary') || q.includes('pay')) {
    return 'Salaries vary a lot by career, city, and company. Open Career Guide and pick a career to see its real salary range and future scope.';
  }
  if (q.includes('stream') || q.includes('10th')) {
    return 'After 10th, common streams are Science, Commerce, Arts, and Vocational. Try the Discover section for a personalised stream suggestion based on your interests.';
  }
  if (q.includes('exam') || q.includes('entrance')) {
    return 'Popular entrance exams include JEE, NEET, CUET, and CLAT depending on your target course. Check Courses & Exams for a full exam guide.';
  }
  if (q.includes('internship')) {
    return 'You can find internships filtered by domain, stipend, and duration in the Internships & Jobs section.';
  }
  return "I'm a demo career assistant using local data right now. Ask me about a specific career (like \"software engineer\" or \"doctor\"), streams, exams, or internships \u2014 or explore the full site for detailed guidance.";
}

export default function CareerTwinChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'bot', text: "Hi! I'm your Career Twin. Ask me about any career, stream, course, exam, internship or placement plan." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesEl = messagesRef.current;
    if (messagesEl) {
      messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    await sendQuestion();
  };

  const sendQuestion = async () => {
    if (loading || !input.trim()) return;
    const userMsg: Msg = { role: 'user', text: input.trim() };
    const question = input.trim();
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const history = messages.slice(-6).map((m) => `${m.role}: ${m.text}`).join('\n');
    const prompt = `
Answer as CareerVerse AI Career Twin.
Give practical Indian student guidance for careers, courses, exams, colleges, internships, placement preparation and parent concerns.
If official dates or links are needed, tell the user to verify the official portal.

Recent chat:
${history}

User question:
${question}
`;
    try {
      const res = await api.askGemini(prompt, 'AI Career Twin Chat');
      setMessages((prev) => [...prev, { role: 'bot', text: res.answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: getAnswer(question) }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void sendQuestion();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <BackToAITools />
      <SectionHeader eyebrow="AI Tools" title="AI Career Twin Chat" lead="Ask career questions and get AI-backed guidance with local fallback support." />

      <div className="flex h-[min(34rem,calc(100vh-15rem))] min-h-[24rem] flex-col rounded-2xl border border-slate-200 bg-white shadow-card">
        <div ref={messagesRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-brand-100 text-brand-600'}`}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </span>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {m.role === 'bot' ? <span className="whitespace-pre-line">{cleanAIText(m.text)}</span> : m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-2">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Bot size={16} />
              </span>
              <div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600">
                <Loader2 size={15} className="inline animate-spin" /> Thinking...
              </div>
            </div>
          )}
        </div>
        <form onSubmit={send} className="flex items-center gap-2 border-t border-slate-100 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Ask about a career, stream, or exam..."
            className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
          <button type="submit" disabled={loading} className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
