# PAGE SPEC: CONTACT

> **Status:** Spec ready — build in Phase 6
> **Route:** `/contact`
> **Motion Level:** ⭐⭐ Minimal, confidence-building

---

## PURPOSE

Contact is not just a page — it is the **destination that every visitor path leads toward**. It must:

1. Be accessible from anywhere on the site via CTAs
2. Understand **visitor intent** before asking for details
3. Make starting a conversation feel easy, not bureaucratic
4. Never feel like a generic "Name / Email / Message" form

> *"The contact system should help identify the intent."*

---

## CONTACT IS EVERYWHERE — CTA MAP

Every major section has a contextually relevant CTA:

| Page / Section | CTA Label |
|---|---|
| Nav (persistent) | "Let's Talk" |
| Homepage hero | "Explore KAIROTRIX" (→ scroll) |
| Homepage final CTA | "Start a Conversation" |
| Solution category page | "Discuss [Solution Area]" |
| Individual service | "Discuss this Service" |
| Work / Project | "Build Something Like This" |
| Case Study | "Start a Similar Project" |
| About | "Work with KAIROTRIX" |
| AI Assistant | "Talk to the Team" |

All CTAs route to `/contact` — with optional pre-fill of intent via URL params.

---

## CONTACT PAGE STRUCTURE — INTENT-BASED FLOW

The contact page is a **progressive experience**, not a flat form.

### Step 1 — Intent Selection
```
START A CONVERSATION

What brings you here?

  [ Technology / Software Solution ]
  [ AI / Intelligent Systems       ]
  [ Automation                     ]
  [ Web / Digital Development      ]
  [ Data / Analytics               ]
  [ System Integration             ]
  [ Product / MVP Development      ]
  [ Partnership / Collaboration    ]
  [ I'm not sure — let's explore  ]
```

### Step 2 — Brief Context
```
Tell us a little about what you need.

[ Text area — freeform description ]

Optional:
Timeline:  [ Urgent ] [ 1–3 months ] [ 3–6 months ] [ Exploring ]
Budget:    [ Not sure ] [ <£5k ] [ £5k-20k ] [ £20k+ ]
```

### Step 3 — Contact Details
```
How should we reach you?

Name:    [ _____________________ ]
Email:   [ _____________________ ]
Company: [ _____________________ ] (optional)
Phone:   [ _____________________ ] (optional)
```

### Step 4 — Confirmation
```
We'll be in touch within 1–2 business days.

Your submission summary
What happens next: brief explanation
```

---

## LAYOUT

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  LET'S BUILD SOMETHING.                            │
│                                                     │
│  Tell us what you're working on and                │
│  we'll get back to you within 1–2 days.            │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  [ Step indicator: 1 ── 2 ── 3 ]                  │
│                                                     │
│  [ CURRENT STEP CONTENT ]                          │
│                                                     │
│  [ Back ]                    [ Continue → ]       │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  Or chat with KAIROTRIX AI first →                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## FORM IMPLEMENTATION

- **React Hook Form** — state management
- **Zod** — schema validation
- **API route** at `/api/contact` — handles submission
- **Email** sent via Resend / Nodemailer to KAIROTRIX inbox
- **Success state** — in-place confirmation (no page redirect)
- **Error handling** — inline field errors, network error toast

### URL Pre-fill
CTAs can pass intent via URL:
```
/contact?intent=ai-systems
/contact?intent=automation
/contact?intent=build-like=[project-slug]
```
Step 1 pre-selects based on `intent` param.

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Page entry | Headline fades in |
| Step transitions | Slide out left → slide in right (`AnimatePresence`) |
| Step indicator | Active step dot scales up + brand color |
| Form fields | Fade in on step entry |
| Submit button | Loading spinner while submitting |
| Success state | Fade in confirmation message |

---

## prefers-reduced-motion FALLBACK

- Step transitions: instant swap, no slide
- All animations: immediate appearance

---

## MOBILE BEHAVIOUR

- Full single-column layout
- Step content stacks vertically
- Intent buttons: full-width, tap-friendly (min-height: 48px)
- Form fields: full-width

---

## DESIGN NOTES

- **Tone:** Warm and direct — not corporate, not informal
- Background: dark preferred (creates focus, reduces distraction)
- Optional: soft `gradient-glow` behind intent step
- Intent buttons: distinctive cards — not radio buttons or checkboxes
- Active intent button: brand border + background tint
- Step indicator: simple dots or numbered steps (not a progress bar)
- Keep form extremely minimal — only ask what's genuinely needed

---

## ALTERNATIVE ENTRY — AI ASSISTANT

The AI assistant can serve as an alternative contact path:

```
Visitor → AI Assistant → "Explore requirement" → "Talk to the team?" → Collect info → Route to contact
```

The AI assistant handles this gracefully — it does NOT replace the contact page but supplements it.

---

## WHAT HAPPENS AFTER SUBMISSION

1. Visitor sees confirmation screen (no redirect)
2. KAIROTRIX team receives formatted email with:
   - Intent type
   - Requirement description
   - Timeline / budget (if provided)
   - Name, email, company
3. Team responds within 1–2 business days
4. Future: CRM integration (Notion / HubSpot / etc.)

---

## SEO

- Title: `Contact KAIROTRIX — Start a Conversation`
- Meta description: Describe your technology challenge and we'll respond within 1–2 days
- This page is NOT indexed for keyword traffic — it's a conversion destination

---

## OPEN QUESTIONS

- [ ] **Exact intent categories** — any additions or changes?
- [ ] **Budget/timeline fields** — include or remove?
- [ ] **Email recipient address** — environment variable
- [ ] **CRM integration** — Notion, HubSpot, or just email for V1?

---

## DEPENDENCIES

- React Hook Form + Zod
- `/api/contact` route (Next.js API route)
- Resend or Nodemailer
- Framer Motion (AnimatePresence for steps)
- Toast component (for error feedback)
