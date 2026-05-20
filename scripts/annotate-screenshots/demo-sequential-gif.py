"""
Demo: sequential-reveal GIF that highlights one callout at a time on the PR
overview figure. Produces gif-demo-sequential.gif in the figures folder.

This is a capability check for the reviewer-workflow chapter — it tests
whether a "stepped" GIF (built from N still frames with Pillow, no video
toolchain required) is good enough to teach UI mechanics.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "pr-120-fullpage.png"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "gif-demo-sequential.gif"

CROP = (80, 180, 1340, 1200)

CALLOUTS = [
    (112, 206, 936, 40, "1. PR title and number", "below"),
    (112, 302, 1108, 40, "2. Conversation / Files changed / Checks tabs", "below"),
    (1008, 359, 320, 48, "3. Reviewers sidebar", "left"),
    (168, 1000, 808, 168, "4. \"Preview deployed\" bot — click the URL", "above"),
]

ACCENT = (74, 124, 155, 255)
ACCENT_DARK = (50, 90, 115, 255)
LABEL_BG = (255, 248, 220, 235)
LABEL_FG = (40, 40, 40, 255)
DIM = (255, 255, 255, 0)  # no dimming for now — keep frames legible


def load_font(size):
    for path in ("C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def render_frame(base_img, active_idx, font_label):
    overlay = Image.new("RGBA", base_img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x, y, w, h, label, anchor = CALLOUTS[active_idx]

    # Highlight box
    draw.rectangle([x - 3, y - 3, x + w + 3, y + h + 3], outline=ACCENT, width=5)

    # Label placement
    if anchor == "right":
        anchor_x, anchor_y = x + w + 20, y + h // 2
    elif anchor == "left":
        anchor_x, anchor_y = x - 20, y + h // 2
    elif anchor == "below":
        anchor_x, anchor_y = x + 24, y + h + 30
    else:
        anchor_x, anchor_y = x + 24, y - 30

    bbox = draw.textbbox((0, 0), label, font=font_label)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    pad = 10

    if anchor == "left":
        rect_left = anchor_x - text_w - pad * 2
        rect_top = anchor_y - text_h // 2 - pad
    else:
        rect_left = anchor_x
        rect_top = anchor_y - text_h // 2 - pad

    rect = [rect_left, rect_top, rect_left + text_w + pad * 2, rect_top + text_h + pad * 2]
    draw.rounded_rectangle(rect, radius=8, fill=LABEL_BG, outline=ACCENT_DARK, width=2)
    draw.text((rect_left + pad - bbox[0], rect_top + pad - bbox[1]), label, font=font_label, fill=LABEL_FG)

    composed = Image.alpha_composite(base_img, overlay).convert("RGB")
    return composed.crop(CROP)


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    base = Image.open(SRC).convert("RGBA")
    font = load_font(18)

    frames = [render_frame(base, i, font) for i in range(len(CALLOUTS))]
    # Hold each frame 1.6s; loop forever.
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=1600,
        loop=0,
        optimize=True,
    )
    print(f"Wrote {OUT} — {len(frames)} frames, {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
