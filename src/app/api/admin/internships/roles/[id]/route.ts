import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

// PUT/PATCH /api/admin/internships/roles/[id] — Update internship role
export async function PATCH(
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

    const existing = await prisma.internshipRole.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Internship role not found' }, { status: 404 });
    }

    const updatedRole = await prisma.internshipRole.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title.trim() : undefined,
        domain: body.domain !== undefined ? body.domain.trim() : undefined,
        responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : undefined,
        requiredSkills: Array.isArray(body.requiredSkills) ? body.requiredSkills : undefined,
        eligibility: body.eligibility !== undefined ? body.eligibility.trim() : undefined,
        projectScope: body.projectScope !== undefined ? body.projectScope.trim() : undefined,
        supervisor: body.supervisor !== undefined ? body.supervisor.trim() : undefined,
        duration: body.duration !== undefined ? body.duration.trim() : undefined,
        workingExpectations: body.workingExpectations !== undefined ? body.workingExpectations.trim() : undefined,
        compensationTerms: body.compensationTerms !== undefined ? body.compensationTerms.trim() : undefined,
        completionCriteria: body.completionCriteria !== undefined ? body.completionCriteria.trim() : undefined,
        status: body.status !== undefined ? body.status : undefined,
        order: body.order !== undefined ? Number(body.order) : undefined,
      },
    });

    try {
      revalidatePath('/internships');
      revalidatePath('/api/internships/roles');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Internship role updated successfully.',
      role: updatedRole,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error updating internship role:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update internship role' }, { status: 500 });
  }
}

// DELETE /api/admin/internships/roles/[id] — Delete or Archive role
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if any applicants have been assigned this role
    const assignedCount = await prisma.internshipApplicant.count({
      where: { assignedRoleId: id },
    });

    if (assignedCount > 0) {
      // Preserve historical record by setting status to ARCHIVED instead of hard delete
      const archivedRole = await prisma.internshipRole.update({
        where: { id },
        data: { status: 'ARCHIVED' },
      });

      try {
        revalidatePath('/internships');
        revalidatePath('/api/internships/roles');
      } catch (e) {
        console.warn('Revalidation notice:', e);
      }

      return NextResponse.json({
        success: true,
        message: `Role has ${assignedCount} assigned applicant(s). Archived to preserve historical placement records.`,
        role: archivedRole,
      });
    }

    await prisma.internshipRole.delete({ where: { id } });

    try {
      revalidatePath('/internships');
      revalidatePath('/api/internships/roles');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Internship role deleted successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error deleting internship role:', err);
    return NextResponse.json({ error: err?.message || 'Failed to delete role' }, { status: 500 });
  }
}
