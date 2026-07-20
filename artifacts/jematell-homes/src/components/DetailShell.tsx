"use client";
import { useReadingProgress } from "../lib/useReadingProgress";
import type { TocEntry } from "../lib/detail";
import { DetailProgress, DetailToc } from "./DetailParts";

/**
 * DetailShell — the client chrome around a server-rendered detail article:
 * reading-progress bar (top of page) + scroll-tracked table of contents in the
 * side rail. `hero` and `children` are rendered on the server and passed
 * through, so the article body itself ships no JS.
 *
 * Mirrors the old page-level layout exactly: with a real TOC the body sits in
 * .dt-shell next to .dt-rail; without one it centers at 720px.
 */
export function DetailShell({
  toc,
  hero,
  children,
}: {
  toc: TocEntry[];
  hero: React.ReactNode;
  children: React.ReactNode;
}) {
  const { progressRef, activeId } = useReadingProgress(toc);

  return (
    <>
      <DetailProgress innerRef={progressRef} />
      {hero}
      <section className="dt-section">
        <div className="container">
          {toc.length > 1 ? (
            <div className="dt-shell">
              {children}
              <aside className="dt-rail">
                <DetailToc toc={toc} activeId={activeId} />
              </aside>
            </div>
          ) : (
            <div style={{ maxWidth: 720, marginInline: "auto" }}>{children}</div>
          )}
        </div>
      </section>
    </>
  );
}
