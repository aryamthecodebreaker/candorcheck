# HallucinationBench v0.1 Benchmark Card

## Summary

HallucinationBench v0.1 is a compact, English-language, one-message diagnostic for factual reliability. It contains 24 independent tasks balanced across eight hallucination behaviors. It is designed for text chat models without browsing, tools, files, connectors, or conversation memory.

## Intended uses

- Compare model behavior under a frozen tools-off protocol.
- Diagnose failure patterns across knowledge, grounding, uncertainty, missing evidence, citations, ambiguity, false premises, and unavailable external actions.
- Create evidence-backed regression checks during model or prompt changes.
- Teach evaluators how to separate factual reliability, usefulness, abstention, and confidence calibration.

## Out-of-scope uses

- Claiming a universal or production-wide hallucination rate.
- Certifying medical, legal, financial, security, or other high-stakes safety.
- Measuring multimodal understanding, browsing quality, tool use, retrieval quality, or agent execution.
- Ranking models tested with different benchmark versions or incompatible run conditions.
- Using a single run as a statistically precise estimate of model behavior.

## Benchmark composition

There are three tasks in each category:

1. Stable factual knowledge
2. Supplied-document grounding
3. Underdetermined questions
4. False-premise resistance
5. Missing evidence or attachments
6. Citation and quotation fidelity
7. Ambiguous or conflicting evidence
8. External-action honesty

Tasks are interleaved. General-knowledge questions use stable, noncontroversial facts; document questions use synthetic self-contained records. No answer requires current information or web access.

## Metrics

Primary profile:

- Reliability Score
- Claim Hallucination Rate
- Severity-adjusted Claim Hallucination Rate
- Weighted Hallucination Burden
- Hallucination-free Task Rate
- Correct Coverage
- Abstention precision, recall, and F1
- Capability honesty
- Critical-claim count
- Calibration error
- Schema compliance

Hallucination claims are weighted minor ×1, material ×3, or critical ×5. The Reliability Score rewards correct resolution, correct epistemic basis, and zero unsupported claims per task. Coverage and abstention are reported separately to prevent blanket refusal from looking reliable.

## Evaluation process

Use the exact frozen prompt in a fresh chat and capture the first complete response. Blind the model identity. Judges apply the locked answer key, produce per-task scores, and maintain an atomic claim ledger. Two independent judges are recommended for pilot and consequential comparisons.

## Known limitations

- Small sample: 24 tasks provide diagnostic breadth, not statistical precision across all possible questions.
- Language: only English is covered.
- Context: all tasks occur in one message, creating possible cross-task and position effects.
- Mode: tools-off performance may not predict grounded, retrieval-augmented, or agentic performance.
- Human judgment: atomic claim boundaries and severity may require adjudication.
- Public contamination: the public prompt and key may eventually be present in training data or model-specific tuning.
- Variance: one first response does not reveal the full sampling distribution.

## Contamination policy

v0.1 is a transparent public pilot. Never present it as a secure hidden test. Future rigorous comparisons should use private equivalent forms, frozen before evaluation, with matched category balance and independently checked gold answers.

## Maintenance

Released prompt text, gold answers, and scoring rules are immutable. Corrections require a new semantic version. Leaderboards must be partitioned by benchmark version and standard/non-standard status.

## License

MIT License. See `LICENSE`.
