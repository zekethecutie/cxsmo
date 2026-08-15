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

## 2026-08-15 — Follow-up landing repair

The first CSS-only star-mask repair was checked live. Its use of `font-size: 0` collapsed the em-based mask box, so the visible stars disappeared rather than exposing the intended clean construction. The correction restores inherited type sizing while retaining one clipped geometric star per mark; the follow-up check will verify it after the surrounding catalogue and navigation changes are integrated.

The follow-up desktop check confirms the corrected approach: the foreground and lower ghost constructions each use a single CSS-drawn four-point star with no hidden text-glyph layer and no visible lower-point clipping. The Enter the Drop and Studio Access controls now share the same width and height, with their labels centred on the same baseline.

The full landing check confirms that the carousel controls are now labelled `Back` and `Next`, remain below the card surface, and do not overlap object details. The public shop check confirms that the mapped belt, sweatpant, eyewear, moto jacket, and cosmetic-case renders are present, and that Stellar Cargo Pants appears as object 18 in the Bottoms category.

Mobile full-page verification confirms the repaired one-star root mark, symmetric stacked CTAs, labelled carousel controls, and a responsive Stellar Cargo Pants detail route with its mapped approved render, collection tag, size selection, and portfolio-safe bag action.
