# PAGE SPEC: AI ASSISTANT

> **Status:** Concept ready — build in later phase
> **Route:** Persistent (available site-wide, not a page)
> **Motion Level:** ⭐⭐⭐ Smooth — feels alive, not chatbot-generic

---

## PURPOSE

The KAIROTRIX AI Assistant is a **persistent digital representative** — not a support widget, not an FAQ bot, not "Hi! How can I help?".

Its role:
1. Help visitors **understand KAIROTRIX** — what it is, what it provides, what it can build
2. Help visitors **discover relevant services** based on their problem or need
3. **Qualify requirements** — what does the visitor actually need?
4. **Guide toward contact** — naturally, without pressure
5. Answer genuine questions about KAIROTRIX's capabilities, approach, and technology

> *"The chatbot should act as a guided entry point, not a customer-support widget."*

---

## WHAT IT KNOWS

The AI assistant must have deep context about:
- KAIROTRIX's identity, mission, and philosophy
- All 6 solution areas and their sub-services
- How KAIROTRIX approaches technology problems
- The general technology stack KAIROTRIX works with
- How to engage with different visitor types (client, startup, partner)
- When and how to move the visitor toward contacting the team

---

## EXAMPLE CONVERSATIONS

### Visitor: "I need an AI chatbot for my business"
```
AI: What kind of business is it, and what would the chatbot need to do?

Visitor: It's a restaurant. I want it to handle booking enquiries.

AI: Understood — a conversational AI to handle reservations and answer
    questions for a restaurant. KAIROTRIX can build that as an AI agent
    with calendar/booking integration. Would you like to discuss this
    with the team?
```

### Visitor: "What does KAIROTRIX do?"
```
AI: KAIROTRIX is a technology solutions company — we build AI systems,
    custom software, automation, and digital experiences for businesses
    and founders. What kind of technology problem are you working on?
```

### Visitor: "We're a startup and need an MVP"
```
AI: Great — what's the product? We handle full product development from
    strategy and design through to engineering and deployment.
    What does your MVP need to do?
```

---

## UI DESIGN

### Collapsed State (persistent)
```
┌─────────────────────┐
│  💬 KAIROTRIX AI   │  ← floating button, bottom-right
└─────────────────────┘
```

- Small, elegant — never obtrusive
- Does NOT use a generic chat bubble emoji
- KAIROTRIX branded icon or wordmark in the button
- Subtle pulse animation to draw attention (once, not persistent)

### Open State (chat panel)
```
┌──────────────────────────────────────┐
│  KAIROTRIX                   [✕]    │
│  AI Digital Representative           │
│──────────────────────────────────────│
│                                      │
│  [AI message]                        │
│                           [User] →   │
│                                      │
│──────────────────────────────────────│
│  [ Type a message...          ] [↵] │
└──────────────────────────────────────┘
```

- Opens as a panel (bottom-right, slides up)
- Header: KAIROTRIX wordmark + "AI Representative" label
- Not full-screen on desktop — panel sits above footer/content
- Mobile: full-screen panel

---

## MOTION DETAILS

| Element | Motion |
|---|---|
| Trigger button | Subtle scale pulse once on first load |
| Panel open | Slide up + fade in (`AnimatePresence`) |
| Panel close | Slide down + fade out |
| Messages appear | Each message fades in from bottom |
| AI typing indicator | Animated three-dot pulse |
| User message sent | Slides to right side + fades in |

---

## TECHNICAL IMPLEMENTATION

### Stack
```
- Vercel AI SDK (ai package) — streaming responses
- OpenAI GPT-4o or Anthropic Claude — LLM provider
- System prompt — contains full KAIROTRIX context
- /api/assistant route — Next.js API route for streaming
- useChat hook from Vercel AI SDK — manages conversation state
```

### System Prompt Structure
```
You are KAIROTRIX's AI digital representative.

About KAIROTRIX: [company description]
Our solution areas: [6 areas + descriptions]
Our approach: [problem-first methodology]
Technologies: [stack overview]

Your role:
- Help visitors understand KAIROTRIX
- Identify what they need
- Suggest relevant services or work
- Answer genuine questions
- Guide toward contact naturally (never pushy)

Tone: Knowledgeable, direct, helpful, human — not corporate or salesy.
Never fabricate: no fake projects, metrics, or capabilities we don't have.
```

---

## BEHAVIOUR RULES

- Never uses generic opener: "Hi! How can I help you today?" 
- Opens with a more specific, branded greeting
- Does NOT answer unrelated questions (e.g. "write me an essay")
- Does NOT make up capabilities or services
- Knows when to say "I'm not sure — the team would be better placed to answer this"
- Gracefully routes to contact when appropriate: *"This sounds like something the KAIROTRIX team should discuss directly — would you like me to help you get in touch?"*

---

## MOBILE BEHAVIOUR

- Panel opens full-screen on mobile
- Keyboard-aware (panel scrolls above keyboard)
- Easy to close (X button, swipe down)

---

## prefers-reduced-motion FALLBACK

- Panel open/close: instant (no slide animation)
- Messages: appear immediately without fade

---

## ACCESSIBILITY

- Panel is focus-trapped when open
- Keyboard-navigable (Tab, Enter, Escape)
- Screen reader announcements for new messages (`aria-live`)

---

## DESIGN NOTES

- The AI assistant should feel **distinctly KAIROTRIX** — not a generic Intercom or Crisp widget
- Background: dark (`bg-surface-dark`)
- User messages: right-aligned, `bg-brand-soft` tint
- AI messages: left-aligned, `bg-surface-elevated`
- Input field: clean, minimal — no decorative elements
- "Powered by KAIROTRIX AI" in small text at bottom

---

## OPEN QUESTIONS

- [ ] **LLM provider** — OpenAI or Anthropic or both?
- [ ] **Knowledge source** — system prompt only or RAG over site content?
- [ ] **Conversation persistence** — session-only or stored?
- [ ] **Rate limiting** — how many messages per session?
- [ ] **Human handoff** — can it route to a real person?

---

## DEPENDENCIES

- Vercel AI SDK (`ai` package)
- OpenAI / Anthropic SDK
- `/api/assistant` Next.js route
- Framer Motion (`AnimatePresence` for panel)
- `useReducedMotion` hook
