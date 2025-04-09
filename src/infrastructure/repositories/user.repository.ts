import { IUserRepository } from '@/src/domain/repositories/user-repository.interface';
import { DatabaseOperationError } from '@/src/domain/entities/errors/common';
import { CreateUser, UpdateUser, User } from '@/src/domain/entities/user';
import { prisma } from '@/lib/prisma';

export class UserRepository implements IUserRepository {
  async save(data: CreateUser): Promise<Partial<User>> {
    try {
      const user = await prisma.user.create({
        data,
      });

      if (!user) {
        throw new DatabaseOperationError('Failed to save user');
      }

      console.log('user', user);
      return user;
    } catch (error) {
      console.error('USER_SAVE', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByUserName(userName: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { userName },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: string, data: Partial<UpdateUser>): Promise<Partial<User>> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
      });

      if (!user) {
        throw new DatabaseOperationError('Failed to update user');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
