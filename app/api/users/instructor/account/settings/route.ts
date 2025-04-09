import { checkAuthorization } from '@/lib/db/check';
import { UpdateInstructorAccountSettingsUseCase } from '@/src/application/use-cases/instructor/update-account-settings.use-case';
import { UserRepository } from '@/src/infrastructure/repositories/user.repository';
import { NextRequest, NextResponse } from 'next/server';

const userRepository = new UserRepository();
const updateInstructorAccountSettingsUseCase =
  new UpdateInstructorAccountSettingsUseCase(userRepository);

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    const authCheck = await checkAuthorization(id);
    if (!authCheck.success) {
      return NextResponse.json({ error: authCheck.error }, { status: 401 });
    }

    const updatedUser = await updateInstructorAccountSettingsUseCase.execute({
      id,
      ...data,
    });

    return NextResponse.json(
      {
        data: updatedUser,
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
