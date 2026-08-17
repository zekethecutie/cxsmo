"""Direct, source-preserving crops for the supplied regenerated four-item C✦SMO sheet.

This utility intentionally does not remove backgrounds, trace contours, alter alpha, or
reconstruct garments. Each output is a rectangular crop from the user-supplied source.
"""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("/home/ubuntu/upload/ChatGPTImageAug17,2026,12_58_53PM.png")
DESTINATION = ROOT / "client" / "public" / "images"

# (left, top, right, bottom). Bounds retain the full object with deliberate breathing room.
CROPS = {
    "cxsmo-star-ruched-top-52-regenerated.png": (180, 18, 665, 455),
    "cxsmo-bolt-raglan-48-regenerated.png": (812, 52, 1302, 486),
    "cxsmo-midnight-star-sweatpant-58-regenerated.png": (204, 438, 648, 1024),
    "cxsmo-star-beanie-46-regenerated.png": (870, 610, 1322, 974),
}


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE) as source:
        print(f"source={SOURCE.name} size={source.size} mode={source.mode}")
        for filename, bounds in CROPS.items():
            crop = source.crop(bounds)
            target = DESTINATION / filename
            crop.save(target, optimize=True)
            print(f"{filename}: bounds={bounds} size={crop.size} mode={crop.mode}")


if __name__ == "__main__":
    main()
