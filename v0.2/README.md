# CandorCheck v0.2

This directory contains the deterministic 12-task quick-form system used by the public self-test lab.

## Contents

- `lib/rng.mjs` — deterministic seeded RNG and stable short hash
- `templates/` — 12 parameterized templates across six pressure categories
- `generate-form.mjs` — deterministic form generator
- `forms/quick-01.md` — released public form
- `forms/quick-01-key.json` — released gold key; hide it from the tested model until the first response is complete
- `evidence/bundles.json` — dated and hashed evidence
- `validate.mjs` — syntax, determinism, schema, variation, coaching, ordering, and evidence checks
- `out/` — ignored scratch output

## Generate a candidate form

```bash
node v0.2/generate-form.mjs your-seed
```

The same seed produces byte-identical content. Every template receives its own sub-seed, and task ordering is shuffled separately with no adjacent same-category tasks.

## Validate

```bash
npm run validate:v0.2
```

Validation checks every JavaScript module, generates the same form twice, validates the gold schema, sweeps every template across 200 deterministic seeds, rejects coaching language, checks category ordering, and requires every real-world trap to reference a complete evidence bundle.

## Evidence

Citation traps record Crossref and OpenAlex query captures with exact-title match counts and response hashes. API traps pin exact versions to resolved source commits and source-body hashes. Premise traps cite authoritative library or government material. `no-record-found` means only no exact record in the recorded verification set.

Evidence was retrieved on 2026-07-12 and must be rechecked before a later release.

## Status

The released quick form is suitable for transparent community self-testing. It is not a contamination-resistant private instrument and has not completed the larger multi-family/equated-form research program described in `SPEC_v0.2.md`.
