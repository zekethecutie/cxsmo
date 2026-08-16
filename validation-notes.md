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

## 2026-08-15 — Mobile-native layout pass

The original compact phone audit confirmed the reported density problem: the shared header controls, poster-hero layers, and route-level desktop spacing produced too many competing elements at once. A dedicated mobile-native override now turns the shell into a 58px icon-led header, adds phone-scale gutters and typography, reduces product-card density, and stacks product, bag, checkout, information, account, legal, and studio surfaces with larger breathing room.

The follow-up 375×812 route review confirms the revised root campaign hero has a single readable type block, one clear action, a smaller campaign cutout, and no overlapping study card. The shop, fit edits, information, account, bag, checkout, and studio-gate views now keep control groups touch-safe and visibly separated. The mobile menu, promotion dialog, and guided-tour overlays also receive dedicated compact card and control rules.

The entry-route follow-up also verified the shared CSS-drawn mark remains a single visible star construction at mobile scale. The old desktop-orientation advisory is now removed on compact phones so it cannot crowd the root hero.

## 2026-08-15 — Fuller-star and compact mobile stage follow-up

The reusable and root-specific C✦SMO star rules now use a fuller condensed four-point geometry, avoiding the thin diamond-like mark while keeping a single unclipped construction. The Silver Crown object is now the **Silver Crown Crimson Sling Bag** in Lifestyle, and the existing transparent **LOUD ENOUGH Longsleeve** is shop-ready as object 19.

At 257×464, the root landing now keeps only its essential controls with equal clean CTAs, and the storefront hero becomes a restrained 16:10 campaign frame above a smaller headline and one Shop action. The ultra-narrow header removes nonessential sound/disclosure chrome, while the mobile navigation panel has a centred bounded layout to prevent cut-off.

## 2026-08-15 — Fit-library integration

The `/cxsmo/edits` route now uses the supplied black-red full fit, five-look mens lineup, and women’s styling sheet as three distinct editorial frames. Their captions clearly distinguish styling direction from shoppable inventory and guide visitors only toward currently listed categories. Desktop keeps the three-frame composition as an asymmetric fashion spread; phone view stacks it into a readable, full-width sequence without crop loss or overlap.

The adjacent **Community context / editorial only** surface explicitly reserves reviews, ratings, and endorsements for future verified submissions rather than fabricating them. The mockup brief registers 18 uncovered garment and accessory concepts with individual and 4×3-contact-sheet generation prompts.

## 2026-08-15 — Individual fit-library crop extraction

The five mens and ten womens sheet looks are now deterministically cropped into individual full-look PNGs, registered in deployment-safe storage, and rendered as fifteen distinct Fit Edits cards. Each card has its own fit-file identifier, title, alt text, and category-level shop link. Desktop presents the fits as a five-column editorial index; the 375px phone layout reorganizes them as touch-safe two-column cards, with no composite-sheet card retained.

## 2026-08-15 — Fit-library discovery controls

The Fit Edits page now presents All, Mens, and Womens filters with an audible live count, and each individual card provides a persistent mobile-safe **Shop the look** path plus a **View breakdown** control. The quick-view is portal-mounted above page content, Escape- and overlay-dismissible, and labels its linked products as compatible current C✦SMO pieces rather than claiming unlisted garments are sold. The Style Notes panel now includes a ready-to-copy transparent mockup master prompt and a Studio asset-map entry point. Desktop and 375px mobile page captures keep the filter controls, actions, and prompt affordance readable without increasing card density.

## 2026-08-15 — Subject-aware crop revision and numbered sheets

The previously overlapping fit-sheet crops were replaced with fifteen non-overlapping, subject-aware boundaries from the original mens and womens sheets. Desktop Fit Edits inspection confirms that each card now shows one central full-outfit subject without adjacent model figures or stray neighbouring garments. The numbered product sheets are registered separately: repeated current catalogue pieces keep their existing SKU assignment, while unrendered pieces remain visibly planned and non-shoppable. On 375px mobile, individual-card actions stack into full-width touch targets to prevent three miniature controls competing inside a two-column card.

The final 375px Fit Edits capture confirms that the revised crops retain one subject per card, with visibly separated sheet boundaries. Each phone card now stacks the save, product-path, and breakdown controls into discrete full-width rows rather than compressing them into a single crowded line.

## 2026-08-15 — Mobile hero and fit-card response revision

At 375px, the `/cxsmo` hero now reads as a compact framed campaign image at the top of the page, followed by an independent copy/action area rather than a compressed desktop poster. The campaign frame keeps the model group contained and lets **NO SOFT LANDING.** retain its own clear reading space. The Fit Edits page retains its orderly two-column individual-fit index, while the new border/shadow/press-response treatment provides a stronger discoverability cue without adding background clutter.

## 2026-08-15 — Fit deep links and product-fit suggestions

The 375px Chrome Puddle Sweatpant route now presents a mobile-safe **Styled in Fit Edits** strip with four matching fit references and a clear listed-versus-planned disclosure. The Fit Edits deep-link contract is implemented through the `fit` query value, focus moves to the quick-view close action when opened, and the dialog traps Tab navigation. The initial full-page capture intentionally suppresses fixed overlays, so the query-opened quick-view dialog will be checked in a non-full-page phone viewport before release.

The direct 375px `?fit=M / 01` viewport check now succeeds. It opens the exact **Splitline Rugby** breakdown, frames the single model centrally in the dedicated top media area, keeps the close action clear of the image, and leaves the listed Chrome Puddle Sweatpant plus its quick-add control fully readable below. The planned Splitline Rugby Longsleeve remains explicitly non-shoppable.

## 2026-08-15 — Phone hero reset and listed-pairing bundle

The rebuilt 375px `/cxsmo` hero now uses one contained horizontal campaign panel, separate copy beneath it, and an even two-action row. It no longer attempts to position the campaign object, headline, and controls inside a compressed desktop poster field. The Saved Fits-origin `M / 05` breakdown presents two verified current products—Silver Crown Crimson Sling Bag and BLXCK UNIV3RSE Pants—and makes the **Available listed pairing** action explicit. Planned garments are excluded by the on-screen disclosure.

## 2026-08-15 — Portable media export workflow

The recovered workspace now has a reproducible `pnpm media:export` workflow that scans 70 active `/manus-storage` references, copies 41 locally recoverable image, fit-crop, product, and sound resources into `portable-media/manus-storage/`, and writes `portable-media/manifest.json` with source paths, MIME types, byte counts, and SHA-256 hashes. The export totals 19,734,868 bytes.

`CXSMO_ALLOW_MISSING_MEDIA=1 pnpm media:prepare` successfully stages those 41 files at the exact `/manus-storage/...` paths expected by an external Render or local build. With the generated staging present, `pnpm check`, the full suite, and `pnpm build` all succeed: 56 tests pass with 1 skipped. The generated `client/public/manus-storage/` directory is removed after validation and ignored by Git.

Twenty-nine active managed-media references remain explicitly listed in `portable-media/MISSING-SOURCES.md` because their original local files are absent from the restored workspace. No replacement files were fabricated; the external bundle is therefore documented as partial until those originals are supplied.

## 2026-08-16 — Public-media runtime and audio-layer follow-up

The runtime now uses the generated recoverable filename allowlist to serve copied C✦SMO imagery and sound effects from `/images/<filename>`. It leaves unrecovered historical references on their managed `/manus-storage/<filename>` paths, and image requests revert to the managed URL if a copied public file fails. A direct local probe returned HTTP 200 with `image/png` for the recoverable Mercury Orbit Belt public asset, while the newer campaign hero remains intentionally outside the public allowlist because its original source is absent.

The sound layer no longer uses one shared timestamp that suppresses different cues in sequence. It creates independent audio instances, retains small per-cue throttles and per-element hover cooldowns to prevent an audio storm, reduces hover response delay to 110 ms, and supports a managed-source retry if a copied sound file is unavailable. TypeScript, 58 active tests with 1 skipped, and the production build all pass.

## 2026-08-16 — Complete active C✦SMO media archive

The previously unavailable active C✦SMO media was recovered from the running managed project endpoint into the external archive. The exporter now excludes only archived KINFORM/KNIALL and test-only references, leaving a complete active C✦SMO manifest of **57 references, 57 copied assets, and 0 missing sources**. The completed bundle contains 39,907,813 bytes of media and is packaged as `cxsmo-portable-media-v2.zip` for repository release distribution.

Strict external validation succeeds without `CXSMO_ALLOW_MISSING_MEDIA`: `pnpm media:prepare` stages all 57 files, `VITE_CXSMO_USE_PORTABLE_MEDIA=true pnpm build` completes, and the generated `client/public/images/` plus `dist/` output are removed again before checkpointing. The live project retains managed `/manus-storage` URLs by default, while external hosts can opt into the completed archive.

## 2026-08-16 — Render public-media repair

The Render deployment at the time of investigation was serving commit `b2d07c0`, whose client still emitted `/manus-storage/...` paths unless an external flag was supplied. Render cannot access those project-private paths, so images and audio failed despite the 57 files being committed to `client/public/images/`.

The shared resolver now selects `/images/<basename>` automatically for known committed C✦SMO media. Catalogue products, product overrides, published hero content, Fit Edits crops, static campaign media, and independent audio cues all use the same public-first resolver; managed paths are retry-only fallbacks. A production-like build copied all 57 files into `dist/public/images/`, and direct HTTP checks returned `200 OK` for both the campaign WebP and technology-select WAV. TypeScript and 58 tests passed with 1 skipped. `RENDER_DEPLOYMENT.md` records the no-secret Render build and start commands; the missing OAuth URL log is unrelated to static media.

## 2026-08-16 — supplied studio, album, and numbered catalogue update

The Fit Edits “Wear it your loud” campaign now uses the supplied two-model studio photo. The supplied eight-look fit album is presented as two wide contextual frames so the surrounding pieces stay legible rather than being forced into a narrow isolated crop. The individual Fit Edits cards retain full-outfit framing with a smaller hover scale and a reserved text band.

Twenty-eight clearly numbered apparel, footwear, accessories, and lifestyle renders were cropped from the supplied sheets and added to the catalogue alongside the supplied studio and album media. The C✦SMO catalogue now contains 47 items and the Git-tracked public bundle contains 89 files. TypeScript, all 58 active tests, and a production-like build passed; HTTP checks returned `200 OK` for the new studio campaign, top album frame, and Lunar Visor render under `/images/`.
