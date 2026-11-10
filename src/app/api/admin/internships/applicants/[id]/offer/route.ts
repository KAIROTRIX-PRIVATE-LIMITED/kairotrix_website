import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { publishOfferLetter } from '@/lib/services/internshipService';

export const runtime = 'nodejs';

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

    if (!body.offerRef) {
      return NextResponse.json({ error: 'Offer Reference is required.' }, { status: 400 });
    }

    if (!body.designation) {
      return NextResponse.json({ error: 'Designation / Domain is required.' }, { status: 400 });
    }

    const applicant = await publishOfferLetter({
      applicantId: id,
      offerRef: body.offerRef.trim(),
      designation: body.designation.trim(),
      duration: body.duration || '1 Month',
      startDate: body.startDate || '',
      endDate: body.endDate || '',
      periodText: body.periodText || `${body.startDate || ''} – ${body.endDate || ''}`,
      issueDate: body.issueDate || new Date().toLocaleDateString('en-GB'),
      workMode: body.workMode || 'Remote',
      workingHours: body.workingHours || 'Flexible',
      stipend: body.stipend || 'Unpaid – No stipend or salary will be provided.',
      acceptanceDueDate: body.acceptanceDueDate || body.issueDate,
      signatoryTitle: body.signatoryTitle || 'Chief Operating Officer',
      terms: body.terms || [],
      pdfDataUrl: body.pdfDataUrl,
    });

    return NextResponse.json({
      success: true,
      message: `Offer letter ${body.offerRef} published successfully.`,
      applicant,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error publishing offer letter:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to publish offer letter.' },
      { status: 500 }
    );
  }
}

