/**
 * generateVideoPosters.js
 *
 * Creates a poster image for each video that does not have one yet, using the bundled ffmpeg
 * binary (ffmpeg-static). The poster is a JPEG frame saved next to the clip as
 * "<clip name>-poster.jpg". The Video component picks that file up automatically, so the
 * reader sees a real frame instead of a blank box before pressing play.
 *
 * Usage:
 *   npm run video-posters -- <file|glob|folder> [more...] [options]
 *
 * Examples:
 *   npm run video-posters -- static/videos/web-applications/dst/users-guide/v1.0
 *   npm run video-posters -- "static/videos/**\/*.mp4" --at 2
 *
 * Options:
 *   --at <seconds>  Time of the frame to capture. Default: 0.5.
 *   --force         Replace posters that already exist.
 *   --help          Show this help.
 *
 * Commit the posters with the videos. Run `npm start` (or `npm run image-dims`) afterwards so the
 * site sees the new files.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { globSync } = require('glob');
const ffmpegPath = require('ffmpeg-static');

const VIDEO_EXTS = ['.mp4', '.webm', '.mov', '.m4v'];
const RAW_SUFFIX = '-raw';
const POSTER_SUFFIX = '-poster.jpg';

function fail(message) {
  console.error(`\n  Error: ${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const opts = { at: 0.5, force: false, help: false };
  const inputs = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg === '--force') opts.force = true;
    else if (arg === '--at') {
      const val = parseFloat(argv[++i]);
      if (Number.isNaN(val) || val < 0) fail(`--at must be a number of seconds (got "${argv[i]}")`);
      opts.at = val;
    } else if (arg.startsWith('--')) fail(`Unknown option "${arg}". Use --help to see available options.`);
    else inputs.push(arg);
  }
  return { opts, inputs };
}

const isVideo = (file) => VIDEO_EXTS.includes(path.extname(file).toLowerCase());
const isRaw = (file) => path.basename(file, path.extname(file)).toLowerCase().endsWith(RAW_SUFFIX);
const posterFor = (file) => path.join(path.dirname(file), path.basename(file, path.extname(file)) + POSTER_SUFFIX);

function resolveInputs(inputs) {
  const files = new Set();
  for (const input of inputs) {
    let matches = [];
    if (fs.existsSync(input) && fs.statSync(input).isDirectory()) {
      matches = globSync(`${input.replace(/\\/g, '/')}/**/*.{${VIDEO_EXTS.map((e) => e.slice(1)).join(',')}}`, { nodir: true });
    } else if (/[*?[\]{}]/.test(input)) {
      matches = globSync(input.replace(/\\/g, '/'), { nodir: true });
    } else if (fs.existsSync(input)) {
      matches = [input];
    } else {
      console.warn(`  Skipping (not found): ${input}`);
      continue;
    }
    for (const m of matches) if (isVideo(m) && !isRaw(m)) files.add(path.resolve(m));
  }
  return [...files];
}

function main() {
  const { opts, inputs } = parseArgs(process.argv.slice(2));
  if (opts.help || inputs.length === 0) {
    console.log(
      [
        '',
        '  Create a "<clip>-poster.jpg" frame for each video that lacks one.',
        '',
        '  Usage:',
        '    npm run video-posters -- <file|glob|folder> [more...] [options]',
        '',
        '  Options:',
        '    --at <seconds>  Time of the frame to capture. Default: 0.5.',
        '    --force         Replace posters that already exist.',
        '    --help          Show this help.',
        '',
      ].join('\n'),
    );
    process.exit(opts.help ? 0 : 1);
  }
  if (!ffmpegPath) fail('ffmpeg-static did not provide an ffmpeg binary for this platform.');

  const files = resolveInputs(inputs);
  if (files.length === 0) fail('No video files found.');

  let made = 0;
  let skipped = 0;
  let failed = 0;
  for (const file of files) {
    const poster = posterFor(file);
    const rel = path.relative(process.cwd(), poster);
    if (fs.existsSync(poster) && !opts.force) {
      skipped++;
      continue;
    }
    // -ss before -i seeks fast; fall back to the first frame for clips shorter than --at.
    let result = spawnSync(ffmpegPath, ['-y', '-loglevel', 'error', '-ss', String(opts.at), '-i', file, '-frames:v', '1', '-q:v', '3', poster]);
    if (result.status !== 0 || !fs.existsSync(poster)) {
      result = spawnSync(ffmpegPath, ['-y', '-loglevel', 'error', '-i', file, '-frames:v', '1', '-q:v', '3', poster]);
    }
    if (result.status === 0 && fs.existsSync(poster)) {
      console.log(`  ✅ ${rel}`);
      made++;
    } else {
      console.warn(`  ⚠️ Could not create ${rel}: ${String(result.stderr || '').trim()}`);
      failed++;
    }
  }
  console.log(`\n  Posters: ${made} created, ${skipped} already present, ${failed} failed.\n`);
  if (failed) process.exit(1);
}

main();
