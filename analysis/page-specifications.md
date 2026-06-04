# Page Specifications - X-Team Rebuild

This file details the structural specifications, component hierarchies, and visual flows of the key pages.

---

## 1. Homepage (`/`)
* **Purpose**: General client acquisition, social proof, capability highlight, and brand positioning.
* **Layout Structure**: `L-MAIN` (Core Dark Layout) with sticky header navigation, absolute positioned glowing canvas background, and static footer.
* **Section Specifications**:
  1. **Hero Section**:
     - Visuals: Clean black grid background with a glowing background radial gradient (purple/pink) centered on a large title.
     - Headline: "We hire developers who are ready to scale with you" or "Hire the world's most motivated developers."
     - Interactive Element: Primary CTA Button ("Schedule a Call" / "Hire Developers") pulsing red/yellow border on hover.
  2. **Trust / Client Logo Marquee**:
     - Visuals: Infinite loop horizontal banner with custom gradients shading the left and right edges.
     - Content: SVG logos of Riot Games, Fox, Kaplan, Coinbase, Beachbody, etc.
  3. **Value Proposition Grid**:
     - Visuals: 3-column responsive layout (1-column on mobile). Card items with subtle glassmorphism borders (`rgba(255,255,255,0.05)`).
     - Content: Core selling points: "Unleash Culture", "Dedicated Account Managers", "Flexible Scaling".
  4. **Dynamic Counter / Stats Section**:
     - Visuals: Large numbers that count up on scroll view entry (e.g. `98%`, `3+ Years`, `100+ Stack coverage`).
  5. **Client Testimonials**:
     - Visuals: Slider component with drag support (Framer Motion drag). Highlight quote from Fox or Kaplan.
  6. **Call-To-Action (CTA) Banner**:
     - Visuals: Chevron-shaped deep purple/violet background graphic.
     - Content: Title: "Scale your engineering capacity today." Button: "Get Started".
* **Responsive Behavior**:
  - Desktop: Multi-column grids (3 or 4 columns), margins capped at `max-w-7xl` (1280px).
  - Tablet: Grids stack to 2-columns, horizontal scroll on testimonials.
  - Mobile: Full width stack (1 column), header collapses to absolute hamburger menu with sliding full-screen menu overlay.

---

## 2. About Page (`/about`)
* **Purpose**: Establish trust, detail corporate history, explain values, and introduce leadership.
* **Layout Structure**: `L-MAIN` with a sticky navigation header and standard footer.
* **Section Specifications**:
  1. **History Timeline**:
     - Visuals: Vertical line with dot markers representing years. On-scroll fade-in and highlight for active year.
  2. **Core Values Section**:
     - Visuals: Grid of 4 card modules representing "Trust", "Growth", "Community", "Execution". Cards use custom hover triggers (slight offset up and glow border).
  3. **Leadership Team**:
     - Visuals: Responsive grid showing member avatars, names, roles, and LinkedIn links. On hover, background scales.
  4. **The "Universe" Intro**:
     - Visuals: Large image gallery showing X-Outpost (developer meetups).

---

## 3. Careers Page (`/careers`)
* **Purpose**: Recruit elite engineers by showcasing developer community benefits, payouts, and culture.
* **Layout Structure**: `L-MAIN` layout with heavy gamification assets.
* **Section Specifications**:
  1. **Recruitment Hero**:
     - Visuals: High-energy visual with neon accents. Headline: "Unleash your potential."
     - CTA: "View Open Roles" pointing to `jobs.x-team.com`.
  2. **Community Benefits Grid**:
     - Visuals: Bento grid style panel highlighting remote allowances, X-Outpost travel, gear sponsorships (The Vault), and learning stipends ($2,500/yr).
  3. **Gamification Showcase (X-Team Universe)**:
     - Visuals: Explanations of "Seasons", "Bounties", and "Epic Loot". Mock screenshots of the internal dashboard.
  4. **Developer Testimonials Slider**:
     - Visuals: Video embeds showing developer diaries from around the globe.

---

## 4. How It Works (`/how-it-works`)
* **Purpose**: Address friction in hiring, detail legal terms, SLA, match times, and rates.
* **Layout Structure**: `L-MAIN` layout.
* **Section Specifications**:
  1. **Steps Walkthrough**:
     - Visuals: Side-by-side sticky columns. Left side: static graphics updating based on active step. Right side: scrolling textual step indicators.
     - Steps: (1) Define Profile, (2) Match Candidates (typically 48-72h), (3) Onboarding, (4) Continuous Growth.
  2. **Interactive FAQ Accordion**:
     - Visuals: Collapsible rows with arrow rotation transitions. Smooth height animation (`framer-motion` `AnimatePresence` + `height`).
  3. **Pricing Transparency Module**:
     - Visuals: Card layout outlining retainer-based billing structure and zero-risk trial terms.

---

## 5. Case Studies (`/case-studies`)
* **Purpose**: Provide empirical proof of engineering talent across diverse industries.
* **Layout Structure**: `L-MAIN` layout with filtering controls.
* **Section Specifications**:
  1. **Category Filter Tabs**:
     - Visuals: Horizontal slider of capsule pills (e.g. "All", "Fintech", "Gaming", "Scaling", "Legacy Rebuilds").
  2. **Case Grid**:
     - Visuals: 2-column asymmetric grid. Cards are large, featuring high-contrast cover imagery (e.g. Riot Games character art, Fox sports broadcast, OFX branding).
     - Hover State: Card scales up `1.03x` with a rich shadow overlay.

---

## 6. Software Development Solutions (`/software-development-solutions`)
* **Purpose**: Describe direct service offerings for CTOs, product managers, and enterprise buyers.
* **Layout Structure**: `L-MAIN` layout.
* **Section Specifications**:
  1. **Services Matrix**:
     - Columns comparing "Dedicated Teams" vs. "Staff Augmentation".
  2. **Interactive Technology Selector**:
     - Clicking categories (Frontend, Backend, Mobile, Cloud) highlights corresponding logo badges.
