# PAGE SPEC: NAVIGATION / HEADER

> **Status:** FIRST TO BUILD — Spec locked
> **Route:** Persistent — all pages
> **Motion Level:** ⭐⭐ Refined — subtle interactions only

---

## PURPOSE

The navigation is the **first component built** and the most persistent element on the site. It must:

1. Be immediately legible and premium
2. Give access to all major sections
3. Never distract from page content
4. Have a clear primary CTA ("Let's Talk")
5. Work across all scroll states (transparent on hero, solid on content)

---

## NAVIGATION STRUCTURE (LOCKED)

```
[KAIROTRIX logo/wordmark]   Solutions  Work  Insights  About   [Let's Talk →]
```

- Logo: left-aligned
- Nav links: centered or right-aligned
- CTA button: rightmost, always visible

---

## NAV LINK MENUS

### Solutions → Mega Menu
```
┌─────────────────────────────────────────────────────┐
│  SOLUTIONS                                          │
│                                                     │
│  01 AI & Intelligent Systems     →                 │
│  02 Software & Product Engineering →               │
│  03 Automation & Digital Operations →              │
│  04 Digital Transformation        →               │
│  05 Data & Business Intelligence  →               │
│  06 Technology Integration        →               │
│                                                     │
│  [ Explore All Solutions → ]                       │
└─────────────────────────────────────────────────────┘
```

### Work → Dropdown
```
Projects
Experiments
Technical Demonstrations
Capabilities & Technology
```

### Insights → Dropdown
```
Articles / Blog
Case Studies
System Blueprints
Research & Whitepapers
```

### About → Direct link to `/about` (no dropdown — page is simple enough)

---

## SCROLL BEHAVIOUR

| Scroll State | Nav Appearance |
|---|---|
| At top (Hero section) | Transparent background, white text |
| Scrolled past hero | Solid dark background (`bg-bg-dark/95`) with backdrop-blur |
| Scrolled far down | Compact/reduced height version |
| Scroll up (any position) | Nav re-appears if it was hidden |

---

## STATES

| State | Behaviour |
|---|---|
| Default | Transparent (hero) or solid (content) |
| Menu open | Dropdown/mega-menu appears below nav |
| Mobile — closed | Hamburger icon |
| Mobile — open | Full-screen or slide-out menu |
| Active link | `text-brand-500` or underline indicator |

---

## CTA BUTTON

- Label: **"Let's Talk"** (or "Let's Build" — finalize in review)
- Style: Filled brand button (`bg-brand-500`, `gradient-brand-core`)
- On scroll → may shrink slightly (compact mode)
- Always visible — never hidden by scroll

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Nav appearance on scroll | Backdrop-blur fades in via CSS transition |
| Dropdown open | Framer Motion `AnimatePresence` — fade + scale from 0.96 → 1 |
| Mega menu open | Fade in + slide down from y: -8 |
| Mobile menu open | Slide in from right or fade full-screen |
| Active link underline | Animated left-to-right draw |
| CTA hover | Scale 1 → 1.02, shadow intensifies |

---

## MOBILE NAVIGATION

```
┌─────────────────────────────────────────┐
│ [KAIROTRIX]                    [☰ Menu] │
└─────────────────────────────────────────┘
```

**Mobile menu open (full-screen overlay):**
```
┌─────────────────────────────────────────┐
│ [KAIROTRIX]                    [✕ Close]│
│                                         │
│  Solutions                          →  │
│  Work                               →  │
│  Insights                           →  │
│  About                              →  │
│                                         │
│  [ Let's Talk → ]                      │
│                                         │
│  (secondary links if needed)            │
└─────────────────────────────────────────┘
```

---

## prefers-reduced-motion FALLBACK

- No backdrop-blur transition — instant switch
- Dropdowns appear/disappear instantly
- Mobile menu: no slide animation

---

## DESIGN NOTES

- KAIROTRIX wordmark: SVG logo, white on dark / dark on light
- Nav links: `font-medium`, normal size, not oversized
- Dropdown: `bg-surface-dark/95` with `backdrop-blur`, subtle border
- Mega menu: must feel spacious — not cramped
- **No hamburger menu on tablet** — use compact horizontal nav up to md breakpoint

---

## ACCESSIBILITY

- All nav links keyboard-navigable
- Dropdowns: `aria-expanded`, `aria-haspopup`
- Mobile menu: focus-trapped while open
- Close on Escape key

---

## OPEN QUESTIONS

- [ ] **Exact CTA label** — "Let's Talk" vs "Let's Build" vs "Start a Project"
- [ ] **Logo/wordmark** — SVG asset needed
- [ ] **Compact scroll mode** — how much height reduction?

---

## DEPENDENCIES

- Framer Motion (AnimatePresence for menus)
- Lenis (must not conflict with nav scroll detection)
- `useScrollProgress` hook (for scroll state)
- `useReducedMotion` hook
