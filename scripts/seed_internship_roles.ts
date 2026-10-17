import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SAMPLE_ROLES = [
  {
    title: 'Software Engineering Intern — Web & Backend Architecture',
    slug: 'software-engineering-intern-web-backend',
    domain: 'Software Development',
    responsibilities: [
      'Engineer modular Next.js App Router components and TypeScript interfaces adhering to atomic design principles.',
      'Develop robust REST and GraphQL API routes with Zod schema validation and PostgreSQL database queries via Prisma ORM.',
      'Implement responsive layouts across mobile, tablet, and desktop viewports with Tailwind CSS v4 design tokens.',
      'Write comprehensive unit and integration tests and participate in active peer code reviews.',
    ],
    requiredSkills: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Git'],
    eligibility: 'Pre-final and final-year undergraduate or postgraduate students in Computer Science, IT, Software Engineering, or related discipline with hands-on coding experience.',
    projectScope: 'Active development and optimization of internal tooling, client web portals, and scalable cloud application services.',
    supervisor: 'KAIROTRIX Lead Systems Architect',
    duration: '8 – 12 Weeks (Flexible based on academic curriculum)',
    workingExpectations: 'Fully Remote. 15–20 hours/week. Asynchronous progress logs with weekly engineering sprint check-ins.',
    compensationTerms: 'Performance-linked stipend upon milestone delivery and evaluation review. Fully compliant with Indian labour and apprenticeship guidelines.',
    completionCriteria: 'Delivery of assigned production module milestones, clean peer-reviewed pull requests, and an end-of-internship technical demonstration.',
    status: 'PUBLISHED',
    order: 1,
  },
  {
    title: 'AI Systems Intern — Agentic Workflows & RAG Pipelines',
    slug: 'ai-systems-intern-agentic-rag',
    domain: 'AI & Intelligent Systems',
    responsibilities: [
      'Design and evaluate grounded retrieval-augmented generation (RAG) pipelines over unstructured organizational repositories.',
      'Implement tool-calling and memory architectures for task-oriented autonomous AI agents.',
      'Benchmark model outputs against hallucination metrics, latency constraints, and cost optimization profiles.',
      'Integrate LLM API endpoints into production web services with streaming response handlers.',
    ],
    requiredSkills: ['Python', 'TypeScript', 'LangChain / LlamaIndex', 'Vector Databases (Pinecone/pgvector)', 'OpenAI / Groq APIs', 'Prompt Engineering'],
    eligibility: 'Students pursuing B.Tech/M.Tech/MCA/MS in Computer Science, Artificial Intelligence, Data Science, or allied fields with demonstrable AI/ML projects.',
    projectScope: 'Engineering practical enterprise knowledge systems and autonomous support triage agents for live business deployments.',
    supervisor: 'KAIROTRIX Senior AI Engineer',
    duration: '10 – 12 Weeks',
    workingExpectations: 'Fully Remote. 15–20 hours/week. Daily asynchronous standups via project channels, weekly architectural sync.',
    compensationTerms: 'Structured performance-linked monthly stipend based on milestone completion.',
    completionCriteria: 'Successful deployment and testing of a RAG pipeline or autonomous agent benchmark suite with documented evaluation metrics.',
    status: 'PUBLISHED',
    order: 2,
  },
  {
    title: 'Automation & Integration Intern — Operations & Systems',
    slug: 'automation-integration-intern',
    domain: 'Automation & Technology Integration',
    responsibilities: [
      'Build resilient webhook connectors and middleware to bridge third-party SaaS platforms, CRM systems, and internal databases.',
      'Construct automated document generation, transaction verification, and notification pipelines.',
      'Implement retry policies, idempotency keys, and error-handling mechanisms for mission-critical asynchronous workflows.',
      'Document integration blueprints and system telemetry dashboards.',
    ],
    requiredSkills: ['Node.js / Python', 'REST APIs & Webhooks', 'Event Queues / Redis', 'PostgreSQL', 'API Security & Authentication'],
    eligibility: 'Students in Computer Science, Information Technology, or Electrical Engineering with a solid grasp of web APIs and scripting.',
    projectScope: 'Automating multi-system commercial workflows, billing reconciliation pipelines, and operational health monitoring.',
    supervisor: 'KAIROTRIX Integration Engineering Lead',
    duration: '8 – 12 Weeks',
    workingExpectations: 'Fully Remote. 15–20 hours/week. Flexible working hours with weekly milestone reviews.',
    compensationTerms: 'Performance-linked monthly stipend with milestone-based bonuses upon verified delivery.',
    completionCriteria: 'Production-ready integration pipeline with automated error recovery and end-to-end telemetry testing.',
    status: 'PUBLISHED',
    order: 3,
  },
  {
    title: 'Data Analytics & Intelligence Intern',
    slug: 'data-analytics-intelligence-intern',
    domain: 'Data Analytics & Business Intelligence',
    responsibilities: [
      'Write optimized SQL queries, analytical views, and aggregation jobs over operational database schemas.',
      'Design clean, interactive executive dashboards and KPI cockpits with charting libraries.',
      'Perform exploratory data analysis (EDA) to uncover operational bottlenecks and workflow friction.',
      'Formulate reproducible analytical pipelines for periodic reporting and anomaly detection.',
    ],
    requiredSkills: ['SQL', 'PostgreSQL', 'Python (Pandas, NumPy)', 'Data Visualization (Recharts, Chart.js, or Superset)', 'Statistical Modeling'],
    eligibility: 'Undergraduate or postgraduate students in Data Science, Statistics, Mathematics, Economics, or Computer Engineering.',
    projectScope: 'Operational data warehousing, metric pipelines, and executive intelligence cockpits.',
    supervisor: 'KAIROTRIX Data & Analytics Lead',
    duration: '8 – 12 Weeks',
    workingExpectations: 'Fully Remote. 15–20 hours/week with weekly reporting sync.',
    compensationTerms: 'Monthly performance-linked stipend upon review of delivered dashboard assets.',
    completionCriteria: 'Completed analytics data model, verified dashboard implementation, and technical insight report.',
    status: 'PUBLISHED',
    order: 4,
  },
  {
    title: 'UI/UX & Product Design Intern',
    slug: 'ui-ux-product-design-intern',
    domain: 'UI/UX Design',
    responsibilities: [
      'Design high-fidelity user interfaces, component tokens, and interactive wireframes in Figma.',
      'Conduct user flow mapping and ergonomic audit of existing digital products to eliminate interface friction.',
      'Collaborate with frontend engineers to ensure design fidelity, responsive adaptation, and WCAG AA accessibility compliance.',
      'Contribute to KAIROTRIX master design system foundations and documentation.',
    ],
    requiredSkills: ['Figma', 'Design Systems', 'Responsive Web Design', 'Typography & Visual Hierarchy', 'Interactive Prototyping', 'WCAG Accessibility'],
    eligibility: 'Students pursuing degrees in Design, Interaction Design, Human-Computer Interaction, or Engineering with a demonstrated UI/UX portfolio.',
    projectScope: 'User journeys, visual component design, and interactive prototype engineering for software applications.',
    supervisor: 'KAIROTRIX Head of Product Design',
    duration: '8 – 12 Weeks',
    workingExpectations: 'Fully Remote. 15–20 hours/week with weekly design critique sessions.',
    compensationTerms: 'Performance-linked stipend upon delivery of approved Figma specs and design system tokens.',
    completionCriteria: 'Approved high-fidelity Figma component library and interactive prototype tested across responsive viewports.',
    status: 'PUBLISHED',
    order: 5,
  },
];

async function seedRoles() {
  console.log('Seeding initial KAIROTRIX internship roles...');
  for (const roleData of SAMPLE_ROLES) {
    await prisma.internshipRole.upsert({
      where: { slug: roleData.slug },
      update: roleData,
      create: roleData,
    });
    console.log(`✓ Seeded role: ${roleData.title}`);
  }
  console.log('✅ All internship roles seeded successfully.');
}

seedRoles()
  .catch((e) => {
    console.error('Error seeding roles:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
