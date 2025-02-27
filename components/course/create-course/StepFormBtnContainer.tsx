import { Button } from '@/components/ui/button';
import { useCreateCourseStepStore } from '@/lib/store/use-course-step-store';

const StepFormBtnContainer = () => {
  const { resetStore, currentStep } = useCreateCourseStepStore();

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={() => resetStore()}>
        Cancel
      </Button>
      <Button type="submit" disabled={currentStep.isCompleted}>
        Save & Next
      </Button>
    </div>
  );
};

export default StepFormBtnContainer;
