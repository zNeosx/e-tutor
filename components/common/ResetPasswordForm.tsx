'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { toast } from '@/hooks/use-toast';
import { updatePassword } from '@/lib/actions/user.action';
import { resetPasswordSchema } from '@/lib/validations';
import { User } from '@prisma/client';
import PasswordInput from '../ui/password-input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const ResetPasswordForm = ({
  user,
  containerClassName,
  submitBtnClassName,
}: {
  user: User;
  containerClassName?: string;
  submitBtnClassName?: string;
}) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const result = await updatePassword({
      userId: user.id,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Password updated successfully',
      });
    } else {
      if (result.inputError) {
        form.setError(result.inputError, {
          type: 'custom',
          message: result.error,
        });
      }

      toast({
        title: `Error while updating your password`,
        description: result.error ?? 'An error occurred',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className={cn('w-full space-y-6', containerClassName)}>
      <h4>Change Password</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name={'currentPassword'}
            render={({ field, fieldState, formState }) => (
              <FormItem>
                <FormLabel className="body-m-400">Current Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type={'password'}
                    placeholder={'********'}
                    withStrengthIndicator={false}
                    inputAutoComplete="current-password"
                    field={field}
                    fieldState={fieldState}
                    formState={formState}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'newPassword'}
            render={({ field, fieldState, formState }) => (
              <FormItem>
                <FormLabel className="body-m-400">New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type={'password'}
                    placeholder={'********'}
                    withStrengthIndicator
                    inputAutoComplete="new-password"
                    field={field}
                    fieldState={fieldState}
                    formState={formState}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'confirmPassword'}
            render={({ field, fieldState, formState }) => (
              <FormItem>
                <FormLabel className="body-m-400">Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type={'password'}
                    placeholder={'********'}
                    withStrengthIndicator={false}
                    field={field}
                    fieldState={fieldState}
                    formState={formState}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn('mx-auto w-max', submitBtnClassName)}
          >
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
