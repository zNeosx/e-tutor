'use client';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';
import { Form } from '../ui/form';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T & { userId: string }) => Promise<{
    success: boolean;
    error?: string;
    data?: User;
  }>;
  children: React.ReactNode;
  formTitle: string;
  afterSubmit?: () => void;
  successToastMessage: string;
  userId: string;
}
const GeneralForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  afterSubmit,
  children,
  formTitle,
  successToastMessage,
  userId,
}: Props<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    const result = await onSubmit({
      ...data,
      userId,
    });

    if (result.success) {
      toast({
        title: 'Success',
        description: successToastMessage,
      });

      if (afterSubmit) {
        afterSubmit();
      }

      return;
    } else {
      toast({
        title: 'Error',
        description: result.error ?? 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h4>{formTitle}</h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {children}
        </form>
      </Form>
    </div>
  );
};

export default GeneralForm;
