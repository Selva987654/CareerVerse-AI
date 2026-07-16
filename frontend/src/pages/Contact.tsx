import { FormEvent, useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CONTACT_EMAIL = 'selvaprivate2006@gmail.com';
const CONTACT_PHONE = '+91 7010612377';
const WHATSAPP_NUMBER = '917010612377';

interface FormData {
  name: string;
  email: string;
  phone: string;
  stage: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const initialForm: FormData = { name: '', email: '', phone: '', stage: '', message: '' };

function enquiryText(data: FormData) {
  return [
    'Career Counselling Enquiry',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Stage: ${data.stage || 'Not selected'}`,
    `Question: ${data.message}`,
  ].join('\n');
}

function whatsappUrl(data: FormData) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiryText(data))}`;
}

function emailUrl(data: FormData) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Career Counselling Enquiry')}&body=${encodeURIComponent(enquiryText(data))}`;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (data.phone.trim() && !/^[0-9+\-\s]{8,15}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Please share a bit more detail (at least 10 characters).';
  }
  return errors;
}

export default function Contact() {
  const ref = useScrollReveal();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      window.open(whatsappUrl(form), '_blank', 'noopener,noreferrer');
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  const handleEmailSend = () => {
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      window.location.href = emailUrl(form);
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  return (
    <div ref={ref} className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Counselling"
          title="Talk to a career counsellor."
          lead="Fill the form below and our team will get back to you within 1-2 business days. Completely free."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2" data-reveal>
            <div className="space-y-5">
              <ContactRow icon={Mail} label="Email" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} />
              <ContactRow icon={Phone} label="Phone / WhatsApp" value={CONTACT_PHONE} href={`https://wa.me/${WHATSAPP_NUMBER}`} />
              <ContactRow icon={MapPin} label="Office" value="Coimbatore, Tamil Nadu, India" />
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                alt="Career counsellor guiding students in a classroom discussion"
                className="h-52 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <p className="font-display text-base font-bold text-slate-900">Free counselling support</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Send your question by WhatsApp or email and get a practical next-step plan.</p>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
              Our counselling sessions cover stream selection, course choice, entrance exam
              planning, and career switching — for students and parents alike.
            </div>
          </div>

          <div className="lg:col-span-3" data-reveal data-reveal-delay="100">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-100 bg-emerald-50 p-10 text-center">
                <CheckCircle2 size={40} className="text-emerald-600" />
                <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                  Message sent successfully
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your enquiry is ready in WhatsApp or email. Send it there so the counsellor receives your details.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                    Open WhatsApp
                  </a>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:border-emerald-300">
                    Send Email
                  </a>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <Field
                  label="Full Name"
                  required
                  error={errors.name}
                  value={form.name}
                  onChange={(v) => handleChange('name', v)}
                  placeholder="e.g. Priya Sharma"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Email Address"
                    required
                    type="email"
                    error={errors.email}
                    value={form.email}
                    onChange={(v) => handleChange('email', v)}
                    placeholder="you@example.com"
                  />
                  <Field
                    label="Phone (optional)"
                    type="tel"
                    error={errors.phone}
                    value={form.phone}
                    onChange={(v) => handleChange('phone', v)}
                    placeholder="+91 9XXXXXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="stage" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    I am a...
                  </label>
                  <select
                    id="stage"
                    value={form.stage}
                    onChange={(e) => handleChange('stage', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="">Select one (optional)</option>
                    <option>10th Completed</option>
                    <option>12th Completed</option>
                    <option>College Student</option>
                    <option>Graduate</option>
                    <option>Working Professional</option>
                    <option>Parent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Your Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us what you'd like guidance on..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 ${
                      errors.message
                        ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs font-medium text-rose-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
                  >
                    Send Message on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleEmailSend}
                    className="w-full rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-brand-300 sm:w-auto"
                  >
                    Send by Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="flex items-center gap-3 rounded-2xl p-1 transition hover:bg-brand-50">
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {content}
    </div>
  );
}

function Field({
  label,
  required,
  type = 'text',
  error,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 ${
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
            : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
