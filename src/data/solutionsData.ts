// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX — Solutions & Services Master Data Model
// Single source of truth for all 6 Core Technology Disciplines (L2 Pages)
// ─────────────────────────────────────────────────────────────────────────────

export interface SubService {
  name: string;
  scope: string;
  deliverables: string[];
  tags: string[];
}

export interface SubCategory {
  id: string;
  slug?: string;
  anchorId: string; // e.g. 'ai-apps', 'ai-agents' matching Navbar.tsx
  number: string;
  title: string;
  summary: string;
  image: string;
  services: SubService[];
  // Capability Explorer enhancements
  philosophy?: string;
  systemsEquation?: {
    inputs: string[];
    output: string;
    rationale: string;
  };
  engagementLifecycle?: string[];
  // Selective L3 Flagship properties (activated when enableSeoPage is true)
  enableSeoPage?: boolean;
  editorialSubtitle?: string;
  tagline?: string;
  heroHeadline?: {
    prefix: string;
    accent: string;
    suffix: string;
  };
  problemStatement?: {
    eyebrow: string;
    headline: string;
    painPoints: { title: string; desc: string }[];
    solutionSummary: string;
    architectureAdvantage: string;
  };
  architectureLayers?: {
    step: string;
    title: string;
    role: string;
    description: string;
    technologies: string[];
  }[];
  useCases?: {
    title: string;
    domain: string;
    metric: string;
    problem: string;
    solution: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface BusinessImpactPillar {
  metric: string;
  label: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  name: string;
  iconType: 'search' | 'cube' | 'lightbulb' | 'check';
  description: string;
}

export interface ExpertiseCard {
  title: string;
  stat: string;
  category: string;
  description: string;
  image: string;
  href: string;
}

export interface FeaturedProject {
  title: string;
  category: string;
  metric: string;
  year: string;
  image: string;
  href: string;
}

export interface SolutionDetail {
  slug: string;
  number: string;
  title: string;
  displayHeadline: {
    prefix: string;
    accent: string;
    suffix: string;
  };
  editorialHeadline: string;
  categoryTag: string;
  subtitle: string;
  executiveSummary: string;
  image: string;
  heroVideo?: string;
  statusBadge: string;
  telemetry: {
    sla: string;
    engine: string;
    latency: string;
    concurrency: string;
  };
  marqueeItems: string[];
  editorialSplit: {
    badge: string;
    headline: string;
    lead: string;
    statNumber: string;
    statLabel: string;
    problemSolved: string;
    strategicAdvantage: string;
  };
  systemsEquation?: {
    inputs: string[];
    output: string;
    rationale: string;
  };
  subCategories: SubCategory[];
  expertiseCards: ExpertiseCard[];
  processSteps: ProcessStep[];
  featuredProjects: FeaturedProject[];
  techStack: {
    category: string;
    items: { name: string; role: string }[];
  }[];
  ctaHeadline: string;
  ctaDescription: string;
  prevSlug: string;
  nextSlug: string;
}

export const SOLUTIONS_DATA: Record<string, SolutionDetail> = {
  'ai-intelligent-systems': {
    slug: 'ai-intelligent-systems',
    number: '01',
    title: 'AI & Intelligent Systems',
    displayHeadline: {
      prefix: 'WHERE ARCHITECTURE MEETS',
      accent: 'AUTONOMOUS',
      suffix: 'INTELLIGENCE.',
    },
    editorialHeadline: 'Where Intelligence Meets Execution',
    categoryTag: 'Autonomous Systems & Machine Intelligence',
    subtitle: 'Build AI-powered applications, intelligent agents, machine learning systems, and knowledge tools that help businesses automate work, use information, and make better decisions.',
    executiveSummary:
      'We engineer deterministic autonomous agents, custom fine-tuned LLMs, and high-precision enterprise RAG pipelines that bridge proprietary company knowledge directly into frontline business workflows.',
    image: '/assets/images/service/SERVICE01.png',
    heroVideo: '/assets/videos/ai-service.mp4',
    statusBadge: 'Production Ready',
    telemetry: {
      sla: '99.98% Tool Execution SLA',
      engine: 'Multi-Agent Swarm Runtime',
      latency: '< 180ms TTFT (Streaming)',
      concurrency: '4,000+ Concurrent Agent Loops',
    },
    marqueeItems: [
      '99.98% TOOL EXECUTION SLA',
      'SUB-180MS RETRIEVAL LATENCY',
      'ZERO DATA RETENTION ARCHITECTURE',
      '4,000+ CONCURRENT AGENT LOOPS',
      '100% PROPRIETARY IP OWNERSHIP',
      'DETERMINISTIC GUARDRAILS ENFORCED',
    ],
    editorialSplit: {
      badge: 'STRATEGIC FOUNDATION',
      headline: 'ENGINEERING DETERMINISTIC SYSTEMS WITH PURPOSE',
      lead: 'We offer an exhaustive suite of autonomous intelligence and neural knowledge pipelines tailored to eliminate manual bottlenecks and accelerate operational velocity.',
      statNumber: '85%',
      statLabel: 'Manual Triage Reduction Across Frontline Operations',
      problemSolved:
        'Eliminates manual document analysis, human routing delays in sales and support, and fragmented tribal knowledge trapped in siloed legacy repositories.',
      strategicAdvantage:
        'Your enterprise gains 24/7 autonomous agents that execute verified multi-step business logic with complete auditable guardrails and zero hallucination risk.',
    },
    subCategories: [
      {
        id: 'ai-apps',
        slug: 'ai-application-development',
        anchorId: 'ai-apps',
        number: '01.1',
        title: 'AI Application Development',
        summary: 'Full-stack enterprise applications powered by intelligent reasoning layers, semantic search, and streaming UX.',
        image: '/assets/images/service/SERVICE01.png',
        services: [
          {
            name: 'AI-Powered Applications',
            scope: 'Full-stack enterprise applications built around multimodal foundation models with real-time streaming interfaces.',
            deliverables: ['Full-stack Next.js/Python architecture', 'Streaming UI/UX primitives', 'Role-based access & audit log engine'],
            tags: ['Next.js 15', 'FastAPI', 'Vercel AI SDK', 'PostgreSQL'],
          },
          {
            name: 'Custom AI Applications',
            scope: 'Bespoke operational tools designed specifically around your domain-specific taxonomy, terminology, and workflows.',
            deliverables: ['Domain prompt pipelines', 'Multi-tenant database schema', 'Custom evaluation harness'],
            tags: ['Python', 'LangChain', 'Docker', 'Tailwind CSS'],
          },
          {
            name: 'LLM-Powered Applications',
            scope: 'Deep integration of state-of-the-art models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro) with structured JSON output enforcement.',
            deliverables: ['Pydantic/Zod schema validators', 'Fallback model cascade router', 'Cost & latency telemetry dashboards'],
            tags: ['OpenAI', 'Anthropic', 'Gemini', 'LiteLLM'],
          },
          {
            name: 'AI Feature Development',
            scope: 'Retrofitting intelligent features (smart summaries, automated tagging, semantic autocomplete) into existing production web apps.',
            deliverables: ['Microservice API endpoints', 'Async background queue workers', 'Non-blocking UI integrations'],
            tags: ['Redis', 'BullMQ', 'REST/gRPC', 'Webhooks'],
          },
        ],
      },
      {
        id: 'ai-agents',
        slug: 'ai-agent-development',
        anchorId: 'ai-agents',
        number: '01.2',
        title: 'AI Agent Development',
        summary: 'Autonomous multi-agent architectures that plan, inspect intermediate results, self-correct, and execute external APIs.',
        image: '/assets/images/service/SERVICE01.png',
        enableSeoPage: false,
        tagline: 'Autonomous Systems That Reason, Plan, and Execute Mission-Critical Workflows.',
        editorialSubtitle:
          'Autonomous multi-agent architectures engineered with LangGraph, deterministic JSON guardrails, transactional state machines, and human-in-the-loop governance.',
        heroHeadline: {
          prefix: 'DETERMINISTIC',
          accent: 'MULTI-AGENT',
          suffix: 'SYSTEMS.',
        },
        problemStatement: {
          eyebrow: '01 // OPERATIONAL BOTTLENECK',
          headline: 'WHY UNCONSTRAINED PROMPTS FAIL IN PRODUCTION',
          painPoints: [
            {
              title: 'Hallucination & Non-Determinism',
              desc: 'Single-prompt LLMs produce unpredictable schema outputs and drift when handling complex multi-step corporate workflows.',
            },
            {
              title: 'Siloed Tools & Brittle Integrations',
              desc: 'Traditional chatbot wrappers cannot coordinate across CRM, ERP, and payment databases without cascading errors and timeouts.',
            },
            {
              title: 'Absence of State & Human Oversight',
              desc: 'Most AI systems lack stateful rollback recovery and permission gates when high-stakes financial, client, or database actions occur.',
            },
          ],
          solutionSummary:
            'We build stateful LangGraph-orchestrated multi-agent swarms with strict JSON schema guardrails, transactional rollback recovery, and deterministic API execution.',
          architectureAdvantage:
            'Your enterprise operates 24/7 autonomous worker agents that execute verified multi-step business logic, reducing human triage latency by up to 85%.',
        },
        architectureLayers: [
          {
            step: 'LAYER 01',
            title: 'Perception & Intent Router',
            role: 'Input Validation & Guardrails',
            description: 'Classifies user intent, sanitizes prompt injection vectors, and extracts typed parameters with Pydantic/Zod schemas.',
            technologies: ['FastAPI', 'Pydantic', 'NeMo Guardrails'],
          },
          {
            step: 'LAYER 02',
            title: 'Graph-Based Supervisor',
            role: 'Task Decomposition & Planning',
            description: 'Breaks complex business directives into deterministic subtasks and assigns them across specialized worker agents.',
            technologies: ['LangGraph', 'Temporal', 'Redis'],
          },
          {
            step: 'LAYER 03',
            title: 'Tool Execution & API Integration',
            role: 'Secure Mutation & Query',
            description: 'Executes authenticated read/write operations against CRM, SQL databases, Stripe, and internal ERPs with transaction safety.',
            technologies: ['gRPC', 'PostgreSQL', 'Stripe API', 'HubSpot'],
          },
          {
            step: 'LAYER 04',
            title: 'Evaluation & Human-in-the-Loop',
            role: 'Confidence Scoring & Escalation',
            description: 'Evaluates output confidence scores; if ambiguous, safely escalates to human agents with full state context intact.',
            technologies: ['LangSmith', 'OpenTelemetry', 'WebSockets'],
          },
        ],
        useCases: [
          {
            title: 'Autonomous Tier-1 Customer Support & Remediation',
            domain: 'B2B SaaS & E-Commerce',
            metric: '78% First-Contact Resolution',
            problem: 'Support teams overwhelmed by repetitive order lookups, billing inquiries, and subscription changes.',
            solution: 'Multi-agent system authenticates users, verifies account standing in Postgres, executes Stripe refunds under policy limits, and logs tickets in Zendesk.',
          },
          {
            title: 'High-Intent Inbound Sales Qualification & Booking',
            domain: 'Enterprise B2B',
            metric: '3.4x Lead-to-Meeting Conversion',
            problem: 'Inbound demo requests sit for hours in CRM before sales reps review criteria.',
            solution: 'Agentic bot engages prospects in real time, validates tech-stack fit and budget against ICP criteria, and books discovery calls into calendar directly.',
          },
          {
            title: 'Back-Office ERP Reconciliation & Invoice Triage',
            domain: 'Logistics & Supply Chain',
            metric: '90% Processing Time Reduction',
            problem: 'Manual matching of bills of lading, purchase orders, and warehouse inventory records.',
            solution: 'Autonomous worker reads PDF documents, cross-checks ERP line items, detects discrepancies, and prepares verified journal entries.',
          },
        ],
        faqs: [
          {
            question: 'How do you prevent agents from hallucinating or making unauthorized API calls?',
            answer: 'We never allow raw LLMs direct execution access. Every agent operates within a LangGraph state machine where tool calls must conform to strict Pydantic/Zod schemas, and any high-risk action requires policy verification or human-in-the-loop signoff.',
          },
          {
            question: 'Can the agents integrate with our legacy or on-premise databases?',
            answer: 'Yes. We build custom API connectors and secure webhook bridges running in Docker containers inside your private VPC or cloud perimeter with zero external data retention.',
          },
          {
            question: 'What is the typical timeline for an enterprise AI agent deployment?',
            answer: 'A focused production agent MVP (e.g. support triage or CRM copilot) typically takes 3 to 4 weeks from architecture design to live production deployment with observability.',
          },
          {
            question: 'Do we own the intellectual property and code?',
            answer: '100%. All custom prompt graphs, evaluation test suites, API connectors, and model adapters belong entirely to your enterprise.',
          },
        ],
        services: [
          {
            name: 'Customer Support Agents',
            scope: 'Multi-turn resolution agents that authenticate customers, query ticket history, execute CRM mutations, and escalate with full context.',
            deliverables: ['CRM bidirectional connectors', 'Sentiment & urgency escalation triggers', 'Conversation audit trail'],
            tags: ['LangGraph', 'HubSpot / Zendesk API', 'WebSockets', 'Pinecone'],
          },
          {
            name: 'Sales & Lead Generation Agents',
            scope: 'Interactive qualifying bots that score inbound prospects, extract qualification criteria, and schedule high-intent discovery calls.',
            deliverables: ['Real-time calendar scheduling integrations', 'Lead qualification scoring matrix', 'CRM deal creation pipeline'],
            tags: ['Cal.com API', 'Stripe', 'Supabase', 'Node.js'],
          },
          {
            name: 'Internal Business Agents',
            scope: 'Back-office copilots that read ERP records, compile cross-department reports, trigger invoices, and verify compliance.',
            deliverables: ['Internal tool permission matrix', 'Automated reconciliation scripts', 'Slack/Teams operational bots'],
            tags: ['Slack SDK', 'Python', 'FastAPI', 'PostgreSQL'],
          },
          {
            name: 'Agentic Multi-Agent Systems',
            scope: 'Hierarchical orchestrations where a supervisor agent distributes tasks across specialized planner, coder, and reviewer subagents.',
            deliverables: ['Graph-based state machine', 'Distributed agent memory buffer', 'Human-in-the-loop review interface'],
            tags: ['LangGraph', 'AutoGen', 'Redis', 'Temporal'],
          },
        ],
      },
      {
        id: 'genai-ml',
        slug: 'genai-machine-learning',
        anchorId: 'genai-ml',
        number: '01.3',
        title: 'AI / ML Development & Fine-Tuning',
        summary: 'Specialized machine learning pipelines, LoRA parameter-efficient fine-tuning, and deterministic classification models.',
        image: '/assets/images/service/SERVICE01.png',
        services: [
          {
            name: 'Generative AI Engineering',
            scope: 'Multimodal content generation, structural document synthesizers, and contextual translation pipelines.',
            deliverables: ['Structured generation pipelines', 'Automated red-teaming benchmarks', 'Cost-optimized token caches'],
            tags: ['Claude 3.5', 'GPT-4o', 'Promptfoo', 'AWS Bedrock'],
          },
          {
            name: 'Machine Learning Models',
            scope: 'Custom regression, anomaly detection, and classification models trained on proprietary structured time-series and tabular data.',
            deliverables: ['Feature engineering notebooks', 'Serialized ONNX model artifacts', 'Real-time inference API endpoints'],
            tags: ['PyTorch', 'Scikit-Learn', 'XGBoost', 'ONNX'],
          },
          {
            name: 'Model Fine-Tuning (LoRA/QLoRA)',
            scope: 'Adapting open-weights models (Llama 3.3, Mistral NeMo) to private enterprise vocabularies and specific stylistic formats.',
            deliverables: ['Curated instruction dataset splits', 'Quantized weights deployment artifacts', 'Evaluation benchmark reports'],
            tags: ['Hugging Face', 'Unsloth', 'vLLM', 'RunPod'],
          },
          {
            name: 'Model Evaluation & Observability',
            scope: 'Continuous automated evaluation tracking hallucination rates, semantic drift, latency distribution, and cost per inference.',
            deliverables: ['LangSmith / Arize Phoenix integration', 'Automated regression test suites', 'Alerting webhooks'],
            tags: ['LangSmith', 'OpenTelemetry', 'Prometheus', 'Grafana'],
          },
        ],
      },
      {
        id: 'knowledge-systems',
        slug: 'enterprise-rag-knowledge-systems',
        anchorId: 'knowledge-systems',
        number: '01.4',
        title: 'AI Knowledge Systems & Enterprise RAG',
        summary: 'Hybrid search engines that index PDFs, databases, Slack channels, and codebases to deliver hallucination-free factual answers.',
        image: '/assets/images/service/SERVICE01.png',
        services: [
          {
            name: 'Enterprise RAG Systems',
            scope: 'Production-grade retrieval augmented generation featuring semantic chunking, re-ranking, and dynamic context compression.',
            deliverables: ['Hybrid dense/sparse vector index', 'Cohere / FlashRank re-ranking layer', 'Source citation streaming UI'],
            tags: ['Pinecone', 'Qdrant', 'Cohere Rerank', 'pgvector'],
          },
          {
            name: 'Knowledge Base Development',
            scope: 'Centralized enterprise neural search engines connecting Notion, Google Drive, Jira, and internal relational databases.',
            deliverables: ['Continuous webhook sync ingesters', 'Metadata-filtered vector stores', 'Permission-aware retrieval ACLs'],
            tags: ['Unstructured.io', 'LangChain', 'PostgreSQL', 'FastAPI'],
          },
          {
            name: 'Document Intelligence Pipelines',
            scope: 'Optical character recognition (OCR) and layout-aware parser pipelines that extract structured tables and forms from complex PDFs.',
            deliverables: ['LayoutLM / OCR extraction workers', 'Schema validation pipelines', 'Zero-shot table parsers'],
            tags: ['Tesseract', 'AWS Textract', 'Pydantic', 'Python'],
          },
          {
            name: 'Enterprise AI Assistants',
            scope: 'Private employee productivity assistants equipped with company policy grounding, single sign-on (SSO), and role-based ACLs.',
            deliverables: ['SAML/OAuth2 authentication layer', 'Departmental memory partitions', 'Strict administrative control console'],
            tags: ['Next.js 15', 'Auth0', 'FastAPI', 'Docker'],
          },
        ],
      },
    ],
    expertiseCards: [
      {
        title: 'AUTONOMOUS MULTI-AGENT SWARMS',
        stat: '4,000+ Concurrent Loops',
        category: 'AUTONOMOUS AGENTS',
        description: 'Hierarchical multi-agent networks automating complex customer qualification, API mutations, and context handoff with zero human latency.',
        image: '/assets/images/service/SERVICE01.png',
        href: '#ai-agents',
      },
      {
        title: 'ENTERPRISE NEURAL RAG ENGINES',
        stat: '< 180ms TTFT Latency',
        category: 'KNOWLEDGE SYSTEMS',
        description: 'Sub-second hybrid vector search across millions of private enterprise documents with Cohere cross-encoder re-ranking.',
        image: '/assets/images/service/SERVICE01.png',
        href: '#knowledge-systems',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'DISCOVERY & AUDIT',
        iconType: 'search',
        description: 'We audit your business logic, taxonomy, data boundaries, and API topology to select optimal foundation models.',
      },
      {
        step: '02',
        name: 'ARCHITECTURE & PROTOTYPE',
        iconType: 'cube',
        description: 'Engineering the cyclical agent graph, schema-validated tool definitions, and synthetic edge-case harnesses.',
      },
      {
        step: '03',
        name: 'PRODUCTION HARDENING',
        iconType: 'lightbulb',
        description: 'Deploying high-throughput inference runtimes, streaming WebSocket interfaces, and private VPC security.',
      },
      {
        step: '04',
        name: 'TELEMETRY & EVOLUTION',
        iconType: 'check',
        description: 'Active monitoring of production traces, feedback loops, cost optimization, and periodic model checkpoint updates.',
      },
    ],
    featuredProjects: [
      {
        title: 'AUTONOMOUS MULTIMODAL AGENTIC SWARM',
        category: 'AI & MULTI-AGENT SYSTEMS',
        metric: '99.98% SLA',
        year: 'ENTERPRISE PRODUCTION, 2026',
        image: '/assets/images/service/SERVICE01.png',
        href: '/work/ai-agentic-swarm',
      },
      {
        title: 'ENTERPRISE NEURAL KNOWLEDGE ENGINE',
        category: 'ENTERPRISE RAG & VECTORS',
        metric: '< 180ms TTFT',
        year: 'GLOBAL KNOWLEDGE BASE, 2026',
        image: '/assets/images/service/SERVICE01.png',
        href: '/work/enterprise-rag-engine',
      },
      {
        title: 'FINANCIAL ANOMALY AI SURVEILLANCE',
        category: 'DECISION ML & TIME-SERIES',
        metric: '10M+ Rows / Sec',
        year: 'FINANCIAL RISK PLATFORM, 2026',
        image: '/assets/images/service/SERVICE01.png',
        href: '/work/financial-anomaly-surveillance',
      },
    ],
    techStack: [
      {
        category: 'Foundation Models & Inference',
        items: [
          { name: 'Claude 3.5 Sonnet', role: 'Complex reasoning & code generation' },
          { name: 'OpenAI GPT-4o', role: 'Multimodal structured execution' },
          { name: 'Llama 3.3 70B', role: 'Sovereign on-premise inference' },
          { name: 'vLLM', role: 'High-throughput PagedAttention server' },
        ],
      },
      {
        category: 'Agent & Orchestration Frameworks',
        items: [
          { name: 'LangGraph', role: 'Stateful multi-agent cyclical graphs' },
          { name: 'Vercel AI SDK', role: 'Streaming UI & reactive client state' },
          { name: 'Temporal', role: 'Durable long-running workflow orchestration' },
          { name: 'FastAPI', role: 'Asynchronous high-concurrency microservices' },
        ],
      },
      {
        category: 'Vector Databases & Retrieval',
        items: [
          { name: 'Qdrant', role: 'High-performance Rust vector engine' },
          { name: 'Pinecone', role: 'Managed serverless vector search' },
          { name: 'pgvector', role: 'PostgreSQL relational + semantic storage' },
          { name: 'Cohere Rerank', role: 'Cross-encoder relevance re-ranking' },
        ],
      },
      {
        category: 'Observability & Safety',
        items: [
          { name: 'LangSmith', role: 'Trace analysis & prompt debugging' },
          { name: 'Arize Phoenix', role: 'Embedding drift & hallucination detection' },
          { name: 'OpenTelemetry', role: 'Distributed transaction traces' },
          { name: 'Guardrails AI', role: 'Structural output & PII sanitization' },
        ],
      },
    ],
    ctaHeadline: 'Ready to architect your enterprise AI infrastructure?',
    ctaDescription:
      'Book a direct technical architecture consultation with our engineering team. We analyze your operational workflows and build a deterministic prototype in weeks.',
    prevSlug: 'technology-integration',
    nextSlug: 'software-product-engineering',
  },

  'software-product-engineering': {
    slug: 'software-product-engineering',
    number: '02',
    title: 'Software & Product Engineering',
    displayHeadline: {
      prefix: 'WHERE ARCHITECTURE MEETS',
      accent: 'DIGITAL',
      suffix: 'PLATFORMS.',
    },
    editorialHeadline: 'Where Engineering Meets Velocity',
    categoryTag: 'Digital Platforms & Engineering Architecture',
    subtitle: 'Design and build custom business software, web applications, SaaS platforms, and digital products—from the first idea and MVP to ongoing development and improvement.',
    executiveSummary:
      'We design, engineer, and scale full-stack digital platforms and distributed backend microservices purpose-built for enterprise concurrency, sub-20ms latency, and 100% proprietary code ownership.',
    image: '/assets/images/service/SERVICE02.png',
    heroVideo: '/assets/videos/software-service.mp4',
    statusBadge: 'Sub-20ms Latency',
    telemetry: {
      sla: '99.99% Production Uptime',
      engine: 'Distributed Next.js & Go/Node Services',
      latency: 'P99 Latency < 16ms',
      concurrency: '50,000+ Concurrent WebSockets',
    },
    marqueeItems: [
      'P99 LATENCY < 16MS',
      '99.99% PLATFORM AVAILABILITY',
      '100% PROPRIETARY IP OWNERSHIP',
      '50,000+ CONCURRENT WEBSOCKETS',
      'DISTRIBUTED GO & NODE MICROSERVICES',
      'ZERO THIRD-PARTY LOCK-IN',
    ],
    editorialSplit: {
      badge: 'BUSINESS & OPERATIONAL IMPACT',
      headline: 'SOFTWARE ENGINEERED AROUND YOUR BUSINESS, NOT A TEMPLATE',
      lead: 'We design and build bespoke digital software engines that eliminate manual bottlenecks, integrate fragmented tooling, and give you complete, unencumbered software ownership.',
      statNumber: '10x',
      statLabel: 'Operational Concurrency Headroom Delivered on Scaled Clusters',
      problemSolved:
        'Eliminates off-the-shelf software compromises, brittle integrations, sluggish page load bottlenecks, and recurring subscription costs that scale against you.',
      strategicAdvantage:
        'Your business owns clean, modular, fully typed source code engineered to effortlessly support 10x scale while running with verified sub-20ms speed and 99.99% uptime.',
    },
    systemsEquation: {
      inputs: [
        'Custom Software Engine',
        'Distributed Microservices',
        'Database Architecture',
        'Cloud Infrastructure & DevOps',
      ],
      output: 'High-Scale Digital Platform',
      rationale:
        'KAIROTRIX engineers complete digital platforms where modular business logic, optimized databases, and resilient cloud infrastructure operate as a unified, deterministic system.',
    },
    subCategories: [
      {
        id: 'custom-software',
        anchorId: 'custom-software',
        number: '02.1',
        title: 'Custom Software Development',
        summary: 'Tailor-made enterprise applications engineered to solve exact operational workflows without compromise.',
        philosophy: 'We design and build software around your business—not around a template.',
        engagementLifecycle: ['Business & Technical Discovery', 'Domain Architecture & Schema', 'Sprint-Based Engineering', 'Zero-Downtime Deployment'],
        image: '/assets/images/service/SERVICE02.png',
        services: [
          {
            name: 'Enterprise Business Systems',
            scope: 'Centralized operational software unifying inventory, scheduling, internal billing, and multi-tenant security.',
            deliverables: ['Relational domain model schema', 'Role-based access control (RBAC)', 'Comprehensive automated test coverage'],
            tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
          },
          {
            name: 'Distributed Microservices',
            scope: 'Decoupled, event-driven services that handle high-volume processing independently without system-wide bottlenecks.',
            deliverables: ['gRPC & REST service contracts', 'Kafka/RabbitMQ event buses', 'Containerized Kubernetes manifests'],
            tags: ['Go', 'gRPC', 'Kafka', 'Kubernetes'],
          },
          {
            name: 'Database Architecture & Tuning',
            scope: 'Designing optimized relational and document data stores with intelligent indexing, connection pooling, and replication.',
            deliverables: ['Schema migration scripts', 'Read-replica query routing', 'Sub-5ms query optimization audits'],
            tags: ['PostgreSQL', 'Redis', 'Prisma', 'ClickHouse'],
          },
          {
            name: 'Cloud Infrastructure & DevOps',
            scope: 'Infrastructure-as-Code (IaC) deployment pipelines on AWS/GCP with automated CI/CD and zero-downtime blue/green rollouts.',
            deliverables: ['Terraform IaC configurations', 'GitHub Actions CI/CD pipelines', 'Prometheus/Grafana monitoring'],
            tags: ['AWS', 'Terraform', 'Docker', 'GitHub Actions'],
          },
        ],
      },
      {
        id: 'web-apps',
        anchorId: 'web-apps',
        number: '02.2',
        title: 'Web Application Development',
        summary: 'High-performance web applications built on Next.js 15, React 19, and edge computing architectures.',
        philosophy: 'Blazing-fast, reactive web platforms engineered for seamless user adoption, zero lag, and mission-critical workflows.',
        engagementLifecycle: ['UX & Flow Discovery', 'Component Design System', 'Full-Stack Implementation', 'Edge Global Deployment'],
        image: '/assets/images/service/SERVICE02.png',
        services: [
          {
            name: 'Full-Stack Web Applications',
            scope: 'Server-rendered, lightning-fast web applications utilizing Next.js App Router, streaming server components, and optimistic UI.',
            deliverables: ['Next.js 15 App Router architecture', 'Server Actions & TanStack Query', 'Tailwind CSS design implementation'],
            tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
          },
          {
            name: 'Progressive Web Apps (PWA)',
            scope: 'Offline-capable, mobile-responsive web applications with service workers, local SQLite caching, and push notifications.',
            deliverables: ['Service worker caching strategies', 'Offline mutation sync queue', 'App-manifest asset suite'],
            tags: ['PWA', 'Workbox', 'IndexedDB', 'Web Push API'],
          },
          {
            name: 'Interactive Portals & Dashboards',
            scope: 'High-density business portals with complex tabular data, dynamic filtering, real-time WebSockets, and CSV/PDF export engines.',
            deliverables: ['Virtual scrolling data grids', 'Real-time WebSocket event layer', 'Role-partitioned data access'],
            tags: ['TanStack Table', 'Recharts', 'WebSockets', 'Tailwind CSS'],
          },
          {
            name: 'Single-Page Applications (SPA)',
            scope: 'Fluid client-side applications with complex multi-step state management, offline resilience, and dynamic route pre-fetching.',
            deliverables: ['Zustand/Jotai state stores', 'Optimistic UI mutations', 'End-to-end Playwright tests'],
            tags: ['React', 'Zustand', 'Vite', 'Playwright'],
          },
        ],
      },
      {
        id: 'product-dev',
        anchorId: 'product-dev',
        number: '02.3',
        title: 'Product Development & Engineering',
        summary: 'Taking software products from initial technical blueprint to scalable, revenue-generating SaaS platforms.',
        philosophy: 'From initial technical blueprint to revenue-generating SaaS—disciplined product engineering built to scale.',
        engagementLifecycle: ['Product Scope & Roadmap', 'Multi-Tenant Architecture', 'Core Feature Velocity', 'Go-To-Market Launch'],
        image: '/assets/images/service/SERVICE02.png',
        services: [
          {
            name: 'SaaS Platform Engineering',
            scope: 'Multi-tenant software-as-a-service architectures with automated tenant isolation, billing tiers, and team invitation flows.',
            deliverables: ['Stripe billing & subscription webhook engine', 'Row-Level Security (RLS) multi-tenancy', 'Audit logging system'],
            tags: ['Stripe', 'Supabase / Postgres RLS', 'Next.js', 'Resend'],
          },
          {
            name: 'Minimum Viable Product (MVP) Build',
            scope: 'Rapid, disciplined 4-to-6 week engineering sprints to build, validate, and launch functional commercial products.',
            deliverables: ['Production-ready MVP deployment', 'Telemetry & user onboarding tracking', 'Technical handoff documentation'],
            tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
          },
          {
            name: 'API Product Development',
            scope: 'Engineering developer-facing APIs with automated token metering, rate limiting, and interactive OpenAPI documentation.',
            deliverables: ['Rate-limiting Redis middleware', 'API key management portal', 'Interactive Swagger/Redoc specifications'],
            tags: ['Upstash Redis', 'OpenAPI / Swagger', 'FastAPI', 'Node.js'],
          },
          {
            name: 'Legacy Codebase Modernization',
            scope: 'Refactoring monolithic legacy applications into maintainable modern TypeScript services with zero system downtime.',
            deliverables: ['Strangler pattern migration roadmap', 'Automated regression test harness', 'Modern containerized infrastructure'],
            tags: ['TypeScript', 'Docker', 'Next.js', 'Jest/Vitest'],
          },
        ],
      },
      {
        id: 'product-design',
        anchorId: 'product-design',
        number: '02.4',
        title: 'Product Design & Design Systems',
        summary: 'Pixel-precise design systems, user journey wireframes, and design tokens that bridge design and production code.',
        philosophy: 'Design systems and accessible interfaces that eliminate user friction and bridge the gap between design and production code.',
        engagementLifecycle: ['User Journey Mapping', 'Design Token Architecture', 'Component Library Build', 'Design-to-Code Handoff'],
        image: '/assets/images/service/SERVICE02.png',
        services: [
          {
            name: 'Enterprise Design Systems',
            scope: 'Unified design token architectures, accessible component libraries, and interactive Storybook documentation.',
            deliverables: ['Figma token & component library', 'Accessible Radix UI / Tailwind implementation', 'Storybook documentation'],
            tags: ['Figma', 'Radix UI', 'Tailwind CSS', 'Storybook'],
          },
          {
            name: 'User Experience (UX) Architecture',
            scope: 'In-depth workflow mapping, user interview synthesis, wireframing, and usability testing for complex enterprise flows.',
            deliverables: ['Information architecture diagrams', 'Interactive Figma prototypes', 'Usability benchmark reports'],
            tags: ['Figma', 'Miro', 'UserTesting', 'Wireframing'],
          },
          {
            name: 'High-Fidelity Interface Design',
            scope: 'Modern, aesthetically stunning UI mockups designed with strong visual hierarchy, micro-interactions, and dark/light modes.',
            deliverables: ['Desktop and mobile design screens', 'Design handoff specifications', 'Interactive motion prototypes'],
            tags: ['Figma', 'Framer Motion', 'Tokens', 'UI Craft'],
          },
          {
            name: 'Design-to-Code Engineering',
            scope: 'Translating Figma design systems into pixel-perfect, accessible React and Tailwind CSS components ready for backend wiring.',
            deliverables: ['Strictly typed React component library', 'Responsive mobile-first layout wrappers', 'Full keyboard accessibility'],
            tags: ['React', 'TypeScript', 'Tailwind CSS v4', 'WCAG 2.2 AA'],
          },
        ],
      },
    ],
    expertiseCards: [
      {
        title: 'HIGH-CONCURRENCY DISTRIBUTED APIS',
        stat: 'P99 Latency < 16ms',
        category: 'DISTRIBUTED ARCHITECTURE',
        description: 'Ultra-low latency microservices engineered in Go and Node.js capable of supporting 50,000+ simultaneous WebSocket sessions.',
        image: '/assets/images/service/SERVICE02.png',
        href: '#custom-software',
      },
      {
        title: 'MULTI-TENANT SAAS PLATFORMS',
        stat: '99.99% Production Uptime',
        category: 'PRODUCT ENGINEERING',
        description: 'B2B SaaS architectures with automated tenant isolation, metered Stripe billing, and granular Row-Level Security.',
        image: '/assets/images/service/SERVICE02.png',
        href: '#product-dev',
      },
      {
        title: 'DATABASE ARCHITECTURE & TUNING',
        stat: '< 5ms Query Latency',
        category: 'DATA LAYER OPTIMIZATION',
        description: 'Advanced PostgreSQL indexing, connection pooling, and read-replica routing engineered for zero lock contention under high write loads.',
        image: '/assets/images/service/SERVICE02.png',
        href: '#custom-software',
      },
      {
        title: 'CLOUD INFRASTRUCTURE & DEVOPS',
        stat: '100% Blue/Green Rollouts',
        category: 'CLOUD & INFRASTRUCTURE',
        description: 'Terraform-managed multi-region infrastructure with automated rollbacks, zero production downtime, and comprehensive audit telemetry.',
        image: '/assets/images/service/SERVICE02.png',
        href: '#custom-software',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'TECHNICAL DISCOVERY',
        iconType: 'search',
        description: 'We define the database schema, API contracts, concurrency targets, and cloud infrastructure blueprint.',
      },
      {
        step: '02',
        name: 'SUBSYSTEM PROTOTYPING',
        iconType: 'cube',
        description: 'Building the core business logic, database migrations, authentication, and high-throughput background queues.',
      },
      {
        step: '03',
        name: 'FRONTEND ASSEMBLY',
        iconType: 'lightbulb',
        description: 'Integrating responsive Next.js frontend, micro-interactions, state management, and real-time WebSocket feeds.',
      },
      {
        step: '04',
        name: 'PRODUCTION CUTOVER',
        iconType: 'check',
        description: 'Executing zero-downtime blue/green deployment, load testing at 5x peak capacity, and 24/7 telemetry monitoring.',
      },
    ],
    featuredProjects: [
      {
        title: 'ULTRA-LOW LATENCY FINTECH TRADING PORTAL',
        category: 'PRODUCT ENGINEERING',
        metric: 'P99 < 16ms',
        year: 'FINANCIAL MARKETS, 2026',
        image: '/assets/images/service/SERVICE02.png',
        href: '/work/fintech-trading-portal',
      },
      {
        title: 'MULTI-TENANT B2B SAAS ENTERPRISE ENGINE',
        category: 'FULL-STACK ARCHITECTURE',
        metric: '99.99% Uptime',
        year: 'COMMERCIAL PLATFORM, 2026',
        image: '/assets/images/service/SERVICE02.png',
        href: '/work/saas-enterprise-engine',
      },
      {
        title: 'DISTRIBUTED CLOUD MICROSERVICES MESH',
        category: 'KUBERNETES & GO',
        metric: '50K+ WebSockets',
        year: 'HIGH-CONCURRENCY CLUSTER, 2026',
        image: '/assets/images/service/SERVICE02.png',
        href: '/work/cloud-microservices-mesh',
      },
    ],
    techStack: [
      {
        category: 'Frontend & UI Craft',
        items: [
          { name: 'Next.js 15 App Router', role: 'Server components & edge streaming' },
          { name: 'React 19', role: 'Concurrent rendering & optimistic actions' },
          { name: 'Tailwind CSS v4', role: 'Design token-driven styling' },
          { name: 'Framer Motion', role: 'Fluid physics-based micro-interactions' },
        ],
      },
      {
        category: 'Backend & Distributed Services',
        items: [
          { name: 'Node.js & TypeScript', role: 'Type-safe event-driven runtime' },
          { name: 'Go (Golang)', role: 'Ultra-low latency microservices' },
          { name: 'FastAPI', role: 'Async Python computational endpoints' },
          { name: 'gRPC & Protocol Buffers', role: 'High-speed binary inter-service RPC' },
        ],
      },
      {
        category: 'Data Stores & Caching',
        items: [
          { name: 'PostgreSQL', role: 'Primary relational ACID transaction engine' },
          { name: 'Redis', role: 'Distributed session cache & pub/sub message broker' },
          { name: 'ClickHouse', role: 'Ultra-fast analytical column store' },
          { name: 'Prisma / Drizzle', role: 'Type-safe relational database ORM' },
        ],
      },
      {
        category: 'Infrastructure & DevOps',
        items: [
          { name: 'Docker & Kubernetes', role: 'Container orchestration & autoscaling' },
          { name: 'AWS & GCP', role: 'Cloud infrastructure & managed services' },
          { name: 'Terraform', role: 'Reproducible Infrastructure-as-Code (IaC)' },
          { name: 'GitHub Actions', role: 'Automated CI/CD testing & deployment' },
        ],
      },
    ],
    ctaHeadline: 'Ready to engineer your mission-critical software platform?',
    ctaDescription:
      'Schedule an engineering review with our lead systems architects. We analyze your technical architecture, pinpoint bottlenecks, and outline a development sprint.',
    prevSlug: 'ai-intelligent-systems',
    nextSlug: 'automation-digital-operations',
  },

  'automation-digital-operations': {
    slug: 'automation-digital-operations',
    number: '03',
    title: 'Automation & Digital Operations',
    displayHeadline: {
      prefix: 'WHERE ARCHITECTURE MEETS',
      accent: 'AUTONOMOUS',
      suffix: 'OPERATIONS.',
    },
    editorialHeadline: 'Where Operations Meet Autonomy',
    categoryTag: 'Workflow Orchestration & Operations Automation',
    subtitle: 'Automate repetitive workflows, documents, approvals, communications, and administrative tasks so everyday operations require less manual work.',
    executiveSummary:
      'We eliminate manual operational bottlenecks with autonomous workflow orchestration, multi-system webhook synchronization, and self-healing background workers that run 24/7 with zero human intervention.',
    image: '/assets/images/service/SERVICE03.png',
    statusBadge: 'Zero Human Bottlenecks',
    telemetry: {
      sla: '99.99% Queue Reliability',
      engine: 'Event-Driven Distributed Mesh',
      latency: '14,200 Events / Min',
      concurrency: 'Zero Manual Interventions',
    },
    marqueeItems: [
      '14,200 EVENTS PROCESSED / MIN',
      '99.99% QUEUE RELIABILITY',
      '90% MANUAL PROCESS REDUCTION',
      '0.001% WORKFLOW ERROR RATE',
      'SELF-HEALING BACKGROUND BOTS',
      'IDEMPOTENT EVENT ORCHESTRATION',
    ],
    editorialSplit: {
      badge: 'AUTONOMOUS WORKFLOWS',
      headline: 'ORCHESTRATING OPERATIONAL ENGINES WITH PURPOSE',
      lead: 'We transform fragile manual handoffs into resilient, event-driven pipelines that execute round-the-clock with guaranteed delivery and self-healing error recovery.',
      statNumber: '90%',
      statLabel: 'Elimination of Manual Cross-System Data Copying and Verification',
      problemSolved:
        'Eliminates copy-paste errors across CRMs, delayed customer onboarding, manual invoice audits, and operational bottlenecks that limit company throughput.',
      strategicAdvantage:
        'Your operational capacity scales 10x without requiring a linear increase in administrative headcount or manual oversight.',
    },
    subCategories: [
      {
        id: 'process-automation',
        anchorId: 'process-automation',
        number: '03.1',
        title: 'Business Process Automation',
        summary: 'Systematic end-to-end automation of core business processes across sales, operations, finance, and logistics.',
        image: '/assets/images/service/SERVICE03.png',
        services: [
          {
            name: 'Client Onboarding Automation',
            scope: 'Instant verification, automated account provisioning, contract generation, and initial welcome sequence orchestration.',
            deliverables: ['DocuSign / PandaDoc webhook listener', 'Automated workspace creation scripts', 'CRM status synchronization'],
            tags: ['Node.js', 'Zapier / Make', 'Webhooks', 'PostgreSQL'],
          },
          {
            name: 'Financial & Billing Pipelines',
            scope: 'Automated invoice generation, payment reconciliation, recurring subscription adjustments, and accounting sync.',
            deliverables: ['Stripe-to-QuickBooks reconciliation service', 'Overdue notification webhook engine', 'PDF receipt generation'],
            tags: ['Stripe API', 'QuickBooks / Xero API', 'TypeScript'],
          },
          {
            name: 'Inventory & Order Fulfillment Routing',
            scope: 'Real-time multi-channel stock level synchronization across Shopify, Amazon, and 3PL warehouse management systems.',
            deliverables: ['Bi-directional inventory sync queue', 'Low-stock automated alert dispatch', 'Fulfillment routing rules'],
            tags: ['Shopify API', 'Redis BullMQ', 'FastAPI'],
          },
          {
            name: 'Employee Lifecycle Automation',
            scope: 'Automating IT account provisioning, permission granting, NDA collection, and equipment checkout workflows.',
            deliverables: ['Google Workspace / Okta provisioning scripts', 'Hardware inventory tracking hooks', 'HRIS integration flow'],
            tags: ['Okta API', 'Google Admin SDK', 'Slack Bot'],
          },
        ],
      },
      {
        id: 'workflows',
        anchorId: 'workflows',
        number: '03.2',
        title: 'Workflow & Task Orchestration',
        summary: 'Distributed, resilient state machine workflows that execute multi-step logic with guaranteed idempotency.',
        image: '/assets/images/service/SERVICE03.png',
        services: [
          {
            name: 'Temporal / Inngest Workflow Engines',
            scope: 'Durable execution engines where workflows survive server restarts, network failures, and third-party rate limits.',
            deliverables: ['Durable workflow step definitions', 'Automated retry and exponential backoff logic', 'Workflow state dashboard'],
            tags: ['Temporal', 'Inngest', 'TypeScript', 'Docker'],
          },
          {
            name: 'Event-Driven Webhook Meshes',
            scope: 'High-availability webhook ingestion layers that buffer, validate HMAC signatures, and fan out events reliably.',
            deliverables: ['HMAC verification middleware', 'Dead-letter queue (DLQ) replay UI', 'Redis-backed rate-limiter'],
            tags: ['Redis', 'BullMQ', 'Next.js API', 'AWS SQS'],
          },
          {
            name: 'Cross-System Multi-Step Approvals',
            scope: 'Interactive approval workflows embedded directly into Slack and Microsoft Teams with one-click decision actions.',
            deliverables: ['Slack Block Kit interactive notifications', 'Teams Actionable Message cards', 'Audit log mutation hooks'],
            tags: ['Slack SDK', 'MS Teams SDK', 'Node.js'],
          },
          {
            name: 'Data Transformation & Sync Pipelines',
            scope: 'Automated extract-transform-load (ETL) routines that normalize and migrate records between legacy databases and modern cloud apps.',
            deliverables: ['Data validation schemas (Zod/Pydantic)', 'Scheduled cron workers', 'Discrepancy alert monitors'],
            tags: ['Python', 'Pandas', 'PostgreSQL', 'Cron'],
          },
        ],
      },
      {
        id: 'document-automation',
        anchorId: 'document-automation',
        number: '03.3',
        title: 'Document & Approval Automation',
        summary: 'AI-assisted optical character recognition (OCR), structural extraction, and automated document compilation.',
        image: '/assets/images/service/SERVICE03.png',
        services: [
          {
            name: 'Intelligent PDF & Invoice Extraction',
            scope: 'Extracting line items, tax IDs, and payment terms from unstructured PDF invoices and routing into accounting software.',
            deliverables: ['Layout-aware OCR extraction pipeline', 'Automated line-item validation schema', 'ERP posting webhook'],
            tags: ['Python', 'AWS Textract', 'FastAPI', 'PostgreSQL'],
          },
          {
            name: 'Automated Contract Generation',
            scope: 'Assembling complex legal agreements and commercial proposals dynamically from client CRM data and standardized clause libraries.',
            deliverables: ['Dynamic PDF rendering engine', 'DocuSign API signing envelope flow', 'Clause versioning database'],
            tags: ['React-PDF', 'DocuSign API', 'TypeScript'],
          },
          {
            name: 'Compliance & Verification Workflows',
            scope: 'Automated verification of business licenses, certificates of insurance (COI), and regulatory filing deadlines.',
            deliverables: ['Expiration tracking cron triggers', 'Automated vendor document upload portal', 'Compliance status dashboards'],
            tags: ['Next.js 15', 'Tailwind CSS', 'PostgreSQL'],
          },
          {
            name: 'Receipt & Expense Reconciliation',
            scope: 'Mobile-friendly receipt capture with automatic currency conversion, category tagging, and ERP expense report creation.',
            deliverables: ['Mobile camera upload component', 'Vision AI categorization parser', 'ERP export batch job'],
            tags: ['Claude 3.5 Vision', 'Next.js', 'Stripe'],
          },
        ],
      },
      {
        id: 'digital-ops',
        anchorId: 'digital-ops',
        number: '03.4',
        title: 'Autonomous Digital Operations',
        summary: 'Self-healing background bots, uptime monitoring, automated incident response, and continuous operational observability.',
        image: '/assets/images/service/SERVICE03.png',
        services: [
          {
            name: 'Self-Healing Background Bots',
            scope: 'Autonomous workers that monitor error logs, detect stalled jobs, clear stuck database locks, and self-heal automatically.',
            deliverables: ['Automated remediation scripts', 'Slack alert notifications with recovery logs', 'Circuit breaker middleware'],
            tags: ['Python', 'Redis', 'Docker', 'Slack API'],
          },
          {
            name: 'Uptime & SLA Monitoring Infrastructure',
            scope: 'Distributed synthetic probe network continuously pinging critical user flows (login, checkout, search) from 12 global regions.',
            deliverables: ['Synthetic user journey scripts', 'Status page with public incident logging', 'PagerDuty escalation rules'],
            tags: ['Playwright', 'Prometheus', 'Grafana', 'PagerDuty'],
          },
          {
            name: 'Cloud Cost Optimization Workflows',
            scope: 'Automated scripts that identify unattached storage volumes, scale down idle staging clusters, and optimize cloud expenditure.',
            deliverables: ['Weekly cloud cost variance reports', 'Automated nightly shutdown policies', 'Reservation recommendation engine'],
            tags: ['AWS CLI', 'Terraform', 'Python', 'Boto3'],
          },
          {
            name: 'Security & Access Auditing Bots',
            scope: 'Continuous automated audits of team GitHub permissions, AWS IAM roles, and dormant software licenses.',
            deliverables: ['Weekly access audit digest', 'Immediate unauthorized permission alert webhooks', 'Automated de-provisioning hooks'],
            tags: ['GitHub API', 'AWS IAM', 'Python'],
          },
        ],
      },
    ],
    expertiseCards: [
      {
        title: 'DURABLE WORKFLOW ENGINES',
        stat: '14.2K Events / Min',
        category: 'STATE MACHINE ORCHESTRATION',
        description: 'Durable execution engines built on Temporal and Inngest that survive server restarts, network failures, and API outages.',
        image: '/assets/images/service/SERVICE03.png',
        href: '#workflows',
      },
      {
        title: 'INTELLIGENT DOCUMENT PIPELINES',
        stat: '90% Manual Reduction',
        category: 'DOCUMENT INTELLIGENCE',
        description: 'Layout-aware OCR and multi-modal models parsing multi-page supplier invoices with automatic ERP ledger entry.',
        image: '/assets/images/service/SERVICE03.png',
        href: '#document-automation',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'OPERATIONAL AUDIT',
        iconType: 'search',
        description: 'We map out every manual step, system boundary, and handoff delay across your sales, operations, and finance tools.',
      },
      {
        step: '02',
        name: 'IDEMPOTENT PIPELINES',
        iconType: 'cube',
        description: 'Architecting resilient webhook ingesters, step-function orchestrators, and automated failure-recovery handlers.',
      },
      {
        step: '03',
        name: 'SHADOW RUN TEST',
        iconType: 'lightbulb',
        description: 'Running the automated pipeline in shadow mode parallel to human staff to verify 100% data fidelity.',
      },
      {
        step: '04',
        name: 'LIVE PRODUCTION CUTOVER',
        iconType: 'check',
        description: 'Cutting over live operations to autonomous workers with 24/7 telemetry, rate-limit safeguards, and proactive alerts.',
      },
    ],
    featuredProjects: [
      {
        title: 'GLOBAL LOGISTICS AUTOMATED EVENT MESH',
        category: 'WORKFLOW AUTOMATION',
        metric: '14.2K Events / Min',
        year: 'FREIGHT PLATFORM, 2026',
        image: '/assets/images/service/SERVICE03.png',
        href: '/work/logistics-event-mesh',
      },
      {
        title: 'COMMERCIAL INVOICE INTELLIGENCE ENGINE',
        category: 'DOCUMENT AUTOMATION',
        metric: '90% Reduction',
        year: 'ENTERPRISE ACCOUNTING, 2026',
        image: '/assets/images/service/SERVICE03.png',
        href: '/work/commercial-document-processor',
      },
      {
        title: 'SELF-HEALING CLOUD INCIDENT ORCHESTRATOR',
        category: 'DIGITAL OPERATIONS',
        metric: '99.99% Reliability',
        year: 'CLOUD INFRASTRUCTURE, 2026',
        image: '/assets/images/service/SERVICE03.png',
        href: '/work/incident-orchestrator',
      },
    ],
    techStack: [
      {
        category: 'Workflow & Orchestration Engines',
        items: [
          { name: 'Temporal.io', role: 'Durable code-as-configuration workflows' },
          { name: 'Inngest', role: 'Event-driven serverless step functions' },
          { name: 'BullMQ', role: 'High-throughput Redis job queues' },
          { name: 'AWS Step Functions', role: 'Cloud-native state machine coordination' },
        ],
      },
      {
        category: 'Event Ingestion & Queues',
        items: [
          { name: 'Redis', role: 'In-memory queue buffer & distributed locks' },
          { name: 'RabbitMQ', role: 'Enterprise message broker & fan-out' },
          { name: 'Apache Kafka', role: 'High-volume streaming event log' },
          { name: 'AWS SQS', role: 'Managed message queue with dead-lettering' },
        ],
      },
      {
        category: 'Document & OCR Intelligence',
        items: [
          { name: 'AWS Textract', role: 'Structural table and form extraction' },
          { name: 'Tesseract OCR', role: 'Open-source on-premise optical character recognition' },
          { name: 'Claude 3.5 Sonnet', role: 'Unstructured document classification & parsing' },
          { name: 'React-PDF', role: 'Dynamic programmatic PDF contract generation' },
        ],
      },
      {
        category: 'Integration & Notifications',
        items: [
          { name: 'Slack Block Kit API', role: 'Interactive approval cards and alert channels' },
          { name: 'SendGrid / Resend', role: 'Transactional notification delivery' },
          { name: 'HubSpot / Salesforce API', role: 'Bidirectional CRM sync endpoints' },
          { name: 'Stripe API', role: 'Automated billing and payment event hooks' },
        ],
      },
    ],
    ctaHeadline: 'Ready to automate your manual operational bottlenecks?',
    ctaDescription:
      'Let us audit your operational workflows. We will identify the top 3 processes costing you time and build a fully automated proof of concept.',
    prevSlug: 'software-product-engineering',
    nextSlug: 'digital-transformation',
  },

  'digital-transformation': {
    slug: 'digital-transformation',
    number: '04',
    title: 'Digital Transformation',
    displayHeadline: {
      prefix: 'WHERE ARCHITECTURE MEETS',
      accent: 'MODERN',
      suffix: 'WEB CRAFT.',
    },
    editorialHeadline: 'Where Craft Meets Modernity',
    categoryTag: 'Modernization & Enterprise Web Craft',
    subtitle: 'Modernize how your business works and interacts online through websites, digital workflows, process digitization, and user-focused UI/UX design.',
    executiveSummary:
      'We modernize traditional businesses by decoupling legacy monoliths, architecting bespoke high-performance web experiences, and migrating outdated digital workflows to resilient cloud-native systems.',
    image: '/assets/images/service/SERVICE04.png',
    statusBadge: '100% SLA Guarantee',
    telemetry: {
      sla: '100% Data Integrity',
      engine: 'Next.js 15 + Headless Engine',
      latency: '< 40ms Edge Delivery',
      concurrency: 'Zero Cutover Downtime',
    },
    marqueeItems: [
      '100% CUTOVER UPTIME',
      'SUB-0.8S CORE WEB VITALS',
      '4X CONVERSION ACCELERATION',
      '100/100 LIGHTHOUSE PERFORMANCE',
      'HEADLESS CLOUD MIGRATION',
      'LEGACY MONOLITH DECOUPLING',
    ],
    editorialSplit: {
      badge: 'MODERNIZATION CRAFT',
      headline: 'TRANSFORMING LEGACY DIGITAL PRESENCE WITH PURPOSE',
      lead: 'We guide traditional enterprises away from sluggish legacy systems, delivering modern, accessible digital architectures that win customers and scale seamlessly.',
      statNumber: '4x',
      statLabel: 'Average Inbound Conversion Increase Post-Modernization',
      problemSolved:
        'Eliminates fragile legacy monoliths, archaic user interfaces, slow-loading websites, and manual paperwork that frustrates customers.',
      strategicAdvantage:
        'Your business presents a modern, premium digital presence backed by lightning-fast cloud infrastructure that outperforms competitors.',
    },
    subCategories: [
      {
        id: 'website-development',
        anchorId: 'website-development',
        number: '04.1',
        title: 'Website Development & Web Craft',
        summary: 'Aesthetic, high-performance web experiences built with custom typography, fluid motion, and strict technical SEO.',
        image: '/assets/images/service/SERVICE04.png',
        services: [
          {
            name: 'Flagship Corporate Websites',
            scope: 'World-class brand websites that convey authority, technical depth, and premium quality through bespoke design craft.',
            deliverables: ['Custom Next.js 15 App Router build', 'Tailwind CSS v4 design token styling', 'Complete responsive breakpoints'],
            tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          },
          {
            name: 'Interactive Motion & 3D Experiences',
            scope: 'Purposeful 3D models, smooth scroll-driven parallax, and micro-interactions that captivate visitors without hurting performance.',
            deliverables: ['Three.js / React Three Fiber scenes', 'GSAP ScrollTrigger timelines', 'prefers-reduced-motion fallbacks'],
            tags: ['Three.js', 'R3F', 'GSAP', 'Lenis'],
          },
          {
            name: 'Technical SEO & Performance Architecture',
            scope: 'Sub-second Largest Contentful Paint (LCP), perfect 100/100 Lighthouse scores, and semantic schema markup for search discovery.',
            deliverables: ['Schema.org JSON-LD structured data', 'Automated XML sitemap & robots.txt', 'Core Web Vitals audit'],
            tags: ['Lighthouse', 'Schema.org', 'Next.js Image', 'Vercel Edge'],
          },
          {
            name: 'Multi-Language Global Sites (i18n)',
            scope: 'Localized web architecture supporting dynamic language switching, localized currency, and region-specific content routing.',
            deliverables: ['Next-intl routing integration', 'Localized metadata & OpenGraph tags', 'Translation dictionary management'],
            tags: ['next-intl', 'i18n', 'TypeScript', 'JSON'],
          },
        ],
      },
      {
        id: 'process-digitization',
        anchorId: 'process-digitization',
        number: '04.2',
        title: 'Process Digitization & Modernization',
        summary: 'Replacing paper forms, manual spreadsheets, and physical clipboard logs with secure, cloud-connected digital tools.',
        image: '/assets/images/service/SERVICE04.png',
        services: [
          {
            name: 'Paper-to-Digital Workflow Replacement',
            scope: 'Translating legacy clipboards, paper inspection logs, and physical checklists into mobile-first digital interfaces.',
            deliverables: ['Mobile-optimized inspection forms', 'Digital signature capture component', 'Automatic PDF generation & cloud sync'],
            tags: ['Next.js', 'PWA', 'Tailwind CSS', 'PostgreSQL'],
          },
          {
            name: 'Spreadsheet-to-Database Migration',
            scope: 'Converting fragile multi-tab Excel workbooks into normalized SQL databases with audit trails and user access controls.',
            deliverables: ['Normalized PostgreSQL schema', 'Automated data cleaning & import script', 'Custom data entry & search portal'],
            tags: ['PostgreSQL', 'Python', 'Prisma', 'React'],
          },
          {
            name: 'Customer Self-Service Portals',
            scope: 'Empowering clients to view order status, download past invoices, update contact details, and submit service requests 24/7.',
            deliverables: ['Secure customer authentication (SSO/Magic Link)', 'Live order tracking dashboard', 'Automated email notifications'],
            tags: ['Next.js 15', 'Supabase', 'Tailwind CSS', 'Resend'],
          },
          {
            name: 'Legacy Monolith Decoupling',
            scope: 'Applying the Strangler Fig pattern to extract modular APIs from legacy monolithic codebases step by step.',
            deliverables: ['API reverse proxy gateway', 'Incremental service extraction roadmap', 'Zero-downtime cutover plan'],
            tags: ['Docker', 'Nginx', 'Node.js', 'Go'],
          },
        ],
      },
      {
        id: 'ui-ux-design',
        anchorId: 'ui-ux-design',
        number: '04.3',
        title: 'UI/UX Research & Interface Design',
        summary: 'Human-centered digital product design rooted in user interviews, wireframing, and rigorous accessibility testing.',
        image: '/assets/images/service/SERVICE04.png',
        services: [
          {
            name: 'User Research & Journey Mapping',
            scope: 'Interviewing frontline employees and end-customers to uncover friction points, unmet needs, and high-value workflows.',
            deliverables: ['Customer journey map diagram', 'Persona definitions & user stories', 'UX audit report with prioritized fixes'],
            tags: ['Figma', 'Miro', 'User Research', 'Information Architecture'],
          },
          {
            name: 'Interactive Prototyping & Testing',
            scope: 'Building realistic clickable prototypes to test interactions, button placements, and copy with real users before coding.',
            deliverables: ['High-fidelity interactive prototype in Figma', 'Usability test session recordings & metrics', 'Design validation brief'],
            tags: ['Figma', 'Prototyping', 'Usability Testing'],
          },
          {
            name: 'Accessible WCAG 2.2 AA Auditing',
            scope: 'Ensuring color contrast ratios, keyboard tab indices, and screen-reader compatibility satisfy strict international accessibility standards.',
            deliverables: ['Accessibility audit scorecard', 'Remediation code snippets', 'Screen-reader navigation tests'],
            tags: ['WCAG 2.2', 'Axe-core', 'WAI-ARIA', 'Lighthouse'],
          },
          {
            name: 'Design System Governance',
            scope: 'Establishing living design style guides and reusable UI component rules for internal engineering teams.',
            deliverables: ['Brand guideline documentation', 'Typography & spacing token scale', 'Component usage pattern library'],
            tags: ['Figma Tokens', 'Storybook', 'Tailwind CSS'],
          },
        ],
      },
      {
        id: 'cms-modernization',
        anchorId: 'cms-modernization',
        number: '04.4',
        title: 'Headless CMS & Web Modernization',
        summary: 'Migrating from sluggish, insecure WordPress or Drupal setups to blazing-fast headless content platforms.',
        image: '/assets/images/service/SERVICE04.png',
        services: [
          {
            name: 'Headless CMS Architecture',
            scope: 'Integrating Sanity, Strapi, or Contentful with Next.js for instant content editing and sub-second page re-generation.',
            deliverables: ['Content schema architecture', 'Live visual editing preview mode', 'Incremental Static Regeneration (ISR)'],
            tags: ['Sanity.io', 'Strapi', 'Next.js 15', 'GraphQL'],
          },
          {
            name: 'WordPress / Drupal Decoupling',
            scope: 'Extracting content from aging WordPress databases and serving it via modern Next.js frontends with zero PHP vulnerabilities.',
            deliverables: ['Automated content migration script', 'Headless REST/GraphQL ingestion layer', 'Zero security vulnerability footprint'],
            tags: ['Next.js', 'WP REST API', 'TypeScript', 'Cloudflare'],
          },
          {
            name: 'Asset & Media Pipeline Optimization',
            scope: 'Automated conversion of heavy images and videos into next-gen AVIF and WebP formats with edge CDN distribution.',
            deliverables: ['Next/Image edge optimization config', 'Cloudinary / AWS S3 media pipeline', 'Responsive image srcset rules'],
            tags: ['Sharp', 'Next.js Image', 'Cloudflare CDN', 'WebP/AVIF'],
          },
          {
            name: 'Cloudflare Edge & CDN Routing',
            scope: 'Configuring enterprise CDN edge caching, web application firewalls (WAF), and DDoS protection layers.',
            deliverables: ['Cloudflare caching rules & edge headers', 'DDoS rate limiting configuration', 'Zero-trust team access proxy'],
            tags: ['Cloudflare', 'WAF', 'DNS', 'Edge Computing'],
          },
        ],
      },
    ],
    expertiseCards: [
      {
        title: 'ENTERPRISE WEB CRAFT & INTERFACES',
        stat: '100/100 Lighthouse Performance',
        category: 'FLAGSHIP WEB CRAFT',
        description: 'World-class corporate digital platforms with bespoke typography, fluid scroll physics, and sub-second edge asset delivery.',
        image: '/assets/images/service/SERVICE04.png',
        href: '#website-development',
      },
      {
        title: 'LEGACY MONOLITH DECOUPLING',
        stat: 'Zero Downtime Cutover',
        category: 'MODERNIZATION',
        description: 'Safe extraction of modular Next.js frontends and cloud microservices from aging legacy WordPress and PHP backbones.',
        image: '/assets/images/service/SERVICE04.png',
        href: '#cms-modernization',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'DIGITAL ASSET AUDIT',
        iconType: 'search',
        description: 'Analyzing existing web infrastructure, server costs, user friction points, and legacy performance bottlenecks.',
      },
      {
        step: '02',
        name: 'DESIGN & PROTOTYPING',
        iconType: 'cube',
        description: 'Creating the modern design token architecture, interactive wireframes, and headless CMS content schemas.',
      },
      {
        step: '03',
        name: 'MODERN WEB ASSEMBLY',
        iconType: 'lightbulb',
        description: 'Assembling the Next.js frontend, integrating purposeful motion and technical SEO, and migrating historical data.',
      },
      {
        step: '04',
        name: 'ZERO-DOWNTIME CUTOVER',
        iconType: 'check',
        description: 'Switching DNS routing seamlessly, implementing 301 redirect matrices, and training internal marketing staff.',
      },
    ],
    featuredProjects: [
      {
        title: 'KAIROTRIX DIGITAL ARCHITECTURE PLATFORM',
        category: 'MODERN WEB CRAFT',
        metric: '100/100 Score',
        year: 'FLAGSHIP EXPERIENCE, 2026',
        image: '/assets/images/service/SERVICE04.png',
        href: '/',
      },
      {
        title: 'HEADLESS CORPORATE PORTAL & CMS MIGRATION',
        category: 'DIGITAL MODERNIZATION',
        metric: '< 40ms Edge',
        year: 'ENTERPRISE CUTOVER, 2026',
        image: '/assets/images/service/SERVICE04.png',
        href: '/work/headless-corporate-portal',
      },
      {
        title: 'ACCESSIBLE DESIGN SYSTEM INFRASTRUCTURE',
        category: 'DESIGN TOKENS & UI',
        metric: 'WCAG 2.2 AA',
        year: 'DESIGN SYSTEM, 2026',
        image: '/assets/images/service/SERVICE04.png',
        href: '/work/design-system-infrastructure',
      },
    ],
    techStack: [
      {
        category: 'Modern Web Frameworks',
        items: [
          { name: 'Next.js 15 App Router', role: 'Hybrid SSR/SSG server rendering' },
          { name: 'React 19', role: 'Modern declarative component architecture' },
          { name: 'TypeScript', role: 'Type safety across all frontend and API boundaries' },
          { name: 'Tailwind CSS v4', role: 'CSS-native design tokens and utilities' },
        ],
      },
      {
        category: 'Motion & Visual Craft',
        items: [
          { name: 'Framer Motion', role: 'Declarative layout and scroll animations' },
          { name: 'GSAP & ScrollTrigger', role: 'Complex pinned scroll choreography' },
          { name: 'Lenis', role: 'Butter-smooth inertia scrolling' },
          { name: 'Three.js / R3F', role: 'Interactive 3D canvas rendering' },
        ],
      },
      {
        category: 'Headless Content Systems',
        items: [
          { name: 'Sanity.io', role: 'Structured headless content studio' },
          { name: 'Strapi CMS', role: 'Self-hosted open-source headless CMS' },
          { name: 'Contentlayer / MDX', role: 'File-based type-safe content loading' },
          { name: 'Cloudinary', role: 'Automated video & image optimization' },
        ],
      },
      {
        category: 'Edge Infrastructure & Security',
        items: [
          { name: 'Vercel Edge Network', role: 'Global edge function execution' },
          { name: 'Cloudflare', role: 'DDoS mitigation, WAF, and edge caching' },
          { name: 'AWS S3 & CloudFront', role: 'Global static asset distribution' },
          { name: 'Lighthouse CI', role: 'Automated Core Web Vitals enforcement' },
        ],
      },
    ],
    ctaHeadline: 'Ready to modernize your digital presence?',
    ctaDescription:
      'Schedule a digital transformation discovery session. We will evaluate your current web assets and architect a modern, high-performance roadmap.',
    prevSlug: 'automation-digital-operations',
    nextSlug: 'data-business-intelligence',
  },

  'data-business-intelligence': {
    slug: 'data-business-intelligence',
    number: '05',
    title: 'Data & Business Intelligence',
    displayHeadline: {
      prefix: 'WHERE ARCHITECTURE MEETS',
      accent: 'EXECUTIVE',
      suffix: 'DATA COMMAND.',
    },
    editorialHeadline: 'Where Data Meets Decision Command',
    categoryTag: 'Analytics, Data Pipelines & Decision Systems',
    subtitle: 'Turn business data into useful insights through analytics, KPI dashboards, interactive reports, and natural-language tools for exploring information.',
    executiveSummary:
      'We transform fragmented raw data into sub-second visual intelligence, automated anomaly alerts, and trustworthy semantic metrics that empower executive decision-making with zero guesswork.',
    image: '/assets/images/service/SERVICE05.png',
    statusBadge: 'Sub-Second Analytics',
    telemetry: {
      sla: '99.99% Data Freshness SLA',
      engine: 'ClickHouse + Apache Arrow Engine',
      latency: '< 420ms Query Times',
      concurrency: '10M+ Rows Scanned / Sec',
    },
    marqueeItems: [
      '< 420MS QUERY TIMES',
      '10M+ ROWS SCANNED / SEC',
      '100% METRIC CERTAINTY',
      '99.99% FRESHNESS GUARANTEE',
      'TEXT-TO-SQL AI COPILOTS',
      'REAL-TIME EXECUTIVE COMMAND CENTERS',
    ],
    editorialSplit: {
      badge: 'DECISION INTELLIGENCE',
      headline: 'UNIFYING ENTERPRISE METRICS WITH PURPOSE',
      lead: 'We transform scattered spreadsheets and database silos into unified, high-speed analytical command centers with single-source-of-truth reliability.',
      statNumber: '< 420ms',
      statLabel: 'Complex Multi-Million Row Analytical Query Response Times',
      problemSolved:
        'Eliminates conflicting revenue figures, delayed month-end reporting, slow queries that crash production databases, and uninformed executive decisions.',
      strategicAdvantage:
        'Leadership gains instant visibility into real-time unit economics, customer churn signals, and operational bottlenecks from any device.',
    },
    subCategories: [
      {
        id: 'analytics',
        anchorId: 'analytics',
        number: '05.1',
        title: 'Business Data Analytics & Warehousing',
        summary: 'Modern data stacks that ingest, cleanse, model, and store enterprise data in ultra-fast analytical warehouses.',
        image: '/assets/images/service/SERVICE05.png',
        services: [
          {
            name: 'Cloud Data Warehouse Setup',
            scope: 'Designing scalable, cost-effective data warehouses on Snowflake, BigQuery, or ClickHouse with optimized partition schemes.',
            deliverables: ['Columnar database schema architecture', 'Role-based data access policies', 'Automated backup and retention policies'],
            tags: ['ClickHouse', 'BigQuery', 'Snowflake', 'PostgreSQL'],
          },
          {
            name: 'Automated ELT Data Pipelines',
            scope: 'Scheduled ingestion pipelines extracting data from Stripe, Salesforce, Google Ads, and production databases into the warehouse.',
            deliverables: ['dbt data transformation models', 'Airbyte / Fivetran pipeline integrations', 'Data freshness monitoring monitors'],
            tags: ['dbt', 'Airbyte', 'Python', 'SQL'],
          },
          {
            name: 'Data Cleaning & Schema Normalization',
            scope: 'Deduplicating customer identities, handling currency conversions, and standardizing disparate date formats into clean tables.',
            deliverables: ['Data normalization dbt scripts', 'Automated anomaly data tests', 'Data lineage documentation graph'],
            tags: ['dbt', 'Great Expectations', 'Python', 'SQL'],
          },
          {
            name: 'Semantic Layer & Metric Standardization',
            scope: 'Defining standardized business definitions for ARR, CAC, LTV, and retention so every team views matching figures.',
            deliverables: ['Cube.js / MetricFlow semantic models', 'Central metric repository', 'Audit trail for metric revisions'],
            tags: ['Cube.js', 'MetricFlow', 'SQL', 'Git'],
          },
        ],
      },
      {
        id: 'dashboards',
        anchorId: 'dashboards',
        number: '05.2',
        title: 'Executive & KPI Dashboards',
        summary: 'Fast, interactive visualization command centers customized for CEOs, CFOs, sales heads, and operations leaders.',
        image: '/assets/images/service/SERVICE05.png',
        services: [
          {
            name: 'Executive Command Centers',
            scope: 'Unified C-suite dashboard showing real-time revenue, burn rate, customer acquisition velocity, and cash runway.',
            deliverables: ['Custom Next.js / Tailwind dashboard interface', 'Real-time WebSocket data refresh', 'Mobile-responsive viewports'],
            tags: ['Next.js 15', 'Tailwind CSS', 'Recharts', 'Tremor'],
          },
          {
            name: 'Operational & Fulfillment Cockpits',
            scope: 'Real-time screens for warehouse managers, support teams, and dispatchers tracking live order queues and SLA timers.',
            deliverables: ['Sub-second live streaming data grids', 'Visual SLA alert status flags', 'Sound and webhook dispatch alerts'],
            tags: ['React', 'WebSockets', 'TanStack Table', 'Tailwind CSS'],
          },
          {
            name: 'Sales & Pipeline Performance Dashboards',
            scope: 'Visual funnel tracking conversion rates at every deal stage, rep performance quotas, and projected closing dates.',
            deliverables: ['Interactive sales funnel diagrams', 'Cohort analysis matrices', 'HubSpot / Salesforce live sync'],
            tags: ['Recharts', 'HubSpot API', 'TypeScript', 'SQL'],
          },
          {
            name: 'Automated Board & Investor Reports',
            scope: 'Scheduled generation of beautifully formatted PDF and slide reports delivered automatically to board members and stakeholders.',
            deliverables: ['Dynamic PDF report compilation engine', 'Automated monthly email distribution', 'Executive summary charts'],
            tags: ['React-PDF', 'Node.js', 'Resend', 'Chart.js'],
          },
        ],
      },
      {
        id: 'predictive',
        anchorId: 'predictive',
        number: '05.3',
        title: 'Predictive Modeling & Forecasting',
        summary: 'Applying machine learning and statistical models to forecast customer churn, inventory demand, and seasonal revenue.',
        image: '/assets/images/service/SERVICE05.png',
        services: [
          {
            name: 'Customer Churn Prediction',
            scope: 'Early warning algorithms that detect declining user activity patterns and flag at-risk accounts weeks before cancellation.',
            deliverables: ['Trained churn classification model', 'Automated CRM customer risk tags', 'Proactive retention outreach triggers'],
            tags: ['Python', 'Scikit-Learn', 'XGBoost', 'HubSpot API'],
          },
          {
            name: 'Inventory Demand Forecasting',
            scope: 'Time-series forecasting models predicting future stock requirements based on seasonality, promotions, and lead times.',
            deliverables: ['Prophet / ARIMA forecasting pipeline', 'Recommended reorder quantity calculations', 'Stockout risk indicators'],
            tags: ['Prophet', 'Python', 'Pandas', 'PostgreSQL'],
          },
          {
            name: 'Dynamic Pricing & Margin Optimization',
            scope: 'Algorithms calculating optimal pricing tiers based on competitor signals, demand elasticity, and target gross margins.',
            deliverables: ['Dynamic pricing recommendation engine', 'Margin simulation modeling tools', 'Automated price test monitors'],
            tags: ['Python', 'FastAPI', 'NumPy', 'Docker'],
          },
          {
            name: 'Anomaly Detection in Financial Data',
            scope: 'Continuous automated surveillance identifying suspicious transactions, duplicate charges, and unusual expense spikes.',
            deliverables: ['Statistical anomaly detection workers', 'Real-time Slack security alerts', 'Investigation triage dashboard'],
            tags: ['PyOD', 'Python', 'FastAPI', 'Slack API'],
          },
        ],
      },
      {
        id: 'nl-queries',
        anchorId: 'nl-queries',
        number: '05.4',
        title: 'Natural-Language Data Queries',
        summary: 'Text-to-SQL AI interfaces enabling business users to query complex enterprise databases in plain English.',
        image: '/assets/images/service/SERVICE05.png',
        services: [
          {
            name: 'Text-to-SQL AI Query Interfaces',
            scope: 'Chat interfaces allowing executives to ask questions like "Show me Q3 revenue by region" and receive accurate charts instantly.',
            deliverables: ['Database schema metadata grounder', 'Strict read-only SQL safety validator', 'Auto-generating chart visualizer'],
            tags: ['Claude 3.5 Sonnet', 'LangChain', 'Vercel AI SDK', 'SQL'],
          },
          {
            name: 'Slack / Teams Analytics Copilot',
            scope: 'Internal messaging bots that answer ad-hoc data questions directly inside company Slack or Teams channels.',
            deliverables: ['Slack conversational bot', 'Permission-filtered database queries', 'Instant PNG chart generation in channel'],
            tags: ['Slack SDK', 'Python', 'Matplotlib', 'FastAPI'],
          },
          {
            name: 'Automated Insight Summarization',
            scope: 'AI systems that read weekly database deltas and generate plain-English bullet points explaining why metrics changed.',
            deliverables: ['Automated Monday morning insight email', 'Root-cause driver attribution breakdown', 'Executive summary generator'],
            tags: ['OpenAI', 'Next.js', 'Resend', 'SQL'],
          },
          {
            name: 'Self-Service Analytics Portals',
            scope: 'Giving non-technical team members safe, guided drag-and-drop query builders without writing a single line of SQL.',
            deliverables: ['Visual query builder interface', 'Export to Excel/CSV safeguards', 'Query cost control limits'],
            tags: ['React', 'Cube.js', 'Tailwind CSS', 'PostgreSQL'],
          },
        ],
      },
    ],
    expertiseCards: [
      {
        title: 'REAL-TIME TELEMETRY COMMAND CENTERS',
        stat: '< 420ms Query Times',
        category: 'EXECUTIVE INTELLIGENCE',
        description: 'Interactive C-suite command centers connected to ClickHouse columnar warehouses for instantaneous visibility into cash, burn, and growth.',
        image: '/assets/images/service/SERVICE05.png',
        href: '#dashboards',
      },
      {
        title: 'NATURAL-LANGUAGE TEXT-TO-SQL ENGINES',
        stat: '100% Metric Accuracy',
        category: 'CONVERSATIONAL ANALYTICS',
        description: 'AI-grounded semantic querying enabling leadership to ask natural-language questions and receive validated charts in seconds.',
        image: '/assets/images/service/SERVICE05.png',
        href: '#nl-queries',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'DATA SCHEMA AUDIT',
        iconType: 'search',
        description: 'Auditing existing databases, CRM schemas, spreadsheets, and reporting bottlenecks with department heads.',
      },
      {
        step: '02',
        name: 'WAREHOUSE ENGINEERING',
        iconType: 'cube',
        description: 'Setting up the columnar warehouse, automated ELT ingest pipelines, and clean dbt normalization models.',
      },
      {
        step: '03',
        name: 'DASHBOARD ASSEMBLY',
        iconType: 'lightbulb',
        description: 'Engineering interactive executive dashboards, semantic metric models, and automated Slack alert triggers.',
      },
      {
        step: '04',
        name: 'GOVERNANCE & ADOPTION',
        iconType: 'check',
        description: 'Establishing access control permissions, data freshness alerts, and training teams on natural-language query tools.',
      },
    ],
    featuredProjects: [
      {
        title: 'HIGH-THROUGHPUT TELEMETRY COMMAND CENTER',
        category: 'DATA & ANALYTICS',
        metric: '< 420ms Queries',
        year: 'FINANCIAL STREAMING, 2026',
        image: '/assets/images/service/SERVICE05.png',
        href: '/work/telemetry-command-center',
      },
      {
        title: 'EXECUTIVE NATURAL-LANGUAGE COPILOT',
        category: 'AI DECISION SYSTEMS',
        metric: '100% Metric Trust',
        year: 'EXECUTIVE SUITE, 2026',
        image: '/assets/images/service/SERVICE05.png',
        href: '/work/executive-intelligence-copilot',
      },
      {
        title: 'CLICKHOUSE ANALYTICS LAKEHOUSE PIPELINE',
        category: 'COLUMNAR WAREHOUSING',
        metric: '10M+ Rows / Sec',
        year: 'ENTERPRISE DATA ENGINE, 2026',
        image: '/assets/images/service/SERVICE05.png',
        href: '/work/clickhouse-lakehouse',
      },
    ],
    techStack: [
      {
        category: 'Warehouses & Analytical Engines',
        items: [
          { name: 'ClickHouse', role: 'Blazing fast columnar analytical store' },
          { name: 'PostgreSQL', role: 'Primary operational relational storage' },
          { name: 'Snowflake / BigQuery', role: 'Enterprise cloud data lakehouse' },
          { name: 'Apache Arrow', role: 'In-memory columnar data interchange' },
        ],
      },
      {
        category: 'Transformation & Orchestration',
        items: [
          { name: 'dbt (Data Build Tool)', role: 'Modular SQL data transformation and testing' },
          { name: 'Airbyte', role: 'Open-source ELT data extraction connectors' },
          { name: 'Dagster / Airflow', role: 'Data pipeline orchestration and asset tracking' },
          { name: 'Python & Pandas', role: 'Statistical transformation and data modeling' },
        ],
      },
      {
        category: 'Visualization & UX',
        items: [
          { name: 'Next.js 15 & React 19', role: 'Custom executive dashboard frontends' },
          { name: 'Recharts & Tremor', role: 'Responsive SVG and Canvas chart components' },
          { name: 'TanStack Table', role: 'Virtual-scroll high-density data grids' },
          { name: 'Tailwind CSS v4', role: 'High-contrast data design tokens' },
        ],
      },
      {
        category: 'AI & Natural-Language Analytics',
        items: [
          { name: 'Claude 3.5 Sonnet', role: 'High-accuracy Text-to-SQL reasoning' },
          { name: 'Vercel AI SDK', role: 'Streaming chart generation in chat' },
          { name: 'Cube.js', role: 'Governed semantic metric caching layer' },
          { name: 'Slack Block Kit', role: 'In-channel interactive analytics reports' },
        ],
      },
    ],
    ctaHeadline: 'Ready to build your single source of business truth?',
    ctaDescription:
      'Schedule a data architecture discovery session. We will evaluate your scattered data sources and outline a unified, real-time analytics command center.',
    prevSlug: 'digital-transformation',
    nextSlug: 'technology-integration',
  },

  'technology-integration': {
    slug: 'technology-integration',
    number: '06',
    title: 'Technology Integration',
    displayHeadline: {
      prefix: 'WHERE ARCHITECTURE MEETS',
      accent: 'SYSTEM',
      suffix: 'HARMONY.',
    },
    editorialHeadline: 'Where Systems Meet Seamless Flow',
    categoryTag: 'API Fabrics, Middleware & System Synchronization',
    subtitle: 'Connect the software your business already uses through APIs, CRM and ERP integrations, payment services, and reliable data synchronization between systems.',
    executiveSummary:
      'We bridge disparate software stacks, IoT hardware telemetry, and enterprise ERP backbones with robust, resilient multi-protocol middleware adapters that guarantee zero data divergence.',
    image: '/assets/images/service/SERVICE06.png',
    statusBadge: 'Multi-Protocol Active',
    telemetry: {
      sla: '99.999% Delivery Guarantee',
      engine: 'Multi-Protocol Middleware Fabric',
      latency: 'Bi-Directional Sync Active',
      concurrency: 'Multi-Protocol Routing',
    },
    marqueeItems: [
      '99.999% DELIVERY GUARANTEE',
      'SUB-50MS SYNC SPEED',
      'ZERO DATA DIVERGENCE',
      'ENTERPRISE ERP & CRM BRIDGES',
      'RESILIENT WEBHOOK MESHES',
      'CRYPTOGRAPHIC RECONCILIATION',
    ],
    editorialSplit: {
      badge: 'INTEGRATION FABRIC',
      headline: 'BRIDGING DISCONNECTED SYSTEMS WITH PURPOSE',
      lead: 'We build secure, resilient integration fabrics that eliminate duplicate records and synchronize your tools in real time with zero data divergence.',
      statNumber: '< 50ms',
      statLabel: 'Bi-Directional Multi-System Synchronization Latency',
      problemSolved:
        'Eliminates duplicate customer records, out-of-sync inventory counts, broken third-party webhooks, and manual batch data imports.',
      strategicAdvantage:
        'Your enterprise operates with real-time operational continuity—when an event happens in one system, every downstream platform updates instantly.',
    },
    subCategories: [
      {
        id: 'api-integration',
        anchorId: 'api-integration',
        number: '06.1',
        title: 'API & System Integration',
        summary: 'Enterprise API gateways, protocol translation, and high-concurrency microservice communication adapters.',
        image: '/assets/images/service/SERVICE06.png',
        services: [
          {
            name: 'Enterprise API Gateway Architecture',
            scope: 'Centralized API gateway managing rate limiting, authentication, payload validation, and request routing across services.',
            deliverables: ['Kong / Cloudflare gateway setup', 'JWT and API key verification layer', 'Automated OpenAPI 3.0 documentation'],
            tags: ['Kong', 'Cloudflare', 'TypeScript', 'Docker'],
          },
          {
            name: 'REST, GraphQL & gRPC Translators',
            scope: 'Building multi-protocol adapters that translate legacy SOAP or binary gRPC payloads into clean REST or GraphQL APIs.',
            deliverables: ['Protocol buffer definitions', 'Bidirectional payload mapping schemas', 'Sub-5ms serialization middleware'],
            tags: ['gRPC', 'GraphQL', 'Node.js', 'Go'],
          },
          {
            name: 'Third-Party SaaS API Integrations',
            scope: 'Connecting specialized SaaS APIs (Slack, DocuSign, Twilio, Google, AWS) into your core internal application logic.',
            deliverables: ['OAuth2 token refresh manager', 'Rate-limit handling queue', 'Comprehensive error fallback handlers'],
            tags: ['OAuth2', 'TypeScript', 'Redis', 'Webhooks'],
          },
          {
            name: 'Microservice Inter-Communication',
            scope: 'Engineering secure service-to-service communication with mutual TLS (mTLS), service discovery, and circuit breakers.',
            deliverables: ['mTLS certificate rotation scripts', 'Envoy / Consul service mesh configs', 'Distributed transaction tracing'],
            tags: ['Envoy', 'Docker', 'Go', 'OpenTelemetry'],
          },
        ],
      },
      {
        id: 'crm-erp',
        anchorId: 'crm-erp',
        number: '06.2',
        title: 'CRM & ERP Synchronization',
        summary: 'Deep, bidirectional synchronization between enterprise ERP systems (SAP, NetSuite) and customer CRMs (Salesforce, HubSpot).',
        image: '/assets/images/service/SERVICE06.png',
        services: [
          {
            name: 'Salesforce & HubSpot Bidirectional Sync',
            scope: 'Real-time synchronization of leads, contacts, deals, and activities between marketing CRMs and internal databases.',
            deliverables: ['Bidirectional field mapping configuration', 'Conflict resolution logic rules', 'Near-instant webhook sync workers'],
            tags: ['Salesforce API', 'HubSpot API', 'Node.js', 'Redis'],
          },
          {
            name: 'NetSuite & SAP ERP Connectors',
            scope: 'Integrating enterprise ERP accounting, billing, and inventory ledgers with modern customer-facing web applications.',
            deliverables: ['SuiteTalk / OData connector endpoints', 'Two-way invoice and payment sync', 'Automated ERP record reconciliation'],
            tags: ['NetSuite SuiteTalk', 'SAP OData', 'Python', 'PostgreSQL'],
          },
          {
            name: 'Customer 360 Unified Identity Graph',
            scope: 'Merging duplicate contacts across multiple platforms into a single canonical customer record with complete interaction history.',
            deliverables: ['Fuzzy matching identity resolution scripts', 'Master Data Management (MDM) schema', 'Customer 360 API endpoint'],
            tags: ['PostgreSQL', 'Python', 'Redis', 'dbt'],
          },
          {
            name: 'ERP Data Migration & Cutover',
            scope: 'Safely extracting, transforming, and loading historical records from aging on-premise ERPs into modern cloud architectures.',
            deliverables: ['Pre-migration data validation scripts', 'Automated delta-sync reconciliation', 'Zero-downtime cutover plan'],
            tags: ['Python', 'SQL', 'PostgreSQL', 'Docker'],
          },
        ],
      },
      {
        id: 'payments',
        anchorId: 'payments',
        number: '06.3',
        title: 'Payment & Billing Gateways',
        summary: 'Rock-solid financial integration architectures for credit cards, ACH, global currencies, and complex recurring subscription billing.',
        image: '/assets/images/service/SERVICE06.png',
        services: [
          {
            name: 'Stripe & Stripe Billing Integrations',
            scope: 'Custom subscription flows, metered usage billing, customer portal self-service, and robust webhook listeners.',
            deliverables: ['Stripe webhook listener with signature verification', 'Usage-based metering event dispatcher', 'Hosted customer portal setup'],
            tags: ['Stripe API', 'TypeScript', 'Next.js', 'Redis'],
          },
          {
            name: 'Multi-Gateway Payment Failover',
            scope: 'Intelligent payment routing that automatically retries failed transactions through backup gateways (Adyen, PayPal, Authorize.net).',
            deliverables: ['Payment routing decision engine', 'Card decline classification logic', 'PCI-DSS compliant tokenization layer'],
            tags: ['Adyen API', 'Stripe', 'Node.js', 'PostgreSQL'],
          },
          {
            name: 'ACH & Bank Transfer Pipelines',
            scope: 'Direct B2B bank payment integrations with automated Plaid account verification and micro-deposit reconciliation.',
            deliverables: ['Plaid Link integration UI', 'ACH transaction state tracking worker', 'Automated return code notification hooks'],
            tags: ['Plaid API', 'Stripe ACH', 'TypeScript'],
          },
          {
            name: 'Global Currency & Tax Compliance',
            scope: 'Automated VAT/GST calculation and collection across 100+ countries with Stripe Tax and Avalara integrations.',
            deliverables: ['Stripe Tax / TaxJar API integration', 'Multi-currency pricing display', 'Quarterly tax liability export reports'],
            tags: ['Stripe Tax', 'TaxJar', 'Next.js', 'JSON'],
          },
        ],
      },
      {
        id: 'data-sync',
        anchorId: 'data-sync',
        number: '06.4',
        title: 'Cross-System Data Synchronization',
        summary: 'Distributed event buses, change-data-capture (CDC), and real-time webhook routing that keep all corporate datastores in lockstep.',
        image: '/assets/images/service/SERVICE06.png',
        services: [
          {
            name: 'Change Data Capture (CDC) Pipelines',
            scope: 'Streaming database changes in real time using Debezium and Kafka without polling or overloading production tables.',
            deliverables: ['Debezium PostgreSQL connector config', 'Kafka topic partitioning setup', 'Downstream consumer service templates'],
            tags: ['Debezium', 'Apache Kafka', 'PostgreSQL', 'Docker'],
          },
          {
            name: 'Resilient Webhook Mesh & Fan-Out',
            scope: 'Receiving external webhooks, buffering them in Redis queues, and fanning out payloads reliably to internal microservices.',
            deliverables: ['High-availability webhook receiver', 'Automatic retry with exponential backoff', 'Failed payload inspection console'],
            tags: ['Redis', 'BullMQ', 'Next.js', 'FastAPI'],
          },
          {
            name: 'IoT & Telemetry Hardware Bridges',
            scope: 'Connecting physical sensors, barcode scanners, and edge hardware to cloud databases via MQTT and WebSockets.',
            deliverables: ['MQTT broker setup (EMQX / Mosquitto)', 'Edge payload decompression parser', 'Real-time cloud database ingester'],
            tags: ['MQTT', 'WebSockets', 'Go', 'TimescaleDB'],
          },
          {
            name: 'Continuous Data Reconciliation Audits',
            scope: 'Automated nightly integrity jobs comparing record counts and hash digests between systems to catch anomalies before humans notice.',
            deliverables: ['Nightly reconciliation cron worker', 'Discrepancy resolution workflow', 'Slack alert digest for engineering'],
            tags: ['Python', 'SQL', 'PostgreSQL', 'Slack API'],
          },
        ],
      },
    ],
    expertiseCards: [
      {
        title: 'ENTERPRISE CRM & ERP FABRIC',
        stat: '< 50ms Sync Speed',
        category: 'SYSTEM BRIDGES',
        description: 'Bi-directional synchronization between Salesforce, NetSuite, SAP, and custom production databases with cryptographic reconciliation.',
        image: '/assets/images/service/SERVICE06.png',
        href: '#crm-erp',
      },
      {
        title: 'MULTI-PROTOCOL API GATEWAYS',
        stat: '99.999% Delivery SLA',
        category: 'API FABRICS',
        description: 'High-availability reverse proxy gateways handling gRPC, GraphQL, REST, and WebSockets with centralized token authentication.',
        image: '/assets/images/service/SERVICE06.png',
        href: '#api-integration',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'TOPOLOGY AUDIT',
        iconType: 'search',
        description: 'Mapping out every software endpoint, data schema, protocol, and rate limit across your vendor stack.',
      },
      {
        step: '02',
        name: 'GATEWAY ENGINEERING',
        iconType: 'cube',
        description: 'Building type-safe API adapters, schema mapping layers, and idempotent message queues in isolated environments.',
      },
      {
        step: '03',
        name: 'PARALLEL SYNC TEST',
        iconType: 'lightbulb',
        description: 'Running real-time bi-directional synchronization in parallel to ensure 100% data integrity with zero duplicates.',
      },
      {
        step: '04',
        name: 'PRODUCTION CUTOVER',
        iconType: 'check',
        description: 'Switching live production traffic to the new integration fabric with 24/7 telemetry monitoring and automated alerts.',
      },
    ],
    featuredProjects: [
      {
        title: 'ENTERPRISE MULTI-PROTOCOL API GATEWAY',
        category: 'TECHNOLOGY INTEGRATION',
        metric: '99.999% Delivery',
        year: 'ENTERPRISE FABRIC, 2026',
        image: '/assets/images/service/SERVICE06.png',
        href: '/work/enterprise-api-gateway',
      },
      {
        title: 'REAL-TIME WEBHOOK MESH & EVENT ROUTER',
        category: 'EVENT ARCHITECTURE',
        metric: 'Sub-50ms Sync',
        year: 'FINTECH EVENT MESH, 2026',
        image: '/assets/images/service/SERVICE06.png',
        href: '/work/realtime-webhook-mesh',
      },
      {
        title: 'SALESFORCE & SAP BIDIRECTIONAL SYNC',
        category: 'ERP/CRM INTEGRATION',
        metric: 'Zero Divergence',
        year: 'GLOBAL ERP SYNC, 2026',
        image: '/assets/images/service/SERVICE06.png',
        href: '/work/crm-erp-sync',
      },
    ],
    techStack: [
      {
        category: 'Protocols & API Fabrics',
        items: [
          { name: 'REST & OpenAPI 3.0', role: 'Standardized HTTP interface contracts' },
          { name: 'gRPC & Protobuf', role: 'High-speed binary inter-service communication' },
          { name: 'GraphQL', role: 'Flexible client-driven data querying' },
          { name: 'MQTT & WebSockets', role: 'Low-latency bidirectional streaming' },
        ],
      },
      {
        category: 'Event Brokers & CDC',
        items: [
          { name: 'Apache Kafka', role: 'Distributed high-volume event streaming' },
          { name: 'Debezium', role: 'Database change data capture (CDC)' },
          { name: 'Redis Streams', role: 'Fast in-memory message buffering' },
          { name: 'RabbitMQ', role: 'Enterprise message routing and fan-out' },
        ],
      },
      {
        category: 'Enterprise SaaS Connectors',
        items: [
          { name: 'Salesforce & HubSpot API', role: 'Full CRM bidirectional synchronization' },
          { name: 'NetSuite SuiteTalk & SAP', role: 'Enterprise ERP ledger integration' },
          { name: 'Stripe & Plaid API', role: 'Payment processing & bank verification' },
          { name: 'DocuSign & Okta API', role: 'Identity management & e-signature pipelines' },
        ],
      },
      {
        category: 'Observability & Security',
        items: [
          { name: 'OpenTelemetry', role: 'Distributed cross-system transaction tracing' },
          { name: 'Cloudflare Zero Trust', role: 'Secure authenticated gateway proxy' },
          { name: 'Datadog / Prometheus', role: 'Real-time API latency and error alerting' },
          { name: 'HashiCorp Vault', role: 'Centralized API secret & credential management' },
        ],
      },
    ],
    ctaHeadline: 'Ready to unify your disconnected enterprise software systems?',
    ctaDescription:
      'Book an integration architecture consultation. We analyze your tech stack, identify duplicate data flows, and build a unified, real-time integration fabric.',
    prevSlug: 'data-business-intelligence',
    nextSlug: 'ai-intelligent-systems',
  },
};

export const ALL_SOLUTION_SLUGS = Object.keys(SOLUTIONS_DATA);

export function getFlagshipService(
  solutionSlug: string,
  serviceSlug: string
): { solution: SolutionDetail; subCategory: SubCategory } | null {
  const solution = SOLUTIONS_DATA[solutionSlug];
  if (!solution) return null;
  const subCategory = solution.subCategories.find(
    (sub) => sub.slug === serviceSlug && sub.enableSeoPage === true
  );
  if (!subCategory) return null;
  return { solution, subCategory };
}

export function getAllFlagshipServices(): { slug: string; serviceSlug: string }[] {
  const params: { slug: string; serviceSlug: string }[] = [];
  for (const [slug, solution] of Object.entries(SOLUTIONS_DATA)) {
    for (const sub of solution.subCategories) {
      if (sub.enableSeoPage && sub.slug) {
        params.push({ slug, serviceSlug: sub.slug });
      }
    }
  }
  return params;
}

