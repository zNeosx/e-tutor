'use server';

import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { formatAuthErrorMessage } from '../utils';
import { AuthCredentials } from '@/types';
import { UserRole } from '@prisma/client';
import { createInstructor } from './instructor.action';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../db';

// Add a type for the response
type AuthResponse = {
  success: boolean;
  user?: {
    role: UserRole;
    isFirstLogin: boolean;
  };
  error?: string;
  status?: number;
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password' | 'role'>
): Promise<AuthResponse> => {
  const { email, password } = params;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      return {
        success: false,
        error: result.error,
        status: 401, // Unauthorized
      };
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user)
      return {
        success: false,
        error: 'Error while signing in',
        status: 404, // Not Found
      };

    const isFirstLogin = !user.lastSigned;

    await db
      .update(users)
      .set({ lastSigned: new Date() })
      .where(eq(users.email, email));

    return {
      success: true,
      user: {
        role: user.role,
        isFirstLogin,
      },
    };
  } catch (error) {
    console.log('error', error);
    const authError = error as AuthError;
    console.log('SIGNIN_ERROR', authError);
    return {
      success: false,
      error: formatAuthErrorMessage(authError.message),
      status: 500, // Internal Server Error
    };
  }
};

export const signUp = async (
  params: AuthCredentials
): Promise<AuthResponse> => {
  const { firstName, lastName, userName, email, password, role } = params;

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    return {
      success: false,
      error: 'User already exists',
      status: 409, // Conflict
    };
  }

  const hashedPassword = await hash(password, 10);

  const checkedRole = role === UserRole.ADMIN ? UserRole.STUDENT : role;

  try {
    const user = await db.insert(users).values({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      role: checkedRole,
    });

    if (checkedRole === UserRole.INSTRUCTOR) {
      await createInstructor({ data: { userId: user.id } });
    }

    const result = await signInWithCredentials({
      email,
      password,
      role: checkedRole,
    });

    return result;
  } catch (error) {
    console.log('SIGNUP_ERROR', error);
    return {
      success: false,
      error: error as string,
      status: 500, // Internal Server Error
    };
  }
};
