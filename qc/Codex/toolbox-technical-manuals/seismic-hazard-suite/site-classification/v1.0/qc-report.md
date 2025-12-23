# QC Report

Source PDF: static/source-documents/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/RMC-CPD-2023-01 - RMC Site Classification Toolbox.pdf
Review Date: 2025-12-22
Reviewer: Codex

## File: 04-background.mdx

### Issue 1: Figure 8 caption missing author-year text
Location: docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/04-background.mdx:34
Category: Citation
Severity: Major
Problem: The PDF caption is "Ground motion amplification (FEMA 2022)." but the MDX caption omits the raw author-year text and only includes the citation component.
Recommended Fix: Add the raw author-year text in the caption (e.g., "Ground motion amplification (FEMA 2022)" with <Citation citationKey="FEMA2022" />).
Fix Applied: No
Human Verification Required: No

## File: 05-asce-sei-7-16.mdx

### Issue 2: Table 1 caption missing ASCE/SEI reference
Location: docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/05-asce-sei-7-16.mdx:235
Category: Table
Severity: Minor
Problem: The PDF caption is "Site classification (ASCE/SEI 7-16)." but the MDX caption only says "Site classification".
Recommended Fix: Update the caption to "Site classification (ASCE/SEI 7-16)." and keep the citation component.
Fix Applied: No
Human Verification Required: No

### Issue 3: Equation 1 uses undefined upper-limit symbol
Location: docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/05-asce-sei-7-16.mdx:287
Category: Equation
Severity: Major
Problem: Equation 1 uses an upper limit of "N" in the numerator, but the equation text and where-block define "n" as the number of layers. The PDF equation uses the same index for both sums.
Recommended Fix: Change the numerator upper limit from "N" to "n" so both sums use the same index.
Fix Applied: No
Human Verification Required: No

### Issue 4: Equation 3 uses inconsistent summation index
Location: docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/05-asce-sei-7-16.mdx:318
Category: Equation
Severity: Major
Problem: Equation 3 uses "n" in the numerator and "m" in the denominator, but no "m" is defined in the where-block and the PDF equation uses the same index for both sums.
Recommended Fix: Use the same summation index for numerator and denominator (likely "n") or define "m" if it is intended to differ.
Fix Applied: No
Human Verification Required: No

## File: 06-asce-sei-7-22.mdx

### Issue 5: Table 2 caption missing ASCE/SEI reference
Location: docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/06-asce-sei-7-22.mdx:174
Category: Table
Severity: Minor
Problem: The PDF caption is "Site classification (ASCE/SEI 7-22)." but the MDX caption only says "Site classification".
Recommended Fix: Update the caption to "Site classification (ASCE/SEI 7-22)." and keep the citation component.
Fix Applied: No
Human Verification Required: No

## File: 08-appendix-acronym-list.mdx

### Issue 6: Appendix title punctuation mismatch
Location: docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/08-appendix-acronym-list.mdx:2
Category: Text
Severity: Minor
Problem: The PDF uses "Appendix A. Acronym List" but the front matter title is "Appendix A - Acronym List".
Recommended Fix: Update the front matter title to "Appendix A. Acronym List".
Fix Applied: No
Human Verification Required: No

### Issue 7: Appendix heading text mismatch
Location: docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/v1.0/08-appendix-acronym-list.mdx:18
Category: Text
Severity: Minor
Problem: The PDF uses "Appendix A. Acronym List" but the H1 heading is "Appendix A - Acronyms".
Recommended Fix: Update the H1 heading to "Appendix A. Acronym List".
Fix Applied: No
Human Verification Required: No
