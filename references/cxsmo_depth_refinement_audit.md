# C✦SMO Depth Refinement and Focused Route Audit

The current refinement adds a browser-native, scroll-linked depth treatment to the category rail and product inventory cards. The effect is enabled only where the browser supports view timelines, only at desktop widths, and only when motion has not been reduced. It is deliberately small: cards enter with limited translation, perspective, and tilt, settle to their normal plane, and finish with a minimal forward lift. No pointer position drives the result.

| Surface reviewed | Observed desktop result | Outcome |
|---|---|---|
| Poster landing | The 10px left campaign adjustment maintains a readable title zone while the transparent group layer retains visible black depth separation. | Retained. |
| Catalogue | The introductory hierarchy remains clear and the inventory grid retains its separate product-media stage. Scroll depth operates on the cards, leaving object hover transforms intact. | Retained. |
| Product dossier | The isolated product object, high-contrast purchase column, and fictional-commerce statement stay readable in the first view. | Retained. |
| Account and checkout | Both surfaces state their browser-local and simulated status before inviting a visitor to proceed. The empty checkout state does not imply a created order. | Retained. |
| Legal and studio | The legal route makes the portfolio boundary explicit, while the studio preview states that it does not create live store records. | Retained. |

The static equivalent is the default for unsupported browsers, narrow screens, and `prefers-reduced-motion: reduce`. In those conditions the category and product cards are fully opaque and untransformed, with no scroll-linked animation. The guide player retains its separate reduced-motion behavior described in the accessibility contract.

The audit was performed using first-viewport desktop previews for the core public routes and studio. A later full route audit should still cover bag, edits, information, privacy, terms, and disclosure in both desktop and mobile layouts, plus live keyboard-only interaction checks.
