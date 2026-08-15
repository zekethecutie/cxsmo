from pathlib import Path
from PIL import Image

SOURCE = Path("/home/ubuntu/upload")
OUT = Path("/home/ubuntu/webdev-static-assets/cxsmo-fit-library") / "individual-v2"
OUT.mkdir(parents=True, exist_ok=True)

def crop_series(source_name: str, crops: list[tuple[str, tuple[int, int, int, int]]]) -> None:
    image = Image.open(SOURCE / source_name)
    for label, box in crops:
        image.crop(box).save(OUT / f"{label}.png", "PNG")

crop_series("ChatGPTImageAug15,2026,06_28_01PM.png", [
    ("cxsmo-fit-men-01-splitline-rugby", (24, 0, 306, 941)),
    ("cxsmo-fit-men-02-orbit-ash", (347, 0, 650, 941)),
    ("cxsmo-fit-men-03-micro-orbit", (682, 0, 981, 941)),
    ("cxsmo-fit-men-04-nightstar-hood", (1019, 0, 1302, 941)),
    ("cxsmo-fit-men-05-chainline-self", (1372, 0, 1632, 941)),
])

crop_series("ChatGPTImageAug15,2026,06_30_54PM.png", [
    ("cxsmo-fit-women-01-asym-star", (16, 0, 184, 790)),
    ("cxsmo-fit-women-02-cloud-cargo", (200, 0, 389, 790)),
    ("cxsmo-fit-women-03-lunar-corset", (409, 0, 600, 790)),
    ("cxsmo-fit-women-04-static-raglan", (619, 0, 812, 790)),
    ("cxsmo-fit-women-05-soft-chrome", (829, 0, 1012, 790)),
    ("cxsmo-fit-women-06-night-shrug", (16, 738, 184, 1525)),
    ("cxsmo-fit-women-07-blue-orbit", (200, 738, 389, 1525)),
    ("cxsmo-fit-women-08-starline-mini", (409, 738, 600, 1525)),
    ("cxsmo-fit-women-09-cloud-sweater", (619, 738, 812, 1525)),
    ("cxsmo-fit-women-10-after-dark", (829, 738, 1012, 1525)),
])
