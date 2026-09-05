# KAIROTRIX Website — Tech Stack & Architecture

> **Status:** Approved Setup Document
> **Framework:** Next.js 15 (App Router)

---

## 1. FRAMEWORK DECISION

### Primary: Next.js 15 (App Router)

**Why Next.js:**
- Server-side rendering for SEO-critical service/solution pages
- Static generation for performance on content pages (Insights, Work)
- Incremental Static Regeneration (ISR) when content is added
- API routes for contact form, AI assistant backend
- Image optimization built-in (critical for video thumbnail performance)
- TypeScript-first
- Excellent ecosystem for animations (Framer Motion integration)

**Why App Router (not Pages Router):**
- Server Components for better performance
- Streaming SSR for heavy pages
- Layout nesting matches KAIROTRIX's multi-level architecture
- Future-proof

---

## 2. FULL DEPENDENCY MAP

### Core
```
next@15                    — Framework
react@19                   — UI library
react-dom@19               — DOM renderer
typescript@5               — Type safety
```

### Animation & Motion (CRITICAL for this project)
```
framer-motion@11+          — Primary animation library (scroll-controlled, parallax, layout animations)
gsap@3+                    — Complex scroll-controlled video scrubbing, pinned sections (ScrollTrigger)
@gsap/react                — GSAP React helpers
lenis@1+                   — Smooth scroll (replaces native scroll, used with GSAP/Framer)
```

### 3D (for "How We Think / Build" section)
```
three@0.170+               — 3D engine
@react-three/fiber@9+      — React renderer for Three.js
@react-three/drei@9+       — Useful helpers (cameras, loaders, effects)
@react-three/postprocessing — Visual effects (bloom, depth of field)
```

### Video (for scroll-controlled hero)
```
— Native HTML5 video element (scroll-controlled via GSAP/Framer)
— OR Remotion (if programmatic video is needed)
```

### Styling
```
— Tailwind CSS v4                             — Utility-first styling (CSS-native, no config file)
— CSS Modules (component-specific overrides)  — For complex 3D/parallax/animation components only
— @theme block in globals.css                 — Design tokens declared natively in CSS
— clsx                                        — Conditional class names
— tailwind-merge (twMerge)                    — Merge conflicting Tailwind classes safely
```

> **Tailwind CSS v4** — CSS-native, uses `@import "tailwindcss"` + `@theme` for tokens. No `tailwind.config.js` needed.

### Content Management (future-ready)
```
— File-based MDX initially (for Insights, Case Studies)
— OR Contentlayer / Sanity / Notion API (when content grows)
— next-mdx-remote                            — MDX rendering
— gray-matter                                 — Frontmatter parsing
```

### Forms & Contact
```
— React Hook Form                             — Form state management
— Zod                                         — Schema validation
— Resend / Nodemailer                         — Email sending from API route
```

### AI Assistant
```
— Vercel AI SDK (ai@4+)                       — Streaming AI responses
— OpenAI / Anthropic SDK                      — LLM provider
```

### SEO & Metadata
```
— next/head / Next.js Metadata API            — Per-page metadata
— next-sitemap                                — Auto-generated sitemap.xml
— Schema.org JSON-LD                          — Structured data
```

### Icons
```
— lucide-react                                — Primary icon set (clean, minimal)
— Custom SVGs                                 — Brand-specific icons
```

### Utilities
```
— date-fns                                    — Date formatting for Insights
— sharp                                       — Image processing (Next.js Image)
```

### Development
```
— eslint                                      — Linting
— prettier                                    — Code formatting
— husky + lint-staged                         — Pre-commit hooks
— @types/node, @types/react                   — TypeScript definitions
```

---

## 3. PROJECT DIRECTORY STRUCTURE

```
kairotrix_website/
├── .agents/                          ← Agent rules & context (this project)
│   ├── rules/
│   │   └── AGENTS.md
│   └── PROJECT_CONTEXT.md (symlink or copy)
│
├── docs/                             ← Source planning documents (READ ONLY)
│   ├── KAIROTRIX_Business_Definition_Document.pdf
│   ├── KAIROTRIX start-up - Branch · Website Strategy Planning.md
│   └── KAIROTRIX_UIUX_Master_Design_Foundation.md
│
├── public/
│   ├── videos/                       ← Hero video, section videos
│   ├── images/                       ← Static images, OG images
│   ├── fonts/                        ← Self-hosted fonts (if any)
│   └── favicon.ico
│
├── src/
│   ├── app/                          ← Next.js App Router
│   │   ├── layout.tsx                ← Root layout (nav, footer, AI assistant)
│   │   ├── page.tsx                  ← Homepage
│   │   ├── globals.css               ← Global CSS + design tokens
│   │   │
│   │   ├── solutions/
│   │   │   ├── page.tsx              ← Solutions index
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← Solution category page
│   │   │
│   │   ├── work/
│   │   │   ├── page.tsx              ← Work index
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← Project / Demo detail
│   │   │
│   │   ├── insights/
│   │   │   ├── page.tsx              ← Insights index
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← Article / Case Study detail
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── contact/route.ts      ← Contact form handler
│   │       └── assistant/route.ts    ← AI assistant API
│   │
│   ├── components/
│   │   ├── ui/                       ← Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── Pagination.tsx
│   │   │
│   │   ├── layout/                   ← Layout components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AIAssistant.tsx
│   │   │
│   │   ├── home/                     ← Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhatIsKairotrix.tsx
│   │   │   ├── WhatWeProvide.tsx
│   │   │   ├── WorkProof.tsx
│   │   │   ├── HowWeThinkBuild.tsx   ← 3D/parallax section
│   │   │   ├── InsightsPreview.tsx
│   │   │   └── FinalCTA.tsx
│   │   │
│   │   ├── solutions/
│   │   ├── work/
│   │   ├── insights/
│   │   └── contact/
│   │
│   ├── lib/                          ← Utilities, helpers
│   │   ├── content.ts                ← MDX/content loading
│   │   ├── animations.ts             ← Shared animation variants
│   │   ├── scroll.ts                 ← Scroll utilities
│   │   └── metadata.ts               ← SEO helpers
│   │
│   ├── styles/                       ← CSS modules
│   │   ├── tokens.css                ← Design tokens (colors, spacing, type)
│   │   ├── animations.css            ← Keyframe animations
│   │   └── utilities.css             ← Utility classes
│   │
│   ├── content/                      ← MDX content files
│   │   ├── work/
│   │   ├── insights/
│   │   └── solutions/
│   │
│   ├── hooks/                        ← Custom React hooks
│   │   ├── useScrollProgress.ts
│   │   ├── useReducedMotion.ts
│   │   └── useInView.ts
│   │
│   └── types/                        ← TypeScript type definitions
│       ├── content.ts
│       └── navigation.ts
│
├── next.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── postcss.config.js
├── package.json
│
├── PROJECT_CONTEXT.md                ← Master context (this workspace)
├── TECH_STACK.md                     ← This file
├── AGENT_RULES.md                    ← Rules for AI agents
└── BUILD_PROGRESS.md                 ← What's been built & approved
```

---

## 4. CSS ARCHITECTURE (Tailwind CSS v4)

### How Tailwind v4 Works
- **No `tailwind.config.js`** — all config lives inside CSS via `@theme`
- Import with `@import "tailwindcss"` in `globals.css`
- Custom design tokens are declared inside an `@theme {}` block
- Generates utility classes automatically from your tokens
- e.g. `--color-brand-500: #9333EA` → `text-brand-500`, `bg-brand-500`, `border-brand-500`

### Design Tokens (src/app/globals.css)
```css
@import "tailwindcss";

@theme {
  /* === BRAND COLORS === */
  --color-brand-primary: #9333EA;
  --color-brand-hover: #7C3AED;
  --color-brand-soft: rgba(147, 51, 234, 0.12);

  /* Tailwind-style brand scale */
  --color-brand-400: #A855F7;
  --color-brand-500: #9333EA;
  --color-brand-600: #7C3AED;
  --color-brand-700: #6D28D9;

  /* === KAIROTRIX NEUTRALS === */
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #FAFAFC;
  --color-neutral-100: #F4F4F7;
  --color-neutral-200: #E8E8EF;
  --color-neutral-300: #D1D1E0;
  --color-neutral-500: #8E8EA8;
  --color-neutral-700: #4A4A6A;
  --color-neutral-900: #1A1A2E;
  --color-neutral-950: #0F0F17;

  /* === SURFACES === */
  --color-bg-dark: #08080C;
  --color-bg-light: #FFFFFF;
  --color-surface-dark: #0F0F17;
  --color-surface-elevated: #141420;

  /* === SEMANTIC === */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* === TYPOGRAPHY === */
  --font-sans: 'Inter', system-ui, sans-serif;   /* placeholder — finalize in prototype */
  --font-mono: 'JetBrains Mono', monospace;

  /* === ANIMATION DURATIONS === */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --duration-xslow: 1200ms;

  /* === EASINGS === */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* === SPACING (used for section/component padding) === */
  --spacing-section-sm: 5rem;
  --spacing-section-lg: 10rem;

  /* === SHADOWS === */
  --shadow-brand: 0 4px 32px rgba(147, 51, 234, 0.24);
  --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.16);
}

/* Dark mode base (applied via data-theme or class) */
.dark {
  --color-bg: var(--color-bg-dark);
  --color-surface: var(--color-surface-dark);
  --color-text-primary: var(--color-neutral-0);
  --color-text-secondary: var(--color-neutral-300);
  --color-text-muted: var(--color-neutral-500);
  --color-border: rgba(255, 255, 255, 0.08);
}

/* Light mode base */
.light {
  --color-bg: var(--color-bg-light);
  --color-surface: var(--color-neutral-50);
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-700);
  --color-text-muted: var(--color-neutral-500);
  --color-border: rgba(0, 0, 0, 0.08);
}

/* Gradient utilities */
@utility gradient-brand-core {
  background: linear-gradient(135deg, #9333EA, #7C3AED);
}
@utility gradient-signature {
  background: linear-gradient(135deg, #9333EA, #6366F1, #4338CA);
}
@utility gradient-surface-dark {
  background: linear-gradient(135deg, #0F0F17, #08080C);
}
@utility gradient-glow {
  background: radial-gradient(ellipse at center, rgba(147, 51, 234, 0.35) 0%, transparent 70%);
}

/* prefers-reduced-motion global */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. NEXT.JS CONFIGURATION

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Performance: chunk splitting
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
```

---

## 6. INITIALIZATION COMMANDS

```bash
# From d:\Projects\kairotrix\kairotrix_website

# Initialize Next.js project
npx -y create-next-app@latest ./ --typescript --app --src-dir --no-tailwind --import-alias "@/*" --use-npm

# Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/postcss

# Install animation libraries
npm install framer-motion gsap @gsap/react lenis

# Install 3D libraries
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# Install form & validation
npm install react-hook-form zod @hookform/resolvers

# Install content utilities
npm install gray-matter next-mdx-remote date-fns

# Install icon library
npm install lucide-react

# Install AI SDK (for AI assistant)
npm install ai

# Install utilities
npm install clsx tailwind-merge

# Dev dependencies
npm install -D @types/three prettier eslint-config-prettier
```

---

## 7. PERFORMANCE BUDGET

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Total JS (initial) | < 200KB gzipped |
| Hero video | Lazy-loaded after LCP |
| 3D scene | Loaded only when section is in viewport |
| Images | WebP/AVIF, lazy-loaded, properly sized |

---

## 8. BROWSER SUPPORT

- Chrome, Firefox, Safari, Edge (last 2 major versions)
- iOS Safari 16+
- Android Chrome 110+
- 3D/parallax effects get graceful fallbacks on low-end devices

---

## 9. DEPLOYMENT

- **Platform:** Vercel (preferred for Next.js) or any Node.js host
- **Environment Variables:**
  ```
  OPENAI_API_KEY=
  CONTACT_EMAIL=
  RESEND_API_KEY=
  ```
- **Branches:** `main` → production, `dev` → preview, `feature/*` → feature work
