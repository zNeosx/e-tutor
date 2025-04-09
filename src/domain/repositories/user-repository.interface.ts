import { CreateUser, UpdateUser, User } from '../entities/user';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUserName(userName: string): Promise<User | null>;
  save(data: CreateUser): Promise<Partial<User>>;
  update(id: string, data: Partial<UpdateUser>): Promise<Partial<User>>;
}
