import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, interest, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // In a production setup, dispatch email via Resend / Nodemailer or webhook
    console.log('=== NEW CONTACT INQUIRY RECEIVED ===', {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      interest: interest || 'General Inquiry',
      message: message.trim(),
    });

    // Store in PostgreSQL database
    try {
      const prismaModule = await import('@/lib/prisma');
      await prismaModule.default.contactInquiry.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          interest: interest || 'General Inquiry',
          message: message.trim(),
        },
      });
    } catch (dbErr) {
      console.warn('Could not persist inquiry to database (DB might be offline):', dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thanks — your message has been received. We\u0027ll review what you\u0027ve shared and aim to follow up within one business day.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while sending your message. Please try again or email us directly at kairotrix.official@gmail.com.' },
      { status: 500 }
    );
  }
}
