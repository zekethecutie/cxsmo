from pathlib import Path
import sys

import cv2
import numpy as np
from PIL import Image


def remove_green_field(source: Path, destination: Path) -> None:
    image = np.asarray(Image.open(source).convert("RGBA"))
    rgb = image[:, :, :3].astype(np.int16)
    red, green, blue = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    green_field = (green > 38) & (green > red * 1.15 + 12) & (green > blue * 1.15 + 12)
    foreground = (~green_field).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground, connectivity=8)
    if count <= 1:
        raise RuntimeError(f"Could not identify a foreground subject in {source.name}")
    subject_label = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    alpha = np.where(labels == subject_label, 255, 0).astype(np.uint8)
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, np.ones((3, 3), dtype=np.uint8))
    result = image.copy()
    result[:, :, 3] = alpha
    result[alpha == 0, :3] = 0
    Image.fromarray(result).save(destination)
    transparent_pixels = int(np.count_nonzero(alpha == 0))
    print(f"{source.name}: wrote {destination.name}; transparent pixels={transparent_pixels}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: chroma_key_cxsmo_assets.py <source.png> <destination.png>")
    remove_green_field(Path(sys.argv[1]), Path(sys.argv[2]))
