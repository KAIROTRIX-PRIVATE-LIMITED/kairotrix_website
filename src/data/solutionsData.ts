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

export interface TechnicalApproach {
  description: string;
  technologies: string[];
}

export interface SubCategory {
  id: string;
  slug?: string;
  anchorId: string; // e.g. 'ai-apps', 'ai-agents' matching Navbar.tsx
  number?: string;
  title: string;
  summary: string;
  image: string;
  bestSuitedFor?: string[];
  whatWeBuild?: string[];
  whatWeHandle?: string[];
  whatYouReceive?: string[];
  technicalApproach?: TechnicalApproach;
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
  image?: string;
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

export interface EngineeringFocusItem {
  label: string;
  value: string;
}

export interface EditorialHighlight {
  lead: string;
  detail: string;
}

export interface EditorialFocusCard {
  tag?: string;
  title: string;
  subtitle?: string;
  description: string;
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
  image: string; // Subservice Hero 3D Artwork
  gridImage?: string; // Main Solutions Hub Directory Preview Image
  systemFocusImage?: string; // Dedicated System Focus Section Image
  heroVideo?: string;
  statusBadge: string;
  engineeringFocus: EngineeringFocusItem[];
  marqueeItems: string[];
  editorialSplit: {
    badge: string;
    headline: string;
    lead: string;
    editorialHighlight: EditorialHighlight;
    focusCards?: EditorialFocusCard[];
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
      'KAIROTRIX designs and builds AI applications, agents, knowledge systems, and machine-learning solutions around real business workflows, data, and decisions.',
    image: '/assets/images/solutions/sub_hero/s1.png',
    gridImage: '/assets/images/solutions/grid/M1.png',
    systemFocusImage: '/assets/images/solutions/ai/ai-system-focus.png',
    heroVideo: '/assets/videos/ai-service.mp4',
    statusBadge: 'Production Architecture',
    engineeringFocus: [
      { label: 'Evaluation', value: 'Validation & Scenario Testing' },
      { label: 'Runtime', value: 'Multi-Agent Workflow Engine' },
      { label: 'Retrieval', value: 'Contextual Retrieval & Search' },
      { label: 'Governance', value: 'Human Oversight Controls' },
    ],
    marqueeItems: [
      'AI APPLICATIONS',
      'AI AGENTS',
      'GENERATIVE AI & MACHINE LEARNING',
      'AI KNOWLEDGE SYSTEMS',
      'MODEL TRAINING & ADAPTATION',
      'DOCUMENT INTELLIGENCE',
    ],
    editorialSplit: {
      badge: 'SYSTEM FOCUS',
      headline: 'AI BUILT AROUND REAL BUSINESS WORK.',
      lead: 'We design AI systems around the work they need to support — from understanding information and assisting users to completing defined tasks and connecting with existing business systems.',
      editorialHighlight: {
        lead: 'Intelligent Systems',
        detail: 'AI applications, agents, machine learning, and knowledge systems.',
      },
      focusCards: [
        {
          tag: 'FOCUS 01',
          title: 'INTELLIGENT ASSISTANCE',
          subtitle: 'Understand, analyze & support decisions',
          description:
            'AI applications and knowledge systems help people work with information, search business knowledge, analyze data, and complete complex tasks.',
        },
        {
          tag: 'FOCUS 02',
          title: 'CONTROLLED EXECUTION',
          subtitle: 'Take action across workflows',
          description:
            'AI agents can work across approved tools and APIs to carry out defined tasks with permissions, guardrails, and human review where needed.',
        },
      ],
      problemSolved:
        'Manual knowledge work, repetitive decision-making, information that is difficult to access, and opportunities where AI could improve an existing product or workflow.',
      strategicAdvantage:
        'Multi-step business logic with defined rules, validation checks, and human oversight where appropriate.',
    },
    subCategories: [
      {
        id: 'ai-apps',
        slug: 'ai-application-development',
        anchorId: 'ai-apps',
        number: '01.1',
        title: 'AI Application Development',
        summary:
          'Custom applications and software that use AI to help businesses automate analysis, work with complex information, improve user experiences, and add intelligent functionality to existing workflows.',
        image: '/assets/images/solutions/ai/ai-sub-app-dev.png',
        bestSuitedFor: [
          'Adding AI features to existing software',
          'Building AI-powered business applications',
          'Automating analysis and information-heavy workflows',
          'Creating AI-assisted customer or employee experiences',
        ],
        whatWeBuild: [
          'AI-Powered Business Applications',
          'Custom AI Applications & Software',
          'LLM-Powered Application Experiences',
          'AI Features for Existing Software',
          'AI-Assisted Search, Analysis & Decision-Support Interfaces',
        ],
        whatWeHandle: [
          'Requirements, workflows & user experience planning',
          'Application architecture & interface development',
          'AI model integration & interaction design',
          'Prompt, context & response-flow design where required',
          'Data validation, output handling & error states',
          'Authentication, permissions & security controls where required',
          'Testing, deployment & production setup',
        ],
        whatYouReceive: [
          'Production-ready AI application or integrated AI feature',
          'Configured AI integrations and application workflows',
          'User interfaces and required access controls',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Model providers, reasoning frameworks, and backend architectures are selected based on the specific precision, privacy, cost, and response-speed requirements of the application.",
          technologies: ["Modern Web Frameworks","Python / REST APIs","Relational Databases","AI Model APIs","Streaming Interfaces"],
        },
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
        summary:
          'AI systems that can carry out defined multi-step tasks, work across approved business tools and APIs, and complete operational workflows within clear boundaries and human oversight.',
        image: '/assets/images/solutions/ai/ai-sub-agents.png',
        bestSuitedFor: [
          'Automating multi-step operational tasks across business tools',
          'Creating AI agents that take action across connected business systems',
          'Handling structured inquiries, triage, and workflow routing',
          'Assisting businesses with data collection, verification, and operational handoffs',
        ],
        whatWeBuild: [
          'Operational & Workflow Execution Agents',
          'Task-Specific Business & Backoffice Agents',
          'API & System Coordination Agents',
          'Triage, Routing & Inquiry Handling Agents',
          'Human-in-the-Loop Decision & Approval Workflows',
        ],
        whatWeHandle: [
          'Task definitions, operational boundaries & decision-flow planning',
          'Agent architecture, execution logic & state management',
          'Business tool connections & approved API integrations',
          'Input validation, output handling & behavioral guardrails',
          'Human review checkpoints & escalation triggers where required',
          'Permission boundaries, error handling & fallback paths',
          'Scenario testing, evaluation & production deployment',
        ],
        whatYouReceive: [
          'Production-ready AI agent system with configured execution logic',
          'Configured tool connections, API actions & event triggers',
          'Operational boundaries, guardrails & fallback rules',
          'Human escalation workflows where required',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "State-driven execution graphs and strictly validated data schemas ensure agents operate within defined parameters and fail gracefully to human operators when uncertain.",
          technologies: ["Agent Orchestration Frameworks","API & Webhook Integrations","State Management & Queues","Relational Databases","Validation Schemas"],
        },
        enableSeoPage: false,
        tagline: 'Autonomous Systems That Reason, Plan, and Execute Mission-Critical Workflows.',
        editorialSubtitle:
          'Autonomous multi-agent architectures engineered with structured state machines, schema validation guardrails, and human-in-the-loop governance.',
        heroHeadline: {
          prefix: 'DETERMINISTIC',
          accent: 'MULTI-AGENT',
          suffix: 'SYSTEMS.',
        },
        problemStatement: {
          eyebrow: 'OPERATIONAL BOTTLENECK',
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
            'We build stateful multi-agent systems with strict schema validation guardrails, transactional rollback recovery, and controlled API execution.',
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
            technologies: ['State Machine Engines', 'Workflow Orchestration', 'Distributed Memory'],
          },
          {
            step: 'LAYER 03',
            title: 'Tool Execution & API Integration',
            role: 'Secure Mutation & Query',
            description: 'Executes authenticated read/write operations against CRM, SQL databases, Stripe, and internal ERPs with transaction safety.',
            technologies: ['High-Performance APIs', 'Relational Databases', 'Payment Connectors', 'CRM Integrations'],
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
            answer: 'We never allow raw LLMs direct execution access. Every agent operates within a deterministic state machine where tool calls must conform to strict schemas, and any high-risk action requires policy verification or human-in-the-loop signoff.',
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
            tags: ['Agent Frameworks', 'Customer Support APIs', 'WebSockets', 'Vector Indexes'],
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
            tags: ['Multi-Agent Orchestrators', 'State Machines', 'Distributed Memory', 'Workflow Engines'],
          },
        ],
      },
      {
        id: 'genai-ml',
        slug: 'genai-machine-learning',
        anchorId: 'genai-ml',
        number: '01.3',
        title: 'Generative AI & Machine Learning Development',
        summary:
          'Custom machine-learning models, model adaptation, and specialized AI pipelines designed around business data, domain terminology, and specific analytical, classification, or predictive tasks.',
        image: '/assets/images/solutions/ai/ai-sub-genai-ml.png',
        bestSuitedFor: [
          'Adapting AI models to business-specific terminology, formats, or tasks',
          'Building custom classification, scoring, extraction, or prediction models',
          'Automating high-volume text, document, or data analysis',
          'Comparing model quality, cost, and response time against project requirements',
        ],
        whatWeBuild: [
          'Task-Specific Machine Learning Models',
          'Domain-Adapted Generative AI & Language Pipelines',
          'Classification, Scoring, Extraction & Prediction Models',
          'Model Evaluation & Benchmarking Systems',
          'Production Inference APIs',
        ],
        whatWeHandle: [
          'Business data assessment, cleaning & preparation',
          'Model selection, adaptation & fine-tuning where appropriate',
          'Evaluation against representative real-world test data',
          'Inference API development & production optimization',
          'Output validation, confidence thresholds & fallback handling',
          'Deployment setup for the agreed infrastructure environment',
        ],
        whatYouReceive: [
          'Production-ready model integration or inference endpoint',
          'Adapted model artifacts where applicable and permitted by the underlying model or license',
          'Documented evaluation results using relevant quality, performance, and cost measurements',
          'Data preparation and validation workflows developed within the project scope',
          'Integration guidance for connected applications and systems',
          'Project-specific technical documentation',
          'Client-owned custom project code and IP, subject to third-party technologies, models, data rights, and licenses',
        ],
        technicalApproach: {
          description: "Parameter-efficient fine-tuning (LoRA/PEFT) and optimized inference runtimes deliver domain precision without the high infrastructure costs of training from scratch.",
          technologies: ["Machine Learning Frameworks","Parameter-Efficient Fine-Tuning","Inference Optimization Runtimes","Evaluation & Benchmarking Suites"],
        },
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
            tags: ['Open Model Repositories', 'Parameter-Efficient Fine-Tuning', 'Inference Servers', 'GPU Compute Runtimes'],
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
        title: 'AI Knowledge Systems & RAG',
        summary:
          'Knowledge retrieval and search systems that connect internal documents, databases, and policies so businesses can find relevant information, ask questions, and receive grounded answers with source attribution.',
        image: '/assets/images/solutions/ai/ai-sub-knowledge-rag.png',
        bestSuitedFor: [
          'Connecting fragmented company knowledge across tools and repositories',
          'Enabling faster search across manuals, policies, procedures, and internal documentation',
          'Extracting structured information from complex documents and records',
          'Answering employee or customer questions using approved organizational knowledge',
        ],
        whatWeBuild: [
          'Enterprise Knowledge Search & Retrieval Systems',
          'Retrieval-Augmented Generation (RAG) Systems',
          'Document Intelligence & Information Extraction Pipelines',
          'Grounded Q&A Interfaces with Source Attribution',
          'Automated Knowledge Ingestion & Synchronization Pipelines',
        ],
        whatWeHandle: [
          'Document parsing, text extraction & metadata structuring',
          'Chunking, embedding & retrieval architecture',
          'Keyword and semantic search with re-ranking where appropriate',
          'Source attribution, retrieval safeguards & confidence handling',
          'Document access controls & permission boundaries where required',
          'Knowledge update and synchronization workflows',
          'Testing against representative queries & deployment setup',
        ],
        whatYouReceive: [
          'Production-ready knowledge retrieval system or integrated search experience',
          'Configured document ingestion and synchronization pipelines',
          'Retrieval system with source attribution',
          'Access-control configuration where required',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & maintenance guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Hybrid search combining keyword matching with dense semantic embeddings and reranking ensures accurate retrieval while strictly enforcing document access permissions.",
          technologies: ["Vector & Semantic Search Indexes","Document Ingestion Pipelines","Relational Databases","Retrieval & Reranking Layers"],
        },
        services: [
          {
            name: 'Enterprise RAG Systems',
            scope: 'Production-grade retrieval augmented generation featuring semantic chunking, re-ranking, and dynamic context compression.',
            deliverables: ['Hybrid dense/sparse vector index', 'Cohere / FlashRank re-ranking layer', 'Source citation streaming UI'],
            tags: ['Vector Databases', 'Semantic Search', 'Re-Ranking Engines', 'Relational & Vector Storage'],
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
        title: 'CONTROLLED EXECUTION',
        stat: 'BOUNDARY CONTROLS',
        category: 'ENGINEERING STANDARD',
        description: 'AI actions operate within defined permissions, tools, and workflow boundaries.',
        image: '/assets/images/solutions/ai/ai-specimen.png',
        href: '#core-services',
      },
      {
        title: 'GROUNDED CONTEXT',
        stat: 'SOURCE RETRIEVAL',
        category: 'ENGINEERING STANDARD',
        description: 'Where AI depends on business knowledge, relevant sources are retrieved and connected to provide context for responses.',
        image: '/assets/images/solutions/ai/ai-specimen.png',
        href: '#core-services',
      },
      {
        title: 'HUMAN OVERSIGHT',
        stat: 'HUMAN REVIEW',
        category: 'ENGINEERING STANDARD',
        description: 'Human review and escalation can be introduced where decisions or outputs require additional control.',
        image: '/assets/images/solutions/ai/ai-specimen.png',
        href: '#core-services',
      },
      {
        title: 'EVALUATION & FAILURE HANDLING',
        stat: 'RELIABILITY CHECKS',
        category: 'ENGINEERING STANDARD',
        description: 'Systems are tested against realistic scenarios with validation, fallbacks, and error handling where appropriate.',
        image: '/assets/images/solutions/ai/ai-specimen.png',
        href: '#core-services',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'UNDERSTAND',
        iconType: 'search',
        description: 'Understand the business problem, workflow, data, users, and where AI is genuinely useful.',
        image: '/assets/images/solutions/methodology/methodology-01-understand.png',
      },
      {
        step: '02',
        name: 'DESIGN',
        iconType: 'cube',
        description: 'Define system architecture, AI behavior, integrations, permissions, guardrails, and prototypes.',
        image: '/assets/images/solutions/methodology/methodology-02-design.png',
      },
      {
        step: '03',
        name: 'BUILD & VALIDATE',
        iconType: 'lightbulb',
        description: 'Engineer the working system, connect required tools and data, and test against realistic scenarios.',
        image: '/assets/images/solutions/methodology/methodology-03-build.png',
      },
      {
        step: '04',
        name: 'DEPLOY & EVOLVE',
        iconType: 'check',
        description: 'Deploy the system, observe how it behaves, resolve edge cases, and evolve it as requirements change.',
        image: '/assets/images/solutions/methodology/methodology-04-deploy.png',
      },
    ],
    featuredProjects: [
      {
        title: 'AUTONOMOUS MULTIMODAL AGENTIC SWARM',
        category: 'AI & MULTI-AGENT SYSTEMS',
        metric: 'TECHNICAL DEMONSTRATION // Multi-Step Agent Workflow',
        year: 'ENTERPRISE PRODUCTION, 2026',
        image: '/assets/images/solutions/ai/ai-specimen.png',
        href: '/work/ai-agentic-swarm',
      },
      {
        title: 'ENTERPRISE NEURAL KNOWLEDGE ENGINE',
        category: 'ENTERPRISE RAG & VECTORS',
        metric: 'KAIROTRIX BUILD // Document Knowledge System',
        year: 'GLOBAL KNOWLEDGE BASE, 2026',
        image: '/assets/images/solutions/ai/ai-specimen.png',
        href: '/work/enterprise-rag-engine',
      },
      {
        title: 'FINANCIAL ANOMALY AI SURVEILLANCE',
        category: 'DECISION ML & TIME-SERIES',
        metric: 'EXPERIMENT // Time-Series Anomaly Detection',
        year: 'FINANCIAL RISK PLATFORM, 2026',
        image: '/assets/images/solutions/ai/ai-specimen.png',
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
          { name: 'Inference Runtimes', role: 'High-throughput model serving & batch processing' },
        ],
      },
      {
        category: 'Agent & Orchestration Frameworks',
        items: [
          { name: 'Agent Orchestration Frameworks', role: 'Stateful multi-agent graphs & tool execution' },
          { name: 'Vercel AI SDK', role: 'Streaming UI & reactive client state' },
          { name: 'Workflow Orchestration Engines', role: 'Durable long-running execution & rollback handling' },
          { name: 'FastAPI', role: 'Asynchronous high-concurrency microservices' },
        ],
      },
      {
        category: 'Vector Databases & Retrieval',
        items: [
          { name: 'Qdrant', role: 'High-performance Rust vector engine' },
          { name: 'Pinecone', role: 'Managed serverless vector search' },
          { name: 'Vector Storage & Search', role: 'Relational & semantic vector search infrastructure' },
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
    ctaHeadline: 'Have an AI problem to solve?',
    ctaDescription:
      'Tell us what you want to automate, analyze, search, assist, or connect. We’ll help identify whether the right answer is an AI application, agent, knowledge system, machine-learning model — or something simpler.',
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
      'KAIROTRIX designs and engineers custom software, web platforms, and digital products built around real operational workflows, reliable architecture, and clear user experiences.',
    image: '/assets/images/solutions/sub_hero/s2.png',
    gridImage: '/assets/images/solutions/grid/grid-software-engineering.png',
    systemFocusImage: '/assets/images/solutions/software/software-system-focus.png',
    heroVideo: '/assets/videos/software-service.mp4',
    statusBadge: 'Production Grade',
    engineeringFocus: [
      { label: 'Architecture', value: 'Modular System Design & Clean APIs' },
      { label: 'Runtime', value: 'Type-Safe Full-Stack Architecture' },
      { label: 'Performance', value: 'Optimized Query & API Paths' },
      { label: 'Deployment', value: 'Resilient Cloud Deployment' },
    ],
    marqueeItems: [
      'CUSTOM SOFTWARE',
      'WEB APPLICATIONS',
      'PRODUCT DEVELOPMENT',
      'PRODUCT ENGINEERING',
      'PRODUCT UI/UX',
      'DESIGN SYSTEMS',
    ],
    editorialSplit: {
      badge: 'SYSTEM FOCUS',
      headline: 'SOFTWARE ENGINEERED FOR HOW YOUR BUSINESS OPERATES.',
      lead: 'We build purposeful software around your specific operational rules and product requirements — replacing rigid off-the-shelf tools and fragmented spreadsheets with software that fits your business.',
      editorialHighlight: {
        lead: 'Operational Software',
        detail: 'Custom business software, web platforms, and digital products.',
      },
      focusCards: [
        {
          tag: 'FOCUS 01',
          title: 'OPERATIONAL FIT',
          subtitle: 'Built around unique business logic',
          description:
            'Custom software and internal tools engineered around the way your teams actually work, handle data, and manage processes.',
        },
        {
          tag: 'FOCUS 02',
          title: 'USABLE PRODUCT EXPERIENCES',
          subtitle: 'Intuitive, responsive interfaces',
          description:
            'Web applications, portals, and software products designed for speed, clarity, accessibility, and a consistent experience across devices.',
        },
        {
          tag: 'FOCUS 03',
          title: 'ADAPTABLE ARCHITECTURE',
          subtitle: 'Ready for ongoing growth',
          description:
            'Clean modular foundations, structured data models, and integration-ready APIs that can evolve as your business needs change.',
        },
      ],
      problemSolved:
        'Off-the-shelf software that no longer fits the workflow, growing workarounds, disconnected processes, or a product idea that requires purpose-built software.',
      strategicAdvantage:
        'Clean, modular, typed source code engineered for maintainability, clarity, and reliable operation.',
    },
    systemsEquation: {
      inputs: [
        'Custom Software Engine',
        'Distributed Services',
        'Database Architecture',
        'Cloud Deployment',
      ],
      output: 'Scalable Digital Platform',
      rationale:
        'KAIROTRIX engineers digital platforms where modular business logic, structured databases, and resilient cloud infrastructure operate together reliably.',
    },
    subCategories: [
      {
        id: 'custom-software',
        anchorId: 'custom-software',
        number: '02.1',
        title: 'Custom Software Development',
        summary:
          'Purpose-built business software designed around the workflows, data, rules, and operational requirements that standard software does not fit well.',
        philosophy: 'We design and build software around your business—not around a template.',
        engagementLifecycle: ['Business & Technical Discovery', 'Domain Architecture & Schema', 'Sprint-Based Engineering', 'Zero-Downtime Deployment'],
        image: '/assets/images/solutions/software/soft-sub-business-software.png',
        bestSuitedFor: [
          'Replacing spreadsheets, manual workarounds, and outdated legacy systems',
          'Supporting workflows and business processes that standard software cannot easily accommodate',
          'Centralizing business rules, operational data, and internal processes',
          'Reducing dependence on rigid software limitations and fragmented tools',
        ],
        whatWeBuild: [
          'Custom Business Management Systems',
          'Internal Operations & Administration Platforms',
          'Workflow-Driven Business Software',
          'Back-Office Systems & Operational Tools',
          'Custom Management & Process Applications',
        ],
        whatWeHandle: [
          'Requirements, workflow mapping & data architecture',
          'Application architecture & interface development',
          'Business logic, rules & workflow implementation',
          'Data structures, APIs & system integrations where required',
          'Authentication, permissions & security controls where required',
          'Testing, quality assurance & performance optimization',
          'Deployment setup for the agreed environment',
        ],
        whatYouReceive: [
          'Production-ready custom software system',
          'Configured data, application & integration architecture',
          'User access and permission controls where required',
          'Required workflows, business rules & system integrations',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Modular application architectures with typed domain models ensure your software remains clean, testable, and maintainable as business requirements evolve.",
          technologies: ["Typed Backend Services","Relational Databases","Caching & Message Queues","Cloud Infrastructure & CI/CD"],
        },
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
        summary:
          'Browser-based applications, portals, and interactive web platforms designed for reliable performance, responsive access, and consistent use across modern devices.',
        philosophy: 'Blazing-fast, reactive web platforms engineered for seamless user adoption, zero lag, and mission-critical workflows.',
        engagementLifecycle: ['UX & Flow Discovery', 'Component Design System', 'Full-Stack Implementation', 'Edge Global Deployment'],
        image: '/assets/images/solutions/software/soft-sub-web-saas.png',
        bestSuitedFor: [
          'Giving customers, partners, or employees secure access through the web',
          'Creating customer portals, self-service accounts, and interactive business tools',
          'Building browser-based platforms and digital service experiences',
          'Modernizing outdated portals into faster, responsive web applications',
        ],
        whatWeBuild: [
          'Full-Stack Web Applications & Platforms',
          'Customer, Client & Partner Portals',
          'Interactive Management & Administration Interfaces',
          'Browser-Based Business Applications',
          'Responsive Web Applications & Progressive Web Apps',
        ],
        whatWeHandle: [
          'Requirements, user journeys & responsive interface planning',
          'Frontend interface development & interaction implementation',
          'Backend services, APIs & data structures',
          'User authentication, account access & permissions where required',
          'Application performance, caching & response optimization',
          'Cross-browser and multi-device testing',
          'Deployment setup for the agreed environment',
        ],
        whatYouReceive: [
          'Production-ready web application for modern browsers and devices',
          'Configured application, API & data architecture',
          'User authentication and access controls where required',
          'Responsive interfaces tested across desktop, tablet, and mobile',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Server-rendered components combined with strategic edge caching deliver fast initial page loads, smooth navigation, and solid SEO capabilities.",
          technologies: ["Server-Rendered Frameworks","Responsive UI Components","Secure Authentication & APIs","Relational Databases"],
        },
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
        summary:
          'End-to-end software product engineering for building, launching, and evolving digital products—from early concepts and MVPs to mature platforms and major product releases.',
        philosophy: 'From initial technical blueprint to revenue-generating SaaS—disciplined product engineering built to scale.',
        engagementLifecycle: ['Product Scope & Roadmap', 'Multi-Tenant Architecture', 'Core Feature Velocity', 'Go-To-Market Launch'],
        image: '/assets/images/solutions/software/soft-sub-mvp-product.png',
        bestSuitedFor: [
          'Bringing new digital products from concept through development and launch',
          'Building new software products or product lines for established businesses',
          'Re-engineering early prototypes or existing products for reliability and scale',
          'Extending existing products with new features, modules, and technical improvements',
        ],
        whatWeBuild: [
          'Digital Software Products & Platforms',
          'Minimum Viable Products (MVPs)',
          'Software-as-a-Service (SaaS) Products',
          'Multi-Tenant & Account-Based Platforms',
          'Product Feature Modules & Expansion Systems',
          'Developer APIs & Product Extension Interfaces',
        ],
        whatWeHandle: [
          'Product scoping, technical planning & release roadmapping',
          'Product architecture, data modeling & engineering foundations',
          'Core feature development & user-flow implementation',
          'Account, onboarding, subscription & billing flows where required',
          'Multi-tenant architecture & access controls where required',
          'Testing, performance checks & release readiness',
          'Deployment setup for the agreed environment',
          'Ongoing technical evolution planning where part of the engagement',
        ],
        whatYouReceive: [
          'Production-ready digital product, MVP, or major product release',
          'Modular codebase designed for continued product development',
          'Configured product workflows and account systems where required',
          'Product integrations and supporting APIs where required',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & architecture guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Iterative milestone releases backed by automated testing pipelines allow fast time-to-market while keeping technical debt and rework low.",
          technologies: ["Full-Stack Application Frameworks","Billing & Subscription Gateways","Relational Databases","Cloud Infrastructure & Containers"],
        },
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
        summary:
          'User research, interface design, interactive prototypes, and reusable design systems created to make digital products easier to use, consistent across features, and clearer to implement.',
        philosophy: 'Design systems and accessible interfaces that eliminate user friction and bridge the gap between design and production code.',
        engagementLifecycle: ['User Journey Mapping', 'Design Token Architecture', 'Component Library Build', 'Design-to-Code Handoff'],
        image: '/assets/images/solutions/software/soft-sub-ui-ux.png',
        bestSuitedFor: [
          'Designing new software products, applications, or platforms',
          'Establishing consistent interface patterns across growing digital products',
          'Turning complex product workflows into clear, usable experiences',
          'Creating a shared design foundation for product and engineering work',
        ],
        whatWeBuild: [
          'Product Interfaces & Application Screen Flows',
          'Reusable UI Component Libraries & Design Systems',
          'Interactive Prototypes for Testing & Review',
          'Design Tokens & Interface Standards',
          'Responsive Application Layouts for Desktop, Tablet & Mobile',
        ],
        whatWeHandle: [
          'User journey mapping, workflow analysis & information architecture',
          'Wireframing & high-fidelity interface design',
          'Interaction patterns, visual hierarchy & component consistency',
          'Responsive layouts across required screen sizes',
          'Accessibility considerations & usability consistency',
          'Design system structure & developer handoff specifications',
        ],
        whatYouReceive: [
          'Implementation-ready interface designs and design system assets',
          'Interactive prototypes for testing, review & engineering guidance',
          'Required screen designs and responsive layout specifications',
          'Organized components, design tokens, typography & color standards',
          'Developer handoff notes and implementation specifications',
          'Client-owned custom design files, assets, and documentation, subject to third-party licenses',
        ],
        technicalApproach: {
          description: "Design tokens mapped directly to CSS variables ensure visual consistency across screens and seamless handoff to frontend engineers.",
          technologies: ["Interface Design & Wireframing Tools","Design Token Systems","Clickable Prototyping","Accessibility Evaluation (WCAG)"],
        },
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
        title: 'MAINTAINABLE ARCHITECTURE',
        stat: 'MODULAR DESIGN',
        category: 'ENGINEERING STANDARD',
        description: 'Software structured for clarity, maintainability, and future changes.',
        image: '/assets/images/solutions/software/software-specimen.png',
        href: '#core-services',
      },
      {
        title: 'CLEAR DATA STRUCTURES',
        stat: 'DATA MODELING',
        category: 'ENGINEERING STANDARD',
        description: 'Data models designed around the information the system actually needs to manage.',
        image: '/assets/images/solutions/software/software-specimen.png',
        href: '#core-services',
      },
      {
        title: 'TESTING & QUALITY ASSURANCE',
        stat: 'QUALITY CONTROLS',
        category: 'ENGINEERING STANDARD',
        description: 'Critical workflows, business rules, and edge cases are tested according to project requirements.',
        image: '/assets/images/solutions/software/software-specimen.png',
        href: '#core-services',
      },
      {
        title: 'SECURE ACCESS & INTEGRATION',
        stat: 'ACCESS & INTEGRATION',
        category: 'ENGINEERING STANDARD',
        description: 'Authentication, permissions, and system connections are designed according to the application’s needs.',
        image: '/assets/images/solutions/software/software-specimen.png',
        href: '#core-services',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'UNDERSTAND',
        iconType: 'search',
        description: 'Review the business problem, operational workflows, user requirements, and technical constraints.',
        image: '/assets/images/solutions/methodology/methodology-01-understand.png',
      },
      {
        step: '02',
        name: 'DESIGN',
        iconType: 'cube',
        description: 'Map system architecture, interface user journeys, database schemas, and API contracts.',
        image: '/assets/images/solutions/methodology/methodology-02-design.png',
      },
      {
        step: '03',
        name: 'BUILD & TEST',
        iconType: 'lightbulb',
        description: 'Engineer production software with modular code, testing critical paths, and validating user workflows.',
        image: '/assets/images/solutions/methodology/methodology-03-build.png',
      },
      {
        step: '04',
        name: 'DEPLOY & EVOLVE',
        iconType: 'check',
        description: 'Launch to production, monitor stability, provide documentation, and iterate as business requirements expand.',
        image: '/assets/images/solutions/methodology/methodology-04-deploy.png',
      },
    ],
    featuredProjects: [
      {
        title: 'ULTRA-LOW LATENCY FINTECH TRADING PORTAL',
        category: 'PRODUCT ENGINEERING',
        metric: 'TECHNICAL DEMONSTRATION // High-Throughput Trading Interface',
        year: 'FINANCIAL MARKETS, 2026',
        image: '/assets/images/solutions/software/software-specimen.png',
        href: '/work/fintech-trading-portal',
      },
      {
        title: 'MULTI-TENANT B2B SAAS ENTERPRISE ENGINE',
        category: 'FULL-STACK ARCHITECTURE',
        metric: 'KAIROTRIX BUILD // Multi-Tenant SaaS Platform',
        year: 'COMMERCIAL PLATFORM, 2026',
        image: '/assets/images/solutions/software/software-specimen.png',
        href: '/work/saas-enterprise-engine',
      },
      {
        title: 'DISTRIBUTED CLOUD MICROSERVICES MESH',
        category: 'KUBERNETES & GO',
        metric: 'TECHNICAL DEMONSTRATION // Distributed Microservices Mesh',
        year: 'HIGH-CONCURRENCY CLUSTER, 2026',
        image: '/assets/images/solutions/software/software-specimen.png',
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
    ctaHeadline: 'Have a software problem to solve?',
    ctaDescription:
      'Tell us what you want to build, modernize, or replace. We’ll help you determine the right product scope, architecture, and technology stack before writing a line of code.',
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
      'KAIROTRIX builds dependable business process automations, workflow orchestration engines, document processing, and operational monitoring to reduce repetitive manual work.',
    image: '/assets/images/solutions/sub_hero/s3.png',
    gridImage: '/assets/images/solutions/grid/grid-automation-operations.png',
    systemFocusImage: '/assets/images/solutions/automation/automation-system-focus.png',
    statusBadge: 'Automated Operations',
    engineeringFocus: [
      { label: 'Reliability', value: 'Defined Execution Rules' },
      { label: 'Resilience', value: 'Retry & Recovery Logic' },
      { label: 'Exceptions', value: 'Human Review Routing' },
      { label: 'Visibility', value: 'Workflow Activity Logs' },
    ],
    marqueeItems: [
      'BUSINESS PROCESS AUTOMATION',
      'WORKFLOW AUTOMATION',
      'DOCUMENT AUTOMATION',
      'APPROVAL AUTOMATION',
      'COMMUNICATION AUTOMATION',
      'AI-POWERED AUTOMATION',
    ],
    editorialSplit: {
      badge: 'SYSTEM FOCUS',
      headline: 'KEEPING BUSINESS WORKFLOWS MOVING DEPENDABLY.',
      lead: 'We automate recurring operational tasks, departmental handoffs, and document processing so information moves smoothly between systems with less manual effort.',
      editorialHighlight: {
        lead: 'Operational Automation',
        detail: 'Process automation, task orchestration, and document workflows.',
      },
      focusCards: [
        {
          tag: 'FOCUS 01',
          title: 'REDUCED REPETITIVE WORK',
          subtitle: 'Less manual handoffs & data re-entry',
          description:
            'Automate routine tasks, notifications, and cross-tool data movement across sales, operations, support, and finance.',
        },
        {
          tag: 'FOCUS 02',
          title: 'COORDINATED EXECUTION',
          subtitle: 'Orderly multi-step workflows',
          description:
            'Coordinate multi-step operational processes with state management, dependency tracking, queues, and automated retry handling.',
        },
        {
          tag: 'FOCUS 03',
          title: 'OPERATIONAL CONTINUITY',
          subtitle: 'Visibility, monitoring & exception handling',
          description:
            'Surface workflow bottlenecks, log execution history, and route edge cases for human review before they disrupt operations.',
        },
      ],
      problemSolved:
        'Data-entry errors across systems, delayed approvals, manual document reviews, and operational bottlenecks that slow fulfillment.',
      strategicAdvantage:
        'Automated workflows help teams spend less time on routine administrative tasks while maintaining clear execution logs and review paths.',
    },
    subCategories: [
      {
        id: 'process-automation',
        anchorId: 'process-automation',
        number: '03.1',
        title: 'Business Process Automation',
        summary:
          'Automating manual handoffs, data transfers, and recurring operational tasks across your existing business tools so everyday processes run faster and with fewer errors.',
        image: '/assets/images/solutions/automation/auto-sub-workflow.png',
        bestSuitedFor: [
          'Eliminating repetitive manual data entry and copying between business software',
          'Automating customer, client, or vendor onboarding workflows',
          'Streamlining order processing, status updates, and fulfillment handoffs',
          'Connecting recurring administrative, billing, and departmental tasks',
        ],
        whatWeBuild: [
          'Customer & Client Onboarding Automations',
          'Order Processing & Fulfillment Workflows',
          'Billing, Invoicing & Notification Automations',
          'Cross-Tool Data Transfer & Handoff Routines',
          'Departmental Operational Workflows',
        ],
        whatWeHandle: [
          'Operational process mapping, trigger identification & workflow planning',
          'Conditional decision logic, branching rules & validation checks',
          'Tool connections, API integrations & webhook event handlers',
          'Error handling, retry behavior & failure alert notifications',
          'End-to-end testing against real-world operational scenarios',
          'Operational handover, team walkthrough & rollout support',
        ],
        whatYouReceive: [
          'Configured and tested business process automation workflows',
          'Connected business tools, triggers, and automated actions',
          'Failure notifications and alert routing where required',
          'Execution history, run logs, and operational visibility',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Idempotent workflow logic with automated retries and dead-letter queues ensures tasks run reliably without duplicate executions or silent failures.",
          technologies: ["Integration & Automation Platforms","Custom Scripting & Webhooks","API Connectors","Notification Services"],
        },
        services: [
          {
            name: 'Client Onboarding Automation',
            scope: 'Instant verification, automated account provisioning, contract generation, and initial welcome sequence orchestration.',
            deliverables: ['Document signature webhook listeners', 'Automated workspace provisioning scripts', 'CRM status synchronization'],
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
            tags: ['E-Commerce APIs', 'Asynchronous Queues', 'REST Services'],
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
        summary:
          'Reliable workflow systems that coordinate complex, multi-step operations across background tasks, connected services, and system events while maintaining progress, dependencies, retries, and failure recovery.',
        image: '/assets/images/solutions/automation/auto-sub-document-ocr.png',
        bestSuitedFor: [
          'Multi-step processes where tasks must happen in a defined order',
          'Long-running workflows that need to preserve progress if a system is interrupted',
          'Coordinating background jobs, system events, and dependent tasks',
          'Operations that require automated retries, recovery, or exception handling',
        ],
        whatWeBuild: [
          'Multi-Step Workflow Orchestration Systems',
          'Background Task & Job Processing Systems',
          'Event-Driven Workflow & Message Coordination',
          'Stateful Task Execution Systems',
          'Automated Retry, Recovery & Exception Workflows',
        ],
        whatWeHandle: [
          'Workflow steps, dependencies & execution-flow design',
          'Event triggers, background processing & system integrations',
          'Task timing, retries & failure-handling rules',
          'Parallel and sequential task coordination',
          'Exception handling and recovery behavior',
          'Workflow testing across failure and interruption scenarios',
          'Execution logging & operational visibility',
        ],
        whatYouReceive: [
          'Production-ready workflow orchestration system',
          'Configured background tasks, event triggers & processing workflows',
          'Retry, recovery & alerting rules where required',
          'Execution history and operational visibility',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Durable execution frameworks guarantee workflow state is preserved across network interruptions, external API downtime, and server restarts.",
          technologies: ["Durable Workflow Engines","Background Worker Queues","Stateful Event Handlers","Execution Tracing & Logs"],
        },
        services: [
          {
            name: 'Durable & Event-Driven Workflow Engines',
            scope: 'Durable execution engines where workflows survive server restarts, network failures, and third-party rate limits.',
            deliverables: ['Durable workflow step definitions', 'Automated retry and exponential backoff logic', 'Workflow state dashboard'],
            tags: ['Durable Workflows', 'Event-Driven Functions', 'TypeScript', 'Containers'],
          },
          {
            name: 'Event-Driven Webhook Meshes',
            scope: 'High-availability webhook ingestion layers that buffer, validate HMAC signatures, and fan out events reliably.',
            deliverables: ['HMAC verification middleware', 'Dead-letter queue (DLQ) replay UI', 'Redis-backed rate-limiter'],
            tags: ['In-Memory Queues', 'Job Workers', 'Web Frameworks', 'Cloud Queues'],
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
        summary:
          'Automated document workflows that generate paperwork from business data, extract information from incoming files, and move documents through structured review, approval, and sign-off processes.',
        image: '/assets/images/solutions/automation/auto-sub-approvals.png',
        bestSuitedFor: [
          'Generating standardized contracts, proposals, invoices, and reports automatically',
          'Extracting information from forms, receipts, invoices, and PDF documents',
          'Reducing delays in multi-person or multi-department review and approval processes',
          'Maintaining clear approval history and document records',
        ],
        whatWeBuild: [
          'Automated Document Generation Pipelines',
          'Document Data Extraction & Processing Workflows',
          'Multi-Step Review, Approval & Sign-Off Workflows',
          'E-Signature & Approval Integrations',
          'Document Audit Trail & Archival Systems',
        ],
        whatWeHandle: [
          'Document templates, dynamic fields & generation logic',
          'Structured data extraction from documents, files & forms',
          'Review rules, approval sequences & reminder workflows',
          'Integration with storage, e-signature and business systems where required',
          'Data completeness checks, validation rules & exception handling',
          'Testing across representative document formats and edge cases',
          'Deployment setup for the agreed environment',
        ],
        whatYouReceive: [
          'Production-ready document and approval automation workflow',
          'Configured document templates, fields & generation logic',
          'Document extraction and processing workflows where required',
          'Approval routing, history tracking & exception notifications',
          'Connected storage, e-signature or business-system integrations where required',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Document extraction pipelines pair structured layout parsers with validation schemas to convert unstructured documents into verified database records.",
          technologies: ["Document Parsing & OCR Engines","Template Generation Pipelines","Electronic Signature Integrations","Secure Cloud Storage"],
        },
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
            deliverables: ['Dynamic PDF generation engine', 'Electronic signature envelope flow', 'Clause versioning storage'],
            tags: ['Document Generation', 'E-Signature APIs', 'TypeScript'],
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
        summary:
          'Automated monitoring, scheduled maintenance, and operational response workflows designed to help digital systems stay reliable, surface issues quickly, and reduce routine manual oversight.',
        image: '/assets/images/solutions/automation/auto-sub-admin-tasks.png',
        bestSuitedFor: [
          'Replacing repetitive manual system checks with automated monitoring',
          'Automating routine maintenance, cleanup, and scheduled system tasks',
          'Detecting application errors, failed jobs, and service interruptions',
          'Improving operational visibility without constant manual supervision',
        ],
        whatWeBuild: [
          'Automated Application Health & Status Monitoring',
          'Scheduled Maintenance, Archival & Cleanup Workflows',
          'Operational Alerting & Incident Notification Workflows',
          'Automated Retry & Recovery Routines',
          'Operational Status & Execution Visibility',
        ],
        whatWeHandle: [
          'Health-check criteria, thresholds & monitoring logic',
          'Alert triggers and notification routing across approved channels',
          'Scheduled maintenance, cleanup & archival routines',
          'Error detection, retry behavior & escalation paths',
          'Testing across representative failure and recovery scenarios',
          'Deployment setup for scheduled jobs and operational services',
        ],
        whatYouReceive: [
          'Configured application monitoring and operational health checks',
          'Alerting and notification workflows',
          'Scheduled maintenance and cleanup routines where required',
          'Retry and recovery logic where required',
          'System health and execution visibility',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Lightweight cron runners and automated health probes monitor service status continuously with minimal infrastructure overhead.",
          technologies: ["System Health Probes","Scheduled Task Runners","Incident Alerting Channels","Uptime & Resource Monitors"],
        },
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
        title: 'RETRY & RECOVERY',
        stat: 'FAULT TOLERANCE',
        category: 'ENGINEERING STANDARD',
        description: 'Failed steps can be retried or recovered according to defined workflow rules, reducing the risk of duplicate processing.',
        image: '/assets/images/solutions/automation/automation-specimen.png',
        href: '#core-services',
      },
      {
        title: 'EXCEPTION HANDLING',
        stat: 'HUMAN REVIEW',
        category: 'ENGINEERING STANDARD',
        description: 'Unexpected or ambiguous situations can be routed for review instead of silently failing.',
        image: '/assets/images/solutions/automation/automation-specimen.png',
        href: '#core-services',
      },
      {
        title: 'EXECUTION VISIBILITY',
        stat: 'WORKFLOW HISTORY',
        category: 'ENGINEERING STANDARD',
        description: 'Logs and workflow history help show what happened and where issues occurred.',
        image: '/assets/images/solutions/automation/automation-specimen.png',
        href: '#core-services',
      },
      {
        title: 'OPERATIONAL MONITORING',
        stat: 'STATE ALERTS',
        category: 'ENGINEERING STANDARD',
        description: 'Important workflow or application states can be monitored and surfaced through alerts where required.',
        image: '/assets/images/solutions/automation/automation-specimen.png',
        href: '#core-services',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'MAP PROCESS',
        iconType: 'search',
        description: 'Audit existing operational steps, cross-tool handoffs, data inputs, and recurring manual bottlenecks.',
        image: '/assets/images/solutions/methodology/methodology-01-understand.png',
      },
      {
        step: '02',
        name: 'DESIGN AUTOMATION',
        iconType: 'cube',
        description: 'Define trigger conditions, workflow sequencing, validation rules, retry policies, and human review boundaries.',
        image: '/assets/images/solutions/methodology/methodology-02-design.png',
      },
      {
        step: '03',
        name: 'BUILD & VALIDATE',
        iconType: 'lightbulb',
        description: 'Build automation workflows, connect relevant APIs, and test against edge cases and failure scenarios.',
        image: '/assets/images/solutions/methodology/methodology-03-build.png',
      },
      {
        step: '04',
        name: 'DEPLOY & MONITOR',
        iconType: 'check',
        description: 'Roll out into production, observe live execution, configure alerts where needed, and refine workflows as operational needs shift.',
        image: '/assets/images/solutions/methodology/methodology-04-deploy.png',
      },
    ],
    featuredProjects: [
      {
        title: 'GLOBAL LOGISTICS AUTOMATED EVENT MESH',
        category: 'WORKFLOW AUTOMATION',
        metric: 'TECHNICAL DEMONSTRATION // Logistics Event Mesh',
        year: 'FREIGHT PLATFORM, 2026',
        image: '/assets/images/solutions/automation/automation-specimen.png',
        href: '/work/logistics-event-mesh',
      },
      {
        title: 'COMMERCIAL INVOICE INTELLIGENCE ENGINE',
        category: 'DOCUMENT AUTOMATION',
        metric: 'KAIROTRIX BUILD // Commercial Document Processor',
        year: 'FINANCIAL OPERATIONS, 2026',
        image: '/assets/images/solutions/automation/automation-specimen.png',
        href: '/work/commercial-document-processor',
      },
      {
        title: 'SELF-HEALING CLOUD INCIDENT ORCHESTRATOR',
        category: 'DIGITAL OPERATIONS',
        metric: 'TECHNICAL DEMONSTRATION // Operational Incident Workflow',
        year: 'CLOUD INFRASTRUCTURE, 2026',
        image: '/assets/images/solutions/automation/automation-specimen.png',
        href: '/work/incident-orchestrator',
      },
    ],
    techStack: [
      {
        category: 'Workflow & Orchestration Engines',
        items: [
          { name: 'Workflow Engines', role: 'Durable code-as-configuration workflows' },
          { name: 'Event Step Functions', role: 'Event-driven serverless step workflows' },
          { name: 'Asynchronous Job Queues', role: 'High-throughput queue and worker management' },
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
          { name: 'CRM & ERP Connectors', role: 'Bidirectional synchronization endpoints' },
          { name: 'Stripe API', role: 'Automated billing and payment event hooks' },
        ],
      },
    ],
    ctaHeadline: 'Have a workflow problem to solve?',
    ctaDescription:
      'Tell us what manual tasks, data handoffs, or approval bottlenecks are slowing your business down. We’ll help design an automation workflow that runs quietly and reliably in the background.',
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
      'KAIROTRIX modernizes legacy digital experiences, converts manual processes into structured digital systems, and refines interfaces for performance and ease of use.',
    image: '/assets/images/solutions/sub_hero/s4.png',
    gridImage: '/assets/images/solutions/grid/grid-digital-transformation.png',
    systemFocusImage: '/assets/images/solutions/digital/digital-system-focus.png',
    statusBadge: 'Modern Web Architecture',
    engineeringFocus: [
      { label: 'Modernization', value: 'Staged Migration Strategy' },
      { label: 'Architecture', value: 'Component-Driven Web Architecture' },
      { label: 'Delivery', value: 'Performance-Focused Implementation' },
      { label: 'Standards', value: 'Accessibility-Aware Design Systems' },
    ],
    marqueeItems: [
      'BUSINESS WEBSITES',
      'E-COMMERCE & CMS',
      'PROCESS DIGITIZATION',
      'DIGITAL WORKFLOWS',
      'UI/UX DESIGN',
      'WEBSITE MODERNIZATION',
    ],
    editorialSplit: {
      badge: 'SYSTEM FOCUS',
      headline: 'MODERNIZING HOW YOUR BUSINESS OPERATES DIGITALLY.',
      lead: 'We help organizations replace outdated tools, digitize paper- or spreadsheet-driven processes, and improve user experiences so operations run smoother and customers engage easily.',
      editorialHighlight: {
        lead: 'Digital Modernization',
        detail: 'Digital presence, process digitization, and user interface craft.',
      },
      focusCards: [
        {
          tag: 'FOCUS 01',
          title: 'PROCESS DIGITIZATION',
          subtitle: 'Convert manual work into structured systems',
          description:
            'Transform fragmented paper forms, spreadsheets, and manual steps into clear, standardized digital workflows.',
        },
        {
          tag: 'FOCUS 02',
          title: 'EXPERIENCE REFINEMENT',
          subtitle: 'Reduce usability friction & improve clarity',
          description:
            'Audit and redesign websites, portals, and customer interfaces to reduce usability friction, improve clarity, and support user engagement.',
        },
        {
          tag: 'FOCUS 03',
          title: 'MODERN CONTENT ARCHITECTURE',
          subtitle: 'Structured, maintainable publishing',
          description:
            'Modernize legacy CMS setups with structured headless publishing workflows that give teams direct control over routine content updates.',
        },
      ],
      problemSolved:
        'Outdated websites, manual paper or spreadsheet processes, confusing user interfaces, and sluggish customer experiences.',
      strategicAdvantage:
        'Modern, intuitive digital experiences backed by structured, maintainable web systems that evolve with your team.',
    },
    subCategories: [
      {
        id: 'website-development',
        anchorId: 'website-development',
        number: '04.1',
        title: 'Website Development & Web Craft',
        summary:
          'Modern business websites, digital flagships, and web experiences designed for clear communication, responsive access, strong performance, and engaging presentation across devices.',
        image: '/assets/images/solutions/digital/digital-sub-web-dev.png',
        bestSuitedFor: [
          'Replacing outdated, slow, or difficult-to-maintain business websites',
          'Launching modern corporate websites or digital flagships',
          'Improving mobile usability, page performance, and content structure',
          'Building interactive, content-rich web experiences with purposeful motion',
        ],
        whatWeBuild: [
          'Corporate & Business Websites',
          'Digital Flagships & Brand-Focused Web Platforms',
          'Interactive Web Experiences & Presentation Sites',
          'Marketing, Content & Resource Hubs',
          'Multi-Region & Multi-Language Web Platforms',
        ],
        whatWeHandle: [
          'Information architecture, page hierarchy & content structure',
          'Responsive interface design & interaction implementation',
          'Performance optimization & Core Web Vitals improvements',
          'Technical SEO structure, semantic markup & metadata',
          'Content integration and CMS setup where required',
          'Accessibility considerations, cross-browser testing & deployment setup',
        ],
        whatYouReceive: [
          'Production-ready, responsive website',
          'Structured page templates and content workflows where required',
          'Search-engine-ready technical structure and metadata',
          'Responsive layouts and optimized web assets',
          'CMS configuration where included in project scope',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Static generation and edge caching deliver fast page loads, reliable uptime, and responsive mobile experiences across all devices.",
          technologies: ["Modern Static & Server Frameworks","Responsive UI & Motion Systems","Edge Delivery Networks (CDN)","Technical SEO & Metadata Tooling"],
        },
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
        summary:
          'Transforming manual, paper-based, spreadsheet-driven, and fragmented business processes into structured digital workflows, centralized records, and easier-to-use operational tools.',
        image: '/assets/images/solutions/digital/digital-sub-process-digitization.png',
        bestSuitedFor: [
          'Replacing paper forms, physical logs, and manual tracking with digital workflows',
          'Moving critical operations out of complex or fragile spreadsheets',
          'Centralizing operational records that are scattered across files, departments, or systems',
          'Improving how field and office teams capture, track, search, and update business information',
        ],
        whatWeBuild: [
          'Spreadsheet-to-Digital Workflow Systems',
          'Digital Operations & Tracking Tools',
          'Structured Data Capture & Digital Form Workflows',
          'Centralized Operational Record Systems',
          'Activity, Status & Process Tracking Interfaces',
        ],
        whatWeHandle: [
          'Existing process assessment & workflow mapping',
          'Data structure planning & operational record modeling',
          'Digital forms, validation rules & step-by-step workflow design',
          'Historical data cleanup, validation & migration where required',
          'User access, permissions & security controls where required',
          'Testing against real operational scenarios',
          'User onboarding & rollout guidance where required',
        ],
        whatYouReceive: [
          'Production-ready digital workflow or operational tracking system',
          'Structured digital records and data model',
          'Migrated historical data where included in project scope',
          'User access and permission controls where required',
          'Search, filtering, tracking and export functions where required',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Structured relational databases combined with guided form interfaces eliminate data duplication and spreadsheet formula errors.",
          technologies: ["Relational Databases","Web-Based Data Entry Forms","Role-Based Access Controls","Reporting & Export Utilities"],
        },
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
        summary:
          'User research, usability audits, and interface redesigns that identify friction in existing digital experiences and improve clarity, accessibility, and ease of use.',
        image: '/assets/images/solutions/digital/digital-sub-legacy-upgrade.png',
        bestSuitedFor: [
          'Existing portals, websites, or applications with confusing user journeys or high drop-off',
          'Internal tools that are difficult for employees to learn or use efficiently',
          'Reviewing and improving accessibility across existing digital interfaces',
          'Modernizing outdated screens, workflows, and interaction patterns',
        ],
        whatWeBuild: [
          'UX Audit Reports & Prioritized Recommendations',
          'Redesigned User Journeys & Screen Flows',
          'High-Fidelity Interface Redesigns',
          'Interactive Prototypes for Testing & Review',
          'Usability & Accessibility Improvement Plans',
        ],
        whatWeHandle: [
          'User journey mapping, workflow friction analysis & usability audits',
          'Information hierarchy & interface restructuring',
          'Wireframing & redesigned interface concepts',
          'Interactive prototypes & user feedback testing where required',
          'Accessibility review & usability guidance',
          'Implementation specifications & developer handoff notes',
        ],
        whatYouReceive: [
          'Usability assessment with prioritized improvement opportunities',
          'Redesigned interface screens and responsive layout specifications',
          'Interactive prototypes for testing, review & engineering guidance',
          'Interface style and hierarchy guidance where required',
          'Developer handoff notes and implementation specifications',
          'Client-owned custom design files, assets, and documentation, subject to third-party licenses',
        ],
        technicalApproach: {
          description: "Human-centered design frameworks combined with iterative user testing ensure software workflows are intuitive and friction-free before code is written.",
          technologies: ["Usability & Journey Mapping Tools","Interactive Prototyping","Accessibility Audit Standards","Design Specification Specs"],
        },
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
        summary:
          'Modernizing content management and web architecture by separating content editing from frontend presentation, creating structured publishing workflows, and improving how content is managed, delivered, and maintained.',
        image: '/assets/images/solutions/digital/digital-sub-ux-experience.png',
        bestSuitedFor: [
          'Replacing or decoupling slow, fragile, or plugin-heavy legacy CMS setups',
          'Giving content teams more control over routine publishing and page updates',
          'Managing content across multiple websites, applications, or regional experiences from a shared source',
          'Modernizing content delivery, performance, and maintainability without rebuilding every part of the publishing workflow',
        ],
        whatWeBuild: [
          'Headless Content Management Architectures',
          'Decoupled Frontend & CMS Integrations',
          'Structured Content Models & Editorial Workflows',
          'Content Migration & URL Preservation Pipelines',
          'Media Optimization & Asset Delivery Workflows',
        ],
        whatWeHandle: [
          'Content modeling & editorial workflow planning',
          'Structured content design for pages, articles & media',
          'Content migration, URL preservation & redirect planning',
          'Frontend integration with content APIs',
          'Preview, draft & publishing workflows where required',
          'Performance, caching & asset-delivery configuration',
          'Editorial walkthroughs & publishing guidance',
        ],
        whatYouReceive: [
          'Configured headless CMS and structured content model',
          'Connected frontend and content delivery setup',
          'Preview and publishing workflows where required',
          'Migrated content and redirect configuration where included in scope',
          'Media and asset delivery configuration where required',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation & editorial guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Decoupling content authoring from frontend presentation gives marketing teams publishing freedom without compromising page speed or site security.",
          technologies: ["Headless Content Platforms","Decoupled Web Frontends","Content APIs & Webhooks","Edge Caching & Media Optimization"],
        },
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
        title: 'USABILITY & ACCESSIBILITY',
        stat: 'INTERACTION DESIGN',
        category: 'ENGINEERING STANDARD',
        description: 'Clear hierarchy, accessible interaction patterns, and responsive experiences across devices.',
        image: '/assets/images/solutions/digital/digital-specimen.png',
        href: '#core-services',
      },
      {
        title: 'PERFORMANCE & MAINTAINABILITY',
        stat: 'PERFORMANCE OPTIMIZATION',
        category: 'ENGINEERING STANDARD',
        description: 'Modern implementation practices that support efficient delivery, easier maintenance, and responsive experiences.',
        image: '/assets/images/solutions/digital/digital-specimen.png',
        href: '#core-services',
      },
      {
        title: 'STRUCTURED CONTENT & DATA',
        stat: 'CONTENT STRUCTURE',
        category: 'ENGINEERING STANDARD',
        description: 'Content and operational information are organized so they are easier to manage and evolve.',
        image: '/assets/images/solutions/digital/digital-specimen.png',
        href: '#core-services',
      },
      {
        title: 'CONTROLLED MODERNIZATION',
        stat: 'STAGED MIGRATION',
        category: 'ENGINEERING STANDARD',
        description: 'Migrations and redesigns are planned to reduce disruption and preserve important content, URLs, or workflows where required.',
        image: '/assets/images/solutions/digital/digital-specimen.png',
        href: '#core-services',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'UNDERSTAND CURRENT STATE',
        iconType: 'search',
        description: 'Audit existing processes, current websites, content structures, and user friction points.',
        image: '/assets/images/solutions/methodology/methodology-01-understand.png',
      },
      {
        step: '02',
        name: 'IDENTIFY FRICTION',
        iconType: 'cube',
        description: 'Map operational bottlenecks, manual workarounds, usability issues, and system dependencies that need modernizing.',
        image: '/assets/images/solutions/methodology/methodology-02-design.png',
      },
      {
        step: '03',
        name: 'REDESIGN & MODERNIZE',
        iconType: 'lightbulb',
        description: 'Build modern digital workflows, craft responsive interfaces, and organize content into structured systems.',
        image: '/assets/images/solutions/methodology/methodology-03-build.png',
      },
      {
        step: '04',
        name: 'LAUNCH & EVOLVE',
        iconType: 'check',
        description: 'Deploy in planned stages, train internal teams, monitor user engagement, and iterate based on real feedback.',
        image: '/assets/images/solutions/methodology/methodology-04-deploy.png',
      },
    ],
    featuredProjects: [
      {
        title: 'KAIROTRIX DIGITAL ARCHITECTURE PLATFORM',
        category: 'MODERN WEB CRAFT',
        metric: 'KAIROTRIX BUILD // Digital Architecture Platform',
        year: 'PRODUCTION SYSTEM, 2026',
        image: '/assets/images/solutions/digital/digital-specimen.png',
        href: '/',
      },
      {
        title: 'HEADLESS CORPORATE PORTAL & CMS MIGRATION',
        category: 'DIGITAL MODERNIZATION',
        metric: 'TECHNICAL DEMONSTRATION // Corporate Web Portal Migration',
        year: 'ENTERPRISE CUTOVER, 2026',
        image: '/assets/images/solutions/digital/digital-specimen.png',
        href: '/work/headless-corporate-portal',
      },
      {
        title: 'ACCESSIBLE DESIGN SYSTEM INFRASTRUCTURE',
        category: 'DESIGN TOKENS & UI',
        metric: 'KAIROTRIX BUILD // Design System Infrastructure',
        year: 'DESIGN SYSTEM, 2026',
        image: '/assets/images/solutions/digital/digital-specimen.png',
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
    ctaHeadline: 'Have a modernization problem to solve?',
    ctaDescription:
      'Tell us about the legacy website, manual spreadsheet process, or confusing user interface holding your business back. We’ll help outline a practical path to modernize it without unnecessary complexity.',
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
      'KAIROTRIX centralizes scattered business data, builds analytical storage and reporting dashboards, and implements forecasting and natural-language query tools for clearer decisions.',
    image: '/assets/images/solutions/sub_hero/s5.png',
    gridImage: '/assets/images/solutions/grid/grid-data-bi.png',
    systemFocusImage: '/assets/images/solutions/data/data-system-focus.png',
    statusBadge: 'Operational Intelligence',
    engineeringFocus: [
      { label: 'Pipelines', value: 'Unified Data Ingestion Pipelines' },
      { label: 'Queries', value: 'Optimized Analytical Queries' },
      { label: 'Interface', value: 'Natural-Language Query Interface' },
      { label: 'Integrity', value: 'Data Validation & Quality Checks' },
    ],
    marqueeItems: [
      'BUSINESS DATA ANALYTICS',
      'SALES & PERFORMANCE ANALYSIS',
      'OPERATIONAL ANALYTICS',
      'KPI DASHBOARDS',
      'INTERACTIVE REPORTING',
      'NATURAL-LANGUAGE DATA QUERIES',
    ],
    editorialSplit: {
      badge: 'SYSTEM FOCUS',
      headline: 'TURNING SCATTERED BUSINESS DATA INTO CLEAR VISIBILITY.',
      lead: 'We organize fragmented data across business tools, databases, and spreadsheets into structured analytical foundations so leadership and operational teams can make informed decisions from reliable numbers.',
      editorialHighlight: {
        lead: 'Reliable Data Foundation',
        detail: 'Centralized analytical storage, interactive KPI dashboards, and plain-English data exploration.',
      },
      focusCards: [
        {
          tag: 'FOCUS 01',
          title: 'DATA CENTRALIZATION',
          subtitle: 'Bring scattered sources into one foundation',
          description:
            'Consolidate, clean, and structure data from multiple tools into analytical storage with scheduled or automated sync pipelines.',
        },
        {
          tag: 'FOCUS 02',
          title: 'OPERATIONAL REPORTING',
          subtitle: 'Monitor performance in interactive dashboards',
          description:
            'Track revenue, sales pipelines, department KPIs, and operational activity with clear drill-down reporting views.',
        },
        {
          tag: 'FOCUS 03',
          title: 'DECISION ASSISTANCE',
          subtitle: 'Forecast trends & query data in plain language',
          description:
            'Estimate future patterns with statistical models and allow team members to ask business data questions in plain English.',
        },
      ],
      problemSolved:
        'Conflicting numbers across tools, slow reporting cycles, and blind spots in operational metrics.',
      strategicAdvantage:
        'Centralized reporting and intuitive dashboards giving leadership and operational teams clearer visibility into key business metrics.',
    },
    subCategories: [
      {
        id: 'analytics',
        anchorId: 'analytics',
        number: '05.1',
        title: 'Business Data Analytics & Warehousing',
        summary:
          'Centralizing business data from tools, databases, and spreadsheets into structured analytical storage and automated pipelines so reporting and analysis can work from a more consistent, reliable data foundation.',
        image: '/assets/images/solutions/data/data-sub-kpi-dashboards.png',
        bestSuitedFor: [
          'Bringing scattered business data from multiple tools, spreadsheets, and databases into one analytical environment',
          'Resolving inconsistent metric definitions and conflicting numbers across departments',
          'Reducing manual work spent extracting, cleaning, and preparing data for reporting',
          'Creating a structured data foundation for ongoing analysis, dashboards, and decision-support systems',
        ],
        whatWeBuild: [
          'Centralized Analytical Data Warehouses & Storage',
          'Automated Data Ingestion & Synchronization Pipelines',
          'Structured & Standardized Analytical Data Models',
          'Business Metric & Reporting Layers',
          'Data Quality, Reconciliation & Validation Workflows',
        ],
        whatWeHandle: [
          'Data source assessment & pipeline architecture',
          'Data ingestion, extraction & transformation workflows',
          'Analytical storage design & data modeling',
          'Business metric definitions & reporting consistency',
          'Scheduled synchronization, freshness checks & error alerting',
          'Data access controls & permission boundaries where required',
        ],
        whatYouReceive: [
          'Configured analytical data storage and ingestion pipelines',
          'Connected data sources and synchronization workflows',
          'Structured reporting data models and agreed metric definitions',
          'Data quality checks and pipeline monitoring where required',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation, data model documentation & maintenance guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Modern ELT (Extract, Load, Transform) patterns transform data inside cloud warehouses, providing high query performance and verifiable reporting metrics.",
          technologies: ["Cloud Data Warehouses","Data Transformation Pipelines","Ingestion & Sync Connectors","Standardized Metric Modeling"],
        },
        services: [
          {
            name: 'Cloud Data Warehouse Setup',
            scope: 'Designing scalable, cost-effective cloud data warehouses and analytical databases with optimized partition and query schemes.',
            deliverables: ['Columnar database schema architecture', 'Role-based data access policies', 'Automated backup and retention policies'],
            tags: ['Analytical Warehouses', 'Columnar Databases', 'Cloud Storage', 'PostgreSQL'],
          },
          {
            name: 'Automated ELT Data Pipelines',
            scope: 'Scheduled ingestion pipelines extracting data from payment systems, CRM platforms, advertising networks, and production databases into the central data store.',
            deliverables: ['Modular data transformation models', 'Data ingestion pipeline integrations', 'Data freshness and lineage monitors'],
            tags: ['Data Transformation Tools', 'ETL/ELT Connectors', 'Python', 'SQL'],
          },
          {
            name: 'Data Cleaning & Schema Normalization',
            scope: 'Deduplicating customer identities, handling currency conversions, and standardizing disparate date formats into clean tables.',
            deliverables: ['Data normalization scripts', 'Automated anomaly data tests', 'Data lineage documentation graph'],
            tags: ['Data Modeling Tools', 'Data Testing Frameworks', 'Python', 'SQL'],
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
        summary:
          'Custom dashboards and reporting interfaces that bring important business metrics into clear, interactive views so leadership and operational teams can monitor performance, identify changes, and make informed decisions.',
        image: '/assets/images/solutions/data/data-sub-analytics-bi.png',
        bestSuitedFor: [
          'Replacing fragmented spreadsheet reports and manually assembled performance updates',
          'Giving leadership and operational teams clearer visibility into business activity and KPIs',
          'Monitoring sales, operations, customer activity, delivery, or department performance in one place',
          'Moving from static reports to interactive dashboards with filtering and drill-down analysis',
        ],
        whatWeBuild: [
          'Executive KPI Dashboards & Leadership Scorecards',
          'Operational & Department Performance Dashboards',
          'Sales, Revenue & Customer Activity Views',
          'Interactive Drill-Down & Filterable Reporting Interfaces',
          'Scheduled Reports, Digests & Metric Alerts',
        ],
        whatWeHandle: [
          'KPI definition, metric hierarchy & dashboard planning',
          'Dashboard interface design & information hierarchy',
          'Connections to approved databases, warehouses, APIs & reporting sources',
          'Filtering, comparison & drill-down logic',
          'User access, permissions & data visibility controls where required',
          'Scheduled reports, exports & notification workflows where required',
          'Testing against reporting requirements and expected data states',
        ],
        whatYouReceive: [
          'Production-ready dashboard or embedded reporting interface',
          'Connected live, scheduled, or on-demand data feeds as required',
          'Configured filters, date ranges & drill-down views',
          'User access and visibility controls where required',
          'Scheduled report delivery or metric notifications where included in scope',
          'Project-specific documentation, metric definitions & administrative guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Aggregated query caching and lightweight visualization components ensure dashboards load quickly even when querying large operational datasets.",
          technologies: ["Interactive Visualization Frameworks","Aggregated Query Caches","Role-Based Dashboard Portals","Automated Report Delivery"],
        },
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
            deliverables: ['Interactive sales funnel diagrams', 'Cohort analysis matrices', 'Live CRM data sync'],
            tags: ['Charting Libraries', 'CRM Connectors', 'TypeScript', 'SQL'],
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
        summary:
          'Statistical and machine learning models that use historical business data to estimate future trends, anticipate demand, identify risks, and detect unusual patterns that may need attention.',
        image: '/assets/images/solutions/data/data-sub-pipelines-etl.png',
        bestSuitedFor: [
          'Forecasting seasonal demand, inventory requirements, staffing needs, or operational volume',
          'Identifying early indicators of customer churn, renewal risk, or changing account behavior',
          'Detecting unusual financial, operational, or performance patterns',
          'Replacing static planning assumptions with data-driven forecasts and scenario analysis',
        ],
        whatWeBuild: [
          'Demand, Sales & Operational Forecasting Models',
          'Customer Churn & Retention Risk Models',
          'Anomaly & Outlier Detection Systems',
          'Scenario Planning & Sensitivity Analysis Models',
          'Forecast Outputs & Decision-Support Alerts',
        ],
        whatWeHandle: [
          'Historical data assessment, preparation & feature engineering',
          'Model selection, baseline comparison & validation',
          'Backtesting against historical data and agreed evaluation criteria',
          'Integration of forecast outputs into dashboards or operational systems',
          'Alert thresholds, confidence ranges & anomaly rules where required',
          'Model evaluation documentation & retraining guidance',
        ],
        whatYouReceive: [
          'Production-ready forecasting or predictive model pipeline',
          'Connected data inputs and forecast output workflow',
          'Configured alert or anomaly rules where required',
          'Evaluation report with baseline comparisons and validation results',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation, retraining guidance & maintenance notes',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Time-series forecasting and gradient boosting models trained on historical data provide verifiable probabilistic predictions without black-box complexity.",
          technologies: ["Statistical & Machine Learning Libraries","Time-Series Analysis Tools","Data Validation Pipelines","Inference APIs"],
        },
        services: [
          {
            name: 'Customer Churn Prediction',
            scope: 'Early warning algorithms that detect declining user activity patterns and flag at-risk accounts weeks before cancellation.',
            deliverables: ['Trained churn classification model', 'Automated CRM customer risk tags', 'Proactive retention outreach triggers'],
            tags: ['Python', 'Statistical Models', 'Machine Learning Libraries', 'CRM APIs'],
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
        summary:
          'Conversational data interfaces that let business users ask questions in plain language and receive clear answers, tables, or charts from approved structured data sources without writing SQL.',
        image: '/assets/images/solutions/data/data-sub-conversational-query.png',
        bestSuitedFor: [
          'Giving non-technical leaders and operational teams faster access to business data',
          'Enabling self-service reporting and exploratory questions across approved datasets',
          'Providing conversational access to business metrics through internal tools or communication platforms',
          'Reducing repetitive data requests by making common questions easier to answer directly',
        ],
        whatWeBuild: [
          'Plain-Language Business Data Query Interfaces',
          'Conversational Analytics Assistants',
          'Guided Self-Service Data Exploration Tools',
          'Automated Metric Summaries & Trend Explanations',
          'Structured Query & Metric Interpretation Layers',
        ],
        whatWeHandle: [
          'Data source assessment, semantic mapping & business metric definition',
          'Natural-language query translation with controlled read-only execution where required',
          'User access controls & data visibility boundaries',
          'Query result formatting into summaries, tables, or charts',
          'Integration with approved internal tools, communication platforms, or web interfaces',
          'Query validation, ambiguity handling & safeguards against unauthorized access',
        ],
        whatYouReceive: [
          'Production-ready natural-language data query interface or integration',
          'Connected approved data sources and business metric definitions',
          'Query access controls and read-only safeguards where required',
          'Structured output formats for answers, tables, and charts',
          'Deployment configuration for the agreed environment',
          'Project-specific documentation, example queries & administrative guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Constrained semantic mappings and read-only execution boundaries ensure AI queries are mathematically accurate and adhere strictly to database security permissions.",
          technologies: ["Natural-Language Query Translators","Read-Only Database Connectors","Chat & Collaboration Integrations","Output Formatting Components"],
        },
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
        title: 'DATA VALIDATION',
        stat: 'VALIDATION CHECKS',
        category: 'ENGINEERING STANDARD',
        description: 'Checks help identify missing, inconsistent, or unexpected data before it reaches reporting layers.',
        image: '/assets/images/solutions/data/data-specimen.png',
        href: '#core-services',
      },
      {
        title: 'CONSISTENT METRIC DEFINITIONS',
        stat: 'METRIC ALIGNMENT',
        category: 'ENGINEERING STANDARD',
        description: 'Important business metrics are defined consistently so reports and dashboards interpret them the same way.',
        image: '/assets/images/solutions/data/data-specimen.png',
        href: '#core-services',
      },
      {
        title: 'CONTROLLED DATA ACCESS',
        stat: 'ROLE PERMISSIONS',
        category: 'ENGINEERING STANDARD',
        description: 'Permissions and visibility rules are applied according to user roles and data sensitivity.',
        image: '/assets/images/solutions/data/data-specimen.png',
        href: '#core-services',
      },
      {
        title: 'FRESHNESS & TRACEABILITY',
        stat: 'PIPELINE VISIBILITY',
        category: 'ENGINEERING STANDARD',
        description: 'Refresh checks, transformation history, and pipeline visibility can be introduced where required.',
        image: '/assets/images/solutions/data/data-specimen.png',
        href: '#core-services',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'IDENTIFY SOURCES',
        iconType: 'search',
        description: 'Audit data sources, reporting requirements, database schemas, and current spreadsheet workarounds.',
        image: '/assets/images/solutions/methodology/methodology-01-understand.png',
      },
      {
        step: '02',
        name: 'STRUCTURE DATA',
        iconType: 'cube',
        description: 'Design analytical storage structures, clean incoming data, and establish structured synchronization pipelines.',
        image: '/assets/images/solutions/methodology/methodology-02-design.png',
      },
      {
        step: '03',
        name: 'MODEL & VALIDATE',
        iconType: 'lightbulb',
        description: 'Define business metric layers, validate calculation logic, and verify data consistency.',
        image: '/assets/images/solutions/methodology/methodology-03-build.png',
      },
      {
        step: '04',
        name: 'EXPOSE & EVOLVE',
        iconType: 'check',
        description: 'Deploy interactive dashboards, forecasting models, or query interfaces, and refine as reporting needs expand.',
        image: '/assets/images/solutions/methodology/methodology-04-deploy.png',
      },
    ],
    featuredProjects: [
      {
        title: 'HIGH-THROUGHPUT TELEMETRY COMMAND CENTER',
        category: 'DATA & ANALYTICS',
        metric: 'TECHNICAL DEMONSTRATION // Telemetry Command Center',
        year: 'OPERATIONAL TELEMETRY, 2026',
        image: '/assets/images/solutions/data/data-specimen.png',
        href: '/work/telemetry-command-center',
      },
      {
        title: 'EXECUTIVE NATURAL-LANGUAGE COPILOT',
        category: 'AI DECISION SYSTEMS',
        metric: 'EXPERIMENT // Conversational Analytics Engine',
        year: 'EXECUTIVE SUITE, 2026',
        image: '/assets/images/solutions/data/data-specimen.png',
        href: '/work/executive-intelligence-copilot',
      },
      {
        title: 'CLICKHOUSE ANALYTICS LAKEHOUSE PIPELINE',
        category: 'COLUMNAR WAREHOUSING',
        metric: 'TECHNICAL DEMONSTRATION // Analytical Data Pipeline',
        year: 'ENTERPRISE DATA ENGINE, 2026',
        image: '/assets/images/solutions/data/data-specimen.png',
        href: '/work/clickhouse-lakehouse',
      },
    ],
    techStack: [
      {
        category: 'Warehouses & Analytical Engines',
        items: [
          { name: 'ClickHouse', role: 'Blazing fast columnar analytical store' },
          { name: 'PostgreSQL', role: 'Primary operational relational storage' },
          { name: 'Cloud Data Warehouses', role: 'Scalable analytical data storage & lakehouses' },
          { name: 'Apache Arrow', role: 'In-memory columnar data interchange' },
        ],
      },
      {
        category: 'Transformation & Orchestration',
        items: [
          { name: 'Transformation Frameworks', role: 'Modular SQL data transformation, testing & lineage' },
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
    ctaHeadline: 'Have a data problem to solve?',
    ctaDescription:
      'Tell us about the scattered spreadsheets, conflicting metric numbers, or blind spots in your business reporting. We’ll help build a clean data foundation and dashboards you can trust.',
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
      'KAIROTRIX connects isolated software platforms, synchronizes commercial and operational records, and integrates payment and data workflows into a coordinated ecosystem.',
    image: '/assets/images/solutions/sub_hero/s6.png',
    gridImage: '/assets/images/solutions/grid/grid-technology-integration.png',
    systemFocusImage: '/assets/images/solutions/integration/integration-system-focus.png',
    statusBadge: 'Connected Systems',
    engineeringFocus: [
      { label: 'Processing', value: 'Repeat-Safe Event Handling' },
      { label: 'Sync', value: 'Coordinated Data Synchronization' },
      { label: 'Recovery', value: 'Defined Retry Policies' },
      { label: 'Reconciliation', value: 'Record Alignment Checks' },
    ],
    marqueeItems: [
      'API & SYSTEM INTEGRATION',
      'CRM & ERP INTEGRATION',
      'PAYMENT INTEGRATION',
      'AUTOMATED DATA SYNC',
      'DATA MAPPING & TRANSFORMATION',
      'DATA MIGRATION',
    ],
    editorialSplit: {
      badge: 'SYSTEM FOCUS',
      headline: 'CONNECTING ISOLATED SYSTEMS INTO A UNIFIED FLOW.',
      lead: 'We engineer reliable API connectors, CRM/ERP bridges, payment workflows, and data synchronization so information moves between software tools with less manual re-entry.',
      editorialHighlight: {
        lead: 'Connected Ecosystem',
        detail: 'Custom API connectors, CRM/ERP synchronization, and transactional data flows.',
      },
      focusCards: [
        {
          tag: 'FOCUS 01',
          title: 'SYSTEM CONNECTIVITY',
          subtitle: 'Bridge third-party tools & internal platforms',
          description:
            'Custom API connectors, webhooks, and middleware connecting independent SaaS applications and partner services.',
        },
        {
          tag: 'FOCUS 02',
          title: 'COMMERCIAL ALIGNMENT',
          subtitle: 'Synchronize CRM, ERP & operational records',
          description:
            'Keep customer profiles, sales deals, orders, inventory counts, and billing records aligned across departments.',
        },
        {
          tag: 'FOCUS 03',
          title: 'TRANSACTION RELIABILITY',
          subtitle: 'Process payments & reconcile records',
          description:
            'Integrate secure payment flows, subscription billing, and reconciliation checks that help identify record discrepancies.',
        },
      ],
      problemSolved:
        'Disconnected tools, duplicate customer records, out-of-sync inventory, and fragile integration scripts.',
      strategicAdvantage:
        'Reliable integration flows that synchronize information between software tools and reduce repetitive manual data entry.',
    },
    subCategories: [
      {
        id: 'api-integration',
        anchorId: 'api-integration',
        number: '06.1',
        title: 'API & System Integration',
        summary:
          'Custom API connectors, middleware, and integration services that connect third-party platforms, partner services, and internal software into a reliable, coordinated digital ecosystem.',
        image: '/assets/images/solutions/integration/integ-sub-api-gateway.png',
        bestSuitedFor: [
          'Business platforms and software tools that cannot share data or trigger actions automatically',
          'Eliminating manual copy-paste and duplicate data entry between disconnected SaaS applications',
          'Connecting custom internal software to external partner, vendor, or supplier APIs',
          'Replacing fragile, unmaintained, or deprecated integration scripts with structured connectors',
        ],
        whatWeBuild: [
          'Custom API Connectors & Software Integrations',
          'API Gateways & Request Routing Middleware',
          'Payload Transformation & Protocol Translation Adapters',
          'Webhook Receivers, Dispatchers & Event Relays',
          'Secure Partner & Third-Party Integration Layers',
        ],
        whatWeHandle: [
          'API documentation review, endpoint assessment & authentication configuration',
          'Data mapping, payload transformation & schema validation',
          'Rate limiting, retry logic, timeout handling & error management',
          'Centralized logging, execution monitoring & failure alerting',
          'Integration testing with sandbox environments and simulated payloads',
          'Deployment, secure credential management & production cutover',
        ],
        whatYouReceive: [
          'Production-ready API integration or middleware service',
          'Connected software endpoints and validated data flows',
          'Configured retry policies, rate-limit controls, and error alerting',
          'Comprehensive data mapping and endpoint documentation',
          'Deployment configuration for the agreed environment',
          'Technical runbook, authentication guidance & administrative notes',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Idempotent message processing and schema-validated gateways ensure reliable communication between distinct software platforms without data loss.",
          technologies: ["API Gateways & Middleware","Data Transformation Layers","Webhook Listeners","Rate Limiting & Logging Tools"],
        },
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
            scope: 'Connecting third-party SaaS APIs, communication tools, and cloud services into your core internal application logic.',
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
        summary:
          'Synchronization between customer relationship, ERP, inventory, accounting, and operational systems so customer, order, billing, and fulfillment records stay aligned across the business.',
        image: '/assets/images/solutions/integration/integ-sub-crm-erp.png',
        bestSuitedFor: [
          'Resolving conflicting customer, account, or order records across disconnected systems',
          'Automating handoffs from sales activity into orders, billing, fulfillment, or finance workflows',
          'Reducing manual re-entry of customer, billing, inventory, and order information',
          'Keeping commercial and operational records consistent across departments',
        ],
        whatWeBuild: [
          'CRM-to-ERP Synchronization Pipelines',
          'Customer & Account Record Alignment Workflows',
          'Deal-to-Order & Billing Integrations',
          'Inventory & Fulfillment Synchronization',
          'Record Matching, Deduplication & Conflict-Resolution Workflows',
        ],
        whatWeHandle: [
          'Field mapping, entity relationships & data alignment',
          'Record matching, deduplication & conflict-resolution rules',
          'Event-driven or scheduled synchronization based on system requirements',
          'Data validation, retry handling & synchronization logging',
          'Testing with representative business scenarios',
          'Initial data reconciliation & production rollout where required',
        ],
        whatYouReceive: [
          'Production-ready CRM and ERP synchronization workflow',
          'Connected systems with one-way, bidirectional, or scheduled data flows as required',
          'Documented field mappings and synchronization rules',
          'Logging, failure alerts & synchronization visibility where required',
          'Deployment configuration for the agreed environment',
          'Project-specific administrative documentation & maintenance guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Transactional synchronization and change detection eliminate duplicate records and reconcile conflicting field updates between independent platforms.",
          technologies: ["CRM Platform APIs","ERP & Accounting Connectors","Bidirectional Sync Engines","Conflict Resolution & Audit Logs"],
        },
        services: [
          {
            name: 'CRM Bidirectional Synchronization',
            scope: 'Real-time synchronization of leads, contacts, deals, and activities between marketing CRMs and internal databases.',
            deliverables: ['Bidirectional field mapping configuration', 'Conflict resolution logic rules', 'Near-instant webhook sync workers'],
            tags: ['CRM APIs', 'Node.js', 'In-Memory Caches', 'Webhook Listeners'],
          },
          {
            name: 'ERP & Backoffice Connectors',
            scope: 'Integrating enterprise ERP accounting, billing, and inventory ledgers with modern customer-facing web applications.',
            deliverables: ['SuiteTalk / OData connector endpoints', 'Two-way invoice and payment sync', 'Automated ERP record reconciliation'],
            tags: ['ERP APIs', 'Enterprise Connectors', 'Python', 'Relational Databases'],
          },
          {
            name: 'Customer 360 Unified Identity Graph',
            scope: 'Merging duplicate contacts across multiple platforms into a single canonical customer record with complete interaction history.',
            deliverables: ['Fuzzy matching identity resolution scripts', 'Master Data Management (MDM) schema', 'Customer 360 API endpoint'],
            tags: ['PostgreSQL', 'Python', 'In-Memory Caching', 'Data Transformation Engines'],
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
        title: 'Payment & Financial Systems Integration',
        summary:
          'Integration of payment gateways, billing systems, invoicing workflows, and transaction events into digital products and business platforms, with appropriate security controls and failure handling.',
        image: '/assets/images/solutions/integration/integ-sub-payments.png',
        bestSuitedFor: [
          'Adding checkout, recurring billing, or paid account flows to digital products',
          'Connecting software platforms to payment providers, bank payment methods, or invoicing systems',
          'Supporting subscription plans, multi-currency pricing, tax workflows, or digital receipts where required',
          'Automating payment status updates, reconciliation, failed-payment handling, and transaction notifications',
        ],
        whatWeBuild: [
          'Checkout & Payment Gateway Integrations',
          'Subscription & Recurring Billing Systems',
          'Automated Invoicing & Payment Collection Workflows',
          'Multi-Currency, Tax & Pricing Integrations',
          'Transaction Event & Payment Reconciliation Workflows',
        ],
        whatWeHandle: [
          'Payment provider evaluation & integration planning',
          'Checkout and billing flow implementation',
          'Secure payment-token and provider-hosted payment workflows where appropriate',
          'Transaction event handling for payments, renewals, refunds, failures & disputes',
          'Currency, tax, invoicing & receipt workflows where required',
          'Failure states, retry behavior & edge-case testing',
          'Production deployment & verification for the agreed environment',
        ],
        whatYouReceive: [
          'Production-ready payment or billing integration',
          'Connected payment provider and transaction event workflows',
          'Checkout or billing management interfaces where included in scope',
          'Failure handling, status updates & notification logic where required',
          'Reconciliation workflows where included in scope',
          'Deployment configuration for the agreed environment',
          'Project-specific administrative documentation & operational guidance',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Tokenized client-side checkouts and signed webhook verification guarantee financial transactions are processed securely and audited end-to-end.",
          technologies: ["Payment Gateway APIs","Subscription & Invoicing Engines","Secure Client-Side Tokenization","Webhook Event Listeners"],
        },
        services: [
          {
            name: 'Subscription & Billing Integrations',
            scope: 'Custom subscription flows, metered usage billing, customer portal self-service, and robust webhook listeners.',
            deliverables: ['Payment webhook listener with signature verification', 'Usage-based metering event dispatcher', 'Hosted customer billing portal setup'],
            tags: ['Payment Gateway APIs', 'TypeScript', 'Web Frameworks', 'Event Caches'],
          },
          {
            name: 'Multi-Gateway Payment Failover',
            scope: 'Intelligent payment routing that automatically retries failed transactions across secondary gateways to minimize revenue churn.',
            deliverables: ['Payment routing decision engine', 'Card decline classification logic', 'PCI-DSS compliant tokenization layer'],
            tags: ['Payment Gateways', 'Failover Routing', 'Node.js', 'Relational Databases'],
          },
          {
            name: 'Bank Transfer & Direct Debit Pipelines',
            scope: 'Direct B2B bank payment integrations with automated account verification and bank-transfer reconciliation.',
            deliverables: ['Bank account verification interface', 'Bank transfer state-tracking worker', 'Automated return code notification hooks'],
            tags: ['Bank Verification APIs', 'Direct Transfer Protocols', 'TypeScript'],
          },
          {
            name: 'Global Currency & Tax Compliance',
            scope: 'Automated tax calculation, multi-currency invoicing, and regulatory reporting integrated into the checkout flow.',
            deliverables: ['Automated tax calculation integration', 'Multi-currency checkout display', 'Quarterly tax liability export reports'],
            tags: ['Tax Engines', 'Multi-Currency Calculators', 'Web Frameworks', 'JSON'],
          },
        ],
      },
      {
        id: 'data-sync',
        anchorId: 'data-sync',
        number: '06.4',
        title: 'Cross-System Data Synchronization',
        summary:
          'Synchronization workflows that keep operational records, shared data, and system states aligned across multiple applications, databases, and connected services.',
        image: '/assets/images/solutions/integration/integ-sub-data-sync.png',
        bestSuitedFor: [
          'Keeping data changes consistent across multiple business systems',
          'Preventing stale, duplicated, or conflicting records between connected applications',
          'Synchronizing inventory, account, operational, or status information across channels',
          'Replacing fragile manual or batch-based sync processes with more reliable synchronization workflows',
        ],
        whatWeBuild: [
          'Cross-System Data Synchronization Pipelines',
          'Event-Driven & Scheduled Synchronization Workflows',
          'Data Reconciliation & Consistency Checks',
          'Multi-System Record & State Synchronization',
          'Failed-Event Retry & Recovery Workflows',
        ],
        whatWeHandle: [
          'Data source assessment, entity mapping & synchronization design',
          'Event-driven or scheduled synchronization based on system requirements',
          'Duplicate-prevention and repeat-safe processing',
          'Retry handling, timeout behavior & failed-event management',
          'Data reconciliation and discrepancy alerts where required',
          'Testing across representative load, interruption, and recovery scenarios',
        ],
        whatYouReceive: [
          'Production-ready cross-system synchronization workflow',
          'Connected systems with configured synchronization triggers',
          'Retry, recovery & failure-notification logic where required',
          'Reconciliation checks and discrepancy reporting where included in scope',
          'Deployment configuration for the agreed environment',
          'Project-specific technical documentation, architecture guidance & operational notes',
          'Client-owned custom project code and IP, subject to third-party technologies and licenses',
        ],
        technicalApproach: {
          description: "Decoupled event queues with distributed locking ensure data consistency across multiple databases without performance bottlenecks.",
          technologies: ["Distributed Event Queues","Change Detection Pipelines","Reconciliation Audit Checkers","Dead-Letter Queue Tooling"],
        },
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
            tags: ['Message Queues', 'Worker Processes', 'Modern Web Frameworks', 'REST APIs'],
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
        title: 'REPEAT-SAFE PROCESSING',
        stat: 'DEDUPLICATION',
        category: 'ENGINEERING STANDARD',
        description: 'Integration logic is designed to reduce duplicate processing when the same event or request is received more than once.',
        image: '/assets/images/solutions/integration/integration-specimen.png',
        href: '#core-services',
      },
      {
        title: 'RETRY & FAILURE HANDLING',
        stat: 'RECOVERY RULES',
        category: 'ENGINEERING STANDARD',
        description: 'Temporary connection failures, timeouts, and unavailable services are handled according to defined recovery rules.',
        image: '/assets/images/solutions/integration/integration-specimen.png',
        href: '#core-services',
      },
      {
        title: 'INTEGRATION VISIBILITY',
        stat: 'ACTIVITY TRACING',
        category: 'ENGINEERING STANDARD',
        description: 'Logs and synchronization history help trace system activity and investigate failures.',
        image: '/assets/images/solutions/integration/integration-specimen.png',
        href: '#core-services',
      },
      {
        title: 'DATA VALIDATION & RECONCILIATION',
        stat: 'RECORD CHECKS',
        category: 'ENGINEERING STANDARD',
        description: 'Validation and reconciliation checks help identify mismatched or incomplete records between connected systems.',
        image: '/assets/images/solutions/integration/integration-specimen.png',
        href: '#core-services',
      },
    ],
    processSteps: [
      {
        step: '01',
        name: 'UNDERSTAND SYSTEMS',
        iconType: 'search',
        description: 'Audit source endpoints, authentication protocols, rate limits, and business transaction requirements.',
        image: '/assets/images/solutions/methodology/methodology-01-understand.png',
      },
      {
        step: '02',
        name: 'MAP DATA & CONTRACTS',
        iconType: 'cube',
        description: 'Define field-level entity mappings, schema validations, deduplication rules, and conflict-handling logic.',
        image: '/assets/images/solutions/methodology/methodology-02-design.png',
      },
      {
        step: '03',
        name: 'CONNECT & INTEGRATE',
        iconType: 'lightbulb',
        description: 'Build custom API connectors, event listeners, payload transformations, and credential handling appropriate to the deployment environment.',
        image: '/assets/images/solutions/methodology/methodology-03-build.png',
      },
      {
        step: '04',
        name: 'TEST & DEPLOY',
        iconType: 'check',
        description: 'Validate across edge cases, connection timeouts, and recovery scenarios, then deploy with sync activity monitoring.',
        image: '/assets/images/solutions/methodology/methodology-04-deploy.png',
      },
    ],
    featuredProjects: [
      {
        title: 'ENTERPRISE MULTI-PROTOCOL API GATEWAY',
        category: 'TECHNOLOGY INTEGRATION',
        metric: 'TECHNICAL DEMONSTRATION // Multi-Protocol API Gateway',
        year: 'ENTERPRISE FABRIC, 2026',
        image: '/assets/images/solutions/integration/integration-specimen.png',
        href: '/work/enterprise-api-gateway',
      },
      {
        title: 'REAL-TIME WEBHOOK MESH & EVENT ROUTER',
        category: 'EVENT ARCHITECTURE',
        metric: 'TECHNICAL DEMONSTRATION // Real-Time Webhook Mesh',
        year: 'FINTECH EVENT MESH, 2026',
        image: '/assets/images/solutions/integration/integration-specimen.png',
        href: '/work/realtime-webhook-mesh',
      },
      {
        title: 'ENTERPRISE CRM & ERP BIDIRECTIONAL SYNC',
        category: 'ERP/CRM INTEGRATION',
        metric: 'KAIROTRIX BUILD // CRM & ERP Synchronization',
        year: 'GLOBAL ERP SYNC, 2026',
        image: '/assets/images/solutions/integration/integration-specimen.png',
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
          { name: 'CRM Platform APIs', role: 'Full CRM bidirectional synchronization & lead routing' },
          { name: 'ERP & Accounting Connectors', role: 'Enterprise ERP ledger integration & billing sync' },
          { name: 'Payment Gateways & Banking APIs', role: 'Payment processing, subscriptions & bank verification' },
          { name: 'Identity & E-Signature Services', role: 'Identity management & e-signature workflows' },
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
    ctaHeadline: 'Have an integration problem to solve?',
    ctaDescription:
      'Tell us about the disconnected software platforms, manual data re-entry, or out-of-sync records complicating your operations. We’ll help connect your systems with clean, reliable integration pipelines.',
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

