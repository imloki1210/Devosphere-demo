# Animation Specifications & Motion Design - X-Team Rebuild

To achieve the premium, fluid user experience of `x-team.com`, transitions and micro-interactions must feel coordinated. Below are the animation behaviors, timings, and Framer Motion structures recommended for the reconstruction.

---

## 1. Global Easing Curves

To simulate the sleek organic responses on the website, we define three main cubic-bezier presets:

* **Sleek Entrance (`easeOutBack`)**: `cubic-bezier(0.175, 0.885, 0.32, 1.1)` (creates a subtle overshoot, great for cards and menu entries).
* **Fluid Slide (`smoothInOut`)**: `cubic-bezier(0.25, 1, 0.5, 1)` (used for accordions and global routes).
* **Linear continuous (`linearMarquee`)**: `linear` (used for logo loops).

---

## 2. Animation Registry

### Page-Load Fade (Hero Elements)
* **Trigger**: Component mount.
* **Framer Motion Setup**:
  ```typescript
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1], // smoothInOut
        staggerChildren: 0.15
      }
    }
  };
  ```
* **Metrics**:
  - **Duration**: `0.8s`
  - **Delay**: Staggered starts (`0s`, `0.15s`, `0.3s` for title, subtitle, CTA)
  - **Translation Y**: From `30px` to `0px`
  - **Opacity**: `0` to `1`

### Scroll-Triggered Card Slide-Up
* **Trigger**: Element enters viewport (`whileInView` with `viewport: { once: true, margin: "-100px" }`).
* **Framer Motion Setup**:
  ```typescript
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  ```
* **Metrics**:
  - **Duration**: `0.6s`
  - **Translation Y**: From `40px` to `0px`
  - **Opacity**: `0` to `1`

### Infinite Logo Marquee Loop
* **Trigger**: Page layout active.
* **Framer Motion / CSS Animation Setup**:
  - Twin track layout to prevent whitespace gaps.
  - Track translation from `0%` to `-50%` over loop timeline.
* **Metrics**:
  - **Duration**: `30s` (desktop), `20s` (mobile)
  - **Easing**: `linear`
  - **Looping**: Infinite repeat

### Expandable Accordion
* **Trigger**: User click.
* **Framer Motion Setup**:
  ```typescript
  const accordionVariants = {
    collapsed: { height: 0, opacity: 0 },
    open: { 
      height: "auto", 
      opacity: 1,
      transition: { height: { duration: 0.35, ease: "easeInOut" }, opacity: { duration: 0.25 } }
    }
  };
  ```
* **Metrics**:
  - **Duration**: `0.35s`
  - **Easing**: `easeInOut`

### Card / Interactive Hover Glow
* **Trigger**: Hover state (`whileHover`).
* **Framer Motion Setup**:
  ```typescript
  const hoverVariants = {
    hover: { 
      scale: 1.02, 
      y: -5, 
      boxShadow: "0 0 20px rgba(109, 36, 229, 0.45)",
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };
  ```
* **Metrics**:
  - **Duration**: `0.25s`
  - **Scale**: `1.0` to `1.02`
  - **Translation Y**: `0` to `-5px`

### Mobile Menu Drawer Slide
* **Trigger**: Hamburger icon click.
* **Framer Motion Setup**:
  ```typescript
  const drawerVariants = {
    closed: { x: "100%", transition: { ease: "easeInOut", duration: 0.3 } },
    open: { x: 0, transition: { ease: "easeOut", duration: 0.4 } }
  }
  ```
* **Metrics**:
  - **Duration**: `0.4s` (open), `0.3s` (close)
  - **Direction**: Horizontal right-to-left.
