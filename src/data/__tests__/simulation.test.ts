import { describe, it, expect } from 'vitest';
import { calculateChronotype } from '../calculateChronotype';
import type { Answer } from '../../types';

const makeAnswers = (options: string[]): Answer[] =>
  options.map((opt, i) => ({ questionId: i + 1, optionId: opt as Answer['optionId'] }));

describe('Quiz Simulation Tests', () => {
  it('Sim1: Extreme morning person → Lion', () => {
    const result = calculateChronotype(makeAnswers(['a','a','a','a','a','a','a','a','a','a']));
    expect(result.id).toBe('lion');
    expect(result.scoreBreakdown.lion).toBe(30);
    expect(result.percentages.lion).toBeGreaterThan(50);
  });

  it('Sim2: Standard rhythm person → Bear', () => {
    const result = calculateChronotype(makeAnswers(['b','b','b','b','b','b','b','b','b','b']));
    expect(result.id).toBe('bear');
    expect(result.scoreBreakdown.bear).toBe(30);
  });

  it('Sim3: Night owl → Wolf', () => {
    const result = calculateChronotype(makeAnswers(['c','c','c','c','c','c','c','c','c','c']));
    expect(result.id).toBe('wolf');
    expect(result.scoreBreakdown.wolf).toBe(30);
  });

  it('Sim4: Irregular sleeper → Dolphin', () => {
    const result = calculateChronotype(makeAnswers(['d','d','d','d','d','d','d','d','d','d']));
    expect(result.id).toBe('dolphin');
    expect(result.scoreBreakdown.dolphin).toBe(30);
  });

  it('Sim5: Mostly Lion with Bear tendencies', () => {
    const result = calculateChronotype(makeAnswers(['a','a','a','a','b','b','a','a','a','a']));
    expect(result.id).toBe('lion');
    expect(result.scoreBreakdown.lion).toBeGreaterThan(result.scoreBreakdown.bear);
  });

  it('Sim6: Mostly Wolf with Dolphin tendencies', () => {
    const result = calculateChronotype(makeAnswers(['c','c','d','c','c','c','d','c','c','c']));
    expect(result.id).toBe('wolf');
    expect(result.scoreBreakdown.wolf).toBeGreaterThan(result.scoreBreakdown.dolphin);
  });

  it('Sim7: Mixed A-B-C-D pattern resolves correctly', () => {
    const result = calculateChronotype(makeAnswers(['a','b','c','d','a','b','c','d','a','b']));
    expect(['lion', 'bear', 'wolf', 'dolphin']).toContain(result.id);
    Object.values(result.scoreBreakdown).forEach(score => {
      expect(score).toBeGreaterThanOrEqual(0);
    });
  });

  it('Sim8: Realistic Bear scenario', () => {
    const result = calculateChronotype(makeAnswers(['b','b','b','b','b','b','b','b','b','b']));
    expect(result.id).toBe('bear');
  });

  it('Sim9: Realistic late-night worker', () => {
    const result = calculateChronotype(makeAnswers(['c','c','c','c','c','c','c','c','c','c']));
    expect(result.id).toBe('wolf');
  });

  it('Sim10: Lion-Bear borderline', () => {
    const result = calculateChronotype(makeAnswers(['a','b','a','b','a','b','a','b','a','b']));
    expect(['lion', 'bear']).toContain(result.id);
    const diff = Math.abs(result.scoreBreakdown.lion - result.scoreBreakdown.bear);
    expect(diff).toBeLessThanOrEqual(10);
  });

  it('Sim11: Percentages sum check across all pure types', () => {
    for (const opt of ['a', 'b', 'c', 'd']) {
      const result = calculateChronotype(makeAnswers(Array(10).fill(opt)));
      const sum = Object.values(result.percentages).reduce((a, b) => a + b, 0);
      expect(sum).toBeGreaterThanOrEqual(98);
      expect(sum).toBeLessThanOrEqual(102);
    }
  });

  it('Sim12: Winner has highest score in various combos', () => {
    const combos = [
      ['a','a','a','b','b','c','d','a','a','a'],
      ['b','b','b','a','c','b','b','d','b','b'],
      ['c','c','d','c','c','c','b','c','c','c'],
      ['d','d','d','d','c','b','d','d','d','d'],
    ];
    for (const combo of combos) {
      const result = calculateChronotype(makeAnswers(combo));
      const maxScore = Math.max(...Object.values(result.scoreBreakdown));
      expect(result.scoreBreakdown[result.id]).toBe(maxScore);
    }
  });
});
