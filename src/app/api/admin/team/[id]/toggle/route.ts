import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { TeamMemberData } from '@/lib/services/teamService';

// PATCH /api/admin/team/[id]/toggle - 1-Click active status toggle
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.$queryRaw<TeamMemberData[]>`
      SELECT id, name, role, badge, image, twitter, linkedin, github, "order", "isActive"
      FROM "TeamMember"
      WHERE id = ${id}
      LIMIT 1
    `;

    if (!existing || existing.length === 0) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    const current = existing[0];
    const currentActive = Boolean(current.isActive ?? (current as any).isactive);
    const newActive = !currentActive;

    await prisma.$executeRaw`
      UPDATE "TeamMember"
      SET "isActive" = ${newActive}, "updatedAt" = NOW()
      WHERE id = ${id}
    `;

    const updatedMember = {
      ...current,
      isActive: newActive,
    };

    revalidatePath('/about');
    revalidatePath('/admin/team');

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error toggling member status:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to toggle member status.' },
      { status: 500 }
    );
  }
}
