import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';
import { signIn } from '@/auth';
import { ZodError } from 'zod';
import { signUpQuerySchema } from '@/lib/validations';
import { Prisma } from '@prisma/client';
import { createInstructor, createUser } from '@/lib/db/queries/insert';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    try {
      signUpQuerySchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'Invalid input data', details: error.errors },
          { status: 400 }
        );
      }
    }

    const { firstName, lastName, userName, email, password, role } = body;

    const hashedPassword = await hash(password, 10);
    const checkedRole = role === UserRole.ADMIN ? UserRole.STUDENT : role;

    try {
      const user = await createUser({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        role: checkedRole,
      });

      if (checkedRole === UserRole.INSTRUCTOR) {
        await createInstructor({ userId: user.id });
      }

      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult.error) {
        return NextResponse.json(
          { error: 'Account created but failed to sign in' },
          { status: 201 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          user: {
            role: user.role,
            isFirstLogin: true,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': // Unique constraint violation
            return NextResponse.json(
              { error: 'Email or username already exists' },
              { status: 409 }
            );
          default:
            return NextResponse.json(
              { error: 'Database error' },
              { status: 500 }
            );
        }
      }
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('SIGNUP_ERROR:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
