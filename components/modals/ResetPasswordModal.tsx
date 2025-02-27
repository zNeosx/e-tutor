'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { requestPasswordReset } from '@/lib/actions/user.action';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';

const formSchema = z.object({
  email: z.string().email(),
});

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}
const ResetPasswordModal = ({ isOpen, closeModal }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const result = await requestPasswordReset(values.email);
    console.log('result', result);
    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description:
        'Un email a été envoyé avec les instructions pour réinitialiser votre mot de passe.',
    });

    closeModal();
    return;
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Réinitialisation du mot de passe</AlertDialogTitle>
          <AlertDialogDescription>
            Veuillez entrer votre adresse email pour réinitialiser votre mot de
            passe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel type="button" onClick={() => closeModal()}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" isLoading={form.formState.isSubmitting}>
                  Send email
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetPasswordModal;
