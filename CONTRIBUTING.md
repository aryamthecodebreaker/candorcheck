# Contributing to HallucinationBench

Contributions are welcome when they improve clarity, reproducibility, accessibility, or evidence quality.

## Before proposing a benchmark change

Released prompt and answer-key versions are immutable. Do not edit v0.1 in place to change task meaning, a gold resolution, or a scoring rule. Propose the change for a new version and explain:

- which hallucination behavior it tests;
- why the task has one defensible resolution;
- whether the answer is stable over time;
- what evidence supports the gold answer;
- plausible allowed and forbidden claims;
- likely ambiguity or cultural/language bias; and
- how the new form remains comparable in balance and difficulty.

## Website changes

1. Install dependencies with `npm install`.
2. Create a focused branch.
3. Make the smallest complete change.
4. Run `npm run check`.
5. Verify the affected routes at desktop and mobile widths.
6. Describe the user impact and validation in the pull request.

Do not add analytics, remote response processing, trackers, or API dependencies without an explicit privacy and methodology review.

## Result submissions

Do not add a leaderboard row without the complete raw response, run metadata, per-task score, claim ledger, and reproducible judge evidence. Keep model identity blinded until scoring is final.
