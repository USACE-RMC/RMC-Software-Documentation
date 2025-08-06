import os
import sys
import re
import json
import slugify as unicode_slugify
import shutil
from docx.oxml.ns import qn

def load_citation_map(bib_file_path):
    try:
        with open(bib_file_path, 'r') as file:
            citation_list = json.load(file)
        return {entry['citationKey']: entry for entry in citation_list}
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        return {}

def generate_slug(text):
    return unicode_slugify.slugify(text)

def sanitize_filename(name):
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', name)

def to_jsx(val, indent="  "):
    if isinstance(val, list):
        parts = []
        for item in val:
            jsx = to_jsx(item, indent + "  ")
            parts.append(jsx)
        return "[\n" + indent + "  " + (",\n" + indent + "  ").join(parts) + "\n" + indent + "]"
    elif isinstance(val, dict):
        parts = []
        for k, v in val.items():
            jsx_val = json.dumps(v) if not isinstance(v, (dict, list)) else to_jsx(v, indent + "  ")
            if isinstance(v, str):
                jsx_val = f'"{v}"'
            parts.append(f"{k}: {jsx_val}")
        return "{ " + ", ".join(parts) + " }"
    elif val is None:
        return "null"
    else:
        return json.dumps(val)
    
def esacpe_jsx_prop(val):
    if isinstance(val, str):
        return val.replace('"', '&quot;')
    return val

def format_multiline_component(tag, props):
    formatted = f"<{tag}\n"
    for key, val in props.items():
        if isinstance(val, str):
            clean_val = " ".join(val.split())
            formatted += f'  {key}="{clean_val}"\n'
        elif isinstance(val, (list, dict)):
            jsx_val = to_jsx(val, indent="  ")
            formatted += f"  {key}={{\n{jsx_val}\n  }}\n"
        else:
            formatted += f"  {key}={val}\n"
    formatted += "/>"
    return formatted

def is_multiline_component(text):
    multiline_tags = [
        "TableVertical",
        "TableVerticalLeftAlign",
        "TableHorizontal",
        "Figure",
        "Equation",
    ]
    text = text.strip()
    return any(re.match(rf"<{tag}\b[^>]*>", text) for tag in multiline_tags)

def is_inline_component(text):
    inline_tags = [
        "FigureInline",
        "FigReference",
        "TableReference",
        "EquationReference",
        "Citation",
        "CitationFootnote"
    ]
    text = text.strip()
    return any(re.match(rf"<{tag}\b[^>]*\/>$", text) for tag in inline_tags)

def escape_asterisks_in_html_tags(text):
    # Replace * with &#42; inside <em>...</em> and <strong>...<strong>
    def replacer(match):
        inner = match.group(2).replace('*', '&#42;')
        return f"<{match.group(1)}>{inner}</{match.group(1)}>"
    return re.sub(r'<(em|strong)>(.*?)<\/\1>', replacer, text, flags=re.DOTALL)

def format_js_array(array, indent=2, max_width=150):
    indent_str = ' ' * indent
    result = "[\n"
    for row in array:
        line = indent_str + "["
        current_len = len(line)
        parts = []
        for item in row:
            js_item = json.dumps(item)
            if parts:
                sep = ", "
                test_len = current_len + len(sep) + len(js_item)
            else:
                sep = ""
                test_len = current_len + len(js_item)
            if test_len > max_width:
                result += line + ",\n"
                line = indent_str + js_item
                current_len = len(line)
                parts = [js_item]
            else:
                line += sep + js_item
                current_len += len(sep) + len(js_item)
                parts.append(js_item)
        result += line + "],\n"
    result += indent_str[:-2] + "]"
    return result

def clear_output_directories(reset_map):
    for path, should_reset in reset_map.items():
        if should_reset and os.path.exists(path):
            for item in os.listdir(path):
                item_path = os.path.join(path, item)
                try:
                    if os.path.isfile(item_path) or os.path.islink(item_path):
                        os.unlink(item_path)
                    elif os.path.isdir(item_path):
                        shutil.rmtree(item_path)
                except Exception as e:
                    print(f"Failed to delete {item_path}: {e}")

def should_reset_figures():
    while True:
        user_input = input("Do you want to clear and regenerate all figure images? [Y/N]: ").strip().upper()
        if user_input == "Y":
            print("Clearing and regenerating figure images.")
            return True
        elif user_input == "N":
            print("Keeping existing figure images and re-mapping them.")
            return False
        else:
            print("Please enter 'Y' or 'N'.")

def format_paragraph(para, style=None, inline_image_lookup=None, para_idx=None, fig_src_path=""):
    def flush_group(group):
        if not group["text_parts"]:
            return ""
        inner = "".join(group["text_parts"])
        if group["bold"]:
            inner = f"<strong>{inner}</strong>"
        if group["italic"]:
            inner = f"<em>{inner}</em>"
        return inner

    output = []
    current_group = {"bold": None, "italic": None, "text_parts": []}

    for run_idx, run in enumerate(para.runs):
        # Insert inline image(s) at this run if present
        if inline_image_lookup and para_idx is not None:
            if para_idx in inline_image_lookup and run_idx in inline_image_lookup[para_idx]:
                # Flush current group before inserting image
                output.append(flush_group(current_group))
                current_group = {"bold": None, "italic": None, "text_parts": []}
                for filename in inline_image_lookup[para_idx][run_idx]:
                    src = f"{fig_src_path}/inline-images/{filename}"
                    output.append(f'<FigureInline src="{src}" />')
        text = run.text
        if not text:
            continue

        bold = bool(run.bold)
        italic = bool(run.italic)

        # If this is the first run, set the group formatting
        if current_group["bold"] is None and current_group["italic"] is None:
            current_group["bold"] = bold
            current_group["italic"] = italic

        # If formatting changes, flush the group and start a new one
        if bold != current_group["bold"] or italic != current_group["italic"]:
            output.append(flush_group(current_group))
            current_group = {"bold": bold, "italic": italic, "text_parts": []}

        if run.font.subscript:
            text = f"<sub>{text}</sub>"
        elif run.font.superscript:
            text = f"<sup>{text}</sup>"

        current_group["text_parts"].append(text)

    output.append(flush_group(current_group))
    formatted_text = "".join(output)

    if style:
        if style.startswith("RMC_Bullet"):
            level = int(style[-1])
            indent = "  " * (level - 1)
            formatted_text = f"{indent}- {formatted_text}"
        elif style.startswith("RMC_Numbering"):
            level = int(style[-1])
            indent = "  " * (level - 1)
            formatted_text = f"{indent}1. {formatted_text}"

    xml = para._element.xml
    inline_eq_count = xml.count("<m:oMath")
    if inline_eq_count > 0:
        placeholder = (
            "\n:::danger Inline Equation Detected\n"
            "Insert `<EquationNoRef />` component(s) to render math in the following paragraph.\n"
            ":::"
        )
        return f"{placeholder}\n{formatted_text}"

    return formatted_text

def wrap_text(text, max_line_width=150):
    reserved_line_starters = ["import", "export", "from", "return", "const", "let", "var", "+"]
    lines = text.split('\n')
    wrapped_lines = []
    for line in lines:
        if line.startswith("[-- INLINE EQUATIONS DETECTED"):
            wrapped_lines.append(line)
            continue
        parts = re.split(
            r'((?:<(?:FigureInline|FigReference|EquationReference|TableReference|EquationNoRef|Citation|CitationFootnote)\b[^>]*\/>))',
            line
        )
        current_line = ""
        current_line_length = 0
        for i, part in enumerate(parts):
            if part.strip().startswith(("<Figure ", "<TableVertical", "TableVerticalLeftAlign", "TableHorizontal", "<Equation ")):
                if current_line.strip():
                    wrapped_lines.append(current_line.rstrip())
                    current_line = ""
                    current_line_length = 0
                wrapped_lines.append(part.strip())
                continue
            if is_inline_component(part):
                part = part.strip()
                if current_line_length + len(part) <= max_line_width:
                    if current_line_length > 0:
                        current_line_length += 1
                    current_line += part
                    current_line_length += len(part)
                else:
                    if current_line.strip():
                        wrapped_lines.append(current_line.rstrip())
                    current_line = '{"\\n"}' + part
                    current_line_length = len(part) + len('{"\\n"}')
            else:
                words = re.findall(r'\S+|\s+', part)
                for word in words:
                    word_len = len(word)
                    # Prevent reserved words from starting a new line
                    if (current_line_length + word_len > max_line_width and
                        not any(word.lstrip().startswith(res) for res in reserved_line_starters)):
                        if current_line.strip():
                            wrapped_lines.append(current_line.rstrip())
                        current_line = ""
                        current_line_length = 0
                    current_line += word
                    current_line_length += word_len
        if current_line.strip():
            wrapped_lines.append(current_line.rstrip())
    return "\n".join(wrapped_lines)

def confirmation_function():
    while True:
        response = input("Confirm the required user inputs are correct? [Y/N]: ").strip().upper()
        if response == "Y":
            print("Executing the docx to mdx conversion")
            break
        elif response == "N":
            print("Terminating script. Please review your inputs.")
            sys.exit(1)
        else:
            print("Invalid input. Please enter 'Y' to continue or 'N' to exit.")