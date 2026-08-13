# KINFORM Component and Motion Library Recommendations

## Recommendation Principle

KINFORM should remain a tailored product experience, not a catalogue of effects. The current stack already includes React, Tailwind, Motion, Lenis, and a small custom WebGL study. Any additional library should be used through copied and adapted components, with clear reduced-motion behavior, rather than added as a broad runtime dependency.

| Library or source | Best role in KINFORM | Recommended use | Guardrail |
|---|---|---|---|
| [Aceternity UI](https://ui.aceternity.com/components) | Product-supportive visual interactions | Adapt a quiet card-hover surface, a single spotlight treatment for an editorial backdrop, and a restrained floating navigation behavior. | Avoid animated backgrounds, beams, particles, or constant effects across the commerce path. |
| [React Bits](https://reactbits.dev/get-started/introduction) | Optional specialised motion studies | Consider its modular glare-hover or gradual-blur patterns for one campaign visual or an admin-media focus state. | Follow the library’s own guidance to use only two or three effects on a page, with mobile fallbacks and reduced-motion gating. |
| [Magic UI](https://magicui.design/docs/components) | Tailwind-compatible micro-interactions | Use its Interactive Hover Button as the starting point for the supplied call-to-action reference, or its Glare Hover pattern for a selected media asset. | Treat it as a source of individual copied patterns, not a visual language to layer over the existing system. |
| 21st.dev patterns | Interaction primitives | Keep the existing gradient shimmer and add the supplied interactive-hover button pattern where a single primary action benefits from it. | Copy and tailor only individual components. Do not replace the existing brand controls or introduce unrelated visual styles. |
| Ruixen patterns | Tactile navigation and soft gradients | Retain the floating gradient navigation language and extend it only to compact filters and owner-console status chips. | Keep the treatment quiet and legible. It should not compete with garment imagery. |
| Motion and Lenis | Interaction foundation | Use Motion for route-level entry states and product-sheet transitions. Use Lenis only when reduced motion is not requested. | Preserve the existing runtime reduced-motion guard and avoid stacking multiple scroll engines. |

## Recommended Next Integrations

The expansion should use a tailored interactive-hover button on the collection and product calls to action, an editorial spotlight backdrop behind only one campaign moment, and a gentle glare state for selected admin media. These components belong in the existing visual language: moss, graphite, porcelain, large breathing room, and strongly legible typography.

## Deferred Options

Three-dimensional card tilt, animated borders, cursor trails, particle scenes, and dense background effects are deliberately deferred. They may look impressive in an isolated component demo, but they would compete with the apparel render system, increase interaction cost on mobile, and weaken the quiet fashion point of view.

## Commerce Foundation

No additional commerce runtime library is recommended for this milestone. The project already has a Shopify Storefront API integration behind the typed commerce router and a persistent cart context. Adding a second cart or catalogue abstraction would duplicate state, complicate the later KNIALL handoff, and make the build less credible as a sellable storefront foundation.

| Foundation | Role | Bundle and implementation decision |
|---|---|---|
| Shopify Storefront API through the existing commerce router | Future source of truth for products, collections, variants, carts, and checkout handoff | Keep it server-backed and avoid a separate client commerce SDK. This protects API access and avoids a duplicate client dependency. |
| Existing cart context | Cart identity and bag state | Retain it as the single cart coordinator until the real KNIALL catalogue is available. |
| Existing Embla carousel package | Product-media gallery and campaign rails | Reuse the already-installed package if the expanded product route needs a swipeable gallery. It adds no new dependency cost. |
| Future verified-review provider | Real customer feedback only | Defer selection and integration until the retailer chooses a source that can prove purchase verification. Do not seed review data locally and do not add a review SDK for a portfolio-only state. |

## Bundle-Impact Policy

The expansion will favour copied, adapted component patterns over broad dependency installs. Aceternity UI, React Bits, Magic UI, 21st.dev, and Ruixen patterns are used as selective source material, not as runtime libraries. Motion and Lenis are already present, while the custom WebGL halo remains dependency-free. New packages are justified only when they cover a genuine commerce capability that the current Shopify foundation cannot provide, and each candidate must support a static fallback or respectful reduced-motion behavior.
