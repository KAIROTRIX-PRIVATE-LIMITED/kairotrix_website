# PAGE SPEC: FOOTER

> **Status:** Spec ready — build after nav is approved
> **Route:** Persistent — all pages
> **Motion Level:** ⭐ Minimal

---

## PURPOSE

The footer is the **secondary navigation layer** — it provides access to everything that doesn't need primary header prominence. It must:

1. Provide structured site navigation
2. Include legal/utility links
3. Reinforce the KAIROTRIX brand identity
4. Include contact access
5. Feel premium — not an afterthought

---

## FOOTER STRUCTURE

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  KAIROTRIX                    [Newsletter / Contact CTA]   │
│  Built to evolve.                                          │
│                                                             │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  SOLUTIONS         WORK            INSIGHTS        COMPANY  │
│  AI & Intelligent  Projects        Articles        About   │
│  Software & Eng.   Experiments     Case Studies    Contact │
│  Automation        Demos           Guides          —       │
│  Digital Trans.    Capabilities    Videos          Privacy │
│  Data & BI         Technology      Perspectives    Terms   │
│  Tech Integration  —               —               Cookies │
│                                                             │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  © 2026 KAIROTRIX. All rights reserved.   [Social Links]  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## FOOTER COLUMNS

### Column 1 — SOLUTIONS
- AI & Intelligent Systems
- Software & Product Engineering
- Automation & Digital Operations
- Digital Transformation
- Data & Business Intelligence
- Technology Integration

### Column 2 — WORK
- Projects
- Experiments
- Technical Demonstrations
- Capabilities & Technology

### Column 3 — INSIGHTS
- Articles / Blog
- Case Studies
- System Blueprints
- Research & Whitepapers

### Column 4 — COMPANY
- About
- Contact
- Privacy Policy
- Terms & Conditions
- Cookie Policy

---

## BRAND SECTION (top-left)

- KAIROTRIX wordmark (SVG)
- Tagline: *"Built to evolve."*
- Brief one-liner (optional): *"AI Technology & Software Solutions"*

---

## CONTACT / CTA (top-right)

- Short prompt: *"Ready to start a conversation?"*
- CTA button: **"Let's Talk →"** → `/contact`
- Social links: LinkedIn, GitHub (if applicable) — only link to real accounts

---

## BOTTOM BAR

- Copyright: `© 2026 KAIROTRIX. All rights reserved.`
- Social icons: small, monochrome
- Legal links: Privacy Policy / Terms / Cookies

---

## DESIGN NOTES

- Footer background: `bg-surface-dark` or `bg-bg-dark` (always dark, regardless of page color mode)
- Text: `text-neutral-400` for secondary links, `text-neutral-100` for column headings
- Column headings: uppercase, tracked, small — `text-xs font-semibold tracking-widest`
- Hover on links: `text-brand-400` transition
- Divider lines: `border-neutral-800` (subtle)
- Social icons: SVG, `text-neutral-500 hover:text-brand-400`

---

## MOBILE BEHAVIOUR

- Columns collapse into accordion or vertical stack
- Brand section full-width at top
- CTA full-width
- Bottom bar stacks: copyright top, social icons below

---

## MOTION DETAILS

- Very minimal — links have hover color transitions only
- Optional: subtle fade-in on scroll enter (whileInView, once)
- NO complex animations in footer

---

## OPEN QUESTIONS

- [ ] **Social accounts to link** — which platforms does KAIROTRIX use?
- [ ] **Newsletter section** — include or omit for V1?
- [ ] **Legal pages** — Privacy Policy / Terms content needed before launch

---

## DEPENDENCIES

- None beyond standard Tailwind + Next.js Link
