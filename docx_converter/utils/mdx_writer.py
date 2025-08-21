from .helpers import (
    format_paragraph,
    clear_output_directories,
    should_reset_figures,
    wrap_text,
    format_js_array,
    is_inline_component,
    is_multiline_component,
    escape_asterisks_in_html_tags
)
import os
import json
import re
from .constants import STYLE_TO_MD_HEADING

def write_mdx_files(sections, output_dir, nav_link, nav_link_title, nav_document):
    os.makedirs(output_dir, exist_ok=True)

    # NavContainer component string
    nav_container = f"""
<NavContainer 
  link="{nav_link}"
  linkTitle="{nav_link_title}"
  document="{nav_document}"
></NavContainer>
"""

    # Imports for 00-document-info.mdx
    doc_info_imports = """
import NavContainer from "@site/src/components/NavContainer";
import DocumentMetadata from "@site/src/components/DocumentMetadata";
import Link from "@docusaurus/Link";
import addBaseUrl from "@docusaurus/useBaseUrl";
    """

    # Frontmatter for 00-document-info.mdx
    doc_info_title = "Document Info"
    reportDate = "Enter report date (Month YYYY)"
    reportType = "Enter report type"
    reportTitle = "Enter report title"
    reportSubtitle = "Enter report subtitle"
    reportAuthors = ["Author 1, Organization", "Author 2, Organization"]
    reportAbstract = "Enter report abstract"
    reportSubjectTerms = ["Term 1", "Term 2"]
    responsiblePersonName = "Enter name of responsible person"
    responsiblePersonNumber = "Enter phone number of responsible person (xxx-xxx-xxxx)"
    citationGuide = "F. M. Last, <i>RMC Documentation Report</i>, Lakewood, CO: U.S. Army Corps of Engineers, Risk Management Center, 2025. Accessed on <i>{enter current date here}</i>."

    doc_info_frontmatter = f"""---
title: {doc_info_title}
reportDate: {reportDate}
reportType: {reportType}
reportTitle: {reportTitle}
reportSubTitle: {reportSubtitle}
reportAuthors: {json.dumps(reportAuthors)}
reportAbstract: {reportAbstract}
reportSubjectTerms: {json.dumps(reportSubjectTerms)}
responsiblePersonName: {responsiblePersonName}
responsiblePersonNumber: {responsiblePersonNumber}
citationGuide: {citationGuide}
---\n\n"""

    doc_info_body = """# Document Information

<DocumentMetadata metadata={frontMatter} />
"""

    with open(os.path.join(output_dir, "00-document-info.mdx"), "w", encoding="utf-8") as f:
        f.write(doc_info_frontmatter + doc_info_imports.strip() + "\n" + nav_container + "\n" + doc_info_body)

    # Imports for 00-version-history.mdx
    version_history_imports = """
import NavContainer from "@site/src/components/NavContainer";
import TableVersionHistory from "@site/src/components/TableVersionHistory";
import Link from "@docusaurus/Link";
    """

    # Frontmatter for 00-version-history.mdx
    version_history_title = "Version History"
        
    version_history_frontmatter = f"""---
title: {version_history_title}
---\n\n"""

    version_history_body = """# Version History

<TableVersionHistory 
    versions={["1.0"]}
    dates={["Month YYYY"]}
    descriptions={["Description"]}
    modifiedBy={["Modified by name"]}
    reviewedBy={["Reviewed by name"]}
    approvedBy={["Approved by name"]} 
/>
"""

    with open(os.path.join(output_dir, "00-version-history.mdx"), "w", encoding="utf-8") as f:
        f.write(version_history_frontmatter + version_history_imports.strip() + "\n" + nav_container + "\n" + version_history_body)
    
    # Standard imports to be added to every MDX chapter file
    standard_imports = """
import NavContainer from "@site/src/components/NavContainer";
import VersionSelector from "@site/src/components/VersionSelector";
import Link from "@docusaurus/Link";
import addBaseUrl from "@docusaurus/useBaseUrl";
import CitationFootnote from "@site/src/components/CitationFootnote";
    """

    # List of optional imports based on components found in the content
    optional_imports = {
        'Bibliography': 'import Bibliography from "@site/src/components/Bibliography";',
        'Citation': 'import Citation from "@site/src/components/Citation";',
        'Equation': 'import Equation from "@site/src/components/Equation";',
        'Equation No Ref': 'import EquationNoRef from "@site/src/components/EquationNoRef";',
        'Equation Reference': 'import EquationReference from "@site/src/components/EquationReference";',
        'Figure': 'import Figure from "@site/src/components/Figure";',
        'Figure Inline': 'import FigureInline from "@site/src/components/FigureInline";',
        'Figure Reference': 'import FigReference from "@site/src/components/FigureReference";',
        'Table Acronyms': 'import TableAcronyms from "@site/src/components/TableAcronyms";',
        'Table Horizontal': 'import TableHorizontal from "@site/src/components/TableHorizontal";',
        'Table Vertical': 'import TableVertical from "@site/src/components/TableVertical";',
        'Table Vertical Left Align': 'import TableVerticalLeftAlign from "@site/src/components/TableVerticalLeftAlign";',
        'Table Reference': 'import TableReference from "@site/src/components/TableReference";',      
    }    

    for section in sections:
        title = section['title']
        filename = section.get('filename')
        filepath = os.path.join(output_dir, filename)

        frontmatter = f"---\ntitle: \"{title}\"\n---\n\n"
        body = ""

        # Keep track of which optional imports are needed
        imports_needed = set()

        # Check for the references section
        is_reference_section = section['title'].strip().lower() in ["references", "appendix - references"]

        # Define a function to check for the acronym appendix
        def is_acronym_section_title(title):
            lower_title = title.lower()
            return (
                "acronym" in lower_title
                and ("appendix" in lower_title or lower_title.startswith("acronym"))
            )

        # If the section is References, override the body with a <Bibliography /> component
        if is_reference_section:
            imports_needed.add('Bibliography')
            body = "# References\n\n<Bibliography />\n\n"
        
        # If the section is Acronyms, extract the acronym data and override the body with a <TableAcronym /> component
        elif is_acronym_section_title(section['title']):
            imports_needed.add('Table Acronyms')
            acronyms = []
            definitions = []

            for para in section['content']:
                style = para.get('style', '')
                text = para.get('text', '').strip()

                if style == "RMC_Acronym List" and "\t" in text:
                    parts = text.split("\t", 1)
                    if len(parts) == 2:
                        acronyms.append(parts[0].strip())
                        definitions.append(parts[1].strip())
                    else:
                        print(f"⚠️ Skipped malformed line: {text}")

            columns_js = format_js_array([acronyms, definitions], indent=2, max_width=150)
            
            # Extract appendix letter from title if available
            appendix_letter = section.get("appendix_letter", "")
            appendix_label = f"Appendix {appendix_letter} - Acronyms" if appendix_letter else "Acronyms"
            
            # Build TableAcronyms component string
            body = (
                f"# {appendix_label}\n\n"
                "<TableAcronyms \n"
                '  headers={["Acronym", "Full Form"]}\n'
                f"  columns={{{columns_js}}}\n"
                "/>\n\n"
            )
        
        # Build the remaining sections
        else:
            for i, para in enumerate(section['content']):
                para_text = para['text']
                style = para['style']
                formatted_text = para['formatted_text']

                # Add optional imports by checking for component tag usage
                for import_name, import_line in optional_imports.items():
                    component_tag = import_line.split()[1].removeprefix("import")
                    if f"<{component_tag}" in formatted_text:
                        imports_needed.add(import_name)

                # Don't skip paragraphs that only have a FigureInline
                if not para_text and not formatted_text:
                    continue

                # If the paragraph has a heading style, add it as a heading
                if style in STYLE_TO_MD_HEADING:
                    heading_level = STYLE_TO_MD_HEADING[style]
                    body += wrap_text(f"{heading_level} {para_text}") + "\n\n"
                
                # Handle equation terms with lookahead
                elif style == "RMC_Equation Terms":
                    next_style = section['content'][i + 1]['style'] if i + 1 < len(section['content']) else None
                    if next_style == "RMC_Equation Terms":
                        body += wrap_text(formatted_text) + "\n"
                    else:
                        body += wrap_text(formatted_text) + "\n\n"
                
                # Default: normal paragraph
                else:
                    if is_multiline_component(formatted_text):
                        body += formatted_text + "\n\n"
                    else:
                        body += wrap_text(formatted_text) + "\n\n"
            
            body = f"# {title}\n\n" + body
        
        # Replace * with &#42 within <em>...</em> and <strong>...</strong> tags
        body = escape_asterisks_in_html_tags(body)

        # Prepare the imports section, adding the standard and optional imports
        import_section = standard_imports.strip()
        for import_name in imports_needed:
            import_section += f"\n{optional_imports[import_name]}"
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + import_section + "\n" + nav_container + "\n" + body + "<CitationFootnote />")

        #print(f"✅ Created {filepath}")