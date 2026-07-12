# CandorCheck design QA

## Comparison target

- Source: the previously published HallucinationBench home page, captured at approximately 1264 × 720.
- Implementation: the local CandorCheck home page, captured at approximately 1264 × 720.
- Intent: preserve the existing editorial identity while changing the product journey from model ranking to a public, self-serve honesty pressure test.

## Visual review

- P0: none.
- P1: none.
- P2: the first clipboard implementation could stall when browser permission prompts did not resolve. Fixed with a timed, local fallback and re-tested successfully.
- The cream/black/acid-green palette, heavy headline typography, compact navigation, border language, and generous whitespace remain visually consistent with the source.
- The new headline, calls to action, and navigation now lead clearly through Start a test → Score locally → Compare reports → How it works.
- The hero remains readable at the tested desktop viewport without overlap, clipped controls, or unintended horizontal scrolling.

## Interaction review

- The public 12-task prompt renders and copies successfully.
- The guided scorer parses a numbered 12-answer response, reveals one frozen key at a time, tracks reviewed tasks accurately, and keeps report export disabled until all tasks are reviewed.
- Local comparison accepts exported CandorCheck JSON reports and explicitly distinguishes same-form from different-form comparisons.
- Core controls are keyboard-addressable and use visible labels, semantic headings, fieldsets, status regions, and disabled states.

## Final result

final result: passed
