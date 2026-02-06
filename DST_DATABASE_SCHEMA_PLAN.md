# Implementation Plan: DST Database Schema Document

## Purpose

Create a standalone, multi-chapter MDX document within the RMC Software Documentation site that serves as the authoritative reference for the Dam Screening Tool (DST) database schema. The document will use custom React components to present tables, relationships, and module structure in a visual, navigable, and impressive format — suitable for both technical developers and engineering stakeholders.

## Source Repository

All database entity definitions, EF Core configurations, and migration files live in:

```
C:\GitHub\DST-Mockup
├── backend/src/DST.Domain/Entities/         → Entity classes (source of truth for properties/types)
├── backend/src/DST.Infrastructure/
│   ├── Configurations/                      → Fluent API configs (constraints, indexes, JSON columns)
│   ├── Migrations/                          → Migration history
│   └── Persistence/DSTDbContext.cs          → DbContext with DbSets
└── docs/IMPLEMENTATION_PLAN.md              → Schema documentation (lines 1487-1730+)
```

When authoring MDX content, read entity classes and configuration files directly from the DST-Mockup repo to ensure accuracy. Do not guess column types or constraints — pull them from the actual C# source.

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
10. Write `06-pfm-01.mdx` — the flagship chapter, pulling all column data from DST-Mockup entity classes
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

1. **Source of truth is code.** Column definitions are pulled from C# entity classes in DST-Mockup, not invented. When schema changes, update the MDX to match.

2. **Progressive disclosure.** The ModuleMap gives the 10-second overview. Chapter pages give the module view. SchemaTable cards give column-level detail. JSONB expanders give nested structure. Each layer is opt-in.

3. **Status transparency.** Every table and module is clearly marked as implemented, partial, or planned. Readers always know what exists vs. what's aspirational.

4. **Dark mode is not an afterthought.** Every component must look good in both themes. Use CSS custom properties, not hardcoded colors.

5. **No external runtime dependencies.** All components use React + CSS + inline SVG. No chart libraries, no reactflow, no D3. This keeps the build simple and the bundle small, consistent with the existing component philosophy in this repo.

6. **Follow existing patterns.** Component props follow TableVertical conventions. CSS follows tables.css patterns. MDX follows LST chapter structure. Don't reinvent what already works.
