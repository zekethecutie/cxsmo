import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const app = source("client/src/App.tsx");
const entry = source("client/src/pages/CxsmoEntryPage.tsx");
const entryStyle = source("client/src/pages/cxsmo-entry.css");
const studio = source("client/src/pages/CxsmoAdminPage.tsx");
const gateStyle = source("client/src/pages/cxsmo-admin-gate.css");
const account = source("client/src/pages/CxsmoAccountPages.tsx");
const polish = source("client/src/pages/cxsmo-final-polish.css");

describe("C✦SMO entry, studio, and account expansion", () => {
  it("uses a distinct editorial pre-store entry at the root route", () => {
    expect(app).toContain('<Route path="/" component={CxsmoEntryPage} />');
    expect(entry).toContain("C✦SMO STUDIOS / DIGITAL FASHION SYSTEM");
    expect(entry).toContain("Wide screen recommended");
    expect(entry).toContain("cxsmostudios@cxsmo.io");
    expect(entryStyle).toContain("cxsmo-entry__orbit");
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
});
