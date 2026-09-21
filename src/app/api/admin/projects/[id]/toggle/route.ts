import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PATCH /api/admin/projects/[id]/toggle - 1-Click Status Toggle (ACTIVE <-> PAUSED)
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const current = await prisma.project.findUnique({
      where: { id },
      select: { id: true, status: true, title: true },
    });

    if (!current) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const newStatus = current.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';

    const updated = await prisma.project.update({
      where: { id },
      data: { status: newStatus },
      select: { id: true, title: true, status: true },
    });

    revalidatePath('/work');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: `Project "${updated.title}" is now ${newStatus}.`,
      project: updated,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error toggling project status:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
