from pathlib import Path

from PIL import Image


UPLOAD = Path("/home/ubuntu/upload")
OUTPUT = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repair-sources")

SHEET_09_16 = UPLOAD / "ChatGPTImageAug16,2026,04_38_29PM.png"
SHEET_17_36 = UPLOAD / "ChatGPTImageAug16,2026,04_43_05PM(2).png"

# Crop boundaries exclude the source-sheet ordinal tags while preserving the full product
# object needed to rebuild a clean transparent silhouette.
SOURCES = {
    "star-beanie": (SHEET_09_16, (866, 652, 1188, 842)),
    "bolt-raglan": (SHEET_17_36, (18, 70, 314, 338)),
    "star-spear-tank": (SHEET_17_36, (320, 70, 510, 326)),
    "chain-cargo-short": (SHEET_17_36, (660, 370, 916, 604)),
    "midnight-star-sweatpant": (SHEET_17_36, (900, 345, 1090, 810)),
    "midnight-cargo-pant": (SHEET_17_36, (1302, 370, 1536, 980)),
    "chrome-charm-bag": (SHEET_17_36, (892, 840, 1120, 1024)),
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name, (sheet, box) in SOURCES.items():
        if not sheet.exists():
            raise FileNotFoundError(f"Missing documented source sheet: {sheet}")
        with Image.open(sheet) as image:
            image.crop(box).save(OUTPUT / f"{name}.png", "PNG", optimize=True)
    print(f"Extracted {len(SOURCES)} source regions to {OUTPUT}")


if __name__ == "__main__":
    main()
