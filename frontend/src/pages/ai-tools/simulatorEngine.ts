import { careers, Career } from '../../data/careers';

export interface SimulatorInput {
  stage: string;
  interests: string[];
  budget: string;
  workStyle: string;
  dreamCareer: string;
  city: string;
}

const interestToCategory: Record<string, string[]> = {
  tech: ['Technology'],
  science: ['Healthcare', 'Engineering'],
  creative: ['Design', 'Marketing'],
  business: ['Business', 'Commerce'],
  social: ['Education', 'Law'],
  leadership: ['Business', 'Technology'],
};

export interface SimulatorResult {
  career: Career;
  matchScore: number;
  reason: string;
}

export function runCareerSimulator(input: SimulatorInput): SimulatorResult[] {
  const wantedCategories = new Set(
    input.interests.flatMap((i) => interestToCategory[i] ?? [])
  );

  const scored = careers.map((career) => {
    let score = 40; // baseline
    if (wantedCategories.has(career.category)) score += 35;
    if (career.demandLevel === 'Very High') score += 15;
    else if (career.demandLevel === 'High') score += 8;
    if (input.dreamCareer && career.name.toLowerCase().includes(input.dreamCareer.toLowerCase())) score += 25;
    if (input.workStyle === 'independent' && career.tags.includes('Freelance Potential')) score += 10;
    if (input.workStyle === 'team' && career.tags.includes('Leadership')) score += 6;
    if (input.budget === 'low' && (career.category === 'Technology' || career.category === 'Commerce')) score += 5;

    score = Math.max(35, Math.min(98, score));

    const reason = wantedCategories.has(career.category)
      ? `Matches your interest in ${career.category.toLowerCase()} and has ${career.demandLevel.toLowerCase()} demand.`
      : `A strong general option with ${career.demandLevel.toLowerCase()} market demand.`;

    return { career, matchScore: score, reason };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
}
