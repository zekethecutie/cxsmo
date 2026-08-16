from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


SOURCES = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repair-sources")
OUTPUT = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repairs")
CANVAS = (1200, 1500)


def centre(subject: Image.Image) -> Image.Image:
    alpha = subject.getchannel("A")
    bounds = alpha.getbbox()
    if bounds is None:
        raise RuntimeError("No product pixels found")
    product = subject.crop(bounds)
    scale = min((CANVAS[0] * 0.8) / product.width, (CANVAS[1] * 0.84) / product.height)
    product = product.resize(
        (max(1, round(product.width * scale)), max(1, round(product.height * scale))),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    canvas.alpha_composite(product, ((CANVAS[0] - product.width) // 2, (CANVAS[1] - product.height) // 2))
    return canvas


def recover_beanie() -> Image.Image:
    with Image.open(SOURCES / "star-beanie.png").convert("RGBA") as source:
        # The original source has a single opaque knit object. A feathered outline
        # retains the dark material that general-purpose segmentation discarded.
        mask = Image.new("L", source.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.polygon(
            [(32, 174), (38, 84), (56, 40), (96, 15), (152, 4), (210, 15), (264, 52), (288, 103), (290, 166), (252, 185), (124, 188), (58, 184)],
            fill=255,
        )
        mask = mask.filter(ImageFilter.GaussianBlur(1.4))
        source.putalpha(mask)
        return centre(source)


def fill_enclosed_holes(mask: list[list[bool]]) -> list[list[bool]]:
    height, width = len(mask), len(mask[0])
    outside = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()
    for x in range(width):
        queue.extend(((0, x), (height - 1, x)))
    for y in range(height):
        queue.extend(((y, 0), (y, width - 1)))
    while queue:
        y, x = queue.popleft()
        if not (0 <= y < height and 0 <= x < width) or outside[y][x] or mask[y][x]:
            continue
        outside[y][x] = True
        queue.extend(((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)))
    return [[mask[y][x] or not outside[y][x] for x in range(width)] for y in range(height)]


def recover_white_tank() -> Image.Image:
    with Image.open(SOURCES / "star-spear-tank.png").convert("RGBA") as source:
        # The white tank is fully present in the source, but its dark spear graphic
        # defeats automatic alpha segmentation. Preserve the garment with a tight,
        # source-matched contour and separately remove only the open neckline.
        mask = Image.new("L", source.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.polygon([(11, 0), (25, 0), (32, 34), (51, 23), (123, 22), (137, 31), (145, 0), (159, 0), (155, 59), (178, 82), (181, 151), (164, 194), (159, 232), (140, 255), (44, 255), (28, 236), (23, 197), (6, 169), (5, 110), (17, 72)], fill=255)
        draw.polygon([(51, 24), (123, 22), (128, 35), (120, 44), (58, 45), (48, 37)], fill=0)
        mask = mask.filter(ImageFilter.GaussianBlur(0.9))
        result = source.copy()
        result.putalpha(mask)
        return centre(result)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    recover_beanie().save(OUTPUT / "cxsmo-smart-cxsmo-catalogue-15-star-beanie.png", "PNG", optimize=True)
    recover_white_tank().save(OUTPUT / "cxsmo-smart-cxsmo-catalogue-21-star-spear-tank.png", "PNG", optimize=True)
    print("Recovered constrained source silhouettes for Star Beanie and Star Spear Tank")


if __name__ == "__main__":
    main()
