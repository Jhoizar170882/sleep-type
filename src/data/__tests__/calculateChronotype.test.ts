import { describe, it, expect } from 'vitest';
import { calculateChronotype } from '../calculateChronotype';
import type { Answer } from '../../types';

describe('calculateChronotype', () => {
  it('returns lion for all-A answers', () => {
    const answers: Answer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: i + 1,
      optionId: 'a' as const,
    }));
    const result = calculateChronotype(answers);
    expect(result.id).toBe('lion');
    expect(result.scoreBreakdown.lion).toBeGreaterThan(result.scoreBreakdown.bear);
    expect(result.scoreBreakdown.lion).toBeGreaterThan(result.scoreBreakdown.wolf);
    expect(result.scoreBreakdown.lion).toBeGreaterThan(result.scoreBreakdown.dolphin);
  });

  it('returns bear for all-B answers', () => {
    const answers: Answer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: i + 1,
      optionId: 'b' as const,
    }));
    const result = calculateChronotype(answers);
    expect(result.id).toBe('bear');
  });

  it('returns wolf for all-C answers', () => {
    const answers: Answer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: i + 1,
      optionId: 'c' as const,
    }));
    const result = calculateChronotype(answers);
    expect(result.id).toBe('wolf');
  });

  it('returns dolphin for all-D answers', () => {
    const answers: Answer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: i + 1,
      optionId: 'd' as const,
    }));
    const result = calculateChronotype(answers);
    expect(result.id).toBe('dolphin');
  });

  it('percentages sum to approximately 100', () => {
    const answers: Answer[] = [
      { questionId: 1, optionId: 'a' },
      { questionId: 2, optionId: 'b' },
      { questionId: 3, optionId: 'c' },
      { questionId: 4, optionId: 'd' },
      { questionId: 5, optionId: 'a' },
      { questionId: 6, optionId: 'b' },
      { questionId: 7, optionId: 'c' },
      { questionId: 8, optionId: 'd' },
      { questionId: 9, optionId: 'a' },
      { questionId: 10, optionId: 'b' },
    ];
    const result = calculateChronotype(answers);
    const sum = Object.values(result.percentages).reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThanOrEqual(98);
    expect(sum).toBeLessThanOrEqual(102);
  });

  it('handles empty answers gracefully', () => {
    const result = calculateChronotype([]);
    expect(result.percentages.lion).toBe(25);
    expect(result.percentages.bear).toBe(25);
    expect(result.percentages.wolf).toBe(25);
    expect(result.percentages.dolphin).toBe(25);
  });

  it('returns valid ChronotypeId', () => {
    const validIds = ['lion', 'bear', 'wolf', 'dolphin'];
    const answers: Answer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: i + 1,
      optionId: (['a', 'b', 'c', 'd'] as const)[i % 4],
    }));
    const result = calculateChronotype(answers);
    expect(validIds).toContain(result.id);
  });

  it('scoreBreakdown values are non-negative', () => {
    const answers: Answer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: i + 1,
      optionId: 'a' as const,
    }));
    const result = calculateChronotype(answers);
    expect(result.scoreBreakdown.lion).toBeGreaterThanOrEqual(0);
    expect(result.scoreBreakdown.bear).toBeGreaterThanOrEqual(0);
    expect(result.scoreBreakdown.wolf).toBeGreaterThanOrEqual(0);
    expect(result.scoreBreakdown.dolphin).toBeGreaterThanOrEqual(0);
  });
});
