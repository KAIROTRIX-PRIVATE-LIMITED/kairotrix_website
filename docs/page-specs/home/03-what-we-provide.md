# HOME — Section 03: WHAT WE PROVIDE

> **Status:** Spec locked — ready to build
> **Location:** `/` (Homepage, third section)
> **Motion Level:** ⭐⭐⭐⭐ Interactive — hover-driven exploration

---

## PURPOSE

The visitor now knows **who** KAIROTRIX is. Now they ask:

> *"What exactly do they do?"*

This section introduces the **six core solution areas** from the BDD. It does NOT dump every sub-service and individual offering — that lives in the Solutions section. The homepage communicates **breadth and category** only.

**Goal:** Visitor should leave this section thinking:
> *"KAIROTRIX covers a lot. Let me explore what's relevant to me."*

---

## THE SIX AREAS (LOCKED — FROM BDD)

| # | Name | What it covers |
|---|---|---|
| 01 | AI & Intelligent Systems | AI apps, agents, ML, generative AI, knowledge systems |
| 02 | Software & Product Engineering | Custom software, SaaS, MVPs, product development |
| 03 | Automation & Digital Operations | Workflow automation, process automation, digital ops |
| 04 | Digital Transformation | Web, digital presence, modernization, UX/UI |
| 05 | Data & Business Intelligence | Data engineering, dashboards, analytics, BI |
| 06 | Technology Integration | API integrations, system connections, CRM/ERP |

---

## LAYOUT CONCEPT

### Option A — 6-card grid with hover reveal
```
┌─────────────────────────────────────────┐
│  WHAT WE PROVIDE                        │
│                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ AI &   │ │ Soft.  │ │ Auto.  │      │
│  │ Intel. │ │ & Eng. │ │ & Ops  │      │
│  └────────┘ └────────┘ └────────┘      │
│  ┌────────┐ ┌────────┐ ┌────────┐      │
│  │Digital │ │ Data & │ │ Tech   │      │
│  │Trans.  │ │ BI     │ │ Integ. │      │
│  └────────┘ └────────┘ └────────┘      │
│                                         │
│  [ Explore All Solutions → ]            │
└─────────────────────────────────────────┘
```

### Option B — Horizontal scroll carousel (mobile-native, premium feel)
- Cards scroll horizontally
- Desktop: all 6 visible at once or in a horizontal layout
- Mobile: swipeable carousel

### Option C — Numbered list with expanding descriptions
- Each solution area has a number, name, and one-line description
- On hover: expands to show more detail + arrow CTA
- More editorial, less card-grid

**Decision:** TBD during build review — present Option C as default (most premium, avoids "template card grid" look)

---

## CARD CONTENT (per solution area)

Each card/item contains:
- **Number** — `01`, `02`, etc.
- **Name** — e.g. "AI & Intelligent Systems"
- **One-line summary** — e.g. "Build intelligent applications, agents, and knowledge-driven systems."
- **Hover state** — reveals brief elaboration + "Explore →" arrow
- **Link** — routes to `/solutions/[slug]`

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Section headline | Fade up on scroll entry |
| Cards/items | Stagger in — each card fades + slides up with 80ms delay between each |
| Card hover | Subtle lift (translateY: -4px) + border/glow accent |
| Hover reveal text | Fade in on hover |
| CTA | Fade in after all cards |

```tsx
// Stagger example
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};
```

---

## prefers-reduced-motion FALLBACK

- All cards appear immediately
- Hover effects: opacity change only (no transform)

---

## MOBILE BEHAVIOR

- 4-column grid → 1 or 2 column layout
- Option C (list) works best on mobile — converts to full-width expandable list items
- If Option A (cards) → 2-column on tablet, 1-column on mobile
- "Explore All Solutions" CTA full-width

---

## DESIGN NOTES

- Cards must NOT look like generic SaaS template cards
- Use border + subtle elevation for card depth (not gradient fills)
- Active/hover state: `shadow-brand` or thin `border-brand-500` highlight
- Numbers (`01`, `02`) should be prominent typographic elements — not small labels
- This section can have alternating dark/light treatment depending on color mode prototype decision

---

## CTA

- **"Explore All Solutions →"** → routes to `/solutions`
- Positioned below the grid

---

## OPEN QUESTIONS

- [ ] **Card layout vs list layout** — decide in review session
- [ ] **One-line descriptions for each area** — content agent
- [ ] **Icon or no icon per solution area?** — avoid generic tech icons; if used must be custom/original

---

## DEPENDENCIES

- Framer Motion (stagger + hover)
- `useReducedMotion` hook
- Solution area slug mapping (for links)
