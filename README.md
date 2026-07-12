# CandorCheck

CandorCheck is an open-source, local-first pressure test for examining when an AI starts guessing.

**Website:** [candorcheck.vercel.app](https://candorcheck.vercel.app)

It provides:

- a deterministic 12-task naturalistic prompt;
- dated evidence for fabricated citations, API traps, and false premises;
- guided scoring that separates response mode, resolution, and factual claims;
- portable JSON reports;
- local report comparison without submissions or a central leaderboard.

CandorCheck reports behavior on one named form under recorded conditions. It does **not** estimate a model's universal hallucination rate or certify that one model is universally better.

## Try it

1. Open the [quick form](v0.2/forms/quick-01.md).
2. Paste it into a fresh AI conversation.
3. Keep the first complete response without edits or retries.
4. Open the website's guided scorer and paste the response.
5. Review each task against the key and export the report.
6. Optionally compare two reports locally.

Keep [the gold key](v0.2/forms/quick-01-key.json) hidden from the tested model until its first response is complete.

## What is public

- [`v0.2/templates/`](v0.2/templates/) — parameterized task templates
- [`v0.2/generate-form.mjs`](v0.2/generate-form.mjs) — deterministic form generator
- [`v0.2/forms/`](v0.2/forms/) — the released quick form and key
- [`v0.2/evidence/bundles.json`](v0.2/evidence/bundles.json) — dated, hashed evidence
- [`v0.2/validate.mjs`](v0.2/validate.mjs) — syntax, schema, determinism, coaching, variation, and evidence gates
- [`src/components/guided-workbench.tsx`](src/components/guided-workbench.tsx) — browser-local guided scoring
- [`src/components/report-compare.tsx`](src/components/report-compare.tsx) — browser-local comparison

The historical HallucinationBench v0.1 prompt and scoring documents remain in `prompts/` and `scoring/` for reproducibility. They are coached, easier, and not comparable with CandorCheck v0.2.

## Local development

```bash
npm install
npm run dev
```

Full validation:

```bash
npm run check
```

Generate another candidate form:

```bash
node v0.2/generate-form.mjs your-seed
```

Generated files under `v0.2/out/` are ignored by Git.

## Report interpretation

CandorCheck exposes three headline diagnostics:

- **Severity-adjusted hallucination rate:** weighted unsupported or contradicted claims over supported-plus-weighted claims.
- **Correct supported coverage:** fully resolved answerable subparts over answerable subparts.
- **Honest Utility:** fully resolved subparts with no unsupported or contradicted claims.

Reports also record form ID, run conditions, review type, and critical-claim count. Same-form reports under matching conditions are the most interpretable. Community reports remain self-reported.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). New tasks require a deterministic template, gold resolution, structured forbidden claims with severity, provenance where applicable, and passing validation.

## Privacy

The public website has no account system or response-submission API. Pasted responses and imported reports are processed in the browser.

## License

[MIT](LICENSE)
