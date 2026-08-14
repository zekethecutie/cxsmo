# C✦SMO Route Audit — 14 August 2026

The core public routes and the studio entry were reviewed in first-viewport desktop and mobile previews. This pass confirms route rendering, visual hierarchy, public-disclosure placement, and initial responsive composition. It does not claim to substitute a keyboard-only, screen-reader, sound-playback, or long-scroll interaction test.

| Surface | Desktop disposition | Mobile disposition | Follow-up boundary |
|---|---|---|---|
| Shop and product dossier | The product hierarchy and isolated-object stage render at the expected public routes. | The product stage is legible. The category filter now uses a right-edge fade, hidden scrollbar, scroll padding, and snap alignment to communicate its horizontal discovery behavior without occupying extra vertical space. | Manually verify filter scrolling and product actions with keyboard and touch. |
| Fit edits and Information Desk | Editorial title hierarchy and the support surface both render from active routes. | The mobile edits opening maintains image-to-copy contrast; the Information Desk expands its first topic without overflow. | Manually verify accordion focus and panel state changes. |
| Account, bag, and checkout | Fictional/browser-local boundaries remain prominent in their initial states. | Empty bag and checkout states give a clear, non-transactional path back to the catalogue. | Manually exercise local profile, bag, address, consent, and checkout transitions. |
| Legal and studio | Legal poster hierarchy and the operator entry are available from their public routes. | The legal composition preserves readable type and section rows. | Review all legal subroutes, studio controls, and owner-only behavior with a signed-in operator. |

The direct Information Desk alias `/cxsmo/information?from_webdev=1` now resolves to the active support surface. The sitewide custom cursor is intentionally absent on the mobile pass because it is restricted to fine pointers; this preserves touch controls and native form behavior.

> **Manual interaction boundary:** The remaining checks are intentional human QA work: keyboard traversal, sound audibility, hover behavior, touch filters, real-time theme reveal, guided-player timing, and stateful checkout or studio actions. No fabricated commerce or customer state was introduced by this audit.
