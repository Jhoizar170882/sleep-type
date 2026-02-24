const API_BASE = import.meta.env.VITE_API_URL || '';

interface SubmitPayload {
  answers: { questionId: number; optionId: string }[];
  locale: string;
}

interface StatsResponse {
  totalTests: number;
  distribution: Record<string, number>;
}

export async function submitQuizResult(payload: SubmitPayload): Promise<void> {
  if (!API_BASE) return;
  try {
    await fetch(`${API_BASE}/api/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // fire-and-forget: silently fail
  }
}

export async function fetchStats(): Promise<StatsResponse | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/stats`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
