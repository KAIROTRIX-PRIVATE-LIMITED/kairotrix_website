import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signAdminToken, setAdminSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Check admin user in PostgreSQL
    const user = await prisma.adminUser.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or credentials.' },
        { status: 401 }
      );
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or credentials.' },
        { status: 401 }
      );
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await signAdminToken(tokenPayload);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: tokenPayload,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: err?.message || 'Authentication failed. Ensure database is connected.' },
      { status: 500 }
    );
  }
}
