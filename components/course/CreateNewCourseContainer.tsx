import { useCreateCourseStepStore } from '@/lib/store/use-course-step-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const CreateNewCourseContainer = () => {
  const { steps, currentStep, setCurrentStep } = useCreateCourseStepStore();
  console.log('currentStep', currentStep);
  console.log('steps', steps);

  return (
    <div className="overflow-hidden bg-white">
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
          {steps.map((step) => (
            <TabsTrigger
              key={step.id}
              value={step.id}
              disabled={
                step.index > currentStep.index + 1 ||
                (step.index === currentStep.index + 1 &&
                  !currentStep.isCompleted)
              }
              className="relative flex flex-1 justify-start gap-2 rounded-none p-5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            >
              <step.icon className="size-6" />
              {step.name}
            </TabsTrigger>
          ))}
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
    </div>
  );
};

export default CreateNewCourseContainer;
