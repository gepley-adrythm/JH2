import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const ROOT = "/home/runner/workspace/artifacts/jematell-homes/out";
const PORT = 8081;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

async function tryFile(p) {
  try {
    const s = await stat(p);
    if (s.isFile()) return p;
  } catch {}
  return null;
}

async function resolvePath(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  p = normalize(p).replace(/^(\.\.[/\\])+/, "");
  if (p === "/" || p === "") return join(ROOT, "index.html");
  const base = join(ROOT, p);
  return (
    (await tryFile(base)) ||
    (await tryFile(base + ".html")) ||
    (await tryFile(join(base, "index.html")))
  );
}

createServer(async (req, res) => {
  const file = await resolvePath(req.url);
  if (!file) {
    const nf = await tryFile(join(ROOT, "404.html"));
    if (nf) {
      const body = await readFile(nf);
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      return res.end(body);
    }
    res.writeHead(404, { "content-type": "text/plain" });
    return res.end("Not found: " + req.url);
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch (e) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end("err " + e.message);
  }
}).listen(PORT, "0.0.0.0", () => console.log("static out/ on " + PORT));
