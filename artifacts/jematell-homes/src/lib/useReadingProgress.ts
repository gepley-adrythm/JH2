import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "./detail";

/**
 * Reading-progress bar fill + scroll-spy for the active table-of-contents
 * section, shared by the content detail pages. Returns a ref to attach to the
 * progress element and the id of the heading currently in view. Browser-only —
 * the effect never runs during SSG, so the prerendered HTML is untouched and
 * the TOC still works as plain anchor links with no JavaScript.
 */
export function useReadingProgress(toc: TocEntry[]) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const bar = progressRef.current;
    const onScroll = () => {
      if (!bar) return;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      bar.style.width = `${max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const headings = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    let io: IntersectionObserver | undefined;
    if (headings.length && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: "-96px 0px -68% 0px", threshold: 0 },
      );
      headings.forEach((h) => io!.observe(h));
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [toc]);

  return { progressRef, activeId };
}
