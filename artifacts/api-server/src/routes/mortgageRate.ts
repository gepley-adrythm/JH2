import { Router } from "express";

const router = Router();

interface RateCache {
  rate: number;
  fetchedAt: number;
}

let cache: RateCache | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const FRED_SERIES = "MORTGAGE30US";

async function fetchFredRate(): Promise<number> {
  const key = process.env.FRED_API_KEY;
  if (!key) throw new Error("FRED_API_KEY not set");

  const url =
    `https://api.stlouisfed.org/fred/series/observations` +
    `?series_id=${FRED_SERIES}` +
    `&api_key=${key}` +
    `&sort_order=desc` +
    `&limit=1` +
    `&file_type=json`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`FRED returned ${res.status}`);

  const json = (await res.json()) as {
    observations: Array<{ value: string; date: string }>;
  };

  const obs = json.observations?.[0];
  if (!obs) throw new Error("No observations returned from FRED");

  const rate = parseFloat(obs.value);
  if (!Number.isFinite(rate)) throw new Error(`Unexpected FRED value: ${obs.value}`);

  return rate;
}

router.get("/mortgage-rate", async (_req, res) => {
  const now = Date.now();

  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    res.json({ rate: cache.rate, source: "cache" });
    return;
  }

  try {
    const rate = await fetchFredRate();
    cache = { rate, fetchedAt: now };
    res.json({ rate, source: "fred" });
  } catch (err) {
    if (cache) {
      res.json({ rate: cache.rate, source: "stale-cache" });
    } else {
      res.status(502).json({ error: "Unable to fetch mortgage rate", detail: String(err) });
    }
  }
});

export default router;
