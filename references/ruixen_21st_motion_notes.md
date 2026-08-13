# Ruixen and 21st.dev Motion Reference Notes

## Ruixen Patterns Worth Adapting

Ruixen’s live site demonstrates a clean component-system approach rather than a single visual style. The relevant lessons for KINFORM are the use of a floating, compact navigation surface; restrained announcement bars; deliberate gradients with shallow depth; interactive components that preserve a strong information hierarchy; and carefully scoped motion such as button state changes, badge morphing, text reveals, and hover gradients. The site also explicitly foregrounds accessible interaction, focus states, and reduced-motion support.

The KINFORM adaptation should not copy Ruixen’s blue accents, SaaS information density, template grid, documentation frame, or generic neon effects. It will use a quiet version of the same interaction thinking: a compact floating navigation element, precise spring-like product selection, a single status morph, and no decorative motion that competes with the garments.

## Supplied 21st.dev Gradient Shimmer Prompt

The supplied `GradientShimmer` component is technically thoughtful. It normalizes the gradient sweep to text width, uses named easing rather than exposing arbitrary motion curves, pauses during scroll and offscreen periods, observes reduced-motion preferences, and falls back when text clipping is unsupported. Its important transferable principle is **gated animation**: visual movement should run only when it is visible, not while the user is navigating or when the user has asked for less motion.

For KINFORM, the multi-colour shimmer will not be applied as a loud promotional effect. A single muted mist-to-leaf shimmer will be reserved for the selected collection status, with scrolling, offscreen, and reduced-motion guards. The same rules will govern the interactive product stage and WebGL material field.

