from pathlib import Path
from PIL import Image

ROOT = Path("/home/ubuntu/webdev-static-assets/cxsmo-fit-library")
OUT = ROOT / "individual"
OUT.mkdir(parents=True, exist_ok=True)

def crop_series(source_name: str, crops: list[tuple[str, tuple[int, int, int, int]]]) -> None:
    image = Image.open(ROOT / source_name)
    for label, box in crops:
        image.crop(box).save(OUT / f"{label}.png", "PNG")

crop_series("cxsmo-fit-mens-lineup.png", [
    ("cxsmo-fit-men-01-splitline-rugby", (0, 0, 334, 941)),
    ("cxsmo-fit-men-02-orbit-ash", (320, 0, 675, 941)),
    ("cxsmo-fit-men-03-micro-orbit", (650, 0, 1020, 941)),
    ("cxsmo-fit-men-04-nightstar-hood", (1000, 0, 1360, 941)),
    ("cxsmo-fit-men-05-chainline-self", (1330, 0, 1672, 941)),
])

crop_series("cxsmo-fit-womens-sheet.png", [
    ("cxsmo-fit-women-01-asym-star", (0, 0, 205, 790)),
    ("cxsmo-fit-women-02-cloud-cargo", (196, 0, 410, 790)),
    ("cxsmo-fit-women-03-lunar-corset", (400, 0, 615, 790)),
    ("cxsmo-fit-women-04-static-raglan", (605, 0, 820, 790)),
    ("cxsmo-fit-women-05-soft-chrome", (810, 0, 1024, 790)),
    ("cxsmo-fit-women-06-night-shrug", (0, 720, 205, 1536)),
    ("cxsmo-fit-women-07-blue-orbit", (196, 720, 410, 1536)),
    ("cxsmo-fit-women-08-starline-mini", (400, 720, 615, 1536)),
    ("cxsmo-fit-women-09-cloud-sweater", (605, 720, 820, 1536)),
    ("cxsmo-fit-women-10-after-dark", (810, 720, 1024, 1536)),
])
