"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

/**
 * Interactive "homes coming soon" map. Leaflet is imported dynamically inside
 * the effect so it only loads client-side (it touches `window`) and stays out
 * of the initial route bundle. Two base layers — Esri World Imagery satellite
 * and OpenStreetMap street (both keyless) — are toggled with a Leaflet layers
 * control. One marker per home; clicking a pin opens a popup with the plan,
 * address, and a link to the floor plan.
 */

export interface SpecMapHome {
  lat: number;
  lon: number;
  plan: string;
  address: string;
  status: string;
  href: string;
}

const PIN_SVG =
  '<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15 0C6.7 0 0 6.7 0 15c0 11.25 15 27 15 27s15-15.75 15-27C30 6.7 23.3 0 15 0z" fill="#3b617f"/>' +
  '<circle cx="15" cy="15" r="5.5" fill="#fff"/></svg>';

export function SpecHomesMap({ homes }: { homes: SpecMapHome[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current || !homes.length) return;

      map = L.map(ref.current, { scrollWheelZoom: false, attributionControl: true });
      const bounds = L.latLngBounds(homes.map((h) => [h.lat, h.lon] as [number, number]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });

      const satellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,
          attribution: "Tiles &copy; Esri, Maxar, Earthstar Geographics",
        },
      ).addTo(map);

      const street = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap contributors",
        },
      );

      L.control
        .layers(
          { Satellite: satellite, Map: street },
          {},
          { position: "topright", collapsed: false },
        )
        .addTo(map);

      const icon = L.divIcon({
        html: PIN_SVG,
        className: "spec-map-pin",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -38],
      });

      // Adjacent-lot homes project to stacked pins at the fitted view: the
      // buried ones are unclickable and axe's target-size check measures
      // 0-11px of clear space (24px minimum). Push overlapping pins apart in
      // pixel space at this zoom — tens of meters of drift at most, and the
      // popup address, not the pin tip, is the precise location.
      const z = map.getZoom();
      const pts = homes.map((h) => map.project([h.lat, h.lon], z));
      for (let pass = 0; pass < 10; pass++) {
        let moved = false;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[j].x - pts[i].x;
            const dy = pts[j].y - pts[i].y;
            const d = Math.hypot(dx, dy);
            if (d >= 40) continue;
            const push = (40 - d) / 2 + 0.5;
            const nx = d ? dx / d : 1;
            const ny = d ? dy / d : 0;
            pts[i].x -= nx * push;
            pts[i].y -= ny * push;
            pts[j].x += nx * push;
            pts[j].y += ny * push;
            moved = true;
          }
        }
        if (!moved) break;
      }

      homes.forEach((h, i) => {
        L.marker(map.unproject(pts[i], z), { icon, title: `${h.plan} — ${h.address}` })
          .addTo(map)
          .bindPopup(
            `<div class="spec-map-popup"><strong>${h.plan}</strong><br/>${h.address}` +
              `<br/><span class="spec-map-popup-status">${h.status}</span>` +
              `<br/><a href="${h.href}">View plan &rarr;</a></div>`,
          );
      });
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
    // homes is a stable, page-level constant; the map is built once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="spec-map"
      role="application"
      aria-label="Map of Jematell Homes spec homes coming soon in Casa Grande, Arizona"
      data-testid="spec-homes-map"
    />
  );
}
