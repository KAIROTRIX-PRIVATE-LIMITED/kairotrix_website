import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { addDailyRecordToIntern } from '@/lib/services/internshipService';

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

    if (!body.note || typeof body.note !== 'string' || !body.note.trim()) {
      return NextResponse.json({ error: 'Record note content is required.' }, { status: 400 });
    }

    const author = session.name || session.email || 'Admin';
    const applicant = await addDailyRecordToIntern(id, body.note.trim(), author);

    return NextResponse.json({
      success: true,
      message: 'Daily record logged successfully.',
      applicant,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error logging daily record:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to log daily record.' },
      { status: 500 }
    );
  }
}

