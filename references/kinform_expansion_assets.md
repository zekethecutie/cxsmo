# KINFORM Expansion Asset Register

This register identifies the original visual assets approved for the expanded **fictional KINFORM** portfolio experience. Assets are held in project storage and are referenced only through their storage URLs.

| Asset | Storage URL | Live use | Purpose |
|---|---|---|---|
| Passage campaign anchor | `/manus-storage/kinform-expansion-campaign-anchor_8f5b5a34.jpg` | `/kinform/collection`, `/kinform/journal`, `/kinform/journal/passage` | Editorial campaign staging, collection discovery, and journal opening image. |
| Line Tee material study | `/manus-storage/kinform-line-tee-detail-replacement_f052c194.jpg` | `/kinform/products/line-01` | High-detail product storytelling for the Line Tee page. |
| Administration operations flatlay | `/manus-storage/kinform-admin-operations-flatlay_5709f29c.jpg` | `/kinform/admin` overview and campaign planning views | Distinct original merchandising image that gives the owner console a campaign-independent operational context. |
| Line Tee transparent render | `/manus-storage/kinform-structured-tee_fd877bd2.png` | Homepage, collection, product detail cutouts, bag, account, inventory, and administration catalogue | The original isolated garment render for Object 01. |
| Aero Shell transparent render | `/manus-storage/kinform-aero-shell-transparent_890111a4.png` | Homepage, collection, product page, related objects, bag, account, inventory, and administration catalogue | Approved isolated graphite micro-ripstop garment render for Object 02. |
| Form Overshirt transparent render | `/manus-storage/kinform-form-overshirt-transparent_c4924b0d.png` | Homepage, collection, product page, related objects, bag, account, inventory, and administration catalogue | Approved isolated faded-leaf cotton-nylon garment render for Object 03. |
| Arc Trouser transparent render | `/manus-storage/kinform-arc-trouser-transparent_19735ece.png` | Homepage, collection, product page, related objects, bag, account, inventory, and administration catalogue | Approved isolated charcoal stretch-woven garment render for Object 04. |

Two exploratory generated assets were not approved after a failed-generation response. They have no live references. The final campaign anchor, Line Tee study, and administration operations flatlay were reviewed in the live routes and approved for their listed uses.

The administration console uses the approved operations flatlay together with the original transparent apparel renders. This keeps the visual language coherent while retaining a distinct image-led catalogue and inventory posture.

## Final Generation Disposition

| Asset attempt | Outcome | Final disposition |
|---|---|---|
| Passage campaign anchor | Completed and visually reviewed in the live collection and journal routes. | **Approved.** It is the final campaign image for collection discovery and editorial storytelling. |
| Line Tee material study replacement | Completed and visually reviewed in the live Line Tee route. | **Approved.** It is the final detailed product-study image for Object 01. |
| Administration operations flatlay | Completed and visually reviewed in the live `/kinform/admin` overview on 13 August 2026. A direct DOM check confirmed `complete: true` at `1920 × 1080`; the rendered image shows a coherent four-garment flatlay with warm-porcelain, graphite, and moss treatment. | **Approved.** It is the distinct final administration showcase visual. |
| Initial Line Tee detail, Aero Shell detail, and administration merchandising experiments | Did not complete successfully. | **Rejected.** None of their URLs are used in the live experience. Existing approved product renders provide resilient fallbacks where required. |
| Aero Shell, Form Overshirt, and Arc Trouser background-bearing catalogue versions | Visually inconsistent with the isolated Line Tee standard. | **Rejected.** Replaced in every live KINFORM surface by the completed transparent renders listed above. |
| Aero Shell, Form Overshirt, and Arc Trouser transparent replacements | Completed and visually reviewed in the live collection, inventory, and product routes on 13 August 2026. Each corresponding source file was confirmed as a non-placeholder `1664 × 2080` 8-bit RGBA PNG in the static-asset workspace: Aero Shell 4.2 MB, Form Overshirt 4.3 MB, Arc Trouser 3.3 MB. The renders show isolated garments with clean negative space and no backdrop. | **Approved.** They are the final catalogue and inventory image set for Objects 02 to 04. |
