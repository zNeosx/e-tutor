import { Input } from '@/components/ui/input';
import { useId } from 'react';

export default function InputWithIcon({
  icon,
  placeholder,
  type,
  ...field
}: {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
}) {
  const id = useId();
  return (
    <div className="relative">
      <Input
        {...field}
        id={id}
        className="peer ps-16"
        placeholder={placeholder}
        type={type}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-muted-foreground/80 peer-disabled:opacity-50">
        {icon}
        <div className="mx-3 h-8 w-px bg-border" />
      </div>
    </div>
  );
}
