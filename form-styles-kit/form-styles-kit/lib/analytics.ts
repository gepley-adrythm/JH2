/**
 * analytics.ts — no-op analytics + tracking stubs.
 *
 * The original RJP forms wired into Google Tag Manager, Google Ads conversions,
 * and a Meta/Google remarketing dataLayer. None of that is needed for the forms
 * to FUNCTION, so this kit ships safe no-op implementations that keep the exact
 * call signatures the components expect.
 *
 * Everything here is optional. Wire in your own analytics by filling in the
 * function bodies — the components will keep working either way.
 */

export interface TrackingData {
  gclid: string;
  utm_source: string;
  utm_medium: string;
  /** The URL the user was on when they triggered the form. */
  trigger_url: string;
}

/**
 * Reads marketing attribution from the URL query string + referrer.
 * This lightweight version captures the most common params with no storage.
 * Replace with a first-touch/last-touch persistence layer if you need it.
 */
export function getTrackingData(): TrackingData {
  if (typeof window === 'undefined') {
    return { gclid: '', utm_source: '', utm_medium: '', trigger_url: '' };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    gclid: params.get('gclid') || '',
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    trigger_url: window.location.href,
  };
}

/** Loads your tag manager / analytics scripts. No-op by default. */
export function loadGTM(): void {
  // TODO: inject GTM / GA4 / your analytics loader here if desired.
}

/**
 * Fires a conversion event. No-op by default.
 * @param formData  basic identity of the submitter
 * @param eventName e.g. 'contact_submission' | 'seminar_signup'
 * @param isNew     whether this is a new (vs existing) contact
 * @param value     conversion value for reporting
 */
export function reportConversion(
  _formData: { name: string; email: string; phone: string },
  _eventName: string,
  _isNew: boolean,
  _value: number,
): void {
  // TODO: push a conversion to your analytics here if desired.
}

/** Remarketing: user opened the seminar registration form. No-op by default. */
export function pushSeminarInitiateCheckout(_citySlug: string, _dateStr: string): void {
  // TODO: push an "initiate checkout" remarketing event if desired.
}

/** Remarketing: user completed a seminar signup. No-op by default. */
export function pushSeminarSignupItem(_citySlug: string, _dateStr: string, _value = 250): void {
  // TODO: push a "signup" remarketing event if desired.
}
