'use client';

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
import InputWithCharacterLimit from '@/components/ui/input-with-character-limit';
import InputWithSelect from '@/components/ui/input-with-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useCourseMetadata } from '@/hooks/use-course-metadata';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course, CourseLevel, DurationUnit } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { basicInformationSchema } from '@/src/domain/entities/course';
import { useCourseProgressStore } from '@/src/store/course-progress.store';
import React from 'react';

interface BasicInformationStepFormProps {
  course?: Course;
}

const BasicInformationStepForm = ({
  course,
}: BasicInformationStepFormProps) => {
  // const { currentStep, setStepCompleted, setNextStep, resetStore } =
  //   useCreateCourseStepStore();

  const { categories, languages, isLoading, error } = useCourseMetadata();
  const { updateBasicInformation } = useCourseProgressStore();

  const defaultValues = React.useMemo(
    () => ({
      title: course?.title ?? '',
      subtitle: course?.subtitle ?? '',
      categoryId: course?.categoryId ?? '',
      subCategoryId: course?.subCategoryId ?? '',
      topic: course?.topic ?? '',
      languageId: course?.languageId ?? '',
      subLanguageId: course?.subLanguageId ?? '',
      level: course?.level ?? CourseLevel.BEGINNER,
      duration: course?.duration ?? 1,
      durationUnit: course?.durationUnit ?? DurationUnit.DAYS,
    }),
    [course]
  );

  const form = useForm<z.infer<typeof basicInformationSchema>>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues,
  });

  React.useEffect(() => {
    updateBasicInformation(defaultValues);
  }, [updateBasicInformation, defaultValues]);

  React.useEffect(() => {
    const subscription = form.watch((data) => {
      updateBasicInformation(data);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch]);

  async function onSubmit(values: z.infer<typeof basicInformationSchema>) {
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
        description: `Course updatedsuccessfully`,
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

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error loading form data. Please try again.</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            const { value, onChange, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <InputWithCharacterLimit
                    placeholder="Your course title"
                    maxLength={80}
                    value={value}
                    onChange={onChange}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => {
            const { value, onChange, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <InputWithCharacterLimit
                    placeholder="Your course subtitle"
                    maxLength={120}
                    value={value ?? ''}
                    onChange={onChange}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories
                      .filter(
                        (category) =>
                          category.id !== form.watch('subCategoryId')
                      )
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    {categories.filter(
                      (category) => category.id !== form.watch('subCategoryId')
                    ).length === 0 && (
                      <SelectItem value="null" disabled>
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Sub-category</FormLabel>
                <div className="relative">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub-category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories
                        .filter(
                          (category) => category.id !== form.watch('categoryId')
                        )
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      {categories.filter(
                        (category) => category.id !== form.watch('categoryId')
                      ).length === 0 && (
                        <SelectItem value="null" disabled>
                          No sub-categories available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {field.value && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-8 top-0 h-full px-2 py-0"
                      onClick={() => field.onChange(undefined)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => {
            const { value, onChange, ...rest } = field;

            return (
              <FormItem>
                <FormLabel>Course Topic</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is primarily taught in your course?"
                    value={value ?? ''}
                    onChange={onChange}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          <FormField
            control={form.control}
            name="languageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages
                      .filter(
                        (language) =>
                          language.id !== form.watch('subLanguageId')
                      )
                      .map((language) => (
                        <SelectItem key={language.id} value={language.id}>
                          {language.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subLanguageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub-language (Optional)</FormLabel>
                <div className="relative">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue placeholder="Select a sub-language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages
                        .filter(
                          (language) => language.id !== form.watch('languageId')
                        )
                        .map((language) => (
                          <SelectItem key={language.id} value={language.id}>
                            {language.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {field.value && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-8 top-0 h-full px-2 py-0"
                      onClick={() => field.onChange(undefined)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({}) => (
              <FormItem>
                <FormLabel>Course Duration</FormLabel>
                <FormControl>
                  <InputWithSelect
                    inputType="number"
                    selectOptions={Object.values(DurationUnit).map((unit) => ({
                      value: unit,
                      label: unit,
                    }))}
                    selectDefaultValue={DurationUnit.DAYS}
                    inputDefaultValue={1}
                    inputName="duration"
                    selectName="durationUnit"
                    setValue={form.setValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          {/* <Button variant="outline" onClick={() => resetStore()}> */}
          <Button variant="outline">Cancel</Button>
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
