import { Step } from '@/constants';
import { create } from 'zustand';

type CourseStepStore = {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  setPreviousStep: () => void;
  setNextStep: () => void;
  // resetStore: () => void;
};

const steps = Object.values(Step);

console.log('steps', steps[steps.indexOf(Step.BASIC_INFORMATION) + 1]);

export const useCreateCourseStepStore = create<CourseStepStore>((set) => ({
  currentStep: Step.BASIC_INFORMATION,
  setCurrentStep: (step) => set({ currentStep: step }),
  setPreviousStep: () =>
    set((state) => ({
      currentStep:
        steps[steps.indexOf(state.currentStep) - 1] || state.currentStep,
    })),
  setNextStep: () =>
    set((state) => ({
      currentStep:
        steps[steps.indexOf(state.currentStep) + 1] || state.currentStep,
    })),
}));
