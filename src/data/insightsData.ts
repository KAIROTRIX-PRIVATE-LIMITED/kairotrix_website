export type InsightCategory = 'all' | 'blueprint' | 'case-study' | 'article' | 'research';

export type InsightBadge =
  | 'SYSTEM BLUEPRINT'
  | 'CASE STUDY'
  | 'TECHNICAL DEEP DIVE'
  | 'RESEARCH'
  | 'PERSPECTIVE';

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
    date: 'Sep 2026',
    readTime: '8 min read',
    author: 'KAIROTRIX Systems Architecture Lab',
    authorRole: 'Core Systems & Agent Runtime',
    tags: ['Autonomous Agents', 'Schema Contracts', 'Tool-Use Guardrails', 'State Machines'],
    featured: true,
    videoSrc: '/assets/videos/183108-870151713_medium.mp4',
    image: '/images/solutions/hero-3d.png',
    keyTakeaway:
      'Strict Pydantic JSON schemas and state machine checkpoints eliminate 99.4% of stochastic agent drifts before external execution.',
    empiricalMetric: {
      label: 'Agent Drift Rate',
      value: '< 0.06%',
    },
    architectureEquation: {
      left: 'Formal JSON Schema Contracts',
      operator: '+',
      right: 'Deterministic State Machine FSM',
      outcome: 'Zero-Hallucination Enterprise Action Runtime',
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
    title: 'Zero-Loss Event-Driven Automation Bridge: Idempotent Webhook Architecture',
    subtitle: 'Guaranteed Exactly-Once Processing Across Heterogeneous SaaS & Cloud Platforms',
    excerpt:
      'A deep architectural specification on designing fault-tolerant webhook ingestion pipelines featuring cryptographic payload validation, distributed Redis locks, and exponential backoff retry buffers.',
    category: 'blueprint',
    badge: 'SYSTEM BLUEPRINT',
    disciplineId: 'automation-digital-operations',
    disciplineName: 'Automation & Operations',
    date: 'Aug 2026',
    readTime: '10 min read',
    author: 'KAIROTRIX Infrastructure Engineering',
    authorRole: 'Distributed Systems & Integrations',
    tags: ['Webhook Ingestion', 'Redis Locks', 'Dead-Letter Queues', 'Event Sourcing'],
    videoSrc: '/assets/videos/System_automating_tasks_and_data_202609041239.mp4',
    image: '/images/solutions/hero-3d.png',
    keyTakeaway:
      'Idempotency keys paired with dead-letter queue buffering prevent duplicate executions during upstream third-party API outages.',
    empiricalMetric: {
      label: 'Event Loss Ratio',
      value: '0.00%',
    },
    architectureEquation: {
      left: 'HMAC Webhook Ingestion',
      operator: '+',
      right: 'Distributed Redis Mutex Queue',
      outcome: 'Idempotent Exactly-Once Delivery',
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
      'The architectural journey from manual, formula-corrupted spreadsheets into an event-driven automation engine connecting logistics, ERP, and executive dashboards with zero downtime.',
    category: 'case-study',
    badge: 'CASE STUDY',
    disciplineId: 'digital-transformation',
    disciplineName: 'Digital Transformation',
    date: 'Jul 2026',
    readTime: '9 min read',
    author: 'KAIROTRIX Engineering',
    authorRole: 'Platform Engineering Lead',
    tags: ['Digital Transformation', 'Event Driven', 'ERP Sync', 'Legacy Migration'],
    videoSrc: '/assets/videos/228908_medium.mp4',
    image: '/images/solutions/hero-3d.png',
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
    subtitle: 'Automating 10,000+ Monthly Invoices with Deterministic Audit Logging & Zero Data Leakage',
    excerpt:
      'A technical retrospective on building a multi-modal document extraction pipeline that parses unstructured PDF invoices into structured database records with automated human-in-the-loop escalation.',
    category: 'case-study',
    badge: 'CASE STUDY',
    disciplineId: 'technology-integration',
    disciplineName: 'Technology Integration',
    date: 'Jun 2026',
    readTime: '8 min read',
    author: 'KAIROTRIX Solutions Team',
    authorRole: 'Applied AI & Automation',
    tags: ['Document Extraction', 'Multi-Modal AI', 'Human-in-the-Loop', 'Accounting Sync'],
    videoSrc: '/assets/videos/20260906-1259-43.3976043.mp4',
    image: '/images/solutions/hero-3d.png',
    keyTakeaway:
      'Confidence-threshold routing automatically triggers manual review when character extraction confidence drops below 98.5%.',
    empiricalMetric: {
      label: 'Manual Review Redirection',
      value: '82% Reduction',
    },
    architectureEquation: {
      left: 'Vision-LLM OCR Extraction',
      operator: '+',
      right: 'Confidence-Scored Review Queue',
      outcome: 'Zero-Error Financial Record Ingestion',
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
    title: 'Engineering Sub-50ms Real-Time Event Telemetry with Next.js 15 & WebSockets',
    subtitle: 'High-Throughput Ingestion Pipelines and Zero-Reflow Client Canvas Rendering',
    excerpt:
      'How to ingest and render thousands of high-frequency events per second with memory-efficient client canvas pipelines and WebSocket event streams without blocking the main React render cycle.',
    category: 'article',
    badge: 'TECHNICAL DEEP DIVE',
    disciplineId: 'software-product-engineering',
    disciplineName: 'Software & Product Engineering',
    date: 'Aug 2026',
    readTime: '7 min read',
    author: 'KAIROTRIX Frontend Systems',
    authorRole: 'UI/UX & Performance Engineering',
    tags: ['Next.js 15', 'WebSockets', 'Canvas 2D', 'High Throughput'],
    videoSrc: '/assets/videos/20260905-1049-35.7483547.mp4',
    image: '/images/solutions/hero-3d.png',
    keyTakeaway:
      'Bypassing React state reconciliation for high-frequency chart streams via direct offscreen Canvas 2D buffers maintains a constant 60 FPS.',
    empiricalMetric: {
      label: 'Rendering Frame Rate',
      value: 'Solid 60 FPS',
    },
    architectureEquation: {
      left: 'Raw WebSocket Binary Framing',
      operator: '+',
      right: 'Offscreen Canvas Buffer Rendering',
      outcome: 'Zero React DOM Reflow Jitter',
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
    badge: 'PERSPECTIVE',
    disciplineId: 'software-product-engineering',
    disciplineName: 'Software & Product Engineering',
    date: 'Aug 2026',
    readTime: '6 min read',
    author: 'KAIROTRIX Strategy & Architecture',
    authorRole: 'Chief Technology Partner',
    tags: ['Software Strategy', 'TCO Analysis', 'Custom Software', 'ROI Architecture'],
    videoSrc: '/assets/videos/203987-923133879_medium.mp4',
    image: '/images/solutions/hero-3d.png',
    keyTakeaway:
      'Bespoke systems pay for themselves within 14–18 months by eliminating recurring seat licenses and custom integration maintenance fees.',
    empiricalMetric: {
      label: '5-Year TCO Savings',
      value: '42%–68%',
    },
    architectureEquation: {
      left: 'Zero Recurring Seat Penalties',
      operator: '+',
      right: '100% Owned Custom Architecture',
      outcome: 'Uncapped Enterprise Valuation Lift',
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
    title: 'Empirical Benchmarks: Hybrid Dense+Sparse Retrieval vs Pure Vector Search in Production RAG',
    subtitle: 'Comparing Recall@10, P99 Query Latency, and Ingestion Overhead Across 1.2M Technical Chunks',
    excerpt:
      'We benchmarked BM25 keyword matching combined with dense vector embeddings across 1.2 million technical engineering documentation chunks to evaluate retrieval precision, recall, and infrastructure costs.',
    category: 'research',
    badge: 'RESEARCH',
    disciplineId: 'data-business-intelligence',
    disciplineName: 'Data & BI',
    date: 'Jul 2026',
    readTime: '11 min read',
    author: 'KAIROTRIX Applied AI Lab',
    authorRole: 'Information Retrieval & Data Science',
    tags: ['Hybrid Search', 'Dense Vector Embeddings', 'BM25', 'RAG Benchmarks'],
    videoSrc: '/assets/videos/327171_medium.mp4',
    image: '/images/solutions/hero-3d.png',
    keyTakeaway:
      'Reciprocal Rank Fusion (RRF) combining dense cosine distance and sparse BM25 scores lifted domain-specific retrieval recall from 78.4% to 94.2%.',
    empiricalMetric: {
      label: 'Domain Recall@10',
      value: '94.2%',
    },
    architectureEquation: {
      left: 'Dense Semantic Vector Search',
      operator: '+',
      right: 'Sparse BM25 Keyword Filter',
      outcome: 'Sub-30ms Precision Information Retrieval',
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
    title: 'KV-Cache Retention & Speculative Decoding in High-Concurrency Agent Runtime Systems',
    subtitle: 'Measuring TTFT Reduction and Token Cost Amortization in Multi-Turn Multi-Agent Contexts',
    excerpt:
      'An empirical whitepaper evaluating KV-cache hit rates, prefix prompt stability, and speculative token decoding across high-concurrency multi-agent runtimes serving thousands of parallel reasoning sessions.',
    category: 'research',
    badge: 'RESEARCH',
    disciplineId: 'ai-intelligent-systems',
    disciplineName: 'AI & Intelligent Systems',
    date: 'Jun 2026',
    readTime: '12 min read',
    author: 'KAIROTRIX Systems Architecture Lab',
    authorRole: 'LLM Runtime & Inference',
    tags: ['KV Caching', 'Speculative Decoding', 'Inference Optimization', 'Cost Amortization'],
    videoSrc: '/assets/videos/20260906-0716-14.5324161.mp4',
    image: '/images/solutions/hero-3d.png',
    keyTakeaway:
      'Static system prompt prefix isolation unlocked a 76% KV-cache hit rate, reducing time-to-first-token (TTFT) by 3.8x.',
    empiricalMetric: {
      label: 'TTFT Improvement',
      value: '3.8x Faster',
    },
    architectureEquation: {
      left: 'Deterministic Static Prompt Prefixes',
      operator: '+',
      right: 'KV-Cache Memory Layer',
      outcome: '76% Amortized Token Cost Reduction',
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
