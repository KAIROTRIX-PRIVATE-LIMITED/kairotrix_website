import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import {
  getInternshipSettings,
  updateInternshipSettings,
  getNextOfferRefPreview,
} from '@/lib/services/internshipService';
import {
  isGmailSmtpConfigured,
} from '@/lib/services/emailService';
import { OFFICIAL_SENDER_EMAIL } from '@/types/internship';

export const runtime = 'nodejs';

// GET /api/admin/internships/settings
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [settings, nextOfferRef] = await Promise.all([
      getInternshipSettings(),
      getNextOfferRefPreview(),
    ]);

    return NextResponse.json({
      success: true,
      settings,
      nextOfferRef,
      isSmtpConfigured: isGmailSmtpConfigured(),
      officialSenderEmail: OFFICIAL_SENDER_EMAIL,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching internship settings:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/internships/settings
export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updated = await updateInternshipSettings(body);
    const nextOfferRef = await getNextOfferRefPreview();

    return NextResponse.json({
      success: true,
      settings: updated,
      nextOfferRef,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error updating internship settings:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}

