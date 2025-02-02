import { AuthLAyoutRedirect } from '@/components/auth/AuthLayoutRedirect';
import Logo from '@/components/common/Logo';
import React, { ReactNode } from 'react';

const Authlayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container">
      <div className="border border-b-gray-100">
        <div className="container-md flex items-center justify-between py-5">
          <Logo />

          <AuthLAyoutRedirect />
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </main>
  );
};

export default Authlayout;
