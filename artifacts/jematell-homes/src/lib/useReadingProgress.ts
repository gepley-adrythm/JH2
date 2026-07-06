import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "./detail";

/**
 * Reading-progress bar fill + scroll-spy for the active table-of-contents
 * section, shared by the content detail pages. Returns a ref to attach to the
 * progress element and the id of the heading currently in view.
 *
 * Both are computed from a single rAF-throttled scroll handler using
 * getBoundingClientRect (viewport-relative, so it is correct regardless of
 * which element actually scrolls). The active section is the last heading that
 * has scrolled up past a threshold just below the fixed site header. Browser
 * only — the effect never runs during SSG, so prerendered HTML is untouched and
 * the TOC still works as plain anchor links with no JavaScript.
 */
const HEADER_OFFSET = 130; // fixed site header (~91px) plus a little breathing room

export function useReadingProgress(toc: TocEntry[]) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || document.body.scrollTop || 0;

      const bar = progressRef.current;
      if (bar) {
        const max = Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight;
        bar.style.width = `${max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0}%`;
      }

      // Active section = the last heading whose top has passed under the header.
      let current = "";
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= HEADER_OFFSET) current = t.id;
        else break;
      }
      setActiveId(current || (toc[0] ? toc[0].id : ""));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [toc]);

  return { progressRef, activeId };
}
