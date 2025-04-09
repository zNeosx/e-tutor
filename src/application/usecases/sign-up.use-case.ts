import {
  ConflictError,
  InputParseError,
} from '@/src/domain/entities/errors/common';
import { hash } from 'bcryptjs';
import {
  CreateUser,
  createUserSchema,
  UserRole,
} from '../../domain/entities/user';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';

export class SignUpUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUser) {
    // Ensure ADMIN role can only be assigned by system administrators
    // This is a security measure to prevent unauthorized admin creation
    if (data.role === UserRole.ADMIN) {
      // In a real application, you might want to check if the requester has admin privileges
      // For now, we'll prevent admin creation through the sign-up process
      throw new Error('Admin users cannot be created through regular sign-up');
    }

    const { data: validInputs, error: inputParseError } =
      createUserSchema.safeParse(data);

    if (inputParseError) {
      throw new InputParseError('Invalid input data', {
        cause: inputParseError,
      });
    }

    const hashedPassword = await hash(validInputs.password, 10);

    const existingUserName = await this.userRepository.findByUserName(
      validInputs.userName
    );

    if (existingUserName) {
      throw new ConflictError('Username already exists');
    }

    const existingUser = await this.userRepository.findByEmail(
      validInputs.email
    );

    if (existingUser) {
      throw new ConflictError('Email already exists');
    }

    // Create the user
    const user = await this.userRepository.save({
      ...validInputs,
      password: hashedPassword,
    });

    return user;
  }
}
