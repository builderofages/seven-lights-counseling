#!/usr/bin/env node
/**
 * Asset pipeline.
 *
 * Pulls every source render listed in media.manifest.json, resizes it to the
 * width the layout actually uses, and encodes it to WebP. Films are transcoded
 * to web-weight H.264 when ffmpeg is available.
 *
 * Runs automatically before `next build` (see the `prebuild` script) and is
 * also committed back into the repo by .github/workflows/media.yml.
 *
 *   node scripts/fetch-media.mjs          # skip anything already present
 *   node scripts/fetch-media.mjs --force  # re-download everything
 */

import { mkdir, writeFile, access, readFile, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const exec = promisify(execFile);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "media");
const force = process.argv.includes("--force");

const manifest = JSON.parse(await readFile(path.join(root, "media.manifest.json"), "utf8"));
const { base, images, videos } = manifest;

let sharp = null;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.warn("[media] sharp unavailable - images will be written as PNG without resizing");
}

// Source films arrive as ~9MB 1080p MP4s. Transcoding to 1600px-wide,
// audio-stripped H.264 CRF 30 takes the whole film set from ~139MB to ~6MB
// with no visible loss at the opacities these are used at.
const hasFfmpeg = await exec("ffmpeg", ["-version"]).then(
  () => true,
  () => false,
);
if (!hasFfmpeg) {
  console.warn("[media] ffmpeg unavailable - films will be kept at source size");
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

await limitAll([...imageJobs, ...videoJobs], 4, async (job) => {
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
    } else if (hasFfmpeg) {
      const raw = job.out.replace(/\.mp4$/, ".raw.mp4");
      await writeFile(raw, buf);
      await exec("ffmpeg", [
        "-y", "-loglevel", "error",
        "-i", raw,
        "-an",
        "-vf", "scale='min(1600,iw)':-2",
        "-c:v", "libx264", "-profile:v", "high",
        "-crf", "30", "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        job.out,
      ]);
      await rm(raw, { force: true });
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
  // A missing decorative asset must not break a deploy - the site degrades to
  // posters and solid colour. Only fail the build if nothing at all landed.
  if (ok === 0 && skipped === 0) process.exit(1);
}
