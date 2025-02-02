import { auth } from '@/auth';
import { Navbar } from '@/components/NavBar';
import TopBar from '@/components/TopBar';
import React, { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <main className="root-container">
      <TopBar />
      <Navbar session={session} />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
