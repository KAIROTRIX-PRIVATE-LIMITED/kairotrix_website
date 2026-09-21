import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { isCloudinaryConfigured, uploadToCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs';

// POST /api/admin/upload — Authenticated file upload to Cloudinary
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file.',
        },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'kairotrix/general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data.' }, { status: 400 });
    }

    // Determine resource type from MIME type
    const mimeType = file.type || '';
    let resourceType: 'image' | 'video' | 'auto' = 'auto';

    if (mimeType.startsWith('video/')) {
      resourceType = 'video';
    } else if (mimeType.startsWith('image/')) {
      resourceType = 'image';
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename for publicId
    const baseName = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const publicId = `${baseName}-${Date.now()}`;

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, {
      folder,
      resourceType,
      publicId,
      tags: ['kairotrix', folder.replace('kairotrix/', '')],
    });

    return NextResponse.json({
      success: true,
      url: result.secureUrl,
      publicId: result.publicId,
      format: result.format,
      resourceType: result.resourceType,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Cloudinary upload API error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to upload media to Cloudinary.' },
      { status: 500 }
    );
  }
}
