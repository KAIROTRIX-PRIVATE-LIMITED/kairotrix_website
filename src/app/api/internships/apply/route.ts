import { NextResponse } from 'next/server';
import { submitInternshipApplication } from '@/lib/services/internshipService';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      institution,
      yearOfStudy,
      roleAppliedFor,
      githubUrl,
      portfolioUrl,
      projectLink,
      resumeUrl,
      resumeName,
      duration,
      privacyConsent,
    } = body;

    // Required Validations
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 5) {
      return NextResponse.json({ error: 'Please enter your mobile number.' }, { status: 400 });
    }

    if (!institution || typeof institution !== 'string' || institution.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your college / university name.' }, { status: 400 });
    }

    if (!resumeUrl || typeof resumeUrl !== 'string' || !resumeUrl.trim()) {
      return NextResponse.json({ error: 'Please upload your résumé.' }, { status: 400 });
    }

    const safeRole = roleAppliedFor?.trim() || 'Software Engineering';
    const safeYear = yearOfStudy?.trim() || '3rd Year';
    const safeDuration = duration?.trim() || '3 Months';
    const effectiveProjectLink = (projectLink || githubUrl || portfolioUrl || '').trim();

    const applicant = await submitInternshipApplication({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      institution: institution.trim(),
      yearOfStudy: safeYear,
      roleAppliedFor: safeRole,
      duration: safeDuration,
      preferredDomains: [safeRole],
      githubUrl: effectiveProjectLink || undefined,
      portfolioUrl: effectiveProjectLink || undefined,
      resumeUrl: resumeUrl.trim(),
      resumeName: resumeName?.trim() || undefined,
      privacyConsent: Boolean(privacyConsent ?? true),
      complianceAck: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Application received. We will reply within 5 days.',
      applicantId: applicant.id,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in internship application submission:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to submit application. Please check your inputs and try again.' },
      { status: 500 }
    );
  }
}
