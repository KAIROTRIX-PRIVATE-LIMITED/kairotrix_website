import { NextResponse } from 'next/server';
import { getActiveWorkSpecimens } from '@/lib/services/workService';

export async function GET() {
  try {
    const specimens = await getActiveWorkSpecimens();
    return NextResponse.json({ success: true, specimens });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch active work specimens.' },
      { status: 500 }
    );
  }
}
