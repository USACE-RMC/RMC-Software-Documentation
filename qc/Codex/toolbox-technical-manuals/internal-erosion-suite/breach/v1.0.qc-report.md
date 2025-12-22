# QC Report

Source PDF: static/source-documents/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/RMC-CPD-2023-09 - RMC Breach Toolbox.pdf
Review Date: 2025-12-22
Reviewer: Codex

## File: 00-document-info.mdx

### Issue 1: Missing prepared/reviewed/approved statements
Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/00-document-info.mdx:28
Category: Text
Severity: Major
Problem: The PDF front matter includes Prepared/Reviewed/Approved statements with names (Damon Amlung, Tim O'Leary, and Nate Snorteland), but the MDX set does not include this content.
Recommended Fix: Add a front-matter section (e.g., below Document Information) with the Prepared/Reviewed/Approved statements and names exactly as shown in the PDF.
Fix Applied: No
Human Verification Required: No

## File: 00-version-history.mdx

### Issue 2: Extra version history page not in PDF
Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/00-version-history.mdx:15
Category: Text
Severity: Major
Problem: The PDF does not include a Version History section/page, but the MDX includes a Version History page with a table (version 1.0, December 2025, etc.).
Recommended Fix: Remove this MDX page or replace it with content that appears in the PDF; confirm with the source owner if a Version History page is intended.
Fix Applied: No
Human Verification Required: Yes

## File: 04-background.mdx

### Issue 3: "mass wasting" text does not match PDF
Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/04-background.mdx:37
Category: Text
Severity: Minor
Problem: The PDF sentence reads "void collapses (mass masting)," but the MDX has "(mass wasting)."
Recommended Fix: Update the MDX to match the PDF text, or confirm whether the PDF has a typo.
Fix Applied: No
Human Verification Required: Yes

## File: 05-gross-enlargement.mdx

### Issue 4: Figure 9 caption missing citation component
Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/05-gross-enlargement.mdx:150
Category: Citation
Severity: Major
Problem: The PDF caption includes author-year text "Visser et al. 2013," but the MDX caption lacks the required <Citation citationKey="Visser2013" />.
Recommended Fix: Add <Citation citationKey="Visser2013" /> to the Figure 9 caption while keeping the author-year text.
Fix Applied: No
Human Verification Required: No

## File: 06-unraveling.mdx

### Issue 5: Missing period at end of opening sentence
Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/06-unraveling.mdx:25
Category: Text
Severity: Minor
Problem: The PDF ends the opening sentence with a period, but the MDX sentence ends without punctuation.
Recommended Fix: Add a period at the end of the sentence.
Fix Applied: No
Human Verification Required: No

### Issue 6: Equation 15 slope symbol uses zero instead of letter o
Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/06-unraveling.mdx:78
Category: Equation
Severity: Major
Problem: The PDF equation uses S_o (letter o) for slope, but the MDX equation uses S_0 (zero) in Equation 15.
Recommended Fix: Change S_{0} to S_{o} in Equation 15.
Fix Applied: No
Human Verification Required: No
