import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(process.env.CXSMO_PROJECT_ROOT ?? new URL("..", import.meta.url).pathname);
const portableRoot = resolve(process.env.CXSMO_PORTABLE_MEDIA_ROOT ?? join(projectRoot, "..", "cxsmo-portable-media"));
const publicRoot = resolve(process.env.CXSMO_EXTERNAL_PUBLIC_ROOT ?? join(projectRoot, "client/public"));
const manifestPath = join(portableRoot, "manifest.json");
if (!existsSync(manifestPath)) throw new Error("portable-media/manifest.json is missing. Run `pnpm media:export` first.");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
if (manifest.missingSource > 0 && process.env.CXSMO_ALLOW_MISSING_MEDIA !== "1") throw new Error(`Portable media is incomplete: ${manifest.missingSource} active references have no local source. Review portable-media/MISSING-SOURCES.md or set CXSMO_ALLOW_MISSING_MEDIA=1 for a partial external preview.`);
const destinationRoot = join(publicRoot, "images");
rmSync(destinationRoot, { recursive: true, force: true });
mkdirSync(destinationRoot, { recursive: true });
for (const record of manifest.records.filter((item) => item.status === "copied")) {
  const source = join(portableRoot, "images", record.reference.split("/").at(-1));
  const destination = join(destinationRoot, record.reference.split("/").at(-1));
  mkdirSync(resolve(destination, ".."), { recursive: true });
  copyFileSync(source, destination);
}
console.log(JSON.stringify({ prepared: manifest.copied, destinationRoot, missingSource: manifest.missingSource, note: "Generated client/public/images is for external builds only. Set VITE_CXSMO_USE_PORTABLE_MEDIA=true for the external build; managed Manus storage remains the hosted-site default." }, null, 2));
