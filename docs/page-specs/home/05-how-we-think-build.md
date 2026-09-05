# HOME — Section 05: HOW WE THINK / BUILD

> **Status:** Concept locked — implementation details TBD
> **Location:** `/` (Homepage, fifth section)
> **Motion Level:** ⭐⭐⭐⭐⭐ Maximum — this is the signature 3D experience

---

## PURPOSE

This is the **most technically ambitious section** of the homepage. Its job is not just to explain KAIROTRIX's methodology — the **interaction itself** is the demonstration.

When a visitor scrolls through this section, they experience a 3D/parallax narrative that communicates:

1. How KAIROTRIX thinks about technology problems
2. How KAIROTRIX approaches building solutions
3. That KAIROTRIX can design and build sophisticated digital experiences

> *"The section simultaneously communicates: technical capability, UI/UX capability, motion/interaction capability, attention to detail, and the company's philosophy."*
> — From the website strategy planning doc

---

## CORE CONCEPT

```
As visitor scrolls:
    ↓
3D environment / parallax space moves
    ↓
Objects / elements reveal themselves through space
    ↓
Each movement reveals a stage of KAIROTRIX's approach
    ↓
Stage names + brief explanation appear
    ↓
Full methodology unfolds as a visual journey
```

---

## METHODOLOGY STAGES (Working — not final copy)

These are structural placeholders. Final wording comes from content agent and is locked by user before this section is built.

```
Stage 1: UNDERSTAND      → Discover the real problem beneath the request
Stage 2: EXPLORE         → Assess technology options, map possibilities
Stage 3: ARCHITECT       → Design the right solution structure
Stage 4: BUILD           → Engineer with precision and craft
Stage 5: INTEGRATE       → Connect, automate, and orchestrate
Stage 6: EVOLVE          → Improve, scale, and adapt over time
```

This follows the BDD's defined delivery philosophy:
> *Understand problem → consultation → technology assessment → right solution → implementation → improvement*

---

## VISUAL APPROACH — 3 OPTIONS

### Option A — Full 3D Scene (Three.js / R3F)
A 3D environment using WebGL. As the user scrolls, the camera moves through space or objects transform. Each stage is a 3D moment.

**Strengths:** Most impressive, true differentiation
**Risks:** Performance on low-end devices, requires 3D assets

### Option B — 2.5D Parallax Layers
Layered 2D elements (SVGs, images, shapes) that move at different speeds as user scrolls, creating a parallax depth illusion. Each layer reveals a stage.

**Strengths:** Better performance, easier to build, still visually powerful
**Risks:** Less unique than full 3D

### Option C — GSAP Pinned Scroll-Storytelling
The section is pinned while the user scrolls. Content animates in panels — text, diagrams, and geometry reveal each stage as scroll progresses.

**Strengths:** Well-tested pattern, reliable across devices
**Risks:** Common pattern — needs unique visual treatment to stand out

### Recommended: Option C with 3D accents (Option A elements)
- Pin the section using GSAP ScrollTrigger
- Use a Three.js canvas as the visual centrepiece (simple geometry, not complex scene)
- Each stage: text panel + 3D geometry transformation
- Mobile: degraded to 2D animated panels

---

## SECTION LAYOUT

```
┌─────────────────────────────────────────┐
│                                         │
│  HOW WE THINK / BUILD                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │                                 │   │
│  │   [ 3D CANVAS / PARALLAX ]      │   │
│  │                                 │   │
│  │   STAGE 01                      │   │
│  │   UNDERSTAND                    │   │
│  │   "Discover the real problem    │   │
│  │    beneath the request."        │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ← ─ ─ ─ ─ [progress indicator] ─ →   │
│                                         │
└─────────────────────────────────────────┘
```

As user scrolls, the stage number, name, and description update. The 3D canvas transforms to reflect the current stage.

---

## GRADIENT USAGE

This section uses `gradient-signature` (`#9333EA → #6366F1 → #4338CA`) as its visual spine — connected to the "Transformation" visual concept:

```
Disconnected → Understood → Structured → Connected → Intelligent → Evolving
```

The gradient shifts/transitions between stages.

---

## GSAP IMPLEMENTATION NOTES

```javascript
// Pin section
ScrollTrigger.create({
  trigger: '#how-we-think',
  pin: true,
  scrub: 1,
  start: 'top top',
  end: `+=${stages.length * 100}%`
});

// Animate stages
stages.forEach((stage, i) => {
  gsap.to(`#stage-${i}`, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '#how-we-think',
      start: `${(i / stages.length) * 100}% top`,
      end: `${((i + 1) / stages.length) * 100}% top`,
      scrub: true
    }
  });
});
```

---

## prefers-reduced-motion FALLBACK

- No scroll-pinning
- No 3D scene
- Static cards showing each stage side by side
- Simple fade-in on scroll

---

## MOBILE BEHAVIOR

- 3D scene: **disabled entirely** on mobile
- Replaced with: vertical stack of stage cards with simple Framer Motion fade-in
- Each stage card: number, name, description
- No pinning on mobile

---

## DESIGN NOTES

- This section is always **dark** — it's a "deep tech" moment in the journey
- `gradient-signature` used as section background / light source
- Typography is large, confident, minimal
- DO NOT make this look like a generic "6-step process" infographic
- The visual system should feel **discovered**, not explained

---

## OPEN QUESTIONS

- [ ] **Option A / B / C choice** — discuss + decide before building
- [ ] **Final stage names and copy** — content agent + user approval
- [ ] **3D asset concept** — what 3D geometry/object represents each stage?
- [ ] **Progress indicator design** — dots? numbers? thin line?

---

## DEPENDENCIES

- Three.js + @react-three/fiber + @react-three/drei (if Option A or hybrid)
- GSAP + ScrollTrigger (pinning + scrub)
- Lenis (smooth scroll, compatible with GSAP ST)
- `useReducedMotion` hook
- Mobile detection for 3D fallback
