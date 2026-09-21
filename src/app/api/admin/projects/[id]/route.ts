import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/projects/[id]
export async function GET(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// PUT /api/admin/projects/[id] - Update project
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
      headline,
      badge,
      type,
      disciplineId,
      disciplineName,
      summary,
      invariant,
      metric,
      metricLabel,
      techStack,
      video,
      image,
      featured,
      year,
      client,
      systemEquation,
      keyDeliverables,
      status,
    } = body;

    const finalSummary = summary !== undefined && summary.trim() !== ''
      ? summary
      : (headline !== undefined ? headline : undefined);
    const finalInvariant = invariant !== undefined && invariant.trim() !== ''
      ? invariant
      : (headline !== undefined ? headline : undefined);

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(headline !== undefined && { headline }),
        ...(badge !== undefined && { badge }),
        ...(type !== undefined && { type }),
        ...(disciplineId !== undefined && { disciplineId }),
        ...(disciplineName !== undefined && { disciplineName }),
        ...(finalSummary !== undefined && { summary: finalSummary }),
        ...(finalInvariant !== undefined && { invariant: finalInvariant }),
        ...(metric !== undefined && { metric }),
        ...(metricLabel !== undefined && { metricLabel }),
        ...(techStack !== undefined && { techStack }),
        ...(video !== undefined && { video: video || null }),
        ...(image !== undefined && { image }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(year !== undefined && { year }),
        ...(client !== undefined && { client }),
        ...(systemEquation !== undefined && { systemEquation }),
        ...(keyDeliverables !== undefined && { keyDeliverables }),
        ...(status !== undefined && { status }),
      },
    });

    revalidatePath('/work');
    revalidatePath('/');

    return NextResponse.json({ success: true, project: updated });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error updating project:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath('/work');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error deleting project:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
