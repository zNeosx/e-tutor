'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { formatPageName } from '@/lib/utils';

const getHistory = (pathname: string) => {
  const history = pathname.split('/');

  return history.map((item, index) => {
    if (item === '') {
      return {
        name: 'Home',
        href: '/',
      };
    }

    return {
      name: formatPageName(item),
      href: history.slice(0, index + 1).join('/'),
    };
  });
};

const PageBreadcrumb = ({ pageName }: { pageName?: string }) => {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  const breadcrumbItems = getHistory(pathname);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 p-10">
      <h4>{pageName ?? formatPageName(pathname.slice(1))}</h4>

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isActive = item.href === pathname;
            return (
              <React.Fragment key={item.href}>
                <BreadcrumbItem>
                  {isActive ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index !== breadcrumbItems.length - 1 ? (
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                ) : null}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumb;
