# PAGE SPEC: INSIGHTS

> **Status:** Spec ready — build after Work approved
> **Route:** `/insights` (index) + `/insights/[slug]` (detail pages)
> **Motion Level:** ⭐⭐ Restrained — content-first

---

## PURPOSE

Insights is the **knowledge and thought leadership** ecosystem. It is broader than a blog:

> *"Articles, guides, technical content, perspectives, case studies, video."*

It serves three roles:
1. **Establish expertise** — KAIROTRIX understands technology deeply
2. **SEO discovery** — long-tail search traffic from technical content
3. **Trust building** — transparent thinking builds credibility

---

## CONTENT TYPES (LOCKED)

| Type | Description |
|---|---|
| **Articles / Blog** | Technical essays, AI insights & software engineering commentary |
| **Case Studies** | System architecture breakdowns, technical challenge, build, technology & outcomes |
| **System Blueprints** | Production-ready system architectures, data flows & reference designs |
| **Research & Whitepapers** | In-depth AI evaluations, performance benchmarks & tech reports |

**Important distinction:**
- `WORK` = **Show** what was built
- `INSIGHTS` = **Explain** what was learned, architected, or evaluated

---

## INSIGHTS INDEX PAGE (`/insights`)

### Layout
```
┌─────────────────────────────────────────────────────┐
│  PAGE HERO                                          │
│  "Thinking, learning, and building in public."     │
│                                                     │
│  FILTER / CATEGORY TABS                            │
│  [ All ] [ Articles / Blog ] [ Case Studies ]      │
│  [ System Blueprints ] [ Research & Whitepapers ]  │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  ┌──────────────────────────────────────────┐     │
│  │ FEATURED ITEM (large editorial card)      │     │
│  └──────────────────────────────────────────┘     │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐                 │
│  │ Item 2      │  │ Item 3      │                 │
│  └─────────────┘  └─────────────┘                 │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐                 │
│  │ Item 4      │  │ Item 5      │                 │
│  └─────────────┘  └─────────────┘                 │
│                                                     │
│  [ Load more ]                                     │
└─────────────────────────────────────────────────────┘
```

### Index Card Content
- **Type label** — `ARTICLE` / `CASE STUDY` / `VIDEO` / `GUIDE` / `PERSPECTIVE`
- **Thumbnail** — image or video preview
- **Title**
- **Teaser** — 1–2 sentence summary
- **Read time** or `Watch: X min`
- **Date published**
- **Tags** — topic tags (e.g. `AI Agents`, `Automation`, `Next.js`)

---

## ARTICLE / PERSPECTIVE TEMPLATE (`/insights/articles/[slug]`)

```
1. ARTICLE HEADER
   └── Type label, title, date, reading time, author, tags

2. HERO IMAGE (if applicable)

3. ARTICLE BODY
   └── Rich MDX content
   └── Supports: headings, code blocks, diagrams, callouts, images, video embeds

4. TABLE OF CONTENTS (sticky sidebar on desktop)

5. RELATED INSIGHTS
   └── 3 related articles/guides

6. CTA
   └── "Have a technology challenge? Let's talk."
```

---

## CASE STUDY TEMPLATE (`/insights/case-studies/[slug]`)

```
1. HERO
   └── "Case Study" label, title, solution area tags

2. OVERVIEW / CONTEXT
   └── Who, what, why

3. THE CHALLENGE
   └── What was the problem being solved?

4. DISCOVERY & APPROACH
   └── How KAIROTRIX understood and framed the problem

5. THE SOLUTION
   └── What was designed and built

6. TECHNOLOGY
   └── Stack used, with context

7. IMPLEMENTATION
   └── How it was built — technical detail

8. OUTCOME
   └── What was achieved (honest — no fabricated metrics)

9. KEY LEARNINGS
   └── What KAIROTRIX discovered

10. RELATED WORK
    └── Link to Project in Work section (cross-link)

11. CTA
    └── "Build something similar → Let's Talk"
```

---

## VIDEO TEMPLATE (`/insights/videos/[slug]`)

```
1. VIDEO HEADER
   └── "Video" label, title, duration, date

2. VIDEO PLAYER (full-width)
   └── Lazy-loaded, native HTML5 or embedded

3. DESCRIPTION
   └── What this video covers

4. KEY POINTS (optional)
   └── Bullet summary of what's covered

5. RELATED CONTENT
   └── Related articles / case studies

6. CTA
```

---

## GUIDE TEMPLATE (`/insights/guides/[slug]`)

```
1. GUIDE HEADER
   └── "Guide" label, title, difficulty level, estimated read time

2. WHAT THIS GUIDE COVERS
   └── Brief overview + who it's for

3. GUIDE BODY
   └── Step-by-step structured MDX
   └── Code blocks, callouts, diagrams

4. RELATED GUIDES / SERVICES

5. CTA
```

---

## MOTION NOTES

- **Index page:** Subtle stagger for card grid, filter change reflows with `AnimatePresence`
- **Detail pages:** Minimal — content is the focus
- **Table of contents:** Smooth scroll highlight as user reads
- NO heavy animation on Insights — it would clash with the editorial tone

---

## DESIGN NOTES

- Insights uses **light mode by default** — content readability is paramount
- Long-form body text: comfortable line-height (`leading-relaxed`), max-width ~65ch
- Code blocks: syntax highlighted, dark theme even in light mode
- Images: `aspect-video` or `aspect-square` containers, `object-cover`
- Category labels: `Badge` component with color per content type

---

## V1 CONTENT STRATEGY

Options when launching with minimal content:
1. **KAIROTRIX website build as first case study** — document building kairotrix.com
2. **Technical deep-dive** on a technology KAIROTRIX works with (e.g. "How RAG Works")
3. **Perspective article** on KAIROTRIX's philosophy

Minimum recommended for launch: 1–3 quality pieces rather than many empty categories.

---

## SEO

- Each article: unique title, meta description, og:image
- Schema.org: `Article`, `VideoObject`, `HowTo` (for guides)
- Long-tail keywords in headings
- Internal linking: Insights ↔ Solutions ↔ Work

---

## OPEN QUESTIONS

- [ ] **What Insights content will be ready at launch?**
- [ ] **Author profiles** — needed or omit for V1?
- [ ] **Comments / engagement system** — V1: none. Future: Giscus or similar.

---

## DEPENDENCIES

- MDX content pipeline (`next-mdx-remote`, `gray-matter`)
- Syntax highlighting (e.g. `rehype-pretty-code` or `prism`)
- `date-fns` for date formatting
- Framer Motion (index filter animations)
