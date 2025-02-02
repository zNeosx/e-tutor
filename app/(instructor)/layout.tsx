import { auth } from '@/auth';
import { checkUserRole } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const InstructorLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect('/auth/sign-in');

  const result = checkUserRole(session.user.role, UserRole.INSTRUCTOR);

  if (result.redirectPath) redirect(result.redirectPath);

  return (
    <main className="flex min-h-screen">
      <p>Sidebar</p>
      <div className="flex w-full flex-col">
        <p>Navbar</p>
        {children}
      </div>
    </main>
  );
};

export default InstructorLayout;
