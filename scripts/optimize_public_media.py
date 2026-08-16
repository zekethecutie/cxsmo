#!/usr/bin/env python3
"""Create size-safe PNG copies of large public C✦SMO images.

The source originals remain outside the repository for recovery. Output retains
the same filename and alpha channel, allowing existing /images URLs to remain
stable for Render and GitHub deployments.
"""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image


PROJECT = Path(__file__).resolve().parents[1]
PUBLIC_IMAGES = PROJECT / "client" / "public" / "images"
ARCHIVE = Path("/home/ubuntu/webdev-static-assets/cxsmo-original-public-media")
TARGET_BYTES = 950_000


def optimize_image(source: Path, destination: Path) -> tuple[int, int, tuple[int, int], tuple[int, int]]:
    with Image.open(source) as image:
        rgba = image.convert("RGBA")
        original_size = rgba.size
        max_dimension = max(rgba.size)
        if max_dimension > 1200:
            scale = 1200 / max_dimension
            rgba = rgba.resize((round(rgba.width * scale), round(rgba.height * scale)), Image.Resampling.LANCZOS)
        if source.suffix.lower() in {".jpg", ".jpeg"}:
            rgb = rgba.convert("RGB")
            rgb.save(destination, "JPEG", optimize=True, progressive=True, quality=84)
            if destination.stat().st_size > TARGET_BYTES:
                rgb.save(destination, "JPEG", optimize=True, progressive=True, quality=74)
        else:
            rgba.save(destination, "PNG", optimize=True, compress_level=9)
            if destination.stat().st_size > TARGET_BYTES:
                quantized = rgba.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
                quantized.save(destination, "PNG", optimize=True, compress_level=9)
        return source.stat().st_size, destination.stat().st_size, original_size, rgba.size


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="replace repository copies after archiving originals")
    parser.add_argument("--source", type=Path, default=PUBLIC_IMAGES)
    args = parser.parse_args()

    source_root = args.source.resolve()
    output_root = ARCHIVE.parent / "cxsmo-public-media-optimized"
    output_root.mkdir(parents=True, exist_ok=True)
    candidates = sorted(path for path in source_root.glob("*.*") if path.suffix.lower() in {".png", ".jpg", ".jpeg"} and path.stat().st_size > 1_000_000)
    if not candidates:
        print("No public PNG files exceed 1 MB.")
        return

    total_before = 0
    total_after = 0
    for source in candidates:
        output = output_root / source.name
        before, after, original_dimensions, optimized_dimensions = optimize_image(source, output)
        total_before += before
        total_after += after
        print(f"{source.name}: {before:,} → {after:,} bytes; {original_dimensions} → {optimized_dimensions}")
        if args.apply:
            archived = ARCHIVE / source.name
            archived.parent.mkdir(parents=True, exist_ok=True)
            if not archived.exists():
                shutil.copy2(source, archived)
            shutil.copy2(output, source)

    print(f"Optimized {len(candidates)} files: {total_before:,} → {total_after:,} bytes")
    if not args.apply:
        print(f"Dry run only. Optimized candidates are at {output_root}")


if __name__ == "__main__":
    main()
