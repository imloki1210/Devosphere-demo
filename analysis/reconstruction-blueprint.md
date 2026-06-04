# Next.js 15 Reconstruction Blueprint - X-Team Rebuild

This blueprint outlines the architectural design and implementation checklist for rebuilding the X-Team website.

---

## 1. Recommended Folder Structure

A standardized Next.js 15 directory structure featuring the App Router:

```text
x-team-rebuild/
├── app/
│   ├── layout.tsx                 # Root layout (Global fonts, Providers)
│   ├── page.tsx                   # Homepage (/)
│   ├── about/
│   │   └── page.tsx               # About Page (/about)
│   ├── how-it-works/
│   │   └── page.tsx               # How It Works (/how-it-works)
│   ├── software-development-solutions/
│   │   └── page.tsx               # Solutions (/software-development-solutions)
│   ├── case-studies/
│   │   ├── page.tsx               # Case Studies Index (/case-studies)
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic Case Study Details (/case-studies/*)
│   ├── industries/
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic Industry Pages (/industries/*)
│   ├── technologies/
│   │   ├── page.tsx               # Technologies Index (/technologies)
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic Tech Landing Pages (/technologies/*)
│   ├── magazine/
│   │   ├── page.tsx               # Magazine Home (/magazine)
│   │   └── [slug]/
│   │       └── page.tsx           # Article Pages (/magazine/*)
│   ├── book-a-meeting-[coordinator]/
│   │   └── page.tsx               # Booking calendar routing
│   ├── globals.css                # Tailwind base + CSS custom variables
│   └── favicon.ico
├── components/
│   ├── ui/                        # Reusable low-level atoms (buttons, cards)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── text.tsx
│   ├── layout/                    # Layout shells
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-nav.tsx
│   └── modules/                   # Complex layout panels / section content
│       ├── hero-section.tsx
│       ├── trust-marquee.tsx
│       ├── stats-counter.tsx
│       ├── testimonial-slider.tsx
│       └── faq-accordion.tsx
├── lib/
│   ├── utils.ts                   # Tailwind Merge and clsx utility
│   ├── motion.ts                  # Shared Framer Motion animation configurations
│   └── data.ts                    # Static or mock API resolvers for pages
├── public/
│   ├── assets/                    # SVG Icons, Logos, Background Vectors
│   └── fonts/                     # Local fonts override (if using custom TTF/WOFF2)
├── tailwind.config.ts             # Custom configurations mapped to variables
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. Component Architecture (React & Server Components)

To optimize Core Web Vitals (FCP, LCP), we separate components into **React Server Components (RSC)** and **Client Components**:

| Component Name | Type | Key Interactions / Dependencies |
| :--- | :--- | :--- |
| `app/layout.tsx` | **RSC** | Provides metadata, HTML shell, and loads Next.js Google Font integration. |
| `components/layout/header.tsx` | **Client** | Tracks scroll positions (`window.scrollY`) to toggle active classes. |
| `components/modules/trust-marquee.tsx` | **Client** | Framer Motion infinite loop slider (requires Client for linear translation loop). |
| `components/modules/stats-counter.tsx` | **Client** | standard countup transition using Framer Motion's `useTransform` and `useInView`. |
| `components/modules/faq-accordion.tsx` | **Client** | Dynamic accordion height management utilizing `AnimatePresence`. |
| `app/case-studies/[slug]/page.tsx` | **RSC** | Resolves dynamic content statically via `generateStaticParams()` to optimize speed. |

---

## 3. Data Architecture (SEO & Static Generation)

* **Static Site Generation (SSG)**:
  - All standard pages (`/`, `/about`, `/how-it-works`, `/careers`) and dynamic pages (`/case-studies/[slug]`, `/technologies/[slug]`) should use SSG.
  - Dynamic parameters must be generated during build time:
    ```typescript
    export async function generateStaticParams() {
      // Return list of slugs from data manifests
      return [{ slug: 'riot-games-modernize-legacy-systems' }, { slug: 'fox-sports-streaming-performance' }];
    }
    ```
* **SEO Metadata**:
  - Implement dynamic metadata support:
    ```typescript
    export async function generateMetadata({ params }: Props) {
      return {
        title: `Hire Remote ${params.slug} Developers - X-Team`,
        description: `Scale your capacity with vetted, world-class ${params.slug} developers.`,
      };
    }
    ```

---

## 4. Animation Architecture (Framer Motion)

* **Configuration Module (`lib/motion.ts`)**:
  Export reusable variants to prevent boilerplate animations in page modules:
  ```typescript
  export const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1], delay }
    }
  });
  ```
* **Performance Optimizations**:
  - Use `LazyMotion` to dynamically load Framer Motion's feature set only when needed, reducing primary bundle sizes.
  - Utilize `whileInView` for viewport entrance transitions instead of scroll listeners.
