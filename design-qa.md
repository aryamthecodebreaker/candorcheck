# CandorCheck redesign QA

## Comparison target

- Source visual truth: `.design-audit/selected-combined.png`
- Rendered implementation: `.design-audit/implementation-home-1440-final.png`
- Supporting mobile capture: `.design-audit/implementation-home-mobile.png`
- Supporting route captures: `.design-audit/implementation-benchmark-1440.png` and `.design-audit/implementation-scoring-1440.png`
- Viewport: 1440 × 1024 desktop; 390 × 844 mobile
- State: homepage at the top of a new test, response empty, progress 0/12

## Full-view comparison evidence

The selected mock and the final desktop capture were opened together in one comparison input at the same viewport and state. The implementation preserves the mock’s major proportions and hierarchy: compact dark header, two-column hero, acid-lime primary action, three-step rail, status strip, warm evidence packet, and dark response workspace. The actual public prompt replaces the mock’s illustrative copy.

## Focused-region evidence

A separate crop was not necessary because the 1440 × 1024 full-view comparison keeps the header, hero, CTA, journey rail, status row, packet title, response title, colors, rules, and typography legible. The detailed scoring route was reviewed separately at the same viewport.

## Required fidelity surfaces

- Fonts and typography: Source Serif 4 recreates the editorial display voice; DM Sans supplies the compact interface text. Heading weight, line length, mono labels, and wrapping match the selected direction without clipping.
- Spacing and layout rhythm: Desktop uses the source’s split hero and stacked rails. The actual test workspace begins above the fold. Mobile collapses to a single readable column with the primary action visible in the first viewport and no horizontal overflow.
- Colors and tokens: Charcoal `#0b0d0c`, warm paper `#f4f0e7`, burnt orange `#ec5b20`, and acid lime `#bdff2d` match the selected mock. The rejected blue direction is absent.
- Image quality and asset fidelity: The warm packet uses an optimized generated paper texture stored at `public/paper-texture.webp`; it is sharp, neutral, contains no embedded text, and weighs under 80 KB. Interface icons use Phosphor rather than handcrafted SVG or CSS drawings.
- Copy and content: Production copy accurately describes CandorCheck. The illustrative mock prompt was replaced with the real frozen 12-task form.

## Comparison history

### Iteration 1

- P2: The first implementation wrapped the hero heading across five lines, making the hero taller than the source and pushing the workspace down.
- P2: Test facts were laid out as separate grid cells, causing the time and privacy labels to collide.
- Fixes: Reduced and rebalanced the display scale; converted the facts into complete icon-and-label rows; tightened hero spacing.
- Post-fix evidence: `.design-audit/implementation-home-1440-v3.png`

### Iteration 2

- P2: The heading still occupied three lines and the homepage did not show the Test navigation state as active.
- Fixes: Reduced the final desktop display size, widened the natural line fit, and marked Test active on both `/` and `/benchmark`.
- Post-fix evidence: `.design-audit/implementation-home-1440-final.png`

## Interaction and accessibility checks

- Copy prompt action tested.
- Homepage response field tested with a complete H1–H12 response.
- Continue-to-scoring handoff tested; the scorer received and parsed all 12 numbered answers.
- Guided scoring, benchmark, comparison, and methodology routes remain available.
- Keyboard-native links, buttons, textarea, form fields, semantic landmarks, labels, focus styles, and disabled states are present.
- Browser console checked: no warnings or errors.

## Findings

- P0: none.
- P1: none.
- P2: none remaining.
- P3: The mock includes a decorative theme icon; the implementation omits it because the product currently offers only the selected dark theme.

## Final result

final result: passed
