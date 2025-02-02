'use client';

import Link from 'next/link';

import { env } from '@/env';
import { cn, getInitials } from '@/lib/utils';
import {
  Bell,
  Heart,
  MagnifyingGlass,
  ShoppingCartSimple,
  User,
} from '@phosphor-icons/react';
import { IKImage } from 'imagekitio-next';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Logo from './common/Logo';
import { Avatar, AvatarFallback } from './ui/avatar';
import { buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import SearchInput from './ui/search-input';

export const Navbar = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  const hideTopBar = pathname.startsWith('/auth');

  if (hideTopBar) return null;

  return (
    <section className="container-lg flex items-center justify-between gap-4 border border-b-gray-200 bg-white py-6">
      <div className="flex flex-1 items-center lg:gap-12">
        <Logo />
        <SearchInput
          containerClassName="w-full max-w-96 max-lg:hidden placeholder:text-gray-500"
          inputPlaceholder="What do you want learn..."
        />
        <MagnifyingGlass size={24} className="ml-auto lg:hidden" />
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        <Bell size={24} />
        <Heart size={24} />
        <ShoppingCartSimple size={24} />
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <User size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={'/auth/sign-up'}>Create Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/auth/sign-in'}>Sign In</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  {session.user.image ? (
                    <IKImage
                      urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      path={session.user.image}
                      width={48}
                      height={48}
                      alt={'User Avatar'}
                      className="rounded-full object-cover"
                    />
                  ) : null}
                  <AvatarFallback>
                    {getInitials(session.user?.name ?? 'U')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    signOut({
                      redirectTo: '/auth/sign-in',
                    })
                  }
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href={'/auth/sign-up'}
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'max-lg:h-10 max-lg:px-5'
                )}
              >
                Create Account
              </Link>
              <Link
                href={'/auth/sign-in'}
                className={cn(buttonVariants(), 'max-lg:h-10 max-lg:px-5')}
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
