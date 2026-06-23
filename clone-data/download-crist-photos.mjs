/**
 * Downloads Crist photographer photos from Google Drive and creates WebP versions.
 * IDs sourced from clone-data/crist-photos-manifest.json (authoritative).
 *
 * Full-res JPEGs → artifacts/jematell-homes/public/images/gallery/crist/
 * WebP versions (q88, max 3000px) → same directory, .webp extension
 *
 * Run: node clone-data/download-crist-photos.mjs
 */

import { createRequire } from 'module';
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const require = createRequire(import.meta.url);
const { ReplitConnectors } = require('@replit/connectors-sdk');

const OUT_DIR = 'artifacts/jematell-homes/public/images/gallery/crist';
mkdirSync(OUT_DIR, { recursive: true });

const FILES = JSON.parse(readFileSync('clone-data/crist-photos-manifest.json', 'utf8'));

const connectors = new ReplitConnectors();

async function downloadFile(fileId, destPath) {
  const response = await connectors.proxy(
    'google-drive',
    `/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`,
    { method: 'GET' }
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(destPath, buffer);
  return buffer.length;
}

function toWebP(jpegPath, webpPath) {
  // q88 + max 3000px wide — light pass, preserves full professional detail
  execSync(`convert "${jpegPath}" -resize "3000x3000>" -quality 88 "${webpPath}"`, { stdio: 'pipe' });
}

async function main() {
  let ok = 0, failed = 0;
  const errors = [];

  for (const f of FILES) {
    const jpegPath = join(OUT_DIR, f.name);
    const webpName = f.name.replace(/\.jpg$/i, '.webp');
    const webpPath = join(OUT_DIR, webpName);

    if (existsSync(jpegPath) && existsSync(webpPath)) {
      process.stdout.write(`  ✓ ${f.name} (cached)\n`);
      ok++;
      continue;
    }

    process.stdout.write(`  ↓ ${f.name} ... `);
    try {
      if (!existsSync(jpegPath)) {
        const bytes = await downloadFile(f.id, jpegPath);
        process.stdout.write(`${Math.round(bytes / 1024)}KB `);
      } else {
        process.stdout.write(`(jpeg cached) `);
      }
      if (!existsSync(webpPath)) {
        toWebP(jpegPath, webpPath);
        process.stdout.write(`→ WebP ✓\n`);
      } else {
        process.stdout.write(`(webp cached) ✓\n`);
      }
      ok++;
    } catch (err) {
      process.stdout.write(`FAILED\n`);
      errors.push(`  ${f.name}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Done: ${ok} ok, ${failed} failed`);
  if (errors.length) console.log('Errors:\n' + errors.join('\n'));
  console.log(`Output: ${OUT_DIR}/`);
}

main().catch(console.error);
