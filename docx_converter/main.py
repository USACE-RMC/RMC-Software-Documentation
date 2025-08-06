import os
from docx import Document
from utils.helpers import load_citation_map, clear_output_directories, should_reset_figures, confirmation_function
from utils.figures import extract_figure_images
from utils.docx_processor import process_docx
from utils.mdx_writer import write_mdx_files

# ---- User configuration ----

# Set the environment to "production" or "development"
environment = "development"  # Change to "production" for production environment

# Assign the file path for figures
FIGSRC = r"figures/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0"

# Assign the navigation link, title, and document for the NavContainer component
NAVLINK = r"/toolboxes/seismic-hazard-suite"
NAVTITLE = "Seismic Hazard Suite" 
NAVDOC = r"/toolbox-technical-manuals/seismic-hazard-suite/site-classification"

# Define paths based on the environment
if environment == "production":
    DOCX_PATH = r"C:\Users\USACE\OneDrive\RMC CPDs\RMC-CPD-2023-01 - RMC Site Classification Toolbox.docx"
    BIB_PATH = r"C:\Users\USACE\OneDrive\Documents\GitHub\RMC-Software-Documentation\static\bibliographies\toolbox-technical-manuals\seismic-hazard-suite\site-classification\v1.0\bib.json"
    FIGURES_DIR = r"C:\Users\USACE\OneDrive\Documents\GitHub\RMC-Software-Documentation\static\figures\toolbox-technical-manuals\seismic-hazard-suite\site-classification\v1.0"
    MDX_DIR = r"C:\Users\USACE\OneDrive\Documents\GitHub\RMC-Software-Documentation\docs\toolbox-technical-manuals\seismic-hazard-suite\site-classification\v1.0"
else:
    # Development paths
    DOCX_PATH = r"D:\Reference Materials\Technical References\RMC Documents\Computer Program Documents\RMC-CPD-2023-01 - RMC Site Classification Toolbox.docx"
    BIB_PATH = r"C:\Users\q0rmcacg\OneDrive - US Army Corps of Engineers\Documents\GitHub\RMC-Software-Documentation\static\bibliographies\toolbox-technical-manuals\seismic-hazard-suite\site-classification\v1.0\bib.json"
    FIGURES_DIR = r"D:\Reference Materials\Technical References\RMC Documents\Computer Program Documents\MDX Conversions\Site Classification\Figures"
    MDX_DIR = r"D:\Reference Materials\Technical References\RMC Documents\Computer Program Documents\MDX Conversions\Site Classification\MDX"

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
    clear_output_directories({
        FIGURES_DIR_FIGURES: reset_figures,
        FIGURES_DIR_INLINE: reset_figures,
        MDX_DIR: True # Always reset MDX directory
    })
    inline_image_info = extract_figure_images(DOCX_PATH, FIGURES_DIR, extract_figures=reset_figures)
    citation_map = load_citation_map(BIB_PATH)
    doc = Document(DOCX_PATH)
    sections, figures, tables = process_docx(doc, citation_map, FIGSRC, inline_image_info)
    write_mdx_files(sections, MDX_DIR, NAVLINK, NAVTITLE, NAVDOC)

if __name__ == "__main__":
    main()