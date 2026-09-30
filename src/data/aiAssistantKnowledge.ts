// src/data/aiAssistantKnowledge.ts

export interface QuickPrompt {
  id: string;
  label: string;
  query: string;
  badge?: string;
}

export interface ActionButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface AssistantResponse {
  text: string;
  actions?: ActionButton[];
  suggestedFollowUps?: string[];
}

export const KIRO_INITIAL_GREETING: AssistantResponse = {
  text: "Hello! I'm **KIRO**, your guide to KAIROTRIX. I can help you explore our engineering services and solutions, diagnose technical challenges, or connect you directly with our lead engineers.\n\nWhat are you looking to build or solve?",
  suggestedFollowUps: [
    "What does KAIROTRIX do?",
    "Find a solution for my problem",
    "Explore AI Agent systems",
    "How do we start a project?",
  ],
};

export const QUICK_STARTER_PROMPTS: QuickPrompt[] = [
  {
    id: 'overview',
    label: 'What does KAIROTRIX do?',
    query: 'What does KAIROTRIX do and what makes you different?',
    badge: 'Overview',
  },
  {
    id: 'diagnose',
    label: 'Help me find the right solution',
    query: 'How do I know which technology solution my business needs?',
    badge: 'Diagnostic',
  },
  {
    id: 'ai-agents',
    label: 'Explore AI & Autonomous Agents',
    query: 'Tell me about your AI & Intelligent Systems services',
    badge: 'AI Systems',
  },
  {
    id: 'process',
    label: 'How does engagement work?',
    query: 'What is your development process and timeline?',
    badge: 'Process',
  },
  {
    id: 'contact',
    label: 'Talk to an engineer',
    query: 'How can I discuss my project directly with your team?',
    badge: 'Direct',
  },
];

interface KnowledgeEntry {
  keywords: string[];
  intents: string[];
  response: AssistantResponse;
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // 1. Company Overview / Identity
  {
    keywords: ['who are you', 'what is kairotrix', 'company', 'about', 'tagline', 'built to evolve', 'overview', 'mission'],
    intents: ['company_overview', 'identity'],
    response: {
      text: "**KAIROTRIX** is an AI technology and software solutions company built on a **problem-first** philosophy.\n\nUnlike traditional agencies that push off-the-shelf software or hype-driven tools, we identify your operational bottlenecks first—then engineer the precise answer across AI, custom software, workflow automation, or system integration.\n\nKey commitments:\n• **100% Client-Owned IP** — no vendor lock-in\n• **Direct Principal Engineers** — no junior agency layers\n• **Production Reliability** — built for high throughput and uptime",
      actions: [
        { label: 'Explore Our Story', href: '/about', variant: 'secondary' },
        { label: 'View Solutions', href: '/solutions', variant: 'primary' },
      ],
      suggestedFollowUps: [
        'Explore AI Agent systems',
        'What software do you build?',
        'How do we start a project?',
      ],
    },
  },

  // 2. AI & Intelligent Systems (Discipline 01)
  {
    keywords: ['ai', 'artificial intelligence', 'agent', 'agents', 'llm', 'rag', 'genai', 'machine learning', 'chatbot', 'autonomous', 'model', 'smart'],
    intents: ['discipline_ai', 'ai_agents'],
    response: {
      text: "Our **AI & Intelligent Systems** practice engineers deterministic, production-grade intelligence tailored to enterprise operations:\n\n• **Autonomous AI Agents**: Multi-agent runtimes with tool execution and human-in-the-loop oversight\n• **Enterprise Knowledge (RAG)**: Zero-hallucination vector search over internal documentation\n• **Custom AI Applications**: Dedicated generative tools and predictive pipelines\n• **MLOps & Evaluation**: Continuous benchmarking and sub-second inference",
      actions: [
        { label: 'Explore AI & Intelligent Systems', href: '/solutions/ai-intelligent-systems', variant: 'primary' },
        { label: 'View Work & Projects', href: '/work', variant: 'secondary' },
      ],
      suggestedFollowUps: [
        'Can AI automate our internal workflows?',
        'What is your production tech stack?',
        'Talk to an engineer',
      ],
    },
  },

  // 3. Software & Product Engineering (Discipline 02)
  {
    keywords: ['software', 'product', 'web app', 'application', 'saas', 'fullstack', 'frontend', 'backend', 'mvp', 'custom software', 'react', 'nextjs'],
    intents: ['discipline_software', 'product_engineering'],
    response: {
      text: "Our **Software & Product Engineering** practice designs and builds resilient, scalable digital products from concept through enterprise deployment:\n\n• **Custom Web Applications**: Built with Next.js, React, TypeScript, and high-concurrency backends\n• **SaaS Platforms & MVPs**: Rapid-to-market architectures with robust multi-tenancy and billing\n• **UI/UX Architecture**: Design systems engineered for speed, WCAG 2.2 accessibility, and polish\n• **API & Microservices**: Resilient distributed services with sub-5ms query optimization",
      actions: [
        { label: 'Explore Software Engineering', href: '/solutions/software-product-engineering', variant: 'primary' },
        { label: 'Discuss a Custom Build', href: '/contact?interest=software-engineering', variant: 'secondary' },
      ],
      suggestedFollowUps: [
        'How long does an MVP take to build?',
        'What tech stack do you use?',
        'Help me find the right solution',
      ],
    },
  },

  // 4. Automation & Digital Operations (Discipline 03)
  {
    keywords: ['automation', 'automate', 'workflow', 'manual', 'operations', 'paperwork', 'document', 'ocr', 'invoice', 'bottleneck', 'eliminate manual'],
    intents: ['discipline_automation', 'workflow_ops'],
    response: {
      text: "Our **Automation & Digital Operations** practice eliminates redundant manual work and connects disconnected systems:\n\n• **End-to-End Workflow Automation**: Self-healing background pipelines triggered by events\n• **Intelligent Document Processing**: OCR and structured data extraction from invoices, contracts, and PDFs\n• **Operations Cockpits**: Real-time mission control dashboards for business processes\n• **Error Handling & Audit Trails**: Zero-data-loss execution with human failover mechanisms",
      actions: [
        { label: 'Explore Automation Solutions', href: '/solutions/automation-digital-operations', variant: 'primary' },
        { label: 'Schedule an Ops Audit', href: '/contact?interest=automation', variant: 'secondary' },
      ],
      suggestedFollowUps: [
        'How much time can automation save?',
        'Can you connect our CRM to our database?',
        'Talk to an engineer',
      ],
    },
  },

  // 5. Digital Transformation (Discipline 04)
  {
    keywords: ['transformation', 'digital transformation', 'legacy', 'modernize', 'modernization', 'redesign', 'cms', 'website', 'slow system'],
    intents: ['discipline_transformation', 'modernization'],
    response: {
      text: "Our **Digital Transformation** discipline helps established businesses replace outdated software and legacy workflows with high-velocity digital infrastructure:\n\n• **Legacy System Modernization**: Incremental migrations without operational downtime\n• **High-Impact Web Platforms**: Headless CMS and dynamic client-facing web portals\n• **Process Digitization**: Transforming spreadsheet-dependent operations into structured software\n• **Speed & SEO Optimization**: Sub-second page loads and architectural cleanliness",
      actions: [
        { label: 'Explore Transformation', href: '/solutions/digital-transformation', variant: 'primary' },
        { label: 'Request Modernization Review', href: '/contact?interest=digital-transformation', variant: 'secondary' },
      ],
      suggestedFollowUps: [
        'Can we modernize without stopping operations?',
        'What is your development process?',
        'Talk to an engineer',
      ],
    },
  },

  // 6. Data & Business Intelligence (Discipline 05)
  {
    keywords: ['data', 'bi', 'analytics', 'dashboard', 'metrics', 'reporting', 'sql', 'predictive', 'visualization', 'warehouse'],
    intents: ['discipline_data', 'analytics'],
    response: {
      text: "Our **Data & Business Intelligence** practice turns fragmented company numbers into actionable executive foresight:\n\n• **Executive Dashboards**: Real-time KPI telemetry with sub-second data refresh\n• **Data Pipelines & Warehousing**: Scalable ETL pipelines feeding verified single-source data lakes\n• **Natural Language Querying**: Ask questions in plain English to interrogate enterprise databases\n• **Predictive Analytics**: Churn forecasting, demand planning, and anomaly detection",
      actions: [
        { label: 'Explore Data & BI', href: '/solutions/data-business-intelligence', variant: 'primary' },
        { label: 'View Data Architecture', href: '/work', variant: 'secondary' },
      ],
      suggestedFollowUps: [
        'Can you integrate data from multiple tools?',
        'What does KAIROTRIX do?',
        'Talk to an engineer',
      ],
    },
  },

  // 7. Technology Integration (Discipline 06)
  {
    keywords: ['integration', 'api', 'connect', 'crm', 'erp', 'salesforce', 'hubspot', 'stripe', 'payment', 'sync', 'webhook', 'middleware'],
    intents: ['discipline_integration', 'apis'],
    response: {
      text: "Our **Technology Integration** practice builds secure bridges between siloed SaaS applications, ERPs, and internal databases:\n\n• **Enterprise API Architecture**: Robust REST & GraphQL middleware with strict rate-limiting and retry logic\n• **CRM & ERP Synchronization**: Bidirectional sync between Salesforce, HubSpot, SAP, and custom tools\n• **Payment & Billing Gateways**: Stripe, LemonSqueezy, and enterprise ledger integrations\n• **Event-Driven Webhooks**: Microsecond notifications across your entire tech stack",
      actions: [
        { label: 'Explore Integration', href: '/solutions/technology-integration', variant: 'primary' },
        { label: 'Discuss Integration Needs', href: '/contact?interest=tech-integration', variant: 'secondary' },
      ],
      suggestedFollowUps: [
        'Can you automate invoice sync?',
        'What tech stack do you use?',
        'Talk to an engineer',
      ],
    },
  },

  // 8. Process & Methodology
  {
    keywords: ['process', 'how do you work', 'lifecycle', 'methodology', 'timeline', 'steps', 'approach', 'stages'],
    intents: ['methodology', 'process'],
    response: {
      text: "We follow a **6-Stage Engineering Lifecycle** designed for velocity and zero ambiguity:\n\n1. **Understand** — Deconstruct root business problem & technical constraints\n2. **Explore** — Rapid architectural feasibility & algorithmic evaluation\n3. **Architect** — Data contracts, schema design, security, and component hierarchy\n4. **Build** — Milestone-based sprint delivery with direct engineer visibility\n5. **Integrate** — Seamless embedding into your existing production workflows\n6. **Evolve** — Telemetry monitoring, optimization, and scaling roadmap",
      actions: [
        { label: 'Read Our Approach', href: '/about#approach', variant: 'secondary' },
        { label: 'Initiate a Project', href: '/contact', variant: 'primary' },
      ],
      suggestedFollowUps: [
        'How fast can we launch an MVP?',
        'What does KAIROTRIX do?',
        'Talk to an engineer',
      ],
    },
  },

  // 9. Pricing, Rates & Engagement
  {
    keywords: ['cost', 'pricing', 'price', 'rates', 'quote', 'budget', 'expensive', 'how much'],
    intents: ['pricing', 'quote'],
    response: {
      text: "Because we engineer custom systems tailored to your specific architecture and operational scale, our engagements are priced on clear, milestone-driven scopes or dedicated engineering sprints.\n\nWe provide:\n• **Transparent Fixed-Scope Milestones** for defined deliverables\n• **Zero Hidden Retainers** or platform lock-in fees\n• **100% IP Ownership** transferred to you on completion\n\nShare your project requirements, and an engineer will review feasibility and provide an estimated timeline and scope within 24 hours.",
      actions: [
        { label: 'Request a Scope & Estimate', href: '/contact?interest=custom-scope', variant: 'primary' },
      ],
      suggestedFollowUps: [
        'What is your development process?',
        'Can you build an MVP?',
        'Talk to an engineer',
      ],
    },
  },

  // 10. Direct Contact / Talk to Engineer
  {
    keywords: ['contact', 'email', 'phone', 'call', 'talk', 'hire', 'meeting', 'touch', 'reach', 'connect', 'speak'],
    intents: ['contact_direct', 'hire'],
    response: {
      text: "You can connect directly with our engineering team right away!\n\n• **Response SLA**: Under 24 hours\n• **Direct Access**: You speak with technical principals, not sales reps\n• **Direct Email**: `connect@kairotrix.com`\n\nSubmit your inquiry through our streamlined contact form or drop us an email:",
      actions: [
        { label: 'Open Contact Form', href: '/contact', variant: 'primary' },
      ],
      suggestedFollowUps: [
        'What does KAIROTRIX do?',
        'Explore AI Agent systems',
      ],
    },
  },

  // 11. Tech Stack & Engineering Standards
  {
    keywords: ['tech stack', 'technologies', 'stack', 'languages', 'tools', 'infrastructure', 'frameworks', 'python', 'node'],
    intents: ['tech_stack', 'engineering_standards'],
    response: {
      text: "We build with proven, modern production standards:\n\n• **Frontend & UI**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion\n• **Backend & Distributed**: Node.js, Python (FastAPI/PyTorch), Go, REST & GraphQL\n• **AI & Orchestration**: LangChain, LlamaIndex, vLLM, HuggingFace, OpenAI, Anthropic\n• **Data & Databases**: PostgreSQL (pgvector), Supabase, Redis, ClickHouse, Pinecone\n• **Infra & DevOps**: Docker, AWS, Cloudflare, Vercel, Zero-Downtime CI/CD",
      actions: [
        { label: 'Explore Solutions', href: '/solutions', variant: 'secondary' },
        { label: 'Discuss Architecture', href: '/contact', variant: 'primary' },
      ],
      suggestedFollowUps: [
        'What software do you build?',
        'How do we start a project?',
        'Talk to an engineer',
      ],
    },
  },
];

export function findAssistantResponse(query: string): AssistantResponse {
  const normalized = query.toLowerCase().trim();

  if (!normalized) {
    return KIRO_INITIAL_GREETING;
  }

  // Check matching entries by keywords or intents
  let bestMatch: KnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.length > 4 ? 3 : 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return bestMatch.response;
  }

  // Diagnostic fallback: guide user toward solutions or direct contact
  return {
    text: `I want to make sure you get the exact technical guidance for that.\n\nKAIROTRIX solves business bottlenecks across our core technology solution areas:\n• **AI & Intelligent Systems** (Autonomous agents, LLM apps, RAG)\n• **Software & Product Engineering** (Web apps, SaaS MVPs, platforms)\n• **Automation & Operations** (Workflow orchestration, document automation)\n• **Digital Transformation** (Modernizing legacy systems & digital craft)\n• **Data & Business Intelligence** (Executive telemetry, dashboards)\n• **Technology Integration** (APIs, CRM/ERP sync)\n\nWhich of these best matches what you are trying to solve, or would you like to speak directly with an engineer?`,
    actions: [
      { label: 'Browse Solutions Hub', href: '/solutions', variant: 'secondary' },
      { label: 'Direct Engineering Inquiry', href: '/contact', variant: 'primary' },
    ],
    suggestedFollowUps: [
      'What does KAIROTRIX do?',
      'Explore AI Agent systems',
      'Talk to an engineer',
    ],
  };
}
