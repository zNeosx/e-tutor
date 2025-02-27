import { env } from '@/env';
import { UserRole } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAuthErrorMessage = (message: string) => {
  if (message.includes('.')) {
    return message.split('.')[0];
  }

  return message;
};

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

export const checkUserRole = (
  role: UserRole,
  roleToCheck: UserRole
): { redirectPath?: string | undefined } => {
  if (role === roleToCheck)
    return {
      redirectPath: undefined,
    };

  switch (role) {
    case UserRole.STUDENT:
      return { redirectPath: '/dashboard' };
    case UserRole.INSTRUCTOR:
      return { redirectPath: '/instructor/dashboard' };
    default:
      return { redirectPath: '/auth/sign-in' };
  }
};

export const authenticator = async () => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/imagekit`
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return {
      token,
      expire,
      signature,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Authenticator request failed: ${error.message}`);
  }
};

export const formatPageName = (name: string) => {
  const nameSplitted = String(name).split('-');

  return nameSplitted
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};
