from docx import Document
from docx.text.paragraph import Paragraph
from PIL import Image
from io import BytesIO
import os
import re
import hashlib

def iter_block_items(doc):
    # Yields paragraphs and tables in order
    for block in doc.element.body:
        if block.tag.endswith('tbl'):
            yield block
        elif block.tag.endswith('p'):
            yield Paragraph(block, doc)

def extract_figure_images(docx_path, fig_img_output_path, extract_figures):
    """
    Extracts figure and inline images from a DOCX file.
    Always builds and returns the image hash maps and locations,
    but only saves images to disk if extract_figures is True.
    """
    if not os.path.exists(fig_img_output_path):
        os.makedirs(fig_img_output_path, exist_ok=True)

    doc = Document(docx_path)
    figures_dir = os.path.join(fig_img_output_path, "figures")
    inline_dir = os.path.join(fig_img_output_path, "inline-images")
    os.makedirs(figures_dir, exist_ok=True)
    os.makedirs(inline_dir, exist_ok=True)

    image_hash_map = {}
    inline_image_hash_map = {}
    inline_image_locations = []  # (para_idx, run_idx, filename)
    figure_image_hashes = set()  # Track hashes used for figures

    # Build rels map once
    rels = {
        rel.rId: rel.target_part.blob
        for rel in doc.part._rels.values()
        if "image" in rel.target_ref
    }

    # First, find and save captioned figures, and record their hashes
    figure_count = 0
    for i, para in enumerate(doc.paragraphs):
        style = para.style.name if para.style else ""
        text = para.text.strip().replace('\xa0', ' ')
        if "caption" in style.lower() and text.startswith("Figure"):
            fig_number = str(figure_count + 1)
            # Find the most recent image before this caption
            found = False
            for prev_para_idx in range(i-1, -1, -1):
                prev_para = doc.paragraphs[prev_para_idx]
                for run_idx in reversed(range(len(prev_para.runs))):
                    run = prev_para.runs[run_idx]
                    if 'graphic' in run._element.xml:
                        drawing = run._element
                        blip = drawing.xpath('.//a:blip')
                        if blip:
                            rEmbed = blip[0].get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                            if rEmbed in rels:
                                image_data = rels[rEmbed]
                                image_hash = hashlib.sha256(image_data).hexdigest()
                                if image_hash in figure_image_hashes:
                                    continue
                                image_filename = f"figure{fig_number}.png"
                                save_path = os.path.join(figures_dir, image_filename)
                                if image_hash not in image_hash_map:
                                    if extract_figures:
                                        image = Image.open(BytesIO(image_data))
                                        image.save(save_path)
                                    image_hash_map[image_hash] = image_filename
                                figure_image_hashes.add(image_hash)
                                found = True
                                break
                if found:
                    break
            if found:
                figure_count += 1

    # Now, find all images in paragraphs (including run index) and save as inline images
    for para_idx, para in enumerate(doc.paragraphs):
        for run_idx, run in enumerate(para.runs):
            if 'graphic' in run._element.xml:
                drawing = run._element
                blip = drawing.xpath('.//a:blip')
                if blip:
                    rEmbed = blip[0].get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                    if rEmbed in rels:
                        image_data = rels[rEmbed]
                        image_hash = hashlib.sha256(image_data).hexdigest()
                        # Only save as inline image if not already used as a figure
                        if image_hash in figure_image_hashes:
                            continue
                        image_filename = f"inline-{image_hash[:8]}.png"
                        save_path = os.path.join(inline_dir, image_filename)
                        if image_hash not in inline_image_hash_map:
                            if extract_figures:
                                image = Image.open(BytesIO(image_data))
                                image.save(save_path)
                            inline_image_hash_map[image_hash] = image_filename
                        inline_image_locations.append((para_idx, run_idx, image_filename))

    print(f"\n{figure_count} figure image(s) extracted (or mapped).")
    print(f"{len(inline_image_locations)} inline image(s) extracted (or mapped).")

    return {
        "figure_hash_map": image_hash_map,
        "inline_image_hash_map": inline_image_hash_map,
        "inline_image_locations": inline_image_locations
    }

def extract_figures(doc, fig_src_path):
    figures = []
    figure_count = 0
    for i, para in enumerate(doc.paragraphs):
        style = para.style.name
        if style == "RMC_Figure":
            figure_count += 1
            figKey = f"figure-{figure_count}"
            src = f"{fig_src_path}/figures/figure{figure_count}.png"
            caption_paragraph = doc.paragraphs[i + 1]
            caption = caption_paragraph.text.strip()
            caption = re.sub(r'^Figure\s*\d*[\.:]*\s*', '', caption).lstrip()
            alt_text = caption
            figures.append({
                "figure_number": figure_count,
                "figKey": figKey,
                "src": src,
                "alt": alt_text,
                "caption": caption,
            })
    return figures

def handle_figure_references(text):
    def replacer(match):
        figure_number = int(match.group(1))
        figKey = f"figure-{str(figure_number)}"
        if figKey:
            return f"<FigReference figKey=\"{figKey}\" />"
        else:
            return match.group(0)
    return re.sub(r"Figure (\d+)", replacer, text)