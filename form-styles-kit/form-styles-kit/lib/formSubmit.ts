/**
 * formSubmit.ts — the swappable data layer (this REPLACES the old Zoho CRM code).
 *
 * The components no longer build cryptic CRM field codes. They assemble a clean,
 * semantic payload and hand it to the functions below. By default these POST
 * JSON to your own API routes. Point them anywhere: your CRM, an email service,
 * a serverless function, a Google Sheet webhook, etc.
 *
 * Only two things matter to the components:
 *   1. the shape of the payload (typed below)
 *   2. that each function resolves to { success: boolean; error?: string }
 */

import type { TrackingData } from './analytics';

export interface SubmitResult {
  success: boolean;
  error?: string;
}

/** Payload produced by ContactFormV5. */
export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  /** The fully-composed message (guided builder or free text). */
  message: string;
  /** "How did you hear about us" answer, if provided. */
  referralSource: string;
  /** True if the user checked the SMS opt-in box. */
  textOptIn: boolean;
  /** Marketing attribution captured at submit time. */
  tracking: TrackingData;
}

/** Payload produced by EventFormV5 (seminar registration). */
export interface EventSubmission {
  name: string;
  email: string;
  phone: string;
  /** Composed details (living trust answer, guest name, age, etc.). */
  message: string;
  /** True if the user checked the SMS opt-in box. */
  smsOptIn: boolean;
  /** Campaign tag carried from the seminar / URL params. */
  campaign: string;
  /** Always "Seminar" — distinguishes lead type from general contact. */
  leadType: 'Seminar';
  /** Marketing attribution captured at submit time. */
  tracking: TrackingData;
}

/** Where the default adapters POST. Override per project. */
export const submitEndpoints = {
  contact: '/api/contact',
  event: '/api/event',
};

async function postJson(url: string, body: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { success: false, error: `Request failed (${res.status}). ${text}`.trim() };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

/** Default contact adapter: POST clean JSON to submitEndpoints.contact. */
export async function submitContactForm(data: ContactSubmission): Promise<SubmitResult> {
  return postJson(submitEndpoints.contact, data);
}

/** Default event adapter: POST clean JSON to submitEndpoints.event. */
export async function submitEventForm(data: EventSubmission): Promise<SubmitResult> {
  return postJson(submitEndpoints.event, data);
}
