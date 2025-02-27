'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, PhoneIcon } from 'lucide-react';
import React, { forwardRef, useId } from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

interface Props {
  value: string;
  onChange: (value: RPNInput.Value) => void;
  placeholder?: string;
  className?: string;
  inputContainerClassName?: string;
}
export default function PhoneNumberInput({
  value,
  onChange,
  placeholder = 'Enter phone number',
  className,
  inputContainerClassName,
}: Props) {
  const id = useId();

  return (
    <RPNInput.default
      className={cn('flex rounded-lg', className)}
      inputContainerClassName={inputContainerClassName}
      international
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={PhoneInput}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

const PhoneInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { inputContainerClassName?: string }
>(({ className, inputContainerClassName, ...props }, ref) => {
  return (
    <Input
      className={cn(
        '-ms-px rounded-s-none shadow-none focus-visible:z-10',
        className
      )}
      inputContainerClassName={inputContainerClassName}
      ref={ref}
      {...props}
    />
  );
});

PhoneInput.displayName = 'PhoneInput';

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country);
  };

  return (
    <div className="has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/25 focus-within:outline-hidden has-disabled:pointer-events-none has-disabled:opacity-50 relative inline-flex items-center self-stretch rounded-s-lg border border-input bg-background py-2 pe-2 ps-3 text-muted-foreground ring-ring/[0.08] transition-shadow focus-within:z-10 focus-within:border-ring/40 focus-within:ring hover:bg-accent hover:text-foreground dark:ring-ring/[0.12]">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label}{' '}
              {option.value &&
                `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <PhoneIcon size={16} aria-hidden="true" />
      )}
    </span>
  );
};
