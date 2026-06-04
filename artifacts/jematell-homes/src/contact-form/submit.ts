import type { TrackingData } from "./analytics";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  referralSource: string;
  textOptIn: boolean;
  tracking: TrackingData;
}

// The api-server is a separate artifact mounted at the proxy root path `/api`
// (most-specific-first routing), so a root-relative URL is correct here — unlike
// same-artifact assets, this must NOT be prefixed with import.meta.env.BASE_URL.
const CONTACT_ENDPOINT = "/api/contact";

export async function submitContactForm(data: ContactSubmission): Promise<SubmitResult> {
  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { success: false, error: `Server responded with ${res.status}` };
    }

    const json = (await res.json()) as { success?: boolean };
    return json.success
      ? { success: true }
      : { success: false, error: "Delivery was not confirmed." };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
