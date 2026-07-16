import { Check, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cleanAIText } from './aiText';

type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; rows: string[][] };

interface AIOutputProps {
  title?: string;
  text: string;
}

function cleanLine(line: string) {
  return line.replace(/\s+/g, ' ').trim();
}

function normalizeOutput(text: string) {
  return text
    .replace(/```(?:markdown|md|text)?/gi, '')
    .replace(/```/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\r/g, '')
    .trim();
}

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*/g, '')
    .trim();
}

function removeMarkdownWrapper(text: string) {
  return text
    .replace(/^\d+[.)]\s+/, '')
    .replace(/^#{1,6}\s+/, '')
    .replace(/^\*\*(.+)\*\*:?\s*$/, '$1')
    .trim();
}

function isTableLine(line: string) {
  return line.includes('|') && line.split('|').filter((cell) => cell.trim()).length >= 2;
}

function isTableSeparator(line: string) {
  return /^[\s|:-]+$/.test(line) && line.includes('-');
}

function parseTableRow(line: string) {
  return line
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);
}

function parseOutput(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = normalizeOutput(text).split('\n').map(cleanLine);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line) {
      index += 1;
      continue;
    }

    if (isTableLine(line)) {
      const rows: string[][] = [];
      while (index < lines.length && isTableLine(lines[index])) {
        if (!isTableSeparator(lines[index])) rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      if (rows.length > 0) blocks.push({ type: 'table', rows });
      continue;
    }

    const markdownHeading = line.match(/^#{1,6}\s+(.+)$/);
    const numberedHeading = line.match(/^\d+[.)]\s+([A-Z][A-Za-z0-9\s/&(),-]{3,80}):?$/);
    const boldHeading = line.match(/^\*\*(.+?)\*\*:?\s*$/);
    const colonHeading = line.match(/^([A-Z][A-Za-z0-9\s/&(),-]{3,80}):$/);
    if (markdownHeading || numberedHeading || boldHeading || colonHeading) {
      blocks.push({ type: 'heading', text: stripInlineMarkdown(removeMarkdownWrapper(markdownHeading?.[1] ?? numberedHeading?.[1] ?? boldHeading?.[1] ?? colonHeading?.[1] ?? line)) });
      index += 1;
      continue;
    }

    const ordered = line.match(/^(\d+)[.)]\s+(.+)$/);
    const bullet = line.match(/^(?:[-*]|\u2022)\s+(.+)$/);
    if (ordered || bullet) {
      const orderedList = Boolean(ordered);
      const items: string[] = [];
      while (index < lines.length) {
        const current = lines[index];
        const currentOrdered = current.match(/^(\d+)[.)]\s+(.+)$/);
        const currentBullet = current.match(/^(?:[-*]|\u2022)\s+(.+)$/);
        if (orderedList && currentOrdered) {
          items.push(currentOrdered[2].trim());
          index += 1;
          continue;
        }
        if (!orderedList && currentBullet) {
          items.push(currentBullet[1].trim());
          index += 1;
          continue;
        }
        break;
      }
      blocks.push({ type: 'list', ordered: orderedList, items });
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index];
      if (
        !next ||
        isTableLine(next) ||
        /^#{1,6}\s+/.test(next) ||
        /^\d+[.)]\s+([A-Z][A-Za-z0-9\s/&(),-]{3,80}):?$/.test(next) ||
        /^\*\*(.+?)\*\*:?\s*$/.test(next) ||
        /^([A-Z][A-Za-z0-9\s/&(),-]{3,80}):$/.test(next) ||
        /^(\d+)[.)]\s+/.test(next) ||
        /^(?:[-*]|\u2022)\s+/.test(next)
      ) {
        break;
      }
      paragraph.push(next);
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
}

function InlineText({ text }: { text: string }) {
  return <>{stripInlineMarkdown(text)}</>;
}

function splitLead(text: string) {
  const clean = removeMarkdownWrapper(text)
    .replace(/^\*\*(.+?)\*\*:?\s*(.+)$/g, '$1: $2')
    .replace(/^(.+?)\*\*:\s*(.+)$/g, '$1: $2');
  const colon = clean.indexOf(':');
  if (colon > 0 && colon < 52) {
    return {
      lead: stripInlineMarkdown(clean.slice(0, colon)),
      body: clean.slice(colon + 1).trim(),
    };
  }
  return { lead: stripInlineMarkdown(clean), body: '' };
}

export function AIOutput({ title = 'AI Result', text }: AIOutputProps) {
  const [copied, setCopied] = useState(false);
  const blocks = parseOutput(text);

  const copy = () => {
    navigator.clipboard?.writeText(cleanAIText(text)).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-100 bg-gradient-to-r from-brand-50 to-indigo-50 px-5 py-4 sm:px-6">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-brand">
            <Sparkles size={18} />
          </span>
          {title}
        </h2>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700 shadow-sm hover:border-brand-300"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {blocks.map((block, blockIndex) => {
          if (block.type === 'heading') {
            return (
              <div key={`${block.text}-${blockIndex}`} className="rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3">
                <h3 className="font-display text-base font-bold text-slate-950 sm:text-lg">
                  <InlineText text={block.text} />
                </h3>
              </div>
            );
          }

          if (block.type === 'paragraph') {
            const { lead, body } = splitLead(block.text);
            if (body) {
              return (
                <div key={`${block.text}-${blockIndex}`} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-bold text-slate-950"><InlineText text={lead} /></p>
                  <p className="mt-1.5 text-sm leading-7 text-slate-700"><InlineText text={body} /></p>
                </div>
              );
            }

            return (
              <p key={`${block.text}-${blockIndex}`} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">
                <InlineText text={block.text} />
              </p>
            );
          }

          if (block.type === 'table') {
            return (
              <div key={`table-${blockIndex}`} className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${row.join('-')}-${rowIndex}`} className={rowIndex === 0 ? 'bg-slate-50 font-bold text-slate-900' : 'bg-white text-slate-700'}>
                        {row.map((cell) => (
                          <td key={cell} className="px-4 py-3 align-top">
                            <InlineText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          const Tag = block.ordered ? 'ol' : 'ul';
          return (
            <Tag key={`list-${blockIndex}`} className="space-y-2.5">
              {block.items.map((item, itemIndex) => {
                const { lead, body } = splitLead(item);
                return (
                  <li key={`${item}-${itemIndex}`} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shadow-sm">
                      {block.ordered ? itemIndex + 1 : <CheckCircle2 size={15} />}
                    </span>
                    <div className="min-w-0 text-sm leading-7">
                      <span className="font-bold text-slate-950"><InlineText text={lead} /></span>
                      {body && <span className="text-slate-700">: <InlineText text={body} /></span>}
                    </div>
                  </li>
                );
              })}
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
