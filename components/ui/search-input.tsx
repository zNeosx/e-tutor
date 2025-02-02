'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

interface Props {
  inputClassName?: string;
  containerClassName?: string;
  inputPlaceholder?: string;
}
export default function SearchInput(props: Props) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    <div className={cn('relative', props.containerClassName)}>
      <Input
        id={id}
        className={cn('peer ps-11', props.inputClassName)}
        placeholder={props.inputPlaceholder ?? 'Search...'}
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        {isLoading ? (
          <LoaderCircle
            className="animate-spin"
            size={24}
            strokeWidth={2}
            role="status"
            aria-label="Loading..."
          />
        ) : (
          <MagnifyingGlass size={24} strokeWidth={2} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
