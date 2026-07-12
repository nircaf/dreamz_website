# Research paper figures

## Goal

Add a meaningful visual beside each of the 10 papers on `dreamz-research.html` so readers can understand the paper's central result more quickly.

## Source and accuracy rules

- Verify every visual against the linked primary paper, its abstract, full text, or supplementary material.
- Do not infer an exact numeric effect when the source does not report one clearly.
- Label conceptual or qualitative visuals as such.
- Keep the existing plain-language summaries, correcting them only if primary-source review reveals an inaccurate claim.
- Link each figure or caption back to the paper already cited by the card.

## Hybrid figure strategy

- Prefer an original, inline SVG result graphic in the Dreamz visual style.
- Use an actual paper figure only when all three conditions are met:
  1. the figure directly explains the result summarized on the page;
  2. the full figure remains readable at the card's display size; and
  3. the article provides clear open-access reuse permission.
- If licensing is unclear, create an original summary graphic instead of copying the publisher artwork.
- Credit any reused open-access figure with paper, figure number, source link, and license.

## Layout

- Desktop study rows have three regions: citation metadata, explanation, and figure panel.
- The figure panel sits to the right of its matching paper and uses a consistent aspect ratio, border, background, and caption treatment.
- Each panel includes a concise `What the study found` label and a plain-language caption.
- Mobile stacks the figure below the explanation without horizontal scrolling.
- Existing filters, reveal behavior, paper links, and semantic scholarly-article markup remain functional.

## Visual language

- Use the page's existing navy, violet, muted-blue, and white palette.
- Keep charts intentionally simple: comparison bars, waveform/timing diagrams, or small before/after plots as appropriate.
- Provide text labels and captions so meaning does not depend on color alone.
- Avoid decorative scientific imagery that does not communicate a reported finding.

## Implementation constraints

- Modify `dreamz-research.html` and add local image assets only when an openly licensed paper figure is selected.
- Use inline SVG and existing CSS/JavaScript; add no charting library or dependency.
- Preserve unrelated working-tree changes in the already-modified research page.

## Verification

- Confirm all 10 study cards contain exactly one matching figure panel.
- Confirm every claim and numeric label is supported by its linked primary source.
- Confirm any copied paper figure includes complete license attribution.
- Verify desktop and mobile layout, link behavior, alt/accessibility text, and absence of console errors.
