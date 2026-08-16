import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const projectRoot = resolve(process.env.CXSMO_PROJECT_ROOT ?? new URL("..", import.meta.url).pathname);
const portableRoot = resolve(process.env.CXSMO_PORTABLE_MEDIA_ROOT ?? join(projectRoot, "..", "cxsmo-portable-media"));
const referencesPath = join(portableRoot, "MISSING-SOURCES.md");
const baseUrl = (process.env.CXSMO_MANAGED_MEDIA_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const destinationRoot = join(portableRoot, "images");

const references = readFileSync(referencesPath, "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim().replace(/^-\s+/, ""))
  .filter((line) => line.startsWith("/manus-storage/"));

mkdirSync(destinationRoot, { recursive: true });
const recovered = [];
const failures = [];
for (const reference of references) {
  const response = await fetch(`${baseUrl}${reference}`, { redirect: "follow" });
  if (!response.ok) { failures.push({ reference, status: response.status }); continue; }
  const bytes = Buffer.from(await response.arrayBuffer());
  writeFileSync(join(destinationRoot, basename(reference)), bytes);
  recovered.push({ reference, bytes: bytes.length, contentType: response.headers.get("content-type") });
}

writeFileSync(join(portableRoot, "RECOVERY-RESULT.json"), `${JSON.stringify({ baseUrl, recovered, failures }, null, 2)}\n`);
console.log(JSON.stringify({ destinationRoot, recovered: recovered.length, failures: failures.length, bytes: recovered.reduce((total, item) => total + item.bytes, 0) }, null, 2));
if (failures.length) process.exitCode = 2;
