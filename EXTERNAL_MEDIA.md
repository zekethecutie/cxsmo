# C✦SMO external media workflow

The managed C✦SMO site continues to use its `/manus-storage/...` references as the default. That path is backed by the project’s managed media storage and is not replaced by this export. The portable workflow exists for a GitHub checkout, a local machine, or an external deployment such as Render.

## Export the media bundle

From the project root, run:

```bash
pnpm media:export
```

This scans active client references, searches the configured local source roots, creates an external `cxsmo-portable-media/` bundle, and writes its manifest plus a generated recoverable-filename allowlist into the source tree. The external bundle is packaged as a GitHub Release asset rather than committed inside the publishable project directory. Each manifest record includes the managed reference, portable path, stable public image path, source path, MIME type, byte count, SHA-256 digest, and copy status. `MISSING-SOURCES.md` lists active references whose original local file is not present in the current workspace.

The exporter uses explicit aliases for source files whose local names differ from their managed hashed names, including the current WebP product renders and technology-select sound. It records unavailable historical or previously uploaded source files rather than inventing replacements. The generated allowlist is intentionally small and Git-tracked; the actual large media archive is delivered through the repository release.

At runtime, C✦SMO checks the generated recoverable-filename allowlist. The managed site always uses `/manus-storage/<filename>`. An external deployment opts into `/images/<filename>` by setting `VITE_CXSMO_USE_PORTABLE_MEDIA=true` only after extracting the release archive and preparing its checkout. Files absent from the allowlist remain on their original managed URL, and public-image load failures restore the managed URL automatically.

## Prepare a local or Render build

For an external checkout, download and extract the matching `cxsmo-portable-media` GitHub Release archive beside the project directory. Then stage the recovered files under `client/public/images/`:

```bash
CXSMO_ALLOW_MISSING_MEDIA=1 pnpm media:prepare
VITE_CXSMO_USE_PORTABLE_MEDIA=true pnpm build
```

The `CXSMO_ALLOW_MISSING_MEDIA=1` flag is intentionally required while `MISSING-SOURCES.md` contains entries. Remove the flag after every source has been recovered. The preparation command writes `client/public/images/` for the external build only; that generated directory is ignored by Git and is not the managed Manus source of truth.

A Render build command can be:

```bash
pnpm media:prepare && VITE_CXSMO_USE_PORTABLE_MEDIA=true pnpm build
```

For a strict release, use `CXSMO_FAIL_ON_MISSING=1 pnpm media:export` and omit `CXSMO_ALLOW_MISSING_MEDIA=1`. The export will stop instead of producing a partial media bundle.

## Source roots and overrides

The exporter searches `/home/ubuntu/webdev-static-assets`, `/home/ubuntu/upload`, and `client/public` by default. A different workstation can provide equivalent directories with `CXSMO_STATIC_ASSETS_ROOT`, `CXSMO_UPLOAD_ROOT`, and `CXSMO_LOCAL_MEDIA_ROOT`. The portable output directory can be changed with `CXSMO_PORTABLE_MEDIA_ROOT`.

The repository intentionally keeps the portable archive separate from the managed hosted media. This preserves current WebDev behavior while making the asset set inspectable, hashable, and reproducible for external hosting without blocking a project checkpoint.

## Git and large files

The current recovered export is approximately 19 MB. It is delivered as a versioned GitHub Release archive because the project publisher rejects large binary files in the source tree. The manifest and generated allowlist remain in Git so every external deployment can verify which media files are present and which are still missing.

## Current limitation

The exporter cannot recover a managed storage object when the original local source is no longer present and the managed URL is private to the WebDev runtime. Those entries remain explicit in `portable-media/MISSING-SOURCES.md`; supply the original file, place it in one of the configured source roots, rerun `pnpm media:export`, and commit the refreshed bundle and manifest. Until then, the external bundle is intentionally partial rather than misleadingly presented as complete.
