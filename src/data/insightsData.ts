export type InsightCategory = 'all' | 'blueprint' | 'case-study' | 'article' | 'research';

export type InsightBadge =
  | 'SYSTEM BLUEPRINT'
  | 'ARCHITECTURE BREAKDOWN'
  | 'EXPERIMENT'
  | 'BUILD NOTE';

export interface TechCategory {
  id: string;
  label: string;
  description?: string;
}

export const TECH_CATEGORIES: TechCategory[] = [
  { id: 'all', label: 'All Articles' },
  { id: 'ai-agents', label: 'AI & Agents' },
  { id: 'software-engineering', label: 'Software Engineering' },
  { id: 'automation', label: 'Automation' },
  { id: 'web-digital', label: 'Web & Digital' },
  { id: 'data-intelligence', label: 'Data & Intelligence' },
  { id: 'architecture-integration', label: 'Architecture & Integration' },
];

/** @deprecated Use TECH_CATEGORIES instead */
export const INSIGHT_L2_SERVICES = TECH_CATEGORIES;

export interface InsightSpecimen {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'blueprint' | 'case-study' | 'article' | 'research';
  badge: InsightBadge;
  disciplineId: string;
  disciplineName: string;
  techCategoryId: string;
  techCategoryLabel: string;
  serviceId?: string;
  serviceName?: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  tags: string[];
  featured?: boolean;
  videoSrc?: string;
  image: string;
  keyTakeaway: string;
  empiricalMetric: {
    label: string;
    value: string;
  };
  architectureEquation?: {
    left: string;
    operator: string;
    right: string;
    outcome: string;
  };
  keySections: string[];
  content?: string;
  youtubeUrl?: string;
}

export const INSIGHT_CATEGORIES = [
  { id: 'all', label: 'All Knowledge', anchor: 'all', count: 8 },
  { id: 'blueprint', label: 'System Blueprints', anchor: 'blueprints', count: 2 },
  { id: 'case-study', label: 'Case Studies', anchor: 'case-studies', count: 2 },
  { id: 'article', label: 'Articles & Blog', anchor: 'articles', count: 2 },
  { id: 'research', label: 'Research & Whitepapers', anchor: 'research', count: 2 },
] as const;

export const INSIGHT_DISCIPLINES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'ai-intelligent-systems', label: 'AI & Intelligent Systems' },
  { id: 'software-product-engineering', label: 'Software & Product Engineering' },
  { id: 'automation-digital-operations', label: 'Automation & Operations' },
  { id: 'digital-transformation', label: 'Digital Transformation' },
  { id: 'data-business-intelligence', label: 'Data & BI' },
  { id: 'technology-integration', label: 'Technology Integration' },
] as const;

export const INSIGHT_SPECIMENS: InsightSpecimen[] = [
  {
    id: 'deterministic-ai-agents',
    slug: 'deterministic-ai-agents',
    title: 'Architecting Deterministic Autonomous AI Agents for Enterprise Workflows',
    subtitle: 'Eliminating Stochastic Hallucination in Multi-Agent Production Systems',
    excerpt:
      'How to eliminate non-deterministic LLM hallucinations using strict JSON schema validation contracts, tool-calling guardrails, and persistent state machines across distributed agent swarms.',
    category: 'blueprint',
    badge: 'SYSTEM BLUEPRINT',
    disciplineId: 'ai-intelligent-systems',
    disciplineName: 'AI & Intelligent Systems',
    techCategoryId: 'ai-agents',
    techCategoryLabel: 'AI & Agents',
    serviceId: 'ai-agents',
    serviceName: 'AI Agent Development',
    date: 'Sep 2026',
    readTime: '8 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'Core Systems & Agent Runtime',
    tags: ['Autonomous Agents', 'Schema Contracts', 'Tool-Use Guardrails', 'State Machines'],
    featured: true,
    videoSrc: '/assets/videos/smart-search.mp4',
    image: '/assets/images/service/SERVICE01.png',
    keyTakeaway:
      'Strict Pydantic JSON schemas and state machine checkpoints eliminate the vast majority of agent execution drift before external actions are dispatched.',
    empiricalMetric: {
      label: 'Agent Execution Reliability',
      value: 'High Fidelity',
    },
    architectureEquation: {
      left: 'Formal JSON Schema Contracts',
      operator: '+',
      right: 'Deterministic State Machine FSM',
      outcome: 'Controlled Enterprise Action Runtime',
    },
    keySections: [
      'The Fallacy of Unbounded LLM Agency',
      'The Formal Schema Contract Architecture',
      'Bounded Finite-State Execution Machines',
      'Distributed Context Isolation & Recovery',
      'Production Audit Telemetry & Observability',
    ],
  },
  {
    id: 'declarative-automation-bridge',
    slug: 'declarative-automation-bridge',
    title: 'Event-Driven Automation Bridge: Idempotent Webhook Architecture',
    subtitle: 'Reliable Event Ingestion Across Heterogeneous SaaS & Cloud Platforms',
    excerpt:
      'A deep architectural specification on designing fault-tolerant webhook ingestion pipelines featuring cryptographic payload validation, distributed Redis locks, and exponential backoff retry buffers.',
    category: 'blueprint',
    badge: 'SYSTEM BLUEPRINT',
    disciplineId: 'automation-digital-operations',
    disciplineName: 'Automation & Operations',
    techCategoryId: 'automation',
    techCategoryLabel: 'Automation',
    serviceId: 'workflows',
    serviceName: 'Workflow Orchestration',
    date: 'Aug 2026',
    readTime: '10 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'Distributed Systems & Integrations',
    tags: ['Webhook Ingestion', 'Redis Locks', 'Dead-Letter Queues', 'Event Sourcing'],
    videoSrc: '/assets/videos/automated-workflows.mp4',
    image: '/assets/images/service/SERVICE03.png',
    keyTakeaway:
      'Idempotency keys paired with dead-letter queue buffering prevent duplicate executions during upstream third-party API outages.',
    empiricalMetric: {
      label: 'Pipeline Reliability',
      value: 'Fault-Tolerant',
    },
    architectureEquation: {
      left: 'HMAC Webhook Ingestion',
      operator: '+',
      right: 'Distributed Redis Mutex Queue',
      outcome: 'Reliable Deduplicated Delivery',
    },
    keySections: [
      'The Unreliability of Commercial Webhooks',
      'Payload Signature Verification & Rate Shaving',
      'Distributed Deduplication with Redis Locks',
      'Exponential Backoff & Dead-Letter Isolation',
      'Auditing & Automatic Self-Healing Mechanisms',
    ],
  },
  {
    id: 'legacy-spreadsheets-to-event-bridge',
    slug: 'legacy-spreadsheets-to-event-bridge',
    title: 'From Fragile Spreadsheets to an Event-Driven Operations Engine: A Technical Retrospective',
    subtitle: 'How We Modernized Multi-Department Order Tracking into Automated Real-Time Pipelines',
    excerpt:
      'The architectural journey from manual, formula-corrupted spreadsheets into an event-driven automation engine connecting logistics, ERP, and executive dashboards with minimal disruption.',
    category: 'case-study',
    badge: 'BUILD NOTE',
    disciplineId: 'digital-transformation',
    disciplineName: 'Digital Transformation',
    techCategoryId: 'architecture-integration',
    techCategoryLabel: 'Architecture & Integration',
    serviceId: 'process-digitization',
    serviceName: 'System Modernization & Migration',
    date: 'Jul 2026',
    readTime: '9 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'Platform Engineering Lead',
    tags: ['Digital Transformation', 'Event Driven', 'ERP Sync', 'Legacy Migration'],
    videoSrc: '/assets/videos/live-dashboard.mp4',
    image: '/assets/images/service/SERVICE04.png',
    keyTakeaway:
      'Replaced 14 disconnected spreadsheets with an immutable relational event log, saving 34 manual reconciliation hours every week.',
    empiricalMetric: {
      label: 'Weekly Time Saved',
      value: '34 Hours',
    },
    architectureEquation: {
      left: 'Decoupled Event Ingestion',
      operator: '+',
      right: 'Normalized PostgreSQL Core',
      outcome: 'Single Source of Operational Truth',
    },
    keySections: [
      'The Root Problem: Spreadsheet Collapse at Scale',
      'Data Schema Extraction & Relational Normalization',
      'Real-Time Webhook Pipeline Design',
      'Zero-Disruption Cutover Strategy',
      'Measured Operational ROI & Scalability',
    ],
  },
  {
    id: 'document-automation-human-in-loop',
    slug: 'document-automation-human-in-loop',
    title: 'Modernizing High-Volume Document Workflows with Multi-Modal AI & Confidence Escalation',
    subtitle: 'Processing High-Volume Monthly Invoices with Deterministic Audit Logging & Privacy Controls',
    excerpt:
      'A technical breakdown of building a multi-modal document extraction pipeline that parses unstructured PDF invoices into structured database records with automated human-in-the-loop escalation.',
    category: 'case-study',
    badge: 'ARCHITECTURE BREAKDOWN',
    disciplineId: 'technology-integration',
    disciplineName: 'Technology Integration',
    techCategoryId: 'automation',
    techCategoryLabel: 'Automation',
    serviceId: 'document-automation',
    serviceName: 'Document & Operations Automation',
    date: 'Jun 2026',
    readTime: '8 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'Applied AI & Automation',
    tags: ['Document Extraction', 'Multi-Modal AI', 'Human-in-the-Loop', 'Accounting Sync'],
    videoSrc: '/assets/videos/software-service.mp4',
    image: '/assets/images/service/SERVICE06.png',
    keyTakeaway:
      'Confidence-threshold routing automatically triggers manual review when character extraction confidence drops below acceptable tolerances.',
    empiricalMetric: {
      label: 'Manual Review Redirection',
      value: 'Substantial Reduction',
    },
    architectureEquation: {
      left: 'Vision-LLM OCR Extraction',
      operator: '+',
      right: 'Confidence-Scored Review Queue',
      outcome: 'Validated Financial Record Ingestion',
    },
    keySections: [
      'Document Format Variances & OCR Pitfalls',
      'Multi-Modal Vision Parsing Architecture',
      'Confidence Scoring Algorithm & Escalation Triggers',
      'Accounting ERP Automated Reconciliation',
      'Data Privacy & On-Premises Compliance',
    ],
  },
  {
    id: 'sub-50ms-telemetry-nextjs',
    slug: 'sub-50ms-telemetry-nextjs',
    title: 'Engineering Low-Latency Real-Time Event Telemetry with Next.js 15 & WebSockets',
    subtitle: 'High-Throughput Ingestion Pipelines and Client Canvas Rendering',
    excerpt:
      'How to ingest and render thousands of high-frequency events per second with memory-efficient client canvas pipelines and WebSocket event streams without blocking the main React render cycle.',
    category: 'article',
    badge: 'ARCHITECTURE BREAKDOWN',
    disciplineId: 'software-product-engineering',
    disciplineName: 'Software & Product Engineering',
    techCategoryId: 'software-engineering',
    techCategoryLabel: 'Software Engineering',
    serviceId: 'web-apps',
    serviceName: 'Web Application Development',
    date: 'Aug 2026',
    readTime: '7 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'UI/UX & Performance Engineering',
    tags: ['Next.js 15', 'WebSockets', 'Canvas 2D', 'High Throughput'],
    videoSrc: '/assets/videos/fast-analytics.mp4',
    image: '/assets/images/service/SERVICE02.png',
    keyTakeaway:
      'Bypassing React state reconciliation for high-frequency chart streams via direct offscreen Canvas 2D buffers maintains smooth frame rates.',
    empiricalMetric: {
      label: 'Rendering Performance',
      value: 'Smooth 60 FPS',
    },
    architectureEquation: {
      left: 'Raw WebSocket Binary Framing',
      operator: '+',
      right: 'Offscreen Canvas Buffer Rendering',
      outcome: 'Low Jitter Canvas Updates',
    },
    keySections: [
      'The Bottleneck of React Virtual DOM in Telemetry',
      'Binary WebSocket Framing vs JSON Serialization',
      'Worker-Based Offscreen Canvas Rendering',
      'Memory Pressure Profiling & GC Throttling',
      'Benchmarked Frame Rate & Latency Stats',
    ],
  },
  {
    id: 'problem-first-vs-saas-sprawl',
    slug: 'problem-first-vs-saas-sprawl',
    title: 'Why Problem-First Architecture Outperforms Pre-Packaged SaaS Vendor Stacks',
    subtitle: 'A Financial and Architectural Analysis of Software Sprawl vs Bespoke Engineering',
    excerpt:
      'A critical breakdown of enterprise software sprawl and how purpose-built bespoke software delivers significantly higher 5-year operational ROI, total IP ownership, and zero monthly per-seat licensing penalties.',
    category: 'article',
    badge: 'BUILD NOTE',
    disciplineId: 'software-product-engineering',
    disciplineName: 'Software & Product Engineering',
    techCategoryId: 'software-engineering',
    techCategoryLabel: 'Software Engineering',
    serviceId: 'custom-software',
    serviceName: 'Custom Software Development',
    date: 'Aug 2026',
    readTime: '6 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'Chief Technology Partner',
    tags: ['Software Strategy', 'TCO Analysis', 'Custom Software', 'ROI Architecture'],
    videoSrc: '/assets/videos/ai-assistant.mp4',
    image: '/assets/images/service/SERVICE02.png',
    keyTakeaway:
      'Bespoke systems pay for themselves within 14–18 months by eliminating recurring seat licenses and custom integration maintenance fees.',
    empiricalMetric: {
      label: '5-Year Cost Profile',
      value: 'Predictable TCO',
    },
    architectureEquation: {
      left: 'Zero Recurring Seat Penalties',
      operator: '+',
      right: '100% Owned Custom Architecture',
      outcome: 'Long-Term Asset Ownership',
    },
    keySections: [
      'The Hidden Tax of Enterprise SaaS Proliferation',
      'The Integration Nightmare of Locked Ecosystems',
      'Bespoke Software as an Appreciating Asset',
      'Mathematical 5-Year Total Cost of Ownership',
      'When to Buy vs When to Engineer',
    ],
  },
  {
    id: 'rag-vector-vs-hybrid-benchmarks',
    slug: 'rag-vector-vs-hybrid-benchmarks',
    title: 'Benchmarking Retrieval Approaches: Hybrid Dense+Sparse Retrieval vs Pure Vector Search in Production RAG',
    subtitle: 'Comparing Recall@10, Latency, and Ingestion Overhead Across Technical Documentation',
    excerpt:
      'We benchmarked BM25 keyword matching combined with dense vector embeddings across extensive technical documentation chunks to evaluate retrieval precision, recall, and infrastructure costs.',
    category: 'research',
    badge: 'EXPERIMENT',
    disciplineId: 'data-business-intelligence',
    disciplineName: 'Data & BI',
    techCategoryId: 'ai-agents',
    techCategoryLabel: 'AI & Agents',
    serviceId: 'knowledge-systems',
    serviceName: 'AI Knowledge Systems & RAG',
    date: 'Jul 2026',
    readTime: '11 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'Information Retrieval & Data Science',
    tags: ['Hybrid Search', 'Dense Vector Embeddings', 'BM25', 'RAG Benchmarks'],
    videoSrc: '/assets/videos/data-sync.mp4',
    image: '/assets/images/service/SERVICE05.png',
    keyTakeaway:
      'Reciprocal Rank Fusion (RRF) combining dense cosine distance and sparse BM25 scores significantly lifted domain-specific retrieval recall over pure semantic matching.',
    empiricalMetric: {
      label: 'Retrieval Accuracy',
      value: 'Substantial Precision Lift',
    },
    architectureEquation: {
      left: 'Dense Semantic Vector Search',
      operator: '+',
      right: 'Sparse BM25 Keyword Filter',
      outcome: 'High-Precision Information Retrieval',
    },
    keySections: [
      'The Limitations of Pure Cosine Similarity in Technical Domains',
      'Benchmark Setup: 1.2M Corpus & Query Distributions',
      'Reciprocal Rank Fusion (RRF) Implementation',
      'P99 Latency vs Recall Trade-Off Analysis',
      'Production Deployment Architecture & Hardware Sizing',
    ],
  },
  {
    id: 'llm-context-caching-benchmarks',
    slug: 'llm-context-caching-benchmarks',
    title: 'KV-Cache Retention & Prompt Stability in Multi-Agent Runtime Systems',
    subtitle: 'Measuring TTFT Reduction and Token Cost Amortization in Multi-Turn Reasoning Contexts',
    excerpt:
      'An empirical study evaluating KV-cache hit rates, prefix prompt stability, and speculative token decoding across high-concurrency multi-agent runtimes serving parallel reasoning sessions.',
    category: 'research',
    badge: 'EXPERIMENT',
    disciplineId: 'ai-intelligent-systems',
    disciplineName: 'AI & Intelligent Systems',
    techCategoryId: 'ai-agents',
    techCategoryLabel: 'AI & Agents',
    serviceId: 'genai-ml',
    serviceName: 'Generative AI & ML',
    date: 'Jun 2026',
    readTime: '12 min read',
    author: 'KAIROTRIX ENGINEERING',
    authorRole: 'LLM Runtime & Inference',
    tags: ['KV Caching', 'Speculative Decoding', 'Inference Optimization', 'Cost Amortization'],
    videoSrc: '/assets/videos/ai-service.mp4',
    image: '/assets/images/service/SERVICE01.png',
    keyTakeaway:
      'Static system prompt prefix isolation substantially improved KV-cache hit rates, reducing time-to-first-token (TTFT) across multi-turn trajectories.',
    empiricalMetric: {
      label: 'Response Latency',
      value: 'Accelerated TTFT',
    },
    architectureEquation: {
      left: 'Deterministic Static Prompt Prefixes',
      operator: '+',
      right: 'KV-Cache Memory Layer',
      outcome: 'Amortized Token Cost Reduction',
    },
    keySections: [
      'The Cost Equation of Multi-Turn Agent Trajectories',
      'Prefix Caching Mechanics & Cache-Eviction Hazards',
      'Speculative Decoding Performance Benchmarks',
      'Production Cost Amortization across 100k Runs',
      'Actionable Architectural Guidelines for LLM Systems',
    ],
  },
];
