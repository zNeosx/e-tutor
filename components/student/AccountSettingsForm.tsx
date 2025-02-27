'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { FIELD_NAMES, FIELD_PLACEHOLDERS, FIELD_TYPES } from '@/constants';
import { studentAccountSchema } from '@/lib/validations';
import { User } from '@prisma/client';
import FileUpload from '../FileUpload';
import { updateUser } from '@/lib/actions/user.action';
import { toast } from '@/hooks/use-toast';

const AccountSettingsForm = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof studentAccountSchema>>({
    resolver: zodResolver(studentAccountSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      title: user.title ?? '',
      avatar: user.avatar ?? undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof studentAccountSchema>) {
    console.log(values);
    const result = await updateUser({
      id: user.id,
      data: values,
    });

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Account updated successfully',
      });
    } else {
      toast({
        title: `Error while updating your account`,
        description: result.error ?? 'An error occurred',
        variant: 'destructive',
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-10 max-md:flex-col lg:gap-20"
        >
          <FormField
            control={form.control}
            name={'avatar'}
            render={({ field }) => (
              <FormItem className="mx-auto space-y-0">
                <FormLabel className="body-m-400">
                  {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    folder={`avatars`}
                    onFileChange={field.onChange}
                    value={field.value}
                    imageSize={280}
                    containerClassName="border border-gray-100 p-3 md:p-6 xl:p-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-5 md:basis-3/4">
            <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
              <FormField
                control={form.control}
                name={'firstName'}
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
                name={'lastName'}
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
            <FormField
              control={form.control}
              name={'userName'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-m-400">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={FIELD_TYPES['userName']}
                      placeholder={FIELD_PLACEHOLDERS['userName']}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-m-400">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={FIELD_TYPES['email']}
                      placeholder={FIELD_PLACEHOLDERS['email']}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-m-400">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={FIELD_TYPES['title']}
                      placeholder={FIELD_PLACEHOLDERS['title']}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountSettingsForm;
