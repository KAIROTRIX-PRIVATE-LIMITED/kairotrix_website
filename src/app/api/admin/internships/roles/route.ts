import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { getAdminInternshipRoles } from '@/lib/services/internshipService';

export const runtime = 'nodejs';

// GET /api/admin/internships/roles — Fetch all roles for admin dashboard
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const roles = await getAdminInternshipRoles();
    return NextResponse.json({ success: true, roles });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// POST /api/admin/internships/roles — Create a new dynamic internship role
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      domain = 'Engineering',
      responsibilities = [],
      requiredSkills = [],
      eligibility = 'Students pursuing degree in Engineering, Computer Science, or Design.',
      projectScope = 'Software, AI, or automation projects.',
      supervisor = 'Engineering Lead',
      duration = '3 Months',
      workingExpectations = 'Remote, 15-20 hrs/week',
      compensationTerms = 'Milestone-linked stipend',
      completionCriteria = 'Milestone completion',
      status = 'PUBLISHED',
      order = 0,
    } = body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a role title.' },
        { status: 400 }
      );
    }

    // Generate unique slug
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.internshipRole.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const newRole = await prisma.internshipRole.create({
      data: {
        title: title.trim(),
        slug,
        domain: domain.trim(),
        responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
        requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
        eligibility: eligibility?.trim() || 'Students pursuing relevant degree in Computer Science, Engineering, or Design.',
        projectScope: projectScope?.trim() || 'Internal software, AI, or automation project execution under senior mentorship.',
        supervisor: supervisor.trim(),
        duration: duration.trim(),
        workingExpectations: workingExpectations?.trim() || 'Remote, 15-20 hours/week, async communication with weekly engineering review.',
        compensationTerms: compensationTerms?.trim() || 'Performance-linked monthly stipend upon milestone review / Legal compliance verified.',
        completionCriteria: completionCriteria?.trim() || 'Satisfactory completion of assigned milestones and technical presentation.',
        status,
        order: Number(order) || 0,
      },
    });

    // Revalidate public cache
    try {
      revalidatePath('/internships');
      revalidatePath('/api/internships/roles');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Internship role created successfully.',
      role: newRole,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error creating internship role:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create internship role' }, { status: 500 });
  }
}
