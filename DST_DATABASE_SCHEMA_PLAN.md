# Implementation Plan: DST Database Schema Document

## Purpose

Create a standalone, multi-chapter MDX document within the RMC Software Documentation site that serves as the authoritative reference for the Dam Screening Tool (DST) database schema. The document will use custom React components to present tables, relationships, and module structure in a visual, navigable, and impressive format — suitable for both technical developers and engineering stakeholders.

## Source Repository

The DST application source code lives in a separate repository (`DST-Mockup`) which the implementing agent will **not** have access to. All schema data needed to write the MDX content is embedded in Appendix A of this plan. Do not invent or guess column definitions — use only what is provided in Appendix A.

---

## File Structure

### Document Location

Following the established Docusaurus convention in this repo (see LST user's guide as reference), the document lives at:

```
docs/web-applications/dst/database-schema/v1.0/
├── 00-document-info.mdx            Chapter 0: Document metadata, version history
├── 01-overview.mdx                 Chapter 1: Interactive module map + design principles
├── 02-screening-management.mdx     Chapter 2: Screenings table, codes, top-level structure
├── 03-dam-information.mdx          Chapter 3: Dam metadata, reservoir, spillway, embankment tables
├── 04-hazards.mdx                  Chapter 4: Hydrologic and seismic hazard tables
├── 05-failure-mode-screening.mdx   Chapter 5: FM screening and selection tables
├── 06-pfm-01.mdx                   Chapter 6: PFM-01 Overtopping Erosion (4 tables, fully implemented)
├── 07-pfm-02-through-09.mdx        Chapter 7: PFM-02 through PFM-09 (planned, pattern reference)
├── 08-pfm-10-through-33.mdx        Chapter 8: PFM-10 through PFM-33 (planned, pattern reference)
├── 09-consequences.mdx             Chapter 9: Consequence estimation tables
├── 10-risk-analysis.mdx            Chapter 10: Risk computation and results tables
├── 11-auth-and-system.mdx          Chapter 11: Authentication, users, roles, dashboard tables
├── 12-documents.mdx                Chapter 12: Document management / attachments tables
├── 13-design-patterns.mdx          Chapter 13: Cross-cutting patterns (GUID PKs, JSONB, SRP 3-table, timestamps, naming conventions)
└── 14-appendix-full-table-list.mdx Chapter 14: Alphabetical index of every table with links
```

### Custom React Components

New components live in the existing component directory:

```
src/components/
├── SchemaTable.js          New: Renders a single DB table as a styled card
├── SchemaGroup.js          New: Groups related tables with visual relationship lines
├── ModuleMap.js            New: Interactive SVG module-level overview diagram
└── SchemaTag.js            New: Small inline badge for column metadata (PK, FK, type, etc.)
```

### Component Styles

```
src/css/
└── schema.css              New: All schema component styles (follows tables.css patterns)
```

---

## Custom React Component Designs

### 1. SchemaTag

A small inline badge/chip used within SchemaTable to annotate columns.

**Purpose:** Visually distinguish column metadata (primary key, foreign key, data type, nullable, indexed, JSONB) at a glance without cluttering the table with text.

**Props:**

```javascript
SchemaTag({
  type,     // Required: "pk" | "fk" | "type" | "nullable" | "indexed" | "jsonb" | "unique" | "default" | "cascade"
  children, // Required: Display text (e.g., "UUID", "→ Pfm01", "JSONB")
})
```

**Rendering:**

```
┌──────────────────────────────────┐
│  PK   FK → Pfm01   JSONB   ?    │  ← Small rounded pills, color-coded by type
└──────────────────────────────────┘
```

**Color Scheme (light / dark mode):**

| Type       | Light Background | Dark Background | Text Color    | Example          |
|------------|------------------|-----------------|---------------|------------------|
| `pk`       | amber-100        | amber-900       | amber-800     | `PK`             |
| `fk`       | blue-100         | blue-900        | blue-800      | `→ Pfm01`        |
| `type`     | gray-100         | gray-800        | gray-700      | `UUID`, `VARCHAR` |
| `nullable` | slate-100        | slate-800       | slate-600     | `?`              |
| `indexed`  | violet-100       | violet-900      | violet-800    | `IDX`            |
| `jsonb`    | emerald-100      | emerald-900     | emerald-800   | `JSONB`          |
| `unique`   | orange-100       | orange-900      | orange-800    | `UQ`             |
| `default`  | stone-100        | stone-800       | stone-600     | `= 'dst'`        |
| `cascade`  | red-100          | red-900         | red-800       | `CASCADE`        |

**Styling:** Tailwind utility classes. `inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium`. Dark mode via `[data-theme="dark"]` overrides, following the existing pattern in `custom.css`.

---

### 2. SchemaTable

Renders a single database table as a styled, self-contained card. This is the primary building block of the document.

**Purpose:** Present one database table with its columns, types, constraints, and descriptions in a visually rich card format that's far more readable than a raw markdown table.

**Props:**

```javascript
SchemaTable({
  name,           // Required: Table name (e.g., "Pfm01")
  description,    // Required: One-line table purpose
  status,         // Optional: "implemented" | "planned" | "partial" — default "implemented"
  columns,        // Required: Array of column definition objects (see below)
  notes,          // Optional: Array of strings — rendered as footnotes below the table
  jsonSchemas,    // Optional: Array of { name, description, structure } — expandable JSONB column docs
  id,             // Optional: HTML id for anchor linking
})
```

**Column Definition Object:**

```javascript
{
  name: "Pfm01Id",                    // Column name as it appears in the database
  type: "UUID",                       // PostgreSQL type
  tags: ["fk", "unique", "indexed"],  // Array of SchemaTag types to render
  fkTarget: "Pfm01",                  // If FK: target table name (renders as link)
  default: "'dst'",                   // Default value, if any
  nullable: false,                    // Whether column is nullable
  description: "Foreign key to parent PFM-01 location",  // Human-readable description
}
```

**Visual Layout:**

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────┐                                                    │
│  │  TABLE   │  Pfm01_DstSrp                      ● Implemented  │
│  └─────────┘                                                    │
│  Stores DST-calculated SRP curves and nodal probability tables  │
│                                                                 │
│  ┬─────────────────┬───────────┬─────────────┬────────────────┐ │
│  │ Column           │ Type      │ Constraints │ Description    │ │
│  ┼─────────────────┼───────────┼─────────────┼────────────────┤ │
│  │ Id               │ UUID      │ PK          │ Primary key    │ │
│  │ Pfm01Id          │ UUID      │ FK → Pfm01  │ Parent ref     │ │
│  │                  │           │ UQ IDX      │                │ │
│  │ CurvesJson       │ JSONB     │ ? JSONB     │ 50-pt curves   │ │
│  │ NodalJson        │ JSONB     │ ? JSONB     │ Nodal table    │ │
│  │ LastCalculatedAt │ TIMESTAMP │ ?           │ Last calc time │ │
│  │ LastNodalEditAt  │ TIMESTAMP │ ?           │ Last nodal ed. │ │
│  └─────────────────┴───────────┴─────────────┴────────────────┘ │
│                                                                 │
│  ▸ CurvesJson Structure (click to expand)                       │
│  ▸ NodalJson Structure (click to expand)                        │
│                                                                 │
│  Notes:                                                         │
│  1. JSONB columns allow PostgreSQL to index and query JSON data │
│  2. CurvesJson stores raw 50-point curves from System-Response  │
└─────────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**
- The card has a subtle left border colored by status: teal (implemented), amber (partial), gray (planned)
- Column rows use zebra striping following `tables.css` pattern
- FK column names are clickable links that scroll to the target SchemaTable on the same page (or link to another chapter)
- JSONB columns get expandable detail sections (`<details>` rendered as styled accordion)
- The status badge uses the same SchemaTag component
- Responsive: on narrow screens the constraints column wraps tags vertically

**Styling Approach:**
- Outer card: `border rounded-lg shadow-sm` with Tailwind, left border colored by status
- Header: table name in `text-h3` weight with description in `text-normal text-font-color/70`
- Column grid: CSS Grid (not `<table>`) for better responsive control. 4 columns: `[name 25%] [type 12%] [constraints auto] [description 1fr]`
- Tags rendered inline via SchemaTag
- Dark mode: card background `bg-[var(--ifm-background-surface-color)]`, borders from `--border-color`

---

### 3. SchemaGroup

Groups related tables (e.g., the 4 PFM-01 tables) with a header, description, and visual relationship indicators.

**Purpose:** Show how tables within a module relate to each other — the "mini ER diagram" for a specific module, rendered as connected SchemaTable cards rather than a separate diagram.

**Props:**

```javascript
SchemaGroup({
  title,          // Required: Group name (e.g., "PFM-01: Overtopping Erosion")
  description,    // Optional: Group-level description
  relationships,  // Required: Array of relationship descriptors (see below)
  children,       // Required: SchemaTable components as children
  id,             // Optional: HTML id for anchor linking
})
```

**Relationship Descriptor:**

```javascript
{
  from: "Pfm01",            // Source table name
  to: "Pfm01_DstSrp",      // Target table name
  type: "one-to-one",       // "one-to-one" | "one-to-many" | "many-to-many"
  label: "CASCADE DELETE",   // Optional label on the relationship line
  onDelete: "cascade",       // Optional: "cascade" | "restrict" | "set-null"
}
```

**Visual Layout:**

```
╔═══════════════════════════════════════════════════════════════════╗
║  PFM-01: Overtopping Erosion                                     ║
║  Each row represents one PFM location. The three-table SRP       ║
║  pattern preserves data when switching between DST and User mode. ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ┌──────────────────────────┐                                     ║
║  │        Pfm01             │ ← Main entity card                  ║
║  └──────────┬───────────────┘                                     ║
║             │                                                     ║
║     ┌───────┼───────┬───────────────┐                             ║
║     │ 1:1   │ 1:1   │ 1:1           │  ← Relationship lines      ║
║     ▼       ▼       ▼               │                             ║
║  ┌────────┐ ┌────────┐ ┌──────────┐ │                             ║
║  │ DstSrp │ │UserSrp │ │ActiveSrp │ │                             ║
║  └────────┘ └────────┘ └──────────┘ │                             ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Key Design Decisions:**
- Relationship lines are rendered with CSS (borders + pseudo-elements), not SVG. This keeps them responsive, theme-aware, and simple to maintain. Vertical/horizontal lines connect cards using CSS Grid positioning.
- The group wrapper uses a prominent header bar in `--ifm-color-primary` (same teal as site header)
- Relationship annotations (1:1, 1:N, CASCADE) appear as small labels on the lines
- On mobile, the relationship lines collapse and cards stack vertically with text-based relationship indicators instead

**Styling Approach:**
- Outer: `border-2 rounded-xl` with header in primary color
- Layout: CSS Grid with named areas for positioning cards in the relationship diagram
- Lines: `border-l-2 border-t-2` pseudo-elements with `absolute` positioning, colored with `--border-color`
- Mobile fallback: `@media (max-width: 900px)` switches to vertical stack with text labels

---

### 4. ModuleMap

An interactive SVG-based overview diagram showing all application modules and their high-level relationships. This is the "hero" visualization on the overview page.

**Purpose:** Give readers an immediate, visual understanding of the entire DST database architecture — which modules exist, how many tables each contains, and how modules relate to each other. Clicking a module navigates to its chapter.

**Props:**

```javascript
ModuleMap({
  modules,        // Required: Array of module definition objects (see below)
  relationships,  // Required: Array of module-level relationship lines
  height,         // Optional: SVG viewBox height (default: auto-calculated)
})
```

**Module Definition Object:**

```javascript
{
  id: "pfm-01",                       // Unique module identifier
  name: "PFM-01",                     // Display name
  subtitle: "Overtopping Erosion",    // Second line in the box
  tables: 4,                          // Number of tables in this module
  status: "implemented",              // "implemented" | "planned" | "partial"
  href: "./06-pfm-01",               // Docusaurus link to the chapter page
  group: "response",                  // Visual grouping: "core" | "hazards" | "response" | "risk" | "system"
}
```

**Module-Level Relationship:**

```javascript
{
  from: "screening",      // Source module id
  to: "pfm-01",           // Target module id
  label: "1:N",           // Cardinality
}
```

**Visual Layout:**

The diagram follows the DST workflow left-to-right:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────────────────────────┐
│  Screening  │────→│     Dam      │     │        Failure Mode Response         │
│  Management │     │ Information  │     │                                     │
│   1 table   │     │  ~12 tables  │     │ ┌───────┐ ┌───────┐     ┌───────┐  │
│ ● Implemented│     │ ○ Planned    │     │ │PFM-01 │ │PFM-02 │ ... │PFM-33 │  │
└──────┬──────┘     └──────┬───────┘     │ │4 tbls │ │4 tbls │     │4 tbls │  │
       │                   │             │ │  ●    │ │  ○    │     │  ○    │  │
       │                   │             │ └───────┘ └───────┘     └───────┘  │
       │                   │             └──────────────┬────────────────────┘  │
       │                   │                            │                       │
       ▼                   ▼                            ▼                       │
┌──────────────┐   ┌──────────────┐            ┌──────────────┐                │
│   Hazards    │   │ Consequences │            │    Risk      │                │
│  ~8 tables   │   │  ~8 tables   │            │  Analysis    │                │
│  ○ Planned   │   │  ○ Planned   │            │  ~5 tables   │                │
└──────────────┘   └──────────────┘            └──────────────┘                │
                                                                               │
┌─────────────────────────────────────────────────────────────────────────────┐ │
│  System: Auth (~8 tables) ○  │  Dashboard (~3 tables) ○  │  Docs (~3) ○    │ │
└─────────────────────────────────────────────────────────────────────────────┘ │
```

**Key Design Decisions:**
- Pure SVG rendered in React (no external library dependency). This follows the EventTree pattern already established in this repo.
- Each module box is an `<a>` wrapped `<g>` group — clicking navigates to the chapter
- Status indicator: filled circle (●) = implemented, half circle (◐) = partial, empty circle (○) = planned
- Table count shown inside each box
- Color-coded by group: teal for core workflow, blue for hazards, green for response, orange for risk, gray for system
- Hover effect: subtle scale transform + shadow (CSS transition on SVG group)
- Dark mode: SVG inherits CSS custom properties for fill/stroke colors via `currentColor` and `var()` references
- Responsive: SVG viewBox scales naturally. On narrow screens, the layout could optionally reflow to vertical (controlled by a CSS media query that sets `width: 100%` on the SVG)

**SVG Architecture:**
- `<defs>` block defines reusable elements: module box template, arrow markers, group background rects
- Each module is a `<g>` with `transform` positioning (absolute coordinates in viewBox space)
- Relationship lines are `<path>` elements with `marker-end` arrows
- Group backgrounds are semi-transparent rounded `<rect>` elements behind grouped modules
- Text uses `font-family: var(--ifm-font-family-base)` for consistency with site typography

**PNG Export (Stretch Goal):**
- Follow the EventTree pattern: Canvas API rasterization with configurable scale
- Add a "Copy as PNG" button for easy insertion into reports/presentations

---

## CSS Design: schema.css

All schema component styles in a single stylesheet, following the pattern of `tables.css`.

```css
/* === Schema Card === */
.schema-card { ... }                          /* Outer card with rounded corners, shadow, left border */
.schema-card--implemented { ... }             /* Left border: var(--ifm-color-primary) */
.schema-card--partial { ... }                 /* Left border: amber */
.schema-card--planned { ... }                 /* Left border: gray */

.schema-card__header { ... }                  /* Table name + description area */
.schema-card__name { ... }                    /* Table name in bold, larger text */
.schema-card__description { ... }             /* Description in muted text */
.schema-card__status { ... }                  /* Status badge positioning */

/* === Schema Column Grid === */
.schema-columns { ... }                       /* CSS Grid: 4 columns */
.schema-columns__header { ... }               /* Column header row */
.schema-columns__row { ... }                  /* Data row with zebra striping */
.schema-columns__row:nth-child(even) { ... }  /* Zebra stripe */
.schema-columns__cell { ... }                 /* Individual cell */
.schema-columns__cell--name { ... }           /* Column name cell: monospace font */
.schema-columns__cell--type { ... }           /* Type cell: monospace, muted */
.schema-columns__cell--tags { ... }           /* Constraints cell: flex wrap for tags */
.schema-columns__cell--desc { ... }           /* Description cell */

/* === Schema Tags (Badges) === */
.schema-tag { ... }                           /* Base badge: inline-flex, rounded, small text */
.schema-tag--pk { ... }                       /* Amber */
.schema-tag--fk { ... }                       /* Blue, clickable */
.schema-tag--jsonb { ... }                    /* Emerald */
.schema-tag--nullable { ... }                 /* Slate */
.schema-tag--indexed { ... }                  /* Violet */
.schema-tag--unique { ... }                   /* Orange */
.schema-tag--default { ... }                  /* Stone */
.schema-tag--cascade { ... }                  /* Red */

/* === Schema Group === */
.schema-group { ... }                         /* Outer wrapper with prominent border */
.schema-group__header { ... }                 /* Title bar in primary color */
.schema-group__diagram { ... }                /* CSS Grid layout for relationship diagram */
.schema-group__line { ... }                   /* Relationship line (CSS borders) */
.schema-group__line-label { ... }             /* "1:1", "1:N" label on line */

/* === Module Map (SVG) === */
.module-map { ... }                           /* SVG wrapper */
.module-map__box { ... }                      /* Module box hover effect */
.module-map__box:hover { ... }                /* Scale + shadow on hover */
.module-map__group-bg { ... }                 /* Semi-transparent group background */

/* === JSONB Expander === */
.schema-json-expander { ... }                 /* Expandable JSONB detail section */
.schema-json-expander__toggle { ... }         /* Click target */
.schema-json-expander__content { ... }        /* Hidden by default, slides open */

/* === Dark Mode Overrides === */
[data-theme="dark"] .schema-card { ... }
[data-theme="dark"] .schema-tag--pk { ... }
[data-theme="dark"] .schema-columns__row:nth-child(even) { ... }
/* ... etc for all components ... */

/* === Responsive === */
@media (max-width: 900px) {
  .schema-columns { ... }                    /* Stack or scroll horizontally */
  .schema-group__diagram { ... }             /* Vertical stack with text relationships */
  .module-map { ... }                        /* Full-width SVG */
}
```

---

## Chapter Content Outline

### Chapter 0: Document Info (00-document-info.mdx)

Standard document metadata page following existing convention:
- DocumentMetadata component with title, authors, version, date
- TableVersionHistory component

### Chapter 1: Overview (01-overview.mdx)

- Brief introduction to the DST database architecture
- **ModuleMap component** — the hero interactive diagram
- Design principles summary:
  - PFM-based table naming convention
  - Three-table SRP pattern
  - GUID primary keys
  - JSONB for complex nested data
  - Clean Architecture alignment
- How to read this document (legend for tags, status indicators)
- Link to the source code repository

### Chapter 2: Screening Management (02-screening-management.mdx)

- **SchemaTable** for the `Screenings` table
- Discussion of screening codes, URL routing
- Future plans: multi-user screening management

### Chapter 3: Dam Information (03-dam-information.mdx)

- Status: Planned (no tables implemented yet)
- **SchemaTable** cards for each planned table, marked with `status="planned"`
- Expected tables: DamOverview, ReservoirData, Spillway, EmbankmentData, CrossSection, EmbankmentComponent, AbutmentSlope, etc.
- Notes on data sources (NID integration, manual entry)

### Chapter 4: Hazards (04-hazards.mdx)

- Status: Planned
- **SchemaGroup** for Hydrologic hazard tables
- **SchemaGroup** for Seismic hazard tables
- Discussion of hazard curve storage (stage-frequency, PGA-frequency)

### Chapter 5: Failure Mode Screening & Selection (05-failure-mode-screening.mdx)

- Status: Planned
- Tables for which failure modes are applicable to a given dam
- Tables for user's selection/prioritization of failure modes

### Chapter 6: PFM-01 Overtopping Erosion (06-pfm-01.mdx)

**This is the flagship chapter — fully implemented, most detailed.**

- **SchemaGroup** wrapping all 4 tables with relationship lines:
  - **SchemaTable** for `Pfm01` (main entity — ~30 columns with distribution parameters)
  - **SchemaTable** for `Pfm01_DstSrp` (with JSONB expanders for CurvesJson and NodalJson)
  - **SchemaTable** for `Pfm01_UserSrp`
  - **SchemaTable** for `Pfm01_ActiveSrp`
- Detailed JSONB structure documentation (expandable sections)
- Enum value tables for EmbankmentErodibility and GrassCoverQuality
- Discussion of the three-table SRP sync pattern
- Concurrency handling notes (pessimistic locking)

### Chapter 7: PFM-02 through PFM-09 (07-pfm-02-through-09.mdx)

- Status: Planned
- Discussion of the blueprint pattern — each PFM follows the same 4-table structure
- **SchemaTable** cards for PFM-02 as a representative example (marked `status="planned"`)
- Table listing all PFMs in this range with their failure mode names

### Chapter 8: PFM-10 through PFM-33 (08-pfm-10-through-33.mdx)

- Status: Planned (PFM-10 has partial frontend)
- Same pattern discussion
- Special notes for PFM-10 (Internal Erosion - Sand Boils) which has partial UI already
- Table listing all PFMs in this range

### Chapter 9: Consequences (09-consequences.mdx)

- Status: Planned
- Expected tables for consequence estimation (economic, life safety, environmental)
- Relationship to PFM results

### Chapter 10: Risk Analysis (10-risk-analysis.mdx)

- Status: Planned
- Expected tables for risk computation, APF calculation, results storage
- Relationship to hazards and consequences

### Chapter 11: Auth & System (11-auth-and-system.mdx)

- Status: Planned
- Expected tables: Users, Roles, UserRoles, Sessions, AuditLog, etc.
- Dashboard and screening management tables
- Notes on RBAC design

### Chapter 12: Documents (12-documents.mdx)

- Status: Planned
- Expected tables for document/file attachment management
- Storage strategy (file system vs blob storage)

### Chapter 13: Design Patterns (13-design-patterns.mdx)

A reference chapter explaining cross-cutting database design decisions:

- **GUID Primary Keys** — why, how generated (PostgreSQL `gen_random_uuid()`)
- **JSONB Columns** — when to use vs. normalized tables, indexing strategies
- **Three-Table SRP Pattern** — the DstSrp / UserSrp / ActiveSrp pattern explained with diagrams
- **Timestamp Conventions** — `CreatedAt`, `UpdatedAt`, `Last*At` patterns
- **Naming Conventions** — PFM-based prefixing, PascalCase entities → snake_case columns
- **Soft Delete vs Hard Delete** — current approach (hard delete with cascade)
- **EF Core Configuration Pattern** — Fluent API in separate `IEntityTypeConfiguration<T>` classes
- **Migration Strategy** — naming, ordering, rollback approach

### Chapter 14: Appendix — Full Table List (14-appendix-full-table-list.mdx)

- Alphabetical table of every database table (implemented + planned)
- Columns: Table Name, Module, Status, Column Count, Chapter Link
- Uses the standard `TableVertical` component (no custom component needed)
- Serves as a quick-reference index for the entire document

---

## Implementation Sequence

### Phase 1: Foundation (Build the components)

1. Create `src/css/schema.css` with all style classes
2. Import `schema.css` in `docusaurus.config.js` (add to `stylesheets` or import in `custom.css`)
3. Build `SchemaTag.js` — smallest, no dependencies, test in isolation
4. Build `SchemaTable.js` — depends on SchemaTag, test with mock data
5. Build `SchemaGroup.js` — depends on SchemaTable, test with PFM-01 group
6. Build `ModuleMap.js` — standalone SVG component, test with current module inventory

### Phase 2: Core Content (Write the implemented chapters)

7. Create the document folder structure at `docs/web-applications/dst/database-schema/v1.0/`
8. Write `00-document-info.mdx` (metadata)
9. Write `01-overview.mdx` with ModuleMap (populate with all known modules)
10. Write `06-pfm-01.mdx` — the flagship chapter, using all column data from Appendix A
11. Write `02-screening-management.mdx` — the Screenings table
12. Write `13-design-patterns.mdx` — cross-cutting patterns reference

### Phase 3: Planned Chapters (Scaffold the future)

13. Write chapters 03-05, 07-12 — planned module chapters with `status="planned"` tables
14. Write `14-appendix-full-table-list.mdx` — master index

### Phase 4: Polish

15. Verify all dark mode rendering
16. Test responsive behavior at all three breakpoints (sm/md/lg)
17. Verify sidebar auto-generation picks up the new document
18. Test all internal links (FK references, chapter cross-links)
19. Run the Docusaurus build (`npm run build`) to verify no errors
20. Verify counter/numbering system works for any TableVertical or Figure components used

---

## Integration Notes

### Sidebar Generation

The existing `sidebars.js` auto-generation script scans the `docs/` folder structure. The new document at `docs/web-applications/dst/database-schema/v1.0/` should be automatically picked up. Verify by running `npm run sidebars` after creating the files.

### Counter System

If any chapters use the existing `TableVertical`, `Figure`, or `Equation` components (which have automatic numbering), the counter generation script (`npm run counters`) must be run to produce the numbering JSON. The custom schema components (SchemaTable, SchemaGroup, ModuleMap) do NOT integrate with the counter system — they use their own visual identity.

### CSS Import

Add `schema.css` import to `src/css/custom.css`:

```css
@import './schema.css';
```

### NavContainer

Every chapter MDX file should include the NavContainer at the top:

```jsx
<NavContainer
  link="/web-applications/dst"
  linkTitle="Dam Screening Tool"
  document="web-applications/dst/database-schema"
/>
```

---

## Design Principles

1. **Source of truth is Appendix A.** Column definitions come from the schema data embedded in Appendix A of this plan (extracted from C# entity classes). When the DST schema changes, Appendix A and the MDX content should be updated to match.

2. **Progressive disclosure.** The ModuleMap gives the 10-second overview. Chapter pages give the module view. SchemaTable cards give column-level detail. JSONB expanders give nested structure. Each layer is opt-in.

3. **Status transparency.** Every table and module is clearly marked as implemented, partial, or planned. Readers always know what exists vs. what's aspirational.

4. **Dark mode is not an afterthought.** Every component must look good in both themes. Use CSS custom properties, not hardcoded colors.

5. **No external runtime dependencies.** All components use React + CSS + inline SVG. No chart libraries, no reactflow, no D3. This keeps the build simple and the bundle small, consistent with the existing component philosophy in this repo.

6. **Follow existing patterns.** Component props follow TableVertical conventions. CSS follows tables.css patterns. MDX follows LST chapter structure. Don't reinvent what already works.

---

## Appendix A: Complete Schema Data

This appendix contains all database table definitions, column details, constraints, JSONB structures, and enum values extracted from the DST source code. This is the **sole source of truth** for writing MDX content — do not invent or guess any schema details.

### A.1 Implemented Tables

These tables exist in the database today with EF Core migrations applied.

---

#### Table: Screenings

**PostgreSQL table name:** `Screenings`
**Purpose:** Top-level entity representing a complete dam screening assessment. Each screening is for one dam.
**Status:** Implemented

| Column | PostgreSQL Type | Nullable | Constraints | Default | Description |
|--------|----------------|----------|-------------|---------|-------------|
| Id | UUID | NO | PK | `gen_random_uuid()` | Primary key |
| Code | VARCHAR(10) | NO | UNIQUE, INDEXED | — | Short alphanumeric code (6 chars) used in URLs. Example: "Xk9mP2" → `/screening/Xk9mP2/...` |
| Name | VARCHAR(200) | NO | — | — | Name of the dam being screened |
| CreatedAt | TIMESTAMP | NO | — | `CURRENT_TIMESTAMP` | When the screening was created |
| UpdatedAt | TIMESTAMP | NO | — | `CURRENT_TIMESTAMP` | When the screening was last modified |

**Indexes:**
- PK on `Id`
- Unique index on `Code`

**Relationships:** None currently. Future: `Screenings (1) → (N) Pfm01`

---

#### Table: Pfm01

**PostgreSQL table name:** `Pfm01`
**Purpose:** PFM-01: Overtopping Erosion location entity. Each row represents one PFM location being evaluated (e.g., "Main Embankment", "Left Abutment").
**Status:** Implemented

| Column | PostgreSQL Type | Nullable | Constraints | Default | Description |
|--------|----------------|----------|-------------|---------|-------------|
| Id | UUID | NO | PK | `gen_random_uuid()` | Primary key |
| ScreeningId | UUID | YES | INDEXED | — | For future Screening FK |
| Index | INT | NO | INDEXED | — | Ordering within this PFM |
| Name | VARCHAR(200) | NO | — | — | Location name (e.g., "Main Embankment", "Left Abutment") |
| CrossSection | VARCHAR(200) | YES | — | — | Cross-section identifier (e.g., "Sta 10+00") |
| SrpMode | VARCHAR(20) | NO | — | `'dst'` | SRP mode: `'dst'` or `'user'` |
| EmbankmentHeight | FLOAT8 | YES | — | — | Embankment height in feet |
| CrestWidth | FLOAT8 | YES | — | — | Crest width in feet |
| DownstreamSlope | FLOAT8 | YES | — | — | Downstream slope ratio (e.g., 2.5) |
| DownstreamShellMaterial | VARCHAR(100) | YES | — | — | Downstream shell material type |
| EmbankmentErodibility | VARCHAR(50) | YES | — | — | Erodibility category (see Enum: EmbankmentErodibility) |
| GrassCoverQuality | VARCHAR(50) | YES | — | — | Grass cover quality (see Enum: GrassCoverQuality) |
| KdDistributionType | VARCHAR(50) | YES | — | — | Distribution type for erodibility coefficient (kd) |
| KdMin | FLOAT8 | YES | — | — | kd lower bound (Uniform/Triangular/PERT) |
| KdMode | FLOAT8 | YES | — | — | kd mode value (Triangular/PERT) |
| KdMax | FLOAT8 | YES | — | — | kd upper bound (Uniform/Triangular/PERT) |
| KdMean | FLOAT8 | YES | — | — | kd mean value (Normal/Lognormal) |
| KdStd | FLOAT8 | YES | — | — | kd standard deviation (Normal/Lognormal) |
| TauCDistributionType | VARCHAR(50) | YES | — | — | Distribution type for critical shear stress (τc) |
| TauCMin | FLOAT8 | YES | — | — | τc lower bound |
| TauCMode | FLOAT8 | YES | — | — | τc mode value |
| TauCMax | FLOAT8 | YES | — | — | τc upper bound |
| TauCMean | FLOAT8 | YES | — | — | τc mean value |
| TauCStd | FLOAT8 | YES | — | — | τc standard deviation |
| ManningsNDistributionType | VARCHAR(50) | YES | — | — | Distribution type for Manning's roughness (n) |
| ManningsNMin | FLOAT8 | YES | — | — | Manning's n lower bound |
| ManningsNMode | FLOAT8 | YES | — | — | Manning's n mode value |
| ManningsNMax | FLOAT8 | YES | — | — | Manning's n upper bound |
| ManningsNMean | FLOAT8 | YES | — | — | Manning's n mean value |
| ManningsNStd | FLOAT8 | YES | — | — | Manning's n standard deviation |
| BaseDuration | FLOAT8 | YES | — | — | Base duration in hours at 0.5 ft overtopping depth |
| MaxHazardLevel | FLOAT8 | YES | — | — | Max overtopping depth in feet (max hazard stage − crest elevation) |
| ShowAssumptions | BOOLEAN | NO | — | — | UI state: show/hide assumptions panel |
| CreatedAt | TIMESTAMP | NO | — | `CURRENT_TIMESTAMP` | When the location was created |
| UpdatedAt | TIMESTAMP | NO | — | `CURRENT_TIMESTAMP` | When the location was last modified |

**Indexes:**
- PK on `Id`
- Index on `ScreeningId`
- Index on `Index`

**Relationships:**
- `Pfm01 (1) → (0..1) Pfm01_DstSrp` via `Pfm01_DstSrp.Pfm01Id` (CASCADE DELETE)
- `Pfm01 (1) → (0..1) Pfm01_UserSrp` via `Pfm01_UserSrp.Pfm01Id` (CASCADE DELETE)
- `Pfm01 (1) → (0..1) Pfm01_ActiveSrp` via `Pfm01_ActiveSrp.Pfm01Id` (CASCADE DELETE)

**Column Groups (for visual organization in SchemaTable):**
The columns can be grouped into logical sections for readability:
- **Identity:** Id, ScreeningId, Index, Name, CrossSection
- **SRP Mode:** SrpMode
- **Geometry:** EmbankmentHeight, CrestWidth, DownstreamSlope
- **Materials:** DownstreamShellMaterial, EmbankmentErodibility, GrassCoverQuality
- **Erodibility Coefficient (kd):** KdDistributionType, KdMin, KdMode, KdMax, KdMean, KdStd
- **Critical Shear Stress (τc):** TauCDistributionType, TauCMin, TauCMode, TauCMax, TauCMean, TauCStd
- **Manning's Roughness (n):** ManningsNDistributionType, ManningsNMin, ManningsNMode, ManningsNMax, ManningsNMean, ManningsNStd
- **Analysis:** BaseDuration, MaxHazardLevel
- **UI State:** ShowAssumptions
- **Timestamps:** CreatedAt, UpdatedAt

---

#### Table: Pfm01_DstSrp

**PostgreSQL table name:** `Pfm01_DstSrp`
**Purpose:** Stores System-Response calculation results and user's nodal probability adjustments. Created when DST-based SRP calculations are first run.
**Status:** Implemented

| Column | PostgreSQL Type | Nullable | Constraints | Default | Description |
|--------|----------------|----------|-------------|---------|-------------|
| Id | UUID | NO | PK | `gen_random_uuid()` | Primary key |
| Pfm01Id | UUID | NO | FK → Pfm01, UNIQUE, INDEXED | — | Foreign key to parent PFM-01 location (1:1) |
| CurvesJson | JSONB | YES | — | — | System-Response 50-point curves (see JSONB: CurvesJson) |
| NodalJson | JSONB | YES | — | — | Nodal probability tables (see JSONB: NodalJson) |
| LastCalculatedAt | TIMESTAMP | YES | — | — | When System-Response was last executed |
| LastNodalEditAt | TIMESTAMP | YES | — | — | When user last edited nodal values |

**Indexes:**
- PK on `Id`
- Unique index on `Pfm01Id`

**Relationships:**
- `Pfm01_DstSrp.Pfm01Id → Pfm01.Id` (1:1, CASCADE DELETE)

---

#### Table: Pfm01_UserSrp

**PostgreSQL table name:** `Pfm01_UserSrp`
**Purpose:** Stores manually-entered SRP curves computed outside DST by the user. Created when user first enters a user-defined SRP curve.
**Status:** Implemented

| Column | PostgreSQL Type | Nullable | Constraints | Default | Description |
|--------|----------------|----------|-------------|---------|-------------|
| Id | UUID | NO | PK | `gen_random_uuid()` | Primary key |
| Pfm01Id | UUID | NO | FK → Pfm01, UNIQUE, INDEXED | — | Foreign key to parent PFM-01 location (1:1) |
| CurveJson | JSONB | YES | — | — | User-entered SRP curve (see JSONB: UserSrp CurveJson) |
| Notes | VARCHAR(4000) | YES | — | — | Optional user notes/justification |
| LastModifiedAt | TIMESTAMP | YES | — | — | When user last modified the curve |

**Indexes:**
- PK on `Id`
- Unique index on `Pfm01Id`

**Relationships:**
- `Pfm01_UserSrp.Pfm01Id → Pfm01.Id` (1:1, CASCADE DELETE)

---

#### Table: Pfm01_ActiveSrp

**PostgreSQL table name:** `Pfm01_ActiveSrp`
**Purpose:** Stores the SRP curve actually used in risk calculations. Synced from either DstSrp or UserSrp based on the parent Pfm01's SrpMode. Acts as a denormalized cache.
**Status:** Implemented

| Column | PostgreSQL Type | Nullable | Constraints | Default | Description |
|--------|----------------|----------|-------------|---------|-------------|
| Id | UUID | NO | PK | `gen_random_uuid()` | Primary key |
| Pfm01Id | UUID | NO | FK → Pfm01, UNIQUE, INDEXED | — | Foreign key to parent PFM-01 location (1:1) |
| CurveJson | JSONB | YES | — | — | Active SRP curve for risk calculations (same format as UserSrp CurveJson) |
| SourceMode | VARCHAR(20) | YES | — | — | Which source the curve came from: `'dst'` or `'user'` |
| LastSyncedAt | TIMESTAMP | YES | — | — | When the curve was last synced from its source |

**Indexes:**
- PK on `Id`
- Unique index on `Pfm01Id`

**Relationships:**
- `Pfm01_ActiveSrp.Pfm01Id → Pfm01.Id` (1:1, CASCADE DELETE)

**Sync Rules:**
- When `SrpMode = 'dst'`: Copy `totalSrp.revisedEstimate` from `Pfm01_DstSrp.NodalJson`
- When `SrpMode = 'user'`: Copy `CurveJson` from `Pfm01_UserSrp`
- Sync triggers: mode switch, DST calculation complete, user-defined curve save

---

### A.2 JSONB Column Structures

These are the JSON structures stored in JSONB columns. These should be documented as expandable detail sections within the SchemaTable component.

---

#### JSONB: CurvesJson (in Pfm01_DstSrp)

Stores the System-Response calculation output curves. Contains three 50-point SRP curves plus a duration curve.

```json
{
  "systemResponseCurve": [
    { "headwater": 0.0, "probability": 0.0 },
    { "headwater": 0.1, "probability": 0.002 },
    ...
    // 50 points total — overtopping depth (ft) vs probability of failure
  ],
  "grassRemovalCurve": [
    { "headwater": 0.0, "probability": 0.0 },
    ...
    // 50 points — Node 2: probability of grass cover removal
  ],
  "conditionalBreachCurve": [
    { "headwater": 0.0, "probability": 0.0 },
    ...
    // 50 points — Node 5: conditional probability of breach
  ],
  "durationCurve": [
    { "depth": 0.5, "duration": 12.0 },
    { "depth": 1.0, "duration": 6.0 },
    ...
    // Overtopping depth (ft) vs duration (hours)
  ]
}
```

**Point types:**
- `CurvePointDto`: `{ headwater: double, probability: double }` — used by systemResponseCurve, grassRemovalCurve, conditionalBreachCurve
- `DurationPointDto`: `{ depth: double, duration: double }` — used by durationCurve

---

#### JSONB: NodalJson (in Pfm01_DstSrp)

Stores the nodal probability tables for PFM-01's 5-node event tree. Contains the original RDP-selected headwater values, per-node probability tables with DST estimates and user revisions, and the computed total SRP.

```json
{
  "originalHeadwaters": [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
  // Array of up to 8 RDP-selected headwater values from initial calculation.
  // Set once by ProcessCurvesToNodal, never modified by user edits.
  // Used as revert target for "Revert to DST Estimates".

  "nodes": {
    "node1": {
      "name": "Overtopping Initiates",
      "headwaters": [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
      "dstEstimate": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
      "revisedEstimate": [null, null, null, null, null, null, null, null],
      // null = no user override, use dstEstimate
      "justification": null
    },
    "node2": {
      "name": "Grass Cover Removed",
      "headwaters": [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
      "dstEstimate": [0.05, 0.12, 0.35, 0.58, 0.72, 0.88, 0.95, 0.98],
      "revisedEstimate": [null, null, null, null, null, null, null, null],
      "justification": null
    },
    "node3": {
      "name": "Erosion Continues",
      "headwaters": [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
      "dstEstimate": [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
      "revisedEstimate": [null, null, null, null, null, null, null, null],
      "justification": null
    },
    "node4": {
      "name": "Breach Mechanism Forms",
      "headwaters": [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
      "dstEstimate": [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
      "revisedEstimate": [null, null, null, null, null, null, null, null],
      "justification": null
    },
    "node5": {
      "name": "Dam Breaches",
      "headwaters": [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
      "dstEstimate": [0.01, 0.08, 0.22, 0.41, 0.55, 0.73, 0.85, 0.92],
      "revisedEstimate": [null, null, null, null, null, null, null, null],
      "justification": null
    }
  },

  "totalSrp": {
    "headwaters": [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
    // Union of all node headwaters (sorted, unique). May exceed 8 if nodes diverge.
    "dstEstimate": [0.00036, 0.0069, 0.0554, 0.171, 0.285, 0.462, 0.581, 0.649],
    // Interpolated from 50-point systemResponseCurve at these headwater values.
    "revisedEstimate": [null, null, null, null, null, null, null, null]
    // Computed from nodal products when user adjusts any node.
    // null = no revision exists, use dstEstimate.
  }
}
```

**Key details:**
- PFM-01 has exactly **5 nodes** in its event tree
- Each node has up to **8 headwater values** (selected via Ramer-Douglas-Peucker algorithm)
- `dstEstimate` values are read-only (set by System-Response calculation)
- `revisedEstimate` values are user-editable overrides; `null` means "use DST estimate"
- `totalSrp` is computed as the product of all node probabilities at each headwater
- `justification` is free-text user rationale for adjustments

---

#### JSONB: CurveJson (in Pfm01_UserSrp and Pfm01_ActiveSrp)

Simple array of headwater/probability pairs defining an SRP curve.

```json
[
  { "headwater": 0.0, "probability": 0.0 },
  { "headwater": 0.5, "probability": 0.01 },
  { "headwater": 1.0, "probability": 0.05 },
  { "headwater": 2.0, "probability": 0.15 },
  { "headwater": 3.0, "probability": 0.35 },
  { "headwater": 5.0, "probability": 0.70 }
]
```

**Point type:** `{ headwater: double, probability: double }`
- `headwater`: Overtopping depth in feet (load level)
- `probability`: Probability of failure at this depth (0.0 to 1.0)
- Variable number of points (user-defined)

---

### A.3 Enums

These enums are stored as strings in the database. They should be documented as reference tables within the relevant chapter (Chapter 6: PFM-01).

---

#### Enum: SrpMode

**Purpose:** SRP (System Response Probability) definition mechanism.
**Stored as:** String in `Pfm01.SrpMode`

| Value | Database String | Description |
|-------|----------------|-------------|
| Dst | `"dst"` | DST-based SRP: System-Response library calculates probabilities |
| User | `"user"` | User-defined SRP: User manually defines the complete SRP curve |

---

#### Enum: EmbankmentErodibility

**Purpose:** Embankment erodibility categories based on erosion resistance. Maps to System-Response API values.
**Stored as:** String in `Pfm01.EmbankmentErodibility`

| Value | Database String | Description |
|-------|----------------|-------------|
| VeryErodible | `"veryErodible"` | Very erodible material |
| Erodible | `"erodible"` | Erodible material |
| ModeratelyResistant | `"moderatelyResistant"` | Moderately resistant material |
| Resistant | `"resistant"` | Resistant material |
| VeryResistant | `"veryResistant"` | Very resistant material |

---

#### Enum: GrassCoverQuality

**Purpose:** Grass cover quality for downstream slope protection. Maps to System-Response API values.
**Stored as:** String in `Pfm01.GrassCoverQuality`

| Value | Database String | Description |
|-------|----------------|-------------|
| None | `"noGrassCover"` | No grass cover |
| Poor | `"poorCover"` | Poor grass cover |
| Average | `"averageCover"` | Average grass cover |
| Good | `"goodCover"` | Good grass cover |

---

### A.4 Planned Tables (Placeholder Data)

These tables do **not** exist in the database yet. They are anticipated based on the DST application's module structure. Use `status="planned"` on all SchemaTable components for these tables. Column definitions are **representative placeholders** — they should be clearly marked as draft/anticipated in the MDX content.

The implementing agent should create reasonable placeholder columns based on the module descriptions below. Every planned table should include at minimum:
- `Id` (UUID, PK, `gen_random_uuid()`)
- `ScreeningId` (UUID, FK → Screenings)
- `CreatedAt` / `UpdatedAt` (TIMESTAMP, `CURRENT_TIMESTAMP`)

---

#### Module: Dam Information

**Chapter:** 03-dam-information.mdx
**Status:** Planned (frontend pages exist, no database tables)

Anticipated tables:

| Table Name | Purpose | Estimated Columns |
|------------|---------|-------------------|
| DamOverview | General dam identification and metadata (NID ID, location, owner, type, purposes) | ~15 |
| ReservoirData | Pool elevations, storage volumes, area-capacity data | ~10 |
| Spillway | Spillway type, dimensions, capacity, crest elevation | ~12 |
| EmbankmentData | Embankment dimensions, materials, zoning for each embankment section | ~15 |
| CrossSection | Cross-section geometry definitions (multiple per dam) | ~10 |
| EmbankmentComponent | Foundation, core, shell material properties | ~10 |
| AbutmentSlope | Abutment geometry and material descriptions | ~8 |

---

#### Module: Hazards

**Chapter:** 04-hazards.mdx
**Status:** Planned

Anticipated tables:

| Table Name | Purpose | Estimated Columns |
|------------|---------|-------------------|
| HydrologicHazard | Stage-frequency relationships, inflow flood data, PMF | ~10 |
| HydrologicHazardCurve | Individual curve points for stage-frequency (JSONB or normalized) | ~6 |
| SeismicHazard | Peak ground acceleration (PGA) hazard data | ~10 |
| SeismicHazardCurve | PGA-frequency curve points | ~6 |

---

#### Module: Failure Mode Screening & Selection

**Chapter:** 05-failure-mode-screening.mdx
**Status:** Planned

Anticipated tables:

| Table Name | Purpose | Estimated Columns |
|------------|---------|-------------------|
| FmScreening | Which failure modes are applicable to this dam (checkbox-style screening) | ~8 |
| FmSelection | User's prioritization/selection of applicable failure modes for evaluation | ~8 |

---

#### Module: PFM-02 through PFM-33

**Chapters:** 07-pfm-02-through-09.mdx, 08-pfm-10-through-33.mdx
**Status:** Planned

Each PFM follows the same **4-table pattern** as PFM-01:

| Table Pattern | Purpose |
|---------------|---------|
| `Pfm{NN}` | Main entity with PFM-specific input parameters |
| `Pfm{NN}_DstSrp` | System-Response calculation results + nodal tables |
| `Pfm{NN}_UserSrp` | User-defined SRP curve |
| `Pfm{NN}_ActiveSrp` | Active SRP for risk calculations |

The child SRP tables (DstSrp, UserSrp, ActiveSrp) will have the **same structure** across all PFMs — only the main `Pfm{NN}` table differs because each failure mode has different input parameters.

**Known PFM names:**

| PFM | Name | Notes |
|-----|------|-------|
| PFM-01 | Overtopping Erosion | Fully implemented (see A.1) |
| PFM-02 | Internal Erosion - Backward Erosion Piping | Planned |
| PFM-03 | Internal Erosion - Concentrated Leak Erosion | Planned |
| PFM-04 | Internal Erosion - Contact Erosion | Planned |
| PFM-05 | Internal Erosion - Internal Migration | Planned |
| PFM-06 | Static Slope Instability | Planned |
| PFM-07 | Seismic Slope Instability | Planned |
| PFM-08 | Seismic Deformation | Planned |
| PFM-09 | Overtopping - Seiche/Wave | Planned |
| PFM-10 | Internal Erosion - Sand Boils | Partial frontend |
| PFM-11 through PFM-32 | Various (names TBD) | Planned |
| PFM-33 | User-Defined Failure Mode | Planned |

---

#### Module: Consequences

**Chapter:** 09-consequences.mdx
**Status:** Planned

Anticipated tables:

| Table Name | Purpose | Estimated Columns |
|------------|---------|-------------------|
| ConsequenceEstimate | Per-screening consequence summary (life safety, economic, environmental) | ~12 |
| PopulationAtRisk | Population at risk data for different breach scenarios | ~10 |
| EconomicConsequence | Direct and indirect economic damage estimates | ~10 |

---

#### Module: Risk Analysis

**Chapter:** 10-risk-analysis.mdx
**Status:** Planned

Anticipated tables:

| Table Name | Purpose | Estimated Columns |
|------------|---------|-------------------|
| RiskAnalysis | Per-screening risk computation results | ~10 |
| RiskResult | Individual failure mode risk contributions (APF × consequence per PFM) | ~8 |
| AnnualProbabilityOfFailure | Computed APF values per failure mode and total | ~8 |

---

#### Module: Auth & System

**Chapter:** 11-auth-and-system.mdx
**Status:** Planned

Anticipated tables:

| Table Name | Purpose | Estimated Columns |
|------------|---------|-------------------|
| Users | User accounts | ~10 |
| Roles | Role definitions (Admin, Reviewer, Analyst, etc.) | ~5 |
| UserRoles | Many-to-many join table for user-role assignments | ~4 |
| Sessions | Active user sessions | ~6 |
| AuditLog | Audit trail of significant actions (who changed what, when) | ~8 |
| DashboardConfig | Per-user dashboard preferences and saved views | ~6 |

---

#### Module: Documents

**Chapter:** 12-documents.mdx
**Status:** Planned

Anticipated tables:

| Table Name | Purpose | Estimated Columns |
|------------|---------|-------------------|
| Document | File/document metadata attached to a screening | ~10 |
| DocumentVersion | Version history for uploaded documents | ~8 |

---

### A.5 Migration History

| Timestamp | Migration Name | Tables Affected |
|-----------|----------------|-----------------|
| 20260204213854 | InitialCreate | Screenings, Pfm01, Pfm01_DstSrp, Pfm01_UserSrp, Pfm01_ActiveSrp |
| 20260205192548 | AddScreeningEntity | Screenings (restructured) |
| 20260206160000 | AddMaxHazardLevelToPfm01 | Pfm01 (added MaxHazardLevel column) |

---

### A.6 Entity Relationship Summary

```
Screenings (1) ──→ (N) Pfm01        [Future FK, not yet enforced]

Pfm01 (1) ──→ (0..1) Pfm01_DstSrp       [FK: Pfm01Id, UNIQUE, CASCADE DELETE]
Pfm01 (1) ──→ (0..1) Pfm01_UserSrp      [FK: Pfm01Id, UNIQUE, CASCADE DELETE]
Pfm01 (1) ──→ (0..1) Pfm01_ActiveSrp    [FK: Pfm01Id, UNIQUE, CASCADE DELETE]
```

**Key architectural pattern:** The three SRP child tables are always 1:1 with their parent Pfm entity. Data is **never deleted** when switching SRP modes — only the `SrpMode` column on the parent and the `ActiveSrp` record change. This preserves both DST-calculated and user-defined work.
