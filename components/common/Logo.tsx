import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  isLink?: boolean;
  variant?: 'black' | 'white';
  link?: string;
  isInSidebar?: boolean;
}

const Logo = ({
  isLink = true,
  variant = 'black',
  link = '/',
  isInSidebar = false,
}: Props) => {
  if (isLink) {
    return (
      <Link href={link} className="inline-flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span
          className={cn(
            'whitespace-nowrap text-3xl font-semibold',
            !isInSidebar && 'max-md:hidden',
            variant === 'black' ? 'text-gray-900' : 'text-white'
          )}
        >
          E-tutor
        </span>
      </Link>
    );
  }
  return (
    <div className="inline-flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <span
        className={cn(
          'whitespace-nowrap text-3xl font-semibold max-md:hidden',
          !isInSidebar && 'max-md:hidden',
          variant === 'black' ? 'text-gray-900' : 'text-white'
        )}
      >
        E-tutor
      </span>
    </div>
  );
};

export default Logo;
