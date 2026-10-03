import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// GET /api/admin/projects - List all projects with status
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, projects });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching admin projects:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch projects.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects - Create a new project
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      headline,
      badge = 'KAIROTRIX BUILD',
      type = 'project',
      disciplineId,
      disciplineName,
      summary,
      invariant,
      metric,
      metricLabel,
      techStack = [],
      video,
      image,
      featured = false,
      year = new Date().getFullYear().toString(),
      client = 'KAIROTRIX Engineering Lab',
      systemEquation,
      keyDeliverables = [],
      status = 'ACTIVE',
    } = body;

    const finalSummary = summary?.trim() || headline?.trim() || '';
    const finalInvariant = invariant?.trim() || headline?.trim() || '';

    if (!title?.trim() || !headline?.trim() || !disciplineId?.trim()) {
      return NextResponse.json(
        { error: 'Title, headline, and discipline are required fields.' },
        { status: 400 }
      );
    }

    // Auto-generate slug from title
    let cleanSlug =
      slug?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    // Check slug uniqueness; append short random suffix if duplicate exists
    const existing = await prisma.project.findUnique({
      where: { slug: cleanSlug },
    });

    if (existing) {
      cleanSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug: cleanSlug,
        headline: headline.trim(),
        badge: badge || 'KAIROTRIX BUILD',
        type: type || 'project',
        disciplineId: disciplineId.trim(),
        disciplineName: disciplineName || disciplineId,
        summary: finalSummary,
        invariant: finalInvariant,
        metric: metric || 'Production Standard',
        metricLabel: metricLabel || 'Verified SLA',
        techStack: Array.isArray(techStack) ? techStack : [],
        video: video || null,
        image: image || '',
        featured: Boolean(featured),
        year: year || new Date().getFullYear().toString(),
        client: client || 'KAIROTRIX',
        systemEquation: systemEquation || null,
        keyDeliverables: Array.isArray(keyDeliverables) ? keyDeliverables : [],
        status: status === 'PAUSED' ? 'PAUSED' : 'ACTIVE',
      },
    });

    // Flush Next.js cache so the public /work page immediately reflects the new project
    revalidatePath('/work');
    revalidatePath('/');

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error creating project:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create project.' },
      { status: 500 }
    );
  }
}
