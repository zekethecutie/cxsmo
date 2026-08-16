from pathlib import Path
import sys

from PIL import Image

image = Image.open(Path(sys.argv[1])).convert("RGBA")
for coordinate in sys.argv[2:]:
    x, y = (int(value) for value in coordinate.split(","))
    print(f"{coordinate}\t{image.getpixel((x, y))}")
