import { auth } from '@/auth';

export const checkAuthorization = async (userId: string) => {
  const session = await auth();

  if (!session || session.user.id !== userId) {
    return {
      success: false,
      error: 'Unauthorized',
    };
  }

  return { success: true };
};
