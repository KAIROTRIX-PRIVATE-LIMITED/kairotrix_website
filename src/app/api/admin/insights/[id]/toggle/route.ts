import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PATCH /api/admin/insights/[id]/toggle - 1-Click Status Toggle (PUBLISHED <-> PAUSED)
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const current = await prisma.insight.findUnique({
      where: { id },
      select: { id: true, status: true, title: true },
    });

    if (!current) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    const newStatus = current.status === 'PUBLISHED' ? 'PAUSED' : 'PUBLISHED';

    const updated = await prisma.insight.update({
      where: { id },
      data: { status: newStatus },
      select: { id: true, title: true, status: true },
    });

    return NextResponse.json({
      success: true,
      message: `Article "${updated.title}" is now ${newStatus}.`,
      insight: updated,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error toggling insight status:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
