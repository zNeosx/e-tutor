// import { Step } from '@/types';
// import { create } from 'zustand';
// import {
//   Stack,
//   Clipboard,
//   MonitorPlay,
//   PlayCircle,
// } from '@phosphor-icons/react';

// // Define step types without importing the components directly
// const CREATE_NEW_COURSE_STEPS: Omit<Step, 'component'>[] = [
//   {
//     index: 0,
//     id: 'basic-information',
//     name: 'Basic Information',
//     icon: Stack,
//     isCompleted: false,
//   },
//   {
//     index: 1,
//     id: 'advance-information',
//     name: 'Advance Information',
//     icon: Clipboard,
//     isCompleted: false,
//   },
//   {
//     index: 2,
//     id: 'curriculum',
//     name: 'Curriculum',
//     icon: MonitorPlay,
//     isCompleted: false,
//   },
//   {
//     index: 3,
//     id: 'publish-course',
//     name: 'Publish Course',
//     icon: PlayCircle,
//     isCompleted: false,
//   },
// ];

// type CourseStepStore = {
//   steps: Step[];
//   currentStep: Step;
//   setCurrentStep: (step: Step) => void;
//   setStepCompleted: (stepId: string, isCompleted: boolean) => void;
//   setPreviousStep: () => void;
//   setNextStep: () => void;
//   resetStore: () => void;
// };

// // Function to dynamically import step components
// const getStepComponent = async (stepId: string) => {
//   switch (stepId) {
//     case 'basic-information':
//       const { default: BasicInformationStep } = await import(
//         '@/components/course/create-course/BasicInformationStep'
//       );
//       return BasicInformationStep;
//     case 'advance-information':
//       const { default: AdvanceInformationStep } = await import(
//         '@/components/course/create-course/AdvanceInformationStep'
//       );
//       return AdvanceInformationStep;
//     case 'curriculum':
//       const { default: CurriculumStep } = await import(
//         '@/components/course/create-course/CurriculumStep'
//       );
//       return CurriculumStep;
//     case 'publish-course':
//       const { default: PublishCourseStep } = await import(
//         '@/components/course/create-course/PublishCourseStep'
//       );
//       return PublishCourseStep;
//     default:
//       throw new Error(`Unknown step ID: ${stepId}`);
//   }
// };

// export const useCreateCourseStepStore = create<CourseStepStore>((set) => ({
//   steps: CREATE_NEW_COURSE_STEPS.map((step) => ({
//     ...step,
//     component: () => {
//       // This will be replaced with the actual component when needed
//       return null;
//     },
//   })),
//   currentStep: CREATE_NEW_COURSE_STEPS[0] as Step,
//   setCurrentStep: (step) => set({ currentStep: step }),
//   setStepCompleted: (stepId, isCompleted) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === stepId ? { ...step, isCompleted } : step
//       ),
//     })),
//   setPreviousStep: () =>
//     set((state) => ({
//       currentStep:
//         state.steps.find(
//           (step) => step.index === state.currentStep.index - 1
//         ) || state.currentStep,
//     })),
//   setNextStep: () =>
//     set((state) => ({
//       currentStep:
//         state.steps.find(
//           (step) => step.index === state.currentStep.index + 1
//         ) || state.currentStep,
//     })),
//   resetStore: () =>
//     set({
//       steps: CREATE_NEW_COURSE_STEPS.map((step) => ({
//         ...step,
//         component: () => null,
//       })),
//       currentStep: CREATE_NEW_COURSE_STEPS[0] as Step,
//     }),
// }));
