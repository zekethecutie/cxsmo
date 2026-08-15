import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const app = source("client/src/App.tsx");
const entry = source("client/src/pages/CxsmoEntryPage.tsx");
const entryStyle = source("client/src/pages/cxsmo-entry.css");
const entryAppearance = source("client/src/pages/cxsmo-entry-appearance.css");
const entryPoster = source("client/src/pages/cxsmo-entry-poster.css");
const heroCorrection = source("client/src/pages/cxsmo-hero-correction.css");
const heroLayerRepair = source("client/src/pages/cxsmo-hero-layer-repair.css");
const mobileBridgePolish = source("client/src/pages/cxsmo-mobile-bridge-polish.css");
const cursor = source("client/src/components/CxsmoCustomCursor.tsx");
const cursorStyle = source("client/src/pages/cxsmo-custom-cursor.css");
const screenshotRepair = source("client/src/pages/cxsmo-screenshot-repair.css");
const entryCenteredPoster = source("client/src/pages/cxsmo-entry-centered-poster.css");
const sound = source("client/src/contexts/CxsmoSoundContext.tsx");
const userflowStyle = source("client/src/pages/cxsmo-userflow.css");
const poster = source("client/src/pages/CxsmoPosterHome.tsx");
const studio = source("client/src/pages/CxsmoAdminPage.tsx");
const gateStyle = source("client/src/pages/cxsmo-admin-gate.css");
const account = source("client/src/pages/CxsmoAccountPages.tsx");
const polish = source("client/src/pages/cxsmo-final-polish.css");

describe("C✦SMO entry, studio, and account expansion", () => {
  it("uses a distinct editorial pre-store entry at the root route", () => {
    expect(app).toContain('<Route path="/" component={CxsmoEntryPage} />');
    expect(entry).toContain("C✦SMO STUDIOS / DIGITAL FASHION SYSTEM");
    expect(entry).toContain("<CxsmoMark inverse />");
    expect(entry).toContain("function CxsmoEntryTools()");
    expect(entry).toContain("Sound on");
    expect(entry).toContain("Switch to");
    expect(entry).toContain("Wide screen recommended");
    expect(entry).toContain("zheviant2@gmail.com");
    expect(entry).toContain("github.com/zekethecutie");
    expect(entryStyle).toContain("cxsmo-entry__orbit");
    expect(entryAppearance).toContain("html:not(.dark) .cxsmo-entry");
    expect(entry).toContain("BLXCK");
    expect(entryPoster).toContain("cxsmo-entry__stage-axis");
  });

  it("gates the studio with the supplied portfolio code and preserves a storefront return path", () => {
    expect(app).toContain('<Route path="/cxsmo/admin" component={CxsmoStudioGate} />');
    expect(studio).toContain('const studioUnlockKey = "cxsmo-studio-unlocked"');
    expect(studio).toContain('password.trim().toLowerCase() === "cxsmo"');
    expect(studio).toContain("Return to storefront");
    expect(gateStyle).toContain(".cxsmo-admin-return");
  });

  it("provides browser-local management actions without representing sales or fulfilment as real", () => {
    expect(studio).toContain("Stage product draft");
    expect(studio).toContain("Save local preview");
    expect(studio).toContain("Save allocation");
    expect(studio).toContain("Stage sale summary");
    expect(studio).toContain("No carrier lookup, rate, tracking number, or customer notification was created.");
  });

  it("splits account management into direct shopper destinations and keeps modal entry local", () => {
    expect(app).toContain('path="/cxsmo/account/profile"');
    expect(app).toContain('path="/cxsmo/account/saves"');
    expect(app).toContain('path="/cxsmo/account/activity"');
    expect(account).toContain('role="dialog"');
    expect(account).toContain('event.key !== "Tab"');
    expect(account).toContain('dialogRef.current?.querySelectorAll');
    expect(account).toContain("No password, personal data, or account record is sent anywhere.");
    expect(account).toContain("Nothing shipped.");
  });

  it("keeps the new route and layer polish appearance-safe and reduced-motion aware", () => {
    expect(app).toContain('className="cxsmo-route-transition"');
    expect(polish).toContain("html:not(.dark) .cxsmo-sound-toggle");
    expect(polish).toContain(".poster-hero__object-layer--campaign");
    expect(polish).toContain("html.dark .poster-entry-flow");
    expect(polish).toContain("@media(prefers-reduced-motion:reduce)");
  });

  it("uses a flat toolbar treatment, a controlled campaign-only crossover, and a clean light-mode bridge", () => {
    expect(heroCorrection).toContain("background:transparent!important");
    expect(heroCorrection).toContain(".cxsmo-header:before");
    expect(heroLayerRepair).toContain(".poster-hero__object-layer--campaign");
    expect(heroLayerRepair).toContain("z-index:45");
    expect(heroCorrection).toContain("html:not(.dark) .cxsmo-poster-home .poster-entry-flow");
    expect(mobileBridgePolish).toContain("html:not(.dark) .cxsmo-poster-home .poster-hero");
    expect(mobileBridgePolish).toContain(".cxsmo-entry__desktop-note{display:none}");
  });

  it("keeps the refined custom cursor frame-synced, compact, and free of a target ring", () => {
    expect(cursor).toContain("window.requestAnimationFrame");
    expect(cursor).toContain("latestPosition");
    expect(cursor).toContain("createPortal");
    expect(cursor).toContain('document.addEventListener("pointermove"');
    expect(cursorStyle).toContain("width:34px");
    expect(cursorStyle).toContain("z-index:2147483000");
    expect(cursorStyle).toContain(".cxsmo-entry");
    expect(cursorStyle).not.toContain("cxsmo-global-cursor span");
  });

  it("keeps screenshot-matched hero layering, a trigger-anchored clickable menu, and a centered entry poster contract", () => {
    expect(screenshotRepair).toContain(".cxsmo-header__menu-panel");
    expect(screenshotRepair).toContain("position: absolute");
    expect(screenshotRepair).toContain("pointer-events: auto");
    expect(screenshotRepair).toContain("height: calc(100% + 84px)");
    expect(entry).toContain('repeat: Infinity');
    expect(entryCenteredPoster).toContain("left: 50%");
    expect(entryCenteredPoster).toContain("drop-shadow(0 24px 22px");
  });

  it("uses the supplied modern technology-select cue for interactive hover and object-zoom feedback", () => {
    expect(sound).toContain("cxsmo-modern-technology-select_c5dbba14.wav");
    expect(sound).toContain('hover: "/manus-storage/cxsmo-modern-technology-select');
    expect(sound).toContain('zoom: "/manus-storage/cxsmo-modern-technology-select');
    expect(userflowStyle).toContain("cxsmo-mark-star-refined");
  });

  it("removes non-brand sparkle decorations from the active poster route", () => {
    expect(poster).not.toContain("Sparkles");
  });
});
