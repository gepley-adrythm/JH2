/**
 * useEventData.ts — generic data hooks for EventFormV5.
 *
 * Replaces the project-specific useDataQueries. Uses TanStack Query and fetches
 * upcoming seminars + venue photos from configurable endpoints. If you only use
 * the contact form, you can ignore this file entirely.
 *
 * Endpoints are expected to return JSON arrays matching the shapes below.
 * See examples/events.example.json and examples/venue-photos.example.json.
 */

import { useQuery } from '@tanstack/react-query';

export interface Seminar {
  city: string;
  venue: string;
  address: string;
  /** Any Date-parseable string, e.g. "2026-07-15T18:00:00". */
  eventdate: string;
  /** Optional human label, e.g. "Wednesday". */
  dayofweek?: string;
  /** Optional campaign tag carried into the submission. */
  campaign?: string;
}

export interface VenuePhoto {
  venue: string;
  address: string;
  photoUrl: string | null;
}

/** Configure where the hooks fetch from. */
export const dataEndpoints = {
  events: '/api/events',
  venuePhotos: '/api/venue-photos',
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  return res.json() as Promise<T>;
}

/** Sort upcoming events by date ascending and drop past events. */
function sortAndFilterUpcoming(list: Seminar[]): Seminar[] {
  const now = Date.now();
  return [...list]
    .filter((s) => {
      if (!s.eventdate) return true;
      const t = new Date(s.eventdate).getTime();
      return isNaN(t) ? true : t >= now - 1000 * 60 * 60 * 12;
    })
    .sort((a, b) => {
      const da = a.eventdate ? new Date(a.eventdate).getTime() : 0;
      const db = b.eventdate ? new Date(b.eventdate).getTime() : 0;
      return da - db;
    });
}

export function useEvents(serverInitialData?: Seminar[]) {
  return useQuery<Seminar[], Error, Seminar[]>({
    queryKey: [dataEndpoints.events],
    queryFn: () => fetchJson<Seminar[]>(dataEndpoints.events),
    staleTime: 1000 * 60 * 5,
    select: sortAndFilterUpcoming,
    ...(serverInitialData ? { initialData: serverInitialData, initialDataUpdatedAt: Infinity } : {}),
  });
}

export function useVenuePhotos(initialData?: VenuePhoto[]) {
  return useQuery<VenuePhoto[]>({
    queryKey: [dataEndpoints.venuePhotos],
    queryFn: () => fetchJson<VenuePhoto[]>(dataEndpoints.venuePhotos),
    staleTime: 1000 * 60 * 60,
    ...(initialData && initialData.length > 0 ? { initialData, initialDataUpdatedAt: Infinity } : {}),
  });
}
