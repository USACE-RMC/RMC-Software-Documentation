# QC Report

Source PDF: static/source-documents/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/RMC-CPD-2023-11 - RMC Pipe Service Life Toolbox.pdf
Review Date: 2025-12-22
Reviewer: Codex

## File: 04-background.mdx

### Issue 1: Missing citation component for USACE 2020

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/04-background.mdx:121
Category: Citation
Severity: Major
Problem: The PDF cites USACE 2020 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="USACE_EM1110_2_2902_2020" /> immediately after the USACE 2020 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

## File: 05-steel-and-aluminum-pipes.mdx

### Issue 2: Trademark symbol corrupted for ALCLAD

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:36
Category: Text
Severity: Minor
Problem: The trademark symbol in ALCLAD is rendered as a garbled superscript symbol instead of the registered trademark symbol.
Recommended Fix: Replace the garbled superscript with the registered trademark symbol for ALCLAD.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 3: Trademark symbol corrupted for Galvalume

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:37
Category: Text
Severity: Minor
Problem: The trademark symbol in Galvalume is rendered as a garbled superscript symbol instead of the registered trademark symbol.
Recommended Fix: Replace the garbled superscript with the registered trademark symbol for Galvalume.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 4: Equation 1 where block uses bullets

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:88
Category: Equation
Severity: Major
Problem: The where block under Equation 1 is formatted as a bullet list instead of the required blockquote lines with double-space line breaks.
Recommended Fix: Convert the where block to blockquote lines ("> term = ..." with double spaces at line ends except the last line).
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 5: Missing citation component for USACE 2020

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:96
Category: Citation
Severity: Major
Problem: The PDF cites USACE 2020 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="USACE_EM1110_2_2902_2020" /> immediately after the USACE 2020 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 6: Equation 2 where block uses bullets

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:102
Category: Equation
Severity: Major
Problem: The where block under Equation 2 is formatted as a bullet list instead of the required blockquote lines with double-space line breaks.
Recommended Fix: Convert the where block to blockquote lines ("> term = ..." with double spaces at line ends except the last line).
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 7: Inline equation warning block left in MDX

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:110
Category: MDX
Severity: Major
Problem: The :::danger Inline Equation Detected block indicates unresolved inline math conversion, which should not remain in final content.
Recommended Fix: Replace the inline math with <EquationNoRef /> components as instructed, then remove the warning block.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 8: H20 typo in normalized flow depth

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:118
Category: Text
Severity: Minor
Problem: The normalized flow depth uses H20 (zero) instead of H2O, which does not match the PDF.
Recommended Fix: Change H20 to H2O in the normalized flow depth expression.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 9: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:173
Category: Citation
Severity: Major
Problem: The PDF shows a Potter 1988 citation here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 10: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:233
Category: Citation
Severity: Major
Problem: The PDF shows a Potter 1988 citation here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 11: Table 3 formatting warning block left in MDX

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:291
Category: MDX
Severity: Major
Problem: The :::danger warning about merged cells is still present, indicating unfinished table formatting work.
Recommended Fix: Remove the warning block and ensure the table is fully formatted to match the PDF.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 12: Table 5 caption typo (Relatove)

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:466
Category: Table
Severity: Minor
Problem: The caption reads "Relatove flow abrasiveness for rare flow" instead of "Relative" as shown in the PDF.
Recommended Fix: Correct the caption spelling to "Relative flow abrasiveness for rare flow."
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 13: Missing citation component for Potter et al. 1991

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:472
Category: Citation
Severity: Major
Problem: The PDF cites Potter et al. 1991 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="PotterLewandowskiWhite1991" /> immediately after the Potter et al. 1991 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 14: Trademark symbol corrupted for Galvalume

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:472
Category: Text
Severity: Minor
Problem: The trademark symbol in Galvalume is rendered as a garbled superscript symbol instead of the registered trademark symbol.
Recommended Fix: Replace the garbled superscript with the registered trademark symbol for Galvalume.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 15: Missing author-year text for Bednar 1989

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:477
Category: Citation
Severity: Major
Problem: The PDF shows Bednar 1989 here, but the MDX only includes <Citation citationKey="Bednar1989" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Bednar 1989") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 16: Missing author-year text for Bonds 2017

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:483
Category: Citation
Severity: Major
Problem: The PDF shows Bonds 2017 here, but the MDX only includes <Citation citationKey="Bonds2017" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Bonds 2017") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 17: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:491
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran 1998 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 18: Missing citation component for Horton et al. 2006

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:494
Category: Citation
Severity: Major
Problem: The PDF cites Horton et al. 2006 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="HortonEtAl2006" /> immediately after the Horton et al. 2006 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 19: Missing author-year text for Kroon et al. 2004

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:494
Category: Citation
Severity: Major
Problem: The PDF shows Kroon et al. 2004 here, but the MDX only includes <Citation citationKey="Kroon2004" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Kroon et al. 2004") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 20: Missing citation component for Olive et al. 1989

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:503
Category: Citation
Severity: Major
Problem: The PDF cites Olive et al. 1989 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="OliveEtAl1989" /> immediately after the Olive et al. 1989 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 21: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:505
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran 1998 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 22: Trademark symbol corrupted for ALCLAD

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:507
Category: Text
Severity: Minor
Problem: The trademark symbol in ALCLAD is rendered as a garbled superscript symbol instead of the registered trademark symbol.
Recommended Fix: Replace the garbled superscript with the registered trademark symbol for ALCLAD.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 23: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:513
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran 1998 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 24: Table 6 cell misspelling (Aggresive)

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:546
Category: Table
Severity: Minor
Problem: The table cell reads "Aggresive" instead of "Aggressive" for the None/Abrasive cell.
Recommended Fix: Correct the cell value to "Aggressive".
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 25: Table 6 cell misspelling (Aggresive)

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:551
Category: Table
Severity: Minor
Problem: The table cell reads "Aggresive" instead of "Aggressive" for the One/Non-Abrasive cell.
Recommended Fix: Correct the cell value to "Aggressive".
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 26: Table 6 caption typo (enviornment)

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:564
Category: Table
Severity: Minor
Problem: The caption misspells environment as "enviornment".
Recommended Fix: Correct the caption to "Deterioration environment."
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 27: Figure alt text typos in Step 7 figure

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:594
Category: Figure
Severity: Minor
Problem: The alt text contains typos ("worlsheet" and "pip") and does not match the PDF wording.
Recommended Fix: Update the alt text to "Step 7 of Steel and Aluminum pipe worksheet: Pipe wall thickness using pipe diameter schedule."
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 28: Figure 21 caption does not match PDF

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:595
Category: Figure
Severity: Major
Problem: The caption reads "Step 9 of Steel and Aluminum pipe worksheet: Material loss rate" but the PDF Figure 21 caption is "Step 7 ... Pipe wall thickness using pipe diameter schedule."
Recommended Fix: Update the caption to match the PDF wording for Figure 21.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 29: Missing author-year text for Bednar 1989

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:603
Category: Citation
Severity: Major
Problem: The PDF lists Bednar 1989 here, but the MDX only includes <Citation citationKey="Bednar1989" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Bednar 1989") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 30: Missing citation component for Ault and Ellor 2000

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:602
Category: Citation
Severity: Major
Problem: The PDF cites Ault and Ellor 2000 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="AultEllor2000" /> immediately after the Ault and Ellor (2000) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 31: Missing citation component for Bellair and Ewing 1984

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:603
Category: Citation
Severity: Major
Problem: The PDF cites Bellair and Ewing 1984 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="BellairEwing1984" /> immediately after the Bellair and Ewing (1984) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 32: Missing citation component for DeCou and Davies 2007

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:603
Category: Citation
Severity: Major
Problem: The PDF cites DeCou and Davies 2007 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="DeCouDavies2007" /> immediately after the DeCou and Davies (2007) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 33: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:603
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran (1998) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 34: Missing citation component for Idaho Department of Highways 1965

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:603
Category: Citation
Severity: Major
Problem: The PDF cites Idaho Department of Highways 1965 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="IdahoHighways1965" /> immediately after the Idaho Department of Highways (1965) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 35: Missing author-year text for Jacobs 1982

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:604
Category: Citation
Severity: Major
Problem: The PDF lists Jacobs 1982 here, but the MDX only includes <Citation citationKey="Jacobs1982" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Jacobs 1982") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 36: Missing author-year text for Kill 1969

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:604
Category: Citation
Severity: Major
Problem: The PDF lists Kill 1969 here, but the MDX only includes <Citation citationKey="Kill1969" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Kill 1969") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 37: Missing author-year text for Malcom 1993

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:604
Category: Citation
Severity: Major
Problem: The PDF lists Malcom 1993 here, but the MDX only includes <Citation citationKey="Malcom1993" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Malcom 1993") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 38: Missing author-year text for Meacham 1982

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:605
Category: Citation
Severity: Major
Problem: The PDF lists Meacham 1982 here, but the MDX only includes <Citation citationKey="Meacham1982" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Meacham 1982") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 39: Missing citation component for Missouri Highway and Transportation Department 1990

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:605
Category: Citation
Severity: Major
Problem: The PDF cites Missouri Highway and Transportation Department 1990 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="MoDOT1990" /> immediately after the Missouri Highway and Transportation Department (1990) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 40: Missing citation component for Potter et al. 1991

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:605
Category: Citation
Severity: Major
Problem: The PDF cites Potter et al. 1991 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="PotterLewandowskiWhite1991" /> immediately after the Potter et al. (1991) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 41: Missing citation component for Summerson and Hogan 1979

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:605
Category: Citation
Severity: Major
Problem: The PDF cites Summerson and Hogan 1979 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="SummersonHogan1979" /> immediately after the Summerson and Hogan (1979) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 42: Table 7 alt text typo (alumnium)

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:640
Category: Table
Severity: Minor
Problem: The alt text says "alumnium-zinc" instead of "aluminum-zinc".
Recommended Fix: Correct the alt text to "aluminum-zinc".
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 43: Table 7 alt text trademark symbol corrupted

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:640
Category: Table
Severity: Minor
Problem: The alt text uses a garbled trademark symbol in Galvalume instead of the registered trademark symbol.
Recommended Fix: Replace the garbled trademark symbol so the alt text uses the registered trademark symbol.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 44: Table 7 caption trademark symbol corrupted

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:641
Category: Table
Severity: Minor
Problem: The caption uses a garbled trademark symbol in Galvalume instead of the registered trademark symbol.
Recommended Fix: Replace the garbled trademark symbol so the caption uses the registered trademark symbol.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 45: Table 8 alt text trademark symbol corrupted

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:674
Category: Table
Severity: Minor
Problem: The alt text uses a garbled trademark symbol in ALCLAD instead of the registered trademark symbol.
Recommended Fix: Replace the garbled trademark symbol so the alt text uses the registered trademark symbol.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 46: Table 8 caption trademark symbol corrupted

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:675
Category: Table
Severity: Minor
Problem: The caption uses a garbled trademark symbol in ALCLAD instead of the registered trademark symbol.
Recommended Fix: Replace the garbled trademark symbol so the caption uses the registered trademark symbol.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 47: Missing citation component for Potter et al. 1991

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:687
Category: Citation
Severity: Major
Problem: The PDF cites Potter et al. 1991 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="PotterLewandowskiWhite1991" /> immediately after the Potter et al. 1991 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 48: Missing citation component for DeCou and Davies 2007

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:687
Category: Citation
Severity: Major
Problem: The PDF cites DeCou and Davies 2007 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="DeCouDavies2007" /> immediately after the DeCou and Davies 2007 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 49: Missing citation component for Bonds et al. 2005

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:689
Category: Citation
Severity: Major
Problem: The PDF cites Bonds et al. 2005 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="BondsEtAl2005" /> immediately after the Bonds et al. (2005) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 50: Missing citation component for Potter et al. 1991

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:689
Category: Citation
Severity: Major
Problem: The PDF cites Potter et al. 1991 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="PotterLewandowskiWhite1991" /> immediately after the Potter et al. (1991) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 51: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:689
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran (1998) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 52: Missing citation component for DeCou and Davies 2007

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/05-steel-and-aluminum-pipes.mdx:689
Category: Citation
Severity: Major
Problem: The PDF cites DeCou and Davies 2007 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="DeCouDavies2007" /> immediately after the DeCou and Davies (2007) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

## File: 06-concrete-pipe.mdx

### Issue 53: Missing citation component for USACE 2020

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/06-concrete-pipe.mdx:49
Category: Citation
Severity: Major
Problem: The PDF cites USACE 2020 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="USACE_EM1110_2_2902_2020" /> immediately after the USACE 2020 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 54: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/06-concrete-pipe.mdx:66
Category: Citation
Severity: Major
Problem: The PDF shows a Potter 1988 citation here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 55: Missing author-year text for Hershfield 1974

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/06-concrete-pipe.mdx:72
Category: Citation
Severity: Major
Problem: The PDF shows Hershfield (1974) here, but the MDX only includes <Citation citationKey="Hershfield1974" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Hershfield 1974") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 56: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/06-concrete-pipe.mdx:78
Category: Citation
Severity: Major
Problem: The PDF shows a Potter 1988 citation here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 57: Missing citation component for Haavik and Mielenz 1991

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/06-concrete-pipe.mdx:84
Category: Citation
Severity: Major
Problem: The PDF cites Haavik and Mielenz 1991 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="HaavikMielenz1991" /> immediately after the Haavik and Mielenz 1991 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

## File: 07-iron-pipe.mdx

### Issue 58: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:97
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran 1998 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 59: Missing author-year text for Kroon et al. 2004

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:98
Category: Citation
Severity: Major
Problem: The PDF shows Kroon et al. 2004 here, but the MDX only includes <Citation citationKey="Kroon2004" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Kroon et al. 2004") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 60: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:98
Category: Citation
Severity: Major
Problem: The PDF shows Potter 1988 here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 61: Missing author-year text for Kroon et al. 2004

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:120
Category: Citation
Severity: Major
Problem: The PDF shows Kroon et al. 2004 here, but the MDX only includes <Citation citationKey="Kroon2004" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Kroon et al. 2004") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 62: Missing citation component for Bonds et al. 2005

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:120
Category: Citation
Severity: Major
Problem: The PDF cites Bonds et al. 2005 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="BondsEtAl2005" /> immediately after the Bonds et al. (2005) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 63: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:120
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran (1998) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 64: Missing citation component for DIPRA 2017

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:121
Category: Citation
Severity: Major
Problem: The PDF cites DIPRA 2017 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="DIPRA_PolyEnc2017" /> immediately after the DIPRA (2017) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 65: Missing citation component for Szeliga and Simpson 2003

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/07-iron-pipe.mdx:121
Category: Citation
Severity: Major
Problem: The PDF cites Szeliga and Simpson 2003 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="SzeligaSimpson2003" /> immediately after the Szeliga and Simpson (2003) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

## File: 08-plastic-pipe.mdx

### Issue 66: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/08-plastic-pipe.mdx:29
Category: Citation
Severity: Major
Problem: The PDF shows a Potter 1988 citation here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 67: Missing author-year text for Gassman et al. 2005

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/08-plastic-pipe.mdx:33
Category: Citation
Severity: Major
Problem: The PDF shows Gassman et al. (2005) here, but the MDX only includes <Citation citationKey="Gassman2005" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Gassman et al. 2005") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 68: Missing citation component for Nelson and Krauss 2002

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/08-plastic-pipe.mdx:33
Category: Citation
Severity: Major
Problem: The PDF cites Nelson and Krauss 2002 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="NelsonKrauss2002" /> immediately after the Nelson and Krauss (2002) text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 69: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/08-plastic-pipe.mdx:50
Category: Citation
Severity: Major
Problem: The PDF shows a Potter 1988 citation here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

## File: 09-clay-pipe.mdx

### Issue 70: Missing citation component for Gabriel and Moran 1998

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/09-clay-pipe.mdx:30
Category: Citation
Severity: Major
Problem: The PDF cites Gabriel and Moran 1998 here, but the MDX only includes the raw author-year text without a <Citation> component.
Recommended Fix: Add <Citation citationKey="GabrielMoran1998" /> immediately after the Gabriel and Moran 1998 text.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 71: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/09-clay-pipe.mdx:30
Category: Citation
Severity: Major
Problem: The PDF shows Potter 1988 here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]

### Issue 72: Missing author-year text for Potter 1988

Location: docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/09-clay-pipe.mdx:55
Category: Citation
Severity: Major
Problem: The PDF shows a Potter 1988 citation here, but the MDX only includes <Citation citationKey="Potter1988" /> without the raw author-year text.
Recommended Fix: Add the raw author-year text (e.g., "Potter 1988") adjacent to the citation component.
Fix Applied: Yes
Human Verification Required: No
Addressed: [x]
