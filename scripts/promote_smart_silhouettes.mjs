import { existsSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { basename, join } from "node:path";

const project = process.cwd();
const cataloguePath = join(project, "client/src/lib/cxsmo.ts");
const publicDir = join(project, "client/public/images");
const smartDir = "/home/ubuntu/webdev-static-assets/cxsmo-smart-silhouettes";
let catalogue = readFileSync(cataloguePath, "utf8");
const rawNames = [...catalogue.matchAll(/cxsmo-catalogue-[^" ]+\.png/g)].map(([name]) => name);
const uniqueNames = [...new Set(rawNames)];

for (const rawName of uniqueNames) {
  const smartSource = join(smartDir, rawName);
  if (!existsSync(smartSource)) throw new Error(`Missing smart silhouette: ${rawName}`);
  const smartName = `cxsmo-smart-${rawName}`;
  copyFileSync(smartSource, join(publicDir, smartName));
  catalogue = catalogue.replaceAll(`/images/${rawName}`, `/images/${smartName}`);
  const rawPublicPath = join(publicDir, rawName);
  if (existsSync(rawPublicPath)) rmSync(rawPublicPath);
}

writeFileSync(cataloguePath, catalogue);
console.log(JSON.stringify({ promoted: uniqueNames.length, files: uniqueNames.map((name) => basename(name)) }, null, 2));
