import { Step } from '@/types';
import { create } from 'zustand';
import {
  Stack,
  Clipboard,
  MonitorPlay,
  PlayCircle,
} from '@phosphor-icons/react';
import BasicInformationStep from '@/components/course/create-course/BasicInformationStep';
import AdvanceInformationStep from '@/components/course/create-course/AdvanceInformationStep';
import CurriculumStep from '@/components/course/create-course/CurriculumStep';
import PublishCourseStep from '@/components/course/create-course/PublishCourseStep';

const CREATE_NEW_COURSE_STEPS: Step[] = [
  {
    index: 0,
    id: 'basic-information',
    name: 'Basic Information',
    icon: Stack,
    isCompleted: false,
    component: BasicInformationStep,
  },
  {
    index: 1,
    id: 'advance-information',
    name: 'Advance Information',
    icon: Clipboard,
    isCompleted: false,
    component: AdvanceInformationStep,
  },
  {
    index: 2,
    id: 'curriculum',
    name: 'Curriculum',
    icon: MonitorPlay,
    isCompleted: false,
    component: CurriculumStep,
  },
  {
    index: 3,
    id: 'publish-course',
    name: 'Publish Course',
    icon: PlayCircle,
    isCompleted: false,
    component: PublishCourseStep,
  },
];

type CourseStepStore = {
  steps: Step[];
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  setStepCompleted: (stepId: string, isCompleted: boolean) => void;
  setPreviousStep: () => void;
  setNextStep: () => void;
  resetStore: () => void;
};

export const useCreateCourseStepStore = create<CourseStepStore>((set) => ({
  steps: CREATE_NEW_COURSE_STEPS,
  currentStep: CREATE_NEW_COURSE_STEPS[0],
  setCurrentStep: (step) => set({ currentStep: step }),
  setStepCompleted: (stepId, isCompleted) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, isCompleted } : step
      ),
    })),
  setPreviousStep: () =>
    set((state) => ({
      currentStep: state.steps.find(
        (step) => step.index === state.currentStep.index - 1
      ),
    })),
  setNextStep: () =>
    set((state) => ({
      currentStep: state.steps.find(
        (step) => step.index === state.currentStep.index + 1
      ),
    })),
  resetStore: () =>
    set({
      steps: CREATE_NEW_COURSE_STEPS,
      currentStep: CREATE_NEW_COURSE_STEPS[0],
    }),
}));
