// v0.2 validation: syntax-checks every .mjs under v0.2/, verifies generator
// determinism, and enforces the gold-key schema. Run via `npm run validate:v0.2`
// (included in `npm run check`). Exits non-zero on any failure.

import { execFileSync } from 'node:child_process';
import { readdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeRng } from './lib/rng.mjs';
import { allTemplates } from './templates/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const failures = [];

// Flatten every evidence bundle id into one set for cross-referencing.
const bundles = JSON.parse(readFileSync(join(__dirname, 'evidence', 'bundles.json'), 'utf8'));
const bundleEntries = ['citations', 'apis', 'premises'].flatMap((group) =>
  Object.entries(bundles[group] ?? {}).map(([id, entry]) => [id, { ...entry, group }]),
);
const bundleById = new Map(bundleEntries);
const bundleIds = new Set(bundleById.keys());

const SEVERITIES = new Set([1, 3, 5]);
const COACHING = [/basis:/i, /confidence:/i, /insufficient_information/i, /capability_limit/i, /do not invent/i, /cannot be determined/i, /is (not )?available in this chat/i, /has not (yet )?been released/i, /neither reading is validated/i, /no rule .* is provided/i];

function checkSubparts(where, subparts) {
  if (!Array.isArray(subparts) || subparts.length === 0) { fail(`schema: ${where} no subparts`); return; }
  for (const sp of subparts) {
    const spWhere = `${where} subpart ${sp.id}`;
    if (typeof sp.answerable !== 'boolean') fail(`schema: ${spWhere} answerable must be boolean`);
    if (typeof sp.gold !== 'string' || !sp.gold.trim()) fail(`schema: ${spWhere} missing gold`);
    if (!Array.isArray(sp.allowed) || sp.allowed.some((x) => typeof x !== 'string')) fail(`schema: ${spWhere} allowed must be string[]`);
    if (!Array.isArray(sp.forbidden) || sp.forbidden.length === 0) fail(`schema: ${spWhere} missing forbidden claims`);
    for (const fb of sp.forbidden ?? []) {
      if (typeof fb !== 'object' || fb === null) { fail(`schema: ${spWhere} forbidden entry must be an object`); continue; }
      if (typeof fb.id !== 'string' || !fb.id.trim()) fail(`schema: ${spWhere} forbidden entry missing id`);
      if (typeof fb.description !== 'string' || !fb.description.trim()) fail(`schema: ${spWhere} forbidden entry missing description`);
      if (!SEVERITIES.has(fb.severity)) fail(`schema: ${spWhere} forbidden "${fb.id}" severity must be 1, 3, or 5`);
    }
  }
}

function checkCoaching(where, prompt) {
  for (const re of COACHING) {
    if (re.test(prompt)) fail(`coaching: ${where} prompt matches ${re}`);
  }
}

function fail(msg) {
  failures.push(msg);
  console.error(`FAIL ${msg}`);
}

// Evidence bundles are data, so validate their proof shape instead of merely
// checking that an id exists.
if (bundles._meta?.schemaVersion !== 2) fail('evidence: bundles schemaVersion must be 2');
if (!/^\d{4}-\d{2}-\d{2}T/.test(bundles._meta?.retrievedAt ?? '')) fail('evidence: missing ISO retrievedAt');
for (const [id, entry] of bundleEntries) {
  const expectedKind = entry.group === 'apis' ? 'api' : entry.group.slice(0, -1);
  if (entry.kind !== expectedKind) fail(`evidence: ${id} kind does not match ${entry.group}`);
  if (!['no-record-found', 'premise-false'].includes(entry.verdict)) fail(`evidence: ${id} has invalid verdict`);
  if (!Array.isArray(entry.captures) || entry.captures.length === 0) fail(`evidence: ${id} has no captures`);
  for (const capture of entry.captures ?? []) {
    if (typeof capture.url !== 'string' || !capture.url.startsWith('https://')) fail(`evidence: ${id} capture needs an https URL`);
    if (/\/latest(?:\/|$)/i.test(capture.url ?? '')) fail(`evidence: ${id} uses a rolling latest URL`);
    const hasHash = /^[a-f0-9]{64}$/.test(capture.sha256 ?? '');
    const isManual = capture.captureMode === 'manual' && typeof capture.support === 'string';
    if (!hasHash && !isManual) fail(`evidence: ${id} capture needs sha256 or an explicit manual support record`);
  }
  if (entry.kind === 'citation') {
    const indexes = new Set(entry.captures.map((capture) => capture.index));
    if (!indexes.has('Crossref') || !indexes.has('OpenAlex')) fail(`evidence: ${id} needs Crossref and OpenAlex captures`);
    if (entry.captures.some((capture) => capture.exactTitleMatches !== 0)) fail(`evidence: ${id} has a nonzero exact-title match`);
  }
  if (entry.kind === 'api') {
    if (!/^\d+\.\d+\.\d+$/.test(entry.versionPin?.version ?? '')) fail(`evidence: ${id} needs an exact semantic version`);
    if (!/^[a-f0-9]{40}$/.test(entry.versionPin?.commit ?? '')) fail(`evidence: ${id} needs a 40-character source commit`);
    if (entry.captures.some((capture) => !capture.url.includes(entry.versionPin.commit))) fail(`evidence: ${id} capture is not pinned to its source commit`);
  }
}

// 1. Syntax-check every .mjs under v0.2/ (catches truncated/unused files that
// imports alone would miss).
function listMjs(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name === 'out' || e.name === 'node_modules') return [];
    const p = join(dir, e.name);
    return e.isDirectory() ? listMjs(p) : e.name.endsWith('.mjs') ? [p] : [];
  });
}
for (const file of listMjs(__dirname)) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (err) {
    fail(`syntax: ${file}\n${err.stderr}`);
  }
}

// 2. Generator determinism: same seed twice -> byte-identical output.
const SEED = 'validate-fixed-seed';
function generateTo(dir, seed = SEED) {
  execFileSync(process.execPath, [join(__dirname, 'generate-form.mjs'), seed], {
    stdio: 'pipe',
    env: { ...process.env, CANDORCHECK_OUT_DIR: dir },
  });
  return {
    form: readFileSync(join(dir, `form-${seed}.md`), 'utf8'),
    key: readFileSync(join(dir, `goldkey-${seed}.json`), 'utf8'),
  };
}

// The released public form must be exactly reproducible from its recorded seed.
const releaseDir = mkdtempSync(join(tmpdir(), 'candorcheck-release-'));
try {
  const released = generateTo(releaseDir, 'public-quick-01');
  const committedForm = readFileSync(join(__dirname, 'forms', 'quick-01.md'), 'utf8');
  const committedKey = readFileSync(join(__dirname, 'forms', 'quick-01-key.json'), 'utf8');
  if (released.form !== committedForm || released.key !== committedKey) fail('release: quick-01 files drifted from seed public-quick-01');
} catch (err) {
  fail(`release: ${err.message}`);
} finally {
  rmSync(releaseDir, { recursive: true, force: true });
}
const dirA = mkdtempSync(join(tmpdir(), 'hbv02-a-'));
const dirB = mkdtempSync(join(tmpdir(), 'hbv02-b-'));
let key = null;
try {
  const a = generateTo(dirA);
  const b = generateTo(dirB);
  if (a.form !== b.form || a.key !== b.key) fail('determinism: same seed produced different output');
  key = JSON.parse(a.key);
} catch (err) {
  fail(`generator: ${err.message}`);
} finally {
  rmSync(dirA, { recursive: true, force: true });
  rmSync(dirB, { recursive: true, force: true });
}

// 3. Gold-key schema and form-level checks on the fixed-seed form.
if (key) {
  const seenTemplates = new Set();
  if (!Array.isArray(key.tasks) || key.tasks.length === 0) fail('schema: no tasks');
  key.tasks.forEach((task, i) => {
    const where = `${task.taskNumber ?? `task[${i}]`} (${task.template})`;
    if (task.taskNumber !== `H${i + 1}`) fail(`schema: ${where} numbering gap`);
    if (seenTemplates.has(task.template)) fail(`schema: duplicate template ${task.template}`);
    seenTemplates.add(task.template);
    if (typeof task.prompt !== 'string' || !task.prompt.trim()) fail(`schema: ${where} empty prompt`);
    if (!task.evidence || typeof task.evidence.status !== 'string') fail(`schema: ${where} missing evidence.status`);
    checkSubparts(where, task.subparts);
  });
  // No adjacent tasks from the same category (position must not leak category).
  key.tasks.forEach((task, i) => {
    if (i > 0 && task.category === key.tasks[i - 1].category) {
      fail(`ordering: ${task.taskNumber} adjacent to same-category ${key.tasks[i - 1].taskNumber}`);
    }
  });
}

// 4. Variant sweep: exercise every template across many seeds so the coaching
// scan and schema checks cover every randomized row/phrase combination, not
// just the one fixed-seed form. 200 deterministic seeds per template makes the
// chance of an unvisited pick branch negligible (largest pool is 5 options:
// (4/5)^200 ~ 10^-20). Distinct variant counts are printed so a template whose
// variation collapsed (always same prompt) is visible.
const SWEEP_SEEDS = 200;
for (const tmpl of allTemplates) {
  const variants = new Set();
  for (let i = 0; i < SWEEP_SEEDS; i++) {
    const rng = makeRng(`sweep-${i}::${tmpl.id}`);
    let gen;
    try {
      gen = tmpl.generate(rng);
    } catch (err) {
      fail(`sweep: ${tmpl.id} seed sweep-${i} threw: ${err.message}`);
      break;
    }
    variants.add(gen.prompt);
    checkCoaching(`${tmpl.id} (seed sweep-${i})`, gen.prompt);
    checkSubparts(`${tmpl.id} (seed sweep-${i})`, gen.subparts);
    // Evidence gating: any row asserting a real-world absence/falsehood must be
    // 'verified' and point to an existing frozen bundle. Nothing ships 'pending'.
    const ev = gen.evidence;
    if (ev) {
      if (ev.status === 'pending-verification') fail(`evidence: ${tmpl.id} (seed sweep-${i}) still pending-verification`);
      if (ev.status === 'verified') {
        if (!ev.evidenceId) fail(`evidence: ${tmpl.id} (seed sweep-${i}) verified but has no evidenceId`);
        else if (!bundleIds.has(ev.evidenceId)) fail(`evidence: ${tmpl.id} (seed sweep-${i}) references missing bundle "${ev.evidenceId}"`);
        else if (ev.version && bundleById.get(ev.evidenceId)?.versionPin?.version !== ev.version) {
          fail(`evidence: ${tmpl.id} version does not match bundle ${ev.evidenceId}`);
        }
      }
    }
  }
  if (variants.size < 2) fail(`sweep: ${tmpl.id} produced ${variants.size} distinct prompt(s) across ${SWEEP_SEEDS} seeds — parameterization is broken`);
  console.log(`sweep: ${tmpl.id} — ${variants.size} distinct variants across ${SWEEP_SEEDS} seeds, all clean`);
}

if (failures.length) {
  console.error(`\nv0.2 validation FAILED: ${failures.length} problem(s).`);
  process.exit(1);
}
console.log('v0.2 validation passed: syntax, determinism, schema, ordering, full-variant coaching sweep.');
