"""
Annotated "Finish your review" dialog for the reviewer-workflow chapter.

Source:
  planning/assets/captures/finish-review.png
  planning/assets/captures/finish-review.coords.json

Highlights:
  1. Dialog title
  2. Overall-feedback text area
  3. Comment radio (the default, used every round that has notes)
  4. Approve radio (advances the stage when chosen by the assigned reviewer)
  5. Request changes radio (the option this workflow never uses)
  6. Submit review button
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from annotate_lib import annotate_and_crop  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "finish-review.png"
COORDS = REPO_ROOT / "planning" / "assets" / "captures" / "finish-review.coords.json"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-08-finish-review.png"

# Crop around the dialog. The dialog spans roughly (635, 300) → (1255, 815).
# Add some surrounding context so it's clear the dialog overlays the PR page.
CROP = (530, 240, 1340, 870)

elements = json.loads(COORDS.read_text())["elements"]

# Hand-picked coords for the title (probe came back null) and the dialog's
# Submit review button (the JSON's submitButton is the upper-right one that
# OPENS the dialog, not the one inside it).
dialog_title = (657, 318, 145, 28)
text_area = (656, 378, 590, 175)
dialog_submit = (1098, 770, 152, 36)

callouts = [
    (dialog_title[0], dialog_title[1], dialog_title[2], dialog_title[3], "tl", 1),
    (text_area[0], text_area[1], text_area[2], text_area[3], "tl", 2),
    (elements["commentRadio"]["x"], elements["commentRadio"]["y"], elements["commentRadio"]["w"], elements["commentRadio"]["h"], "tl", 3),
    (elements["approveRadio"]["x"], elements["approveRadio"]["y"], elements["approveRadio"]["w"], elements["approveRadio"]["h"], "tl", 4),
    (elements["requestChangesRadio"]["x"], elements["requestChangesRadio"]["y"], elements["requestChangesRadio"]["w"], elements["requestChangesRadio"]["h"], "tl", 5),
    (dialog_submit[0], dialog_submit[1], dialog_submit[2], dialog_submit[3], "tr", 6),
]

annotate_and_crop(SRC, callouts, CROP, OUT)
