"""
Annotated "Files changed tab" figure for the reviewer-workflow chapter.

Source:
  planning/assets/captures/pr-files-changed.png  +  pr-files-changed.coords.json

Highlights:
  1. The Files changed tab itself, showing the absurd 219-file count that's
     a direct result of the scaffolding commit copying v1.0's 200 figures.
  2. The "All commits" dropdown — the key UI for narrowing the diff to a
     single commit so the scaffolding boilerplate doesn't drown the real
     edits.
  3. The file tree (left rail) — visual cue that there are many files.
  4. The first file's diff — what a new-file diff looks like (all green).
  5. The "Submit review" button — top-right, where a reviewer in the middle
     of a review goes to finish and submit.

A "Customizable line height" announcement toast leaked past the capture
script's hygiene CSS; it's masked over here before annotation.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from annotate_lib import annotate_and_crop  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "pr-files-changed.png"
COORDS = REPO_ROOT / "planning" / "assets" / "captures" / "pr-files-changed.coords.json"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-04-pr-files-changed.png"

# Crop to a useful window around the top of the Files changed page.
CROP = (20, 200, 1340, 900)

elements = json.loads(COORDS.read_text())["elements"]
filesChangedTab = elements["filesChangedTab"]
submitButton = elements["finishYourReviewButton"]

# Hand-picked from the capture image (the bulk capture script's selectors
# missed these). Re-derive if GitHub reshuffles the layout.
all_commits_dropdown = (175, 290, 130, 35)
file_tree = (35, 325, 280, 540)
first_file_header = (340, 325, 990, 55)

# White-out mask over the "Customizable line height" announcement popup.
masks = [
    (1085, 350, 280, 200),
]

callouts = [
    (filesChangedTab["x"], filesChangedTab["y"], filesChangedTab["w"], filesChangedTab["h"], "tl", 1),
    (all_commits_dropdown[0], all_commits_dropdown[1], all_commits_dropdown[2], all_commits_dropdown[3], "tl", 2),
    (file_tree[0], file_tree[1], file_tree[2], file_tree[3], "tl", 3),
    (first_file_header[0], first_file_header[1], first_file_header[2], first_file_header[3], "tl", 4),
    (submitButton["x"], submitButton["y"], submitButton["w"], submitButton["h"], "tr", 5),
]

annotate_and_crop(SRC, callouts, CROP, OUT, masks=masks)
