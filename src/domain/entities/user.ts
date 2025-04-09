import { z } from 'zod';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
}

export const userRoleEnum = z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']);

export const userSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userName: z.string().min(1),
  avatar: z.string().url().nullable(),
  email: z.string().email(),
  emailVerified: z.coerce.date().nullable(),
  password: z.string().min(1),
  role: userRoleEnum.default('STUDENT'),
  title: z.string().nullable(),
  biography: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  isProfileCompleted: z.boolean().default(false).nullable(),
  resetPasswordToken: z.string().nullable(),
  resetPasswordExpires: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastSigned: z.coerce.date().nullable(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  userName: true,
  email: true,
  password: true,
  role: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  userName: true,
  avatar: true,
  role: true,
  title: true,
  biography: true,
  phoneNumber: true,
  isProfileCompleted: true,
  resetPasswordToken: true,
  resetPasswordExpires: true,
  lastSigned: true,
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
