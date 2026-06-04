/**
 * Maps a route to the background color the page paints BEFORE its content
 * hydrates, so navigation never flashes white. The value is written into the
 * `--route-bg` CSS variable by RouteBackground.tsx and consumed on <html> in
 * index.css (`background: var(--route-bg, var(--color-bg))`).
 *
 * The Jematell site is uniformly warm-cream, so every route currently resolves
 * to the same value. The map is kept so that any future dark/contrast section
 * can opt into a different paint by adding a path prefix here. Keys are path
 * prefixes; the longest matching prefix wins.
 */

/** The site base color (matches --color-bg in index.css). */
export const DEFAULT_BG = "#f4f2ec";

/** Path prefix -> background color. */
export const ROUTE_BG: Record<string, string> = {
  "/": DEFAULT_BG,
};

/** Returns the background color for a pathname using longest-prefix match. */
export function getRouteBg(pathname: string | null | undefined): string {
  if (!pathname) return DEFAULT_BG;
  let bestPrefix = "";
  let color = DEFAULT_BG;
  for (const [prefix, value] of Object.entries(ROUTE_BG)) {
    const matches =
      prefix === "/"
        ? true
        : pathname === prefix || pathname.startsWith(prefix + "/");
    if (matches && prefix.length >= bestPrefix.length) {
      bestPrefix = prefix;
      color = value;
    }
  }
  return color;
}
