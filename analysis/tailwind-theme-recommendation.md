# Tailwind CSS Theme Recommendation - X-Team Rebuild

To successfully rebuild X-Team in Next.js 15, we recommend integrating the extracted design system tokens directly into the `tailwind.config.ts` configuration file. 

By mapping custom variables to Tailwind utility prefixes, developers can maintain visual fidelity while using native Tailwind classes (e.g. `bg-brand`, `text-brand-muted`, `font-heading`).

---

## Recommended `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background-main, #0c0c0c)",
          darker: "var(--background-darker, #000000)",
          card: "var(--background-card, #141416)",
          muted: "var(--background-muted, #1e1e1e)",
        },
        brand: {
          DEFAULT: "var(--brand-primary, #6d24e5)",
          secondary: "var(--brand-secondary, #5b21b9)",
          accent: "var(--brand-accent, #7c3aed)",
          orange: "var(--brand-orange, #f60)",
          red: "var(--brand-red, #e21b22)",
        },
        text: {
          DEFAULT: "var(--text-primary, #ffffff)",
          secondary: "var(--text-secondary, #dfcefc)",
          muted: "var(--text-muted, #8d919b)",
        },
        border: {
          DEFAULT: "var(--border-default, rgba(255, 255, 255, 0.08))",
          glowing: "var(--border-glowing, rgba(109, 36, 229, 0.4))",
        }
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        caption: ["var(--font-roboto)", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20.16px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "25.92px" }],
        xl: ["22.5px", { lineHeight: "25.2px" }],
        "2xl": ["28px", { lineHeight: "36.96px" }],
        "3xl": ["35px", { lineHeight: "46.2px" }],
        "4xl": ["44px", { lineHeight: "49.28px" }],
        "5xl": ["64px", { lineHeight: "72px" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        glow: "0 0 15px rgba(109, 36, 229, 0.35)",
        "glow-intense": "0 0 25px rgba(168, 85, 247, 0.5)",
      },
      backgroundImage: {
        "purple-gradient": "linear-gradient(135deg, #a855f7, #7c3aed)",
        "dark-gradient": "linear-gradient(90deg, #0c0c0c, #6d24e5 50%)",
        "fade-left": "linear-gradient(90deg, #0c0c0c, transparent)",
        "fade-right": "linear-gradient(270deg, #0c0c0c, transparent)",
      },
      zIndex: {
        negative: "-1",
        base: "0",
        sticky: "50",
        overlay: "100",
        modal: "200",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      }
    },
  },
  plugins: [],
};

export default config;
```

---

## Global CSS Setup (`app/globals.css`)

To link these values to CSS variables, declare them in the global CSS sheet. This enables on-the-fly theme switching or client customizations:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@layer base {
  :root {
    --background-main: #0c0c0c;
    --background-darker: #000000;
    --background-card: #141416;
    --background-muted: #1e1e1e;

    --brand-primary: #6d24e5;
    --brand-secondary: #5b21b9;
    --brand-accent: #7c3aed;
    --brand-orange: #f60;
    --brand-red: #e21b22;

    --text-primary: #ffffff;
    --text-secondary: #dfcefc;
    --text-muted: #8d919b;

    --border-default: rgba(255, 255, 255, 0.08);
    --border-glowing: rgba(109, 36, 229, 0.4);
  }
}
```
