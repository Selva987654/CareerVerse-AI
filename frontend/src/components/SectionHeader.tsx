interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
}

export function SectionHeader({ eyebrow, title, lead, center = true }: Props) {
  return (
    <div
      data-reveal
      className={`mx-auto mb-12 max-w-2xl ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-slate-600">{lead}</p>}
    </div>
  );
}
