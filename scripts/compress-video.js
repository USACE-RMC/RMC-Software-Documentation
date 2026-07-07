/**
 * compress-video.js
 *
 * Compresses video files for the documentation site using the bundled ffmpeg
 * binary (ffmpeg-static) — no system install required.
 *
 * Strategy:
 *   - Quality-based H.264 encode (CRF) so bitrate is derived from the content,
 *     not a fixed number. This is what actually shrinks over-encoded clips.
 *   - The clean filename always becomes the compressed, web-ready version (so it
 *     can be referenced directly in MDX). The untouched original is preserved
 *     alongside it with a "-raw" suffix, which .gitignore keeps out of git and
 *     off the deployed site.
 *
 * Usage:
 *   npm run compress-video -- <file|glob|folder> [more...] [options]
 *
 * Examples:
 *   npm run compress-video -- static/figures/.../Media2.mp4
 *   npm run compress-video -- "static/figures/<path>/*.mp4"
 *   npm run compress-video -- static/figures/.../v1.0 --audio
 *
 * Options:
 *   --audio        Keep the audio track (re-encoded to AAC ~96k). Default: drop.
 *   --crf <n>      Quality (0-51, lower = better/larger). Default: 26.
 *   --help         Show this help.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { globSync } = require('glob');
const ffmpegPath = require('ffmpeg-static');

// Extensions we accept as input. Output is always .mp4 (the clean web file).
const VIDEO_EXTS = ['.mp4', '.mov', '.m4v', '.webm', '.mkv', '.avi'];
const RAW_SUFFIX = '-raw';

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const opts = { crf: 26, audio: false, help: false };
  const inputs = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      opts.help = true;
    } else if (arg === '--audio') {
      opts.audio = true;
    } else if (arg === '--crf') {
      const val = parseInt(argv[++i], 10);
      if (Number.isNaN(val) || val < 0 || val > 51) {
        fail(`--crf must be an integer 0-51 (got "${argv[i]}")`);
      }
      opts.crf = val;
    } else if (arg.startsWith('--')) {
      fail(`Unknown option "${arg}". Use --help to see available options.`);
    } else {
      inputs.push(arg);
    }
  }

  return { opts, inputs };
}

function fail(message) {
  console.error(`\n  Error: ${message}\n`);
  process.exit(1);
}

function printHelp() {
  console.log(
    [
      '',
      '  Compress videos for the documentation site.',
      '',
      '  Usage:',
      '    npm run compress-video -- <file|glob|folder> [more...] [options]',
      '',
      '  Options:',
      '    --audio        Keep the audio track (AAC ~96k). Default: drop audio.',
      '    --crf <n>      Quality 0-51, lower = better/larger. Default: 26.',
      '    --help         Show this help.',
      '',
    ].join('\n')
  );
}

// ---------------------------------------------------------------------------
// Input resolution
// ---------------------------------------------------------------------------

const isVideo = (file) => VIDEO_EXTS.includes(path.extname(file).toLowerCase());
const isRaw = (file) => path.basename(file, path.extname(file)).toLowerCase().endsWith(RAW_SUFFIX);

// Expand each input (file, glob, or directory) into a flat list of video files,
// excluding preserved "-raw" originals so they are never re-compressed.
function resolveInputs(inputs) {
  const files = new Set();

  for (const input of inputs) {
    let matches = [];
    if (fs.existsSync(input) && fs.statSync(input).isDirectory()) {
      // Directory: recurse for any supported video file.
      const pattern = `${input.replace(/\\/g, '/')}/**/*.{${VIDEO_EXTS.map((e) => e.slice(1)).join(',')}}`;
      matches = globSync(pattern, { nodir: true });
    } else if (/[*?[\]{}]/.test(input)) {
      // Glob pattern.
      matches = globSync(input.replace(/\\/g, '/'), { nodir: true });
    } else if (fs.existsSync(input)) {
      matches = [input];
    } else {
      console.warn(`  Skipping (not found): ${input}`);
      continue;
    }

    for (const m of matches) {
      if (!isVideo(m)) continue;
      if (isRaw(m)) continue; // never feed preserved originals back in
      files.add(path.resolve(m));
    }
  }

  return [...files];
}

// ---------------------------------------------------------------------------
// Compression
// ---------------------------------------------------------------------------

const fmtMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

function buildFfmpegArgs(srcPath, tmpPath, opts) {
  const args = ['-y', '-i', srcPath, '-c:v', 'libx264', '-crf', String(opts.crf), '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart'];

  if (opts.audio) {
    args.push('-c:a', 'aac', '-b:a', '96k');
  } else {
    args.push('-an');
  }

  args.push(tmpPath);
  return args;
}

// Returns 'compressed' | 'skipped' | 'no-gain' | 'failed'
function compressOne(srcPath, opts) {
  const dir = path.dirname(srcPath);
  const ext = path.extname(srcPath);
  const base = path.basename(srcPath, ext);
  const rel = path.relative(process.cwd(), srcPath);

  // Re-run guard: if any "<base>-raw.*" already exists, this clip was already
  // converted. Skip so we never clobber a preserved original.
  const existingRaw = globSync(`${dir.replace(/\\/g, '/')}/${base}${RAW_SUFFIX}.*`, { nodir: true });
  if (existingRaw.length > 0) {
    console.log(`  ⏭  ${rel} — already has ${path.basename(existingRaw[0])}, skipping`);
    return 'skipped';
  }

  const inputSize = fs.statSync(srcPath).size;
  const tmpPath = path.join(dir, `${base}.compressing.mp4`);

  const result = spawnSync(ffmpegPath, buildFfmpegArgs(srcPath, tmpPath, opts), { stdio: ['ignore', 'ignore', 'pipe'] });

  if (result.status !== 0) {
    if (fs.existsSync(tmpPath)) fs.rmSync(tmpPath);
    console.error(`  ✗  ${rel} — ffmpeg failed`);
    if (result.stderr) console.error(String(result.stderr).trim().split('\n').slice(-3).join('\n'));
    return 'failed';
  }

  const outputSize = fs.statSync(tmpPath).size;

  // Keep-smaller safety: if we didn't actually shrink it, discard the result
  // and leave the original untouched (no -raw created).
  if (outputSize >= inputSize) {
    fs.rmSync(tmpPath);
    console.log(`  =  ${rel} — no gain (${fmtMB(inputSize)}), left unchanged`);
    return 'no-gain';
  }

  // Preserve the original as "<base>-raw<originalExt>", then promote the
  // compressed file to the clean "<base>.mp4" name for use in MDX.
  const rawPath = path.join(dir, `${base}${RAW_SUFFIX}${ext}`);
  const finalPath = path.join(dir, `${base}.mp4`);

  fs.renameSync(srcPath, rawPath);
  // If the source wasn't already .mp4, srcPath !== finalPath, so finalPath is free.
  fs.renameSync(tmpPath, finalPath);

  const pct = (100 * (1 - outputSize / inputSize)).toFixed(0);
  console.log(`  ✓  ${rel} — ${fmtMB(inputSize)} → ${fmtMB(outputSize)} (−${pct}%)  [original kept as ${path.basename(rawPath)}]`);
  return 'compressed';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const { opts, inputs } = parseArgs(process.argv.slice(2));

  if (opts.help) {
    printHelp();
    return;
  }
  if (inputs.length === 0) {
    printHelp();
    fail('No input files specified.');
  }
  if (!ffmpegPath || !fs.existsSync(ffmpegPath)) {
    fail('ffmpeg binary not found. Run `npm install` to fetch ffmpeg-static.');
  }

  const files = resolveInputs(inputs);
  if (files.length === 0) {
    fail('No matching video files found (note: "-raw" originals are excluded).');
  }

  console.log(`\n  Compressing ${files.length} video(s) — CRF ${opts.crf}, audio ${opts.audio ? 'kept' : 'dropped'}\n`);

  const tally = { compressed: 0, skipped: 0, 'no-gain': 0, failed: 0 };
  let savedBytes = 0;

  for (const file of files) {
    const before = fs.existsSync(file) ? fs.statSync(file).size : 0;
    const outcome = compressOne(file, opts);
    tally[outcome]++;
    if (outcome === 'compressed') {
      const rawPath = path.join(path.dirname(file), `${path.basename(file, path.extname(file))}${RAW_SUFFIX}${path.extname(file)}`);
      const after = fs.statSync(path.join(path.dirname(file), `${path.basename(file, path.extname(file))}.mp4`)).size;
      savedBytes += before - after;
      void rawPath;
    }
  }

  console.log(
    `\n  Done: ${tally.compressed} compressed, ${tally['no-gain']} no-gain, ${tally.skipped} skipped, ${tally.failed} failed` +
      (savedBytes > 0 ? ` — saved ${fmtMB(savedBytes)} total\n` : '\n')
  );

  if (tally.failed > 0) process.exit(1);
}

main();
