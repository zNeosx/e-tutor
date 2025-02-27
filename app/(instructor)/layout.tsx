import { auth } from '@/auth';
import { AppSidebar } from '@/components/app-sidebar';
import InstructorNavbar from '@/components/InstructorNavbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
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
    <SidebarProvider
      style={
        {
          '--sidebar-width': '280px',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="bg-gray-50">
        <InstructorNavbar session={session} />
        <div className="overflow-x-hidden py-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default InstructorLayout;
