# KAIROTRIX Website — Comprehensive Media & Digital Assets Specification

> **Document Version:** 1.0  
> **Date:** September 2026  
> **Status:** Approved Asset Production Blueprint  
> **Scope:** Full-site asset audit covering Homepage, Solutions (L1 + L2), Work, Insights, About, Contact, AI Assistant (KIRO), Admin, SEO/OpenGraph, and Global Shell.

---

## 1. Executive Summary & Asset Philosophy

The KAIROTRIX website is **not an agency brochure—it is living proof of engineering and UI/UX capability**. Every video, image, 3D visual, and diagram must reinforce the company's brand identity: **"Built to evolve"** and **"Problem-first technology partner."**

### 1.1 Non-Negotiable Asset Rules (From Master Design Foundation)
1. **Zero Fabrication**: Never use generic stock photography (e.g. models in suits pointing at transparent screens, fake handshake meetings), fake client logos, or fabricated testimonial avatars.
2. **Anti-AI Cliché**: Absolutely NO generic glowing neural network wallpapers, floating blue robot brains, cyberpunk neon grids, or cliché "futuristic AI startup" tropes.
3. **Engineering Rigor**: Media must represent **real software, concrete systems, authentic architecture equations, reproducible data models, terminal execution logs, and live telemetry**.
4. **Performance First**: Load order is strictly `Content → Functional UI → Important Media → Enhancement → Decoration`. High-efficiency codecs (`.webp`, `.avif`, `.mp4` with H.264/AV1, `.svg`, `.glb` Draco) are mandatory.
5. **Reduced-Motion Fallbacks**: Every looping or scroll-scrubbed video must have a high-resolution, static poster frame fallback respecting `prefers-reduced-motion: reduce`.

---

## 2. Directory Structure & File Naming Architecture

All public assets must be migrated from temporary stock names (e.g., `203987-923133879_medium.mp4`) into the semantic structure below:

```text
public/assets/
├── brand/
│   ├── logos/                # Primary Black & White wide and square SVGs
│   ├── symbol/               # KAIROTRIX geometric monogram SVGs & masks
│   ├── kiro/                 # 3D mascot renders & AI assistant avatars
│   └── favicons/             # System favicons (16x16, 32x32, apple-touch, manifest)
│
├── videos/
│   ├── hero/                 # Scroll-controlled hero cinematic videos & fallbacks
│   ├── solutions/            # Background ambient loops for 6 core disciplines
│   ├── work/                 # 12 Specimen interactive live demonstration recordings
│   └── insights/             # 8 Empirical research & blueprint video previews
│
├── images/
│   ├── hero/                 # Hero poster frames & perspective tunnel panels
│   ├── solutions/
│   │   ├── disciplines/      # 6 Signature 3D discipline levitation artworks
│   │   ├── capabilities/     # 24 Practice capability architecture diagrams
│   │   └── methodology/      # 4-Phase delivery framework technical schematics
│   ├── work/
│   │   ├── specimens/        # 12 Project/Demonstration primary UI screenshots
│   │   └── diagrams/         # Systems architecture equations & data flows
│   ├── insights/
│   │   ├── covers/           # 8 Technical publication & blueprint cover visuals
│   │   └── schematics/       # In-depth benchmark charts & schema contracts
│   ├── about/
│   │   ├── identity/         # "The KAIROTRIX Standard" vs "Industry Default" visual
│   │   ├── approach/         # 6-Stage execution pipeline diagram
│   │   └── roadmap/          # Strategic evolution architecture graphic
│   ├── og/                   # OpenGraph social sharing cards (1200x630px)
│   └── exceptions/           # 404 Route exception & maintenance state graphics
│
└── 3d/
    └── models/               # WebGL / Three.js .glb models for interactive stages
```

---

## 3. Master Asset Inventory Matrix

| ID | Asset Category | Asset Name / Suggested Path | Location / Page Component | Tech Specs & Format | Purpose & Strategic Rationale | Visual Art Direction / Style Guide |
|---|---|---|---|---|---|---|
| **GL-01** | Brand Logo | `/assets/brand/logos/KAIROTRIX_Logo_Black_Wide.svg` | Header (Light mode), light print / exports | SVG Vector, ~24KB, lossless | Primary corporate branding in high-contrast light environments | Clean geometric typography with custom K-X angles in `#08080C` |
| **GL-02** | Brand Logo | `/assets/brand/logos/KAIROTRIX_Logo_White_Wide.svg` | Header (Dark mode), Footer, Obsidian CTAs | SVG Vector, ~25KB, lossless | Primary corporate branding on dark / obsidian surfaces | Crisp `#FFFFFF` brand lettering with high legibility |
| **GL-03** | Brand Monogram | `/assets/brand/symbol/kairotrix-symbol.svg` | Hero scroll mask, watermarks, favicons | SVG Vector, < 10KB, viewBox 0 0 100 100 | Kinetic mask for scroll-driven zoom transition | Precise geometric emblem featuring the Kairo transformation chevron |
| **GL-04** | AI Representative | `/assets/brand/kiro/kiro_avatar_3d.png` | Global AI Assistant widget (`AIAssistant.tsx`) | WebP/PNG, 512x512, transparent, < 150KB | Persona anchor for KIRO digital representative | Friendly, sleek, robotic-organic 3D assistant with purple luminescent eye |
| **GL-05** | Favicon Suite | `/assets/brand/favicons/favicon-[16x16, 32x32].png`, `apple-touch-icon.png` | Global `<head>` metadata (`layout.tsx`) | Multi-size PNG + `icon.svg` | Browser tab and mobile home screen bookmark recognition | High-contrast KAIROTRIX symbol on deep dark background |
| **HM-01** | Hero Video | `/assets/videos/home-hero.mp4` | Homepage Hero (`HeroSection.tsx`) | 1920x1080, 30fps, H.264/AV1, CRF 22, < 12MB, muted | Key cinematic hook scrubbed forward/backward via user scroll | Deep space/dark room with precision crystalline optical fiber and quantum data flows |
| **HM-02** | Hero Poster | `/assets/images/hero/hero_poster.webp` | Homepage Hero video placeholder / fallback | WebP/AVIF, 1920x1080, q85, < 250KB | Instant LCP score; fallback for low bandwidth & reduced motion | Single crisp frame from hero video showing focused light hitting central geometry |
| **HM-03** | Tunnel Panels | `/assets/images/hero/tunnel_panel_[1..4].webp` | Homepage Hero Canvas (`HeroBackgroundCanvas.tsx`) | WebP, 800x600 each, q80, < 120KB each | Dynamic 3D perspective grid panels gliding forward on canvas | High-tech wireframe architectures, circuit topologies, and abstract purple accents |
| **HM-04** | 6-Stage Process | `/assets/images/home/transformation_stages.svg` | Homepage Section 02 (`WhatIsKairotrix.tsx`) | Vector SVG / Animated CSS | Illustrates the 6-stage transformation pipeline (Disconnected → Evolving) | Clean schematic nodes connecting from disorder to harmonic structure |
| **HM-05** | Discipline 3D 01 | `/assets/images/solutions/disciplines/SERVICE01.webp` | Homepage Sec 03, Solutions L1, Solution 01 L2 | WebP, 800x800, transparent, < 350KB | Signature levitating artifact for AI & Intelligent Systems | Crystalline multi-layered neural core with violet refractivity and floating data rings |
| **HM-06** | Discipline 3D 02 | `/assets/images/solutions/disciplines/SERVICE02.webp` | Homepage Sec 03, Solutions L1, Solution 02 L2 | WebP, 800x800, transparent, < 350KB | Signature levitating artifact for Software & Product Engineering | Modular cubic lattice structure precision-machined with brushed titanium and violet ports |
| **HM-07** | Discipline 3D 03 | `/assets/images/solutions/disciplines/SERVICE03.webp` | Homepage Sec 03, Solutions L1, Solution 03 L2 | WebP, 800x800, transparent, < 350KB | Signature levitating artifact for Automation & Operations | Interlocking kinetic geometric gears with fluid light channels and low-friction finishes |
| **HM-08** | Discipline 3D 04 | `/assets/images/solutions/disciplines/SERVICE04.webp` | Homepage Sec 03, Solutions L1, Solution 04 L2 | WebP, 800x800, transparent, < 350KB | Signature levitating artifact for Digital Transformation | Monolithic stone prism splintering into an agile, weightless digital wireframe lattice |
| **HM-09** | Discipline 3D 05 | `/assets/images/solutions/disciplines/SERVICE05.webp` | Homepage Sec 03, Solutions L1, Solution 05 L2 | WebP, 800x800, transparent, < 350KB | Signature levitating artifact for Data & Business Intelligence | Multi-dimensional refractive glass prism scattering light rays into structured telemetry bars |
| **HM-10** | Discipline 3D 06 | `/assets/images/solutions/disciplines/SERVICE06.webp` | Homepage Sec 03, Solutions L1, Solution 06 L2 | WebP, 800x800, transparent, < 350KB | Signature levitating artifact for Technology Integration | Central orb with glowing fiber-optic conduits bridging isolated external node docks |
| **HM-11** | Work Demo Loop 1 | `/assets/videos/ai-assistant.mp4` | Homepage Sec 04 (`WorkProof.tsx`) Card 01 | 1080x720 (3:2), 30fps, < 3.5MB, muted loop | Demonstrates autonomous reasoning loop and tool-calling validation in action | Terminal CLI + live browser automation side-by-side with telemetry logs |
| **HM-12** | Work Demo Loop 2 | `/assets/videos/smart-search.mp4` | Homepage Sec 04 (`WorkProof.tsx`) Card 02 | 1080x720 (3:2), 30fps, < 3.5MB, muted loop | Demonstrates hybrid dense-sparse retrieval with real-time source attribution | Document chunk highlighter mapping semantic queries to citation badges |
| **HM-13** | Work Demo Loop 3 | `/assets/videos/live-dashboard.mp4` | Homepage Sec 04 (`WorkProof.tsx`) Card 03 | 1080x720 (3:2), 30fps, < 3.5MB, muted loop | Demonstrates sub-50ms 60fps WebSocket trading & telemetry dashboard | High-frequency candlestick and order-book rendering without DOM reflow |
| **HM-14** | Work Demo Loop 4 | `/assets/videos/automated-workflows.mp4` | Homepage Sec 04 (`WorkProof.tsx`) Card 04 | 1080x720 (3:2), 30fps, < 3.5MB, muted loop | Demonstrates idempotent webhook ingestion & automated retry buffers | Animated payload flow from incoming webhook through Redis mutex queue |
| **HM-15** | How We Think 3D | `/assets/3d/models/pipeline_stage_nodes.glb` | Homepage Sec 05 (`HowWeThinkBuild.tsx`) | Binary GLTF (.glb), Draco compressed, < 2.5MB | Signature interactive 3D WebGL pipeline progression (optional enhancement) | Minimalist geometric stage nodes reacting to scroll-driven camera journey |
| **SL-01** | L1 Slide-in Thumbs | `/assets/images/solutions/thumbnails/thumb_0[1..6].webp` | Solutions Master Hub (`SolutionsGrid.tsx`) | 280x168 (140x84 @2x), WebP, < 40KB each | Micro-visual sliding in from the left when hovering discipline rows | High-contrast crop of the 3D discipline artwork against soft brand gradient |
| **SL-02** | Capability Schematics | `/assets/images/solutions/capabilities/[24 files].webp` | L2 Discipline Pages (`SolutionExplorer.tsx`) | 1200x800 (16:10), WebP, < 180KB each | Architectural diagram showing WHAT WE BUILD for each practice capability | Clean technical UI diagram: input interfaces, pipeline blocks, and database outputs |
| **SL-03** | Methodology Steps | `/assets/images/solutions/methodology/phase_0[1..4].webp` | L2 Discipline Pages (`SolutionMethodology.tsx`) | 800x600 (4:3), WebP, < 90KB each | Visual for 4-phase execution lifecycle (Audit, Topology, Engineering, Evolve) | Technical blueprints showing system audit matrices, CI/CD pipelines, SLA monitors |
| **WK-01** | Work Specimen Videos | `/assets/videos/work/specimen_[01..12].mp4` | Work Hub (`/work`) & Work Detail Pages | 1280x720 (16:9), 30fps, H.264, < 4.5MB each | Proves real system capability with zero fabrication on card hover & detail views | Screencasts of live production consoles, API gateways, and client interfaces |
| **WK-02** | Work Specimen Post | `/assets/images/work/specimens/specimen_[01..12].webp` | Work Hub (`/work`) & Work Detail Pages | 1280x720 (16:9), WebP, < 120KB each | Static fallback and initial card display state | Polished high-contrast dark-mode interface screenshot with crisp typography |
| **IN-01** | Insights Video Previews | `/assets/videos/insights/preview_[01..08].mp4` | Insights Hub (`/insights`) & Featured split | 1280x720 (16:9), 30fps, H.264, < 4MB each | Video preview for technical blueprints, case studies, and research whitepapers | High-speed walkthrough of architecture benchmarks, code diffs, and system topologies |
| **IN-02** | Insights Cover Images | `/assets/images/insights/covers/cover_[01..08].webp` | Insights Hub (`/insights`) & Reading views | 1280x720 (16:9), WebP, < 140KB each | Editorial hero banner for each technical publication | Elegant minimalist technical composition (e.g. KV-cache memory map, RRF formula) |
| **AB-01** | About Identity Art | `/assets/images/about/about_hero_sculpture.webp` | About Page Hero (`AboutHero.tsx`) | 900x900 (1:1), WebP, transparent, < 280KB | Visual metaphor for "Problem-First" and "Built to Evolve" | Precision geometric crystalline ring morphing from raw stone into refined optical violet |
| **AB-02** | Execution Pipeline | `/assets/images/about/engineering_pipeline_full.svg` | About Page Approach (`AboutApproach.tsx`) | Vector SVG, responsive, lossless | End-to-end 6-stage engineering delivery blueprint | Comprehensive visual schematic of the client journey from problem audit to evolution |
| **AB-03** | Platform Roadmap | `/assets/images/about/strategic_evolution_roadmap.svg` | About Page Future (`AboutFuture.tsx`) | Vector SVG / Responsive WebP | Visualizes KAIROTRIX's 4-tier evolution: Services → Engines → Products → Platform | Multi-tier architectural roadmap with transparent timelines and platform milestones |
| **EX-01** | 404 Route Illustration | `/assets/images/404/404.png` | 404 Not Found Page (`not-found.tsx`) | PNG/WebP, 800x800, transparent, < 300KB | Humanizes route exceptions with KIRO mascot looking perplexed at broken wire | High-quality 3D render of KIRO mascot with floating holographic error puzzle piece |
| **OG-01** | Master OpenGraph | `/assets/images/og/og_home.png` | Global root layout (`layout.tsx`) | 1200x630 (1.91:1), PNG/WebP, < 250KB | Social media link unfurl (Twitter/X, LinkedIn, Slack, WhatsApp) | Obsidian card with glowing purple brand accent, logo, and "Built to evolve" tagline |
| **OG-02** | Solutions OpenGraph | `/assets/images/og/og_solutions.png` | Master Solutions Hub (`/solutions/page.tsx`) | 1200x630 (1.91:1), PNG/WebP, < 250KB | Social card when sharing `/solutions` | "Where Architecture Meets Execution" with 6 discipline badges and 3D icons |
| **OG-03** | Work OpenGraph | `/assets/images/og/og_work.png` | Work & Proof Hub (`/work/page.tsx`) | 1200x630 (1.91:1), PNG/WebP, < 250KB | Social card when sharing `/work` | "Proven in Execution" featuring 12 production specimens and zero-fabrication badge |
| **OG-04** | Insights OpenGraph | `/assets/images/og/og_insights.png` | Knowledge Hub (`/insights/page.tsx`) | 1200x630 (1.91:1), PNG/WebP, < 250KB | Social card when sharing `/insights` | "Thinking, Learning & Building in Public" featuring technical research badges |
| **OG-05** | About OpenGraph | `/assets/images/og/og_about.png` | About Page (`/about/page.tsx`) | 1200x630 (1.91:1), PNG/WebP, < 250KB | Social card when sharing `/about` | "Problem-First Technology Partner" featuring core values and company identity |
| **OG-06** | Contact OpenGraph | `/assets/images/og/og_contact.png` | Contact Page (`/contact/page.tsx`) | 1200x630 (1.91:1), PNG/WebP, < 250KB | Social card when sharing `/contact` | "Let's Build." with direct engineering consultation invitation |

---

## 4. Deep Architectural Breakdown by Page & Component

### 4.1 Global Shell & Navigation
#### Components Involved:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ai/AIAssistant.tsx`

#### Assets Required:
1. **Primary Logo (Wide - Black & White SVGs)**:
   - File Path: `/assets/brand/logos/KAIROTRIX_Logo_Black_Wide.svg` & `/assets/brand/logos/KAIROTRIX_Logo_White_Wide.svg`
   - Purpose: Brand recognition on light navigation bars and dark footers.
   - Specs: Crisp SVG vector curves. Responsive height (`h-8 sm:h-9 md:h-10`).
2. **KIRO 3D Avatar (Active, Idle, Thinking)**:
   - File Path: `/assets/brand/kiro/kiro_avatar_3d.png`
   - Purpose: Visual presence for the persistent AI Assistant. Replaces the current temporary placement in `/assets/images/404/chat_icon.png`.
   - Specs: 512x512 PNG with alpha transparency. Crisp rim lighting in `#9333EA` (Kairo Purple).

---

### 4.2 Homepage (`/`)

#### 01 // HERO SECTION (`src/components/home/HeroSection.tsx`)
- **Hero Cinematic Video**:
  - File Path: `/assets/videos/home-hero.mp4`
  - Purpose: Scroll-driven scrubbing experience. When scrolling down, the video scrubs through the progression of raw technical complexity crystallizing into orderly architecture.
  - Duration: 4–6 seconds total timeline.
  - Video Framing: High center-clarity so the KAIROTRIX headline and CTA remain 100% legible over the video.
  - Production Note: Replace generic stock videos with custom rendered 3D motion graphics or high-production engineering capture.
- **Hero Video Poster Frame**:
  - File Path: `/assets/images/hero/hero_poster.webp`
  - Purpose: Immediate image render before video loads; zero Layout Shift (CLS < 0.05).
- **Vanishing Point Perspective Grid Panels**:
  - File Paths: `/assets/images/hero/tunnel_panel_1.webp` through `tunnel_panel_4.webp`
  - Purpose: Gliding graphic elements along the 4 walls of the perspective canvas.
  - Style: Subtle geometric patterns, circuit traces, optical data lines in dark obsidian with violet edge lighting.

#### 02 // WHAT IS KAIROTRIX (`src/components/home/WhatIsKairotrix.tsx`)
- **6-Stage Transformation Matrix Graphic**:
  - File Path: `/assets/images/home/transformation_stages.svg`
  - Purpose: Clarifies KAIROTRIX’s signature concept: `Disconnected → Understood → Structured → Connected → Intelligent → Evolving`.
  - Style: Vector technical nodes, hairline connectors, Kairo Purple pulse indicators.

#### 03 // WHAT WE PROVIDE (`src/components/home/WhatWeProvide.tsx`)
- **6 Signature 3D Discipline Levitating Artworks**:
  - File Paths: `/assets/images/solutions/disciplines/SERVICE01.webp` through `SERVICE06.webp`
  - Purpose: Centered 3D floating anchors inside the curved orbital carousel cards.
  - Dimensions: 800x800px (displayed at 144x144 to 280x280), transparent WebP.
  - Requirement: Compress existing 2.5MB PNGs down to ~150KB WebP with lossless alpha masking and enhanced ambient shadow depth.

#### 04 // WORK & PROOF (`src/components/home/WorkProof.tsx`)
- **4 Perspective Specimen Videos**:
  - Card 01: `/assets/videos/ai-assistant.mp4` (AI Agent orchestration sandbox)
  - Card 02: `/assets/videos/smart-search.mp4` (Hybrid vector search & citation preview)
  - Card 03: `/assets/videos/live-dashboard.mp4` (Sub-16ms WebSocket telemetry feed)
  - Card 04: `/assets/videos/automated-workflows.mp4` (Idempotent event webhook bridge)
  - Purpose: Immediate empirical proof of capability. Looping 1080p, 5-8s duration, < 3.5MB each.

#### 05 // HOW WE THINK / BUILD (`src/components/home/HowWeThinkBuild.tsx`)
- **6 Engineering Stage Schematics**:
  - Stage 01 (Understand): Operational friction diagnostic map (`audit_matrix.svg`)
  - Stage 02 (Explore): Custom vs SaaS ROI trade-off matrix (`decision_matrix.svg`)
  - Stage 03 (Architect): Multi-tier systems topology blueprint (`topology_blueprint.svg`)
  - Stage 04 (Build): CI/CD deterministic verification pipeline (`build_pipeline.svg`)
  - Stage 05 (Integrate): Event-driven webhook & API gateway mesh (`integration_mesh.svg`)
  - Stage 06 (Evolve): Telemetry observability & autonomous healing (`evolution_telemetry.svg`)
  - Purpose: Replaces code-only mockups with rich, authoritative technical diagrams that validate enterprise competence.

#### 06 // ARTICLES & BLOG PREVIEW (`src/components/home/InsightsPreview.tsx`)
- **5 Curated Video & Poster Cards**:
  - Video clips (16:9, 720p, < 3MB) and corresponding WebP cover cards illustrating key takeaways for featured technical articles.

---

### 4.3 Master Solutions Hub (`/solutions`) & 6 L2 Discipline Pages

#### Master Solutions Hub (`src/app/solutions/page.tsx`):
- **Slide-in Discipline Chamber Thumbnails** (6 files):
  - File Paths: `/assets/images/solutions/thumbnails/thumb_01.webp` to `thumb_06.webp`
  - Purpose: Slide smoothly into view from the left edge on hover (`width: 0 -> 140px`).
  - Dimensions: 280x168px (rendered at 140x84px @2x).

#### 6 Core L2 Discipline Pages (`src/app/solutions/[slug]/page.tsx`):
Across all 6 disciplines, there are **24 Practice Capabilities** that currently duplicate generic discipline images. Each capability needs its own **dedicated architecture diagram**:

#### Discipline 01: AI & Intelligent Systems (`/solutions/ai-intelligent-systems`)
1. `ai-applications.webp`: Multi-model routing engine with task-specific fallback queues.
2. `ai-agents.webp`: Stateful finite state machine (FSM) multi-agent directed acyclic graph (DAG).
3. `genai-ml.webp`: Fine-tuned parameter-efficient LoRA adapter pipeline with safety guardrails.
4. `knowledge-systems.webp`: Dense+sparse vector RAG retrieval with reciprocal rank fusion (RRF).

#### Discipline 02: Software & Product Engineering (`/solutions/software-product-engineering`)
1. `custom-software.webp`: Event-driven microservices architecture with domain-driven boundaries.
2. `web-apps.webp`: Next.js App Router streaming SSR with edge caching and binary WebSockets.
3. `product-dev.webp`: Modular MVP design token system scaling to enterprise multi-tenancy.
4. `product-design.webp`: High-density ergonomic operational UI component design system.

#### Discipline 03: Automation & Digital Operations (`/solutions/automation-digital-operations`)
1. `process-automation.webp`: Unattended robotic workflow automation pipeline with failure recovery.
2. `workflow-systems.webp`: Multi-department approval orchestration DAG with state persistence.
3. `document-automation.webp`: Multi-modal Vision-LLM invoice parsing with human-in-the-loop triggers.
4. `digital-operations.webp`: Real-time operational bottleneck tracking and SLA health monitors.

#### Discipline 04: Digital Transformation (`/solutions/digital-transformation`)
1. `website-platforms.webp`: Headless composable web architecture with sub-second TTFB.
2. `process-digitization.webp`: Paper/spreadsheet migration pipeline into normalized relational databases.
3. `legacy-modernization.webp`: Strangler Fig pattern architecture migrating legacy core systems.
4. `headless-cms.webp`: Omnichannel content mesh syndicating to web, mobile, and internal portals.

#### Discipline 05: Data & Business Intelligence (`/solutions/data-business-intelligence`)
1. `realtime-analytics.webp`: ClickHouse columnar streaming ingestion processing 50k+ events/sec.
2. `executive-dashboards.webp`: Zero-reflow GPU-accelerated executive cockpit dashboard mockup.
3. `predictive-analytics.webp`: Time-series demand forecasting with confidence interval bounds.
4. `nl-query-engines.webp`: Text-to-SQL semantic compiler with strict schema verification.

#### Discipline 06: Technology Integration (`/solutions/technology-integration`)
1. `api-integration.webp`: Zero-trust API gateway with token bucket rate limiting and mTLS encryption.
2. `crm-erp-sync.webp`: Bi-directional differential synchronization engine resolving state conflicts.
3. `payment-gateways.webp`: Double-entry cryptographic ledger and automated multi-rail payment routing.
4. `webhook-bridges.webp`: Idempotent webhook ingestion buffer with dead-letter retry queues.

---

### 4.4 Work & Technical Proof Hub (`/work`)

The Work Hub contains **12 production specimens**. Each specimen requires:
1. **Specimen Demonstration Video** (`/assets/videos/work/specimen_[01..12].mp4`):
   - Duration: 6–10 seconds seamless loop.
   - Resolution: 1280x720 or 1920x1080 (16:9).
   - Format: MP4 (H.264, no audio) + WebM fallback. Max file size: 4MB.
   - Purpose: Shows card hover video chamber animation and video streaming in flagship showcase.
2. **Specimen Interface Capture** (`/assets/images/work/specimens/specimen_[01..12].webp`):
   - Resolution: 1280x720 (16:9).
   - Format: WebP, q85, < 150KB.
   - Purpose: Primary card image before hover, fallback for mobile and reduced-motion visitors.

#### Complete 12-Specimen Asset List:
1. `autonomous-operations-agent`: Autonomous agent console showing tool-calling traces.
2. `enterprise-semantic-rag`: Enterprise RAG search box with multi-source citation badges.
3. `fintech-trading-portal`: Real-time order book, candlestick chart, and WebSocket feed.
4. `executive-command-center`: Executive KPI cockpit with revenue velocity and SLA gauges.
5. `event-driven-automation-bridge`: Webhook ingestion pipeline diagram with active event counter.
6. `autonomous-invoice-pipeline`: Document OCR confidence score overlay with automated approval check.
7. `legacy-core-banking-migration`: Database migration progress bar with live dual-run sync telemetry.
8. `enterprise-commerce-engine`: High-speed headless product catalog with sub-50ms search filter.
9. `sub-second-telemetry-engine`: Real-time server cluster metrics with CPU, memory, and P99 latency.
10. `predictive-demand-forecaster`: Supply chain forecasting curve with historical accuracy overlay.
11. `bi-directional-sync-engine`: Salesforce-to-PostgreSQL differential record sync monitor.
12. `multi-tenant-auth-gateway`: Zero-trust token inspection and mTLS certificate status console.

---

### 4.5 Knowledge & Thought Leadership Hub (`/insights`)

Contains **8 empirical publications** across 4 pillars. Each requires:
1. **Article Cover Visual** (`/assets/images/insights/covers/cover_[01..08].webp`):
   - Resolution: 1280x720 (16:9), WebP, < 150KB.
   - Style: Minimalist technical editorial illustration (e.g. state machine diagram, mathematical equation, memory cache layout).
2. **Hover Video Preview** (`/assets/videos/insights/preview_[01..08].mp4`):
   - Duration: 5–8 seconds loop, < 3.5MB.
   - Content: Fast-motion visual summary of the blueprint architecture, benchmark graphs, or code diffs.

#### The 8 Empirical Publications:
1. `deterministic-ai-agents`: FSM state machine schema contract flow.
2. `declarative-automation-bridge`: Cryptographic webhook verification and Redis lock buffer.
3. `legacy-spreadsheets-to-event-bridge`: Before/After comparison: fragile spreadsheet vs clean relational event log.
4. `document-automation-human-in-loop`: Multi-modal Vision-LLM extraction and confidence threshold routing.
5. `sub-50ms-telemetry-nextjs`: Canvas 2D offscreen buffer architecture vs React virtual DOM reconciliation.
6. `problem-first-vs-saas-sprawl`: 5-year TCO financial comparison chart: custom software vs per-seat SaaS.
7. `rag-vector-vs-hybrid-benchmarks`: Recall@10 benchmark graph: BM25 vs Dense Vector vs Reciprocal Rank Fusion.
8. `llm-context-caching-benchmarks`: TTFT latency reduction graph with static system prompt prefix caching.

---

### 4.6 About KAIROTRIX Hub (`/about`)

The About page currently relies solely on text and CSS gradients. Adding high-impact visual assets will significantly elevate its storytelling:

1. **Company Identity Sculpture** (`/assets/images/about/about_hero_sculpture.webp`):
   - Placement: Hero right column / ambient background.
   - Visual: 3D geometric ring morphing from raw solid mass into a structured, luminescent optical lattice.
   - Purpose: Embodying the tagline "Built to evolve."
2. **"The Industry Default" vs "The KAIROTRIX Standard" Infographic** (`/assets/images/about/standards_comparison.svg`):
   - Placement: `AboutIdentity.tsx`.
   - Visual: Side-by-side comparison diagram highlighting 4 operational dimensions (Vendor-First vs Problem-First, Per-Seat SaaS vs 100% Owned Code, Black-Box Vendors vs Direct Principal Engineers).
3. **6-Stage Execution Pipeline Blueprint** (`/assets/images/about/engineering_pipeline_full.svg`):
   - Placement: `AboutApproach.tsx`.
   - Visual: Complete systems schematic linking Understand → Explore → Architect → Build → Integrate → Evolve.
4. **Strategic Evolution Roadmap Graphic** (`/assets/images/about/strategic_evolution_roadmap.svg`):
   - Placement: `AboutFuture.tsx`.
   - Visual: 4-Phase trajectory showing the transition from Bespoke Services to Reusable Engines, AI Products, and Enterprise Platform.

---

### 4.7 OpenGraph & Social Media Sharing Cards (`1200x630px`)

Every primary route requires a dedicated OpenGraph image for Twitter/X cards, LinkedIn previews, and Slack link unfurls:

| Route | File Path | Headline on Card | Visual Element |
|---|---|---|---|
| `/` (Root) | `/assets/images/og/og_home.png` | KAIROTRIX — Built to evolve. | Obsidian card, glowing purple logo, "AI Technology & Software Solutions" |
| `/solutions` | `/assets/images/og/og_solutions.png` | Solutions Architecture — KAIROTRIX | 6 Core Discipline badges + 3D capability icons |
| `/solutions/[slug]` (x6) | `/assets/images/og/og_solution_[slug].png` | [Discipline Name] — KAIROTRIX | Specific 3D discipline artwork + telemetry metrics |
| `/work` | `/assets/images/og/og_work.png` | Work & Capability Proof — KAIROTRIX | Specimen grid showcase + "100% Verified Production Systems" |
| `/insights` | `/assets/images/og/og_insights.png` | Knowledge & System Blueprints — KAIROTRIX | "Engineering in Public" + System Blueprint equation |
| `/about` | `/assets/images/og/og_about.png` | About KAIROTRIX — Problem-First Technology | "Built to evolve" manifesto badge + core engineering principles |
| `/contact` | `/assets/images/og/og_contact.png` | Let's Build — KAIROTRIX | "Initiate Collaboration" + direct SLA promise |

---

## 5. Technical Encoding & Optimization Standards

To ensure the website maintains its performance target (**LCP < 2.5s, PageSpeed 95+**), all asset generation must follow these strict technical parameters:

### 5.1 Video Production Specifications
- **Container Formats**: Dual delivery via `.mp4` (H.264/AAC for maximum browser compatibility) and `.webm` (VP9/AV1 for Chromium/modern browsers).
- **Resolution**:
  - Hero Background: 1920x1080 (16:9).
  - Specimen & Card Demos: 1280x720 (16:9) or 1080x720 (3:2).
- **Framerate**: Exactly 30fps (smooth motion without bloated file size).
- **Bitrate / CRF**: CRF 22–24 for H.264. Average video bitrate < 2.5 Mbps.
- **Audio**: **Completely stripped** (`-an` flag in ffmpeg). Never deliver video with an empty audio track.
- **HTML Attributes Required**: `autoPlay muted loop playsInline preload="none"` (or `preload="metadata"`).

```bash
# Recommended FFmpeg Compression Command for Card Demos:
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -an -movflags +faststart output.mp4
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -an output.webm
```

### 5.2 Raster Images (WebP & AVIF)
- **Primary Format**: `.webp` for general photography, UI captures, and 3D renders.
- **Secondary Format**: `.png` **only** when crisp vector-raster hybrids or lossless alpha transparency cannot be achieved in WebP.
- **Quality Setting**: `quality: 80-85` for photographs; `lossless: true` or `quality: 90` for UI diagrams with crisp text.
- **Next.js `<Image>` Implementation**: Always specify explicit `width`, `height`, `sizes`, and `priority` (only on above-the-fold hero images).

### 5.3 Vector Graphics (SVG)
- **Sanitization**: Strip all Adobe Illustrator / Figma metadata, hidden layers, inline `<style>` tags, and unnecessary namespaces.
- **Optimization**: Run through SVGO (`svgo --multipass`).
- **Color Variables**: Use `currentColor` or CSS custom properties (`var(--color-brand-primary)`) to support dynamic theming.

---

## 6. Production Priority & Action Roadmap

| Phase | Milestone / Objective | Key Assets to Produce | Urgency |
|---|---|---|---|
| **Phase 1** | **Hero & Brand Cleanup** | 1. Custom Hero Cinematic Scroll Video (`hero_cinematic_scroll.mp4`).<br>2. Compress existing 6 Discipline PNGs (`SERVICE01-06`) to WebP.<br>3. Relocate KIRO avatar from `404/chat_icon.png` to `brand/kiro/`. | **Immediate** |
| **Phase 2** | **Work Specimen Proof** | 1. Produce real interface demo clips for 12 Work specimens (`specimen_01..12.mp4`).<br>2. Generate clean dark-mode UI screenshots for each specimen. | **High** |
| **Phase 3** | **OpenGraph & SEO Suite** | 1. Design and render 7 primary OG cards (1200x630px).<br>2. Wire up Next.js Metadata API in all `page.tsx` route files. | **High** |
| **Phase 4** | **Solutions Capabilities** | 1. Produce 24 technical architecture diagrams for Capability Explorer.<br>2. Produce 4-phase methodology diagrams (`phase_01..04.webp`). | **Medium** |
| **Phase 5** | **Insights Publications** | 1. Render 8 technical blueprint covers.<br>2. Produce 8 short hover video walkthroughs. | **Medium** |
| **Phase 6** | **About Page Elevation** | 1. Create About Hero 3D sculpture.<br>2. Vectorize 6-stage engineering pipeline and strategic roadmap diagrams. | **Normal** |

---

*This specification serves as the master contract for all digital asset generation, acquisition, and optimization for the KAIROTRIX web platform.*
