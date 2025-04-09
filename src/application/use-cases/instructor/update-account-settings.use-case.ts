import { IUserRepository } from '@/src/domain/repositories/user-repository.interface';
import { User, UpdateUser } from '@/src/domain/entities/user';
import { instructorAccountSchema } from '@/lib/validations';

export interface UpdateInstructorAccountSettingsDTO {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  title: string | null;
  avatar: string | null;
  biography: string | null;
}

export class UpdateInstructorAccountSettingsUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    data: UpdateInstructorAccountSettingsDTO
  ): Promise<Partial<User>> {
    // Validate input data
    const validatedData = instructorAccountSchema.parse(data);

    // Check if email already exists for another user
    const existingUser = await this.userRepository.findByEmail(
      validatedData.email
    );
    if (existingUser && existingUser.id !== data.id) {
      throw new Error('Email already exists');
    }

    // Update user
    const updateData: Partial<UpdateUser> = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      userName: validatedData.userName,
      phoneNumber: validatedData.phoneNumber,
      title: validatedData.title,
      avatar: validatedData.avatar,
      biography: validatedData.biography,
      isProfileCompleted: true,
    };

    const updatedUser = await this.userRepository.update(data.id, updateData);

    return updatedUser;
  }
}
