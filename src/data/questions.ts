import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    category: 'wakeTime',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 2,
    category: 'energyPeak',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } },
      { id: 'c', scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 3,
    category: 'mealPattern',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 4,
    category: 'exerciseTime',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 5,
    category: 'creativity',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } },
      { id: 'c', scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 6,
    category: 'socialPreference',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 1, wolf: 3, dolphin: 0 } },
      { id: 'd', scores: { lion: 1, bear: 1, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 7,
    category: 'sleepOnset',
    options: [
      { id: 'a', scores: { lion: 3, bear: 2, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 0, dolphin: 3 } },
    ],
  },
  {
    id: 8,
    category: 'weekendHabit',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 9,
    category: 'napPreference',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 0, dolphin: 3 } },
    ],
  },
  {
    id: 10,
    category: 'eveningActivity',
    options: [
      { id: 'a', scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { id: 'b', scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { id: 'c', scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { id: 'd', scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
];
