# C✦SMO external media workflow

The managed C✦SMO site continues to use its `/manus-storage/...` references as the default. That path is backed by the project’s managed media storage and is not replaced by this export. The portable workflow exists for a GitHub checkout, a local machine, or an external deployment such as Render.

## Export the media bundle

From the project root, run:

```bash
pnpm media:export
```

This scans active client references, searches the configured local source roots, creates an external `cxsmo-portable-media/` bundle, and writes its manifest plus a generated recoverable-filename allowlist into the source tree. The external bundle is packaged as a GitHub Release asset rather than committed inside the publishable project directory. Each manifest record includes the managed reference, portable path, stable public image path, source path, MIME type, byte count, SHA-256 digest, and copy status. `MISSING-SOURCES.md` lists active references whose original local file is not present in the current workspace.

The exporter uses explicit aliases for source files whose local names differ from their managed hashed names, including the current WebP product renders and technology-select sound. The generated allowlist is Git-tracked, and the complete current active asset set is also committed directly in `client/public/images/` as requested. The release archive remains available as a single download for external deployments.

At runtime, C✦SMO checks the generated recoverable-filename allowlist and automatically uses `/images/<filename>` for every matching committed public asset. This is the standard GitHub, local, and Render behavior; `VITE_CXSMO_USE_MANAGED_MEDIA=true` is the only opt-in override for an environment that intentionally wants managed storage first. Public-image load failures restore the managed URL automatically.

## Prepare a local or Render build

For an external checkout, download and extract the matching `cxsmo-portable-media` GitHub Release archive beside the project directory. Then stage the recovered files under `client/public/images/`:

```bash
pnpm media:prepare
pnpm build
```

The `CXSMO_ALLOW_MISSING_MEDIA=1` flag is intentionally required while `MISSING-SOURCES.md` contains entries. Remove the flag after every source has been recovered. The preparation command writes `client/public/images/` for the external build only; that generated directory is ignored by Git and is not the managed Manus source of truth.

A Render build command can be:

```bash
pnpm media:prepare && pnpm build
```

For a strict release, use `CXSMO_FAIL_ON_MISSING=1 pnpm media:export` and omit `CXSMO_ALLOW_MISSING_MEDIA=1`. The export will stop instead of producing a partial media bundle.

## Source roots and overrides

The exporter searches `/home/ubuntu/webdev-static-assets`, `/home/ubuntu/upload`, and `client/public` by default. A different workstation can provide equivalent directories with `CXSMO_STATIC_ASSETS_ROOT`, `CXSMO_UPLOAD_ROOT`, and `CXSMO_LOCAL_MEDIA_ROOT`. The portable output directory can be changed with `CXSMO_PORTABLE_MEDIA_ROOT`.

The repository intentionally keeps the portable archive separate from the managed hosted media. This preserves current WebDev behavior while making the asset set inspectable, hashable, and reproducible for external hosting without blocking a project checkpoint.

## Git and large files

The current complete export is approximately 40 MB. It is committed under `client/public/images/` for direct GitHub checkout access and is also delivered as a versioned GitHub Release archive for one-file external deployment. The manifest and generated allowlist remain in Git so every external deployment can verify which media files are present.

## Current archive status

The current **v2** C✦SMO portable archive contains all **57 active C✦SMO media references**—campaign imagery, product renders, fit crops, cursor art, and sound effects—with no missing active source records. Archived KINFORM/KNIALL and test-only references are intentionally outside the current C✦SMO export scope.

## Future recovery handling

If a future managed object is not present in the local source roots, run `pnpm media:recover` while the project endpoint is available, then rerun `pnpm media:export`. If the managed endpoint cannot serve it, `MISSING-SOURCES.md` remains explicit rather than allowing an incomplete archive to be presented as complete.
