import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  sendOutreachEmailServer,
  isGmailSmtpConfigured,
} from '@/lib/services/emailService';

export const runtime = 'nodejs';

// POST /api/admin/internships/applicants/[id]/email
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
    const body = await request.json();
    const { subject, bodyText, bcc } = body;

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

    const result = await sendOutreachEmailServer({
      to: applicant.email,
      candidateName: applicant.fullName,
      roleName: roleName,
      subject: subject || `Internship Application – Next Steps | KAIROTRIX`,
      body: bodyText,
      bcc,
    });

    // Record timeline audit event
    await prisma.internshipTimelineEvent.create({
      data: {
        applicantId: id,
        action: 'EMAIL_SENT',
        actor: session.name || 'Admin',
        note: `Automated outreach email sent to ${applicant.email} from kairotrix.official@gmail.com with 3 founders in BCC.`,
      },
    });

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error sending outreach email:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to send outreach email' },
      { status: 500 }
    );
  }
}

