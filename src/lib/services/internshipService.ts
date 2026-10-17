import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export interface CreateApplicantInput {
  fullName: string;
  email: string;
  phone?: string;
  institution: string;
  degree?: string;
  course?: string;
  yearOfStudy: string;
  roleAppliedFor?: string;
  duration?: string;
  technicalSkills?: string[];
  projectExperience?: string;
  preferredDomains?: string[];
  githubUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  otherLinks?: string;
  resumeUrl: string;
  resumeName?: string;
  weeklyAvailability?: string;
  potentialStartDate?: string;
  motivation?: string;
  privacyConsent: boolean;
  complianceAck?: boolean;
}

export interface CreateRoleInput {
  title: string;
  slug: string;
  domain: string;
  responsibilities: string[];
  requiredSkills: string[];
  eligibility: string;
  projectScope: string;
  supervisor: string;
  duration: string;
  workingExpectations: string;
  compensationTerms: string;
  completionCriteria: string;
  status?: string;
  order?: number;
}

export type UpdateRoleInput = Partial<CreateRoleInput>;

// Default exploratory domains for student guidance & preference collection
export const INTERNSHIP_DOMAINS = [
  {
    id: 'software-development',
    title: 'Software Development',
    category: 'Engineering',
    headline: 'Build robust, production-grade web systems and backend services.',
    description:
      'Focus on full-stack web applications, API development, clean architecture, performance optimization, and reliable engineering practices.',
    coreSkills: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'REST & GraphQL APIs'],
    sampleProjects: [
      'Interactive customer portal systems',
      'High-performance backend data pipelines',
      'API connectors and webhook orchestration engines',
    ],
  },
  {
    id: 'ai-intelligent-systems',
    title: 'AI & Intelligent Systems',
    category: 'AI & Machine Learning',
    headline: 'Design and deploy grounded AI agents, RAG systems, and smart workflows.',
    description:
      'Explore practical AI engineering: connecting LLMs to business data, prompt orchestration, evaluation frameworks, embeddings, and intelligent agents.',
    coreSkills: ['Python', 'LangChain / LlamaIndex', 'Vector Databases', 'OpenAI/Groq APIs', 'RAG Pipelines'],
    sampleProjects: [
      'Autonomous research and knowledge extraction assistants',
      'Context-aware enterprise document query engines',
      'Real-time automated support triage pipelines',
    ],
  },
  {
    id: 'automation-technology-integration',
    title: 'Automation & Technology Integration',
    category: 'Systems & Ops',
    headline: 'Eliminate repetitive manual toil through resilient automation pipelines.',
    description:
      'Work on system-to-system integrations, CRM/ERP synchronization, transactional event webhooks, background job workers, and automated business operations.',
    coreSkills: ['Node.js / Python', 'REST APIs & Webhooks', 'Event Queues', 'Cron & Background Jobs', 'Third-Party SDKs'],
    sampleProjects: [
      'Automated multi-system billing and invoice sync',
      'Document generation and approval workflows',
      'Operational health monitoring and proactive alert triggers',
    ],
  },
  {
    id: 'data-analytics-bi',
    title: 'Data Analytics & Business Intelligence',
    category: 'Data Engineering',
    headline: 'Turn complex operational logs and relational data into actionable intelligence.',
    description:
      'Develop analytical data models, schema pipelines, interactive telemetry dashboards, and predictive metrics for operational decision-making.',
    coreSkills: ['SQL & PostgreSQL', 'Python (Pandas, NumPy)', 'Data Modeling', 'Interactive Charting / Dashboards', 'ETL Pipelines'],
    sampleProjects: [
      'Executive KPI and operational performance cockpits',
      'Automated telemetry aggregation and anomaly detection',
      'Data extraction and structured business warehousing',
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Product Design',
    headline: 'Craft intuitive, accessible, and high-performance digital interfaces.',
    description:
      'Design clean user journeys, wireframes, design system tokens, interactive prototypes, and collaborate directly with engineers to see designs come alive in production.',
    coreSkills: ['Figma', 'Design Systems', 'Interactive Prototyping', 'Design Tokens', 'User Research & Accessibility (WCAG)'],
    sampleProjects: [
      'Complete component design library and token taxonomy',
      'Interactive analytical dashboard prototypes',
      'Mobile-first responsive workflows and touch interactions',
    ],
  },
];

/**
 * Fetch all published internship roles for the public website
 */
export async function getPublishedInternshipRoles() {
  try {
    return await prisma.internshipRole.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  } catch (error) {
    console.error('Error fetching published internship roles:', error);
    return [];
  }
}

/**
 * Submit general student application
 */
export async function submitInternshipApplication(input: CreateApplicantInput) {
  return await prisma.$transaction(async (tx) => {
    const assignedRole = input.roleAppliedFor?.trim() || input.preferredDomains?.[0] || 'General Software / Tech';
    const selectedDuration = input.duration?.trim() || '3 Months';

    const applicant = await tx.internshipApplicant.create({
      data: {
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone?.trim() || null,
        institution: input.institution.trim(),
        degree: input.degree?.trim() || 'Undergraduate',
        course: input.course?.trim() || 'Engineering / Tech',
        yearOfStudy: input.yearOfStudy.trim(),
        technicalSkills: input.technicalSkills || [],
        projectExperience: input.projectExperience?.trim() || input.githubUrl || input.portfolioUrl || 'Direct portfolio / GitHub submission',
        preferredDomains: [assignedRole],
        githubUrl: input.githubUrl?.trim() || null,
        portfolioUrl: input.portfolioUrl?.trim() || null,
        linkedinUrl: input.linkedinUrl?.trim() || null,
        otherLinks: input.otherLinks?.trim() || null,
        resumeUrl: input.resumeUrl.trim(),
        resumeName: input.resumeName?.trim() || null,
        weeklyAvailability: selectedDuration,
        potentialStartDate: input.potentialStartDate?.trim() || 'Immediate',
        motivation: input.motivation?.trim() || 'Direct application',
        privacyConsent: input.privacyConsent,
        complianceAck: Boolean(input.complianceAck ?? input.privacyConsent),
        status: 'REVIEW',
      },
    });

    await tx.internshipTimelineEvent.create({
      data: {
        applicantId: applicant.id,
        action: 'APPLICATION_SUBMITTED',
        actor: 'Applicant',
        note: `Application submitted for ${assignedRole} (${selectedDuration}). Mobile: ${input.phone || 'N/A'}, College: ${input.institution}.`,
      },
    });

    return applicant;
  });
}

/**
 * Admin: Fetch all applicants with optional filtering and search
 */
export async function getAdminApplicants(options?: {
  status?: string;
  domain?: string;
  search?: string;
}) {
  const where: Prisma.InternshipApplicantWhereInput = {};

  if (options?.status && options.status !== 'ALL') {
    where.status = options.status;
  }

  if (options?.domain && options.domain !== 'ALL') {
    where.preferredDomains = {
      has: options.domain,
    };
  }

  if (options?.search && options.search.trim()) {
    const query = options.search.trim();
    where.OR = [
      { fullName: { contains: query, mode: 'insensitive' } },
      { email: { contains: query, mode: 'insensitive' } },
      { institution: { contains: query, mode: 'insensitive' } },
      { course: { contains: query, mode: 'insensitive' } },
    ];
  }

  return await prisma.internshipApplicant.findMany({
    where,
    include: {
      assignedRole: true,
      timeline: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Admin: Get applicant by ID
 */
export async function getAdminApplicantById(id: string) {
  return await prisma.internshipApplicant.findUnique({
    where: { id },
    include: {
      assignedRole: true,
      timeline: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Admin: Fetch all internship roles (all statuses)
 */
export async function getAdminInternshipRoles() {
  return await prisma.internshipRole.findMany({
    include: {
      _count: {
        select: { assignedApplicants: true },
      },
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
}
