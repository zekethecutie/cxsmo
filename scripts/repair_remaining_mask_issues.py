from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "client" / "public" / "images"
SOURCES = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repair-sources")
OUTPUT = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repairs")
CANVAS = (1200, 1500)
STAR_RUCHED_SOURCE = Path("/home/ubuntu/upload/pasted_file_1SOVlV_image.png")


def to_canvas(image: Image.Image) -> Image.Image:
    scale = min(980 / image.width, 1300 / image.height)
    image = image.resize((max(1, round(image.width * scale)), max(1, round(image.height * scale))), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    x = (CANVAS[0] - image.width) // 2
    y = (CANVAS[1] - image.height) // 2
    canvas.alpha_composite(image, (x, y))
    return canvas


def rebuild_star_ruched_top() -> Image.Image:
    """Restore only the missing sleeve over the clean public torso; the source background is never part of the alpha."""
    base = Image.open(PUBLIC / "cxsmo-smart-cxsmo-catalogue-24-star-ruched-top.png").convert("RGBA")
    base_alpha = np.array(base.getchannel("A"))
    base_alpha[:520, 820:] = 0
    inherited_field = Image.new("L", CANVAS, 0)
    ImageDraw.Draw(inherited_field).polygon([
        (626, 535), (698, 548), (751, 620), (789, 740), (801, 900),
        (785, 1087), (713, 1096), (682, 1050), (710, 952), (720, 840),
        (710, 730), (674, 628),
    ], fill=255)
    base_alpha[np.array(inherited_field) > 0] = 0
    base.putalpha(Image.fromarray(base_alpha).filter(ImageFilter.GaussianBlur(0.35)))
    with Image.open(STAR_RUCHED_SOURCE).convert("RGBA") as source:
        sleeve_field = Image.new("L", source.size, 0)
        ImageDraw.Draw(sleeve_field).polygon([
            (104, 120), (121, 120), (132, 129), (141, 150), (147, 175),
            (149, 202), (145, 228), (136, 252), (128, 268), (119, 262),
            (124, 246), (130, 224), (132, 202), (128, 179), (120, 154),
            (107, 136),
        ], fill=255)
        rgb = np.array(source.convert("RGB"), dtype=np.int16)
        sleeve_alpha = ((rgb.mean(axis=2) < 110) & (np.array(sleeve_field) > 0)).astype(np.uint8) * 255
        sleeve = source.copy()
        sleeve.putalpha(Image.fromarray(sleeve_alpha).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.35)))
        base.alpha_composite(to_canvas(sleeve))
    return base


def restore_enclosed_alpha_holes(source: Image.Image) -> Image.Image:
    """Keep the solo product render intact and restore only transparent holes not connected to the canvas edge."""
    alpha = np.array(source.getchannel("A"))
    transparent = alpha == 0
    seen = np.zeros_like(transparent, dtype=bool)
    height, width = transparent.shape
    stack = [(x, y) for x in range(width) for y in (0, height - 1) if transparent[y, x]]
    stack += [(x, y) for y in range(height) for x in (0, width - 1) if transparent[y, x]]
    while stack:
        x, y = stack.pop()
        if x < 0 or x >= width or y < 0 or y >= height or seen[y, x] or not transparent[y, x]:
            continue
        seen[y, x] = True
        stack.extend(((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)))
    repaired = source.copy()
    alpha[transparent & ~seen] = 255
    repaired.putalpha(Image.fromarray(alpha))
    return repaired


def contour_mask(source_name: str, points: list[tuple[int, int]] | list[list[tuple[int, int]]]) -> Image.Image:
    with Image.open(SOURCES / source_name).convert("RGBA") as source:
        mask = Image.new("L", source.size, 0)
        draw = ImageDraw.Draw(mask)
        contours = points if isinstance(points[0], list) else [points]  # type: ignore[index]
        for contour in contours:
            draw.polygon(contour, fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(0.8))
        result = source.copy()
        result.putalpha(mask)
        return to_canvas(result)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    # The direct model cutout cleanly retains this fine sleeve and cuff. Remove its isolated upper-right card remnant first.
    star = Image.open(OUTPUT / "star-ruched-rembg-comparison.png").convert("RGBA")
    star_alpha = np.array(star.getchannel("A"))
    star_alpha[:116, 145:] = 0
    star.putalpha(Image.fromarray(star_alpha))
    to_canvas(star).save(OUTPUT / "cxsmo-smart-cxsmo-catalogue-24-star-ruched-top.png", "PNG", optimize=True)
    # Sleeve contours follow the garment seams closely, excluding the grey source field while retaining full cuffs.
    bolt = contour_mask("bolt-raglan.png", [
        [(62, 13), (216, 13), (221, 42), (218, 80), (214, 111), (210, 145), (203, 183), (194, 205), (87, 206), (71, 190), (60, 157), (56, 108), (58, 61)],
        [(57, 18), (49, 25), (42, 49), (39, 82), (39, 113), (42, 144), (47, 174), (52, 201), (55, 214), (52, 218), (48, 208), (47, 180), (50, 148), (53, 111), (54, 75)],
        [(216, 14), (237, 18), (246, 28), (252, 59), (253, 94), (250, 127), (245, 158), (237, 188), (230, 214), (226, 218), (222, 208), (220, 184), (221, 156), (221, 128), (221, 100), (221, 65)],
    ])
    bolt.save(OUTPUT / "cxsmo-smart-cxsmo-catalogue-20-bolt-raglan.png", "PNG", optimize=True)
    # The direct model preserves the complete lower-right pooled hem more faithfully than the manual contour.
    sweat = Image.open(OUTPUT / "midnight-star-sweatpant-rembg-comparison.png").convert("RGBA")
    to_canvas(sweat).save(OUTPUT / "cxsmo-smart-cxsmo-catalogue-30-midnight-star-sweatpant.png", "PNG", optimize=True)
    stellar = Image.open(PUBLIC / "cxsmo-stellar-cargo-18.png").convert("RGBA")
    stellar = restore_enclosed_alpha_holes(stellar)
    stellar_alpha = np.array(stellar.getchannel("A"))
    centre_gap = Image.new("L", stellar.size, 0)
    ImageDraw.Draw(centre_gap).polygon([(447, 187), (492, 185), (504, 390), (497, 600), (480, 776), (452, 778), (442, 590), (437, 385)], fill=255)
    stellar_alpha[np.array(centre_gap) > 0] = 255
    stellar.putalpha(Image.fromarray(stellar_alpha).filter(ImageFilter.GaussianBlur(0.25)))
    stellar.save(OUTPUT / "cxsmo-stellar-cargo-18.png", "PNG", optimize=True)
    print("Prepared remaining mask repair candidates")


if __name__ == "__main__":
    main()
