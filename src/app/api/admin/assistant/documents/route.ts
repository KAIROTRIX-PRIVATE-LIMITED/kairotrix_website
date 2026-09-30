import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// Initial foundational company knowledge documents
const DEFAULT_KNOWLEDGE_DOCS = [
  {
    title: 'KAIROTRIX Core Overview & Operating Model',
    category: 'Overview',
    tags: ['company', 'mission', 'principles', 'overview'],
    content: `Company Name: KAIROTRIX
Tagline: "Built to evolve. Made to solve."
Positioning: Problem-first AI technology & software engineering company.
We identify the customer's operational bottlenecks first, then build the right answer across custom software, AI agents, automation, or data integration.
Key Invariants:
• 100% Client-Owned IP: Clients own all custom code, models, and workflows with zero vendor lock-in.
• Direct Principal Engineers: Clients communicate directly with hands-on engineers, not junior agency layers.
• Production Reliability: Engineered for high uptime, clean architecture, and sub-second performance.`,
  },
  {
    title: 'Core Solution Areas',
    category: 'Services',
    tags: ['solutions', 'services', 'capabilities', 'disciplines'],
    content: `KAIROTRIX engineers across core technical disciplines:
• AI & Intelligent Systems: Autonomous AI agents, enterprise knowledge retrieval (RAG), custom generative applications, and MLOps pipelines.
• Software & Product Engineering: Mission-critical SaaS platforms, full-stack web/cloud architectures, microservices, and high-performance APIs.
• Automation & Digital Operations: Operational workflow automation, intelligent document processing, and human-in-the-loop approval systems.
• Digital Transformation: Legacy system modernization, UI/UX architecture, digitization of manual operational processes.
• Data & Business Intelligence: Real-time telemetry, data pipelines, ETL infrastructure, and executive cockpits/dashboards.
• Technology Integration: Connecting disparate ERPs, CRMs, custom databases, and synchronized multi-platform data ecosystems.`,
  },
  {
    title: 'Engagement & Project Delivery Framework',
    category: 'Process',
    tags: ['process', 'timeline', 'methodology', 'delivery'],
    content: `Our 4-Phase Delivery Framework:
Stage 01: Understand & Scope — We diagnose operational bottlenecks, clarify technical constraints, and define concrete deliverables.
Stage 02: Design & Architect — System blueprints, API contracts, database schemas, and UX wireframes.
Stage 03: Build & Test — Incremental agile development, continuous integration, security validation, and performance benchmarking.
Stage 04: Launch & Handover — Production deployment, documentation, 100% IP code transfer, and ongoing monitoring.
Response SLA: We review every inquiry and aim to follow up within one business day.`,
  },
  {
    title: 'Pricing & Consultation Policy',
    category: 'Pricing',
    tags: ['pricing', 'cost', 'consultation', 'rates'],
    content: `Pricing Approach:
• We do not sell one-size-fits-all generic templates. Every build is tailored to the client's exact problem, scale, and operational requirements.
• We offer fixed-scope milestone delivery for clearly bounded projects and dedicated sprint engineering for continuous evolution.
• Consultations: Visitors can book a direct 15-minute scoping call or start a conversation via /contact. We do not use deceptive sales tactics or pressure selling.`,
  },
  {
    title: 'KAIROTRIX — Website Navigation & Routing Knowledge',
    category: 'Navigation',
    tags: ['navigation', 'routing', 'urls', 'solutions', 'work', 'insights', 'contact', 'services', 'deep-links'],
    content: `Core Navigation Principle:
Understand user intent before routing. Never dump the entire navigation tree. Use: USER INTENT → RELEVANT CONTENT → BEST DESTINATION → OPTIONAL CONTEXT.
Maximum one primary destination and at most one secondary destination.

Verified Website Route Map:
• Solutions Overview: /solutions
• AI & Intelligent Systems: /solutions/ai-intelligent-systems
  - AI Application Development: /solutions/ai-intelligent-systems#ai-apps
  - AI Agent Development: /solutions/ai-intelligent-systems#ai-agents
  - AI / ML Development & Fine-Tuning: /solutions/ai-intelligent-systems#genai-ml
  - AI Knowledge Systems & Enterprise RAG: /solutions/ai-intelligent-systems#knowledge-systems
• Software & Product Engineering: /solutions/software-product-engineering
  - Custom Software Development: /solutions/software-product-engineering#custom-software
  - Web Application Development: /solutions/software-product-engineering#web-apps
  - Product Development & Engineering: /solutions/software-product-engineering#product-dev
  - Product Design & Design Systems: /solutions/software-product-engineering#product-design
• Automation & Digital Operations: /solutions/automation-digital-operations
  - Business Process Automation: /solutions/automation-digital-operations#process-automation
  - Workflow & Task Orchestration: /solutions/automation-digital-operations#workflows
  - Document & Approval Automation: /solutions/automation-digital-operations#document-automation
  - Autonomous Digital Operations: /solutions/automation-digital-operations#digital-ops
• Digital Transformation: /solutions/digital-transformation
  - Website Development & Web Craft: /solutions/digital-transformation#website-development
  - Process Digitization & Modernization: /solutions/digital-transformation#process-digitization
  - UI/UX Research & Interface Design: /solutions/digital-transformation#ui-ux-design
  - Headless CMS & Web Modernization: /solutions/digital-transformation#cms-modernization
• Data & Business Intelligence: /solutions/data-business-intelligence
  - Business Data Analytics & Warehousing: /solutions/data-business-intelligence#analytics
  - Executive & KPI Dashboards: /solutions/data-business-intelligence#dashboards
  - Predictive Modeling & Forecasting: /solutions/data-business-intelligence#predictive
  - Natural-Language Data Queries: /solutions/data-business-intelligence#nl-queries
• Technology Integration: /solutions/technology-integration
  - API & System Integration: /solutions/technology-integration#api-integration
  - CRM & ERP Synchronization: /solutions/technology-integration#crm-erp
  - Payment & Billing Gateways: /solutions/technology-integration#payments
  - Cross-System Data Synchronization: /solutions/technology-integration#data-sync
• Work / Projects Showcase: /work
• Insights / Engineering Articles: /insights
• Company Overview & Philosophy: /about
• Consultation & Inquiries: /contact
• Homepage: /

Rules:
• Do not invent URLs or slugs. Use only verified URLs and hashes.
• Use "Solutions", never "Capability".
• Never output internal numbers or taxonomy codes (such as 01.1, 1.1, 06.1). Always refer to solutions and services by their plain professional names.
• Do not force the contact page prematurely when visitors are seeking information.`,
  },
];

function sanitizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

function generateDocId(): string {
  return 'doc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

// GET: List all company knowledge documents
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let documents: any[] = [];

    if ((prisma as any).companyDocument) {
      const count = await prisma.companyDocument.count();
      if (count === 0) {
        for (let i = 0; i < DEFAULT_KNOWLEDGE_DOCS.length; i++) {
          const doc = DEFAULT_KNOWLEDGE_DOCS[i];
          await prisma.companyDocument.create({
            data: {
              title: doc.title,
              category: doc.category,
              content: doc.content,
              tags: doc.tags,
              isActive: true,
              order: i,
            },
          });
        }
      }

      documents = await prisma.companyDocument.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      });
    } else {
      // Direct raw PostgreSQL fallback if dev runtime has stale prisma delegate
      const rows: any[] = await prisma.$queryRawUnsafe(
        'SELECT * FROM "CompanyDocument" ORDER BY "order" ASC, "createdAt" DESC'
      );

      if (rows.length === 0) {
        for (let i = 0; i < DEFAULT_KNOWLEDGE_DOCS.length; i++) {
          const d = DEFAULT_KNOWLEDGE_DOCS[i];
          const newId = generateDocId();
          await prisma.$executeRawUnsafe(
            `INSERT INTO "CompanyDocument" ("id", "title", "category", "content", "tags", "isActive", "order", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
            newId,
            d.title,
            d.category,
            d.content,
            d.tags,
            true,
            i
          );
        }
        documents = await prisma.$queryRawUnsafe(
          'SELECT * FROM "CompanyDocument" ORDER BY "order" ASC, "createdAt" DESC'
        );
      } else {
        documents = rows;
      }
    }

    return NextResponse.json({ success: true, documents });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/admin/assistant/documents GET:', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch documents' }, { status: 500 });
  }
}

// POST: Create a new company knowledge document
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, content, tags, isActive } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const cleanTitle = title.trim();
    const cleanCategory = category?.trim() || 'General';
    const cleanContent = content.trim();
    const cleanTags = sanitizeTags(tags);
    const docActive = isActive !== undefined ? Boolean(isActive) : true;

    if ((prisma as any).companyDocument) {
      const doc = await prisma.companyDocument.create({
        data: {
          title: cleanTitle,
          category: cleanCategory,
          content: cleanContent,
          tags: cleanTags,
          isActive: docActive,
          order: 0,
        },
      });
      return NextResponse.json({ success: true, document: doc });
    }

    // Direct raw SQL fallback
    const id = generateDocId();
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CompanyDocument" ("id", "title", "category", "content", "tags", "isActive", "order", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
      id,
      cleanTitle,
      cleanCategory,
      cleanContent,
      cleanTags,
      docActive,
      0
    );

    const created = {
      id,
      title: cleanTitle,
      category: cleanCategory,
      content: cleanContent,
      tags: cleanTags,
      isActive: docActive,
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, document: created });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/admin/assistant/documents POST:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create document' }, { status: 500 });
  }
}

// PUT: Update an existing document
export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, category, content, tags, isActive, order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Document ID is required.' }, { status: 400 });
    }

    if ((prisma as any).companyDocument) {
      const updated = await prisma.companyDocument.update({
        where: { id },
        data: {
          ...(title !== undefined && { title: title.trim() }),
          ...(category !== undefined && { category: category.trim() }),
          ...(content !== undefined && { content: content.trim() }),
          ...(tags !== undefined && { tags: sanitizeTags(tags) }),
          ...(isActive !== undefined && { isActive: Boolean(isActive) }),
          ...(order !== undefined && { order: Number(order) }),
        },
      });
      return NextResponse.json({ success: true, document: updated });
    }

    // Direct raw SQL fallback
    const existing: any[] = await prisma.$queryRawUnsafe(
      'SELECT * FROM "CompanyDocument" WHERE "id" = $1',
      id
    );

    if (!existing || existing.length === 0) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const current = existing[0];
    const newTitle = title !== undefined ? title.trim() : current.title;
    const newCategory = category !== undefined ? category.trim() : current.category;
    const newContent = content !== undefined ? content.trim() : current.content;
    const newTags = tags !== undefined ? sanitizeTags(tags) : current.tags;
    const newIsActive = isActive !== undefined ? Boolean(isActive) : current.isActive;
    const newOrder = order !== undefined ? Number(order) : current.order;

    await prisma.$executeRawUnsafe(
      `UPDATE "CompanyDocument"
       SET "title" = $1, "category" = $2, "content" = $3, "tags" = $4, "isActive" = $5, "order" = $6, "updatedAt" = NOW()
       WHERE "id" = $7`,
      newTitle,
      newCategory,
      newContent,
      newTags,
      newIsActive,
      newOrder,
      id
    );

    const updated = {
      ...current,
      title: newTitle,
      category: newCategory,
      content: newContent,
      tags: newTags,
      isActive: newIsActive,
      order: newOrder,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, document: updated });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/admin/assistant/documents PUT:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update document' }, { status: 500 });
  }
}

// DELETE: Delete a document
export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Document ID is required.' }, { status: 400 });
    }

    if ((prisma as any).companyDocument) {
      await prisma.companyDocument.delete({
        where: { id },
      });
    } else {
      await prisma.$executeRawUnsafe('DELETE FROM "CompanyDocument" WHERE "id" = $1', id);
    }

    return NextResponse.json({ success: true, message: 'Document deleted successfully.' });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/admin/assistant/documents DELETE:', err);
    return NextResponse.json({ error: err?.message || 'Failed to delete document' }, { status: 500 });
  }
}
