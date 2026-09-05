# PAGE SPEC: ABOUT

> **Status:** Spec ready — build after core pages approved
> **Route:** `/about`
> **Motion Level:** ⭐⭐ Refined — typography-driven

---

## PURPOSE

About answers:

> *"Who is KAIROTRIX? Why does it exist? What does it believe?"*

This page is **intentionally minimal and honest**. It does not attempt to fake the scale of a large company. It communicates:
- Why KAIROTRIX was founded
- What KAIROTRIX believes about technology and problem-solving
- Where KAIROTRIX is going

**Not included in V1:**
- Team / Founders section (added when ready)
- Awards, press, partners
- History timeline
- Careers

---

## PAGE STRUCTURE (V1)

```
1. PAGE HERO
   └── "About KAIROTRIX"
   └── One-line positioning statement

2. WHO WE ARE
   └── What KAIROTRIX is — company description
   └── Problem-first positioning explained

3. VISION & MISSION
   └── Vision: where KAIROTRIX is going
   └── Mission: what it does to get there

4. PHILOSOPHY / VALUES
   └── How KAIROTRIX thinks about technology
   └── The principles that guide the work

5. THE KAIROTRIX APPROACH
   └── How KAIROTRIX works with clients
   └── Understand → Explore → Architect → Build → Integrate → Evolve

6. WHERE WE'RE GOING
   └── Future direction — honest, not inflated
   └── Services → Recurring solutions → AI products → SaaS

7. CTA
   └── "Work with KAIROTRIX →" → /contact
```

---

## SECTION DETAILS

### Vision (placeholder — content agent will provide final)
> KAIROTRIX envisions a world where technology is not a barrier but a bridge — where every business, regardless of size, has access to intelligent, well-engineered systems that solve real problems.

### Mission (placeholder)
> To identify what technology can genuinely improve, build it with precision, and make it accessible to businesses that need it — without overpromising or overcomplicating.

### Philosophy / Values (placeholder)
```
Problem first, technology second.
Honest capability over inflated claims.
Built to evolve — never locked, never finished.
Quality is not optional — it is the product.
Make technology understandable, not mystifying.
```

### The KAIROTRIX Approach (visual element)
```
UNDERSTAND → EXPLORE → ARCHITECT → BUILD → INTEGRATE → EVOLVE
```
Can be a horizontal timeline / visual process with brief descriptions per stage.

---

## LAYOUT CONCEPT

```
┌─────────────────────────────────────────────────────┐
│  ABOUT                                              │
│  KAIROTRIX.                                         │
│  Built to evolve.                                   │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  [ Large typographic identity statement ]          │
│  [ 2–3 paragraph company description   ]          │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  VISION          MISSION                           │
│  [text]          [text]                            │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  PHILOSOPHY / VALUES                               │
│  [ numbered or bulleted list, premium style ]      │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  HOW WE APPROACH TECHNOLOGY                        │
│  [ horizontal visual process diagram ]             │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  [ Work with KAIROTRIX → ]                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Page hero | Fade up on load |
| Major sections | `whileInView` fade-up — simple, once |
| Vision/Mission split | Each box fades in with slight offset |
| Values list | Stagger — each value fades in sequentially |
| Approach stages | Draw line connecting stages, then labels fade in |
| CTA | Fade in last |

---

## DESIGN NOTES

- **Color mode:** Can be light or hybrid — About benefits from light for legibility
- Typography is the primary design tool here — strong hierarchy, excellent spacing
- No illustrations or decorative elements that feel generic
- Values: can use large numbered typography as visual anchor (e.g. `01` in large, muted text behind the value statement)
- Approach diagram: clean horizontal layout, `gradient-signature` accent on the connecting line

---

## WHAT ABOUT TEAM?

**V1: No team section.**

When founders are ready to be featured:
- Brief founder/team section added at the bottom of About
- Genuine photos (no stock), real bios, real roles
- LinkedIn links (optional)

This is explicitly a future addition — do not create placeholder team cards.

---

## CTA

- **"Work with KAIROTRIX →"** or **"Let's Build Together →"** → `/contact`
- Positioned at the end of the page

---

## SEO

- Title: `About KAIROTRIX — AI Technology & Software Solutions Company`
- Meta description: What KAIROTRIX is, its mission, and what it builds
- Schema.org: `Organization`

---

## OPEN QUESTIONS

- [ ] **Final vision, mission, values copy** — content agent
- [ ] **Approach stage names** — final wording (same as Section 05 of homepage)
- [ ] **Company founding story** — include or omit?

---

## DEPENDENCIES

- Framer Motion (whileInView, stagger)
- `useReducedMotion` hook
