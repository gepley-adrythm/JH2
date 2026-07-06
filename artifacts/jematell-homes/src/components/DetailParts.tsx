import React from "react";
import { Link } from "react-router-dom";
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
                  <Link to={it.to}>
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
