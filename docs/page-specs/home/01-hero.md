# HOME — Section 01: HERO

> **Status:** Spec locked — ready to build (after project init)
> **Location:** `/` (Homepage, first viewport)
> **Motion Level:** ⭐⭐⭐⭐⭐ Maximum — this is the signature interaction

---

## PURPOSE

Create an **immediate, powerful first impression** within 5–10 seconds. The visitor should instinctively understand:

> *"This is a serious, premium technology company."*

The hero does **not** try to explain everything KAIROTRIX does. It establishes **identity, capability, and curiosity** — then the rest of the page does the explaining.

---

## CORE CONCEPT — Scroll-Controlled Video

The hero uses a **scroll-controlled cinematic video** as its primary interaction. The video is not auto-playing background footage — the visitor's scroll controls it.

```
Scroll DOWN → Video plays forward
Scroll UP   → Video plays backward
```

This interaction itself is a demonstration of KAIROTRIX's technical capability. The first interaction the visitor has = proof of what we build.

---

## LAYOUT STRUCTURE

```
┌─────────────────────────────────────────────────────┐
│ [NAV]                               [Let's Talk →]  │
│─────────────────────────────────────────────────────│
│                                                     │
│                                                     │
│         [ SCROLL-CONTROLLED VIDEO ]                 │
│                                                     │
│      KAIROTRIX WORDMARK / BRAND STATEMENT           │
│                                                     │
│      "Technology that moves ideas into              │
│       real-world solutions."                        │
│                                                     │
│      AI  ·  SOFTWARE  ·  AUTOMATION  ·  DIGITAL    │
│                                                     │
│                  ↓ Discover KAIROTRIX               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## CONTENT ELEMENTS

### Video / Visual
- **Option A:** Full-screen or near-full-screen video that visitor scroll-controls (scroll → playback position maps to scroll progress)
- **Option B:** Partial-screen composed video (Goji Labs reference) with surrounding elements
- **Decision:** TBD when video assets are available — both options are architecturally ready
- The video should NOT be a stock clip — must feel branded and original

### Headline
- Short — max 8–10 words
- Communicates technology + transformation (not a services list)
- Placeholder: *"Technology that moves ideas into real-world solutions."*
- Final copy: Content agent will provide

### Sub-headline / Capability Signals
- One line — minimal
- Communicates breadth without listing everything
- Placeholder: *"AI · Software · Automation · Digital · Data · Integration"*

### CTA
- Primary: **"Explore KAIROTRIX"** or **"Discover What We Build"** — smooth scroll to Section 02
- Secondary: **"Let's Talk"** (persistent nav button, not duplicated in hero body unless compositionally appropriate)

### Scroll Indicator
- Subtle animated indicator (e.g. animated line/chevron downward)
- Disappears after first scroll interaction

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Video playback | Mapped 0–1 to scroll progress via GSAP ScrollTrigger |
| Headline | Fade-in + slight upward drift on load (not scroll-triggered — immediate) |
| Capability signals | Staggered fade-in after headline |
| Scroll indicator | Looping breathe animation (opacity + translateY) |
| Hero → Section 02 transition | Smooth dissolve / opacity crossfade as user scrolls past |

### GSAP Implementation Notes
```
- Pin the hero section while video plays
- Map `scrollTrigger.progress` → `video.currentTime`
- scrub: true for smooth bidirectional control
- Duration of pinned scroll: approximately 1.5× viewport height
- After video completes → unpin → scroll continues to Section 02
```

### Framer Motion (overlay elements)
```
- Headline: initial={{ opacity: 0, y: 20 }} → animate={{ opacity: 1, y: 0 }}
- Capability pills: staggerChildren: 0.1
```

---

## prefers-reduced-motion FALLBACK

```
- Video: plays once automatically on load (no scroll control) OR shows a static poster frame
- Headline: appears immediately without animation
- All scroll-linked effects: disabled
```

---

## MOBILE BEHAVIOR

- Video remains but is **NOT scroll-controlled** on mobile (performance + UX)
- Video auto-plays silently as a background loop instead
- Headline and CTA stack vertically
- Font sizes reduce via responsive tokens
- Full-width layout (4-column grid)

---

## DESIGN NOTES

- **Color mode:** Dark — hero always dark regardless of site color mode choice
- **Gradient:** `gradient-signature` or `gradient-mesh` as ambient backdrop behind video
- `gradient-glow` for soft purple ambient light (not hard-edged)
- No heavy glassmorphism
- No grid lines / circuit imagery
- If video assets are not ready at build time → use a high-quality static composition with Framer Motion particle/geometry as placeholder

---

## OPEN QUESTIONS (decide before building)

- [ ] **What video assets are available?** (determines Concept A vs B)
- [ ] **Full-screen vs partial-screen video** (reference: Goji Labs partial-screen approach)
- [ ] **Exact headline copy** (content agent)
- [ ] **Brand intro motion** — does the KAIROTRIX wordmark animate in on first load?

---

## DEPENDENCIES

- Lenis (smooth scroll must be initialized before hero)
- GSAP ScrollTrigger
- Video file (MP4 + WebM, optimized)
- `prefers-reduced-motion` hook
