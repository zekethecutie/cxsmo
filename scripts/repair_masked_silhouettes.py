from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
SOURCES = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repair-sources")
OUTPUT = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repairs")
CANVAS = (1200, 1500)
SESSION = new_session("u2net")

TARGETS = {
    "star-beanie": "cxsmo-smart-cxsmo-catalogue-15-star-beanie.png",
    "bolt-raglan": "cxsmo-smart-cxsmo-catalogue-20-bolt-raglan.png",
    "star-spear-tank": "cxsmo-smart-cxsmo-catalogue-21-star-spear-tank.png",
    "chain-cargo-short": "cxsmo-smart-cxsmo-catalogue-29-chain-cargo-short.png",
    "midnight-star-sweatpant": "cxsmo-smart-cxsmo-catalogue-30-midnight-star-sweatpant.png",
    "midnight-cargo-pant": "cxsmo-smart-cxsmo-catalogue-32-midnight-cargo-skirt.png",
    "chrome-charm-bag": "cxsmo-smart-cxsmo-catalogue-37-chrome-charm-bag.png",
}


def centre_on_canvas(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    bounds = alpha.getbbox()
    if bounds is None:
        raise RuntimeError("No foreground subject was found")
    subject = image.crop(bounds)
    max_width, max_height = int(CANVAS[0] * 0.8), int(CANVAS[1] * 0.84)
    scale = min(max_width / subject.width, max_height / subject.height)
    subject = subject.resize(
        (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    canvas.alpha_composite(subject, ((CANVAS[0] - subject.width) // 2, (CANVAS[1] - subject.height) // 2))
    return canvas


def isolate(source: Path) -> Image.Image:
    with Image.open(source).convert("RGBA") as image:
        isolated = remove(image, session=SESSION, post_process_mask=True).convert("RGBA")
    alpha = isolated.getchannel("A").filter(ImageFilter.MedianFilter(3))
    isolated.putalpha(alpha)
    return centre_on_canvas(isolated)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source_name, target_name in TARGETS.items():
        repaired = isolate(SOURCES / f"{source_name}.png")
        repaired.save(OUTPUT / target_name, "PNG", optimize=True)
    print(f"Prepared {len(TARGETS)} repaired silhouettes in {OUTPUT}")


if __name__ == "__main__":
    main()
