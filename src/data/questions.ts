import scoresData from './scores.json';
import type { Question, QuestionCategory } from '../types';

const CATEGORIES: QuestionCategory[] = [
  'wakeTime',
  'energyPeak',
  'mealPattern',
  'exerciseTime',
  'creativity',
  'socialPreference',
  'sleepOnset',
  'weekendHabit',
  'napPreference',
  'eveningActivity',
];

const OPTION_IDS = ['a', 'b', 'c', 'd'] as const;

export const questions: Question[] = CATEGORIES.map((category, i) => {
  const qId = i + 1;
  const qScores = scoresData[String(qId) as keyof typeof scoresData];
  return {
    id: qId,
    category,
    options: OPTION_IDS.map(optId => ({
      id: optId,
      scores: qScores[optId],
    })),
  };
});
