'use server';

import { auth } from '@/auth';
import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from '../prisma';
import { resetPasswordSchema } from '../validations';
import { z } from 'zod';

export const getCurrentUser = async () => {
  const session = await auth();

  if (!session) redirect('/auth/sign-in');

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) redirect('/auth/sign-in');

  return user;
};

export const updateUser = async (params: {
  id: string;
  data: Partial<User>;
}) => {
  const { id, data } = params;
  const session = await auth();

  if (!session)
    return {
      success: false,
      error: 'Unauthorized',
    };

  if (session.user.id !== id)
    return {
      success: false,
      error: 'Unauthorized',
    };

  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return {
    success: true,
    data: user,
  };
};

export const updatePassword = async (params: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}): Promise<{
  success: boolean;
  error?: string;
  inputError?: keyof z.infer<typeof resetPasswordSchema>;
}> => {
  const { userId, currentPassword, newPassword } = params;
  const session = await auth();

  if (!session)
    return {
      success: false,
      error: 'Unauthorized',
    };

  if (session.user.id !== userId)
    return {
      success: false,
      error: 'Unauthorized',
    };

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      password: true,
    },
  });

  if (!user)
    return {
      success: false,
      error: 'User not found',
    };

  const isMatch = await compare(currentPassword, user.password);

  if (!isMatch)
    return {
      success: false,
      error: 'Invalid password',
      inputError: 'currentPassword',
    };

  const hashedPassword = await hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
};
