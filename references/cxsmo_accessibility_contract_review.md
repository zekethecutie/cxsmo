# C✦SMO Accessibility Contract Review

This review records the behavior verified directly from the current implementation. It distinguishes code-backed contracts from browser-assisted manual checks that remain appropriate before a public launch.

| Surface | Verified behavior | Implementation boundary |
|---|---|---|
| Primary navigation | The animated disclosure exposes menu semantics. `ArrowDown` opens and focuses the first destination; `ArrowUp` opens and focuses the last. Within the panel, `ArrowUp`, `ArrowDown`, `Home`, and `End` move between destinations. Outside-pointer dismissal closes the panel, while `Escape` closes it and restores focus to the trigger. | The menu is non-modal and does not trap `Tab`; following a destination preserves ordinary route navigation rather than returning focus to a disappearing trigger. |
| Route-aware tour | Tour start records the initiating element. The dialog moves initial focus to its Exit control, traps `Tab` and `Shift+Tab` within available controls, closes with `Escape`, and restores focus after returning to the origin route. | The tour is visitor-started; its visual cursor is explicitly presentational and never synthesizes user input. |
| Fit-guide dialog | The trigger exposes dialog state, the opened dialog receives focus on its close control, cycles `Tab` and `Shift+Tab` within its available controls, closes with backdrop click or `Escape`, and restores focus to the original trigger. | The dialog communicates that real garment measurements are not invented for the portfolio concept. |
| Reduced motion | The site-wide reduced-motion sheet collapses animation and transition duration, while the route tour stops timed scene playback and exposes direct scene selection. The morphographic Information Desk heading resolves as static text. | Visitors retain direct controls and readable text rather than seeing hidden animation start states. |
| Hover audio | Sound stays browser-local and opt-in, with touch exclusion, global and per-element cooldowns, plus silent-control attributes for deliberately custom cues. | No sound plays without a user interaction. |

The current directed-tour layer also applies a full scroll lock while it is active. Wheel, touch-move, arrow-navigation, page-navigation, and home/end scroll events are suppressed, while `Tab`, `Shift+Tab`, buttons, and `Escape` retain their intended controls. The player’s large editorial copy sits inside a left-side blurred-black veil so the underlying route remains visible as a moving portfolio surface without competing with the readable route explanation.

The appearance control uses a two-second circular reveal anchored to the pressed toggle. Its overlay is the destination theme color only; no pixel field, red glow, or grid is rendered. The persisted theme class changes late in the reveal after the circle has covered the viewport, and reduced-motion preferences keep the theme change instant.

Before any public release, a keyboard-only person should still manually traverse the storefront, product controls, bag, checkout, and studio using their preferred browser and assistive technology. That review cannot be truthfully substituted by a static code inspection.
