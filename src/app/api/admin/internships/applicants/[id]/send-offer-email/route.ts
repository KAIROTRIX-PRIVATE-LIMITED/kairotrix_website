import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  sendOfferLetterEmailServer,
  isGmailSmtpConfigured,
} from '@/lib/services/emailService';

export const runtime = 'nodejs';

// POST /api/admin/internships/applicants/[id]/send-offer-email
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const payload = await request.json();
    const { subject, bodyText, offerRef, pdfBase64, bcc } = payload;

    const applicant = await prisma.internshipApplicant.findUnique({
      where: { id },
    });

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
    }

    if (!isGmailSmtpConfigured()) {
      return NextResponse.json(
        {
          error:
            'GMAIL_APP_PASSWORD is not configured in .env. Please add your 16-character Google App Password for kairotrix.official@gmail.com to enable automated background sending.',
          notConfigured: true,
        },
        { status: 400 }
      );
    }

    const roleName = applicant.roleAppliedFor || applicant.preferredDomains?.[0] || 'intern';

    const result = await sendOfferLetterEmailServer({
      to: applicant.email,
      candidateName: applicant.fullName,
      roleName: roleName,
      offerRef: offerRef || applicant.offerRef || 'KT/INT/2026/OFFER',
      subject: subject || `Internship Offer Letter – ${roleName} | Kairotrix`,
      body: bodyText,
      pdfBase64,
      bcc,
    });

    // Record timeline audit event
    await prisma.internshipTimelineEvent.create({
      data: {
        applicantId: id,
        action: 'OFFER_EMAIL_SENT',
        actor: session.name || 'Admin',
        note: `Official Internship Offer Letter (${offerRef || applicant.offerRef}) sent to ${applicant.email} with PDF attachment and 3 founders in BCC.`,
      },
    });

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error sending offer letter email:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to send offer letter email' },
      { status: 500 }
    );
  }
}

