from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
UPLOAD = Path('/home/ubuntu/upload')
PUBLIC = ROOT / 'client' / 'public' / 'images'

sheet_09_16 = UPLOAD / 'ChatGPTImageAug16,2026,04_38_29PM.png'
sheet_17_36 = UPLOAD / 'ChatGPTImageAug16,2026,04_43_05PM(2).png'
studio_campaign = UPLOAD / 'ChatGPTImageAug16,2026,04_56_39PM.png'
fit_album = UPLOAD / 'ChatGPTImageAug16,2026,04_45_51PM.png'
mens_fit_album = UPLOAD / 'ChatGPTImageAug16,2026,05_03_34PM.png'

crop_specs = [
    (sheet_09_16, 'cxsmo-catalogue-09-core-tee.png', (32, 36, 426, 488)),
    (sheet_09_16, 'cxsmo-catalogue-10-starburst-knit.png', (420, 36, 854, 508)),
    (sheet_09_16, 'cxsmo-catalogue-11-vector-cargo.png', (858, 18, 1220, 640)),
    (sheet_09_16, 'cxsmo-catalogue-12-wash-cargo.png', (1214, 18, 1536, 690)),
    (sheet_09_16, 'cxsmo-catalogue-13-utility-puddle.png', (38, 468, 422, 1024)),
    (sheet_09_16, 'cxsmo-catalogue-14-race-crew.png', (412, 510, 872, 1024)),
    (sheet_09_16, 'cxsmo-catalogue-15-star-beanie.png', (866, 614, 1188, 842)),
    (sheet_09_16, 'cxsmo-catalogue-16-orbit-buckle-belt.png', (804, 810, 1536, 1024)),
    (sheet_17_36, 'cxsmo-catalogue-20-bolt-raglan.png', (18, 12, 314, 316)),
    (sheet_17_36, 'cxsmo-catalogue-21-star-spear-tank.png', (308, 12, 570, 318)),
    (sheet_17_36, 'cxsmo-catalogue-22-lace-corset.png', (556, 12, 824, 318)),
    (sheet_17_36, 'cxsmo-catalogue-23-leather-zip-vest.png', (800, 12, 1074, 318)),
    (sheet_17_36, 'cxsmo-catalogue-24-star-ruched-top.png', (1046, 12, 1324, 330)),
    (sheet_17_36, 'cxsmo-catalogue-25-web-tie-tank.png', (1296, 12, 1536, 336)),
    (sheet_17_36, 'cxsmo-catalogue-26-pleated-belt-skirt.png', (12, 326, 270, 590)),
    (sheet_17_36, 'cxsmo-catalogue-27-lace-tiered-skirt.png', (238, 320, 496, 602)),
    (sheet_17_36, 'cxsmo-catalogue-28-stud-cargo-short.png', (450, 320, 732, 604)),
    (sheet_17_36, 'cxsmo-catalogue-29-chain-cargo-short.png', (700, 320, 980, 606)),
    (sheet_17_36, 'cxsmo-catalogue-30-midnight-star-sweatpant.png', (928, 314, 1218, 790)),
    (sheet_17_36, 'cxsmo-catalogue-31-starfade-puddle-jean.png', (1140, 314, 1376, 790)),
    (sheet_17_36, 'cxsmo-catalogue-32-midnight-cargo-skirt.png', (1306, 314, 1536, 778)),
    (sheet_17_36, 'cxsmo-catalogue-33-halo-pile-hoodie.png', (12, 592, 286, 1024)),
    (sheet_17_36, 'cxsmo-catalogue-34-frost-logo-hoodie.png', (228, 592, 538, 1024)),
    (sheet_17_36, 'cxsmo-catalogue-35-buckle-stack-boot.png', (504, 618, 750, 1024)),
    (sheet_17_36, 'cxsmo-catalogue-36-cloud-legwarmer.png', (704, 640, 956, 1024)),
    (sheet_17_36, 'cxsmo-catalogue-37-chrome-charm-bag.png', (892, 762, 1165, 1024)),
    (sheet_17_36, 'cxsmo-catalogue-38-mercury-headphones.png', (1110, 762, 1364, 1024)),
    (sheet_17_36, 'cxsmo-catalogue-39-lunar-visor.png', (1300, 772, 1536, 1024)),
]


def export_crop(source: Path, output_name: str, box: tuple[int, int, int, int]) -> None:
    with Image.open(source) as image:
        image.crop(box).save(PUBLIC / output_name, format='PNG', optimize=True)


def copy_full(source: Path, output_name: str) -> None:
    with Image.open(source) as image:
        image.save(PUBLIC / output_name, format='PNG', optimize=True)


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    for source, output_name, box in crop_specs:
        export_crop(source, output_name, box)
    copy_full(studio_campaign, 'cxsmo-fit-edits-studio-campaign.png')
    copy_full(fit_album, 'cxsmo-fit-edits-album-01.png')
    export_crop(fit_album, 'cxsmo-fit-edits-album-top.png', (0, 0, 1024, 760))
    export_crop(fit_album, 'cxsmo-fit-edits-album-bottom.png', (0, 735, 1024, 1536))
    copy_full(mens_fit_album, 'cxsmo-fit-edits-mens-album-02.png')
    mens_crops = [
        ('cxsmo-fit-men-06-overshirt.png', (42, 0, 308, 512)),
        ('cxsmo-fit-men-07-white-hood.png', (296, 0, 616, 512)),
        ('cxsmo-fit-men-08-star-tank.png', (598, 0, 926, 512)),
        ('cxsmo-fit-men-09-washed-hood.png', (900, 0, 1234, 512)),
        ('cxsmo-fit-men-10-contrast-track.png', (1216, 0, 1536, 512)),
        ('cxsmo-fit-men-11-flame-sleeve.png', (42, 500, 308, 1024)),
        ('cxsmo-fit-men-12-washed-knit.png', (290, 500, 618, 1024)),
        ('cxsmo-fit-men-13-layered-hood.png', (594, 500, 930, 1024)),
        ('cxsmo-fit-men-14-charcoal-cargo.png', (898, 500, 1232, 1024)),
        ('cxsmo-fit-men-15-moto-layer.png', (1208, 500, 1536, 1024)),
    ]
    for output_name, box in mens_crops:
        export_crop(mens_fit_album, output_name, box)
    print(f'Prepared {len(crop_specs) + 15} C✦SMO public assets in {PUBLIC}')


if __name__ == '__main__':
    main()
