/**
 * Lead attribution tracking.
 *
 * Captures marketing attribution on the visitor's first page load (first-touch,
 * persisted in sessionStorage) so it survives client-side navigation before they
 * open the contact form. When UTM params are present they win; otherwise ad
 * click ids decide (gclid -> google/cpc, msclkid -> bing/cpc, fbclid ->
 * facebook/paid-social) BEFORE the referrer is consulted — auto-tagged ad
 * clicks arrive with search/social referrers and would otherwise read as
 * organic. Only then is document.referrer classified (search engines ->
 * organic, social networks -> social, anything else -> referral; no referrer
 * -> direct).
 */

export interface TrackingData {
  gclid: string;
  /** Microsoft Advertising click id (auto-tagging). */
  msclkid: string;
  /** Meta (Facebook/Instagram) click id. */
  fbclid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  source: string;
  medium: string;
  referrer: string;
  landing_page: string;
  trigger_url: string;
}

type Attribution = Omit<TrackingData, "trigger_url">;

const STORAGE_KEY = "jh_attribution";

const EMPTY: TrackingData = {
  gclid: "",
  msclkid: "",
  fbclid: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  source: "",
  medium: "",
  referrer: "",
  landing_page: "",
  trigger_url: "",
};

// Token -> canonical source name. Matched as a substring of the referrer host,
// so "www.google.com", "news.google.com", "google.co.uk" all resolve to "google".
const SEARCH_ENGINES: Record<string, string> = {
  google: "google",
  bing: "bing",
  yahoo: "yahoo",
  duckduckgo: "duckduckgo",
  ecosia: "ecosia",
  baidu: "baidu",
  yandex: "yandex",
  brave: "brave",
  startpage: "startpage",
  aol: "aol",
  ask: "ask",
};

const SOCIAL_NETWORKS: Record<string, string> = {
  facebook: "facebook",
  "fb.com": "facebook",
  "fb.me": "facebook",
  instagram: "instagram",
  linkedin: "linkedin",
  "lnkd.in": "linkedin",
  "t.co": "twitter",
  twitter: "twitter",
  "x.com": "twitter",
  youtube: "youtube",
  "youtu.be": "youtube",
  pinterest: "pinterest",
  "pin.it": "pinterest",
  tiktok: "tiktok",
  reddit: "reddit",
  threads: "threads",
  nextdoor: "nextdoor",
  tumblr: "tumblr",
};

function classifyReferrer(
  referrer: string,
  ids: { gclid: string; msclkid: string; fbclid: string },
): { source: string; medium: string } {
  // Platform click ids are checked FIRST, before the referrer host. An
  // auto-tagged ad click usually arrives WITH a search/social referrer
  // (google.com, googleadservices.com, bing.com, facebook.com), so testing the
  // host first classified paid clicks as organic/social — exactly the
  // paid-vs-organic confusion this data exists to prevent.
  if (ids.gclid) return { source: "google", medium: "cpc" };
  if (ids.msclkid) return { source: "bing", medium: "cpc" };
  if (ids.fbclid) return { source: "facebook", medium: "paid-social" };

  if (!referrer) return { source: "direct", medium: "(none)" };

  let host = "";
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return { source: "direct", medium: "(none)" };
  }

  // Same-site referral (internal navigation) counts as direct.
  if (typeof window !== "undefined" && host === window.location.hostname.toLowerCase()) {
    return { source: "direct", medium: "(none)" };
  }

  const cleanHost = host.replace(/^www\./, "");

  for (const [token, name] of Object.entries(SEARCH_ENGINES)) {
    if (host.includes(token)) return { source: name, medium: "organic" };
  }
  for (const [token, name] of Object.entries(SOCIAL_NETWORKS)) {
    if (host.includes(token)) return { source: name, medium: "social" };
  }

  return { source: cleanHost, medium: "referral" };
}

function detectAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") || "";
  const utm_medium = params.get("utm_medium") || "";
  const utm_campaign = params.get("utm_campaign") || "";
  const gclid = params.get("gclid") || "";
  const msclkid = params.get("msclkid") || "";
  const fbclid = params.get("fbclid") || "";
  const referrer = document.referrer || "";

  let source = utm_source;
  let medium = utm_medium;
  if (!source || !medium) {
    const derived = classifyReferrer(referrer, { gclid, msclkid, fbclid });
    if (!source) source = derived.source;
    if (!medium) medium = derived.medium;
  }

  return {
    gclid,
    msclkid,
    fbclid,
    utm_source,
    utm_medium,
    utm_campaign,
    source,
    medium,
    referrer,
    landing_page: window.location.href,
  };
}

/**
 * Capture first-touch attribution as early as possible. Safe to call on every
 * mount — it only writes once per session, preserving the original landing
 * referrer/UTMs even after the visitor navigates client-side.
 */
export function initTracking(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(detectAttribution()));
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) — fail silently.
  }
}

export function getTrackingData(): TrackingData {
  if (typeof window === "undefined") return EMPTY;

  let stored: Attribution | null = null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw) as Attribution;
  } catch {
    stored = null;
  }
  // Fallback if init never ran (e.g. storage blocked): detect on the spot.
  const attr = stored ?? detectAttribution();

  return { ...EMPTY, ...attr, trigger_url: window.location.href };
}

export function loadGTM(): void {}

export function reportConversion(
  _formData: { name: string; email: string; phone: string },
  _eventName: string,
  _isNew: boolean,
  _value: number,
): void {}
