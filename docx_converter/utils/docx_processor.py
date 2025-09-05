import string
from .helpers import (
    generate_slug,
    sanitize_filename,
    format_multiline_component,
    format_paragraph,
    esacpe_jsx_prop,
)
from .constants import TOP_LEVEL_HEADINGS, STYLE_TO_MD_HEADING
from .figures import extract_figures, handle_figure_references
from .tables import extract_tables, handle_table_references
from .citations import handle_citations
from .equations import handle_equation_references


def process_docx(doc, citation_map, fig_src_path, inline_image_info=None):
    """
    Processes the docx document and returns sections, figures, and tables.
    inline_image_info should be a dict with keys:
      - "inline_image_locations": list of (para_idx, run_idx, filename)
    """
    sections = []
    citation_count = [0]
    current_section = None
    figures = extract_figures(doc, fig_src_path)
    tables, total = extract_tables(doc)
    figure_index = 0
    table_index = 0
    equation_index = 0
    appendix_count = 0
    section_number = 1
    i = 0

    # Prepare inline image lookup by paragraph and run index
    inline_image_lookup = {}
    num_inline_images = 0
    if inline_image_info and "inline_image_locations" in inline_image_info:
        for para_idx, run_idx, filename in inline_image_info["inline_image_locations"]:
            if para_idx not in inline_image_lookup:
                inline_image_lookup[para_idx] = {}
            if run_idx not in inline_image_lookup[para_idx]:
                inline_image_lookup[para_idx][run_idx] = []
            inline_image_lookup[para_idx][run_idx].append(filename)
        num_inline_images = len(inline_image_info["inline_image_locations"])

    while i < len(doc.paragraphs):
        para = doc.paragraphs[i]
        style = para.style.name
        text = para.text.strip()
        if style in TOP_LEVEL_HEADINGS:
            if current_section:
                sections.append(current_section)
            if style == "RMC_Appendix Heading 1":
                appendix_letter = string.ascii_uppercase[appendix_count]
                appendix_count += 1
                slug = generate_slug(text)
                filename = f"{section_number:02d}-appendix-{sanitize_filename(slug)}.mdx"
                title = f"Appendix {appendix_letter} - {text}"
                current_section = {
                    "title": title,
                    "style": style,
                    "content": [],
                    "filename": filename,
                    "appendix_letter": appendix_letter,
                }
            else:
                title = text
                if title in ("Introduction", "Intro"):
                    title = "Preface"
                slug = generate_slug(title)
                filename = f"{section_number:02d}-{sanitize_filename(slug)}.mdx"
                current_section = {
                    "title": title,
                    "style": style,
                    "content": [],
                    "filename": filename,
                }
            section_number += 1
            i += 1
            continue
        elif current_section is not None:
            if current_section["title"] == "Preface":
                if "U.S. Army Corps of Engineers" in text:
                    next_texts = []
                    for offset in range(1, 4):
                        if i + offset < len(doc.paragraphs):
                            next_texts.append(doc.paragraphs[i + offset].text.strip())
                        else:
                            next_texts.append("")
                    if (
                        "Institute for Water Resources" in next_texts[0]
                        and "Risk Management Center" in next_texts[1]
                    ):
                        fixed_text = (
                            "U.S. Army Corps of Engineers\n"
                            "Institute for Water Resources\n"
                            "Risk Management Center\n"
                            "[RMC.software@usace.army.mil](mailto:RMC.software@usace.army.mil)"
                        )
                        current_section["content"].append(
                            {"text": fixed_text, "formatted_text": fixed_text, "style": style}
                        )
                        i += 4
                        continue
            if style == "Caption" and text.startswith("Figure"):
                figure_number = figure_index + 1
                if figure_index < len(figures):
                    figure = figures[figure_index]
                    props = {
                        "figKey": figure["figKey"],
                        "src": figure["src"],
                        "alt": esacpe_jsx_prop(figure["alt"]),
                        "caption": esacpe_jsx_prop(figure["caption"]),
                    }
                    figure_component = format_multiline_component("Figure", props)
                    current_section["content"].append(
                        {"text": text, "formatted_text": figure_component, "style": style}
                    )
                else:
                    # Warn and insert a placeholder if no figure image was found
                    warning = (
                        f":::danger\n"
                        f"Figure {figure_number} caption found, but no corresponding image was extracted.\n"
                        f":::\n"
                    )
                    current_section["content"].append(
                        {"text": text, "formatted_text": warning, "style": style}
                    )
                figure_index += 1
                i += 1
                continue
            if style == "RMC_Table Caption" and text.startswith("Table"):
                if not tables:
                    # No tables found in the document
                    warning = f":::info\n" f"No tables were found in the document.\n" f":::\n"
                    print("No tables were found in the document.")
                    current_section["content"].append(
                        {"text": text, "formatted_text": warning, "style": style}
                    )
                    i += 1
                    continue
                if table_index < len(tables):
                    table = tables[table_index]
                    table_type = table["tableType"]
                    if table_type == "TableVertical":
                        component_name = "TableVertical"
                        props = {
                            "tableKey": table["tableKey"],
                            "headers": table["headers"],
                            "columns": table.get("data", []),
                            "alt": esacpe_jsx_prop(table["alt"]),
                            "caption": esacpe_jsx_prop(table["caption"]),
                        }
                    elif table_type == "TableHorizontal":
                        component_name = "TableHorizontal"
                        props = {
                            "tableKey": table["tableKey"],
                            "headers": table["headers"],
                            "rows": table.get("data", []),
                            "alt": esacpe_jsx_prop(table["alt"]),
                            "caption": esacpe_jsx_prop(table["caption"]),
                        }
                    else:
                        table_component = f"<!-- Unknown table type: {table_type} -->"
                        current_section["content"].append(
                            {"text": text, "formatted_text": table_component, "style": style}
                        )
                        table_index += 1
                        i += 1
                        continue
                    figure_component = format_multiline_component(component_name, props)
                    warning_text = ""
                    if table.get("hasSpanningCells", False):
                        warning_text = (
                            ":::danger\n"
                            "This table contains cells that span multiple rows or columns. Manually update the React component to properly format the table.\n"
                            ":::"
                        )
                    if warning_text:
                        current_section["content"].append(
                            {
                                "text": warning_text,
                                "formatted_text": warning_text,
                                "style": "Warning",
                            }
                        )
                    current_section["content"].append(
                        {"text": text, "formatted_text": figure_component, "style": style}
                    )
                    table_index += 1
                else:
                    # Warn and insert a placeholder if no table was found at this index
                    warning = (
                        f":::danger\n"
                        f"Table caption found, but no corresponding table data was extracted.\n"
                        f":::\n"
                    )
                    current_section["content"].append(
                        {"text": text, "formatted_text": warning, "style": style}
                    )
                i += 1
                continue
            if style == "RMC_Equation":
                equation_number = equation_index + 1
                props = {
                    "equationKey": f"equation-{str(equation_number)}",
                    "equation": f"INSERT EQUATION HERE IN KaTeX FORMAT",
                }
                equation_component = format_multiline_component("Equation", props)
                placeholder = (
                    f"\n:::danger Equation {equation_number} Placeholder\n\n"
                    f"Please replace the following component with your KaTeX-formatted equation:\n\n"
                    f"{equation_component}\n\n"
                    f":::"
                )
                current_section["content"].append(
                    {"text": text, "formatted_text": placeholder, "style": style}
                )
                equation_index += 1
                i += 1
                continue
            if style == "RMC_Equation Terms":
                equation_term = f"- {text}"
                current_section["content"].append(
                    {"text": equation_term, "formatted_text": equation_term, "style": style}
                )
                i += 1
                continue

            # --- Inline image injection logic (inline within paragraph, with formatting) ---
            formatted_text = format_paragraph(
                para,
                style,
                inline_image_lookup=inline_image_lookup,
                para_idx=i,
                fig_src_path=fig_src_path,
            )

            # Now apply citation, figure, table, and equation reference handling
            formatted_text = handle_citations(formatted_text, citation_map, citation_count)
            formatted_text = handle_figure_references(formatted_text)
            formatted_text = handle_table_references(formatted_text)
            formatted_text = handle_equation_references(formatted_text)
            current_section["content"].append(
                {"text": text, "formatted_text": formatted_text, "style": style}
            )
            i += 1
        else:
            i += 1
    if current_section:
        sections.append(current_section)

    print(
        f"Found {citation_count[0]} citations, "
        f"{len(figures)} captioned figures, "
        f"{num_inline_images} inline images, "
        f"{len(tables)} tables, and {equation_index} equations in the document."
    )
    return sections, figures, tables
