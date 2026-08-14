# C✦SMO Reduced-Motion Audit

C✦SMO uses the operating-system `prefers-reduced-motion` preference as a meaningful alternate interaction path rather than merely shortening animation durations. The public shell passes the preference into its motion configuration, while high-impact custom surfaces include independent static or manual-progress behavior.

| Animated surface | Reduced-motion behavior |
|---|---|
| Public layout and standard UI | The C✦SMO shell disables inherited motion-component animation through its motion configuration. |
| Appearance reveal | The expanding theme circle is removed, allowing the underlying theme state to switch directly. |
| Guided player | The intro resolves immediately, automatic direction is paused, route scroll uses `auto`, and visitors can use **Next shot** to progress. |
| Timed lookbook | Auto-advance stops, animated object entry becomes static, and the pause control is hidden because no moving sequence is active. |
| Morphographic type | Letter transforms, blur, spark particles, and animation are removed; fully readable static letters remain. |
| Scroll depth | Category and product cards keep their stable untransformed composition rather than running view-timeline depth animation. |
| Custom cursor | The global cursor overlay is absent on reduced-motion, touch, and coarse-pointer environments. |

> **Verification boundary:** This audit is backed by stylesheet and component regression tests. A future manual pass should still verify each setting in an operating-system or browser environment with reduced motion explicitly enabled.
