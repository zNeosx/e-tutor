'use client';

import FileUpload2 from '@/components/FileUpload2';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import InputGroup from '@/components/ui/input-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { useCreateCourseStepStore } from '@/lib/store/use-course-step-store';
import { advanceInformationSchema } from '@/src/domain/entities/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course } from '@prisma/client';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BasicInformationStepFormProps {
  course?: Course;
}

const BasicInformationStepForm = ({
  course,
}: BasicInformationStepFormProps) => {
  const { setPreviousStep } = useCreateCourseStepStore();

  const isMobile = useIsMobile();

  const defaultValues = React.useMemo(
    () => ({
      thumbnail: course?.thumbnail ?? '',
      trailer: course?.trailer ?? '',
      description: course?.description ?? '',
      whatYouWillLearn: course?.whatYouWillLearn?.length
        ? course.whatYouWillLearn
        : [''],
      targetAudience: course?.targetAudience ?? [],
      requirements: course?.requirements ?? [],
    }),
    [course]
  );

  const form = useForm<z.infer<typeof advanceInformationSchema>>({
    resolver: zodResolver(advanceInformationSchema),
    defaultValues,
  });

  // React.useEffect(() => {
  //   updateBasicInformation(defaultValues);
  // }, [updateBasicInformation, defaultValues]);

  // React.useEffect(() => {
  //   const subscription = form.watch((data) => {
  //     updateBasicInformation(data);
  //   });
  //   return () => subscription.unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form.watch]);

  async function onSubmit(values: z.infer<typeof advanceInformationSchema>) {
    if (!values.whatYouWillLearn?.length) {
      toast({
        title: 'Error',
        description: 'Please add at least one teaching point',
        variant: 'destructive',
      });
      return;
    }

    console.log('values', values);

    try {
      const method = 'PATCH';
      const url = `/api/courses/${course?.slug}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // setStepCompleted(currentStep.id, true);
      toast({
        title: 'Success',
        description: `Course updated successfully`,
      });
      // setNextStep();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to save course information',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-around gap-6 max-lg:flex-col xl:justify-between">
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <Label className="body-xl-500">Course Thumbnail</Label>
                <FileUpload2
                  type="image"
                  accept="image/*"
                  folder="courses/thumbnails"
                  value={field.value ?? ''}
                  onFileChange={field.onChange}
                  fileDescription={
                    <p className="w-64 max-w-xs text-sm text-gray-500 xl:w-auto">
                      Upload your course Thumbnail here.{' '}
                      <b className="text-gray-900">Important guidelines:</b>{' '}
                      1200x800 pixels or 12:8 Ratio. Supported format:{' '}
                      <b className="text-gray-900">.jpg, .jpeg, or .png</b>
                    </p>
                  }
                  filePreviewWidth={isMobile ? 140 : 228}
                  filePreviewHeight={isMobile ? 140 : 160}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trailer"
            render={({ field }) => (
              <FormItem>
                <Label className="body-xl-500">Course Trailer</Label>
                <FileUpload2
                  type="video"
                  accept="video/*"
                  folder="courses/trailers"
                  value={field.value ?? ''}
                  onFileChange={field.onChange}
                  fileDescription={
                    <p className="w-64 max-w-xs text-sm text-gray-500 xl:w-auto">
                      Students who watch a well-made promo video are 5X more
                      likely to enroll in your course. We&apos;ve seen that
                      statistic go up to 10X for exceptionally awesome videos.
                    </p>
                  }
                  filePreviewWidth={isMobile ? 140 : 228}
                  filePreviewHeight={isMobile ? 140 : 160}
                />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-8 w-full" />

        {/* <div className="border-b border-gray-50 pb-8"> */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            const { value, ...rest } = field;
            return (
              <FormItem>
                <Label className="body-xl-500">Course Description</Label>
                <FormControl>
                  <Textarea
                    value={value ?? ''}
                    {...rest}
                    rows={6}
                    placeholder="Enter your course description"
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        {/* <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="body-xl-500">
              What you will teach in this course (
              {form.watch('whatYouWillLearn')?.length ?? 0}/8)
            </Label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                const currentFields = form.getValues('whatYouWillLearn') || [];
                if (currentFields.length >= 8) {
                  toast({
                    title: 'Maximum limit reached',
                    description: 'You can add up to 8 teaching points',
                    variant: 'destructive',
                  });
                  return;
                }
                form.setValue('whatYouWillLearn', [...currentFields, '']);
              }}
            >
              Add new
            </Button>
          </div>
          <div className="grid gap-4">
            {form.watch('whatYouWillLearn')?.map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name="whatYouWillLearn"
                render={({ field }) => {
                  const value = field.value?.[index] ?? '';
                  return (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <span className="w-8 text-sm font-medium text-gray-500">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <FormControl>
                          <InputWithCharacterLimit
                            value={value}
                            onChange={(e) => {
                              const newValue = [...(field.value || [''])];
                              newValue[index] = e.target.value;
                              field.onChange(newValue.filter(Boolean));
                            }}
                            placeholder="What you will teach in this course..."
                            maxLength={120}
                          />
                        </FormControl>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newValue = [...(field.value || [''])];
                              newValue.splice(index, 1);
                              field.onChange(newValue);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-4"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div> */}
        <InputGroup
          fieldName="whatYouWillLearn"
          label="What you will teach in this course"
          placeholder="What you will teach in this course..."
          form={form}
        />
        <Separator className="my-8 w-full" />
        <div className="flex items-center justify-between">
          {/* <Button variant="outline" onClick={() => resetStore()}> */}
          <Button variant="outline" onClick={() => setPreviousStep()}>
            Previous
          </Button>
          <Button
            type="submit"
            // disabled={currentStep.isCompleted}
            isLoading={form.formState.isSubmitting}
          >
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BasicInformationStepForm;
