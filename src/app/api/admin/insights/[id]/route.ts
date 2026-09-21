import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/insights/[id]
export async function GET(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const insight = await prisma.insight.findUnique({
      where: { id },
    });

    if (!insight) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, insight });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// PUT /api/admin/insights/[id] - Update insight
export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    const {
      title,
      slug,
      subtitle,
      excerpt,
      content,
      category,
      badge,
      disciplineId,
      disciplineName,
      date,
      readTime,
      author,
      authorRole,
      tags,
      featured,
      videoSrc,
      image,
      keyTakeaway,
      empiricalMetricLabel,
      empiricalMetricValue,
      architectureEquation,
      keySections,
      status,
    } = body;

    const updated = await prisma.insight.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(subtitle !== undefined && { subtitle }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(category !== undefined && { category }),
        ...(badge !== undefined && { badge }),
        ...(disciplineId !== undefined && { disciplineId }),
        ...(disciplineName !== undefined && { disciplineName }),
        ...(date !== undefined && { date }),
        ...(readTime !== undefined && { readTime }),
        ...(author !== undefined && { author }),
        ...(authorRole !== undefined && { authorRole }),
        ...(tags !== undefined && { tags }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(videoSrc !== undefined && { videoSrc }),
        ...(image !== undefined && { image }),
        ...(keyTakeaway !== undefined && { keyTakeaway }),
        ...(empiricalMetricLabel !== undefined && { empiricalMetricLabel }),
        ...(empiricalMetricValue !== undefined && { empiricalMetricValue }),
        ...(architectureEquation !== undefined && { architectureEquation }),
        ...(keySections !== undefined && { keySections }),
        ...(status !== undefined && { status }),
      },
    });

    return NextResponse.json({ success: true, insight: updated });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error updating insight:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// DELETE /api/admin/insights/[id] - Delete insight
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.insight.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Article deleted successfully.' });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error deleting insight:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
