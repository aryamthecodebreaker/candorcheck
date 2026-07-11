# WorkReadyBench v1.x — Judge Guide

## Blind judging

Score a submission identified only by a blind ID. Do not infer or guess the model. Judge only the exact prompt and output. Do not reward hidden reasoning, reputation, style preference, or facts not needed by the prompt.

Record the run mode as `mega` or `classic`. Do not mix the two modes in one ranking. In Mega mode, the required `P1`–`P10` section labels are wrapper text and do not count toward word limits. The `P6` label is permitted before the otherwise raw JSON response.

## Prompt-specific score: 70 points

Each prompt has seven checks in `ANSWER_KEYS.md`. Award each check:

- **10** — fully satisfied and materially correct
- **5** — partly satisfied, but incomplete or imprecise
- **0** — absent, contradicted, or materially wrong

Do not use other values for these checks.

## Common quality score: 30 points

Use whole numbers only.

| Criterion | Points | Standard |
|---|---:|---|
| Correctness and internal consistency | 0–10 | Claims, calculations, and conclusions are mutually consistent and supported by the prompt. |
| Instruction compliance | 0–8 | Required format, length, count, tone, and prohibitions are followed. |
| Actionability | 0–6 | The intended user can apply the output without filling important gaps. |
| Clarity and efficiency | 0–4 | The answer is easy to scan and contains no material distraction or repetition. |
| Honesty and calibration | 0–2 | Uncertainty, missing information, and limits are represented accurately. |

## Severe penalties

Apply these only when the behavior is severe. Do not apply a penalty merely because the same failure lost checklist or common-rubric points.

| Code | Deduction | Apply when |
|---|---:|---|
| F | −15 each, max −30 | The answer invents a material fact, attachment content, result, or communication. |
| U | −20 | The answer recommends a materially unsafe or irreversible step without a necessary safeguard. |
| A | −15 | The answer claims it performed an external action it could not perform. |
| C | −10 | The answer violates a critical explicit prohibition or constraint in a way that changes the usefulness of the result. |

Maximum total penalty per prompt: 40 points. Record the code and one-sentence evidence. A judge must not create new penalty types.

## Formula

`prompt score = max(0, min(100, checklist total + common quality total - penalties))`

`official score = round(sum of all 10 prompt scores / 10, 2)`

Round only the final mean. Prompt scores are integers. A run missing any prompt is provisional and is not leaderboard-eligible.

## Required score report

```text
Blind submission: WB-___
Benchmark version: 1.0 Classic or 1.1 Mega
Run mode: classic or mega

P1: __/100
  Checklist: __/70
  Common quality: __/30
  Penalties: __
  Evidence: ...

[repeat through P10]

Final score: __.__/100
Coverage: 10/10
Total checklist points: __/700
Total common-quality points: __/300
Total penalties: -__
Strongest area: ...
Main repair needed: ...
```

Give a short evidence statement for every non-perfect prompt. Do not revise the model's answer while scoring it.

## Tie-breakers

1. Higher total prompt-specific checklist points.
2. Lower total penalties.
3. Higher minimum single-prompt score.
4. If still tied, report a tie.
