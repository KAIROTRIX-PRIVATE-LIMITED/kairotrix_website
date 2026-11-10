import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import {
  getCooSignatureSecurely,
  saveCooSignature,
  deleteCooSignature,
} from '@/lib/services/signatureService';

export const runtime = 'nodejs';

// GET /api/admin/internships/signature — Authenticated fetch of the COO signature
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const signatureUrl = await getCooSignatureSecurely();

    return NextResponse.json({
      success: true,
      signatureUrl,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching COO signature:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch signature.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/internships/signature — Authenticated upload of a new COO signature
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No signature file provided.' }, { status: 400 });
    }

    const mimeType = file.type || 'image/png';
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json({ error: 'Please upload an image file (PNG/JPG/WEBP).' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const signatureUrl = await saveCooSignature(buffer, mimeType);

    return NextResponse.json({
      success: true,
      message: 'COO signature securely stored.',
      signatureUrl,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error saving COO signature:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to save signature.' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/internships/signature — Authenticated removal of the COO signature
export async function DELETE() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    await deleteCooSignature();

    return NextResponse.json({
      success: true,
      message: 'COO signature removed from database.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error removing signature:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to remove signature.' },
      { status: 500 }
    );
  }
}

