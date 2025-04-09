import { signIn } from '@/auth';
import { SignUpUseCase } from '@/src/application/usecases/sign-up.use-case';
import {
  ConflictError,
  InputParseError,
} from '@/src/domain/entities/errors/common';
import { UserRepository } from '@/src/infrastructure/repositories/user.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { firstName, lastName, userName, email, password, role } = body;

  const userRepository = new UserRepository();
  const signUpUseCase = new SignUpUseCase(userRepository);

  try {
    const newUser = await signUpUseCase.execute({
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
    });

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
          role: newUser.role,
          isFirstLogin: true,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    if (err instanceof InputParseError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    if (err instanceof ConflictError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }

    return NextResponse.json(
      {
        error:
          'An error happened while signing up. The developers have been notified. Please try again later.',
      },
      { status: 500 }
    );
  }
}
