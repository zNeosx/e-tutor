import { UserRole } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: UserRole; // Add role field to the User
  }

  interface Session {
    user: {
      id: string;
      role: UserRole; // Add role field to the Session
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole; // Add role field to the JWT token
  }
}
