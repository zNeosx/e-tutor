import { create } from 'zustand';
import { ValidationResult, validateBasicInformation } from '@/lib/utils';
import { BasicInformationRequired } from '@/src/domain/entities/course';

interface CourseProgressState {
  basicInformation: ValidationResult;
  totalProgress: number;
  updateBasicInformation: (data: Partial<BasicInformationRequired>) => void;
}

export const useCourseProgressStore = create<CourseProgressState>((set) => ({
  basicInformation: {
    isValid: false,
    completedFields: 0,
    totalFields: 8,
  },
  totalProgress: 0,
  updateBasicInformation: (data) => {
    const validation = validateBasicInformation(data);
    set(() => ({
      basicInformation: validation,
      totalProgress: Math.round(
        (validation.completedFields / validation.totalFields) * 100
      ),
    }));
  },
}));
