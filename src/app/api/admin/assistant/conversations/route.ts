import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// GET /api/admin/assistant/conversations
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await prisma.conversation.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, conversations });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching conversations:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
