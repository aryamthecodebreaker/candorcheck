# Contributing to CandorCheck

Issues, documentation improvements, evidence corrections, accessibility fixes, and new task templates are welcome.

## Before opening a pull request

1. Keep the product local-first: do not add response uploads, accounts, tracking, or a hosted leaderboard.
2. Do not claim that a form score is a universal model hallucination rate.
3. Run `npm run check`.
4. Keep unrelated changes out of the pull request.

## New task requirements

Every task must include:

- a stable template ID and category;
- deterministic generation from the provided RNG;
- subpart-level `answerable`, `gold`, and `allowed` fields;
- structured forbidden claims with stable IDs and severity `1`, `3`, or `5`;
- naturalistic wording without coaching phrases;
- a dated evidence bundle for real-world absence or false-premise claims.

The task must survive the variant sweep in `v0.2/validate.mjs`. A passing validator is necessary but not sufficient: maintainers may request pilot evidence that the task is neither trivial nor ambiguous.

## Evidence corrections

Use immutable release commits for API evidence. Negative citation checks must record the query, index, result count, exact-title match count, timestamp, and response hash. “No record found” must never be rewritten as proof of nonexistence.

## Reports

Do not submit model score files for official ranking. CandorCheck does not maintain one.
