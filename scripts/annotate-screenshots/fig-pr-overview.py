"""
Annotation script for the reviewer-workflow chapter's "PR overview" figure.

Reads the bulk-captured logged-in screenshot of PR #121 (the reviewer-training
sandbox) and its coordinate sidecar, crops to the top region of the
Conversation tab, and overlays numbered callouts pointing at the five UI
elements a first-time reviewer needs to recognize when they land on the PR.

Input:
  planning/assets/captures/pr-overview.png
  planning/assets/captures/pr-overview.coords.json

Output:
  static/figures/dev/reviewer-workflow/fig-02-pr-overview.png

Re-run any time the capture is refreshed; this script is deterministic.
"""

import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "pr-overview.png"
COORDS = REPO_ROOT / "planning" / "assets" / "captures" / "pr-overview.coords.json"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-02-pr-overview.png"

# Crop to the top of the page — banner through just below the Reviewers sidebar.
CROP = (60, 90, 1340, 460)

# Each entry: (coord_key, circle_corner). circle_corner is which corner of
# the highlight box the numbered circle sits at — "tl", "tr", "bl", "br".
# Labels live in the figure caption, not on the image, so layout stays
# uncluttered no matter how dense the underlying page is.
CALLOUTS = [
    ("reviewRequestedBanner", "tl"),
    ("title", "tl"),
    ("tabs", "tl"),
    ("reviewersSidebar", "tl"),
    ("finishYourReviewButton", "tr"),
]

ACCENT = (74, 124, 155, 255)
ACCENT_DARK = (50, 90, 115, 255)
LABEL_BG = (255, 248, 220, 235)
LABEL_FG = (40, 40, 40, 255)
BOX_W = 4
CIRCLE_R = 18
PAD = 9


def load_font(size):
    for path in ("C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def place_callout(draw, x, y, w, h, corner, idx, font_circle):
    # Highlight box around the element
    draw.rectangle([x - 2, y - 2, x + w + 2, y + h + 2], outline=ACCENT, width=BOX_W)

    # Numbered circle at the chosen corner of the box, half on / half off so
    # it overlaps the box edge cleanly without obscuring content.
    if corner == "tl":
        cx, cy = x - 2, y - 2
    elif corner == "tr":
        cx, cy = x + w + 2, y - 2
    elif corner == "bl":
        cx, cy = x - 2, y + h + 2
    else:  # "br"
        cx, cy = x + w + 2, y + h + 2

    draw.ellipse(
        [cx - CIRCLE_R, cy - CIRCLE_R, cx + CIRCLE_R, cy + CIRCLE_R],
        fill=ACCENT, outline=(255, 255, 255, 255), width=3,
    )
    t = str(idx)
    bb = draw.textbbox((0, 0), t, font=font_circle)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    draw.text((cx - tw // 2 - bb[0], cy - th // 2 - bb[1]), t, font=font_circle, fill=(255, 255, 255, 255))


def main():
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}. Run scripts/capture/capture-pr-pages.mjs first.")
    if not COORDS.exists():
        raise SystemExit(f"Missing coords: {COORDS}.")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    coords_data = json.loads(COORDS.read_text())
    elements = coords_data["elements"]

    img = Image.open(SRC).convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    font_circle = load_font(20)

    for i, (key, corner) in enumerate(CALLOUTS, start=1):
        e = elements.get(key)
        if not e:
            print(f"  (skipped #{i} {key} — no coords)")
            continue
        place_callout(draw, e["x"], e["y"], e["w"], e["h"], corner, i, font_circle)

    composed = Image.alpha_composite(img, overlay).convert("RGB")
    cropped = composed.crop(CROP)
    cropped.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({cropped.size[0]}x{cropped.size[1]})")


if __name__ == "__main__":
    main()
