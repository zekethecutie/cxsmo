# C✦SMO Interaction Validation Notes

## Verified menu contract

The C✦SMO main menu trigger exposes `aria-expanded` and `aria-controls`. Arrow Down opens the panel and transfers focus to the first link. Escape closes the panel and returns focus to the trigger. Outside pointer interaction dismisses the panel. Selecting a menu link also closes the panel and restores trigger focus.

## Verified motion and escape contract

The directed C✦SMO tour is explicitly visitor-started, includes a visible Exit button, and binds Escape to immediate exit. Its brand-build intro and scene playback remain paused or manually stepped under reduced-motion preference. The theme change carries a reduced-motion fallback through the existing MotionConfig and appearance context.

## Responsive rendering evidence

Desktop and 375px screenshot reviews covered the poster, account, checkout empty state, and legal surfaces. The recorded screenshots show no horizontal overflow in the reviewed routes, maintain footer access to Play C✦SMO, and preserve legal and browser-local boundaries.

## Direct manual checks still appropriate

Because automated screenshot capture does not generate key presses or clicks, an operator should still manually press Arrow Down and Escape on the menu, launch and exit Play C✦SMO, toggle sound and appearance, and open a checkout map preview after adding an object. These are not inferred from screenshots.
