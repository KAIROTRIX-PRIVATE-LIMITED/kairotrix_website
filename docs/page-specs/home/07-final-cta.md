# HOME — Section 07: FINAL CTA — LET'S BUILD

> **Status:** Spec locked — ready to build
> **Location:** `/` (Homepage, final section before footer)
> **Motion Level:** ⭐⭐ Confident, minimal — clear conversion

---

## PURPOSE

The visitor has completed the KAIROTRIX journey. They've discovered who KAIROTRIX is, what it provides, its capability, its proof, and its thinking. Now we ask them to **act**.

This should NOT feel like:
> *"Thanks for scrolling. Here's our contact form."*

It should feel like:
> *"You have something. We can help you build it. Let's talk."*

**Tone:** Confident invitation. Not sales pressure. Not corporate ask. A natural next step in the conversation.

---

## CONCEPT

```
You have an idea.
You have a challenge.
You have a goal.

KAIROTRIX can help you build it.

[ Let's Build Together → ]      [ or, talk to KAIROTRIX AI ]
```

---

## LAYOUT STRUCTURE

```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                                 │
│         LET'S BUILD.                           │
│                                                 │
│         You have an idea. A challenge.         │
│         A system to improve. Let's talk.       │
│                                                 │
│         [ Start a Conversation → ]             │
│                                                 │
│         ─ or talk to the KAIROTRIX AI ─        │
│                   [ AI Assistant ]              │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## CONTENT ELEMENTS

### Primary Headline
- 1–3 words, large typography
- Placeholder: *"Let's Build."* or *"Start Building."* or *"What will you build?"*
- Final copy: Content agent + user approval

### Sub-copy
- 1–2 sentences, direct and human
- Acknowledges the different visitor types (client, startup, partner)
- Placeholder: *"Whether you have a business challenge, a product idea, or a partnership in mind — KAIROTRIX is ready to talk."*

### Primary CTA
- **"Start a Conversation →"** → `/contact`
- Large, brand-purple button using `gradient-brand-core`

### Secondary CTA
- **"Talk to KAIROTRIX AI"** → opens AI assistant widget
- Lower visual weight — text link or ghost button

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Section entry | The entire section fades in + headline scales up slightly (0.95 → 1) |
| Headline | Large type fade-in with slight upward motion |
| Sub-copy | Fade in 200ms after headline |
| Primary CTA | Fade in 300ms after — then subtle pulse on hover |
| Secondary CTA | Fade in last |

**Note:** This section is intentionally simple. After the complexity of Section 05, the final CTA should breathe. Clean space = confidence.

---

## prefers-reduced-motion FALLBACK

- All elements appear immediately
- No pulse/scale animation on CTA
- Hover effects: color change only

---

## MOBILE BEHAVIOR

- Full-width, center-aligned
- Large headline (still impactful on mobile)
- Both CTAs stack vertically
- Generous padding above/below

---

## DESIGN NOTES

- **Color mode:** This section can be either dark (dark gradient) or match the previous section
- If dark: Use `gradient-surface-dark` background with `gradient-glow` purple ambient
- If light: Clean white with large type — stark and confident
- The primary CTA button: large, uses `gradient-brand-core`, with `shadow-brand` on hover
- White space is essential — do NOT fill this section with extra content

---

## CTA ROUTING

| CTA | Destination |
|---|---|
| "Start a Conversation" | `/contact` — routes to intent-based contact flow |
| "Talk to KAIROTRIX AI" | Opens persistent AI assistant widget (already on page) |

---

## OPEN QUESTIONS

- [ ] **Final headline copy** — content agent
- [ ] **Dark or light section?** — decide in visual prototype
- [ ] **Does this section include any additional trust signals?** — e.g. "Trusted by..." (NO fabricated ones)

---

## DEPENDENCIES

- Framer Motion (entry animation)
- AI Assistant widget (must be initialized before this section is visible)
- `useReducedMotion` hook
