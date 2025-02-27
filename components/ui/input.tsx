import * as React from 'react';

import { cn } from '@/lib/utils';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { PASSWORD_FIELDS } from '@/constants';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    'data-invalid'?:
      | boolean
      | 'false'
      | 'true'
      | 'grammar'
      | 'spelling'
      | undefined;
    inputContainerClassName?: string;
  }
>(({ className, type, inputContainerClassName, ...props }, ref) => {
  const isPasswordInput = PASSWORD_FIELDS.includes(props.name as string);

  return (
    <div className={cn('relative', inputContainerClassName)}>
      <input
        type={type}
        className={cn(
          'flex h-12 w-full gap-1.5 items-center border border-gray-100 justify-between whitespace-nowrap bg-transparent px-4 py-3 text-sm text-gray-900 shadow-sm ring-offset-background placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 focus:border-primary',
          props['data-invalid'] === true && 'border-error-300 bg-error-100',
          props['data-invalid'] === false &&
            'border-green-300 bg-green-100 focus:border-green-300',
          className
        )}
        ref={ref}
        {...props}
      />
      {!isPasswordInput && props['data-invalid'] === false ? (
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-green-500 peer-disabled:opacity-50">
          <CheckCircleIcon width={24} height={24} strokeWidth={2} />
        </div>
      ) : null}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
