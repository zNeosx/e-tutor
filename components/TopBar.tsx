'use client';
import { TOPBAR_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const TopBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-14 items-center justify-between bg-gray-900 px-3 text-white lg:px-8">
      <Button
        size={'icon'}
        className="z-20 bg-transparent hover:bg-transparent lg:hidden [&_svg]:size-6"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>
      <ul
        className={cn(
          'h-full gap-2 text-gray-500 max-lg:absolute max-lg:left-0 max-lg:top-0 max-lg:py-16 max-lg:min-h-screen max-lg:w-full max-lg:bg-gray-900 lg:flex max-lg:-translate-x-full max-lg:transition-all max-lg:duration-300',
          isOpen ? 'max-lg:translate-x-0' : ''
        )}
      >
        {TOPBAR_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex h-auto items-center p-4 hover:text-white whitespace-nowrap',
                isActive
                  ? 'text-white lg:border-t-2 lg:border-t-primary max-lg:text-primary'
                  : ''
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </ul>

      <div className="z-20 flex items-center gap-6">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="USD" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="English" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="french">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TopBar;
