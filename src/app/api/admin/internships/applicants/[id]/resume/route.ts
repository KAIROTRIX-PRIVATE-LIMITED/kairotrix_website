import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { parseCloudinaryAssetUrl, getAuthenticatedDownloadUrl } from '@/lib/cloudinary';

export const runtime = 'nodejs';

// GET /api/admin/internships/applicants/[id]/resume — Secure resume download & preview
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    const { id } = await params;
    const applicant = await prisma.internshipApplicant.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        resumeUrl: true,
        resumeName: true,
      },
    });

    if (!applicant || !applicant.resumeUrl) {
      return NextResponse.json({ error: 'Applicant resume not found.' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const isInline = searchParams.get('action') === 'view' || searchParams.get('inline') === 'true';

    // 1. Detect extension and MIME type
    let ext = 'pdf';
    if (applicant.resumeName) {
      const match = applicant.resumeName.match(/\.([a-zA-Z0-9]+)$/);
      if (match) ext = match[1].toLowerCase();
    } else if (applicant.resumeUrl) {
      const match = applicant.resumeUrl.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
      if (match) ext = match[1].toLowerCase();
    }

    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      doc: 'application/msword',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      txt: 'text/plain',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // 2. Prepare safe filename for Content-Disposition header
    const safeFullName = (applicant.fullName || 'Applicant')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_');
    let filename = applicant.resumeName || `${safeFullName}_Resume.${ext}`;
    if (!filename.toLowerCase().endsWith(`.${ext}`)) {
      filename = `${filename}.${ext}`;
    }
    const safeHeaderFilename = filename.replace(/["\r\n]/g, '').trim();

    // 3. Handle Base64 Data URL
    if (applicant.resumeUrl.startsWith('data:')) {
      const commaIdx = applicant.resumeUrl.indexOf(',');
      const meta = applicant.resumeUrl.slice(0, commaIdx);
      const base64Data = applicant.resumeUrl.slice(commaIdx + 1);
      const mimeMatch = meta.match(/data:([^;]+)/);
      const finalMime = mimeMatch ? mimeMatch[1] : contentType;
      const buffer = Buffer.from(base64Data, 'base64');

      return new Response(buffer, {
        status: 200,
        headers: {
          'Content-Type': finalMime,
          'Content-Disposition': `${isInline ? 'inline' : 'attachment'}; filename="${safeHeaderFilename}"`,
          'Content-Length': buffer.length.toString(),
        },
      });
    }

    // 4. Handle Cloudinary Stored Resumes
    const parsed = parseCloudinaryAssetUrl(applicant.resumeUrl, ext);
    if (parsed) {
      const privUrl = getAuthenticatedDownloadUrl(
        parsed.publicId,
        parsed.format,
        parsed.resourceType
      );

      const upstreamRes = await fetch(privUrl);
      if (upstreamRes.ok) {
        const arrayBuf = await upstreamRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuf);

        return new Response(buffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `${isInline ? 'inline' : 'attachment'}; filename="${safeHeaderFilename}"`,
            'Content-Length': buffer.length.toString(),
            'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          },
        });
      }

      console.warn('Direct fetch from Cloudinary private download returned status:', upstreamRes.status);
    }

    // 5. Fallback for other standard URLs
    const directFetch = await fetch(applicant.resumeUrl);
    if (directFetch.ok) {
      const arrayBuf = await directFetch.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      return new Response(buffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `${isInline ? 'inline' : 'attachment'}; filename="${safeHeaderFilename}"`,
          'Content-Length': buffer.length.toString(),
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        },
      });
    }

    return NextResponse.json(
      { error: 'Could not retrieve resume document from remote storage.' },
      { status: 502 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error serving applicant resume:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error while processing resume download.' },
      { status: 500 }
    );
  }
}
