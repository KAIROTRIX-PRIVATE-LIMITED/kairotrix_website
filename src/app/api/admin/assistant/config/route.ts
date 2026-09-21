import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// GET /api/admin/assistant/config
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const config = await prisma.aiAgentConfig.findUnique({
      where: { id: 'default' },
    });

    return NextResponse.json({
      success: true,
      config: config || {
        id: 'default',
        isEnabled: true,
        mode: 'HYBRID',
        model: 'gpt-4o-mini',
        temperature: 0.3,
        systemPrompt: 'Default KAIROTRIX Principal Guide',
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// PUT /api/admin/assistant/config
export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { isEnabled, mode, model, systemPrompt, temperature } = body;

    const updated = await prisma.aiAgentConfig.upsert({
      where: { id: 'default' },
      update: {
        ...(isEnabled !== undefined && { isEnabled: Boolean(isEnabled) }),
        ...(mode !== undefined && { mode }),
        ...(model !== undefined && { model }),
        ...(systemPrompt !== undefined && { systemPrompt }),
        ...(temperature !== undefined && { temperature: Number(temperature) }),
      },
      create: {
        id: 'default',
        isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
        mode: mode || 'HYBRID',
        model: model || 'gpt-4o-mini',
        systemPrompt: systemPrompt || 'Default prompt',
        temperature: temperature !== undefined ? Number(temperature) : 0.3,
      },
    });

    return NextResponse.json({
      success: true,
      message: `AI Agent updated: ${updated.isEnabled ? 'ACTIVE' : 'PAUSED'}.`,
      config: updated,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error updating AI config:', err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
