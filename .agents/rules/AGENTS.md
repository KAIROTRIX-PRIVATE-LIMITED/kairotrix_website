# KAIROTRIX Website — Agent Rules (Auto-load)

> This file is auto-discovered by AI agents via the `.agents/rules/` directory.
> Full rules are in `/docs/AGENT_RULES.md`. Key context is in `/docs/PROJECT_CONTEXT.md`.

---

## MANDATORY STARTUP SEQUENCE

Every agent session on this project MUST start by reading these files in order:

1. `d:/Projects/kairotrix/kairotrix_website/docs/PROJECT_CONTEXT.md`
2. `d:/Projects/kairotrix/kairotrix_website/docs/TECH_STACK.md`
3. `d:/Projects/kairotrix/kairotrix_website/docs/BUILD_PROGRESS.md`
4. `d:/Projects/kairotrix/kairotrix_website/docs/AGENT_RULES.md`

---

## CRITICAL NON-NEGOTIABLE RULES

1. **ONE COMPONENT AT A TIME** — Build → Stop → User reviews → Approved → Next
2. **NEVER skip ahead** — even if you think the next component is simple
3. **NEVER fabricate** — no fake testimonials, clients, metrics, logos
4. **CSS tokens only** — no hardcoded color/spacing/font-size values
5. **TypeScript required** — no `any` types without justification
6. **Mobile-first CSS** — build for 4-column mobile, scale up
7. **Premium is the minimum** — generic = unacceptable
8. **Motion must have purpose** — implement `prefers-reduced-motion` everywhere
9. **Locked decisions = locked** — see `docs/PROJECT_CONTEXT.md`, do not override
10. **Update `docs/BUILD_PROGRESS.md`** after each approved component

---

## TECH STACK (SUMMARY)
- Framework: Next.js 15 App Router + TypeScript
- Animation: Framer Motion + GSAP + Lenis
- 3D: Three.js + @react-three/fiber + @react-three/drei
- Styling: Tailwind CSS v4 (utility-first, @theme tokens in globals.css, NO raw hardcoded hex values)
- Brand: #9333EA (purple), #08080C (dark bg), #FFFFFF (light bg)

---

## PROJECT STATUS

See `docs/BUILD_PROGRESS.md` for current phase and next component to build.
