/**
 * mortgageRate.ts — the live 30-year fixed rate, fetched from FRED and cached
 * for a day.
 *
 * This was inline in routes/mortgageRate.ts; it moved here unchanged so the
 * estimate endpoint, the server-rendered estimate page, and the MCP tool can
 * default to the same rate the calculator shows, sharing one cache and one
 * daily FRED call rather than each fetching their own.
 */
interface RateCache {
  rate: number;
  fetchedAt: number;
}

let cache: RateCache | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const FRED_SERIES = "MORTGAGE30US";

/** Fallback used only when FRED has never answered in this process's lifetime. */
export const FALLBACK_PERM_RATE_PCT = 6.5;

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

export type RateSource = "cache" | "fred" | "stale-cache";

/**
 * Current 30-year fixed rate. Throws only when FRED fails AND nothing has ever
 * been cached, so callers that must not fail can use currentRateOrFallback().
 */
export async function getMortgageRate(): Promise<{ rate: number; source: RateSource }> {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return { rate: cache.rate, source: "cache" };
  }
  try {
    const rate = await fetchFredRate();
    cache = { rate, fetchedAt: now };
    return { rate, source: "fred" };
  } catch (err) {
    if (cache) return { rate: cache.rate, source: "stale-cache" };
    throw err;
  }
}

/**
 * The rate the calculator would show as its default: the live rate rounded to
 * the nearest eighth of a point, or FALLBACK_PERM_RATE_PCT when FRED is
 * unreachable and nothing is cached. Never throws — an estimate is more useful
 * with a stated fallback rate than not at all.
 */
export async function defaultPermRatePct(): Promise<{ rate: number; source: RateSource | "fallback" }> {
  try {
    const { rate, source } = await getMortgageRate();
    return { rate: Math.round(rate * 8) / 8, source };
  } catch {
    return { rate: FALLBACK_PERM_RATE_PCT, source: "fallback" };
  }
}
