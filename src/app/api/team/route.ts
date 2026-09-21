import { NextResponse } from 'next/server';
import { getTeamConfig } from '@/lib/services/teamService';

// GET /api/team - Public team data and section visibility
export async function GET() {
  try {
    const data = await getTeamConfig();
    return NextResponse.json({ success: true, ...data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch team data.' },
      { status: 500 }
    );
  }
}
