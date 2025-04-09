'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  ChartBar,
  ChatCircleDots,
  CreditCard,
  Gear,
  SignOut,
  Stack,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Logo from './common/Logo';
import { Badge } from './ui/badge';
import { signOut } from 'next-auth/react';

const items = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: ChartBar,
    isAvailable: false,
  },
  // {
  //   title: 'Create New Course',
  //   url: 'courses/new',
  //   icon: PlusCircle,
  //   isAvailable: true,
  // },
  {
    title: 'My Courses',
    url: 'courses',
    icon: Stack,
    isAvailable: true,
  },
  {
    title: 'Earning',
    url: '#',
    // url: '/earning',
    icon: CreditCard,
    isAvailable: false,
  },
  {
    title: 'Message',
    url: '#',
    icon: ChatCircleDots,
    isAvailable: false,
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Gear,
    isAvailable: true,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-6 py-5">
        <Logo link="/instructor/dashboard" variant="white" isInSidebar />
      </SidebarHeader>
      <SidebarSeparator className="mx-0 w-full" />
      <SidebarContent className="mt-4">
        <SidebarGroup className="p-0">
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname.includes(item.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive}
                    asChild
                    className="whitespace-nowrap rounded-none p-0 px-6 py-3 active:bg-primary data-[active=true]:bg-primary data-[active=true]:text-white"
                    variant={'primary'}
                    size={'lg'}
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        'flex items-center gap-3 [&>svg]:size-6 text-sm hover:text-white',
                        !item.isAvailable
                          ? 'pointer-events-none opacity-70'
                          : ''
                      )}
                    >
                      <item.icon />
                      <span className="text-sm hover:text-white">
                        {item.title}
                      </span>
                      {!item.isAvailable ? (
                        <Badge className="ml-auto rounded-full py-0.5">
                          Soon
                        </Badge>
                      ) : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-6 py-5 [&>svg]:size-6">
        <span
          className="inline-flex cursor-pointer items-center gap-3 hover:text-primary [&>svg]:size-6"
          onClick={() => signOut()}
        >
          <SignOut />
          Sign-out
        </span>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
