"""
Annotated "Files changed tab" figure for the reviewer-workflow chapter.

The capture is taken with the diff filtered to the content commit (7ae2022)
only — the chapter teaches reviewers to navigate to this state so they're
not drowning in the 200+ scaffolding files from commit 85e53a4. The
figure shows the reviewer's actual working view, not the initial overwhelming
"All commits" view.

Source:
  planning/assets/captures/pr-files-changed.png  +  pr-files-changed.coords.json

Highlights:
  1. The Files changed tab indicator
  2. The commit selector — currently filtered to "Commit 7ae2022" (the
     content commit). Reviewers click here to narrow the diff.
  3. The file tree, narrowed to the 4 files this commit actually touches
     (preface, installation, gui, acronyms)
  4. The first file's diff (01-preface.mdx) — a real content edit, the
     kind of change the reviewer is here to evaluate
  5. The "Submit review" button — opens the finish-review dialog
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
PPTX = REPO_ROOT / "planning" / "assets" / "figure-pptx" / "fig-04-pr-files-changed.pptx"

# Crop to a useful window around the top of the Files changed page.
CROP = (20, 200, 1340, 900)

elements = json.loads(COORDS.read_text())["elements"]
filesChangedTab = elements["filesChangedTab"]
submitButton = elements["finishYourReviewButton"]
fileTree = elements["fileTree"]

# Hand-picked from the rendered screenshot. GitHub's Files toolbar uses
# sticky positioning so getBoundingClientRect for the toolbar buttons
# doesn't match the un-stuck rendered screenshot. Re-derive if GitHub
# reshuffles the layout.
commit_selector = (60, 305, 140, 28)         # "Commit 7ae2022 ▼" pill
first_file_header = (355, 580, 985, 55)      # ...01-preface.mdx file row

callouts = [
    (filesChangedTab["x"], filesChangedTab["y"], filesChangedTab["w"], filesChangedTab["h"], "tl", 1),
    (commit_selector[0], commit_selector[1], commit_selector[2], commit_selector[3], "tl", 2),
    (fileTree["x"], fileTree["y"], fileTree["w"], fileTree["h"], "tl", 3),
    (first_file_header[0], first_file_header[1], first_file_header[2], first_file_header[3], "tl", 4),
    (submitButton["x"], submitButton["y"], submitButton["w"], submitButton["h"], "tr", 5),
]

annotate_and_crop(SRC, callouts, CROP, OUT, pptx_out=PPTX)
