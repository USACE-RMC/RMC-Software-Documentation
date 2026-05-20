"""
Annotated "PR Commits tab" figure for the reviewer-workflow chapter.

Source:
  planning/assets/captures/pr-commits.png  +  pr-commits.coords.json

Highlights:
  1. The Commits tab itself (where we are)
  2. The scaffolding commit — skip this one
  3. The content commit — focus your review here
  4. The SHA link on the content commit (how to view its diff in isolation)

The legend mapping numbers to descriptions belongs in the figure caption.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from annotate_lib import annotate_and_crop  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "pr-commits.png"
COORDS = REPO_ROOT / "planning" / "assets" / "captures" / "pr-commits.coords.json"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-03-pr-commits.png"

CROP = (60, 100, 1340, 500)

elements = json.loads(COORDS.read_text())["elements"]
commitsTab = elements["commitsTab"]
scaffold = elements["scaffoldingCommit"]
content = elements["contentCommit"]

# The SHA link is at the right edge of each commit row. Pin it to the right
# end of the content commit row.
sha_x = content["x"] + content["w"] - 200
sha_y = content["y"] + 18
sha = (sha_x, sha_y, 60, 22)

callouts = [
    (commitsTab["x"], commitsTab["y"], commitsTab["w"], commitsTab["h"], "tl", 1),
    (scaffold["x"], scaffold["y"], scaffold["w"], scaffold["h"], "tl", 2),
    (content["x"], content["y"], content["w"], content["h"], "tl", 3),
    (sha[0], sha[1], sha[2], sha[3], "tr", 4),
]

annotate_and_crop(SRC, callouts, CROP, OUT)
