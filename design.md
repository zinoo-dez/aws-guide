# AWS Architecture Guide – Production-Grade UI & System Design
## Document: `design.md` (Version: 2.0.0-PROD)

---

### 1. Design Philosophy & Visual Identity

The platform adopts a **High-Contrast, Cloud-Console Luxury Dark Aesthetic** engineered specifically for technical diagrams, code readability, and deep architectural study. 

Key visual principles:
1. **Atmospheric Dark Elevation**: Subtle layered surfaces (`#070B12` → `#0D1322` → `#131B30` → `#1A2542`) creating depth and visual hierarchy without harsh glare.
2. **Signature AWS Ambient Glows**: Controlled amber-orange glows (`rgba(255, 153, 0, 0.18)`) demarcating active nodes, service categories, and primary CTAs.
3. **Category Color Semantic Coding**: Every AWS service category has an immutable signature color used across diagrams, pills, badges, and code callouts.
4. **Architectural Clarity**: High-legibility diagrams with crisp SVG vectors, zoom/pan controls, and copyable Mermaid schemas.

---

### 2. Design Tokens & CSS Architecture

#### 2.1 Color Tokens & Semantic Categorization

```css
:root {
  /* Surface Layers (Dark Theme Default) */
  --bg-canvas: #06090F;           /* Deepest obsidian background */
  --bg-surface-1: #0B101C;        /* Secondary canvas & sidebar background */
  --bg-surface-2: #101728;        /* Main elevated card background */
  --bg-surface-3: #18223B;        /* Interactive elements, inset wells, table headers */
  --bg-surface-hover: #1E2A4A;    /* Card & button hover state */
  --bg-surface-active: #243258;   /* Active selection state */
  
  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-medium: rgba(255, 255, 255, 0.14);
  --border-strong: rgba(255, 255, 255, 0.25);
  --border-glow-aws: rgba(255, 153, 0, 0.35);

  /* Typography Colors */
  --text-display: #FFFFFF;        /* Display titles (100% white) */
  --text-primary: #F1F5F9;        /* Main body and primary headers (95% white) */
  --text-secondary: #94A3B8;      /* Descriptions, metadata, subheadings */
  --text-muted: #64748B;          /* Inactive tabs, disabled states, timestamps */
  --text-code: #F8FAFC;           /* Code blocks and inline monospaced symbols */

  /* AWS Service Category Signature Palette */
  --aws-orange: #FF9900;          /* Brand Accent / Storage S3 / Core */
  --aws-orange-bg: rgba(255, 153, 0, 0.12);
  --aws-orange-border: rgba(255, 153, 0, 0.3);

  --cat-compute: #10B981;         /* EC2, Lambda, Auto Scaling (Emerald) */
  --cat-compute-bg: rgba(16, 185, 129, 0.12);
  --cat-compute-border: rgba(16, 185, 129, 0.3);

  --cat-database: #38BDF8;        /* RDS, DynamoDB, Aurora (Sky Blue) */
  --cat-database-bg: rgba(56, 189, 248, 0.12);
  --cat-database-border: rgba(56, 189, 248, 0.3);

  --cat-networking: #818CF8;      /* VPC, CloudFront, Route 53 (Indigo/Violet) */
  --cat-networking-bg: rgba(129, 140, 248, 0.12);
  --cat-networking-border: rgba(129, 140, 248, 0.3);

  --cat-analytics: #E879F9;       /* Glue, Athena, Kinesis (Fuchsia) */
  --cat-analytics-bg: rgba(232, 121, 249, 0.12);
  --cat-analytics-border: rgba(232, 121, 249, 0.3);

  --cat-security: #F59E0B;        /* IAM, KMS, Secrets Manager, WAF (Amber) */
  --cat-security-bg: rgba(245, 158, 11, 0.12);
  --cat-security-border: rgba(245, 158, 11, 0.3);

  --cat-devops: #34D399;          /* CodePipeline, CDK, Terraform (Teal) */
  --cat-devops-bg: rgba(52, 211, 153, 0.12);
  --cat-devops-border: rgba(52, 211, 153, 0.3);

  --cat-observability: #FB7185;   /* CloudWatch, X-Ray, CloudTrail (Rose) */
  --cat-observability-bg: rgba(251, 113, 133, 0.12);
  --cat-observability-border: rgba(251, 113, 133, 0.3);

  /* Elevation & Glass Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.55);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.7);
  --shadow-aws-glow: 0 0 30px rgba(255, 153, 0, 0.16);

  /* Glassmorphic Utilities */
  --glass-bg: rgba(11, 16, 28, 0.8);
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);
  --glass-backdrop: blur(16px);

  /* Layout Spacing Grid (8pt System) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}

/* Light Theme Variables */
[data-theme="light"] {
  --bg-canvas: #F8FAFC;
  --bg-surface-1: #FFFFFF;
  --bg-surface-2: #F1F5F9;
  --bg-surface-3: #E2E8F0;
  --bg-surface-hover: #E2E8F0;
  --bg-surface-active: #CBD5E1;

  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-medium: rgba(0, 0, 0, 0.16);
  --border-strong: rgba(0, 0, 0, 0.28);
  --border-glow-aws: rgba(234, 88, 12, 0.3);

  --text-display: #0F172A;
  --text-primary: #1E293B;
  --text-secondary: #475569;
  --text-muted: #94A3B8;
  --text-code: #0F172A;

  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: 1px solid rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.15);
  --shadow-aws-glow: 0 0 30px rgba(234, 88, 12, 0.12);
}
```

---

### 3. Layout Architecture & Wireframe Specifications

#### 3.1 Global Application Shell
- **Sticky Glass Navbar** (`height: 64px`, `z-index: 100`):
  - Brand Logo + AWS Architecture Guide Emblem.
  - Search Trigger Pill (`Cmd + K` or `/` icon) opening instantaneous fuzzy overlay.
  - Primary Navigation Links (`Roadmap`, `Modules`, `Case Studies`, `Services Index`).
  - Progress Tracker Widget (e.g. `4 / 32 Completed` with mini radial ring).
  - Theme Switcher (Dark / Light) with animated SVG transition.
  - GitHub Stars / Source link.

#### 3.2 3-Column Responsive Case Study Reader

```
┌─────────────────┬──────────────────────────────────────────┬──────────────────┐
│ Left Sidebar    │ Main Content Stream                      │ Right Sidebar    │
│ (280px Sticky)  │ (Max 880px Centered)                     │ (240px Sticky)   │
├─────────────────┼──────────────────────────────────────────┼──────────────────┤
│ • Module Title  │ • Breadcrumbs                            │ • Table of       │
│ • Progress Bar  │ • Header + Badges + Reading Time         │   Contents (TOC) │
│ • Sibling Case  │ • Key Metrics Banner Strip               │ • Active Spy     │
│   Studies List  │ • 1. Business Problem & Context          │ • Diagram Jump   │
│ • Module Check  │ • 2. Requirements & Constraints Table    │ • Trade-offs Jump│
│ • Prev / Next   │ • 3. Interactive Architecture Canvas     │ • Quiz Jump      │
│   Nav Buttons   │ • 4. AWS Services Matrix                 │ • AWS Docs Links │
│                 │ • 5. Architecture Trade-Offs Table       │ • Bookmark Button│
│                 │ • 6. Implementation Highlights & Code    │                  │
│                 │ • 7. Results, Metrics & ROI              │                  │
│                 │ • 8. Critical Takeaways & Anti-Patterns  │                  │
│                 │ • 9. Interactive Knowledge Quiz          │                  │
│                 │ • 10. Next Module CTA                    │                  │
└─────────────────┴──────────────────────────────────────────┴──────────────────┘
```

---

### 4. Interactive Components & Micro-Interactions

#### 4.1 Interactive Architecture Diagram Viewer (`ArchitectureDiagram.astro`)
- **Mermaid.js Theme Injection**: Custom dark theme CSS variables injected into Mermaid runtime matching `--bg-canvas` and `--aws-orange`.
- **Interactive Controls**:
  - `[+] Zoom In`, `[-] Zoom Out`, `[↺] Reset View`.
  - `[⛶] Fullscreen Modal View` (expanding into a distraction-free full-viewport canvas).
  - `[📋] Copy Mermaid Source` (for direct use in documentation or tickets).
  - `[⬇] Export SVG` (instant high-res vector download).
- **Node Highlighting**: Clicking any node highlights connected edges and displays node service descriptions.

#### 4.2 Instant Client-Side Search Engine (`SearchModal.astro`)
- **Keyboard Trapping**: `Cmd+K` or `/` opens; `Escape` closes; `ArrowUp`/`ArrowDown` navigates item list; `Enter` selects.
- **Faceted Query Engine**:
  - Matches case study titles, summaries, AWS service names, module themes, and technical tags (`serverless`, `multi-region`, `karpenter`, `single-table`).
  - Highlights matched substrings in real-time.
  - Sub-5ms search execution time with in-memory Trie/fuzzy matcher.

#### 4.3 Knowledge Check Quiz Component (`KnowledgeQuiz.astro`)
- **Interactive State Machine**:
  - State 1: `UNANSWERED` (Radio selection with hover highlight).
  - State 2: `SUBMITTED_CORRECT` (Emerald glow, checkmark icon, detailed architectural justification explanation).
  - State 3: `SUBMITTED_INCORRECT` (Rose border, cross icon, explanation of *why* the chosen option fails under the given constraints, and *why* the correct answer is superior).
- **Progress Persistence**: Stores completed quizzes and earned badges in browser `localStorage`.

#### 4.4 Trade-Offs & Decision Matrix (`TradeoffsTable.astro`)
- Side-by-side comparison cards evaluating **Option A (Legacy / Alternative)** vs **Option B (Serverless / Managed)** vs **Chosen Architecture**.
- Rated criteria: *Cost*, *Operational Overhead*, *Scalability*, *Latency*, *Disaster Recovery*.

---

### 5. Accessibility (a11y) & SEO Architecture

1. **A11y Standards**:
   - High color contrast ratio: Dark mode contrast ≥ 13.5:1 for body copy; light mode ≥ 11:1.
   - Screen-reader ARIA live regions for search results count and quiz feedback.
   - Visible, glowing `:focus-visible` outlines on all interactive controls.
2. **SEO & Structured Metadata**:
   - Canonical URLs and auto-generated `sitemap-index.xml`.
   - Comprehensive OpenGraph and Twitter card image generators for each case study.
   - `schema.org` structured data (`TechArticle`, `Course`, `LearningResource`) on every case study page.
