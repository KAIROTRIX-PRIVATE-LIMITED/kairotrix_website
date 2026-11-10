import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { markApplicantAsHired } from '@/lib/services/internshipService';

export const runtime = 'nodejs';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const applicant = await markApplicantAsHired(id);

    return NextResponse.json({
      success: true,
      message: `Applicant marked as HIRED / ACCEPTED.`,
      applicant,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error marking applicant as hired:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to mark applicant as hired.' },
      { status: 500 }
    );
  }
}

