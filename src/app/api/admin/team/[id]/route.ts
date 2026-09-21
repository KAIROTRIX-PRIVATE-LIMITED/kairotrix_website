import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { TeamMemberData } from '@/lib/services/teamService';

// PUT /api/admin/team/[id] - Update a team member
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, role, badge, image, twitter, linkedin, github, order, isActive } = body;

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
    const updatedName = name !== undefined ? name : current.name;
    const updatedRole = role !== undefined ? role : current.role;
    const updatedBadge = badge !== undefined ? (badge || null) : (current.badge || null);
    const updatedImage = image !== undefined ? image : current.image;
    const updatedTwitter = twitter !== undefined ? (twitter || null) : (current.twitter || null);
    const updatedLinkedin = linkedin !== undefined ? (linkedin || null) : (current.linkedin || null);
    const updatedGithub = github !== undefined ? (github || null) : (current.github || null);
    const updatedOrder = order !== undefined ? Number(order) : (Number(current.order) || 0);
    const updatedActive =
      isActive !== undefined
        ? Boolean(isActive)
        : Boolean(current.isActive ?? (current as any).isactive);

    await prisma.$executeRaw`
      UPDATE "TeamMember"
      SET
        name = ${updatedName},
        role = ${updatedRole},
        badge = ${updatedBadge},
        image = ${updatedImage},
        twitter = ${updatedTwitter},
        linkedin = ${updatedLinkedin},
        github = ${updatedGithub},
        "order" = ${updatedOrder},
        "isActive" = ${updatedActive},
        "updatedAt" = NOW()
      WHERE id = ${id}
    `;

    const updatedMember: TeamMemberData = {
      id,
      name: updatedName,
      role: updatedRole,
      badge: updatedBadge,
      image: updatedImage,
      twitter: updatedTwitter,
      linkedin: updatedLinkedin,
      github: updatedGithub,
      order: updatedOrder,
      isActive: updatedActive,
    };

    revalidatePath('/about');
    revalidatePath('/admin/team');

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error updating team member:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to update team member.' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/team/[id] - Delete a team member
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.$executeRaw`
      DELETE FROM "TeamMember"
      WHERE id = ${id}
    `;

    revalidatePath('/about');
    revalidatePath('/admin/team');

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error deleting team member:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to delete team member.' },
      { status: 500 }
    );
  }
}
