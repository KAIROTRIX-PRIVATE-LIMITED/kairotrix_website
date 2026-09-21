import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { getAdminTeamData, TeamMemberData } from '@/lib/services/teamService';

// GET /api/admin/team - Get all team members & section visibility
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getAdminTeamData();
    return NextResponse.json({ success: true, ...data });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching admin team data:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch team data.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/team - Create a new team member
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      role,
      badge,
      image = '/assets/images/about/team-ethan.jpg',
      twitter,
      linkedin,
      github,
      order = 0,
      isActive = true,
    } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: 'Name and role are required fields.' },
        { status: 400 }
      );
    }

    const newId = `team_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const parsedOrder = Number(order) || 0;
    const parsedActive = isActive === undefined ? true : Boolean(isActive);

    await prisma.$executeRaw`
      INSERT INTO "TeamMember" (
        id, name, role, badge, image, twitter, linkedin, github, "order", "isActive", "createdAt", "updatedAt"
      ) VALUES (
        ${newId},
        ${name},
        ${role},
        ${badge || null},
        ${image},
        ${twitter || null},
        ${linkedin || null},
        ${github || null},
        ${parsedOrder},
        ${parsedActive},
        NOW(),
        NOW()
      )
    `;

    const newMember: TeamMemberData = {
      id: newId,
      name,
      role,
      badge: badge || null,
      image,
      twitter: twitter || null,
      linkedin: linkedin || null,
      github: github || null,
      order: parsedOrder,
      isActive: parsedActive,
    };

    revalidatePath('/about');
    revalidatePath('/admin/team');

    return NextResponse.json({ success: true, member: newMember });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error creating team member:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create team member.' },
      { status: 500 }
    );
  }
}
