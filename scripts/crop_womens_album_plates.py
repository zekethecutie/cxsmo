"""Create tight, alpha-preserving editorial crops for the women’s full-cast album.

The supplied album images already contain the full cast; this tool only crops the
unused transparent canvas around each visible cast. It does not mask, recolour, or
modify any garment or model pixels.
"""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "client" / "public" / "images"
SOURCES = {
    "cxsmo-fit-edits-album-top.png": "cxsmo-fit-edits-album-top-plate.png",
    "cxsmo-fit-edits-album-bottom.png": "cxsmo-fit-edits-album-bottom-plate.png",
}


def padded_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    alpha = image.getchannel("A") if "A" in image.getbands() else None
    bbox = alpha.getbbox() if alpha else None
    if bbox is None:
        return (0, 0, image.width, image.height)
    left, top, right, bottom = bbox
    padding = max(18, round(max(right - left, bottom - top) * 0.08))
    return (
        max(0, left - padding),
        max(0, top - padding),
        min(image.width, right + padding),
        min(image.height, bottom + padding),
    )


def main() -> None:
    for source_name, output_name in SOURCES.items():
        source = IMAGE_DIR / source_name
        output = IMAGE_DIR / output_name
        with Image.open(source) as image:
            bounds = padded_bbox(image)
            plate = image.crop(bounds)
            plate.save(output, optimize=True)
            print(f"{source_name}: {image.size} -> {output_name}: {plate.size}, crop={bounds}")


if __name__ == "__main__":
    main()
