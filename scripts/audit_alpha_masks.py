from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "client" / "public" / "images"


def main() -> None:
    for path in sorted(PUBLIC.glob("cxsmo-catalogue-*.png")):
        with Image.open(path).convert("RGBA") as image:
            alpha = image.getchannel("A")
            nonzero = sum(1 for value in alpha.getdata() if value > 12)
            coverage = nonzero / (image.width * image.height)
            print(f"{path.name}\t{coverage:.4f}\t{alpha.getbbox()}")


if __name__ == "__main__":
    main()
