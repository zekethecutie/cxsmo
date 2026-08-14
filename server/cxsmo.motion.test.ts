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

describe("C✦SMO reduced-motion contract", () => {
  it("passes the user preference through the public motion shell", () => {
    expect(shellSource).toContain("useReducedMotion");
    expect(shellSource).toContain('reducedMotion={reducedMotion ? "always" : "never"}');
  });

  it("pauses directed and timed sequences while retaining visitor-controlled progress", () => {
    expect(tourSource).toContain('behavior: reducedMotion ? "auto" : "smooth"');
    expect(tourSource).toContain('disabled={reducedMotion === true}');
    expect(tourSource).toContain('Use Next shot to move through the film.');
    expect(carouselSource).toContain("if (paused || reducedMotion) return");
    expect(carouselSource).toContain("initial={reducedMotion ? false");
  });

  it("keeps decorative motion surfaces static or hidden when reduced motion is requested", () => {
    expect(themeStyle).toContain("@media(prefers-reduced-motion:reduce)");
    expect(morphStyle).toContain("animation:none!important");
    expect(scrollDepthStyle).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cursorStyle).toContain("@media (prefers-reduced-motion:reduce),(hover:none),(pointer:coarse)");
  });
});
