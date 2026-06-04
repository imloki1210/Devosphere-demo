# Component Inventory & Specification - X-Team Rebuild

This inventory catalogs the reusable UI components discovered on `x-team.com` and provides engineering specifications for rebuilding them in Next.js 15.

---

## 1. Layout Components

### Header (Navigation Bar)
* **Description**: Sticky global navigation container with brand branding and interactive menus.
* **Responsive Behavior**: 
  - Desktop: Standard inline list with dropdown hover menus.
  - Mobile: Absolute header with hamburger trigger. Clicking displays a sliding full-screen overlay menu.
* **Props**:
  - `transparent`: boolean (switches header styling from background-less to solid background upon page scroll)
* **States**:
  - `Normal`: `rgba(12, 12, 12, 0.8)` background with backdrop-filter blur `10px`.
  - `Scrolled`: Smooth translation down slightly, drops shadow.

### Footer
* **Description**: Detailed multi-column navigation footer with community links and legal notice.
* **Responsive Behavior**: 5-column grid on desktop, stacking to 2-column or 1-column on mobile.
* **Props**: None.

---

## 2. Interactive Controls

### Button
* **Description**: Interactive actions, links, and triggers.
* **Variants**:
  - `primary`: Solid purple (`#6d24e5`) background, white text. Soft hover shift to `#5b21b9`.
  - `glowing`: Indigo-purple background with a secondary absolute glow container creating back-glow shadow.
  - `secondary`: Ghost styling with white outline border. Background opacity transitions on hover.
  - `accent`: Cyberpunk orange-red background (`#e21b22`) or gold/yellow highlighting.
* **Props**:
  - `variant`: `'primary' | 'secondary' | 'glowing' | 'accent'`
  - `size`: `'sm' | 'md' | 'lg'`
  - `href`: string (optional, renders as Next.js `Link`)
  - `children`: ReactNode
* **Visual States**:
  - `Hover`: Translation up `2px`, scale `1.02`, glow opacity increase.
  - `Focus`: Rings of brand color accentuating boundary.

---

## 3. Data Presentation Elements

### Card
* **Description**: Wrapper item containing image grids, feature details, or values.
* **Variants**:
  - `GlassCard`: Soft transparent border (`rgba(255,255,255,0.05)`), dark layout backdrop blur.
  - `GlowCard`: Active border glow trigger. Border glows purple when hovered.
  - `FeaturedCaseCard`: Larger layout highlighting background image with title text overlaid at bottom-left.
* **Props**:
  - `title`: string
  - `description`: string (optional)
  - `imageSrc`: string (optional)
  - `tag`: string (optional)
  - `link`: string (optional)
* **Visual States**:
  - `Hover`: Internal image zooms `1.08x`, title color changes to purple.

### Infinite Marquee
* **Description**: Horizontal autoscrolling component containing partner/client logo images.
* **Responsive Behavior**: Auto-speeds relative to viewport width. Infinite animation Loop.
* **Props**:
  - `direction`: `'left' | 'right'`
  - `speed`: number (seconds per cycle)
  - `logos`: array of `{ src: string, alt: string }`
* **Visual States**:
  - `Pause on Hover`: Optional pausing of translation when user mouse hovers over logo loop.

---

## 4. Accordions & Complex Controls

### StepAccordion
* **Description**: A multi-step flow tracker (e.g. "How It Works" phases).
* **Responsive Behavior**: 
  - Desktop: Vertical timeline where active title scales up and details slide open.
  - Mobile: Basic stack cards with collapsible heights.
* **Props**:
  - `steps`: array of `{ title: string, description: string, stepNumber: number }`

### FAQAccordion
* **Description**: Grid list of questions and answers.
* **Props**:
  - `items`: array of `{ question: string, answer: string }`
  - `allowMultiple`: boolean (optional)
* **Visual States**:
  - `Expanded`: Smooth dynamic height rendering utilizing Framer Motion's `AnimatePresence`. Chevron arrow rotates `180` degrees.
