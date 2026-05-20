"""
Annotation script for the reviewer-workflow chapter's "PR overview" figure.

Reads pr-120-fullpage.png (a full-page Playwright screenshot of the example PR
in its Conversation tab), crops it to the relevant region, and overlays
numbered callouts pointing at the four UI elements a first-time reviewer needs
to recognize:

  1. PR title and number
  2. Conversation / Files changed / Checks tabs
  3. Reviewers sidebar
  4. The "Preview deployed" bot comment

Output: static/figures/dev/reviewer-workflow/fig-02-pr-overview.png
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "pr-120-fullpage.png"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-02-pr-overview.png"

# Cropping bounds (left, top, right, bottom) — keep header + tabs + sidebar
# + the preview-deployed comment in frame, drop GitHub's outer chrome.
CROP = (80, 180, 1340, 1200)

# Annotation regions, all in the ORIGINAL (uncropped) coordinate space.
# Each is (x, y, w, h, label_text, label_anchor) where label_anchor is one of
# "right", "left", "below", "above" — controls which side of the box the
# numbered callout sits on.
ANNOTATIONS = [
    (112, 206, 936, 40, "PR title and number", "below"),
    (112, 302, 1108, 40, "Conversation / Files changed / Checks tabs", "below"),
    (1008, 359, 320, 48, "Reviewers sidebar (who's assigned to this PR)", "left"),
    (168, 1000, 808, 168, "\"Preview deployed\" bot — click the URL to read the document", "above"),
]

# Brand color (USACE blue from CLAUDE.md) for boxes and callout circles.
ACCENT = (74, 124, 155, 255)
ACCENT_DARK = (50, 90, 115, 255)
LABEL_BG = (255, 248, 220, 235)  # soft yellow with slight transparency
LABEL_FG = (40, 40, 40, 255)

BOX_WIDTH = 4
CIRCLE_RADIUS = 18
LABEL_PADDING = 8


def load_font(size):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_callout(draw, idx, box, label, anchor, font_circle, font_label, img_w):
    x, y, w, h = box
    # Draw the highlight box around the element.
    draw.rectangle(
        [x - 2, y - 2, x + w + 2, y + h + 2],
        outline=ACCENT,
        width=BOX_WIDTH,
    )

    # Decide where the numbered circle + label go relative to the box.
    if anchor == "right":
        cx, cy = x + w + 24, y + h // 2
    elif anchor == "left":
        cx, cy = x - 24, y + h // 2
    elif anchor == "below":
        cx, cy = x + 24, y + h + 24
    else:  # above
        cx, cy = x + 24, y - 24

    # Numbered circle.
    draw.ellipse(
        [cx - CIRCLE_RADIUS, cy - CIRCLE_RADIUS, cx + CIRCLE_RADIUS, cy + CIRCLE_RADIUS],
        fill=ACCENT,
        outline=ACCENT_DARK,
        width=2,
    )
    text = str(idx)
    bbox = draw.textbbox((0, 0), text, font=font_circle)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        (cx - tw // 2 - bbox[0], cy - th // 2 - bbox[1]),
        text,
        font=font_circle,
        fill=(255, 255, 255, 255),
    )

    # Label box, placed next to the numbered circle.
    label_x = cx + CIRCLE_RADIUS + 8
    label_y = cy
    if anchor == "left":
        # Label to the left of the circle.
        bbox = draw.textbbox((0, 0), label, font=font_label)
        text_w = bbox[2] - bbox[0]
        label_x = cx - CIRCLE_RADIUS - 8 - text_w - LABEL_PADDING * 2

    bbox = draw.textbbox((0, 0), label, font=font_label)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    rect = [
        label_x,
        label_y - text_h // 2 - LABEL_PADDING,
        label_x + text_w + LABEL_PADDING * 2,
        label_y + text_h // 2 + LABEL_PADDING,
    ]
    draw.rounded_rectangle(rect, radius=6, fill=LABEL_BG, outline=ACCENT_DARK, width=2)
    draw.text(
        (label_x + LABEL_PADDING - bbox[0], label_y - text_h // 2 - bbox[1]),
        label,
        font=font_label,
        fill=LABEL_FG,
    )


def main():
    if not SRC.exists():
        raise SystemExit(f"Missing source screenshot: {SRC}")
    OUT.parent.mkdir(parents=True, exist_ok=True)

    img = Image.open(SRC).convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    font_circle = load_font(20)
    font_label = load_font(16)

    for i, (x, y, w, h, label, anchor) in enumerate(ANNOTATIONS, start=1):
        draw_callout(draw, i, (x, y, w, h), label, anchor, font_circle, font_label, img.width)

    composed = Image.alpha_composite(img, overlay).convert("RGB")
    cropped = composed.crop(CROP)
    cropped.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({cropped.size[0]}x{cropped.size[1]})")


if __name__ == "__main__":
    main()
