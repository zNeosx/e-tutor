'use client';
import { Bell, MagnifyingGlass } from '@phosphor-icons/react';
import { IKImage } from 'imagekitio-next';
import { Session } from 'next-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import SearchInput from './ui/search-input';
import { SidebarTrigger } from './ui/sidebar';
import { getInitials } from '@/lib/utils';
import { env } from '@/env';

const InstructorNavbar = ({ session }: { session: Session }) => {
  return (
    <nav className="bg-white pb-6">
      <SidebarTrigger />
      <div className="container-md flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Good Morning</span>
          <span className="text-xl font-semibold text-gray-900">
            Create a new course
          </span>
        </div>
        <div className="flex items-center gap-4">
          <SearchInput
            containerClassName="bg-gray-50 w-full max-w-80 max-lg:hidden placeholder:text-gray-500"
            inputPlaceholder="Search"
            inputClassName="text-md border-none focus:border-primary focus:border"
            iconClassName="text-gray-900"
          />
          <div className="size-12 bg-gray-50 p-3 lg:hidden">
            <MagnifyingGlass size={24} />
          </div>
          <div className="size-12 bg-gray-50 p-3">
            <Bell size={24} />
          </div>
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
        </div>
      </div>
    </nav>
  );
};

export default InstructorNavbar;
