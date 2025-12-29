# QC Report

Source PDF: static/source-documents/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/RMC-CPD-2023-09 - RMC Breach Toolbox.pdf
Review Date: 2025-12-28
Reviewer: Codex

## File: 04-background.mdx

### Issue 1: "mass wasting" text does not match PDF

Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/04-background.mdx:37
Category: Text
Severity: Minor
Problem: The PDF sentence reads "void collapses (mass masting)," but the MDX has "(mass wasting)."
Recommended Fix: Update the MDX to match the PDF text, or confirm whether the PDF has a typo.
Fix Applied: No
Human Verification Required: Yes

## File: 05-gross-enlargement.mdx

### Issue 2: Figure 9 caption missing citation component

Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/05-gross-enlargement.mdx:150
Category: Citation
Severity: Major
Problem: The PDF caption includes author-year text "Visser et al. 2013," but the MDX caption lacks the required <Citation citationKey="Visser2013" />.
Recommended Fix: Add <Citation citationKey="Visser2013" /> to the Figure 9 caption while keeping the author-year text.
Fix Applied: No
Human Verification Required: No

## File: 06-unraveling.mdx

### Issue 3: Missing period at end of opening sentence

Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/06-unraveling.mdx:25
Category: Text
Severity: Minor
Problem: The PDF ends the opening sentence with a period, but the MDX sentence ends without punctuation.
Recommended Fix: Add a period at the end of the sentence.
Fix Applied: No
Human Verification Required: No

### Issue 4: Equation 15 slope symbol uses zero instead of letter o

Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/06-unraveling.mdx:78
Category: Equation
Severity: Major
Problem: The PDF equation uses S*o (letter o) for slope, but the MDX equation uses S_0 (zero) in Equation 15.
Recommended Fix: Change S*{0} to S\_{o} in Equation 15.
Fix Applied: No
Human Verification Required: No

## File: 07-sinkhole.mdx

### Issue 5: Figure 22 caption uses "phi" text instead of Greek phi symbol

Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/07-sinkhole.mdx:67
Category: Figure
Severity: Minor
Problem: The PDF Figure 22 caption uses the Greek phi symbol (&#x03C6;) in Nc&phi; and &phi;, but the MDX caption/alt text uses the literal text "phi".
Recommended Fix: Replace "phi" with the Greek phi symbol using &phi; in the Figure 22 alt/caption (e.g., N<sub>c&phi;</sub> and &phi;).
Fix Applied: No
Human Verification Required: No

### Issue 6: Table 2 caption uses "phi" text instead of Greek phi symbol

Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/07-sinkhole.mdx:181
Category: Table
Severity: Minor
Problem: The PDF Table 2 caption uses the Greek phi symbol (&#x03C6;) in N_c&phi;,cr, but the MDX caption/alt text uses the literal text "phi".
Recommended Fix: Replace "phi" with the Greek phi symbol using &phi; in the Table 2 alt/caption (e.g., N<sub>c&phi;,cr</sub>).
Fix Applied: No
Human Verification Required: No

### Issue 7: Table 3 caption uses "phi" text instead of Greek phi symbol

Location: docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/07-sinkhole.mdx:316
Category: Table
Severity: Minor
Problem: The PDF Table 3 caption uses the Greek phi symbol (&#x03C6;) in N_c'&phi;',cr, but the MDX caption/alt text uses the literal text "phi".
Recommended Fix: Replace "phi" with the Greek phi symbol using &phi; in the Table 3 alt/caption (e.g., N<sub>c'&phi;',cr</sub>).
Fix Applied: No
Human Verification Required: No
