import re

def handle_equation_references(text):
    pattern = r"\bEquation (\d+)\b"
    def replacer(match):
        equation_number = match.group(1)
        equation_key = f"equation-{equation_number}"
        replacement = f"<EquationReference equationKey=\"{equation_key}\" />"
        return replacement
    return re.sub(pattern, replacer, text)