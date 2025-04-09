import { UpdateUser, updateUserSchema } from '@/src/domain/entities/user';
import { IUserRepository } from '@/src/domain/repositories/user-repository.interface';
import { InputParseError } from '@/src/domain/entities/errors/common';

export class UpdateAccountSettingsUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: Partial<UpdateUser>) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const { data: validatedSchema, error: inputParseError } =
      updateUserSchema.safeParse(data);

    if (inputParseError) {
      throw new InputParseError('Invalid input data', {
        cause: inputParseError,
      });
    }

    return this.userRepository.update(id, validatedSchema);
  }
}
