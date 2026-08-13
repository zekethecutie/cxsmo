# C✦SMO Release QA

## Keyboard review

The public routes use native links for navigation and native buttons for product actions, filters, saved-item controls, size selection, bag management, and the non-submitting order-information preview. The fit guide is a labelled dialog with a keyboard-reachable close control. The studio uses buttons for its navigation modules, product edit affordances, variant-size toggles, category creation, inventory fields, POS actions, and shipping-preview inputs.

The implementation was reviewed to ensure that no primary C✦SMO interaction relies only on pointer events, that inputs carry visible labels or accessible names, and that the responsive studio menu includes an explicit close control. Focus appearance inherits the project’s browser-visible controls rather than suppressing outlines.

## Reduced-motion review

The C✦SMO shell uses Framer Motion’s `MotionConfig` with `useReducedMotion`, so entrance and dialog motion respects the operating-system preference. A C✦SMO-specific `prefers-reduced-motion` stylesheet also reduces CSS transition and animation duration and restores standard scroll behavior. The hero, product cards, category cards, buttons, and studio controls remain usable when those visual transitions are suppressed.

## Build and presentation checks

Desktop visual checks covered the landing page, shop, product route, and studio. Mobile checks covered shop, studio, saved-item account, and bag states. TypeScript validation, the complete Vitest suite, and the production build completed successfully on 13 August 2026. The studio and storefront show explicit portfolio-safe boundaries for unavailable payments, orders, shipments, customer records, and reviews.
