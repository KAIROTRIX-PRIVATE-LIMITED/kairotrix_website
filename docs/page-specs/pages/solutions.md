# PAGE SPEC: SOLUTIONS

> **Status:** Spec ready — build after homepage approved
> **Route:** `/solutions` (index) + `/solutions/[slug]` (category pages)
> **Motion Level:** ⭐⭐⭐ Interactive exploration

---

## PURPOSE

The Solutions section is the **most important page family** in the site. Services are central to the business. This is where visitors go to understand:

1. What specific areas KAIROTRIX covers
2. What solutions/services exist within each area
3. How KAIROTRIX approaches each category
4. What technology is used
5. Whether KAIROTRIX is right for their specific need

---

## PAGE HIERARCHY

```
/solutions                          ← Solutions Index
/solutions/ai-intelligent-systems   ← Category Page
/solutions/software-product-eng     ← Category Page
/solutions/automation-digital-ops   ← Category Page
/solutions/digital-transformation   ← Category Page
/solutions/data-business-intel      ← Category Page
/solutions/technology-integration   ← Category Page
```

**Each category page also contains sub-category and individual service listings.**

---

## SOLUTIONS INDEX PAGE (`/solutions`)

### Purpose
Give visitors a clear overview of all 6 solution areas and help them self-direct to the right category.

### Layout
```
┌─────────────────────────────────────────────────────┐
│  PAGE HERO                                          │
│  "What can KAIROTRIX build for you?"               │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  [ 01 AI & Intelligent Systems      →  ]           │
│  Brief description of this category                 │
│                                                     │
│  [ 02 Software & Product Engineering →  ]          │
│  ...                                                │
│                                                     │
│  [ 03 Automation & Digital Operations → ]          │
│  ...                                                │
│                                                     │
│  [ 04 Digital Transformation         → ]           │
│  ...                                                │
│                                                     │
│  [ 05 Data & Business Intelligence   → ]           │
│  ...                                                │
│                                                     │
│  [ 06 Technology Integration         → ]           │
│  ...                                                │
│                                                     │
│  ──────────────────────────────────────────────    │
│                                                     │
│  [ Discuss Your Requirements → ]                   │
└─────────────────────────────────────────────────────┘
```

### Motion
- Hero: fade-up entry
- Solution items: stagger in as user scrolls
- Each item: hover — background tint + arrow slides right

---

## CATEGORY PAGE TEMPLATE (`/solutions/[slug]`)

### Section Order
```
1. CATEGORY HERO
   └── Category name, brief description, CTA

2. WHAT THIS MEANS
   └── Plain language explanation of this area
   └── Who benefits from it

3. WHAT KAIROTRIX PROVIDES HERE
   └── Sub-categories + individual services listed

4. HOW WE APPROACH IT
   └── Our methodology for this specific category

5. TECHNOLOGY / STACK
   └── Relevant tech stack for this area

6. RELATED WORK
   └── 2–3 project/demo cards from Work that relate

7. CTA
   └── "Discuss [Category Name] →" → /contact
```

### Sub-category + Service Structure
```
Category: AI & Intelligent Systems
│
├── AI Application Development
│   ├── AI-Powered Applications
│   ├── Custom AI Applications
│   ├── LLM-Powered Applications
│   └── AI Feature Development
│
├── AI Agent Development
│   ├── Customer Support Agents
│   ├── Sales & Lead Generation Agents
│   ├── Internal Business Agents
│   ├── Voice AI Agents
│   └── Agentic AI Systems
│
├── AI / ML Development
│   ├── Generative AI Development
│   ├── Machine Learning Models
│   └── Model Training & Fine-tuning
│
└── AI Knowledge Systems
    ├── RAG Systems
    ├── Knowledge Base Development
    ├── Document Intelligence
    └── AI Assistants & Chatbots
```

### Technology Section (per category)
Display in context, not as a generic logo list:
```
What we use for AI & Intelligent Systems:

MODELS          GPT-4o, Claude, Gemini, Llama, Mistral
FRAMEWORKS      LangChain, LlamaIndex, AutoGen
VECTOR DBs      Pinecone, ChromaDB, Weaviate, PgVector
CLOUD           AWS Bedrock, Azure OpenAI, GCP Vertex
BACKEND         Python, FastAPI, Node.js
```

### Related Work Cards
- 2–3 cards pulled from Work section
- Projects/demos that use this solution area
- "View Work →" CTA

---

## MOTION — CATEGORY PAGE

| Element | Motion |
|---|---|
| Page hero | Fade up on load |
| Sections | `whileInView` fade-up, staggered |
| Service list items | Stagger in, hover: indent + arrow |
| Tech stack | Simple fade-in by row |
| Related work cards | Stagger on entry, lift on hover |

---

## DESIGN NOTES

- Category pages are **content-dense** — avoid gradients here (per design system rules)
- Use flat surfaces with border/elevation for cards
- Typography hierarchy is critical — H1, H2, H3 must be visually distinct
- Mobile: all sections stack vertically, service list becomes accordion

---

## CTAs PER CATEGORY PAGE

| Position | CTA Label |
|---|---|
| Hero | "Discuss [Category]" |
| After service list | "Start a Project" |
| After related work | "Build Something Like This" |
| Bottom | "Let's Talk About [Category]" |

---

## SEO CONSIDERATIONS

- Each category page: unique title, description, h1
- URL slugs: semantic, keyword-rich (e.g. `/solutions/ai-intelligent-systems`)
- Service pages should target long-tail searches (e.g. "AI agent development company")
- Schema.org: `Service` structured data

---

## OPEN QUESTIONS

- [ ] **Complete service list for all 6 categories** — needs content agent
- [ ] **Technology lists per category** — needs content agent
- [ ] **Related Work cross-links** — can only be set up once Work content exists

---

## DEPENDENCIES

- MDX or CMS for service content
- Work content system (for related work cards)
- `Badge` component (for technology tags)
- Framer Motion (animations)
