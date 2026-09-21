import { NextResponse } from 'next/server';
import { getPublishedInsights } from '@/lib/services/insightsService';

export async function GET() {
  try {
    const insights = await getPublishedInsights();
    return NextResponse.json({ success: true, insights });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch published insights.' },
      { status: 500 }
    );
  }
}
