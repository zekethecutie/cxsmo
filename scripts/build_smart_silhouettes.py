from pathlib import Path

from PIL import Image
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "client" / "public" / "images"
STAGING = Path("/home/ubuntu/webdev-static-assets/cxsmo-smart-silhouettes")
CANVAS = (1200, 1500)
SESSION = new_session("u2net")


def compose_subject(source: Path, target: Path) -> None:
    """Remove the source sheet background, then retain a centred, padded RGBA subject."""
    with Image.open(source).convert("RGBA") as image:
        isolated = remove(image, session=SESSION, post_process_mask=True).convert("RGBA")
        alpha = isolated.getchannel("A")
        bounds = alpha.getbbox()
        if bounds is None:
            raise RuntimeError(f"No foreground subject detected in {source.name}")

        subject = isolated.crop(bounds)
        max_width = int(CANVAS[0] * 0.82)
        max_height = int(CANVAS[1] * 0.88)
        scale = min(max_width / subject.width, max_height / subject.height)
        resized = subject.resize((max(1, round(subject.width * scale)), max(1, round(subject.height * scale))), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
        offset = ((CANVAS[0] - resized.width) // 2, (CANVAS[1] - resized.height) // 2)
        canvas.alpha_composite(resized, offset)
        canvas.save(target, "PNG", optimize=True)


def main() -> None:
    STAGING.mkdir(parents=True, exist_ok=True)
    inputs = sorted(PUBLIC.glob("cxsmo-catalogue-*.png"))
    if not inputs:
        raise RuntimeError("No numbered catalogue crop inputs found.")
    for source in inputs:
        compose_subject(source, STAGING / source.name)
    print(f"Prepared {len(inputs)} smart product silhouettes in {STAGING}")


if __name__ == "__main__":
    main()
