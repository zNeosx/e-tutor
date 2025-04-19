'use client';

import { Input } from '@/components/ui/input';
import { ChangeEventHandler, useId } from 'react';

export default function InputWithCharacterLimit({
  maxLength,
  value,
  onChange,
  placeholder,
  ...field
}: {
  maxLength: number;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}) {
  const id = useId();

  return (
    <div className="relative w-full">
      <Input
        id={id}
        className="peer pe-14"
        type="text"
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        aria-describedby={`${id}-description`}
        {...field}
      />
      <div
        id={`${id}-description`}
        className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
        aria-live="polite"
        role="status"
      >
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
