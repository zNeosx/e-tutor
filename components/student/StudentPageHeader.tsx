'use client';
import { STUDENT_HEADER_LINKS } from '@/constants';
import { env } from '@/env';
import { cn, getInitials } from '@/lib/utils';
import { ArrowRight } from '@phosphor-icons/react';
import { IKImage } from 'imagekitio-next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { buttonVariants } from '../ui/button';
import { SelectUser } from '@/lib/db/schema';
export type StudentPageHeaderProps = {
  user: SelectUser;
};

export const StudentPageHeader = (props: StudentPageHeaderProps) => {
  const pathname = usePathname();

  const fullName = `${props.user.firstName} ${props.user.lastName}`;

  return (
    <div className="relative h-40 bg-primary-100 md:h-[280px]">
      <div className="absolute left-1/2 top-1/4 h-fit w-11/12 max-w-[1320px] -translate-x-1/2 gap-4 overflow-hidden border border-primary-100 bg-white md:top-1/3 xl:top-1/4">
        <div className="flex flex-1 items-center gap-4 p-4 max-sm:flex-col sm:justify-between md:p-10">
          <div className="flex items-center gap-4 max-md:justify-center xl:gap-6">
            <Avatar className="size-16 xl:size-28">
              {props.user.avatar ? (
                <IKImage
                  urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  path={props.user.avatar}
                  width={110}
                  height={110}
                  alt={'User Avatar'}
                  className="rounded-full object-cover"
                />
              ) : null}
              <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-4">
              <h4>{fullName}</h4>
              <span className="body-lg-400 text-gray-600">
                {props.user.title}
                BLABLABLABLABLA
              </span>
            </div>
          </div>
          <Link
            href="/become-an-instructor"
            className={cn(
              buttonVariants({
                variant: 'secondary',
                className: 'text-primary hover:text-primary-600',
              }),
              'xl:text-lg'
            )}
          >
            Become an instructor <ArrowRight />
          </Link>
        </div>

        <nav className="hide-scrollbar grid h-fit w-full auto-cols-max grid-flow-col gap-6 border-t border-t-primary-100 max-xl:overflow-x-scroll">
          {STUDENT_HEADER_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'w-[168px] font-medium text-center py-3 md:py-5 text-gray-700 hover:text-gray-900 body-lg-500 h-full whitespace-nowrap',
                  isActive ? 'border-b-4 border-b-primary text-gray-900' : ''
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
