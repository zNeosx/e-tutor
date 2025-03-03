import { db } from '@/lib/db';
import { usersTable } from '@/lib/db/schema';
import { updateStudentAccountSchema } from '@/lib/validations';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = updateStudentAccountSchema.parse(body);

    const [userById] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, validatedData.id))
      .limit(1);

    if (!userById) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    if (validatedData.email) {
      const [userByEmail] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, validatedData.email))
        .limit(1);

      if (userByEmail && userByEmail.id !== body.id) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    const updatedUser = await db
      .update(usersTable)
      .set({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        userName: validatedData.userName,
        email: validatedData.email,
        title: validatedData.title,
        avatar: validatedData.avatar,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, body.id))
      .returning();

    return NextResponse.json(
      {
        data: updatedUser[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
