# HOME — Section 06: INSIGHTS PREVIEW

> **Status:** Spec locked — ready to build
> **Location:** `/` (Homepage, sixth section)
> **Motion Level:** ⭐⭐ Restrained — content-first

---

## PURPOSE

The visitor has experienced the hero, learned who KAIROTRIX is, seen what it offers, seen proof, and experienced the methodology. Now we establish **expertise and thought leadership**:

> *"These people don't just build technology. They understand it."*

This section is intentionally **restrained** compared to the sections before it. Motion is minimal — the content itself does the work.

---

## WHAT IS SHOWN

A **curated selection** from the Insights content ecosystem. NOT a blog archive grid. A hand-picked, editorially presented preview — max 3–4 items.

Content types that can appear:
```
Featured Case Study
Featured Article / Perspective
Featured Technical Deep Dive
Featured Video
```

**V1 launch state:** If Insights content doesn't exist yet, this section can either be omitted initially or show "Coming Soon" styled placeholder cards — but NO fabricated content.

---

## LAYOUT CONCEPT

### Option A — Editorial Row (Recommended)
```
┌───────────────────────────────────────────────┐
│  INSIGHTS                                     │
│  Thinking, learning, and building in public.  │
│                                               │
│  ┌──────────────┐  ┌──────────┐  ┌────────┐ │
│  │ CASE STUDY   │  │ ARTICLE  │  │ VIDEO  │ │
│  │ [Featured]   │  │          │  │ ▶      │ │
│  │              │  │          │  │        │ │
│  └──────────────┘  └──────────┘  └────────┘ │
│                                               │
│  [ Explore Insights → ]                      │
└───────────────────────────────────────────────┘
```

### Option B — Large Featured + Small Secondary
```
┌───────────────────────────────────────────────┐
│                                               │
│  ┌─────────────────────┐  ┌────────────────┐ │
│  │   LARGE FEATURED    │  │ Secondary 01   │ │
│  │   (Case Study/Video)│  ├────────────────┤ │
│  │                     │  │ Secondary 02   │ │
│  └─────────────────────┘  └────────────────┘ │
│                                               │
│  [ Explore Insights → ]                      │
└───────────────────────────────────────────────┘
```

**Default:** Option B. Feels editorial and deliberate rather than a card grid.

---

## INSIGHT CARD CONTENT

Each insight card contains:
- **Type label** — `CASE STUDY` / `ARTICLE` / `VIDEO` / `GUIDE` / `PERSPECTIVE`
- **Title** — article/case study title
- **One-line teaser** — what the reader will learn
- **Reading time** or `Watch: X min`
- **Thumbnail** — image or video thumbnail (with play icon for video)
- **CTA** — "Read More →" or "Watch →" → routes to `/insights/[slug]`

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Section headline | Fade up on scroll entry |
| Cards | Stagger in — subtle, 60ms between each |
| Card hover | Very subtle lift (2px), border highlight |
| Video card hover | Show play button fade-in |
| CTA | Appears after cards |

**This section is intentionally the calmest animated section on the page.** After the intensity of Section 05 (3D), visitors need a content-restful moment.

---

## prefers-reduced-motion FALLBACK

- Cards appear without animation
- Full content visible immediately

---

## MOBILE BEHAVIOR

- Cards stack vertically (full-width)
- Featured card first, then secondary cards below
- Touch-friendly tap targets

---

## DESIGN NOTES

- **Color mode:** Light section works well here — creates contrast after dark Section 05
- Typography-forward — the card design should feel editorial, like a magazine layout
- Video thumbnails: must have proper aspect ratio containers (`aspect-video` Tailwind class)
- NO generic stock photography — only original visuals or actual screenshots
- Category labels: styled as small caps badges using the `Badge` component

---

## V1 CONTENT STATE

If no Insights content exists at launch:
- Option 1: **Omit this section entirely** — cleaner than empty cards
- Option 2: Show 1–2 "Coming Soon" cards with teaser titles — labeled clearly as upcoming
- Option 3: Show KAIROTRIX's own website build as a case study / technical deep-dive

**Preferred: Option 3** — write a technical deep-dive about building kairotrix.com as the first Insight.

---

## CTA

- **"Explore Insights →"** → routes to `/insights`
- Below the card grid

---

## OPEN QUESTIONS

- [ ] **What Insights content will exist at launch?**
- [ ] **Light or dark section?** — decide in visual prototype phase
- [ ] **Featured content selection** — editorial decision

---

## DEPENDENCIES

- Framer Motion (stagger, hover)
- MDX content system (for actual articles)
- `useReducedMotion` hook
