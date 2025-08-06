import re

def handle_citations(text, citation_map, citation_count):
    citation_patterns = [ 
        (r"\(([A-Z][a-zA-Z]+)\s+and\s+([A-Z][a-zA-Z]+),\s*(\d{4})\)", 2),
        (r"\b([A-Z][a-zA-Z]+)\s+and\s+([A-Z][a-zA-Z]+)\s*\((\d{4})\)", 2),
        (r"\b([A-Z][a-zA-Z]+)\s+et al\.\s*\(?(\d{4})\)?", 1),
        (r"\(\s*([A-Z][a-zA-Z]+)\s+et al\.\s*,\s*(\d{4})\s*\)", 1),
        (r"\(\s*([A-Z][a-zA-Z]+),\s*(\d{4})\s*\)", 1),
        (r"\b([A-Z][a-zA-Z]+)\s*\((\d{4})\)", 1),
        (r"\b([A-Z][a-zA-Z]+),?\s+(\d{4})", 1),
        (r"\b([A-Z][a-zA-Z]+),\s*([A-Z][a-zA-Z]+),?\s*(?:and|,)\s*([A-Z][a-zA-Z]+)(?:,\s*([A-Z][a-zA-Z]+))?\s+(\d{4})", 3),
        (r"\(\s*([A-Z][a-zA-Z]+),\s*([A-Z][a-zA-Z]+),?\s*(?:and|,)\s*([A-Z][a-zA-Z]+)(?:,\s*([A-Z][a-zA-Z]+))?,?\s+(\d{4})\s*\)", 3),
    ]
    for pattern, pattern_type in citation_patterns:
        def replacer(match):
            if pattern_type == 1:
                author, year = match.group(1), match.group(2)
                citation_key = f"{author}{year}"
            elif pattern_type == 2:
                author1, author2, year = match.group(1), match.group(2), match.group(3)
                citation_key = f"{author1}{year}"
            elif pattern_type == 3:
                authors = [match.group(i) for i in range(1, 5) if match.group(i)]
                year = match.group(5)
                citation_key = f"{authors[0]}{year}"
            else:
                return match.group(0)
            if citation_key in citation_map:
                citation_count[0] += 1
                return f"<Citation citationKey=\"{citation_key}\" />"
            else:
                return match.group(0)
        text = re.sub(pattern, replacer, text)
    return text