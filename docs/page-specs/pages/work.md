# PAGE SPEC: WORK

> **Status:** Spec ready — build after Solutions approved
> **Route:** `/work` (index) + `/work/[slug]` (detail pages)
> **Motion Level:** ⭐⭐⭐⭐ Interactive demonstrations

---

## PURPOSE

Work = **Capability + Proof**. This is where KAIROTRIX shows what it actually builds — not claims, but evidence.

> *"Work becomes more than a portfolio gallery."*

This section must:
1. Show real projects, experiments, and demonstrations
2. Connect each item to relevant capabilities and technologies
3. Make visitors think: *"They can actually build what I need"*
4. Create multiple discovery paths (by type, by solution area, by technology)

---

## WORK CONTENT TYPES (LOCKED)

| Type | What It Shows |
|---|---|
| **Projects** | What was built — actual deliverables or internal builds |
| **Experiments** | What KAIROTRIX is exploring — ideas, emerging tech, concepts |
| **Technical Demonstrations** | Focused proof of a specific capability |
| **Capabilities & Technology** | Architectural standards, engineering depth & modern tech stack |

**Labeling rule:** Every item must be clearly labeled:
- `CLIENT PROJECT` (only real client work — never fabricated)
- `KAIROTRIX BUILD` (internal project)
- `EXPERIMENT`
- `TECHNICAL DEMO`

---

## WORK INDEX PAGE (`/work`)

### Layout
```
┌─────────────────────────────────────────────────────┐
│  PAGE HERO                                          │
│  "What we build."                                   │
│                                                     │
│  FILTER BAR                                         │
│  [ All ] [ Projects ] [ Experiments ] [ Demos ]    │
│  [ By Solution Area ▾ ] [ By Technology ▾ ]        │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐    │
│  │ FEATURED     │  │ Item 2   │  │ Item 3   │    │
│  │ (large card) │  │          │  │          │    │
│  └──────────────┘  └──────────┘  └──────────┘    │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Item 4   │  │ Item 5   │  │ Item 6   │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Filter System
- Filter by: Type (Projects / Experiments / Demos) AND Solution Area AND Technology
- Framer Motion `AnimatePresence` for grid reflow on filter change
- URL params update on filter: `/work?type=experiment&area=ai`

---

## PROJECT DETAIL TEMPLATE (`/work/[slug]`)

### Full Section Structure
```
1. HERO
   └── Project title, type label, hero image/video

2. CONTEXT & OBJECTIVE
   └── What was the goal? What problem was being solved?

3. CHALLENGE
   └── What made this technically or strategically interesting?

4. APPROACH
   └── How did KAIROTRIX think through and solve this?

5. DESIGN / UX (if applicable)
   └── Screenshots, design decisions, UX approach

6. ENGINEERING
   └── How was it built? Architecture decisions.

7. TECHNOLOGY USED
   └── Full stack for this project — with context (not just logos)

8. VISUAL DEMONSTRATION
   └── Live demo, video walkthrough, interactive preview, screenshots

9. KEY LEARNINGS (optional)
   └── What was discovered? What would be done differently?

10. CAPABILITIES DEMONSTRATED
    └── Tags linking to relevant Solution areas

11. RELATED WORK
    └── 2–3 other projects/demos worth exploring

12. CTA
    └── "Build Something Like This →" → /contact
```

### Technology Section in Detail
```
BUILT WITH

FRONTEND      Next.js 15 · React · Tailwind CSS
AI LAYER      GPT-4o · LangChain · Pinecone
BACKEND       Python · FastAPI · PostgreSQL
CLOUD         AWS (EC2, S3, Lambda)
INTEGRATIONS  Slack API · Notion API
```

---

## EXPERIMENT / DEMO DETAIL TEMPLATE

Slightly lighter template than full Project:

```
1. WHAT WE'RE EXPLORING / DEMONSTRATING
2. LIVE DEMO (if applicable — interactive iframe or hosted demo)
3. HOW IT WORKS
4. ARCHITECTURE / TECHNICAL DETAILS
5. TECHNOLOGY USED
6. CAPABILITIES DEMONSTRATED
7. BUILD SOMETHING SIMILAR → CTA
```

---

## MOTION — WORK INDEX

| Element | Motion |
|---|---|
| Page load | Hero fades in |
| Filter change | Grid items fade + reposition (`AnimatePresence`, `layout`) |
| Cards | Stagger in on load |
| Card hover | Lift, border highlight, video preview appears |

---

## MOTION — DETAIL PAGE

| Element | Motion |
|---|---|
| Hero | Parallax scroll (subtle) |
| Sections | Fade-up on `whileInView` |
| Tech stack | Items stagger in by row |
| Related work | Cards stagger in |

---

## DESIGN NOTES

- Work cards: use project screenshots/thumbnails — NOT generic placeholder images
- Cards should feel like quality editorial pieces — not template portfolio tiles
- Tech tags: `Badge` component, grouped by category
- Detail page: generous whitespace, strong typographic rhythm
- Video demos: lazy-load, play on viewport entry

---

## SEO

- Each project: unique title (`[Project Name] — KAIROTRIX Work`)
- Meta description: what was built + what problem it solved
- Schema.org: `CreativeWork` or custom structured data

---

## OPEN QUESTIONS

- [ ] **Initial Work content at launch** — which projects/demos will exist?
- [ ] **Live demos** — which can be publicly hosted?
- [ ] **Video walkthroughs** — available at launch?

---

## DEPENDENCIES

- Framer Motion (`AnimatePresence` for filter, `layout` for grid)
- GSAP (optional: for detail page parallax hero)
- MDX or CMS for project content
- Video player component
