# QC Report

Source PDF: static/source-documents/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/RMC-CPD-2023-04 - RMC Filter Evaluation (Continuation) Toolbox.pdf
Review Date: 2025-12-22
Reviewer: Codex

## File: 00-document-info.mdx

### Issue 1: Corrupted quote characters in abstract
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/00-document-info.mdx:8
Category: Text
Severity: Major
Problem: The abstract contains garbled quote characters around the phrase continuing erosion, which does not match the PDF typography.
Recommended Fix: Replace the garbled quote characters with standard quotes around continuing erosion.
Fix Applied: No
Human Verification Required: No

## File: 00-version-history.mdx

### Issue 2: Extra version history page not in PDF
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/00-version-history.mdx:17
Category: Text
Severity: Major
Problem: The PDF does not include a Version History section/page, but the MDX includes a Version History page with a table.
Recommended Fix: Remove this MDX page or replace it with content that appears in the PDF; confirm with the source owner if a Version History page is intended.
Fix Applied: No
Human Verification Required: Yes

## File: 01-preface.mdx

### Issue 3: Heading uses Introduction instead of Preface
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/01-preface.mdx:15
Category: Text
Severity: Major
Problem: The H1 heading is Introduction, but this section is the Preface and should remain Preface per QC rules.
Recommended Fix: Change the H1 heading to Preface.
Fix Applied: No
Human Verification Required: No

## File: 02-terms-and-conditions-for-use.mdx

### Issue 4: Garbled quotes around organization names
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/02-terms-and-conditions-for-use.mdx:21
Category: Text
Severity: Major
Problem: The sentence introducing IWR, RMC, HEC, and IWR Software contains garbled quote characters and apostrophes.
Recommended Fix: Replace the garbled characters so the sentence reads with normal quotes and apostrophes (e.g., IWR, RMC, HEC, and IWR Software).
Fix Applied: No
Human Verification Required: No

### Issue 5: Garbled apostrophe in IWR's
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/02-terms-and-conditions-for-use.mdx:27
Category: Text
Severity: Major
Problem: The phrase IWRs technical centers uses a garbled apostrophe and does not render as IWR's.
Recommended Fix: Replace the garbled character so the text reads IWR's technical centers.
Fix Applied: No
Human Verification Required: No

### Issue 6: Garbled quotes around AS IS
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/02-terms-and-conditions-for-use.mdx:37
Category: Text
Severity: Major
Problem: The phrase AS IS contains garbled quote characters.
Recommended Fix: Replace the garbled characters with normal quotes around AS IS.
Fix Applied: No
Human Verification Required: No

### Issue 7: Garbled apostrophe in GOVERNMENT'S
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/02-terms-and-conditions-for-use.mdx:41
Category: Text
Severity: Major
Problem: The phrase UNITED STATES GOVERNMENT'S has a garbled apostrophe.
Recommended Fix: Replace the garbled character so the text reads GOVERNMENT'S.
Fix Applied: No
Human Verification Required: No

### Issue 8: Garbled apostrophe in attorneys' fees
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/02-terms-and-conditions-for-use.mdx:45
Category: Text
Severity: Major
Problem: The phrase attorneys' fees has a garbled apostrophe.
Recommended Fix: Replace the garbled character so the text reads attorneys' fees.
Fix Applied: No
Human Verification Required: No

## File: 03-general-overview.mdx

### Issue 9: Garbled quotes around Enable Content
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/03-general-overview.mdx:29
Category: Text
Severity: Major
Problem: The phrase Enable Content contains garbled quote characters.
Recommended Fix: Replace the garbled characters with normal quotes around Enable Content.
Fix Applied: No
Human Verification Required: No

### Issue 10: Garbled apostrophe in computer's
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/03-general-overview.mdx:30
Category: Text
Severity: Major
Problem: The word computer's has a garbled apostrophe.
Recommended Fix: Replace the garbled character so the text reads computer's.
Fix Applied: No
Human Verification Required: No

### Issue 11: Missing space in version number phrase
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/03-general-overview.mdx:62
Category: Text
Severity: Minor
Problem: The sentence reads versionnumber,which without spaces.
Recommended Fix: Update to version number, which to match the PDF.
Fix Applied: No
Human Verification Required: No

### Issue 12: Garbled quotes around adapted from/from
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/03-general-overview.mdx:137
Category: Text
Severity: Major
Problem: The sentence describing citations uses garbled quote characters around adapted from and from.
Recommended Fix: Replace the garbled characters with normal quotes around adapted from and from.
Fix Applied: No
Human Verification Required: No

## File: 04-background.mdx

### Issue 13: Figure 8 caption missing FEMA 2011 citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/04-background.mdx:37
Category: Citation
Severity: Major
Problem: The PDF caption includes author-year text for FEMA 2011, but the MDX caption lacks both the author-year text and the required <Citation>.
Recommended Fix: Add the author-year text FEMA (2011) to the Figure 8 caption and include <Citation citationKey="FEMA2011" />.
Fix Applied: No
Human Verification Required: No

### Issue 14: Missing author-year text for FEMA (2011)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/04-background.mdx:40
Category: Citation
Severity: Major
Problem: The PDF uses FEMA (2011), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to FEMA (2011) and keep <Citation citationKey="FEMA2011" />.
Fix Applied: No
Human Verification Required: No

### Issue 15: Garbled quotes around d and D
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/04-background.mdx:46
Category: Text
Severity: Major
Problem: The lowercase d and uppercase D are wrapped in garbled quote characters.
Recommended Fix: Replace the garbled characters with normal quotes so the text reads lowercase "d" and uppercase "D".
Fix Applied: No
Human Verification Required: No

## File: 05-filter-gradation.mdx

### Issue 16: Missing author-year text for FEMA (2011)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/05-filter-gradation.mdx:86
Category: Citation
Severity: Major
Problem: The PDF uses FEMA (2011), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to FEMA (2011) and keep <Citation citationKey="FEMA2011" />.
Fix Applied: No
Human Verification Required: No

## File: 06-base-gradation.mdx

### Issue 17: Typo in step 1 description
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/06-base-gradation.mdx:25
Category: Text
Severity: Minor
Problem: The sentence contains the typo teh and includes the extra word detailed, which does not appear in the PDF.
Recommended Fix: Correct to the base soil is the same as the filter material.
Fix Applied: No
Human Verification Required: No

### Issue 18: Missing author-year text for Sherard and Dunnigan (1989)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/06-base-gradation.mdx:29
Category: Citation
Severity: Major
Problem: The PDF uses Sherard and Dunnigan (1989), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Sherard and Dunnigan (1989) and keep <Citation citationKey="Sherard1989" />.
Fix Applied: No
Human Verification Required: No

### Issue 19: Figure 17 caption missing USBR 2011 citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/06-base-gradation.mdx:105
Category: Citation
Severity: Major
Problem: The PDF caption includes author-year text for USBR 2011, but the MDX caption lacks both the author-year text and the required <Citation>.
Recommended Fix: Add the author-year text USBR (2011) to the Figure 17 caption and include <Citation citationKey="USBR2011" />.
Fix Applied: No
Human Verification Required: No

## File: 07-design-for-particle-retention.mdx

### Issue 20: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/07-design-for-particle-retention.mdx:23
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 21: Missing author-year text for Foster and Fell (2001) and Sherard et al. (1984)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/07-design-for-particle-retention.mdx:54
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001) and Sherard et al. (1984), but the MDX only includes <Citation> tags without the author-year text.
Recommended Fix: Update the sentence to include Foster and Fell (2001) and Sherard et al. (1984), keeping the existing citations.
Fix Applied: No
Human Verification Required: No

### Issue 22: Missing author-year text for Sherard and Dunnigan (1985)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/07-design-for-particle-retention.mdx:58
Category: Citation
Severity: Major
Problem: The PDF uses Sherard and Dunnigan (1985), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Sherard and Dunnigan (1985) and keep <Citation citationKey="Sherard1985" />.
Fix Applied: No
Human Verification Required: No

### Issue 23: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/07-design-for-particle-retention.mdx:59
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 24: Missing author-year text for FEMA (2011)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/07-design-for-particle-retention.mdx:61
Category: Citation
Severity: Major
Problem: The PDF uses FEMA (2011), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to FEMA (2011) and keep <Citation citationKey="FEMA2011" />.
Fix Applied: No
Human Verification Required: No

### Issue 25: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/07-design-for-particle-retention.mdx:70
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

## File: 08-foster-and-fell.mdx

### Issue 26: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:23
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 27: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:27
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 28: Figure 23 caption missing adapted-from citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:41
Category: Citation
Severity: Major
Problem: The PDF caption includes adapted from Foster and Fell (2001), but the MDX caption lacks the author-year text and <Citation>.
Recommended Fix: Add adapted from Foster and Fell (2001) to the caption and include <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 29: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:45
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 30: Missing author-year text for FEMA (2011)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:51
Category: Citation
Severity: Major
Problem: The PDF uses FEMA (2011), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to FEMA (2011) and keep <Citation citationKey="FEMA2011" />.
Fix Applied: No
Human Verification Required: No

### Issue 31: Missing author-year text for Fell et al. (2008)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:57
Category: Citation
Severity: Major
Problem: The PDF uses Fell et al. (2008), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Fell et al. (2008) and keep <Citation citationKey="Toolbox2008" />.
Fix Applied: No
Human Verification Required: No

### Issue 32: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:69
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 33: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:106
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 34: Figure 28 caption text does not match PDF
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:114
Category: Figure
Severity: Major
Problem: The PDF caption is Step 4 of Foster and Fell worksheet: Continuing erosion boundary, but the MDX caption repeats the No-erosion boundary text.
Recommended Fix: Update the Figure 28 caption to Step 4 of Foster and Fell worksheet: Continuing erosion boundary.
Fix Applied: No
Human Verification Required: No

### Issue 35: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:119
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 36: Missing author-year text for Foster and Fell (2001) and Fell et al. (2008)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:122
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001) and Fell et al. (2008), but the MDX only includes <Citation> tags without the author-year text.
Recommended Fix: Update the sentence to include both author-year texts and keep the existing citations.
Fix Applied: No
Human Verification Required: No

### Issue 37: Figure 29 caption missing Fell et al. (2008) citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:129
Category: Citation
Severity: Major
Problem: The PDF caption includes adapted from Fell et al. (2008), but the MDX caption lacks the author-year text and <Citation>.
Recommended Fix: Add adapted from Fell et al. (2008) to the caption and include <Citation citationKey="Toolbox2008" />.
Fix Applied: No
Human Verification Required: No

### Issue 38: Missing author-year text for Fell et al. (2008)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:149
Category: Citation
Severity: Major
Problem: The PDF uses Fell et al. (2008), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Fell et al. (2008) and keep <Citation citationKey="Toolbox2008" />.
Fix Applied: No
Human Verification Required: No

### Issue 39: Missing author-year text for Fell et al. (2008)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/08-foster-and-fell.mdx:174
Category: Citation
Severity: Major
Problem: The PDF uses Fell et al. (2008), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Fell et al. (2008) and keep <Citation citationKey="Toolbox2008" />.
Fix Applied: No
Human Verification Required: No

## File: 10-constricted-exit.mdx

### Issue 40: Missing author-year text for Fell and Foster (2023)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx:67
Category: Citation
Severity: Major
Problem: The PDF uses Fell and Foster (2023), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Fell and Foster (2023) and keep <Citation citationKey="Toolbox2023" />.
Fix Applied: No
Human Verification Required: No

### Issue 41: Missing author-year text for Sherard et al. (1984)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx:68
Category: Citation
Severity: Major
Problem: The PDF uses Sherard et al. (1984), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Sherard et al. (1984) and keep <Citation citationKey="Sherard1984" />.
Fix Applied: No
Human Verification Required: No

### Issue 42: Missing author-year text for Foster and Fell (2001)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx:70
Category: Citation
Severity: Major
Problem: The PDF uses Foster and Fell (2001), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Foster and Fell (2001) and keep <Citation citationKey="FosterFell2001" />.
Fix Applied: No
Human Verification Required: No

### Issue 43: Table caption missing Fell and Foster (2023) citation
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx:88
Category: Citation
Severity: Major
Problem: The PDF caption includes Fell and Foster (2023), but the MDX table caption lacks the author-year text and <Citation>.
Recommended Fix: Add Fell and Foster (2023) to the table caption and include <Citation citationKey="Toolbox2023" />.
Fix Applied: No
Human Verification Required: No

### Issue 44: Missing author-year text for Fell and Foster (2023)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx:102
Category: Citation
Severity: Major
Problem: The PDF uses Fell and Foster (2023), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to Fell and Foster (2023) and keep <Citation citationKey="Toolbox2023" />.
Fix Applied: No
Human Verification Required: No

## File: 11-permeability.mdx

### Issue 45: Missing author-year text for FEMA (2011)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/11-permeability.mdx:30
Category: Citation
Severity: Major
Problem: The PDF uses FEMA (2011), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to FEMA (2011) and keep <Citation citationKey="FEMA2011" />.
Fix Applied: No
Human Verification Required: No

### Issue 46: Missing author-year text for USACE (2005)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/11-permeability.mdx:58
Category: Citation
Severity: Major
Problem: The PDF uses USACE (2005), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to USACE (2005) and keep <Citation citationKey="USACE2005" />.
Fix Applied: No
Human Verification Required: No

### Issue 47: Missing author-year text for USBR (2011)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/11-permeability.mdx:59
Category: Citation
Severity: Major
Problem: The PDF uses USBR (2011), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to USBR (2011) and keep <Citation citationKey="USBR2011" />.
Fix Applied: No
Human Verification Required: No

### Issue 48: Missing author-year text for NRCS (2017)
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/11-permeability.mdx:60
Category: Citation
Severity: Major
Problem: The PDF uses NRCS (2017), but the MDX only includes a <Citation> without the author-year text.
Recommended Fix: Update the text to NRCS (2017) and keep <Citation citationKey="USDA2017" />.
Fix Applied: No
Human Verification Required: No

## File: 13-appendix-acronyms.mdx

### Issue 49: NRCS acronym expanded incorrectly
Location: docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/13-appendix-acronyms.mdx:34
Category: Text
Severity: Major
Problem: NRCS is expanded as Natural Resource Conservation Center, but the PDF refers to Natural Resources Conservation Service.
Recommended Fix: Update the NRCS expansion to Natural Resources Conservation Service.
Fix Applied: No
Human Verification Required: No
