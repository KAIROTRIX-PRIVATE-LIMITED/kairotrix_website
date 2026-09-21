import { NextResponse } from 'next/server';
import { clearAdminSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    await clearAdminSessionCookie();
    return NextResponse.json({ success: true, message: 'Logged out successfully.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err?.message || 'Failed to logout.' },
      { status: 500 }
    );
  }
}
