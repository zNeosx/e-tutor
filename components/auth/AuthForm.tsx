'use client';
import { FIELD_NAMES, FIELD_PLACEHOLDERS, FIELD_TYPES } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from '@phosphor-icons/react';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import PasswordInput from '../ui/password-input';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { UserRole } from '@prisma/client';

interface Props<T extends FieldValues> {
  type: 'SIGN_UP' | 'SIGN_IN';
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{
    success: boolean;
    error?: string;
    user: { role: UserRole; isFirstLogin: boolean };
  }>;
}
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === 'SIGN_IN';

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: 'Success',
        description: isSignIn
          ? 'You have successfully signed in'
          : 'You have successfully signed up',
      });

      if (result.user.isFirstLogin) {
        if (result.user.role === UserRole.STUDENT)
          return router.push('/settings');
        else if (result.user.role === UserRole.INSTRUCTOR)
          return router.push('/instructor/settings');
        else return;
      }

      return router.push('/dashboard');
    } else {
      toast({
        title: `Error ${isSignIn ? 'signing in' : 'signing up'}`,
        description: result.error ?? 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h2 className="max-lg:text-center">
        {isSignIn ? 'Sign in to your account' : 'Create your account'}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {isSignIn ? null : (
            <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
              <FormField
                control={form.control}
                name={FIELD_NAMES['firstName'] as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type={FIELD_TYPES['firstName']}
                        placeholder={FIELD_PLACEHOLDERS['firstName']}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={FIELD_NAMES['lastName'] as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={FIELD_TYPES['lastName']}
                        placeholder={FIELD_PLACEHOLDERS['lastName']}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {Object.keys(defaultValues).map((field) => {
            if (
              field === 'firstName' ||
              field === 'lastName' ||
              (field === 'password' && !isSignIn) ||
              field === 'confirmPassword' ||
              field === 'terms'
            )
              return null;

            return (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === 'password' ? (
                        <PasswordInput
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          placeholder={'********'}
                          withStrengthIndicator={false}
                          field={field}
                        />
                      ) : (
                        <Input
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          placeholder={
                            FIELD_PLACEHOLDERS[
                              field.name as keyof typeof FIELD_PLACEHOLDERS
                            ]
                          }
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          {isSignIn ? null : (
            <div className="mb-6 grid gap-3 sm:grid-cols-2 sm:items-start">
              <FormField
                control={form.control}
                name={FIELD_NAMES['password'] as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        type={FIELD_TYPES['password']}
                        placeholder={FIELD_PLACEHOLDERS['password']}
                        withStrengthIndicator
                        field={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={FIELD_NAMES['confirmPassword'] as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        type={FIELD_TYPES['confirmPassword']}
                        placeholder={FIELD_PLACEHOLDERS['confirmPassword']}
                        withStrengthIndicator={false}
                        field={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="flex flex-col justify-between gap-6 pt-3 sm:flex-row sm:items-center">
            {isSignIn ? (
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="terms"
                  className="body-m-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </Label>
              </div>
            ) : (
              <FormField
                control={form.control}
                name={FIELD_NAMES['terms'] as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          id="terms"
                        />
                      </FormControl>
                      <FormLabel className="body-m-400">
                        {isSignIn
                          ? 'Remember me'
                          : 'I agree to the terms and conditions'}
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              isLoading={form.formState.isSubmitting}
            >
              {isSignIn ? 'Sign in' : 'Create Account'}
              <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
