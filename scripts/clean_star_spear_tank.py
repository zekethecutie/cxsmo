from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "client" / "public" / "images" / "cxsmo-clean-star-tank-03.png"
TARGET = Path("/home/ubuntu/webdev-static-assets/cxsmo-mask-repairs/cxsmo-smart-cxsmo-catalogue-21-star-spear-tank.png")


def main() -> None:
    with Image.open(SOURCE).convert("RGBA") as image:
        pixels = image.load()
        for y in range(image.height):
            for x in range(image.width):
                red, green, blue, alpha = pixels[x, y]
                # Only remove the bright chroma-key residue around the isolated object.
                if green > 95 and green > red * 1.22 and green > blue * 1.18:
                    pixels[x, y] = (red, green, blue, 0)
        alpha = image.getchannel("A").filter(ImageFilter.MedianFilter(3))
        image.putalpha(alpha)
        image.resize((1200, 1500), Image.Resampling.LANCZOS).save(TARGET, "PNG", optimize=True)
    print(f"Prepared {TARGET}")


if __name__ == "__main__":
    main()
