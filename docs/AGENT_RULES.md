# KAIROTRIX Website — AI Agent Rules

> **File:** `docs/AGENT_RULES.md` (auto-referenced from `.agents/rules/AGENTS.md`)
> **Purpose:** Behavioral rules for all AI agents (coding agents, content agents, design agents) working on the KAIROTRIX website.
> **Priority:** These rules are NON-NEGOTIABLE. Read before doing anything.

---

## RULE 0 — ALWAYS READ CONTEXT FIRST

Before writing any code, generating any content, or making any design decisions:

1. Read `docs/PROJECT_CONTEXT.md` — locked decisions, sitemap, design system
2. Read `docs/TECH_STACK.md` — dependencies, structure, CSS tokens
3. Read `docs/BUILD_PROGRESS.md` — what's been built and approved
4. Check the current task in `docs/BUILD_PROGRESS.md`

**Never proceed without understanding what's already been decided.**

---

## RULE 1 — ONE COMPONENT AT A TIME

The user must review and approve **every component before the next one begins**.

```
❌ WRONG: Build Nav + Hero + WhatIsKairotrix all at once
✅ RIGHT: Build Nav → user reviews → user approves → then Hero
```

The development order is defined in `BUILD_PROGRESS.md`.

**If the user is not satisfied with a component, iterate on it until they are. Never move forward until explicitly approved.**

---

## RULE 2 — NEVER ASSUME VISUAL DECISIONS

Colors, fonts, animation speed, spacing, layout composition — these are design decisions. Use the design tokens from `TECH_STACK.md`. If a decision is not in the tokens or `PROJECT_CONTEXT.md`, ask the user before implementing.

**Exception:** Minor micro-interaction details (hover easing, shadow values) can be judgment calls if they follow the design system direction.

---

## RULE 3 — PREMIUM IS THE MINIMUM BAR

Every component must look and feel premium. If it looks:
- Generic
- Template-like
- Like a free UI kit component
- Like an AI generated website
- Like a startup template

...it is **not acceptable**. Rebuild it.

**Checklist before submitting any component:**
- [ ] Typography has clear hierarchy with correct tokens
- [ ] Spacing is generous and intentional (not cramped)
- [ ] Hover/focus/active states are defined
- [ ] Animations are purposeful and smooth
- [ ] Color usage follows the 70-20-10 ratio (neutral/brand/accent)
- [ ] Gradients are used sparingly and purposefully
- [ ] No placeholder text ("Lorem ipsum", "Your Company Name")
- [ ] Mobile layout is considered

---

## RULE 4 — NO FABRICATED CONTENT

**Never generate:**
- Fake client testimonials
- Fake client logos
- Fake project names or outcomes
- Fake metrics ("increased revenue by 300%")
- Fake team members

Use placeholder structure markers like `{PROJECT_NAME}` or `[Client Name — to be added]` instead.

---

## RULE 5 — MOTION IS PURPOSEFUL

Every animation must have a reason. Ask: **"What does this motion communicate?"**

If the answer is "it looks cool," it's not good enough.

Valid reasons:
- Reveals content progressively to create curiosity
- Demonstrates KAIROTRIX's web/UI/UX capability
- Guides the eye to the next important element
- Provides feedback for an interaction
- Communicates the "Transformation" visual concept

**Always implement `prefers-reduced-motion` media query:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Parallax → static. Transforms → fade only. Keep essential feedback. */
}
```

---

## RULE 6 — TAILWIND CSS v4 — USE THEME TOKENS

All styling must use **Tailwind CSS v4 utility classes** backed by the `@theme` tokens defined in `globals.css`. Do not hardcode raw color hex values, arbitrary pixel sizes, or inline styles when a token-based utility class exists.

```tsx
// ❌ WRONG — hardcoded hex in arbitrary value
<div className="text-[#9333EA] p-[48px]">

// ❌ WRONG — inline style
<div style={{ color: '#9333EA', padding: 48 }}>

// ✅ RIGHT — uses @theme token as Tailwind class
<div className="text-brand-500 px-6 py-12">

// ✅ RIGHT — gradient utility defined in globals.css
<div className="gradient-signature">
```

**For Framer Motion / GSAP animation values** (where Tailwind classes can't reach):
```tsx
// ✅ Acceptable — read from CSS vars for JS animations
const brandColor = 'var(--color-brand-500)'; // from @theme
```

**CSS Modules** are allowed ONLY for:
- Complex 3D/WebGL component wrappers
- GSAP-pinned scroll sections with many layered transforms
- Anything that would require 10+ Tailwind classes and hurts readability

---

## RULE 7 — TYPESCRIPT REQUIRED

All components must be written in TypeScript. No `any` types without a clear comment explaining why. Always define proper interfaces for props.

```typescript
// ❌ WRONG
export default function Button(props: any) { ... }

// ✅ RIGHT
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
export default function Button({ variant, size = 'md', children, ...props }: ButtonProps) { ... }
```

---

## RULE 8 — SEMANTIC HTML + ACCESSIBILITY

- Use correct HTML5 semantic elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`)
- Every page has exactly one `<h1>`
- All interactive elements have descriptive IDs
- Focus states must be visible
- Color is never the sole carrier of meaning
- WCAG 2.2 AA: ≥4.5:1 contrast for normal text, ≥3:1 for large text

---

## RULE 9 — PERFORMANCE AWARENESS

3D, video, and heavy animations must be:
- Lazy-loaded (only initialize when in viewport)
- Progressively enhanced (content-first)
- Tested for impact before shipping

Load priority: **Content → Functional UI → Important Media → Enhancement → Decoration**

---

## RULE 10 — LOCKED DECISIONS ARE LOCKED

The following have been decided and are NOT open for debate:

| Decision | Value |
|---|---|
| Framework | Next.js 15 App Router |
| Brand color | #9333EA (Kairo Purple) |
| Dark background | #08080C |
| Light background | #FFFFFF |
| Sitemap | Per PROJECT_CONTEXT.md Section 4 |
| Homepage sections | Per PROJECT_CONTEXT.md Section 6 |
| No fabricated social proof | Hard rule — no exceptions |
| CSS approach | CSS Custom Properties / CSS Modules |
| Motion philosophy | Per PROJECT_CONTEXT.md Section 12 |
| Service categories | The 6 BDD areas — do not rename or reorder |

If anything feels like it conflicts with a locked decision, **stop and ask the user** rather than making your own call.

---

## RULE 11 — FILE NAMING CONVENTIONS

```
Components:     PascalCase.tsx           → HeroSection.tsx
Hooks:          camelCase.ts             → useScrollProgress.ts
Utilities:      camelCase.ts             → animations.ts
Styles:         camelCase.module.css     → heroSection.module.css
Content:        kebab-case.mdx           → ai-agent-development.mdx
Pages:          Next.js conventions      → page.tsx, layout.tsx
```

---

## RULE 12 — COMPONENT COMPLETENESS

When building a UI component, always include all interaction states:
- Default
- Hover
- Focus (keyboard accessible)
- Active / Pressed
- Disabled
- Loading (where applicable)

---

## RULE 13 — CONTENT PLACEHOLDERS

When content is not yet written, use clearly marked structural placeholders:

```tsx
// ✅ Correct placeholder
<h1>{/* HEADLINE: [Copy Agent will provide] */}Technology that moves ideas into real-world solutions.</h1>

// ✅ Section placeholder
{/* SECTION: Capability Showcase — design TBD after user review of hero/identity sections */}
```

Never leave components broken or empty. Always use sensible placeholder content.

---

## RULE 14 — RESPONSIVE MOBILE-FIRST

Build mobile-first. Start with the 4-column mobile layout and scale up.

```css
/* Mobile first */
.section { padding: 3rem 1rem; }

/* Tablet */
@media (min-width: 768px) { .section { padding: 5rem 2rem; } }

/* Desktop */
@media (min-width: 1280px) { .section { padding: var(--space-section) var(--grid-margin); } }
```

Complex 3D/parallax sections must have genuine mobile alternatives — not a broken or degraded desktop version.

---

## RULE 15 — UPDATE docs/BUILD_PROGRESS.md

After every approved component, update `docs/BUILD_PROGRESS.md`:
- Mark the component as complete
- Note any decisions made during building
- Note what comes next

---

## AGENT QUICK REFERENCE CARD

```
Before building:  → Check docs/PROJECT_CONTEXT.md + docs/BUILD_PROGRESS.md
During building:  → Tailwind v4 classes, TypeScript, all states, mobile-first
After building:   → STOP. Wait for user review. Update docs/BUILD_PROGRESS.md only after approval.

Styling:          → Tailwind CSS v4 utility classes + @theme tokens
Colors:           → text-brand-500 / bg-brand-500 (= #9333EA)
Bg dark:          → bg-bg-dark (= #08080C)
Gradient:         → gradient-signature utility for hero/major moments
Animation lib:    → Framer Motion (general) + GSAP (scroll-controlled, pinned)
3D:               → Three.js + @react-three/fiber
Scroll:           → Lenis (smooth scroll)
Class merging:    → twMerge() from tailwind-merge for dynamic classes
```
