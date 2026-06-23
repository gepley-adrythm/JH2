import { useState, useRef, useCallback } from "react";

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

function loadOrder(slug: string, images: DevImg[]): DevImg[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY(slug));
    if (!saved) return images;
    const keys: string[] = JSON.parse(saved);
    const byKey = Object.fromEntries(images.map((img) => [img.key, img]));
    const ordered = keys.map((k) => byKey[k]).filter(Boolean) as DevImg[];
    const savedSet = new Set(keys);
    const extra = images.filter((img) => !savedSet.has(img.key));
    return [...ordered, ...extra];
  } catch {
    return images;
  }
}

function saveOrder(slug: string, images: DevImg[]) {
  localStorage.setItem(STORAGE_KEY(slug), JSON.stringify(images.map((img) => img.key)));
}

export function DevDraggableGallery({ initialImages, slug, masonryClass }: Props) {
  const [images, setImages] = useState<DevImg[]>(() => loadOrder(slug, initialImages));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashSaved = useCallback(() => {
    setSaveState("saved");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveState("idle"), 2200);
  }, []);

  const reorder = useCallback(
    (from: number, to: number) => {
      if (from === to) return;
      setImages((prev) => {
        const next = [...prev];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        saveOrder(slug, next);
        return next;
      });
      flashSaved();
    },
    [slug, flashSaved]
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

  const handleSave = useCallback(() => {
    setImages((current) => {
      saveOrder(slug, current);
      return current;
    });
    flashSaved();
  }, [slug, flashSaved]);

  const handleCopy = useCallback(() => {
    const keys = images.map((img) => img.key);
    const text = JSON.stringify(keys, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopyState("copied");
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopyState("idle"), 2200);
    });
  }, [images]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY(slug));
    setImages(initialImages);
    setSaveState("idle");
  }, [initialImages, slug]);

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
            opacity: saveState === "saved" ? 1 : 0,
            color: "#6fcf97",
            transition: "opacity 0.3s",
            fontSize: "11px",
          }}
        >
          ✓ Saved
        </span>
        <button
          onClick={handleSave}
          title="Re-write current order to localStorage"
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
