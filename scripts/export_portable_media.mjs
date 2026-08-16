import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";

const projectRoot = resolve(process.env.CXSMO_PROJECT_ROOT ?? new URL("..", import.meta.url).pathname);
const outputRoot = resolve(process.env.CXSMO_PORTABLE_MEDIA_ROOT ?? join(projectRoot, "..", "cxsmo-portable-media"));
const gitMediaRoot = resolve(process.env.CXSMO_GIT_MEDIA_ROOT ?? join(outputRoot, "images"));
const refsFile = resolve(process.env.CXSMO_MEDIA_REFS ?? join(outputRoot, "media-references.txt"));
const sourceRoots = [
  resolve(process.env.CXSMO_STATIC_ASSETS_ROOT ?? "/home/ubuntu/webdev-static-assets"),
  resolve(process.env.CXSMO_UPLOAD_ROOT ?? "/home/ubuntu/upload"),
  resolve(process.env.CXSMO_LOCAL_MEDIA_ROOT ?? join(projectRoot, "client/public")),
];
const mediaExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".wav", ".mp3", ".ogg", ".m4a", ".webm", ".mp4"]);
const sourceAliases = {
  "cxsmo-key-charm-alpha-fallback_3dd702fb.png": "cxsmo-key-charm-v2.webp",
  "cxsmo-modern-technology-select_c5dbba14.wav": "mixkit-modern-technology-select-3124.wav",
  "cxsmo-starlight-shell-alpha-fallback_a7406211.png": "cxsmo-starlight-shell-v3.webp",
  "cxsmo-static-bloom-lip-glaze-alpha_40b6478e.png": "cxsmo-static-lip-glaze-v2.webp",
};

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const filePath = join(dir, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}
function sha256(filePath) { return createHash("sha256").update(readFileSync(filePath)).digest("hex"); }
function mimeFor(filePath) {
  return ({ ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".wav": "audio/wav", ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".m4a": "audio/mp4", ".webm": "video/webm", ".mp4": "video/mp4" })[extname(filePath).toLowerCase()] ?? "application/octet-stream";
}
function normalizedStem(filePath) {
  const fileName = basename(filePath);
  const extension = extname(fileName);
  return fileName.slice(0, -extension.length).replace(/_[a-f0-9]{8}$/i, "").toLowerCase();
}
function findCandidate(expectedName, sourceFiles) {
  const alias = sourceAliases[expectedName];
  if (alias) {
    const aliased = sourceFiles.find((filePath) => basename(filePath).toLowerCase() === alias.toLowerCase());
    if (aliased) return aliased;
  }
  const expectedStem = normalizedStem(expectedName);
  const expectedExtension = extname(expectedName).toLowerCase();
  const exact = sourceFiles.find((filePath) => basename(filePath).toLowerCase() === expectedName.toLowerCase());
  if (exact) return exact;
  const sameStem = sourceFiles.filter((filePath) => normalizedStem(filePath) === expectedStem);
  return sameStem.find((filePath) => extname(filePath).toLowerCase() === expectedExtension) ?? sameStem[0] ?? sourceFiles.find((filePath) => normalizedStem(filePath).startsWith(expectedStem) || expectedStem.startsWith(normalizedStem(filePath)));
}
function collectRefs() {
  if (existsSync(refsFile)) return readFileSync(refsFile, "utf8").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const references = new Set();
  for (const filePath of walk(join(projectRoot, "client/src"))) {
    if (!/[jt]sx?$/.test(filePath)) continue;
    for (const match of readFileSync(filePath, "utf8").matchAll(/\/manus-storage\/([A-Za-z0-9_.,\/-]+)/g)) references.add(`/manus-storage/${match[1]}`);
  }
  return [...references].sort();
}

const refs = collectRefs();
const sourceFiles = sourceRoots.flatMap(walk).filter((filePath) => mediaExtensions.has(extname(filePath).toLowerCase()));
const destinationRoot = gitMediaRoot;
mkdirSync(destinationRoot, { recursive: true });
const records = [];
for (const reference of refs) {
  const expectedName = basename(reference);
  const source = findCandidate(expectedName, sourceFiles);
  const record = { reference, portablePath: `/cxsmo-portable-media/images/${expectedName}`, gitPath: source ? `/images/${expectedName}` : null, publicUrl: source ? `/images/${expectedName}` : null, sourcePath: source ? relative(projectRoot, source) : null, mimeType: null, bytes: null, sha256: null, status: source ? "copied" : "missing-source" };
  if (source) {
    const destination = join(destinationRoot, expectedName);
    const bytes = readFileSync(source);
    writeFileSync(destination, bytes);
    record.mimeType = mimeFor(source);
    record.bytes = statSync(source).size;
    record.sha256 = sha256(destination);
  }
  records.push(record);
}
const copied = records.filter((record) => record.status === "copied");
const missing = records.filter((record) => record.status === "missing-source");
const manifest = { generatedAt: new Date().toISOString(), project: "cxsmo", sourceRoots, managedDefault: "manus-storage", portableRoot: "cxsmo-portable-media/manus-storage", archiveImageRoot: "cxsmo-portable-media/images", assetBaseEnvironment: "VITE_CXSMO_USE_PORTABLE_MEDIA", totalReferences: records.length, copied: copied.length, missingSource: missing.length, records };
writeFileSync(join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
writeFileSync(join(projectRoot, "client/src/lib/cxsmoPublicMedia.generated.ts"), `// Generated by pnpm media:export — do not edit by hand.\nexport const cxsmoPublicMediaBasenames = ${JSON.stringify(copied.map((record) => basename(record.reference)).sort(), null, 2)} as const;\n`);
writeFileSync(join(outputRoot, "media-references.txt"), `${refs.join("\n")}\n`);
writeFileSync(join(outputRoot, "MISSING-SOURCES.md"), `# C✦SMO missing portable media sources\n\nThese active managed-storage references have no matching local source in the restored workspace. Obtain the originals before treating an external deployment as media-complete.\n\n${missing.length ? missing.map((record) => `- ${record.reference}`).join("\n") : "No missing sources."}\n`);
console.log(JSON.stringify({ outputRoot, gitMediaRoot, references: records.length, copied: copied.length, missingSource: missing.length, totalBytes: copied.reduce((sum, record) => sum + record.bytes, 0) }, null, 2));
if (process.env.CXSMO_FAIL_ON_MISSING === "1" && missing.length) process.exit(2);
