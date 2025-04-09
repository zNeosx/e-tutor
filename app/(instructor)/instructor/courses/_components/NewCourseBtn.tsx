'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import { courseCreateSchema, Course } from '@/src/domain/entities/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const NewCourseBtn = () => {
  const router = useRouter();
  const createCourseMutation = useMutation({
    mutationFn: async (values: z.infer<typeof courseCreateSchema>) => {
      const response = await fetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      return response.json();
    },
  });

  const form = useForm<z.infer<typeof courseCreateSchema>>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: z.infer<typeof courseCreateSchema>) {
    createCourseMutation.mutate(values, {
      onSuccess: (data: Course) => {
        router.push(`/instructor/courses/new/${data.slug}`);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="[&_svg]:size-6">
          <PlusCircle />
          New Course
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a new course</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Le titre du cours"
                      disabled={createCourseMutation.isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => form.reset()}
                disabled={createCourseMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={createCourseMutation.isPending}
                isLoading={createCourseMutation.isPending}
              >
                Create
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewCourseBtn;
