# QC Report

Source PDF: static/source-documents/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/RMC-CPD-2023-05 - RMC Backward Erosion Piping (Initiation) Toolbox.pdf
Review Date: 2025-12-28
Reviewer: Codex

## File: 00-document-info.mdx

### Issue 1: Author name formatting mismatch
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/00-document-info.mdx:7
Category: Text
Severity: Minor
Problem: The PDF shows "Tim O'Leary, Risk Management Center" but the MDX has "Tim  O'Leary, Risk Management Center" (extra space and apostrophe style mismatch).
Recommended Fix: Update the author string to "Tim O'Leary, Risk Management Center".
Fix Applied: No
Human Verification Required: No

### Issue 2: Subject term misspelling
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/00-document-info.mdx:10
Category: Text
Severity: Minor
Problem: The subject terms list contains "intiation" but the PDF shows "initiation".
Recommended Fix: Change "intiation" to "initiation".
Fix Applied: No
Human Verification Required: No

## File: 04-background.mdx

### Issue 3: Missing author-year text for EM 1110-2-1913 citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:47
Category: Citation
Severity: Major
Problem: The PDF shows "Engineer Manual (EM) 1110-2-1913 (USACE 2000)" but the MDX omits the "USACE 2000" author-year text before the citation component.
Recommended Fix: Add "USACE 2000" in the text (e.g., "Engineer Manual (EM) 1110-2-1913 (USACE 2000)") and keep the existing <Citation citationKey="USACE2000" />.
Fix Applied: No
Human Verification Required: No

### Issue 4: Missing author-year text for TM 3-424 citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:52
Category: Citation
Severity: Major
Problem: The PDF shows "Technical Manual (TM) 3-424 (USACE 1956)" but the MDX omits the "USACE 1956" author-year text before the citation component.
Recommended Fix: Add "USACE 1956" in the text (e.g., "Technical Manual (TM) 3-424 (USACE 1956)") and keep the existing <Citation citationKey="USACE1956" />.
Fix Applied: No
Human Verification Required: No

### Issue 5: Missing author-year text for EM 1110-2-1913 citation in errors sentence
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:58
Category: Citation
Severity: Major
Problem: The PDF shows "EM 1110-2-1913 (USACE 2000)" but the MDX omits the "USACE 2000" author-year text before the citation component.
Recommended Fix: Add "USACE 2000" in the text and keep the existing <Citation citationKey="USACE2000" />.
Fix Applied: No
Human Verification Required: No

### Issue 6: Missing division symbol in L2/d ratio
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:63
Category: Equation
Severity: Major
Problem: The PDF shows the ratio as L2/d = 1, but the MDX text renders it as L2d = 1 (missing the "/").
Recommended Fix: Update the inline expression to _L<sub>2</sub>/d_ = 1.
Fix Applied: No
Human Verification Required: No

### Issue 7: Missing author-year text for Batool 2013 citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:64
Category: Citation
Severity: Major
Problem: The PDF shows "(Batool 2013)" but the MDX only includes the citation component without the "Batool 2013" author-year text.
Recommended Fix: Insert "Batool 2013" before the <Citation citationKey="Batool2013" />.
Fix Applied: No
Human Verification Required: No

### Issue 8: Figure 8 caption and alt text missing division symbol
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:73
Category: Figure
Severity: Minor
Problem: The PDF caption reads "L2/d > 1" but the MDX figure alt/caption text uses "L2d > 1" (missing the "/").
Recommended Fix: Update the Figure 8 alt and caption text to "L2/d > 1".
Fix Applied: No
Human Verification Required: No

### Issue 9: Missing author-year text for DIVR 1110-1-400 citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:137
Category: Citation
Severity: Major
Problem: The PDF shows "DIVR 1110-1-400 (USACE 1998)" but the MDX omits the "USACE 1998" author-year text before the citation component.
Recommended Fix: Add "USACE 1998" in the text and keep the existing <Citation citationKey="USACE1998" />.
Fix Applied: No
Human Verification Required: No

### Issue 10: Table 2 soil type label mismatch
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:231
Category: Table
Severity: Major
Problem: The PDF table lists the soil type as "Clay and silty clay" but the MDX table row label is "Clay".
Recommended Fix: Update the Table 2 soil type label to "Clay and silty clay".
Fix Applied: No
Human Verification Required: No

### Issue 11: Extra subscript formatting in L2 reference
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/04-background.mdx:111
Category: MDX
Severity: Minor
Problem: The MDX renders "_L<sub>2</sub>_<sub> </sub>for" with an extra subscript tag, but the PDF text reads "L2 for the appropriate cases" without the extra formatting.
Recommended Fix: Replace "_L<sub>2</sub>_<sub> </sub>for" with "_L<sub>2</sub>_ for" to match the PDF.
Fix Applied: No
Human Verification Required: No

## File: 05-blanket-theory-transformation.mdx

### Issue 12: Figure 11 caption and alt text typo
Location: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/05-blanket-theory-transformation.mdx:99
Category: Figure
Severity: Minor
Problem: The PDF caption uses "Landside blanket" but the MDX figure alt/caption text says "Landslide blanket".
Recommended Fix: Change "Landslide" to "Landside" in the Figure 11 alt and caption text.
Fix Applied: No
Human Verification Required: No
