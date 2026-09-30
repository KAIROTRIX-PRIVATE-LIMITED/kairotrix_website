import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// GET /api/admin/team/visibility - Get current visibility
export async function GET() {
  try {
    const rows = await prisma.$queryRaw<Array<{ isTeamSectionVisible: boolean }>>`
      SELECT "isTeamSectionVisible" FROM "AboutConfig" WHERE id = 'default' LIMIT 1
    `;
    const isVisible =
      rows && rows.length > 0
        ? Boolean(rows[0].isTeamSectionVisible ?? (rows[0] as any).isteamsectionvisible)
        : true;

    return NextResponse.json({ success: true, isTeamSectionVisible: isVisible });
  } catch (err) {
    console.error('Error fetching section visibility:', err);
    return NextResponse.json({ success: true, isTeamSectionVisible: true });
  }
}

// PATCH /api/admin/team/visibility - Toggle section visibility on public site
export async function PATCH(request: Request) {
  return handleVisibilityUpdate(request);
}

// POST /api/admin/team/visibility - Toggle section visibility on public site
export async function POST(request: Request) {
  return handleVisibilityUpdate(request);
}

async function handleVisibilityUpdate(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let isVisible: boolean | null = null;
    try {
      const body = await request.json();
      if (typeof body.isTeamSectionVisible === 'boolean') {
        isVisible = body.isTeamSectionVisible;
      } else if (typeof body.isVisible === 'boolean') {
        isVisible = body.isVisible;
      }
    } catch {
      // Body may be empty or not JSON
    }

    if (isVisible === null) {
      const rows = await prisma.$queryRaw<Array<{ isTeamSectionVisible: boolean }>>`
        SELECT "isTeamSectionVisible" FROM "AboutConfig" WHERE id = 'default' LIMIT 1
      `;
      const currentVal =
        rows && rows.length > 0
          ? Boolean(rows[0].isTeamSectionVisible ?? (rows[0] as any).isteamsectionvisible)
          : false;
      isVisible = !currentVal;
    }

    // Direct PostgreSQL upsert using raw SQL
    await prisma.$executeRaw`
      INSERT INTO "AboutConfig" (id, "isTeamSectionVisible", "updatedAt")
      VALUES ('default', ${isVisible}, NOW())
      ON CONFLICT (id) DO UPDATE
      SET "isTeamSectionVisible" = ${isVisible}, "updatedAt" = NOW()
    `;

    revalidatePath('/about');
    revalidatePath('/admin/team');

    return NextResponse.json({
      success: true,
      isTeamSectionVisible: isVisible,
      isVisible,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error toggling section visibility:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to toggle section visibility.' },
      { status: 500 }
    );
  }
}
