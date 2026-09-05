# KAIROTRIX Website — Build Progress Tracker

> **File:** `docs/BUILD_PROGRESS.md`
> **Rule 1:** ONE COMPONENT AT A TIME. Build → Stop → User reviews → Approved → Next.
> **Rule 9:** Locked decisions remain locked (see `docs/PROJECT_CONTEXT.md`).

---

## Phase 1: Global Shell & Architecture
| ID | Component | Location | Status | Notes |
|---|---|---|---|---|
| 1.1 | Header & Global Navigation | `src/components/layout/Header.tsx` | **APPROVED** | Sticky blurred header, desktop mega menu, mobile drawer |
| 1.2 | Global Footer | `src/components/layout/Footer.tsx` | **PENDING REVIEW** | Site directory, architectural grid, legal links |
| 1.3 | Persistent AI Assistant Widget | `src/components/ai/` | **IN QUEUE** | Intent qualification and interactive assistant |

---

## Phase 2: Homepage Immersive Journey (Light Theme Foundation)
| ID | Section | Component File | Status | Notes |
|---|---|---|---|---|
| 2.1 | 01 // Hero Section | `src/components/home/Hero.tsx` | **APPROVED** | Cinematic scroll-controlled video, typography, CTA |
| 2.2 | 02 // What is KAIROTRIX | `src/components/home/WhatIsKairotrix.tsx` | **AWAITING SIGN-OFF** | Text-animated manifesto & identity pillars |
| 2.3 | 03 // What We Provide | `src/components/home/WhatWeProvide.tsx` | **APPROVED** | Aceternity StickyScroll with live video previews |
| 2.4 | 04 // Work & Capabilities | `src/components/home/WorkProof.tsx` | **APPROVED** | 3D Perspective Scroll Gallery |
| 2.5 | 05 // How We Think / Build | `src/components/home/HowWeThinkBuild.tsx` | **APPROVED** | Rev 8 Serpentine StepsFlow, master GPS puck, bidirectional rotation |
| 2.6 | 06 // Insights & Perspectives | `src/components/home/InsightsPreview.tsx` | **AWAITING REVIEW** | Asymmetrical split layout, 1.5 card ratio, right & left feather masks, background auto-advance (~6.5s) with Smart Pause on hover |
| 2.7 | 07 // Final CTA — Let's Build | `src/components/home/FinalCTA.tsx` | **APPROVED** | High-impact interactive CTA destination card |

---

## Current Active Focus
- **Section 06 (`src/components/home/InsightsPreview.tsx`)**:
  - Visual countdown, timer text, and progress bar removed per user specification.
  - Functional auto-advance timer (~6.5s) retained in background with Smart Pause on hover and prefers-reduced-motion checks.
  - Right-side feather added and enhanced (`w-16 sm:w-24 lg:w-36` gradient + `black calc(100% - 100px), transparent 100%` alpha mask).
  - Main active card positioned clearly in view; companion card softly feathers out at the right edge.
  - Background spacing tightened (`py-16 sm:py-24 lg:py-28`) for balanced editorial density and clean negative space.

## Homepage Consistency & Navigation Refinement (Global)
- **Sticky Navbar**: Configured in `src/components/layout/Navbar.tsx` to hide ONLY during Hero section video scrolling, and stick firmly to the top across all other sections (02–07).
- **Unified Section Headings**: Standardized across Sections 02 through 07:
  - **Eyebrow**: Pulse dot + `font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase` + `h-px w-10 sm:w-16 bg-neutral-200` + optional mono badge.
  - **Section Title (Dual-Tone "WHAT WE BUILD." Style)**: Unified bold black headline with signature purple gradient accent on the final word (`gradient-signature-text`) and period dot `.`:
    - 02: `BUILT TO EVOLVE.`
    - 03: `WHAT WE BUILD.`
    - 04: `PROVEN IN EXECUTION.`
    - 05: `HOW WE THINK & BUILD.`
    - 06: `ENGINEERING IN PUBLIC.`
    - 07: `LET'S BUILD.` (Retained in its exact original bespoke styling, centered `07 // INITIATE COLLABORATION` eyebrow, and display scale per user specification).
  - **Narrative**: Unified `text-base sm:text-lg text-neutral-600 leading-relaxed font-normal`.
- **Purposeful In-View Entrance Animations**:
  - Excluded existing custom scroll systems (Hero video mask, word-by-word manifesto scrub, orbital dial physics, 3D card perspective spring, serpentine line drawing).
  - Added subtle decelerated `whileInView` reveals (`y: 20px` to `0`, `ease: [0.16, 1, 0.3, 1]`, `viewport: { once: true, margin: '-60px' }`) with `prefers-reduced-motion` compliance to static headers, eyebrows, Continuum ribbon, and split columns across Sections 02 through 06.
