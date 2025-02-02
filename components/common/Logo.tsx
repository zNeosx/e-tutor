import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <div className="inline-flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <span className="whitespace-nowrap text-3xl font-semibold max-md:hidden">
        E-tutor
      </span>
    </div>
  );
};

export default Logo;
