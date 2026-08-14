# C✦SMO Hero Motion Contract

The poster hero’s depth is driven by vertical scroll progress from the hero section, not by pointer position. The campaign layer makes a restrained upward shift and rotational settle; the oversized word and type layer travel at distinct downward rates. This creates the intended layered perspective while remaining stable for cursor and touch users.

| Layer | Motion source | Reduced-motion behavior |
|---|---|---|
| Campaign group | Hero `scrollYProgress` maps to limited vertical translation and rotation. | The global C✦SMO reduced-motion rule removes animated scroll behavior and minimizes transition duration. |
| Oversized background word | Hero `scrollYProgress` maps to a faster downward offset. | It remains readable and static rather than simulating depth. |
| Main title layer | Hero `scrollYProgress` maps to a separate restrained downward offset. | It retains its copy-safe position without a motion-driven reveal. |

> The poster hero intentionally contains no pointer-move or mouse-move handler. Scroll is the only depth driver, preserving a consistent composition across fine pointers, touch input, and passive viewing.
