import os
from docx import Document
from utils.helpers import (
    load_citation_map,
    clear_output_directories,
    should_reset_figures,
    confirmation_function,
)
from utils.figures import extract_figure_images
from utils.docx_processor import process_docx
from utils.mdx_writer import write_mdx_files

# ==================== USER CONFIGURATION ====================
# Configure these variables before running the converter

# ---- Environment Setting ----
# Set to "development" for testing (outputs to temporary location)
# Set to "production" for final conversion (outputs directly to docs/ and static/)
environment = "development"  # ALWAYS start with "development" to test first!

# ---- Figure Path Configuration ----
# FIGSRC: File path used in <Figure> component src attributes in the generated MDX files.
# This path will have figure filenames appended (e.g., "/figures/path/to/figure-1.png").
# Must use forward slashes "/" and match the final location in static/figures/.
# Example: "figures/desktop-applications/your-software/users-guide/v1.0"
FIGSRC = r"figures/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0"

# ---- Navigation Component Configuration ----
# These variables configure the NavContainer component shown at the top of each MDX page.
# NAVLINK: The URL destination when users click the back arrow (e.g., "../" or "/path/to/parent")
# NAVTITLE: The display text shown in the navigation link (e.g., "User's Guide")
# NAVDOC: Document identifier used to fetch available versions from versionList.json
#         (e.g., "desktop-applications/your-software/users-guide")
NAVLINK = r"/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life"
NAVTITLE = "Internal Erosion Suite"
NAVDOC = r"toolbox-technical-manuals/internal-erosion-suite/pipe-service-life"

# ---- File Path Configuration ----
# Set these paths for both development and production environments.

if environment == "production":
    # PRODUCTION ENVIRONMENT - outputs directly to final locations
    # DOCX_PATH: Full path to the source Word document
    DOCX_PATH = r"C:\Technical Documents\RMC-CPD-2023-11 - RMC Pipe Service Life Toolbox.docx"

    # BIB_PATH: Full path to the bib.json bibliography file
    BIB_PATH = r"C:\Git\RMC-Software-Documentation\static\bibliographies\toolbox-technical-manuals\internal-erosion-suite\pipe-service-life\v1.0\bib.json"

    # FIGURES_DIR: Directory where extracted figures will be saved
    FIGURES_DIR = r"C:\Git\RMC-Software-Documentation\static\figures\toolbox-technical-manuals\internal-erosion-suite\pipe-service-life\v1.0"

    # MDX_DIR: Directory where generated MDX files will be saved
    MDX_DIR = r"C:\Git\RMC-Software-Documentation\docs\toolbox-technical-manuals\internal-erosion-suite\pipe-service-life\v1.0"

else:
    # DEVELOPMENT ENVIRONMENT - outputs to temporary location for testing
    # DOCX_PATH: Full path to the source Word document (typically same as production)
    DOCX_PATH = r"C:\Technical Documents\RMC-CPD-2023-11 - RMC Pipe Service Life Toolbox.docx"

    # BIB_PATH: Full path to the bib.json bibliography file (typically same as production)
    BIB_PATH = r"C:\Git\RMC-Software-Documentation\static\bibliographies\toolbox-technical-manuals\internal-erosion-suite\pipe-service-life\v1.0\bib.json"

    # FIGURES_DIR: Temporary directory for testing extracted figures
    FIGURES_DIR = r"C:\Technical Documents\MDX Conversions\Pipe Service Life\Figures"

    # MDX_DIR: Temporary directory for testing generated MDX files
    MDX_DIR = r"C:\Technical Documents\MDX Conversions\Pipe Service Life\MDX"

# ---- Constants ----
DOCX_PATH = DOCX_PATH
BIB_PATH = BIB_PATH
FIGURES_DIR = FIGURES_DIR
MDX_DIR = MDX_DIR
FIGSRC = FIGSRC
NAVLINK = NAVLINK
NAVTITLE = NAVTITLE
NAVDOC = NAVDOC

FIGURES_DIR_FIGURES = os.path.join(FIGURES_DIR, "figures")
FIGURES_DIR_INLINE = os.path.join(FIGURES_DIR, "inline-images")

# ---- Path checks ----
if not os.path.isfile(DOCX_PATH):
    raise FileNotFoundError(f"Missing DOCX: {DOCX_PATH}")
if not os.path.isfile(BIB_PATH):
    raise FileNotFoundError(f"Missing bib: {BIB_PATH}")
os.makedirs(FIGURES_DIR, exist_ok=True)
os.makedirs(MDX_DIR, exist_ok=True)


# ---- Main logic ----
def main():
    confirmation_function()
    reset_figures = should_reset_figures()
    clear_output_directories(
        {
            FIGURES_DIR_FIGURES: reset_figures,
            FIGURES_DIR_INLINE: reset_figures,
            MDX_DIR: True,  # Always reset MDX directory
        }
    )
    inline_image_info = extract_figure_images(DOCX_PATH, FIGURES_DIR, extract_figures=reset_figures)
    citation_map = load_citation_map(BIB_PATH)
    doc = Document(DOCX_PATH)
    sections, figures, tables = process_docx(doc, citation_map, FIGSRC, inline_image_info)
    write_mdx_files(sections, MDX_DIR, NAVLINK, NAVTITLE, NAVDOC)


if __name__ == "__main__":
    main()
