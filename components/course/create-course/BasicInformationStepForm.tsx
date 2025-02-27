'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateCourseStepStore } from '@/lib/store/use-course-step-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import StepFormBtnContainer from './StepFormBtnContainer';
import InputWithCharacterLimit from '@/components/ui/input-with-character-limit';
import { CourseLevel, DurationUnit } from '@prisma/client';
import InputWithSelect from '@/components/ui/input-with-select';

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

const BasicInformationStepForm = () => {
  const { currentStep, setStepCompleted, setNextStep } =
    useCreateCourseStepStore();

  const form = useForm<z.infer<typeof basicInformationSchema>>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      category: undefined,
      subCategory: undefined,
      topic: '',
      language: '',
      subLanguage: '',
      level: CourseLevel.BEGINNER,
      duration: 1,
      durationUnit: DurationUnit.DAYS,
    },
  });

  async function onSubmit(values: z.infer<typeof basicInformationSchema>) {
    console.log('values', values);
    setStepCompleted(currentStep.id, true);
    setNextStep();
  }

  console.log('duration', form.watch('duration'));
  console.log('durationUnit', form.watch('durationUnit'));
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sub-language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
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
        <StepFormBtnContainer />
      </form>
    </Form>
  );
};

export default BasicInformationStepForm;
