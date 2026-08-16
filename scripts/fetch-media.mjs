#!/usr/bin/env node
/**
 * Asset pipeline.
 *
 * Pulls every source render listed in media.manifest.json, resizes it to the
 * width the layout actually uses, and encodes it to WebP. Videos are copied
 * through untouched.
 *
 * Runs automatically before `next build` (see the `prebuild` script) and is
 * also committed back into the repo by .github/workflows/media.yml, so a
 * fresh clone has real assets without needing network access.
 *
 *   node scripts/fetch-media.mjs          # skip anything already present
 *   node scripts/fetch-media.mjs --force  # re-download everything
 */

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "media");
const force = process.argv.includes("--force");

const manifest = JSON.parse(await readFile(path.join(root, "media.manifest.json"), "utf8"));
const { base, images, videos } = manifest;

let sharp = null;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.warn("[media] sharp unavailable — images will be written as PNG without resizing");
}

const exists = (p) =>
  access(p, constants.F_OK).then(
    () => true,
    () => false,
  );

async function download(url, attempt = 1) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (err) {
    if (attempt >= 3) throw err;
    await new Promise((r) => setTimeout(r, attempt * 900));
    return download(url, attempt + 1);
  }
}

async function limitAll(items, concurrency, worker) {
  const queue = [...items];
  const results = [];
  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
      while (queue.length) {
        const item = queue.shift();
        results.push(await worker(item));
      }
    }),
  );
  return results;
}

await mkdir(outDir, { recursive: true });

const imageJobs = Object.entries(images).map(([name, spec]) => ({
  name,
  url: base + spec.file,
  width: spec.width ?? 1400,
  out: path.join(outDir, `${name}.${sharp ? "webp" : "png"}`),
}));

const videoJobs = Object.entries(videos).map(([name, file]) => ({
  name,
  url: base + file,
  out: path.join(outDir, `${name}.mp4`),
}));

let ok = 0;
let skipped = 0;
const failed = [];

await limitAll([...imageJobs, ...videoJobs], 6, async (job) => {
  if (!force && (await exists(job.out))) {
    skipped += 1;
    return;
  }
  try {
    const buf = await download(job.url);
    if (job.width && sharp) {
      const out = await sharp(buf)
        .rotate()
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toBuffer();
      await writeFile(job.out, out);
    } else {
      await writeFile(job.out, buf);
    }
    ok += 1;
    process.stdout.write(`[media] ${job.name}\n`);
  } catch (err) {
    failed.push(`${job.name}: ${err.message}`);
  }
});

console.log(`[media] ${ok} written, ${skipped} already present, ${failed.length} failed`);
if (failed.length) {
  failed.forEach((f) => console.warn("  ! " + f));
  // A missing decorative asset must not break a deploy — the site degrades to
  // posters and solid colour. Only fail the build if nothing at all landed.
  if (ok === 0 && skipped === 0) process.exit(1);
}
