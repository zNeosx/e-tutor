import { auth } from '@/auth';
import { UserRepository } from '@/src/infrastructure/repositories/user.repository';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const userRepository = new UserRepository();
  const session = await auth();

  if (!session) redirect('/auth/sign-in');

  const user = await userRepository.findById(session.user.id);

  if (!user) redirect('/auth/sign-in');

  return { session, user };
}
