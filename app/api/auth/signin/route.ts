import { prisma } from '@/lib/prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { formatAuthErrorMessage } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { signInSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    try {
      signInSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'Invalid input data', details: error.errors },
          { status: 400 }
        );
      }
    }

    const { email, password } = body;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      // Handle specific auth errors
      if (result.error === 'CredentialsSignin') {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { lastSigned: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isFirstLogin = !user.lastSigned;

    return NextResponse.json(
      {
        success: true,
        user: {
          role: user.role,
          isFirstLogin,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('SIGNIN_ERROR:', error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          );
        case 'AccessDenied':
          return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        default:
          return NextResponse.json(
            { error: formatAuthErrorMessage(error.message) },
            { status: 401 }
          );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
