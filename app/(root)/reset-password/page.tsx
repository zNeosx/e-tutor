'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import PasswordInput from '@/components/ui/password-input';
import { toast } from '@/hooks/use-toast';
import { resetPassword } from '@/lib/actions/user.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    password: z.string().min(8),
    'confirm-password': z.string().min(1),
  })
  .refine((data) => data.password === data['confirm-password'], {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirm-password'],
  });

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    redirect('/auth/sign-in');
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      'confirm-password': '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (!token) {
      toast({
        title: 'Error',
        description: "L'url est invalide.",
        variant: 'destructive',
      });
      return;
    }

    const result = await resetPassword({
      token,
      newPassword: values.password,
    });

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Succès',
      description: 'Votre mot de passe a été réinitialisé.',
    });

    redirect('/auth/sign-in');
  }

  return (
    <div className="p-10">
      <div className="mx-auto max-w-xl space-y-8">
        <h1>Réinitialiser votre mot de passe</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field, formState, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      type={'password'}
                      fieldState={fieldState}
                      formState={formState}
                      placeholder={'********'}
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
              name="confirm-password"
              render={({ field, formState, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      type={'password'}
                      placeholder={'********'}
                      withStrengthIndicator={false}
                      fieldState={fieldState}
                      formState={formState}
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={form.formState.isSubmitting}>
              Réinitialiser
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
