import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getActiveInterns } from '@/lib/services/internshipService';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const interns = await getActiveInterns();

    return NextResponse.json({
      success: true,
      interns,
      count: interns.length,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching active interns:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch active interns.' },
      { status: 500 }
    );
  }
}

