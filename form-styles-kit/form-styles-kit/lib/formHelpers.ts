/**
 * formHelpers.ts — tiny pure helpers used by the event form.
 * Self-contained, no external dependencies.
 */

/** "Phoenix, AZ" -> "phoenix-az". Used for analytics slugs only. */
export function toSlug(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Normalizes an event date string to "YYYY-MM-DD" for analytics ids.
 * Accepts anything Date can parse; returns '' on failure.
 */
export function getIsoDate(raw: string): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
