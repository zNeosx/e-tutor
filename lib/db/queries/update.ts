import { db } from '@/lib/db';
import { SelectUser, usersTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function updateUser(params: {
  id: SelectUser['id'];
  data: Partial<Omit<SelectUser, 'id'>>;
}) {
  const { id, data } = params;

  const result = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, id));

  return result;
}
