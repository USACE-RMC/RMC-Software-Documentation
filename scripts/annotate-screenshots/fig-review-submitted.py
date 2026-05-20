"""
Annotated "review submitted" figure for Section 8 of the reviewer-workflow
chapter — what the reviewer sees on the Conversation tab right after
clicking Submit review.

Source:
  planning/assets/captures/conversation-post-submit.png
  planning/assets/captures/post-submit.coords.json

Highlights:
  1. The "rmctestreviewer reviewed now" timeline event header
  2. "View reviewed changes" link — jumps to a Files-changed view that
     shows only what was reviewed
  3. The review comment card showing the overall body the reviewer typed
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from annotate_lib import annotate_and_crop  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "conversation-post-submit.png"
COORDS = REPO_ROOT / "planning" / "assets" / "captures" / "post-submit.coords.json"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-09-review-submitted.png"
PPTX = REPO_ROOT / "planning" / "assets" / "figure-pptx" / "fig-09-review-submitted.pptx"

elements = json.loads(COORDS.read_text())["elements"]
view_link = elements["viewLink"]            # (832, 2553, 145, 28)
reviewed_row = elements["reviewedHeader"]   # (184, 2532, 792, 65) — full row

# Tighten box 1 to just the "rmctestreviewer reviewed now" text on the left.
reviewed_text = (reviewed_row["x"], reviewed_row["y"] + 18, 340, 30)
# Comment card sits just below the event row (probe didn't find it cleanly).
comment_card = (168, reviewed_row["y"] + 75, 808, 170)

# Crop with a little context above and below.
top = reviewed_row["y"] - 50
bottom = comment_card[1] + comment_card[3] + 50
CROP = (60, top, 1340, bottom)

callouts = [
    (reviewed_text[0], reviewed_text[1], reviewed_text[2], reviewed_text[3], "tl", 1),
    (view_link["x"], view_link["y"], view_link["w"], view_link["h"], "tr", 2),
    (comment_card[0], comment_card[1], comment_card[2], comment_card[3], "tl", 3),
]

annotate_and_crop(SRC, callouts, CROP, OUT, pptx_out=PPTX)
