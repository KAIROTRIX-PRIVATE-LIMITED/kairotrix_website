# KAIROTRIX — Complete Master Static Assets Checklist

> **Scope Note:** This list includes **ALL permanent static assets** across the entire website, including **all 6 core disciplines and all 24 sub-services**, organized page-by-page and section-by-section. Dynamic CMS works, projects, and blog insights uploaded via the Admin Dashboard are excluded.

---

## 1. Global / Site-Wide Shell (Header, Tab & Social Sharing)

| # | Location / Component | Current File | New Plain English File Name | Description (What to find / create) | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | Browser Tab | Next.js default | `favicon.ico` | KAIROTRIX purple "K" geometric emblem. | 32×32px `.ico` (< 10 KB) |
| **02** | Mobile Home Screen | None | `apple-touch-icon.png` | KAIROTRIX emblem centered on dark obsidian square. | 180×180px `.png` (< 30 KB) |
| **03** | Navbar / Footer Logo | SVG inline | `kairotrix-symbol.svg` | Clean vector emblem used for header and hero video mask. | Vector `.svg` (< 5 KB) |
| **04** | Navbar / Footer Wordmark | SVG inline | `kairotrix-logo.svg` | Wide KAIROTRIX typography logo for dark and light backgrounds. | Vector `.svg` (< 10 KB) |
| **05** | OpenGraph Social Card | Empty | `og-home.jpg` | 1200×630px card: Logo + "Technology Built to Solve Real Problems". | 1200×630px `.jpg` (< 150 KB) |
| **06** | OpenGraph Solutions | Empty | `og-solutions.jpg` | 1200×630px card showcasing the 6 Core Disciplines. | 1200×630px `.jpg` (< 150 KB) |
| **07** | OpenGraph About | Empty | `og-about.jpg` | 1200×630px card: "Built in Silence, Proven in Motion". | 1200×630px `.jpg` (< 150 KB) |
| **08** | OpenGraph Contact | Empty | `og-contact.jpg` | 1200×630px card: "Engineer Your Next System With KAIROTRIX". | 1200×630px `.jpg` (< 150 KB) |

---

## 2. Home Page (`/`)

### Section 1: Hero Section (`HeroSection.tsx` & `HeroBackgroundCanvas.tsx`)

| # | Element | Current File (Problem) | New Plain English File Name | Description (What to find / create) | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **09** | **Full-Screen Video Reveal** | `home-hero.mp4` (12 MB stock clip) | `home-hero.mp4` | Dark cinematic seamless loop (4–6s) of abstract neural data streams or code matrix. Pure dark background (`#08080C`) with purple accents. | MP4 (H.264, muted, loop) **< 3 MB** |
| **10** | **Hero Video Poster** | None *(causes black flash before video loads)* | `home-hero-poster.webp` | Clean first-frame capture of `home-hero.mp4` so mobile and slow connections never show black. | 1920×1080px `.webp` (< 80 KB) |
| **11** | **3D Background Canvas Panel 1** | `panel_1.jpg` (858 KB heavy photo) | `tunnel-panel-ai.webp` | Floating 3D canvas card: AI Agent workflow diagram & decision nodes. | 600×400px `.webp` (< 50 KB) |
| **12** | **3D Background Canvas Panel 2** | `panel_2.jpg` (776 KB heavy photo) | `tunnel-panel-cloud.webp` | Floating 3D canvas card: Cloud infrastructure & microservices blueprint. | 600×400px `.webp` (< 50 KB) |
| **13** | **3D Background Canvas Panel 3** | `panel_3.jpg` (952 KB heavy photo) | `tunnel-panel-code.webp` | Floating 3D canvas card: Clean TypeScript / Python code syntax snippet. | 600×400px `.webp` (< 50 KB) |
| **14** | **3D Background Canvas Panel 4** | `panel_4.jpg` (1,028 KB heavy photo) | `tunnel-panel-data.webp` | Floating 3D canvas card: Real-time telemetry dashboard & KPI bar chart. | 600×400px `.webp` (< 50 KB) |

### Section 2: What is KAIROTRIX (`WhatIsKairotrix.tsx`)
- **Status:** **Zero external media required.** Built completely with interactive typography, kinetic word scrubbing, and code animations.

### Section 3: What We Provide (`WhatWeProvide.tsx`)
- Uses the **6 Core Discipline 3D Renders** (listed below in Section 3).

### Section 4: How We Think / Build (`HowWeThinkBuild.tsx`)
- **Status:** **Zero external media required.** Interactive Framer Motion UI diagnostic widgets and animated SVG pipeline.

### Section 5: Final Call to Action (`FinalCTA.tsx`)
- **Status:** **Zero external media required.** Pure UI with vector icons and interactive email button.

---

## 3. Core Discipline Assets (Used on Home & Solutions Pages)

These 6 assets are the primary 3D visual anchors used on the **Home page rotating dial** (`WhatWeProvide.tsx`), the **Solutions Hub grid** (`SolutionsGrid.tsx`), and the **Discipline detail pages** (`/solutions/[slug]`).

| # | Discipline | Current File (Repeated 60+ Times) | New Plain English File Name | Description (What to find / create) | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **15** | **01. AI & Intelligent Systems** | `SERVICE01.png` (2.4 MB) | `discipline-ai.webp` | Glowing 3D neural brain or synaptic crystalline lattice in purple/white on transparent background. | Transparent `.webp` (< 150 KB) |
| **16** | **02. Custom Software & Engineering** | `SERVICE02.png` (2.2 MB) | `discipline-software.webp` | 3D layered modular software architecture prism or stacked glass interface plates. | Transparent `.webp` (< 150 KB) |
| **17** | **03. Automation & Digital Operations** | `SERVICE03.png` (2.4 MB) | `discipline-automation.webp` | 3D interconnected robotic gears, automated kinetic pipelines, or event loops. | Transparent `.webp` (< 150 KB) |
| **18** | **04. Digital Transformation** | `SERVICE04.png` (2.2 MB) | `discipline-modernization.webp` | 3D transitioning digital structure (wireframe skeleton shifting into modern solid monolith). | Transparent `.webp` (< 150 KB) |
| **19** | **05. Data & Business Intelligence** | `SERVICE05.png` (2.1 MB) | `discipline-data.webp` | 3D holographic data cube with glowing KPI bar metrics and telemetry waves. | Transparent `.webp` (< 150 KB) |
| **20** | **06. Technology Integration** | `SERVICE06.png` (2.6 MB) | `discipline-integration.webp` | 3D central hub connecting multiple glowing fiber-optic API bridges and connectors. | Transparent `.webp` (< 150 KB) |

---

## 4. Solutions Detail Pages: Discipline Hero Background Videos

Each of the 6 discipline detail pages (`/solutions/[slug]`) has a cinematic hero banner:

| # | Discipline Page | Current Status | New Plain English File Name | Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **21** | `/solutions/ai-intelligent-systems` | `ai-service.mp4` (32 MB uncompressed) | `discipline-hero-ai.mp4` | 4–6s loop of autonomous AI agents interacting, neural networks processing. | MP4 (muted, loop) **< 2 MB** |
| **22** | `/solutions/software-product-engineering` | `software-service.mp4` (12 MB) | `discipline-hero-software.mp4` | 4–6s loop of code compiling, modular cloud infrastructure spinning up. | MP4 (muted, loop) **< 2 MB** |
| **23** | `/solutions/automation-digital-operations` | None *(missing)* | `discipline-hero-automation.mp4` | 4–6s loop of robotic workflow orchestration, automated tasks triggering. | MP4 (muted, loop) **< 2 MB** |
| **24** | `/solutions/digital-transformation` | None *(missing)* | `discipline-hero-modernization.mp4` | 4–6s loop of legacy architecture modernizing into high-speed digital cloud systems. | MP4 (muted, loop) **< 2 MB** |
| **25** | `/solutions/data-business-intelligence` | None *(missing)* | `discipline-hero-data.mp4` | 4–6s loop of live streaming data pipelines, 3D telemetry analytics visuals. | MP4 (muted, loop) **< 2 MB** |
| **26** | `/solutions/technology-integration` | None *(missing)* | `discipline-hero-integration.mp4` | 4–6s loop of interconnected API network nodes synchronizing in real time. | MP4 (muted, loop) **< 2 MB** |

---

## 5. All 24 Sub-Service Visual Assets

Currently, every sub-service simply repeats `SERVICE01.png` through `SERVICE06.png`. Here is the full list of all 24 individual sub-service cards with their dedicated, unique asset specs:

### Discipline 01: AI & Intelligent Systems Sub-Services
| # | Sub-Service | Current File | New Plain English File Name | Visual Content Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **27** | **01.1 AI Application Development** | `SERVICE01.png` | `subservice-ai-apps.webp` | Modern web interface with live streaming AI response & multimodal inputs. | WebP / PNG (< 100 KB) |
| **28** | **01.2 Autonomous AI Agents** | `SERVICE01.png` | `subservice-ai-agents.webp` | Multi-agent collaboration loop executing multi-step reasoning & tool calls. | WebP / PNG (< 100 KB) |
| **29** | **01.3 Enterprise RAG Pipelines** | `SERVICE01.png` | `subservice-ai-rag.webp` | Document ingestion embedding into vector database with verified citations. | WebP / PNG (< 100 KB) |
| **30** | **01.4 Domain Fine-Tuned LLMs** | `SERVICE01.png` | `subservice-ai-models.webp` | Neural weight training loss curve and specialized enterprise domain model. | WebP / PNG (< 100 KB) |

### Discipline 02: Software & Product Engineering Sub-Services
| # | Sub-Service | Current File | New Plain English File Name | Visual Content Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **31** | **02.1 Custom Web Applications** | `SERVICE02.png` | `subservice-software-web.webp` | High-speed responsive web app dashboard with real-time UI components. | WebP / PNG (< 100 KB) |
| **32** | **02.2 Enterprise SaaS Engineering** | `SERVICE02.png` | `subservice-software-saas.webp` | Multi-tenant cloud architecture with tenant isolation and billing engine. | WebP / PNG (< 100 KB) |
| **33** | **02.3 Internal Operations Tools** | `SERVICE02.png` | `subservice-software-internal.webp` | Custom internal admin workspace, inventory tracker, and approval board. | WebP / PNG (< 100 KB) |
| **34** | **02.4 Product UX/UI Architecture** | `SERVICE02.png` | `subservice-software-ux.webp` | Design system component library, layout grid, and high-fidelity wireframe. | WebP / PNG (< 100 KB) |

### Discipline 03: Automation & Digital Operations Sub-Services
| # | Sub-Service | Current File | New Plain English File Name | Visual Content Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **35** | **03.1 Business Workflow Automation** | `SERVICE03.png` | `subservice-automation-workflows.webp` | Flowchart showing trigger-action steps eliminating manual data entry. | WebP / PNG (< 100 KB) |
| **36** | **03.2 Document Processing & OCR** | `SERVICE03.png` | `subservice-automation-ocr.webp` | Invoice / contract scanner extracting key-value pairs into structured JSON. | WebP / PNG (< 100 KB) |
| **37** | **03.3 Multi-Step Approval Chains** | `SERVICE03.png` | `subservice-automation-approvals.webp` | Role-based approval chain with automated Slack/email notifications. | WebP / PNG (< 100 KB) |
| **38** | **03.4 Event-Driven Scheduled Tasks** | `SERVICE03.png` | `subservice-automation-tasks.webp` | Cron job scheduler, background worker queue, and webhook event listeners. | WebP / PNG (< 100 KB) |

### Discipline 04: Digital Transformation Sub-Services
| # | Sub-Service | Current File | New Plain English File Name | Visual Content Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **39** | **04.1 Modern Web & E-Commerce** | `SERVICE04.png` | `subservice-modern-ecommerce.webp` | Headless e-commerce storefront with high conversion cart & checkout UI. | WebP / PNG (< 100 KB) |
| **40** | **04.2 Process & Operational Digitization** | `SERVICE04.png` | `subservice-modern-process.webp` | Paper/spreadsheet process converted into intuitive digital touch tablet UI. | WebP / PNG (< 100 KB) |
| **41** | **04.3 Legacy System Modernization** | `SERVICE04.png` | `subservice-modern-legacy.webp` | Staged migration from legacy on-prem servers to modern cloud APIs. | WebP / PNG (< 100 KB) |
| **42** | **04.4 Systems Architecture Consulting** | `SERVICE04.png` | `subservice-modern-architecture.webp` | Enterprise systems blueprint diagram showing scalability & zero single-point-of-failure. | WebP / PNG (< 100 KB) |

### Discipline 05: Data & Business Intelligence Sub-Services
| # | Sub-Service | Current File | New Plain English File Name | Visual Content Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **43** | **05.1 Real-Time KPI Dashboards** | `SERVICE05.png` | `subservice-data-dashboards.webp` | Real-time charts, MRR gauges, active user counters, and operational metrics. | WebP / PNG (< 100 KB) |
| **44** | **05.2 Business Data Analytics** | `SERVICE05.png` | `subservice-data-analytics.webp` | Cohort analysis, customer churn prediction, and trend forecasting graph. | WebP / PNG (< 100 KB) |
| **45** | **05.3 Automated Executive Reporting** | `SERVICE05.png` | `subservice-data-reports.webp` | Automated weekly PDF / Slack executive summary with key revenue highlights. | WebP / PNG (< 100 KB) |
| **46** | **05.4 Conversational Data Queries** | `SERVICE05.png` | `subservice-data-queries.webp` | Natural language text-to-SQL query generating instant chart answers. | WebP / PNG (< 100 KB) |

### Discipline 06: Technology Integration Sub-Services
| # | Sub-Service | Current File | New Plain English File Name | Visual Content Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **47** | **06.1 CRM & ERP System Integration** | `SERVICE06.png` | `subservice-integration-crm-erp.webp` | Bidirectional synchronization hub between Salesforce/HubSpot and SAP/NetSuite. | WebP / PNG (< 100 KB) |
| **48** | **06.2 Custom API Development & Bridges** | `SERVICE06.png` | `subservice-integration-api.webp` | Secure REST / GraphQL API endpoints with JWT auth and rate limiting. | WebP / PNG (< 100 KB) |
| **49** | **06.3 Real-Time Data Synchronization** | `SERVICE06.png` | `subservice-integration-sync.webp` | Kafka / WebSocket event bus syncing databases with zero lag and retry logic. | WebP / PNG (< 100 KB) |
| **50** | **06.4 Payment Gateways & FinTech** | `SERVICE06.png` | `subservice-integration-payments.webp` | Stripe / Razorpay payment gateway integration with webhooks and ledger reconciliation. | WebP / PNG (< 100 KB) |

---

## 6. About Page (`/about`)

| # | Section | Current File | New Plain English File Name | Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **51** | **About Hero Concept** | CSS Grid only | `about-sculpture.webp` | Minimalist dark glass 3D sculpture symbolizing "Built in Silence, Proven in Motion". | Transparent `.webp` (< 120 KB) |

---

## 7. Error Page (`/not-found`)

| # | Element | Current File | New Plain English File Name | Description | Format & Size |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **52** | **404 Missing Graphic** | `404.png` (1.2 MB heavy file) | `404-visual.webp` | Sleek 3D disconnected cable or holographic "Signal Lost" wireframe. | WebP (< 80 KB) |
| **53** | **Assistant Chat Icon** | `chat_icon.png` (1.4 MB heavy file) | `chat-symbol.svg` | Clean vector assistant emblem. | Vector `.svg` (< 5 KB) |

---

## 📊 Summary Count

- **Global Shell & Sharing:** 8 assets
- **Home Page Hero:** 6 assets
- **Core Disciplines (Main 3D):** 6 assets
- **Discipline Hero Videos:** 6 assets
- **All 24 Sub-Services:** 24 assets
- **About & 404 Pages:** 3 assets
- **Grand Total:** **53 pure static assets** (zero CMS work/blog placeholders)
