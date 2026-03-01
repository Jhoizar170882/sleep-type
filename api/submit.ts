import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'crypto';

const VALID_QUESTION_IDS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const VALID_OPTION_IDS = new Set(['a', 'b', 'c', 'd']);
const VALID_LOCALES = new Set(['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'vi', 'th']);
const CHRONOTYPES = ['lion', 'bear', 'wolf', 'dolphin'] as const;

type Chronotype = typeof CHRONOTYPES[number];
type AnimalScores = Record<Chronotype, number>;

const QUESTION_SCORES: Record<number, Record<string, AnimalScores>> = {
  1: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 1, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 1, dolphin: 3 },
  },
  2: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 0, dolphin: 1 },
    c: { lion: 0, bear: 1, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 1, dolphin: 3 },
  },
  3: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 1, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 1, dolphin: 3 },
  },
  4: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 1, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 1, dolphin: 3 },
  },
  5: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 0, dolphin: 1 },
    c: { lion: 0, bear: 0, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 1, dolphin: 3 },
  },
  6: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 1, wolf: 3, dolphin: 0 },
    d: { lion: 1, bear: 1, wolf: 1, dolphin: 3 },
  },
  7: {
    a: { lion: 3, bear: 2, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 0, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 0, dolphin: 3 },
  },
  8: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 0, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 1, dolphin: 3 },
  },
  9: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 1, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 0, dolphin: 3 },
  },
  10: {
    a: { lion: 3, bear: 1, wolf: 0, dolphin: 0 },
    b: { lion: 1, bear: 3, wolf: 1, dolphin: 0 },
    c: { lion: 0, bear: 0, wolf: 3, dolphin: 1 },
    d: { lion: 0, bear: 0, wolf: 1, dolphin: 3 },
  },
};

function calculateChronotype(answers: { questionId: number; optionId: string }[]) {
  const totals: AnimalScores = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };
  for (const { questionId, optionId } of answers) {
    const scores = QUESTION_SCORES[questionId][optionId];
    for (const animal of CHRONOTYPES) {
      totals[animal] += scores[animal];
    }
  }
  const chronotype = CHRONOTYPES.reduce((best, animal) =>
    totals[animal] > totals[best] ? animal : best
  );
  return { chronotype, scores: totals };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as { answers?: unknown; locale?: unknown } | null;
  const answers = body?.answers;
  const locale = (body?.locale as string) ?? 'ko';

  if (!Array.isArray(answers) || answers.length !== 10) {
    return res.status(400).json({ error: "'answers' must be a list of exactly 10 items" });
  }

  if (!VALID_LOCALES.has(locale)) {
    return res.status(400).json({ error: "'locale' must be one of: 'ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'vi', 'th'" });
  }

  for (const item of answers) {
    if (typeof item !== 'object' || item === null) {
      return res.status(400).json({ error: 'Each answer must be an object' });
    }
    const answer = item as Record<string, unknown>;
    if (!('questionId' in answer) || !('optionId' in answer)) {
      return res.status(400).json({ error: "Each answer must have 'questionId' and 'optionId'" });
    }
    if (typeof answer.questionId !== 'number') {
      return res.status(400).json({ error: "'questionId' must be an integer" });
    }
    if (!VALID_QUESTION_IDS.has(answer.questionId)) {
      return res.status(400).json({ error: "'questionId' must be between 1 and 10" });
    }
    if (!VALID_OPTION_IDS.has(answer.optionId as string)) {
      return res.status(400).json({ error: "'optionId' must be one of: a, b, c, d" });
    }
  }

  const typedAnswers = answers as { questionId: number; optionId: string }[];
  const seenIds = new Set(typedAnswers.map(a => a.questionId));
  if (seenIds.size !== typedAnswers.length) {
    return res.status(400).json({ error: 'Duplicate questionId entries are not allowed' });
  }

  const result = calculateChronotype(typedAnswers);

  const userAgent = (req.headers['user-agent'] ?? '').slice(0, 256) || null;
  const rawIp =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ??
    req.socket?.remoteAddress ??
    '';
  const ipHash = rawIp ? createHash('sha256').update(rawIp).digest('hex') : null;

  const sql = neon(process.env.DATABASE_URL!);

  const rows = await sql`
    INSERT INTO quiz_results (chronotype, scores, locale, user_agent, ip_hash)
    VALUES (${result.chronotype}, ${JSON.stringify(result.scores)}, ${locale}, ${userAgent}, ${ipHash})
    RETURNING (SELECT COUNT(*) FROM quiz_results) AS total_tests
  `;

  const totalTests = Number((rows[0] as { total_tests: string }).total_tests);

  return res.status(201).json({
    chronotype: result.chronotype,
    scores: result.scores,
    totalTests,
  });
}
