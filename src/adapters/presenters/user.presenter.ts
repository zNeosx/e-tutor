import { User } from '@/src/domain/entities/user';

export class UserPresenter {
  static toJSON(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      title: user.title,
      biography: user.biography,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      isProfileCompleted: user.isProfileCompleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastSigned: user.lastSigned,
    };
  }
}
