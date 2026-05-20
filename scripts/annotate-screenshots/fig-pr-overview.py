"""
Annotated "PR overview" figure for the reviewer-workflow chapter.

Source:
  planning/assets/captures/pr-overview.png
  planning/assets/captures/pr-overview.coords.json

Outputs:
  static/figures/dev/reviewer-workflow/fig-02-pr-overview.png
  planning/assets/figure-pptx/fig-02-pr-overview.pptx

Highlights:
  1. Review request banner
  2. PR title and number
  3. Tabs (Conversation / Commits / Checks / Files changed)
  4. Reviewers sidebar (showing the assigned reviewer)
  5. "Add your review" button
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from annotate_lib import annotate_and_crop  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "pr-overview.png"
COORDS = REPO_ROOT / "planning" / "assets" / "captures" / "pr-overview.coords.json"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-02-pr-overview.png"
PPTX = REPO_ROOT / "planning" / "assets" / "figure-pptx" / "fig-02-pr-overview.pptx"

CROP = (60, 90, 1340, 460)

elements = json.loads(COORDS.read_text())["elements"]


def el(key, corner, idx):
    e = elements[key]
    return (e["x"], e["y"], e["w"], e["h"], corner, idx)


callouts = [
    el("reviewRequestedBanner", "tl", 1),
    el("title", "tl", 2),
    el("tabs", "tl", 3),
    el("reviewersSidebar", "tl", 4),
    el("finishYourReviewButton", "tr", 5),
]

annotate_and_crop(SRC, callouts, CROP, OUT, pptx_out=PPTX)
