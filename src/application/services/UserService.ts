// import { InsertUser } from '@/lib/db/schema';
// import { IUserRepository } from '@/src/domain/repositories/UserRepository';
// import { IInstructorRepository } from '@/src/domain/repositories/instructor-repository.interface';
// import { IPasswordHasher } from '@/src/domain/auth/IPasswordHasher';
// import { AuthCredentials, UserRole } from '@/types';

// export class UserService {
//   constructor(
//     private instructorRepository: IInstructorRepository,
//     private userRepository: IUserRepository,
//     private passwordHasher: IPasswordHasher
//   ) {}

//   async registerUser(credentials: AuthCredentials): Promise<InsertUser> {
//     // const existingUser = await this.userRepository.findByEmail(
//     //   credentials.email
//     // );
//     // if (existingUser) {
//     //   throw new Error('User already exists');
//     // }

//     const hashedPassword = await this.passwordHasher.hash(credentials.password);
//     const checkedRole: UserRole =
//       credentials.role === 'ADMIN' ? 'STUDENT' : credentials.role;

//     const user: InsertUser = {
//       ...credentials,
//       role: checkedRole,
//       password: hashedPassword,
//     };

//     const savedUser = await this.userRepository.save(user);

//     if (checkedRole === 'INSTRUCTOR') {
//       await this.instructorRepository.create({ userId: savedUser.id });
//     }

//     return savedUser;
//   }

//   async getUserInfo(id: string) {
//     return await this.userRepository.findById(id);
//   }
// }
