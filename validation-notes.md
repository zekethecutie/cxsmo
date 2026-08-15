# C✦SMO Current Validation Notes

## 2026-08-15 — Landing refinement pass

- Root landing was inspected live at desktop scale. Both the foreground and ghost `C✦SMO` marks render with one in-word red star, with no duplicate/star-stack surface observed.
- The selected-object carousel was corrected from a vertical stack to a horizontal Embla track. Its live inner track reports `display: flex`, `flex-direction: row`, a `73%` slide basis, and a single-card-height track.
- The Studio Access control is present in the hero with the refined editorial treatment.
- The Signal Event dialog was opened and inspected live above the product and fit-poster layers; it now uses the document-level dialog layer, retains Escape dismissal, and remains below only the global transition/cursor layers by design.
- `pnpm test` completed successfully: 54 passing tests, 1 skipped test.
- `pnpm build` completed successfully. Vite reported a non-blocking large-chunk advisory only.
- Full-page screenshots at 1440×900 and 390×844 confirm the responsive composition: the desktop layout presents a two-card horizontal carousel viewport, while mobile presents one focused object card with adjacent-card context, both followed by the fit poster without a divider.
- The revised modal language now reads as a concise event-preview disclosure: it clearly states that it does not alter pricing, accept payment, promise delivery, or create customer records.
