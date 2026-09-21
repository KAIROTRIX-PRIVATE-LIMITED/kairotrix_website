import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    await prisma.conversation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Conversation deleted.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
