import { NextResponse } from 'next/server';
import { isCloudinaryConfigured, uploadToCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs';

// POST /api/internships/upload — Public resume file upload for internship applicants
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file received in upload request.' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed limit of 10MB. Please upload a smaller document.' },
        { status: 400 }
      );
    }

    // Validate file type
    const mimeType = file.type || '';
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name || 'resume.pdf';
    const hasValidExt = allowedExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));

    if (
      !hasValidExt &&
      !mimeType.includes('pdf') &&
      !mimeType.includes('word') &&
      !mimeType.includes('document')
    ) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload a PDF (.pdf) or Word document (.doc, .docx).' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (isCloudinaryConfigured()) {
      const baseName = fileName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      const publicId = `resume-${baseName}-${Date.now()}`;

      const uploadResult = await uploadToCloudinary(buffer, {
        folder: 'kairotrix/internships/resumes',
        resourceType: 'auto',
        publicId,
        tags: ['kairotrix', 'internship', 'resume'],
      });

      return NextResponse.json({
        success: true,
        url: uploadResult.secureUrl,
        fileName: file.name,
        size: file.size,
      });
    }

    // Fallback: If Cloudinary is temporarily unreachable, create a data URL or return safe message
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${mimeType || 'application/pdf'};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName: file.name,
      size: file.size,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error uploading applicant resume:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to upload document. Please try again or provide an online link.' },
      { status: 500 }
    );
  }
}
