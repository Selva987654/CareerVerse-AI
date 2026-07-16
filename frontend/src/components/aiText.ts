function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*/g, '')
    .trim();
}

export function cleanAIText(text: string) {
  return text
    .replace(/```(?:markdown|md|text)?/gi, '')
    .replace(/```/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      const withBullet = trimmed.replace(/^(?:[-*•])\s+/, '• ');
      return stripInlineMarkdown(withBullet);
    })
    .join('\n')
    .trim();
}
