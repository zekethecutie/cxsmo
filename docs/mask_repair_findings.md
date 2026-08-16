# Product Mask Repair Findings

The original manual Bolt Raglan contour preserved both sleeves, but included broad grey source-field wedges around their outside edges. The revised contour must follow the sleeve cuffs and shoulder seams more tightly rather than reducing the garment to a torso crop.

The original Midnight Star Sweatpant contour retained the wide-leg shape but included a tall grey strip along the left side. The revised contour must hug both outside seams while retaining the entire lower-right pooled hem.

The Star Ruched Top must be rebuilt from its preserved source image, not from the existing alpha-damaged public render, so its right sleeve remains available. Stellar Cargo Pants must preserve its existing solo render and only restore enclosed alpha gaps; it must not be passed through a background-removal model.

The first full-source Star Ruched Top attempt retained too much of the catalogue card background, so the safer repair is a controlled sleeve-only source patch over the existing clean torso. The tightened Bolt contour preserves both sleeves, but the original source has an indistinct sleeve/field boundary; it needs an explicit inner negative-space cut before it can be promoted. The optional comparison pass is unavailable because the local background-removal CLI has further missing UI-only dependencies, so it is not used for the production repair.

The sleeve-only Star Ruched composite still retained a visible pink source-field crescent. Its final candidate now uses a single hand-traced garment-edge contour from the original source, covering the torso, full sleeve, and gathered cuff as one silhouette. This approach avoids alpha compositing gaps and will be promoted only if the final visual inspection is clean.

The one-piece traced Star Ruched contour also retained warm studio-field pixels because the source sleeve boundary is low contrast. The next candidate therefore starts from the existing clean torso, clears its inherited pink crescent explicitly, and restores only source pixels that meet a dark-garment threshold inside a narrow sleeve field.

The direct model call, which bypasses the incomplete command-line wrapper, produces a clean source cutout for the Star Ruched Top with its long sleeve and gathered cuff intact. It is a better candidate than the manual composite and will be scaled to the standard 1200 × 1500 product canvas, with the isolated upper-right catalogue glyph removed before promotion.

Direct comparison results show that the default compact model removes the Bolt Raglan sleeves and therefore is not suitable for that garment. The source-specific manual contour remains the correct Bolt Raglan strategy. The same model retains the full Midnight Star Sweatpant pooled hem, so that source cutout is preferable to the contour version that risked trimming the lower-right edge.

The higher-capacity model also removes the sleeves from the small Bolt Raglan screenshot. Applied to the retained high-detail source, it preserves a clean torso but still drops both sleeves. The source-specific sleeve contour therefore remains the only usable full-sleeve version; its remaining background field will be reduced by an image-relative explicit cut before promotion.

Splitting the retained Bolt Raglan source at its raglan seam produces a complete two-sleeve silhouette and removes the previously visible grey source field. The Stellar Cargo Pants repair restores the centre alpha gap directly from the original solo render and keeps the product’s existing textile, hardware, and drape pixels unchanged.
