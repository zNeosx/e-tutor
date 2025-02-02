import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { compare } from 'bcryptjs';
import NextAuth, { AuthError, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './lib/validations';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const validatedSchema = signInSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: validatedSchema.email,
          },
        });

        if (!user) throw new AuthError('Invalid credentials');

        const isPasswordValid = await compare(
          validatedSchema.password,
          user.password
        );

        if (!isPasswordValid) throw new AuthError('Invalid credentials');

        return {
          id: user.id,
          email: user.email,
          name: user.firstName + ' ' + user.lastName,
          image: user.avatar,
          role: user.role,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.id = String(params.user.id);
        params.token.name = String(params.user.name);
        params.token.role = params.user.role as UserRole;
      }
      return params.token;
    },
    async session(params) {
      if (params.token) {
        params.session.user.id = String(params.token.id);
        params.session.user.name = String(params.token.name);
        params.session.user.role = params.token.role as UserRole;
      }

      return params.session;
    },
  },
});
