import { auth } from '@/auth';
import { Navbar } from '@/components/NavBar';
import { StudentPageHeader } from '@/components/student/StudentPageHeader';
import { db } from '@/lib/db';
import { usersTable } from '@/lib/db/schema';
import { checkUserRole } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const StudentLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect('/auth/sign-in');

  const result = checkUserRole(session.user.role, UserRole.STUDENT);

  if (result.redirectPath) redirect(result.redirectPath);

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id));

  if (!user) redirect('/auth/sign-in');

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
