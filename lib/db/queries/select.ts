import { auth } from '@/auth';
import { db } from '@/lib/db';
import { usersTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const session = await auth();

  if (!session) redirect('/auth/sign-in');

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id));

  if (!user) redirect('/auth/sign-in');

  return user;
}
