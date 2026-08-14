import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const showcaseSource = readFileSync(resolve(process.cwd(), "client/src/components/CxsmoGuidedShowcase.tsx"), "utf8");
const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const tourStyleSource = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-route-tour.css"), "utf8");
const introStyleSource = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-route-tour-intro.css"), "utf8");
const globalCursorSource = readFileSync(resolve(process.cwd(), "client/src/components/CxsmoCustomCursor.tsx"), "utf8");
const globalCursorStyle = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-custom-cursor.css"), "utf8");
const storefrontSource = readFileSync(resolve(process.cwd(), "client/src/pages/CxsmoStorefront.tsx"), "utf8");

describe("C✦SMO guided player", () => {
  it("keeps the custom cursor and expanded ten-shot portfolio sequence", () => {
    expect(showcaseSource).toContain('/manus-storage/cxsmo-custom-cursor_922d53fe.png');
    expect(showcaseSource.match(/code: "0[0-9]"/g)).toHaveLength(10);
    expect(showcaseSource).toContain('route: "/cxsmo/support"');
    expect(showcaseSource).toContain('route: "/cxsmo/disclosure"');
    expect(showcaseSource).toContain('title: ["THIS IS", "C✦SMO."]');
  });

  it("maps every directed scene to a registered public route", () => {
    const routes = Array.from(showcaseSource.matchAll(/route: "([^\"]+)"/g), (match) => match[1]);
    const registeredRoutes = Array.from(appSource.matchAll(/<Route path="([^\"]+)"/g), (match) => match[1]);
    expect(routes).toHaveLength(10);
    routes.forEach((route) => expect(registeredRoutes).toContain(route.startsWith("/cxsmo/products/") ? "/cxsmo/products/:id" : route));
    expect(registeredRoutes).toContain("/cxsmo/information");
  });

  it("retains its safe directed-play controls without scene-number navigation", () => {
    expect(showcaseSource).toContain('document.body.style.overflow = "hidden"');
    expect(showcaseSource).toContain('event.key === "Escape"');
    expect(showcaseSource).toContain('Pause film');
    expect(showcaseSource).toContain('Next shot');
    expect(showcaseSource).toContain('Restart');
    expect(showcaseSource).not.toContain('cxsmo-route-tour__number');
    expect(showcaseSource).not.toContain('<nav aria-label="Tour scenes">');
  });

  it("retains blur-safe type, custom-cursor motion, and a reduced-motion fallback", () => {
    expect(tourStyleSource).toContain('.cxsmo-route-tour__cursor img');
    expect(tourStyleSource).toContain('mix-blend-mode:screen');
    expect(tourStyleSource).toContain('@media(prefers-reduced-motion:reduce)');
    expect(introStyleSource).toContain('backdrop-filter:blur(34px)');
    expect(introStyleSource).toContain('@keyframes cxsmo-intro-star');
  });

  it("keeps the sitewide cursor limited to fine pointers with form and player fallbacks", () => {
    expect(globalCursorSource).toContain('(hover: hover) and (pointer: fine)');
    expect(globalCursorSource).toContain('(prefers-reduced-motion: reduce)');
    expect(globalCursorSource).toContain('/manus-storage/cxsmo-custom-cursor_922d53fe.png');
    expect(globalCursorStyle).toContain('input');
    expect(globalCursorStyle).toContain('cursor:text');
    expect(globalCursorStyle).toContain('html[data-cxsmo-tour="active"] .cxsmo-global-cursor');
    expect(globalCursorStyle).toContain('@media (prefers-reduced-motion:reduce),(hover:none),(pointer:coarse)');
  });

  it("keeps the animated navigation as an accessible disclosure menu", () => {
    expect(storefrontSource).toContain('aria-haspopup="menu"');
    expect(storefrontSource).toContain('role="menu"');
    expect(storefrontSource).toContain('role="menuitem"');
    expect(storefrontSource).toContain('event.key === "ArrowDown"');
    expect(storefrontSource).toContain('event.key === "ArrowUp"');
    expect(storefrontSource).toContain('event.key === "Home"');
    expect(storefrontSource).toContain('event.key === "End"');
    expect(storefrontSource).toContain('closeAndRestoreFocus');
  });
});
