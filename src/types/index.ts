export type ChronotypeId = 'lion' | 'bear' | 'wolf' | 'dolphin';

export interface AnimalScores {
  lion: number;
  bear: number;
  wolf: number;
  dolphin: number;
}

export interface QuestionOption {
  id: 'a' | 'b' | 'c' | 'd';
  scores: AnimalScores;
}

export type QuestionCategory =
  | 'wakeTime'
  | 'energyPeak'
  | 'mealPattern'
  | 'exerciseTime'
  | 'creativity'
  | 'socialPreference'
  | 'sleepOnset'
  | 'weekendHabit'
  | 'napPreference'
  | 'eveningActivity';

export interface Question {
  id: number;
  category: QuestionCategory;
  options: QuestionOption[];
}

export interface Answer {
  questionId: number;
  optionId: 'a' | 'b' | 'c' | 'd';
}

export interface TimelineEntry {
  time: string;
  activity: string;
  color: string;
}

export interface ChronotypeColor {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
}

export interface ChronotypeData {
  id: ChronotypeId;
  emoji: string;
  color: ChronotypeColor;
  percentage: number;
  timeline: TimelineEntry[];
  tips: string[];
}

export interface ScoreBreakdown {
  lion: number;
  bear: number;
  wolf: number;
  dolphin: number;
}

export interface ChronotypeResult {
  id: ChronotypeId;
  scoreBreakdown: ScoreBreakdown;
  percentages: ScoreBreakdown;
}
