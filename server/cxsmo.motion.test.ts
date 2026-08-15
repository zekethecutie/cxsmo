import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const shellSource = source("client/src/pages/CxsmoStorefront.tsx");
const tourSource = source("client/src/components/CxsmoGuidedShowcase.tsx");
const carouselSource = source("client/src/components/CxsmoFitCarousel.tsx");
const themeStyle = source("client/src/pages/cxsmo-av.css");
const morphStyle = source("client/src/pages/cxsmo-morphographic.css");
const scrollDepthStyle = source("client/src/pages/cxsmo-scroll-depth.css");
const cursorStyle = source("client/src/pages/cxsmo-custom-cursor.css");
const posterHomeSource = source("client/src/pages/CxsmoPosterHome.tsx");
const reducedMotionStyle = source("client/src/pages/cxsmo-reduced-motion.css");

describe("C✦SMO reduced-motion contract", () => {
  it("passes the user preference through the public motion shell", () => {
    expect(shellSource).toContain("useReducedMotion");
    expect(shellSource).toContain('reducedMotion={reducedMotion ? "always" : "never"}');
  });

  it("pauses directed and timed sequences when reduced motion is requested", () => {
    expect(tourSource).toContain('behavior: reducedMotion ? "auto" : "smooth"');
    expect(tourSource).toContain('if (!active || !playing || reducedMotion) return;');
    expect(tourSource).toContain('setPlaying(!reducedMotion)');
    expect(carouselSource).toContain("if (paused || reducedMotion) return");
    expect(carouselSource).toContain("initial={reducedMotion ? false");
  });

  it("keeps decorative motion surfaces static or hidden when reduced motion is requested", () => {
    expect(themeStyle).toContain("@media(prefers-reduced-motion:reduce)");
    expect(morphStyle).toContain("animation:none!important");
    expect(scrollDepthStyle).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cursorStyle).toContain("@media (prefers-reduced-motion:reduce),(hover:none),(pointer:coarse)");
  });

  it("keeps poster hero depth scroll-led rather than pointer-led", () => {
    expect(posterHomeSource).toContain('useScroll({ target: heroRef, offset: ["start start", "end start"] })');
    expect(posterHomeSource).toContain('useTransform(heroScroll, [0, 1], ["0%", "-14%"])');
    expect(posterHomeSource).toContain('useTransform(heroScroll, [0, 1], ["0%", "48%"])');
    expect(posterHomeSource).toContain('useTransform(scrollYProgress, [0, 1], ["-25%", "28%"])');
    expect(posterHomeSource).toContain('useTransform(scrollYProgress, [0, 1], ["38%", "-30%"])');
    expect(posterHomeSource).toContain('heroBarcodeY');
    expect(posterHomeSource).not.toContain("onPointerMove");
    expect(posterHomeSource).not.toContain("onMouseMove");
    expect(reducedMotionStyle).toContain("scroll-behavior: auto !important");
  });
});
