"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { BASE } from "../lib/paths";

export interface DevImg {
  key: string;
  src: string;
  webp?: string;
  alt: string;
  eager: boolean;
}

interface Props {
  initialImages: DevImg[];
  slug: string;
  masonryClass: string;
}

const STORAGE_KEY = (slug: string) => `jh-gallery-order-${slug}`;
// DEV-ONLY endpoint, served under `next dev` by the dev-only route handler
// app/%5F_dev/gallery-order/route.dev.ts (the port of the old Vite middleware).
// It persists the order to src/data/gallery-orders.json. Both saveServer and
// loadServer below still treat any failure (non-ok or thrown) as a soft miss:
// order persists to localStorage and the UI shows "Save failed" instead of
// crashing.
const ENDPOINT = `${BASE}__dev/gallery-order`;

function applyOrder(images: DevImg[], keys: string[]): DevImg[] {
  const byKey = Object.fromEntries(images.map((img) => [img.key, img]));
  return keys.map((k) => byKey[k]).filter(Boolean) as DevImg[];
}

function loadLocal(slug: string, images: DevImg[]): DevImg[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY(slug));
    if (!saved) return images;
    return applyOrder(images, JSON.parse(saved) as string[]);
  } catch {
    return images;
  }
}

function saveLocal(slug: string, images: DevImg[]) {
  localStorage.setItem(STORAGE_KEY(slug), JSON.stringify(images.map((img) => img.key)));
}

async function saveServer(slug: string, keys: string[]): Promise<boolean> {
  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, keys }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function loadServer(slug: string): Promise<string[] | null> {
  try {
    const r = await fetch(`${ENDPOINT}?slug=${encodeURIComponent(slug)}`);
    if (!r.ok) return null;
    const data = (await r.json()) as { keys?: unknown };
    return Array.isArray(data.keys) ? (data.keys as string[]) : null;
  } catch {
    return null;
  }
}

type SaveState = "idle" | "saving" | "saved" | "error";

export function DevDraggableGallery({ initialImages, slug, masonryClass }: Props) {
  const [images, setImages] = useState<DevImg[]>(() => loadLocal(slug, initialImages));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [preview, setPreview] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Server is the source of truth — hydrate from it on mount so the order
  // survives a localStorage wipe (different browser, cleared cache, etc.).
  useEffect(() => {
    let cancelled = false;
    loadServer(slug).then((keys) => {
      if (cancelled || !keys || keys.length === 0) return;
      const ordered = applyOrder(initialImages, keys);
      setImages(ordered);
      saveLocal(slug, ordered);
    });
    return () => {
      cancelled = true;
    };
  }, [slug, initialImages]);

  const persist = useCallback(async (s: string, imgs: DevImg[]) => {
    setSaveState("saving");
    saveLocal(s, imgs);
    const ok = await saveServer(s, imgs.map((img) => img.key));
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaveState(ok ? "saved" : "error");
    saveTimer.current = setTimeout(() => setSaveState("idle"), ok ? 2200 : 5000);
  }, []);

  const reorder = useCallback(
    (from: number, to: number) => {
      if (from === to) return;
      setImages((prev) => {
        const next = [...prev];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        void persist(slug, next);
        return next;
      });
    },
    [slug, persist]
  );

  const handleDragStart = useCallback((e: React.DragEvent, i: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(i));
    setDragIndex(i);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, i: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropIndex(i);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, i: number) => {
      e.preventDefault();
      const from = Number(e.dataTransfer.getData("text/plain"));
      reorder(from, i);
      setDragIndex(null);
      setDropIndex(null);
    },
    [reorder]
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDropIndex(null);
  }, []);

  // Auto-scroll when dragging near the top or bottom edge of the viewport.
  // The HTML5 drag API blocks wheel events entirely, so we watch dragover
  // (which does fire) and use rAF to scroll proportionally to edge proximity.
  useEffect(() => {
    if (dragIndex === null) return;

    const THRESHOLD = 140; // px from edge to start scrolling
    const MAX_SPEED = 80;  // px per frame at the very edge
    let speed = 0;
    let rafId: number;

    const onDragOver = (e: DragEvent) => {
      const y = e.clientY;
      const h = window.innerHeight;
      if (y < THRESHOLD) {
        speed = -((THRESHOLD - y) / THRESHOLD) * MAX_SPEED;
      } else if (y > h - THRESHOLD) {
        speed = ((y - (h - THRESHOLD)) / THRESHOLD) * MAX_SPEED;
      } else {
        speed = 0;
      }
    };

    const tick = () => {
      if (speed !== 0) window.scrollBy(0, speed);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    document.addEventListener("dragover", onDragOver);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("dragover", onDragOver);
    };
  }, [dragIndex]);

  const handleSave = useCallback(() => {
    setImages((current) => {
      void persist(slug, current);
      return current;
    });
  }, [slug, persist]);

  const handleCopy = useCallback(() => {
    const keys = images.map((img) => img.key);
    const text = JSON.stringify(keys, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopyState("copied");
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopyState("idle"), 2200);
    });
  }, [images]);

  const handleDelete = useCallback((key: string, label: string) => {
    if (!window.confirm(`Remove "${label}" from the gallery?\n\nUse "Reset order" to restore it.`)) return;
    setImages((prev) => {
      const next = prev.filter((img) => img.key !== key);
      void persist(slug, next);
      return next;
    });
  }, [slug, persist]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY(slug));
    setImages(initialImages);
    // Write the source order back to the server so the saved file matches reset.
    void persist(slug, initialImages);
  }, [initialImages, slug, persist]);

  const status =
    saveState === "saving"
      ? { text: "Saving…", color: "#e0c068" }
      : saveState === "saved"
        ? { text: "✓ Saved to server", color: "#6fcf97" }
        : saveState === "error"
          ? { text: "Save failed — kept locally", color: "#e07a5f" }
          : { text: "", color: "transparent" };

  // Production preview: render the gallery exactly as the static production
  // build would (no drag handles, no dev bar) so you can see the real look.
  // A small floating pill is the only dev affordance, to switch back.
  if (preview) {
    return (
      <>
        <div className={masonryClass}>
          {images.map((img) => (
            <figure key={img.key} className="gallery-masonry-item">
              {img.webp ? (
                <picture>
                  <source srcSet={img.webp} type="image/webp" />
                  <img src={img.src} alt={img.alt} loading={img.eager ? "eager" : "lazy"} />
                </picture>
              ) : (
                <img src={img.src} alt={img.alt} loading={img.eager ? "eager" : "lazy"} />
              )}
            </figure>
          ))}
        </div>
        <button
          onClick={() => setPreview(false)}
          title="Return to the drag-to-reorder editor"
          style={{
            position: "fixed",
            left: "20px",
            bottom: "20px",
            zIndex: 300,
            background: "rgba(12,14,15,0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "#f4f2ec",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "999px",
            padding: "9px 16px",
            cursor: "pointer",
            fontSize: "11.5px",
            fontFamily: "'DM Mono', 'Fira Mono', 'Consolas', monospace",
            letterSpacing: "0.04em",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
          }}
        >
          <span
            style={{
              background: "#8c5a45",
              color: "#fff",
              padding: "1px 6px",
              borderRadius: "3px",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            DEV
          </span>
          Exit production preview
        </button>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          background: "rgba(12, 14, 15, 0.88)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "#f4f2ec",
          padding: "9px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "11.5px",
          fontFamily: "'DM Mono', 'Fira Mono', 'Consolas', monospace",
          letterSpacing: "0.03em",
          userSelect: "none",
        }}
      >
        <span
          style={{
            background: "#8c5a45",
            color: "#fff",
            padding: "1px 7px",
            borderRadius: "3px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          DEV
        </span>
        <span style={{ opacity: 0.55 }}>Drag photos to reorder</span>
        <span
          style={{
            marginLeft: "auto",
            opacity: status.text ? 1 : 0,
            color: status.color,
            transition: "opacity 0.3s, color 0.3s",
            fontSize: "11px",
          }}
        >
          {status.text || "·"}
        </span>
        <button
          onClick={() => setPreview(true)}
          title="Preview the gallery exactly as it looks in production (no editor)"
          style={{
            background: "rgba(140,90,69,0.7)",
            border: "1px solid rgba(140,90,69,0.9)",
            color: "#f4f2ec",
            padding: "3px 11px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "inherit",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(140,90,69,1)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(140,90,69,0.7)"; }}
        >
          Preview production
        </button>
        <button
          onClick={handleSave}
          title="Save the current order to the dev server (persisted to src/data/gallery-orders.json)"
          style={{
            background: "rgba(59,97,127,0.7)",
            border: "1px solid rgba(59,97,127,0.9)",
            color: "#f4f2ec",
            padding: "3px 11px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "inherit",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(59,97,127,1)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(59,97,127,0.7)"; }}
        >
          Save
        </button>
        <button
          onClick={handleCopy}
          title="Copy the ordered key list to clipboard (paste to agent to update source files)"
          style={{
            background: copyState === "copied" ? "rgba(111,207,151,0.25)" : "transparent",
            border: `1px solid ${copyState === "copied" ? "rgba(111,207,151,0.6)" : "rgba(255,255,255,0.18)"}`,
            color: copyState === "copied" ? "#6fcf97" : "rgba(255,255,255,0.5)",
            padding: "3px 11px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "inherit",
            transition: "background 0.2s, border-color 0.2s, color 0.2s",
          }}
        >
          {copyState === "copied" ? "✓ Copied!" : "Copy order"}
        </button>
        <button
          onClick={handleReset}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.5)",
            padding: "3px 11px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "inherit",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
          }}
        >
          Reset order
        </button>
      </div>

      <div className={masonryClass}>
        {images.map((img, i) => {
          const isDragging = dragIndex === i;
          const isDropTarget = dropIndex === i && dragIndex !== i;
          return (
            <figure
              key={img.key}
              className="gallery-masonry-item"
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                opacity: isDragging ? 0.35 : 1,
                outline: isDropTarget ? "3px solid #3b617f" : "3px solid transparent",
                outlineOffset: "2px",
                transition: "opacity 0.15s ease, outline-color 0.12s ease",
                position: "relative",
              }}
            >
              {img.webp ? (
                <picture>
                  <source srcSet={img.webp} type="image/webp" />
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={img.eager ? "eager" : "lazy"}
                    draggable={false}
                    style={{ pointerEvents: "none" }}
                  />
                </picture>
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={img.eager ? "eager" : "lazy"}
                  draggable={false}
                  style={{ pointerEvents: "none" }}
                />
              )}
              {/* Delete button — top-left */}
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(img.key, img.alt || img.key); }}
                title="Remove this photo from the gallery"
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  width: "28px",
                  height: "28px",
                  background: "rgba(180,40,40,0.8)",
                  border: "none",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "16px",
                  lineHeight: 1,
                  fontFamily: "system-ui, sans-serif",
                  opacity: 0.85,
                  transition: "opacity 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,30,30,1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(180,40,40,0.8)"; }}
              >
                ×
              </button>
              {/* Drag handle — top-right */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "28px",
                  height: "28px",
                  background: "rgba(0,0,0,0.55)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.7,
                  pointerEvents: "none",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="3" width="10" height="1.5" rx="0.75" fill="white" />
                  <rect x="2" y="6.25" width="10" height="1.5" rx="0.75" fill="white" />
                  <rect x="2" y="9.5" width="10" height="1.5" rx="0.75" fill="white" />
                </svg>
              </div>
            </figure>
          );
        })}
      </div>
    </>
  );
}
