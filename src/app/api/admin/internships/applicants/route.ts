import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getAdminApplicants } from '@/lib/services/internshipService';

export const runtime = 'nodejs';

// GET /api/admin/internships/applicants — Fetch applicants with filters
export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'ALL';
    const domain = searchParams.get('domain') || 'ALL';
    const search = searchParams.get('search') || '';

    const applicants = await getAdminApplicants({
      status,
      domain,
      search,
    });

    return NextResponse.json({
      success: true,
      applicants,
      count: applicants.length,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching admin internship applicants:', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch applicants' }, { status: 500 });
  }
}
