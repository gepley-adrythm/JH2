import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { TocEntry } from "../lib/detail";

/** The fixed reading-progress hairline. Pair with useReadingProgress(). */
export function DetailProgress({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) {
  return <div className="dt-progress" ref={innerRef} aria-hidden="true" />;
}

/**
 * Sticky "on this page" table of contents. Renders nothing when there are no
 * sections. A <details open> so it can collapse on mobile; on desktop the CSS
 * hides the toggle and shows it as an always-open list.
 */
export function DetailToc({
  toc,
  activeId,
  label = "On this page",
}: {
  toc: TocEntry[];
  activeId: string;
  label?: string;
}) {
  if (!toc.length) return null;
  return (
    <details className="dt-toc" open>
      <summary className="dt-toc-summary">
        {label} <ChevronDown size={15} aria-hidden="true" />
      </summary>
      <nav className="dt-toc-nav" aria-label={label}>
        {toc.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`dt-toc-link${activeId === t.id ? " is-active" : ""}`}
          >
            {t.text}
          </a>
        ))}
      </nav>
    </details>
  );
}

/**
 * Standard educational-content disclaimer for resource pages (FAQ, guides,
 * glossary, reference library). Requested by the client so every generated
 * resource page states plainly that it is education, not professional advice.
 */
export function DetailDisclaimer() {
  return (
    <aside className="dt-disclaimer" data-testid="resource-disclaimer">
      <p>
        The information on this page is for general education only. It is not legal, financial,
        design, or construction advice, and it is not a substitute for guidance from a licensed
        professional or from your local building authority. Jematell Homes is not affiliated with
        or endorsed by any government agency. Codes, fees, and requirements change often, so
        confirm the current rules with the official source before you act on them. Read our full{" "}
        <Link href="/disclaimer">website disclaimer</Link>.
      </p>
    </aside>
  );
}

export interface MoreColumn {
  label: string;
  items: { to: string; label: string }[];
}

/**
 * The "keep exploring" footer — a grid of related-content columns that replaces
 * the old stack of asides. Empty columns are dropped; renders nothing if none
 * have items.
 */
export function DetailMore({
  columns,
  title = "Keep exploring",
  testid,
}: {
  columns: MoreColumn[];
  title?: string;
  testid?: string;
}) {
  const cols = columns.filter((c) => c.items.length > 0);
  if (!cols.length) return null;
  return (
    <div className="dt-more" data-testid={testid}>
      <h2 className="dt-more-title">{title}</h2>
      <div className="dt-more-grid">
        {cols.map((col) => (
          <div key={col.label}>
            <div className="dt-more-col-label">{col.label}</div>
            <ul className="dt-more-links">
              {col.items.map((it) => (
                <li key={it.to}>
                  <Link href={it.to}>
                    <span>{it.label}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
