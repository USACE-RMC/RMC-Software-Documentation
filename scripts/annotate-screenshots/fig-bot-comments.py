"""
Annotated "PR bot comments" figure for the reviewer-workflow chapter.

Teaches reviewers to recognize the three automated comments that show up
on every PR. Together they tell the reviewer everything they need without
clicking around:
  1. Assigned reviewers state — who's responsible for the current stage
  2. Stage progression — which lane this PR is in, what review is needed
  3. Preview deployed — the URL to read the rendered document on

Source:
  planning/assets/captures/pr-overview.png   (full-page capture)
  planning/assets/captures/pr-overview.coords.json
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from annotate_lib import annotate_and_crop  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "pr-overview.png"
COORDS = REPO_ROOT / "planning" / "assets" / "captures" / "pr-overview.coords.json"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-05-bot-comments.png"
PPTX = REPO_ROOT / "planning" / "assets" / "figure-pptx" / "fig-05-bot-comments.pptx"

elements = json.loads(COORDS.read_text())["elements"]
assigned = elements["assignedReviewers"]
stage = elements["stageProgression"]
preview = elements["previewDeployed"]

# Crop to span all three bot comments with a little context above and below.
top = min(assigned["y"], stage["y"], preview["y"]) - 50
bottom = max(assigned["y"] + assigned["h"], stage["y"] + stage["h"], preview["y"] + preview["h"]) + 60
CROP = (80, top, 1340, bottom)

callouts = [
    (assigned["x"], assigned["y"], assigned["w"], assigned["h"], "tl", 1),
    (stage["x"], stage["y"], stage["w"], stage["h"], "tl", 2),
    (preview["x"], preview["y"], preview["w"], preview["h"], "tl", 3),
]

annotate_and_crop(SRC, callouts, CROP, OUT, pptx_out=PPTX)
