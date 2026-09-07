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

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. A principal architect will respond within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
