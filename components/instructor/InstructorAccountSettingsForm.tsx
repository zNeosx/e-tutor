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
import { toast } from '@/hooks/use-toast';
import { updateInstructor } from '@/lib/actions/user.action';
import { instructorAccountSchema } from '@/lib/validations';
import { Instructor, User } from '@prisma/client';
import FileUpload from '../FileUpload';
import PhoneNumberInput from '../ui/phone-input';
import { Textarea } from '../ui/textarea';

type UserWithOptionalInstructor = User & { instructor?: Instructor | null };

const InstructorAccountSettingsForm = ({
  user,
}: {
  user: UserWithOptionalInstructor;
}) => {
  const form = useForm<z.infer<typeof instructorAccountSchema>>({
    resolver: zodResolver(instructorAccountSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      title: user.title ?? '',
      avatar: user.avatar ?? undefined,
      phoneNumber: user.instructor?.phoneNumber ?? '',
      biography: user.instructor?.biography ?? '',
    },
  });

  async function onSubmit(values: z.infer<typeof instructorAccountSchema>) {
    const result = await updateInstructor({
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
    <div className="form-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-[18px]">
            <div className="flex gap-10 max-md:flex-col">
              <div className="flex w-full flex-col gap-4">
                <h4 className="mb-6">Account Settings</h4>
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
                      <FormLabel className="body-m-400 capitalize">
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
                  name={'phoneNumber'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="body-m-400">Phone Number</FormLabel>
                      <FormControl>
                        <PhoneNumberInput
                          inputContainerClassName="w-full"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        containerClassName="p-6 md:p-8 bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-m-400 capitalize">
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
            <FormField
              control={form.control}
              name={'biography'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-m-400 capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={FIELD_PLACEHOLDERS['biography']}
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InstructorAccountSettingsForm;
