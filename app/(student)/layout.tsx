import { Navbar } from '@/components/NavBar';
import { StudentPageHeader } from '@/components/student/StudentPageHeader';
import { getCurrentUser } from '@/lib/db/queries/auth';
import { checkUserRole } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const StudentLayout = async ({ children }: { children: ReactNode }) => {
  const { session, user } = await getCurrentUser();

  const result = checkUserRole(user.role, UserRole.STUDENT);

  if (result.redirectPath) redirect(result.redirectPath);

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <Navbar session={session} />
      <StudentPageHeader user={user} />
      <div className="">
        <div className="mx-auto w-11/12 max-w-[1320px] py-4 max-sm:py-16 xl:py-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StudentLayout;
