"""
Annotated "preview page" figure for Section 4 of the reviewer-workflow
chapter — teaches the reviewer "this is what you read."

Source:
  planning/assets/captures/preview-page.png (PR #121 preview, TotalRisk
  Users Guide v1.1 preface page)

Highlights:
  1. Top site chrome — same look-and-feel as the production docs site
  2. Sidebar with the document's section navigation
  3. Breadcrumb showing where in the document you are
  4. Main article body — where you actually read the content
  5. The "Version 1.1" mention in the body that confirms you're on the
     in-review revision (no DRAFT watermark; watermark suppression on
     previews is intentional, see Section 4 prose)
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from annotate_lib import annotate_and_crop  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
SRC = REPO_ROOT / "planning" / "assets" / "captures" / "preview-page.png"
OUT = REPO_ROOT / "static" / "figures" / "dev" / "reviewer-workflow" / "fig-06-preview-page.png"
PPTX = REPO_ROOT / "planning" / "assets" / "figure-pptx" / "fig-06-preview-page.pptx"

# Use the full captured viewport, slightly cropped to remove margins.
CROP = (0, 0, 1440, 1000)

# Hand-picked from the rendered preview page (probe missed the sidebar
# because of how Docusaurus mounts it).
top_nav = (0, 0, 1440, 62)
sidebar = (5, 80, 290, 595)
breadcrumb = (310, 88, 600, 38)
article_body = (310, 240, 820, 320)
version_mention = (323, 442, 800, 30)   # the "Version 1.1 ..." paragraph

callouts = [
    (top_nav[0], top_nav[1], top_nav[2], top_nav[3], "bl", 1),
    (sidebar[0], sidebar[1], sidebar[2], sidebar[3], "tr", 2),
    (breadcrumb[0], breadcrumb[1], breadcrumb[2], breadcrumb[3], "tl", 3),
    (article_body[0], article_body[1], article_body[2], article_body[3], "tl", 4),
    (version_mention[0], version_mention[1], version_mention[2], version_mention[3], "tr", 5),
]

annotate_and_crop(SRC, callouts, CROP, OUT, pptx_out=PPTX)
