# Page Inventory - X-Team Rebuild

This document presents a comprehensive inventory of all pages discovered during the crawl of [X-Team](https://x-team.com). 

The site contains a total of **804 URLs** indexed in its sitemap, which have been analyzed and categorized into core templates, solution pages, case studies, industry-specific landing pages, blog/magazine articles, and meeting schedules.

---

## Page Layout Categories

To reconstruct the X-Team website efficiently in Next.js 15, the application is divided into **four key page layouts** with distinct header/footer variations, background grids, and interactive states:

| Layout ID | Layout Name | Visual Description | Applied Pages |
| :--- | :--- | :--- | :--- |
| `L-MAIN` | **Core Dark Layout** | Deep dark theme (`#0c0c0c` / `#000`), purple/indigo linear gradients, full navigation header, and standard footer. High emphasis on animated grid grids and hero typography. | Homepage, /about, /careers, /how-it-works, /software-development-solutions, /technologies, /case-studies |
| `L-CONTENT` | **Editorial Layout** | Dark theme with light editorial reading pane (`#ffffff` or soft `#f9f9f9` background for reading text readability, or deep charcoal readability). Structured heading hierarchy and sticky sidebar for social sharing / navigation. | /magazine, /magazine/*, /newsroom |
| `L-MINIMAL` | **Minimalist / Meeting Layout** | Full-viewport focus layout without main navigation header or standard footer. Focused purely on embedded booking widgets (HubSpot/Calendly) and simple branding. | /book-a-meeting, /book-a-meeting-* |
| `L-LEGAL` | **Legal / Text Layout** | Clean, high-contrast typography template. Simple text container, centered grid, simple header and footer. | /privacy-policy, /cookie-notice |

---

## Core & Functional Pages Inventory

Below are the key pages that define the structure, user flows, and brand experience of X-Team:

| Path | Page Title | Layout | Key Components | Purpose / Conversion Goal |
| :--- | :--- | :--- | :--- | :--- |
| `/` | X-Team: Hire World-Class Developers, On-Demand | `L-MAIN` | Header, Hero, Trust Marquee, Stats Counter, Testimonials, CTA | Main brand introduction, client intake, and social proof. |
| `/about` | About X-Team: Our Story, Values & Leadership | `L-MAIN` | Core values grid, Hero, Leadership team bios, Universe marquee | Trust building, brand history, culture presentation. |
| `/how-it-works` | How X-Team Works: Seamless Integration, Scaling | `L-MAIN` | Step-by-step process accordion, CTA, FAQ accordion | Describe engagement process, pricing mechanics, and team match. |
| `/software-development-solutions` | Hire Remote Developers & Dedicated Product Teams | `L-MAIN` | Capabilities grid, technology selector, testimonials | Outline detailed solutions (staff augmentation vs. dedicated teams). |
| `/case-studies` | X-Team Case Studies: Real Projects, Proven Impact | `L-MAIN` | Filterable project grid, case cards, client testimonials | Showcase past success stories across industries (Gaming, Fintech). |
| `/careers` | Remote Developer Jobs - Join X-Team Universe | `L-MAIN` | Culture video, Unleash perks, Job listing CTA, Discord links | Attract high-performing remote engineers to apply. |
| `/contact` | Contact X-Team: Get in Touch | `L-MAIN` | Lead intake form, Booking calendar embed, contact details | Primary sales and corporate communications intake. |
| `/technologies` | Custom Tech Stack Solutions: Node, React, Python | `L-MAIN` | Technology index, hiring guides, tech search bar | Hub page directing visitors to individual tech-stack landing pages. |
| `/unleash` | Unleash Your Potential: The X-Team Community | `L-MAIN` | Gaming/Perks showcase, epic image grids, community map | Showcase the unique developer support ecosystem (X-Outpost). |
| `/x-team-universe-explained` | Inside the X-Team Universe: Missions, Seasons | `L-MAIN` | Animated timeline, avatar creator, gamification rules | Explain the internal gamified culture (Bounties, Vault items). |

---

## Dynamic Templates

### 1. Industry Verticals (`/industries/*`)
Tailored landing pages speaking directly to CTOs and VP of Product in specific sectors:
- `/industries/fintech-developers`
- `/industries/gaming-developers`
- `/industries/healthtech-developers`
- `/industries/media-entertainment-software-development`

### 2. Technology Landing Pages (`/technologies/*`)
Over 67 separate dynamic pages designed for SEO traffic targeting specific frameworks and languages. Examples:
- `/technologies/hire-node-js-developers`
- `/technologies/hire-react-developers`
- `/technologies/hire-python-developers`
- `/technologies/hire-jest-test-engineers`

### 3. Dynamic Case Studies (`/case-studies/*`)
Deep dives into engineering execution. Examples:
- `/case-studies/riot-games-modernize-legacy-systems`
- `/case-studies/fox-sports-streaming-performance`
- `/case-studies/kaplan-language-assessment`

### 4. Magazine & Articles (`/magazine/*`)
A rich, content-heavy section with over 700 articles driving organic traffic and community engagement:
- `/magazine` (Blog Index page with tags, categories, search, featured layout)
- `/magazine/10-habits-successful-remote-worker` (Individual post template)
- `/magazine/tag/podcast` (Podcast episode pages)

### 5. Meeting Forms (`/book-a-meeting-*`)
Minimal layouts for booking calls with specific account directors:
- `/book-a-meeting` (General sales)
- `/book-a-meeting-anthony`
- `/book-a-meeting-heather`
- `/book-a-meeting-jen`
- `/book-a-meeting-richard`
