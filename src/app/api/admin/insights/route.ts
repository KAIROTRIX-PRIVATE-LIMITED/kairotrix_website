import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// GET /api/admin/insights - List all insights/articles
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const insights = await prisma.insight.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, insights });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching admin insights:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch insights.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/insights - Create a new article or knowledge specimen
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
      subtitle,
      excerpt,
      content,
      category = 'article',
      badge = 'TECHNICAL DEEP DIVE',
      disciplineId,
      disciplineName,
      date = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime = '5 min read',
      author = 'KAIROTRIX Systems Lab',
      authorRole = 'Core Engineering',
      tags = [],
      featured = false,
      videoSrc,
      image,
      keyTakeaway,
      empiricalMetricLabel,
      empiricalMetricValue,
      architectureEquation,
      keySections = [],
      status = 'PUBLISHED',
    } = body;

    if (!title || !subtitle || !excerpt || !disciplineId) {
      return NextResponse.json(
        { error: 'Title, subtitle, excerpt, and discipline are required fields.' },
        { status: 400 }
      );
    }

    let cleanSlug =
      slug?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') ||
      `insight-${Date.now()}`;

    const existing = await prisma.insight.findUnique({
      where: { slug: cleanSlug },
    });

    if (existing) {
      cleanSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
    }

    const insight = await prisma.insight.create({
      data: {
        title,
        slug: cleanSlug,
        subtitle,
        excerpt,
        content: content || null,
        category,
        badge,
        disciplineId,
        disciplineName: disciplineName || disciplineId,
        date,
        readTime,
        author,
        authorRole,
        tags: Array.isArray(tags) ? tags : [],
        featured: Boolean(featured),
        videoSrc: videoSrc || null,
        image: image || '',
        keyTakeaway: keyTakeaway || excerpt,
        empiricalMetricLabel: empiricalMetricLabel || null,
        empiricalMetricValue: empiricalMetricValue || null,
        architectureEquation: architectureEquation || null,
        keySections: Array.isArray(keySections) ? keySections : [],
        status: status || 'PUBLISHED',
      },
    });

    return NextResponse.json({ success: true, insight }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error creating insight:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create insight.' },
      { status: 500 }
    );
  }
}
