import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const showcaseSource = readFileSync(resolve(process.cwd(), "client/src/components/CxsmoGuidedShowcase.tsx"), "utf8");
const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const tourStyleSource = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-route-tour.css"), "utf8");
const introStyleSource = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-route-tour-intro.css"), "utf8");
const globalCursorSource = readFileSync(resolve(process.cwd(), "client/src/components/CxsmoCustomCursor.tsx"), "utf8");
const globalCursorStyle = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-custom-cursor.css"), "utf8");
const themeWashSource = readFileSync(resolve(process.cwd(), "client/src/components/CxsmoThemeWash.tsx"), "utf8");
const themeWashStyle = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-av.css"), "utf8");
const routeTransitionStyle = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-route-transition.css"), "utf8");
const storefrontSource = readFileSync(resolve(process.cwd(), "client/src/pages/CxsmoStorefront.tsx"), "utf8");
const auditRefinementStyle = readFileSync(resolve(process.cwd(), "client/src/pages/cxsmo-audit-refinements.css"), "utf8");

describe("C✦SMO guided player", () => {
  it("keeps the target-aware expanded ten-shot portfolio sequence without a fake cursor", () => {
    expect(showcaseSource).not.toContain('cxsmo-route-tour__cursor');
    expect(showcaseSource.match(/code:"0[0-9]"/g)).toHaveLength(10);
    expect(showcaseSource).toContain('route:"/cxsmo/support"');
    expect(showcaseSource).toContain('route:"/cxsmo/disclosure"');
    expect(showcaseSource).toContain('title:["THIS IS","C✦SMO."]');
  });

  it("maps every directed scene to a registered public route", () => {
    const routes = Array.from(showcaseSource.matchAll(/route:"([^\"]+)"/g), (match) => match[1]);
    const registeredRoutes = Array.from(appSource.matchAll(/<Route path="([^\"]+)"/g), (match) => match[1]);
    expect(routes).toHaveLength(10);
    routes.forEach((route) => expect(registeredRoutes).toContain(route.startsWith("/cxsmo/products/") ? "/cxsmo/products/:id" : route));
    expect(registeredRoutes).toContain("/cxsmo/information");
  });

  it("retains exit-only chrome without scene-number navigation", () => {
    expect(showcaseSource).toContain('document.body.style.overflow = "hidden"');
    expect(showcaseSource).toContain('event.key === "Escape"');
    expect(showcaseSource).toContain('<X size={17} /> Exit');
    expect(showcaseSource).not.toContain('Pause film');
    expect(showcaseSource).not.toContain('Next shot');
    expect(showcaseSource).not.toContain('Restart');
    expect(showcaseSource).not.toContain('cxsmo-route-tour__number');
    expect(showcaseSource).not.toContain('<nav aria-label="Tour scenes">');
  });

  it("keeps a restrained red-gradient intro, target spotlight, attached editorial tooltip, and a reduced-motion fallback", () => {
	  expect(showcaseSource).toContain('dataset.cxsmoTourTarget = "true"');
	  expect(showcaseSource).toContain('setCallout');
	  expect(showcaseSource).not.toContain('customCursorAsset');
	  expect(tourStyleSource).toContain('@media(prefers-reduced-motion:reduce)');
	  expect(showcaseSource).toContain('reducedMotion ? 0 : 6100');
	  expect(showcaseSource).toContain('placeSpotlight');
	  expect(showcaseSource).toContain('cxsmo-route-tour__spotlight');
	  expect(showcaseSource).toContain('cxsmo-route-tour__tooltip');
	  expect(showcaseSource).toContain('no visitor actions are made');
	  expect(showcaseSource).not.toContain('.click()');
	  expect(tourStyleSource).toContain('cxsmo-route-tour__spotlight');
	  expect(tourStyleSource).toContain('cxsmo-route-tour__tooltip');
	  expect(introStyleSource).toContain('background:radial-gradient(circle at 50% 42%');
    expect(introStyleSource).not.toContain('repeating-linear-gradient');
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

	it("keeps the theme wash, route wipe, and cursor above all routed page content", () => {
	  expect(appSource).toContain("<CxsmoThemeWash />");
	  expect(themeWashSource).toContain("createPortal");
	  expect(themeWashSource).toContain("document.body");
	  expect(themeWashStyle).toContain("z-index:2147483500");
	  expect(routeTransitionStyle).toContain("z-index: 2147483600");
	  expect(globalCursorStyle).toContain("z-index:2147483647");
	  expect(tourStyleSource).toContain("z-index:2147483000");
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
    expect(auditRefinementStyle).toContain('.cxsmo-header .cxsmo-header__menu { display:block; margin-left:auto; }');
    expect(auditRefinementStyle).toContain('.cxsmo-header__menu-panel { left:auto; min-width:min(244px,calc(100vw - 34px)); right:0; }');
  });
});
