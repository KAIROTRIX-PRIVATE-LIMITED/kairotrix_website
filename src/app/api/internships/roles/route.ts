import { NextResponse } from 'next/server';
import { getPublishedInternshipRoles } from '@/lib/services/internshipService';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const roles = await getPublishedInternshipRoles();
    return NextResponse.json({ success: true, roles });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching public internship roles:', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch roles' }, { status: 500 });
  }
}
