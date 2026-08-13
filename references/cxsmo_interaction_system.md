# C✦SMO Interaction System

## Motion hierarchy

| Surface | Behavior | Duration | Reduced-motion fallback |
|---|---|---:|---|
| Primary actions | Underline sweep, one-pixel lift, press scale | 160–220 ms | Color/focus change only |
| Navigation menu | Crossfade, staggered links, origin-aware depth | 220–320 ms | Immediate state switch |
| Product media | Foreground depth shift and bounded parallax | Scroll-linked | Static image with preserved hierarchy |
| Product controls | Magnetic hover offset and selection state | 160 ms | Border and color change only |
| Editorial copy | Masked line reveal or short character pulse | 280–450 ms | Visible copy with no delay |
| Information desk | Accordion reveal and index-marker transition | 220 ms | Immediate expansion |

## Product story

The product page should feel like a **graphic product dossier**, not a conventional two-column shop card. A responsive media stage leads with a product silhouette, a numbered material rail, a direct size matrix, a limited-release indicator, and action controls that visibly respond to hover and press. Product facts remain selectable text and the purchase request remains portfolio-safe.

## Motion boundary

Motion explains hierarchy, confirms a state change, or exposes hidden information. Decorative movement should never block text, induce continuous layout shifts, slow keyboard navigation, or disguise the no-payment portfolio boundary. Every effect must have a static counterpart under `prefers-reduced-motion`.
