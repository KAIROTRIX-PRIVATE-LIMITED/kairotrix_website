import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching inquiries:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
