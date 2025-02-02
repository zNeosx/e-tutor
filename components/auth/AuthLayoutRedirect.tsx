'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';

export const AuthLAyoutRedirect = () => {
  const pathname = usePathname();
  const isSignIn = pathname === '/auth/sign-in';

  return (
    <div className="flex items-center gap-3">
      <span className="body-m-400 text-gray-700">
        {isSignIn ? "Don't have an account?" : 'Have an Account?'}
      </span>
      <Link
        href={isSignIn ? '/auth/sign-up' : '/auth/sign-in'}
        className={buttonVariants({ variant: 'secondary' })}
      >
        {isSignIn ? 'Create Account' : 'Sign In'}
      </Link>
    </div>
  );
};
