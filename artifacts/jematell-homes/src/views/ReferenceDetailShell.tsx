"use client";
import { useReadingProgress } from "../lib/useReadingProgress";
import type { TocEntry } from "../lib/detail";
import { DetailProgress, DetailToc } from "../components/DetailParts";

/**
 * ReferenceDetailShell is the client chrome around a server-rendered reference
 * entry: reading-progress bar plus scroll-tracked table of contents. Unlike
 * DetailShell, the side rail here always renders and leads with the "At a
 * glance" facts card (`facts`, server-rendered) above the TOC, matching the
 * old ReferenceDetail layout exactly. `hero`, `facts`, and `children` are all
 * rendered on the server and passed through, so the article ships no JS.
 */
export function ReferenceDetailShell({
  toc,
  hero,
  facts,
  children,
}: {
  toc: TocEntry[];
  hero: React.ReactNode;
  facts: React.ReactNode;
  children: React.ReactNode;
}) {
  const { progressRef, activeId } = useReadingProgress(toc);

  return (
    <>
      <DetailProgress innerRef={progressRef} />
      {hero}
      <section className="dt-section">
        <div className="container">
          <div className="dt-shell">
            {children}
            <aside className="dt-rail">
              {facts}
              <DetailToc toc={toc} activeId={activeId} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
