'use client';
import { useCreateCourseStepStore } from '@/lib/store/use-course-step-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../common/Loader';
import { Course } from '@/src/domain/entities/course';
import Link from 'next/link';

const CreateNewCourseTab = ({ slug }: { slug: string }) => {
  const { steps, currentStep, setCurrentStep } = useCreateCourseStepStore();

  const query = useQuery({
    queryKey: ['course', slug],
    queryFn: () => fetch(`/api/courses/${slug}`).then((res) => res.json()),
    enabled: !!slug,
  });

  if (query.isLoading) {
    return <Loader />;
  }

  if (query.data?.error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Error: {query.data.error}</h1>
        <Link href="/instructor/courses" className="text-blue-500">
          Go to courses
        </Link>
      </div>
    );
  }

  const course: Course = query.data;

  console.log('course', course);
  console.log('query', query);

  return (
    <Tabs
      defaultValue={currentStep.id}
      value={currentStep.id}
      onValueChange={(value) => {
        const nextStep = steps.find((step) => step.id === value);
        // Allow moving to next step if current step is completed or moving to previous/current step
        if (
          nextStep &&
          (nextStep.index <= currentStep.index ||
            currentStep.isCompleted ||
            nextStep.index === currentStep.index + 1)
        ) {
          setCurrentStep(nextStep);
        }
      }}
      className="w-full"
    >
      <TabsList className="h-auto w-full rounded-none bg-transparent p-0">
        {steps.map((step) => {
          const isBasicInformationStep = step.id === 'basic-information';

          const isBasicInformationCompleted = course?.basicInformationCompleted;

          return (
            <TabsTrigger
              key={step.id}
              value={step.id}
              // disabled={
              //   step.index > currentStep.index + 1 ||
              //   (step.index === currentStep.index + 1 &&
              //     !currentStep.isCompleted)
              // }
              disabled={!isBasicInformationStep && !isBasicInformationCompleted}
              className="relative flex flex-1 justify-start gap-2 rounded-none p-5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            >
              <step.icon className="size-6" />
              {step.name}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {steps.map((step) => {
        const StepComponent = step.component;
        return (
          <TabsContent key={step.id} value={step.id} className="mt-0">
            <StepComponent />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default CreateNewCourseTab;
