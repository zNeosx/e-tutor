import { db } from '@/lib/db';
import { checkAuthorization } from '@/lib/db/check';
import { usersTable } from '@/lib/db/schema';
import { studentAccountSchema } from '@/lib/validations';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    const authCheck = await checkAuthorization(id);
    if (!authCheck.success) {
      return NextResponse.json({ error: authCheck.error }, { status: 401 });
    }
    // Valider les données
    const validatedData = studentAccountSchema.parse(data);

    // Vérifier si l'email ou le nom d'utilisateur existe déjà
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validatedData.email))
      .limit(1);

    if (existingUser && existingUser.id !== id) {
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 400 }
      );
    }

    // Mettre à jour l'utilisateur
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
      .where(eq(usersTable.id, id))
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
