// 'use server';

// import { auth } from '@/auth';
// import ResetPasswordEmail from '@/emails/ResetPasswordEmail';
// import { SocialLinks, User } from '@prisma/client';
// import bcrypt, { compare, hash } from 'bcryptjs';
// import { redirect } from 'next/navigation';
// import { z } from 'zod';
// import { resend } from '../email';
// import { prisma } from '../prisma';
// import { instructorAccountSchema, resetPasswordSchema } from '../validations';

// export const getCurrentUser = async () => {
//   const session = await auth();

//   if (!session) redirect('/auth/sign-in');

//   const user = await prisma.user.findUnique({
//     where: {
//       id: session.user.id,
//     },
//     include: {
//       instructor: true,
//       socialLinks: true,
//     },
//   });

//   if (!user) redirect('/auth/sign-in');

//   return user;
// };

// const checkAuthorization = async (userId: string) => {
//   const session = await auth();

//   if (!session || session.user.id !== userId) {
//     return {
//       success: false,
//       error: 'Unauthorized',
//     };
//   }

//   return { success: true };
// };

// export const updateInstructor = async (params: {
//   id: string;
//   data: z.infer<typeof instructorAccountSchema>;
// }) => {
//   const { id, data } = params;
//   const authCheck = await checkAuthorization(id);
//   if (!authCheck.success) return authCheck;

//   console.log('data', data);
//   const { phoneNumber, biography, ...userData } = data;

//   console.log(userData);

//   const user = await updateUser({ id, data: userData });

//   if (!user.success) {
//     return {
//       success: false,
//       error: user.error,
//     };
//   }

//   await prisma.instructor.update({
//     where: { userId: id },
//     data: {
//       biography: biography ?? '',
//       phoneNumber: phoneNumber ?? '',
//     },
//   });

//   return {
//     success: true,
//     data: user,
//   };
// };

// export const updateUser = async (params: {
//   id: string;
//   data: Partial<User>;
// }): Promise<{
//   success: boolean;
//   error?: string;
//   data?: User;
// }> => {
//   const { id, data } = params;
//   const authCheck = await checkAuthorization(id);
//   if (!authCheck.success) return authCheck;

//   try {
//     const user = await prisma.user.update({
//       where: { id },
//       data,
//     });

//     return {
//       success: true,
//       data: user,
//     };
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return {
//       success: false,
//       error: 'Failed to update user',
//     };
//   }
// };

// export const updatePassword = async (params: {
//   userId: string;
//   currentPassword: string;
//   newPassword: string;
// }): Promise<{
//   success: boolean;
//   error?: string;
//   inputError?: keyof z.infer<typeof resetPasswordSchema>;
// }> => {
//   const { userId, currentPassword, newPassword } = params;
//   const authCheck = await checkAuthorization(userId);
//   if (!authCheck.success) return authCheck;

//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       password: true,
//     },
//   });

//   if (!user)
//     return {
//       success: false,
//       error: 'User not found',
//     };

//   const isMatch = await compare(currentPassword, user.password);

//   if (!isMatch)
//     return {
//       success: false,
//       error: 'Invalid password',
//       inputError: 'currentPassword',
//     };

//   const hashedPassword = await hash(newPassword, 10);

//   await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       password: hashedPassword,
//     },
//   });

//   return {
//     success: true,
//   };
// };

// export async function requestPasswordReset(email: string) {
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return { success: false, error: 'Utilisateur non trouvé' };
//   }

//   const resetToken = crypto.randomUUID();
//   const expires = new Date(Date.now() + 3600000);

//   await prisma.user.update({
//     where: { email },
//     data: { resetPasswordToken: resetToken, resetPasswordExpires: expires },
//   });

//   const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

//   await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: email,
//     subject: 'Réinitialisation de votre mot de passe',
//     react: ResetPasswordEmail({ resetUrl }),
//   });

//   return { success: true };
// }

// export async function resetPassword({
//   token,
//   newPassword,
// }: {
//   token: string;
//   newPassword: string;
// }) {
//   const user = await prisma.user.findFirst({
//     where: {
//       resetPasswordToken: token,
//       resetPasswordExpires: { gte: new Date() }, // Vérifie si pas expiré
//     },
//   });

//   if (!user) {
//     return { error: 'Token invalide ou expiré' };
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       password: hashedPassword,
//       resetPasswordToken: null,
//       resetPasswordExpires: null,
//     },
//   });

//   return { success: 'Mot de passe mis à jour !' };
// }

// export const updateUserSocialLinks = async (params: {
//   id: string;
//   data: Partial<SocialLinks>;
// }) => {
//   const { id, data } = params;

//   try {
//     const authCheck = await checkAuthorization(id);
//     if (!authCheck.success) return authCheck;

//     const user = await prisma.socialLinks.upsert({
//       where: { userId: id },
//       update: {
//         ...data,
//       },
//       create: {
//         ...data,
//         userId: id,
//       },
//     });

//     return { success: true, data: user };
//   } catch (error) {
//     console.error('Error updating user social links:', error);
//     return {
//       success: false,
//       error: 'Failed to update social links',
//     };
//   }
// };
