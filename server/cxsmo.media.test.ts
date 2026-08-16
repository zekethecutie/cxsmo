import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const mediaSource = read("client/src/lib/cxsmoMedia.ts");
const productSource = read("client/src/lib/cxsmo.ts");
const fallbackSource = read("client/src/components/CxsmoPublicMediaFallback.tsx");

describe("C✦SMO portable public media contract", () => {
  it("maps managed media basenames to Git-tracked /images URLs and retains the managed source resolver", () => {
    expect(mediaSource).toContain('const managedPrefix = "/manus-storage/"');
    expect(mediaSource).toContain('const publicPrefix = "/images/"');
    expect(mediaSource).toContain("export function cxsmoManagedMediaUrl");
    expect(mediaSource).toContain("export function preferCxsmoPublicMedia");
  });

  it("keeps managed media as the default while retaining opt-in public-bundle resolution and managed fallback", () => {
    expect(productSource).toContain("image: preferCxsmoPublicMedia(product.image)");
    expect(fallbackSource).toContain('const publicSource = preferCxsmoPublicMedia(declaredSource)');
    expect(fallbackSource).toContain('image.setAttribute("src", publicSource)');
    expect(fallbackSource).toContain('image.setAttribute("src", managedSource)');
    expect(fallbackSource).toContain("new MutationObserver");
    expect(mediaSource).toContain('import.meta.env.VITE_CXSMO_USE_PORTABLE_MEDIA === "true"');
  });
});
