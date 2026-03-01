import type { Answer, AnimalScores, ChronotypeId, ChronotypeResult, ScoreBreakdown } from '../types';
import { questions } from './questions';

// Pre-compute option map once at module load instead of per-call
const optionMap = new Map<string, AnimalScores>();
for (const q of questions) {
  for (const opt of q.options) {
    optionMap.set(`${q.id}-${opt.id}`, opt.scores);
  }
}

export function calculateChronotype(answers: Answer[]): ChronotypeResult {
  const scores: ScoreBreakdown = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };

  for (const answer of answers) {
    const scores_for_answer = optionMap.get(`${answer.questionId}-${answer.optionId}`);
    if (!scores_for_answer) continue;

    scores.lion += scores_for_answer.lion;
    scores.bear += scores_for_answer.bear;
    scores.wolf += scores_for_answer.wolf;
    scores.dolphin += scores_for_answer.dolphin;
  }

  const total = scores.lion + scores.bear + scores.wolf + scores.dolphin;

  const percentages: ScoreBreakdown =
    total === 0
      ? { lion: 25, bear: 25, wolf: 25, dolphin: 25 }
      : {
          lion: Math.round((scores.lion / total) * 100),
          bear: Math.round((scores.bear / total) * 100),
          wolf: Math.round((scores.wolf / total) * 100),
          dolphin: Math.round((scores.dolphin / total) * 100),
        };

  const winningId = (Object.keys(scores) as ChronotypeId[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );

  return {
    id: winningId,
    scoreBreakdown: scores,
    percentages,
  };
}
