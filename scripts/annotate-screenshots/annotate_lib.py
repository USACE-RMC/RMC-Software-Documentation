"""
Shared annotation primitives for reviewer-workflow figures.

The chapter's figures use one style: USACE-blue highlight boxes around the
elements being called out, with numbered circles at one corner of each box.
The text legend mapping numbers to descriptions lives in the figure caption
(via the <Figure> component's caption prop), not on the image itself —
keeping image annotation uncluttered no matter how dense the page is.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ACCENT = (74, 124, 155, 255)        # USACE blue
ACCENT_DARK = (50, 90, 115, 255)
WHITE = (255, 255, 255, 255)
BOX_W = 4
CIRCLE_R = 18


def load_font(size: int) -> ImageFont.ImageFont:
    for path in ("C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_callout(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, corner: str, idx: int, font_circle: ImageFont.ImageFont) -> None:
    """
    Draw a highlight box around (x, y, w, h) and place a numbered circle at
    the chosen corner ("tl", "tr", "bl", or "br") so it half-overlaps the
    box edge.
    """
    draw.rectangle([x - 2, y - 2, x + w + 2, y + h + 2], outline=ACCENT, width=BOX_W)

    if corner == "tl":
        cx, cy = x - 2, y - 2
    elif corner == "tr":
        cx, cy = x + w + 2, y - 2
    elif corner == "bl":
        cx, cy = x - 2, y + h + 2
    else:
        cx, cy = x + w + 2, y + h + 2

    draw.ellipse(
        [cx - CIRCLE_R, cy - CIRCLE_R, cx + CIRCLE_R, cy + CIRCLE_R],
        fill=ACCENT, outline=WHITE, width=3,
    )
    text = str(idx)
    bb = draw.textbbox((0, 0), text, font=font_circle)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    draw.text((cx - tw // 2 - bb[0], cy - th // 2 - bb[1]), text, font=font_circle, fill=WHITE)


def mask_region(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, color: tuple = WHITE) -> None:
    """
    Paint over an arbitrary region. Used to hide GitHub UI detritus that
    leaked past the capture script's hygiene CSS (announcement toasts,
    "what's new" banners, etc.).
    """
    draw.rectangle([x, y, x + w, y + h], fill=color)


def annotate_and_crop(src: Path, callouts: list, crop: tuple, out: Path, masks: list = None) -> None:
    """
    callouts: list of (x, y, w, h, corner, idx)
    crop:     (left, top, right, bottom) bounding box on the source
    masks:    optional list of (x, y, w, h) regions to white-out before annotation
    """
    img = Image.open(src).convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw_mask = ImageDraw.Draw(img)
    draw_over = ImageDraw.Draw(overlay)
    font_circle = load_font(20)

    for region in masks or []:
        mask_region(draw_mask, *region)

    for (x, y, w, h, corner, idx) in callouts:
        draw_callout(draw_over, x, y, w, h, corner, idx, font_circle)

    composed = Image.alpha_composite(img, overlay).convert("RGB")
    cropped = composed.crop(crop)
    out.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({cropped.size[0]}x{cropped.size[1]})")
