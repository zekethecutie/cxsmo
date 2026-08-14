from pathlib import Path
from PIL import Image

assets = [
    "cxsmo-gravity-jean-v3.png",
    "cxsmo-orbit-tee-v3.png",
    "cxsmo-starlight-shell-v3.png",
    "cxsmo-signal-overshirt-v3.png",
    "cxsmo-key-charm-v2.png",
    "cxsmo-tread-sneaker-v2.png",
    "cxsmo-static-lip-glaze-v2.png",
    "cxsmo-transit-bag-v2.png",
]

root = Path("/home/ubuntu/webdev-static-assets")
for name in assets:
    image = Image.open(root / name).convert("RGBA")
    alpha = image.getchannel("A")
    extrema = alpha.getextrema()
    transparent_pixels = sum(1 for value in alpha.getdata() if value == 0)
    print(f"{name}: alpha={extrema}; transparent_pixels={transparent_pixels}")
