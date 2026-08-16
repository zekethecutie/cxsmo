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

## 2026-08-16 — clean silhouette and mens fit correction

The poor rectangular contact-sheet crops were replaced with item-aware transparent silhouettes. The reusable `build_smart_silhouettes.py` process removes the sheet background, strips the visual number labels and neighboring-product bleed, normalizes the isolated subject onto a padded 1200×1500 transparent canvas, and uses high-quality Lanczos resampling for consistent storefront scale. Fifteen additional clean product cutouts were created from the new mens reference sheet, and the catalogue expanded to 62 distinct objects.

The supplied mens sheet is now retained both as a full-context Fit Edits album and as ten full-figure individual cards, rather than collapsing the looks into overly tight crops. The Git-tracked public bundle now contains 115 active files. Desktop and mobile visual checks, TypeScript, 58 active tests, production build, and direct `/images/` HTTP checks passed.

## 2026-08-16 — corrective media and product-detail pass

The girls’ Fit Edits album now preserves the image-first presentation without forcing the editorial copy over the model spread on phone layouts. All shop-card product assets use a shared geometric centre anchor. The Star Mini Pack and Starfade Puddle Jean were removed rather than leaving a rectangular or fragmented mask visible to visitors.

Product-detail Worn Context now only opens an exact Fit Edits association. Products without a documented fit relationship instead show an honest disabled state. The product-stage labels no longer collide, and title/price blocks wrap independently on narrow screens. The direct public bundle contains 113 active files and the catalogue contains 60 products.

## 2026-08-16 — final album source review

The supplied women’s top album frame is a complete 1024×760 four-model horizontal composition. It is now treated as an image-led editorial plate rather than two constrained thumbnails; supporting copy sits in its own deliberate column so it does not obscure the models or make the image look like a broken composite.

## 2026-08-16 — final public-media, currency, and product-detail release check

Desktop and 375px route captures confirm that the Fit Edits albums remain image-led, shop cards use clean centred silhouettes, and product titles retain whole-word wrapping. The shared header exposes the USD/local-currency selector, while the browser-local currency formatter is protected by a Philippine-peso regression assertion. `pnpm check`, the 58-passing/1-skipped regression suite, and the production build all complete successfully. The only build advisory is the existing large client-bundle warning.

## 2026-08-16 — Fit Edits mapping source review

The reviewed men’s source plate visibly contains the Black Star Overshirt, White Star Hood, Spear Rib Tank, Washed Star Hood, Contrast Halfzip, Flame Star Crew, Washed Orbit Knit, Flame Track Hoodie, Star Trucker, and Chain Star Moto alongside the associated wide-leg pieces. The women’s source plate confirms a mix of currently catalogued components—such as Lace Corset Top, Web Tie Tank, Pleated Belt Skirt, Lace Tiered Skirt, Stud Cargo Short, Chain Cargo Short, Stellar Cargo Pants, Cloud Legwarmer, and Buckle Stack Boot—and styling elements for which no direct product render exists. Final quick-view links must therefore surface only those verified catalogue matches and leave the remainder explicitly planned.

The individual women’s source crops confirm that W / 01 uses an asymmetric black star top with black star-marked wide pants and a shoulder bag, none of which has a direct one-to-one current render. W / 02 combines the White Star Hood with a grey washed wide cargo/denim piece; only the White Star Hood is an exact current catalogue match, while the grey lower remains a planned editorial item rather than a generic substitute.

W / 03 visibly contains the Lace Corset Top, Pleated Belt Skirt, and Buckle Stack Boot; its black shoulder bag does not have a confirmed one-to-one product render. W / 05 is a white hooded/layered set with a tiered mini, soft legwarmers, and a silver bag; only the Lace Tiered Skirt and Cloud Legwarmer are exact catalogue matches, while the rest remains planned.

## 2026-08-16 — direct-public release audit

All active C✦SMO product, campaign, Fit Edits, cursor, and sound references now resolve directly from the tracked `/images` bundle. The public asset folder contains no file above 1 MB, and direct probes return `200` with the expected PNG or WAV content types for a renamed product render, a fit crop, and the hover cue. The production bundle has no explicit managed-storage, generator-name, or generative-tool strings in its delivered public files; its document head identifies **zxke** as author and creator.

The W / 03 Lunar Corset quick-view was captured at desktop and 375px. It visibly lists the exact Lace Corset Top, Pleated Belt Skirt, and Buckle Stack Boot, keeps the unrelated black shoulder bag under planned rather than sale, and retains readable mobile actions. TypeScript, 59 active tests with 1 skipped, and the production build pass after the direct-public conversion.

## 2026-08-16 — reported mask repair audit

The current Star Beanie public PNG contains only the chrome four-point-star patch; its knit body has been removed, so it requires a complete product-object reconstruction rather than alpha cleanup. The Bolt Raglan retains the garment body but has a transparency tear through the inner right sleeve/underarm plus residual contact-sheet number pixels; it requires a targeted sleeve reconstruction while preserving its white body, navy raglan sleeves, and bolt chest graphic.

The Star Spear Tank preserves its main body and spear graphic but has a large unintended alpha hole through the upper-left chest and rough removed-edge artifacts around both shoulder straps; it requires targeted garment reconstruction. The Chain Cargo Short retains a complete item silhouette but has rough alpha edges and a missing/partially removed lower-right chain loop; it requires a constrained detail-and-edge cleanup rather than a new product concept.

The Midnight Star Sweatpant is a largely complete navy wide-leg object with rough perimeter alpha and some lost lower-hem definition; it needs conservative edge restoration. The item currently labeled **Midnight Cargo Skirt** is visibly a pair of black technical cargo pants with two separated legs and hardware/chain details. Its public name, fit copy, and details must be corrected to a pants record; it also needs lower-leg edge cleanup but no silhouette reclassification beyond the accurate name.

The Chrome Charm Bag has a largely intact silver shoulder-bag body but its upper/right strap is fragmented and contact-sheet remnants remain in the alpha edge. The original 17–36 numbered render sheet confirms that 17 is the Bolt Raglan, 18 is the Star Spear Tank, 25 is the Chain Cargo Short, 27 is the Midnight Star Sweatpant, 29 is the technical cargo pant, and 34 is the Chrome Charm Bag. Raw source crops can therefore be rebuilt from the original sheet without inventing different product designs.

The source sheet retains a complete black Star Beanie around its chrome patch and a complete Bolt Raglan body and sleeves. The initial beanie crop included a source ordinal tag, so its top boundary was narrowed before re-segmentation. These source crops support a deterministic clean-alpha fallback while image-generation capacity is unavailable.

The first lighter re-segmentation candidate still removes the black Star Beanie body and is rejected. The same pipeline produces an accepted Bolt Raglan candidate: it removes the source-sheet ordinal/background and repairs the previously missing inner right sleeve, although its source crop does not preserve the full lower sleeves. Subsequent candidates must be reviewed individually; no rejected silhouette will be promoted to the public bundle.

The regenerated Star Spear Tank loses the white garment and retains only its dark printed spear, so it is rejected. The regenerated Chain Cargo Short retains the full cargo short and chain loop with cleaner source-sheet separation; it is acceptable as an interim repair candidate pending direct storefront review.

The regenerated Midnight Star Sweatpant retains the navy wide-leg shape, chrome leg graphics, and complete hem more cleanly than the previous public asset; it is accepted. The regenerated Midnight Cargo Pant retains both technical legs, hardware, chains, and the visible boot-covered lower edge; it is accepted and confirms the catalogue must call it a pant rather than a skirt.

The regenerated Chrome Charm Bag retains the complete silver shoulder-bag body, strap, star hardware, and charm with no source-sheet remnant; it is accepted. The manually bounded Star Beanie recovery retains its complete rib-knit body and chrome four-point-star patch. Its source outline is intentionally conservative around the dark fabric edge and is accepted over the previous star-only failure.

The final manual Star Spear Tank contour eliminates the prior alpha holes but exposes too much original sheet background around the straps and body edge, so it is rejected. The existing Star Spear Tank remains unchanged pending a semantic image repair; the accepted Star Beanie, Bolt Raglan, Chain Cargo Short, Midnight Star Sweatpant, Midnight Cargo Pant, and Chrome Charm Bag candidates were promoted to the tracked public bundle.

At 375px, the repaired Star Beanie now renders as a complete black knit object with its chrome star patch in the product stage, and the associated detail page retains a clean hierarchy without the previous dense stage metadata. The phone shop has a readable search-first introduction, filter rail, and centred product cards. The campaign notice is intentionally restricted to the `/cxsmo` home route so product and shop tasks are not blocked by the event modal.

The 375px home hero now presents as a contained 4:3 campaign frame above a tighter, editorial type/action stack. The home-only Signal Week event is a compact bottom toast with a visible close control, countdown, and portfolio-event label; it leaves the campaign image and headline readable and no longer blocks the shop or product routes.

The existing clean C✦SMO spear-tank render was evaluated as a replacement after chroma-key residue removal. It is a complete black rib tank with a centered silver four-point spear graphic, clean transparent edges, and no masking holes. It is approved to replace the damaged white Star Spear Tank image, with the catalogue record updated to its actual **Ink / Silver** colourway rather than claiming the previous white variant.

At 375px, the public Star Spear Tank product page now presents a complete black rib tank with a silver spear graphic, intact alpha edge, concise Ink / Silver product language, and no source-sheet artifact or masking hole. The former Midnight Cargo Skirt product page now accurately reads **Midnight Cargo Pant** and presents a complete dual-leg technical cargo silhouette with its chain hardware intact.

## 2026-08-16 — masking and commerce-flow release validation

The final release run passes TypeScript, **64 active tests with 1 skipped**, and the production build. The browser-local bag preserves selected finish and size; the account workspace is accessible from primary navigation; the home-only event treatment is visibly labelled as a portfolio interaction preview; product discussion keeps reviews and ratings empty; and the checkout map permits a browser-session pin without retaining or submitting address data. No active public image exceeds the 1 MB checkpoint threshold.

## 2026-08-16 — follow-up masking audit

The current Star Ruched Top retains a detached white source-sheet numeral in the upper-right transparent field, while the garment itself is intact. The current Bolt Raglan torso has usable alpha but resolves as a sleeveless crop rather than the advertised long raglan garment, so it needs a source-faithful full-garment replacement rather than further edge cleanup.

The Midnight Star Sweatpant source is visually complete but has a hard, uneven lower-leg crop that gives the wide pooled hem a broken cut-off edge. The women’s album source is a high-quality four-model 1024×760 composition with subjects occupying the full plate. The reported tiny upper-left output is therefore a layout/positioning error, not an image-source limitation: it should be rendered as a single full-width fashion plate above its editorial copy rather than two stacked background frames on the right.

The untouched Bolt Raglan crop contains both long navy sleeves, the white body, and bolt graphic; the previous repair discarded the sleeve regions during segmentation. The Midnight Star Sweatpant crop likewise contains the full pooled wide-leg silhouette but includes only a narrow source-sheet strip beneath the hem. Both can be repaired with conservative source-contour alpha masks rather than substituting unrelated garments.

The first scaled Bolt Raglan candidate preserves the sleeves but its broad outer envelope retains source background and is rejected pending the split-contour revision. The Star Ruched Top candidate removes the detached numeral but retains a thin upper-right source-sheet streak above the sleeve; a smaller targeted alpha exclusion is required before promotion.

The lightweight model cleanly segments the white raglan body but cannot retain the dark sleeves, while manual sleeve composites retain grey source-sheet field or detach from the body. Those candidates are rejected. The existing clean public raglan torso remains the least misleading image until a dedicated transparent long-sleeve source or an image-generation quota is available; no background-contaminated replacement will be promoted.

The Midnight Star Sweatpant candidate retains a grey source-field strip along its left leg and is rejected. The Star Ruched Top candidate still contains a black horizontal artifact extending from the right shoulder beyond the sleeve; it requires a precise alpha exclusion along the detached extension before promotion. Only source-faithful repairs that remove artifacts without cutting garment structure will replace public assets.
