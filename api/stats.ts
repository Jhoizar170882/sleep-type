import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const CHRONOTYPES = ['lion', 'bear', 'wolf', 'dolphin'] as const;
const STATS_CACHE_TTL = 60_000;

let statsCache: { totalTests: number; distribution: Record<string, number> } | null = null;
let statsCacheTime = 0;

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const now = Date.now();
  if (statsCache && now - statsCacheTime < STATS_CACHE_TTL) {
    return res.status(200).json(statsCache);
  }

  const sql = neon(process.env.DATABASE_URL!);

  const [countRow, rows] = await Promise.all([
    sql`SELECT COUNT(*)::int AS total FROM quiz_results`,
    sql`SELECT chronotype, COUNT(*)::int AS cnt FROM quiz_results GROUP BY chronotype`,
  ]);

  const totalTests: number = (countRow[0] as { total: number }).total;

  const distribution: Record<string, number> = {};
  if (totalTests > 0) {
    const counts: Record<string, number> = {};
    for (const row of rows) {
      const r = row as { chronotype: string; cnt: number };
      counts[r.chronotype] = r.cnt;
    }
    for (const animal of CHRONOTYPES) {
      distribution[animal] = Math.round(((counts[animal] ?? 0) / totalTests) * 1000) / 10;
    }
  } else {
    for (const animal of CHRONOTYPES) {
      distribution[animal] = 0;
    }
  }

  statsCache = { totalTests, distribution };
  statsCacheTime = Date.now();

  return res.status(200).json(statsCache);
}
