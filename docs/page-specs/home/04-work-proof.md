# HOME — Section 04: WORK / PROOF + CAPABILITY

> **Status:** Spec locked — ready to build
> **Location:** `/` (Homepage, fourth section)
> **Motion Level:** ⭐⭐⭐⭐ Interactive demonstrations

---

## PURPOSE

The visitor has seen who KAIROTRIX is and what it offers. Now they ask:

> *"Can they actually do it? Show me."*

This is the **proof section**. It shows selected work, experiments, and technical demonstrations. The homepage does not show every project — it shows the **most compelling evidence** of capability.

**Critical note:** The website itself is also part of the proof. The motion, layout, and interaction quality of this section must be excellent.

---

## WHAT IS SHOWN HERE

A curated selection from the Work architecture:

```
WORK / PROOF
├── Selected Projects        (real client or internal builds)
├── Experiments              (KAIROTRIX exploring ideas)
├── Technical Demonstrations (focused capability proofs)
└── Technology demonstrated  (visible stack/approach)
```

**V1 rule:** Label all work honestly:
- Client work → labeled as such (only when real work exists)
- Internal build → labeled as `KAIROTRIX Build` or `Internal Project`
- Experiment → labeled as `Experiment`
- Demo → labeled as `Technical Demonstration`

**Never present an internal demo as a client project.**

---

## LAYOUT CONCEPT

### Option A — Featured + Grid
```
┌─────────────────────────────────────────┐
│  WORK & CAPABILITY                      │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  FEATURED PROJECT (large)       │    │
│  │  Full-width hero card           │    │
│  │  Video/image + title + tags     │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌──────────┐ ┌──────────┐            │
│  │ Project  │ │ Experim. │            │
│  └──────────┘ └──────────┘            │
│                                         │
│  [ View All Work → ]                   │
└─────────────────────────────────────────┘
```

### Option B — Horizontal scroll of cards (premium, cinematic)
- Large cards that scroll horizontally
- Each card: project name, type label, brief description, tech tags, hover shows preview
- Desktop: partial-scroll peek reveals next card (creates curiosity)

### Option C — Masonry / editorial grid
- Cards of varying sizes
- Creates visual interest without being uniform

**Default recommendation:** Option B (horizontal scroll) for premium feel. Discuss in review.

---

## WORK CARD CONTENT

Each card contains:
- **Type label** — `PROJECT` / `EXPERIMENT` / `DEMO` / `KAIROTRIX BUILD`
- **Title** — project name
- **One-line description** — what was built / what it demonstrates
- **Technology tags** — 2–4 tech labels (e.g. `AI Agent`, `Next.js`, `RAG`)
- **Visual** — screenshot, video thumbnail, or abstract visual
- **Hover state** — play video preview or expand description
- **CTA** — "View Project →" → routes to `/work/[slug]`

---

## CAPABILITY SIGNALS (inline)

Within or below the project cards, surface the **capabilities demonstrated**:

```
Projects in this section demonstrate:
AI Application Development  ·  Workflow Automation
Web Development  ·  API Integration  ·  RAG Systems
```

This connects the work back to the Solutions architecture without needing a separate Capabilities page.

---

## TECHNOLOGY SECTION (Optional — within this section)

A small typographic section showing the tech stack KAIROTRIX works with. **Not a generic logo parade.** 

Instead, organized by category:
```
AI & Models       LLMs · RAG · Vector DBs · Agents
Frontend          React · Next.js · Three.js
Backend           Node.js · Python · FastAPI
Cloud             AWS · GCP · Vercel
Databases         PostgreSQL · MongoDB · Pinecone
```

This can also live as a scrolling marquee of technology names (subtle, understated).

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Section headline | Fade up on scroll |
| Featured card | Scale up slightly from 0.96 → 1 on entry |
| Smaller cards | Stagger in with 100ms delay |
| Card hover | Lift (translateY: -6px) + shadow intensify |
| Video preview on hover | Fade in video layer over static thumbnail |
| Tech marquee | Continuous left scroll (CSS animation), pauses on hover |

---

## prefers-reduced-motion FALLBACK

- All cards appear statically
- No video preview autoplay on hover
- Marquee stops (static list instead)

---

## MOBILE BEHAVIOR

- Featured card → full-width stack
- Smaller cards → full-width, stacked vertically
- Horizontal scroll: converted to vertical scroll
- Tech section: wraps to multi-line

---

## DESIGN NOTES

- Cards should feel substantial — not lightweight tiles
- Use media (video/screenshot) whenever possible — visual proof > text claims
- Dark cards with subtle borders work well in dark mode
- In light mode: light cards with medium shadows
- Tags: `Badge` component from design system

---

## CTA

- **"View All Work →"** → routes to `/work`
- Positioned after the card grid

---

## OPEN QUESTIONS

- [ ] **Which projects/experiments will be shown at launch?** — content decision
- [ ] **Horizontal vs vertical layout** — decide in build review
- [ ] **Technology section: marquee or static?** — decide in build review
- [ ] **Video previews: available at launch?**

---

## DEPENDENCIES

- Framer Motion (stagger, hover)
- GSAP (horizontal scroll if Option B)
- Video elements (lazy-loaded, in-viewport only)
- `useReducedMotion` hook
