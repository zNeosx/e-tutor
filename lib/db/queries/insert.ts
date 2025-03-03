import {
  InsertInstructor,
  InsertUser,
  instructorsTable,
  usersTable,
} from '../schema';
import { db } from '..';

export async function createUser(data: InsertUser) {
  const [user] = await db.insert(usersTable).values(data).returning();
  return user;
}

export async function createInstructor(data: InsertInstructor) {
  const [instructor] = await db
    .insert(instructorsTable)
    .values(data)
    .returning();
  return instructor;
}
