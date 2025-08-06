# DOCX to MDX Modular Converter

This project converts Microsoft Word (`.docx`) technical documents into modular MDX files for use with Docusaurus or other React-based documentation systems.  
It extracts figures, tables, equations, citations, and section structure, and outputs clean, component-rich MDX files.

---

## Features

- **Modular Python codebase** for maintainability and clarity
- **Extracts and saves figures** as images
- **Parses and formats tables** (vertical/horizontal)
- **Handles citations and bibliography**
- **Supports equations and references**
- **Customizable section and navigation structure**
- **Configurable via variables in `main.py`**

---

## Folder Structure

```
docx_converter/
│
├── main.py                   # Entry point; set your file paths and options here
├── utils/                    # Folder housing all utility and helper files for main.py
   ├── __init__.py            # Marks the directory as a Python package
   ├── constants.py           # Style mappings and global constants
   ├── helpers.py             # Helper functions (formatting, file ops, etc.)
   ├── figures.py             # Figure/image extraction logic
   ├── tables.py              # Table extraction and formatting
   ├── citations.py           # Citation and bibliography handling
   ├── equations.py           # Equation reference handling
   ├── docx_processor.py      # Main DOCX parsing and sectioning logic
   ├── mdx_writer.py          # Writes MDX files to disk
├── venv/                     # Virtual environment folder
├── README.md                 # This file
├── requirements.txt          # Dependencies requires to run this script
```

---

## Requirements

- Python 3.8+
- [python-docx](https://python-docx.readthedocs.io/)
- [Pillow](https://pillow.readthedocs.io/)
- [python-slugify](https://github.com/un33k/python-slugify)
- docx

Install dependencies:

```sh
pip install -r requirements.txt
```

---

## Usage

1. **Clone or copy this folder into your project.**

2. **Open `main.py`** and set the following variables at the top:

   - `DOCX_PATH` – Path to your `.docx` file
   - `BIB_PATH` – Path to your bibliography JSON file
   - `FIGURES_DIR` – Output directory for extracted figures
   - `MDX_DIR` – Output directory for MDX files
   - `FIGSRC` – Relative path for figures in MDX
   - `NAVLINK`, `NAVTITLE`, `NAVDOC` – Navigation settings for your docs

3. **Run the script** (from your IDE or with `python main.py`):

   ```sh
   python main.py
   ```

4. **Follow prompts** to confirm figure regeneration if needed.

5. **Find your MDX files** and extracted figures in the specified output directories.

---

## Customization

- **Section and style mappings** can be changed in `constants.py`.
- **Component formatting** can be adjusted in `helpers.py` and `mdx_writer.py`.
- **Add or modify logic** in the respective module for figures, tables, citations, or equations.

---

## Troubleshooting

- Ensure all required Python packages are installed.
- Check your file paths in `main.py`.
- If you encounter errors, review the stack trace and check the relevant module.

---

## License

This project is provided as-is for internal or personal use.  
For other uses, please consult the project owner.

---
