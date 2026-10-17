import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { getAdminApplicantById } from '@/lib/services/internshipService';

export const runtime = 'nodejs';

// GET /api/admin/internships/applicants/[id] — Fetch single applicant
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const applicant = await getAdminApplicantById(id);

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, applicant });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// PATCH /api/admin/internships/applicants/[id] — Update applicant evaluation, status, role assignment, offer, certificate
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
    const adminActor = session.name || session.email || 'Admin';

    const existing = await prisma.internshipApplicant.findUnique({
      where: { id },
      include: { assignedRole: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Applicant record not found' }, { status: 404 });
    }

    const {
      status,
      internalRating,
      interviewFeedback,
      assessmentNotes,
      internalNotes,
      assignedRoleId,
      assignmentReason,
      offerDetails,
      offerStatus,
      issueCertificate,
      certificateCriteriaMet,
      completionFeedback,
    } = body;

    const updateData: any = {};
    const timelineEventsToCreate: { action: string; actor: string; note?: string }[] = [];

    // 1. Status update
    if (status && status !== existing.status) {
      updateData.status = status;
      timelineEventsToCreate.push({
        action: 'STATUS_CHANGED',
        actor: adminActor,
        note: `Applicant pipeline stage advanced from ${existing.status} to ${status}.`,
      });
    }

    // 2. Ratings & Notes
    if (internalRating !== undefined) updateData.internalRating = internalRating;
    if (interviewFeedback !== undefined) updateData.interviewFeedback = interviewFeedback;
    if (assessmentNotes !== undefined) updateData.assessmentNotes = assessmentNotes;
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes;

    // 3. Administrative Role Assignment
    if (assignedRoleId !== undefined) {
      if (assignedRoleId === null || assignedRoleId === '') {
        // Unassign role
        updateData.assignedRoleId = null;
        updateData.assignedRoleTitle = null;
        updateData.assignmentReason = null;
        updateData.assignedAt = null;

        timelineEventsToCreate.push({
          action: 'ROLE_UNASSIGNED',
          actor: adminActor,
          note: `Previous role assignment removed. Application returned to general pool.`,
        });
      } else {
        // Assign new or changed role
        const role = await prisma.internshipRole.findUnique({ where: { id: assignedRoleId } });
        if (!role) {
          return NextResponse.json({ error: 'Specified internship role does not exist.' }, { status: 400 });
        }

        updateData.assignedRoleId = role.id;
        updateData.assignedRoleTitle = role.title; // Historic snapshot
        updateData.assignmentReason = assignmentReason || 'Candidate matched based on skills, project experience, and project scope.';
        updateData.assignedAt = new Date();

        timelineEventsToCreate.push({
          action: 'ROLE_ASSIGNED',
          actor: adminActor,
          note: `Assigned final internship role: "${role.title}". Administrative Rationale: "${updateData.assignmentReason}".`,
        });
      }
    }

    // 4. Offer Issuance & Terms
    if (offerDetails !== undefined) {
      updateData.offerDetails = offerDetails;
      updateData.offerStatus = offerStatus || 'PENDING';
      updateData.offerIssuedAt = new Date();

      timelineEventsToCreate.push({
        action: 'OFFER_ISSUED',
        actor: adminActor,
        note: `Formal written internship offer drafted and issued. Terms: Duration: ${offerDetails.duration || 'Standard'}, Compensation/Stipend: ${offerDetails.stipend || 'Disclosed'}, Supervisor: ${offerDetails.supervisor || 'Assigned Lead'}.`,
      });
    }

    if (offerStatus && offerStatus !== existing.offerStatus && offerDetails === undefined) {
      updateData.offerStatus = offerStatus;
      if (offerStatus === 'ACCEPTED') {
        updateData.offerAcceptedAt = new Date();
        updateData.status = 'ACCEPTED';
      }
      timelineEventsToCreate.push({
        action: `OFFER_${offerStatus}`,
        actor: adminActor,
        note: `Internship offer status updated to: ${offerStatus}.`,
      });
    }

    // 5. Certificate Issuance
    if (issueCertificate) {
      if (!certificateCriteriaMet && !existing.certificateCriteriaMet) {
        return NextResponse.json(
          { error: 'Cannot issue certificate. Documented completion criteria must be formally verified first.' },
          { status: 400 }
        );
      }

      const certYear = new Date().getFullYear();
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const generatedCertId = `KTRX-CERT-${certYear}-${randomCode}`;

      updateData.certificateIssued = true;
      updateData.certificateId = existing.certificateId || generatedCertId;
      updateData.certificateIssuedAt = new Date();
      updateData.certificateCriteriaMet = true;
      updateData.status = 'COMPLETED';
      if (completionFeedback) updateData.completionFeedback = completionFeedback;

      timelineEventsToCreate.push({
        action: 'CERTIFICATE_ISSUED',
        actor: adminActor,
        note: `Verified completion criteria met. Official KAIROTRIX Internship Certificate issued with ID: ${updateData.certificateId}.`,
      });
    } else if (certificateCriteriaMet !== undefined) {
      updateData.certificateCriteriaMet = certificateCriteriaMet;
    }

    // Execute atomic update
    const updatedApplicant = await prisma.$transaction(async (tx) => {
      const applicant = await tx.internshipApplicant.update({
        where: { id },
        data: updateData,
        include: {
          assignedRole: true,
          timeline: { orderBy: { createdAt: 'desc' } },
        },
      });

      for (const event of timelineEventsToCreate) {
        await tx.internshipTimelineEvent.create({
          data: {
            applicantId: id,
            action: event.action,
            actor: event.actor,
            note: event.note,
          },
        });
      }

      return applicant;
    });

    return NextResponse.json({
      success: true,
      message: 'Applicant record updated successfully.',
      applicant: updatedApplicant,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error updating applicant record:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update applicant record' }, { status: 500 });
  }
}

// DELETE /api/admin/internships/applicants/[id] — Delete applicant record
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
    await prisma.internshipApplicant.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Applicant deleted successfully.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err?.message || 'Failed to delete applicant' }, { status: 500 });
  }
}
