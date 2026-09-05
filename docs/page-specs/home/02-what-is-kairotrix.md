# HOME — Section 02: WHAT IS KAIROTRIX?

> **Status:** Spec locked — ready to build
> **Location:** `/` (Homepage, after hero)
> **Motion Level:** ⭐⭐⭐ Smooth narrative — refined transitions

---

## PURPOSE

The visitor has just experienced the hero. They're asking:

> *"Okay... who are these people?"*

This section answers **identity** — not services. It establishes what KAIROTRIX fundamentally **is** and what kind of company it represents. This is not a giant About section — it should be concise, confident, and well-composed.

---

## WHAT IT MUST COMMUNICATE

1. **What KAIROTRIX is** — AI Technology & Software Solutions company
2. **What kind of company** — technology partner, not a vendor; problem-first, not technology-first
3. **Who it helps** — businesses, startups, founders
4. **The scope of work** — AI, software, automation, digital, data, integration
5. **The philosophy** — understand the problem first, then choose the technology

**Must NOT:**
- Dump service lists
- Sound like a corporate about page
- Use generic words: *innovative, cutting-edge, revolutionize, empower*
- Feel like lorem ipsum placeholder content

---

## LAYOUT STRUCTURE

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [ SECTION EYEBROW — e.g. "KAIROTRIX" ]            │
│                                                     │
│  A technology company built to solve real          │
│  business problems through AI, software,           │
│  and intelligent systems.                          │
│                                                     │
│  ───────────────────────────────────               │
│                                                     │
│  [ SHORT IDENTITY PARAGRAPH ]                       │
│                                                     │
│  We identify the problem first.                     │
│  Then we select the right technology.               │
│                                                     │
│  [ EXPLORE KAIROTRIX → ]                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Possible split layout (desktop):**
```
Left:  Large typographic statement / identity headline
Right: Short supporting paragraph + CTA
```

---

## CONTENT ELEMENTS

### Eyebrow Label
- Small caps or tracked uppercase label
- e.g. `KAIROTRIX` or `WHO WE ARE`

### Primary Statement (H2 level)
- Punchy, 1–2 sentence identity statement
- Communicates what KAIROTRIX does at a company level
- Placeholder: *"A technology partner that understands your business before choosing a solution."*
- Final copy: Content agent

### Supporting Copy
- 2–3 sentences max
- Explains the problem-first philosophy without jargon
- Mentions the range: AI → software → automation → data → integration
- Placeholder: *"KAIROTRIX works across AI, software development, automation, digital transformation, data systems, and technology integration — selecting the right approach for each unique problem."*

### CTA (optional at this section)
- **"About KAIROTRIX"** → links to `/about`
- Or removed if the overall flow reads well without it

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Section entry | Framer Motion `whileInView` — fade up on scroll |
| Primary statement | Staggered word/line reveal (subtle, not aggressive) |
| Supporting copy | Fade in slightly after headline |
| Divider line | Draw from left to right on entry |
| CTA | Fade in last |

### Implementation
```tsx
// Use Framer Motion viewport trigger
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
>
```

---

## prefers-reduced-motion FALLBACK

- All elements appear immediately without animation
- Content is fully readable without motion

---

## MOBILE BEHAVIOR

- Single column layout
- Statement stacks above supporting copy
- Font sizes scale down to mobile tokens
- CTA full-width on mobile

---

## DESIGN NOTES

- **Color mode:** Can transition to light here if hybrid mode is chosen, OR stay dark
- This is a **typography-dominant** section — not illustration-heavy
- White space is a feature, not a gap to fill
- The visual quality comes from excellent typography, hierarchy, and spacing — not decoration
- Possible: a subtle `gradient-glow` in the background at low opacity

---

## OPEN QUESTIONS

- [ ] **Final headline copy** — content agent
- [ ] **Light or dark section?** — decide during visual prototype phase
- [ ] **Include CTA or let scrolling continue naturally?** — decide during build review

---

## DEPENDENCIES

- Framer Motion (whileInView)
- `useReducedMotion` hook
