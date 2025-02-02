'use server';

import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { formatAuthErrorMessage } from '../utils';
import { AuthCredentials } from '@/types';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
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
      };
    }

    // Vérifier si c'est la première connexion
    const user = await prisma.user.findUnique({
      where: { email },
      select: { lastSigned: true, role: true }, // Récupérer uniquement lastSigned
    });

    if (!user)
      return {
        success: false,
        error: 'Error while signing in',
      };

    const isFirstLogin = !user.lastSigned; // Si lastSigned est null, c'est la première connexion

    await prisma.user.update({
      where: { email },
      data: { lastSigned: new Date() },
    });

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
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { firstName, lastName, userName, email, password } = params;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      error: 'User already exists',
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
      },
    });

    const result = await signInWithCredentials({ email, password });

    return result;
  } catch (error) {
    console.log('SIGNUP_ERROR', error);
    return {
      success: false,
      error: error as string,
    };
  }
};
