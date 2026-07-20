/**
 * DEV-ONLY gallery-order persistence, replacing the Vite dev middleware from
 * the old vite.config.ts (devGalleryOrderPlugin). It backs the drag-to-reorder
 * editor in src/dev/DevDraggableGallery.tsx and persists the order to the
 * committed src/data/gallery-orders.json so it survives cache clears.
 *
 * This file uses the ".dev.ts" page extension, which next.config.mjs registers
 * ONLY under `next dev`. Production builds (output: "export", which forbids
 * POST route handlers) never see it, so the endpoint physically cannot ship,
 * same as the old `apply: "serve"` Vite plugin. The folder name "%5F_dev"
 * URL-decodes to the "__dev" segment (a bare leading underscore would make
 * the folder private and unroutable).
 */
import fs from "node:fs";
import path from "node:path";

const ordersFile = path.join(process.cwd(), "src", "data", "gallery-orders.json");

function readAll(): Record<string, string[]> {
  try {
    return JSON.parse(fs.readFileSync(ordersFile, "utf-8"));
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, string[]>) {
  fs.mkdirSync(path.dirname(ordersFile), { recursive: true });
  fs.writeFileSync(ordersFile, JSON.stringify(data, null, 2) + "\n");
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function guard(): Response | null {
  // Belt and braces: the file is only registered in dev, but refuse to serve
  // outside development even if that ever changes.
  if (process.env.NODE_ENV === "production") return json({ error: "not found" }, 404);
  return null;
}

export async function GET(request: Request): Promise<Response> {
  const blocked = guard();
  if (blocked) return blocked;
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  return json({ keys: readAll()[slug] ?? null });
}

export async function POST(request: Request): Promise<Response> {
  const blocked = guard();
  if (blocked) return blocked;
  try {
    const { slug, keys } = (await request.json()) as { slug?: unknown; keys?: unknown };
    if (typeof slug !== "string" || !Array.isArray(keys)) {
      return json({ error: "bad request" }, 400);
    }
    const all = readAll();
    all[slug] = keys as string[];
    writeAll(all);
    return json({ ok: true });
  } catch {
    return json({ error: "bad json" }, 400);
  }
}
