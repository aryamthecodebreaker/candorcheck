// CandorCheck v0.2 candidate form generator.
//
// Usage:
//   node v0.2/generate-form.mjs <seed>
//
// Emits two files under v0.2/out/:
//   form-<seed>.md        naturalistic prompt (public; no epistemic schema)
//   goldkey-<seed>.json   private gold key (KEEP HIDDEN FROM MODELS)
//
// Deterministic: the same seed always produces byte-identical output.
// This is a CANDIDATE batch (2 templates/category) for trap-design validation,
// not the frozen 80-template v0.2 bank.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeRng, shortHash } from './lib/rng.mjs';
import { CATEGORIES } from './templates/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function main() {
  const seed = process.argv[2];
  if (!seed) {
    console.error('Usage: node v0.2/generate-form.mjs <seed>');
    process.exit(1);
  }

  const formId = `cc-v0.2-${shortHash(seed)}`;

  // Each template gets its own deterministic sub-seed so adding templates
  // later does not shift the RNG stream of existing ones.
  const generated = [];
  for (const [, tmpls] of CATEGORIES) {
    for (const tmpl of tmpls) {
      const rng = makeRng(`${seed}::${tmpl.id}`);
      const gen = tmpl.generate(rng);
      generated.push({ template: tmpl.id, category: tmpl.category, ...gen });
    }
  }

  // Deterministic form-level shuffle so task position never signals category
  // across forms; constrained so no two same-category tasks are adjacent.
  const orderRng = makeRng(`${seed}::order`);
  const items = shuffleNoAdjacentCategory(generated, orderRng);

  items.forEach((it, i) => (it.taskNumber = `H${i + 1}`));

  writeFiles(formId, seed, items);
  console.log(`Form ${formId} (seed "${seed}"): ${items.length} tasks written to v0.2/out/`);

  const pending = items.filter((it) => it.evidence && String(it.evidence.status).includes('pending'));
  if (pending.length) {
    console.log(`\n${pending.length} task(s) require a dated evidence bundle before pilot use (SPEC Section 6):`);
    for (const it of pending) console.log(`  - ${it.taskNumber} ${it.template}`);
  }
}

// Seeded shuffle, re-drawn (deterministically) until no two adjacent tasks
// share a category. With 6 categories x 2 items a valid order is abundant,
// so this terminates almost immediately.
function shuffleNoAdjacentCategory(items, rng) {
  for (let attempt = 0; attempt < 1000; attempt++) {
    const order = rng.shuffle(items);
    if (order.every((it, i) => i === 0 || it.category !== order[i - 1].category)) return order;
  }
  throw new Error('Could not find a shuffle with no adjacent same-category tasks');
}

function writeFiles(formId, seed, items) {
  const outDir = process.env.CANDORCHECK_OUT_DIR || join(__dirname, 'out');
  mkdirSync(outDir, { recursive: true });

  // Public prompt: naturalistic, no Basis/Confidence schema.
  const promptLines = [
    `# CandorCheck v0.2 quick form — ${formId}`,
    '',
    'Answer each of the following as you normally would. Number your answers to match.',
    '',
  ];
  for (const it of items) {
    promptLines.push(`## ${it.taskNumber}`, '', it.prompt, '');
  }
  writeFileSync(join(outDir, `form-${seed}.md`), promptLines.join('\n'), 'utf8');

  // Private gold key.
  const goldKey = {
    formId,
    seed,
    version: 'candorcheck-v0.2-quick',
    generatedFrom: 'v0.2/generate-form.mjs',
    warning: 'Keep this key hidden from the tested model until its first response is complete.',
    tasks: items.map((it) => ({
      taskNumber: it.taskNumber,
      template: it.template,
      category: it.category,
      prompt: it.prompt,
      evidence: it.evidence ?? { status: 'not-required' },
      subparts: it.subparts,
    })),
  };
  writeFileSync(join(outDir, `goldkey-${seed}.json`), JSON.stringify(goldKey, null, 2), 'utf8');
}

main();
