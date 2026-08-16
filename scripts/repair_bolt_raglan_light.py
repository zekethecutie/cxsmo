from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove


SOURCE = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repair-sources/bolt-raglan.png")
OUTPUT = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repairs/cxsmo-smart-cxsmo-catalogue-20-bolt-raglan.png")
CANVAS = (1200, 1500)


def centre_on_canvas(image: Image.Image) -> Image.Image:
    bounds = image.getchannel("A").getbbox()
    if bounds is None:
        raise RuntimeError("No raglan foreground was detected")
    subject = image.crop(bounds)
    scale = min(960 / subject.width, 1240 / subject.height)
    subject = subject.resize((round(subject.width * scale), round(subject.height * scale)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    canvas.alpha_composite(subject, ((CANVAS[0] - subject.width) // 2, (CANVAS[1] - subject.height) // 2))
    return canvas


def main() -> None:
    session = new_session("u2netp")
    with Image.open(SOURCE).convert("RGBA") as source:
        isolated = remove(source, session=session, post_process_mask=True).convert("RGBA")
        sleeves = Image.new("RGBA", source.size, (0, 0, 0, 0))
        sleeve_mask = Image.new("L", source.size, 0)
        draw = ImageDraw.Draw(sleeve_mask)
        # Closely traced from the documented source crop: retains navy raglan sleeves and cuffs only.
        draw.polygon([(44, 1), (30, 12), (20, 47), (15, 92), (13, 132), (19, 167), (32, 207), (45, 236), (57, 218), (49, 180), (49, 140), (52, 98), (55, 55)], fill=255)
        draw.polygon([(248, 1), (266, 15), (277, 51), (283, 91), (285, 131), (279, 167), (266, 207), (253, 236), (242, 219), (247, 180), (246, 140), (243, 99), (239, 55)], fill=255)
        sleeves = source.copy()
        sleeves.putalpha(sleeve_mask.filter(ImageFilter.GaussianBlur(0.45)))
        isolated.alpha_composite(sleeves)
    alpha = isolated.getchannel("A").filter(ImageFilter.MedianFilter(3))
    isolated.putalpha(alpha)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    centre_on_canvas(isolated).save(OUTPUT, "PNG", optimize=True)
    print(f"Saved lightweight Bolt Raglan repair to {OUTPUT}")


if __name__ == "__main__":
    main()
