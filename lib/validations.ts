import { UserRole } from '@/src/domain/entities/user';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    userName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(6),
    terms: z.literal(true),
  })
  .refine((data) => data.password === data['confirmPassword'], {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const studentAccountSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  userName: z.string().min(2).max(50),
  email: z.string().email(),
  title: z.string().min(2).max(50).optional(),
  avatar: z.string().optional(),
});

export const instructorAccountSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  userName: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15).optional(),
  title: z.string().min(2).max(50).optional(),
  avatar: z.string().optional(),
  biography: z.string().min(10).max(500).optional(),
});

export const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data['confirmPassword'], {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from the current password',
    path: ['newPassword'],
  });

export const updateStudentAccountSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  userName: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  title: z.string().min(2).max(50).optional(),
  avatar: z.string().optional(),
});

export const signUpQuerySchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  userName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole),
});
