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
import { useCreateCourseStepStore } from '@/lib/store/use-course-step-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course, CourseLevel, DurationUnit } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const basicInformationSchema = z.object({
  title: z.string().min(1).max(80),
  subtitle: z.string().min(1).max(120),
  category: z.string().min(1),
  subCategory: z.string().min(1).optional(),
  topic: z.string().min(1),
  language: z.string().min(1),
  subLanguage: z.string().optional(),
  level: z.nativeEnum(CourseLevel),
  duration: z.number().min(1),
  durationUnit: z.nativeEnum(DurationUnit),
});

interface Category {
  id: string;
  name: string;
}

interface Language {
  id: string;
  name: string;
  code: string;
}

interface BasicInformationStepFormProps {
  course?: Course;
}

const BasicInformationStepForm = ({
  course,
}: BasicInformationStepFormProps) => {
  const { currentStep, setStepCompleted, setNextStep, resetStore } =
    useCreateCourseStepStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof basicInformationSchema>>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      title: course?.title ?? '',
      subtitle: course?.subtitle ?? '',
      category: course?.categoryId ?? '',
      subCategory: course?.subCategoryId ?? '',
      topic: course?.topic ?? '',
      language: course?.languageId ?? '',
      subLanguage: course?.subLanguageId ?? '',
      level: course?.level ?? CourseLevel.BEGINNER,
      duration: course?.duration ?? 1,
      durationUnit: course?.durationUnit ?? DurationUnit.DAYS,
    },
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/course-metadata');
        const data = await response.json();
        setCategories(data.categories);
        setLanguages(data.languages);
      } catch (error) {
        console.error('Failed to fetch course metadata:', error);
        toast({
          title: 'Error',
          description: 'Failed to load form data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  async function onSubmit(values: z.infer<typeof basicInformationSchema>) {
    try {
      // console.log('values', values);
      // return;
      const method = course ? 'PATCH' : 'POST';
      const url = course ? `/api/courses/${course.id}` : '/api/courses';

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

      // Update step completion status
      setStepCompleted(currentStep.id, true);

      // Store course ID in localStorage for future steps
      // localStorage.setItem('currentCourseId', data.id);

      // Show success message
      toast({
        title: 'Success',
        description: `Course ${course ? 'updated' : 'created'} successfully`,
      });

      // Move to next step
      setNextStep();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to save course information',
        variant: 'destructive',
      });
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
                    placeholder="Your course title"
                    maxLength={120}
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

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Sub-category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sub-category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="game">Game Development</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Topic</FormLabel>
              <FormControl>
                <Input
                  placeholder="What is primarily taught in your course?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Language</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map((language) => (
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
            name="subLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub-language (Optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="Select a sub-language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map((language) => (
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
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          {/* <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Enter duration"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
          <Button variant="outline" onClick={() => resetStore()}>
            Cancel
          </Button>
          <Button type="submit" disabled={currentStep.isCompleted}>
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BasicInformationStepForm;
