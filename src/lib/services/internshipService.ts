import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import {
  DailyRecordEntry,
  DEFAULT_WHATSAPP_TEMPLATE,
  DEFAULT_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_EMAIL_BODY_TEMPLATE,
  DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_OFFER_EMAIL_BODY_TEMPLATE,
  DEFAULT_FOUNDER_BCC_EMAILS,
} from '@/types/internship';

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

/**
 * Get or initialize Internship Program Configuration & Communication Templates
 */
export async function getInternshipSettings() {
  let config: any = await prisma.internshipProgramConfig.findUnique({
    where: { id: 'default' },
  });

  if (!config) {
    config = await prisma.internshipProgramConfig.create({
      data: {
        id: 'default',
        isAcceptingApplications: true,
        offerLetterPrefix: 'KT/INT/2026/',
        offerLetterNextNumber: 4,
        offerLetterSignatoryTitle: 'Chief Operating Officer',
        whatsappTemplate: DEFAULT_WHATSAPP_TEMPLATE,
        emailSubjectTemplate: DEFAULT_EMAIL_SUBJECT_TEMPLATE,
        emailBodyTemplate: DEFAULT_EMAIL_BODY_TEMPLATE,
        offerEmailSubjectTemplate: DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE,
        offerEmailBodyTemplate: DEFAULT_OFFER_EMAIL_BODY_TEMPLATE,
      },
    });
  } else {
    // If any template or config is missing/null, fill with default
    const needsUpdate: Prisma.InternshipProgramConfigUpdateInput = {};
    if (!config.whatsappTemplate) needsUpdate.whatsappTemplate = DEFAULT_WHATSAPP_TEMPLATE;
    if (!config.emailSubjectTemplate) needsUpdate.emailSubjectTemplate = DEFAULT_EMAIL_SUBJECT_TEMPLATE;
    if (!config.emailBodyTemplate) needsUpdate.emailBodyTemplate = DEFAULT_EMAIL_BODY_TEMPLATE;
    if (!config.offerEmailSubjectTemplate) needsUpdate.offerEmailSubjectTemplate = DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE;
    if (!config.offerEmailBodyTemplate) needsUpdate.offerEmailBodyTemplate = DEFAULT_OFFER_EMAIL_BODY_TEMPLATE;

    if (Object.keys(needsUpdate).length > 0) {
      config = await prisma.internshipProgramConfig.update({
        where: { id: 'default' },
        data: needsUpdate,
      });
    }
  }

  // Ensure founderBccEmails is reliably read even if runtime Prisma client was loaded before schema update
  let bccVal = config?.founderBccEmails;
  if (!bccVal) {
    try {
      const rows: any = await prisma.$queryRawUnsafe(
        `SELECT "founderBccEmails" FROM "InternshipProgramConfig" WHERE id = 'default' LIMIT 1`
      );
      if (rows?.[0]?.founderBccEmails) {
        bccVal = rows[0].founderBccEmails;
      }
    } catch {
      // Fallback
    }
  }

  return {
    ...config,
    founderBccEmails: bccVal || DEFAULT_FOUNDER_BCC_EMAILS,
  };
}

/**
 * Update Internship Settings & Templates
 */
export async function updateInternshipSettings(data: {
  isAcceptingApplications?: boolean;
  whatsappTemplate?: string;
  emailSubjectTemplate?: string;
  emailBodyTemplate?: string;
  offerEmailSubjectTemplate?: string;
  offerEmailBodyTemplate?: string;
  offerLetterPrefix?: string;
  offerLetterNextNumber?: number;
  offerLetterSignatoryTitle?: string;
  founderBccEmails?: string;
  bannerAnnouncement?: string | null;
}) {
  const { founderBccEmails, ...prismaData } = data;

  const result = await prisma.internshipProgramConfig.upsert({
    where: { id: 'default' },
    update: { ...prismaData },
    create: {
      id: 'default',
      isAcceptingApplications: prismaData.isAcceptingApplications ?? true,
      offerLetterPrefix: prismaData.offerLetterPrefix || 'KT/INT/2026/',
      offerLetterNextNumber: prismaData.offerLetterNextNumber ?? 4,
      offerLetterSignatoryTitle: prismaData.offerLetterSignatoryTitle || 'Chief Operating Officer',
      whatsappTemplate: prismaData.whatsappTemplate,
      emailSubjectTemplate: prismaData.emailSubjectTemplate,
      emailBodyTemplate: prismaData.emailBodyTemplate,
      offerEmailSubjectTemplate: prismaData.offerEmailSubjectTemplate,
      offerEmailBodyTemplate: prismaData.offerEmailBodyTemplate,
      bannerAnnouncement: prismaData.bannerAnnouncement,
    },
  });

  // Update founderBccEmails directly in PostgreSQL to prevent runtime Prisma client schema mismatch
  if (founderBccEmails !== undefined) {
    try {
      await prisma.$executeRawUnsafe(
        `UPDATE "InternshipProgramConfig" SET "founderBccEmails" = $1 WHERE id = 'default'`,
        founderBccEmails
      );
    } catch (e) {
      console.warn('Could not update founderBccEmails via raw query:', e);
    }
  }

  return {
    ...result,
    founderBccEmails:
      founderBccEmails ?? (result as any)?.founderBccEmails ?? DEFAULT_FOUNDER_BCC_EMAILS,
  };
}

/**
 * Preview next Offer Reference ID based on current settings
 */
export async function getNextOfferRefPreview(): Promise<string> {
  const config = await getInternshipSettings();
  const prefix = config.offerLetterPrefix || 'KT/INT/2026/';
  const nextNum = config.offerLetterNextNumber || 4;
  return `${prefix}${String(nextNum).padStart(3, '0')}`;
}

export interface PublishOfferInput {
  applicantId: string;
  offerRef: string;
  designation: string;
  duration: string;
  startDate: string;
  endDate: string;
  periodText: string;
  issueDate: string;
  workMode: string;
  workingHours: string;
  stipend: string;
  acceptanceDueDate: string;
  signatoryTitle: string;
  terms?: string[];
  pdfDataUrl?: string;
}

/**
 * Publish Offer Letter for Applicant:
 * - Updates candidate offer details and status to OFFERED
 * - Increments next offer sequence number in settings
 * - Creates an audit timeline event
 */
export async function publishOfferLetter(input: PublishOfferInput) {
  return await prisma.$transaction(async (tx) => {
    const offerDetailsPayload = {
      offerRef: input.offerRef,
      designation: input.designation,
      duration: input.duration,
      startDate: input.startDate,
      endDate: input.endDate,
      period: input.periodText,
      issueDate: input.issueDate,
      workMode: input.workMode,
      workingHours: input.workingHours,
      stipend: input.stipend,
      acceptanceDueDate: input.acceptanceDueDate,
      signatoryTitle: input.signatoryTitle,
      terms: input.terms || [],
      pdfDataUrl: input.pdfDataUrl || null,
    };

    const applicant = await tx.internshipApplicant.update({
      where: { id: input.applicantId },
      data: {
        offerRef: input.offerRef,
        offerDetails: offerDetailsPayload,
        offerStatus: 'PENDING',
        offerIssuedAt: new Date(),
        status: 'OFFERED',
      },
    });

    // Increment next offer letter number if it matches current sequence
    const config = await tx.internshipProgramConfig.findUnique({
      where: { id: 'default' },
    });

    if (config) {
      const currentNext = config.offerLetterNextNumber || 4;
      await tx.internshipProgramConfig.update({
        where: { id: 'default' },
        data: {
          offerLetterNextNumber: currentNext + 1,
        },
      });
    }

    // Add Timeline Event
    await tx.internshipTimelineEvent.create({
      data: {
        applicantId: input.applicantId,
        action: 'OFFER_ISSUED',
        actor: 'Admin',
        note: `Internship Offer Letter (${input.offerRef}) published for ${input.designation}. Period: ${input.periodText}. Work Mode: ${input.workMode}.`,
      },
    });

    return applicant;
  });
}

/**
 * Mark applicant as Hired / Accepted:
 * - Sets status to ACCEPTED
 * - Sets hiredAt date
 * - Records timeline event
 */
export async function markApplicantAsHired(applicantId: string) {
  return await prisma.$transaction(async (tx) => {
    const applicant = await tx.internshipApplicant.update({
      where: { id: applicantId },
      data: {
        status: 'ACCEPTED',
        offerStatus: 'ACCEPTED',
        hiredAt: new Date(),
        offerAcceptedAt: new Date(),
      },
    });

    await tx.internshipTimelineEvent.create({
      data: {
        applicantId,
        action: 'OFFER_ACCEPTED',
        actor: 'Admin',
        note: `Applicant marked as HIRED / ACCEPTED. Moved to Active Interns directory.`,
      },
    });

    return applicant;
  });
}

/**
 * Fetch all Active & Hired Interns
 */
export async function getActiveInterns() {
  return await prisma.internshipApplicant.findMany({
    where: {
      OR: [
        { status: { in: ['ACCEPTED', 'ACTIVE', 'COMPLETED'] } },
        { hiredAt: { not: null } },
      ],
    },
    include: {
      assignedRole: true,
      timeline: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: [{ hiredAt: 'desc' }, { createdAt: 'desc' }],
  });
}

/**
 * Add Daily Record or Note to an Intern (HRMS Log)
 */
export async function addDailyRecordToIntern(
  applicantId: string,
  note: string,
  author: string = 'Admin'
) {
  const applicant = await prisma.internshipApplicant.findUnique({
    where: { id: applicantId },
  });

  if (!applicant) throw new Error('Applicant not found');

  const existingRecords: DailyRecordEntry[] = Array.isArray(applicant.dailyRecords)
    ? (applicant.dailyRecords as unknown as DailyRecordEntry[])
    : [];

  const newRecord: DailyRecordEntry = {
    id: `rec_${Date.now()}`,
    date: new Date().toISOString(),
    note: note.trim(),
    author,
  };

  const updatedRecords = [newRecord, ...existingRecords];

  return await prisma.$transaction(async (tx) => {
    const updated = await tx.internshipApplicant.update({
      where: { id: applicantId },
      data: {
        dailyRecords: updatedRecords as unknown as Prisma.InputJsonValue,
      },
    });

    await tx.internshipTimelineEvent.create({
      data: {
        applicantId,
        action: 'DAILY_RECORD_ADDED',
        actor: author,
        note: `Daily Record logged: "${note.trim().slice(0, 100)}${note.length > 100 ? '...' : ''}"`,
      },
    });

    return updated;
  });
}

/**
 * Mark Intern as Completed
 */
export async function markInternCompleted(
  applicantId: string,
  feedback?: string
) {
  return await prisma.$transaction(async (tx) => {
    const updated = await tx.internshipApplicant.update({
      where: { id: applicantId },
      data: {
        status: 'COMPLETED',
        completionFeedback: feedback || 'Successfully completed internship period.',
      },
    });

    await tx.internshipTimelineEvent.create({
      data: {
        applicantId,
        action: 'INTERNSHIP_COMPLETED',
        actor: 'Admin',
        note: `Internship successfully marked as COMPLETED. Certificate pending official template issuance.`,
      },
    });

    return updated;
  });
}

