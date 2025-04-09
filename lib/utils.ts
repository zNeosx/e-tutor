import { env } from '@/env';
import { BasicInformationRequired } from '@/src/domain/entities/course';
import { Course, UserRole } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAuthErrorMessage = (message: string) => {
  if (message.includes('.')) {
    return message.split('.')[0];
  }

  return message;
};

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

export const checkUserRole = (
  role: UserRole,
  roleToCheck: UserRole
): { redirectPath?: string | undefined } => {
  if (role === roleToCheck)
    return {
      redirectPath: undefined,
    };

  switch (role) {
    case UserRole.STUDENT:
      return { redirectPath: '/dashboard' };
    case UserRole.INSTRUCTOR:
      return { redirectPath: '/instructor/dashboard' };
    default:
      return { redirectPath: '/auth/sign-in' };
  }
};

export const authenticator = async () => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/imagekit`
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return {
      token,
      expire,
      signature,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Authenticator request failed: ${error.message}`);
  }
};

export const formatPageName = (name: string) => {
  const nameSplitted = String(name).split('-');

  return nameSplitted
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const filterEmptyValues = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>);
};

export interface ValidationResult {
  isValid: boolean;
  completedFields: number;
  totalFields: number;
}

// export interface AdvanceInformationFields {
//   description?: string | null;
//   requirements?: string[] | null;
//   objectives?: string[] | null;
//   targetAudience?: string[] | null;
//   price?: number | null;
//   thumbnail?: string | null;
//   previewVideo?: string | null;
// }

// export interface CurriculumFields {
//   sections?:
//     | {
//         title: string;
//         lectures: {
//           title: string;
//           content: string;
//           duration: number;
//           type: string;
//         }[];
//       }[]
//     | null;
// }

// export interface PublishFields {
//   welcomeMessage?: string | null;
//   congratulationsMessage?: string | null;
//   status?: 'DRAFT' | 'PUBLISHED' | null;
// }

export const validateBasicInformation = (
  data: Partial<BasicInformationRequired>
): ValidationResult => {
  const requiredFields: (keyof BasicInformationRequired)[] = [
    'title',
    'subtitle',
    'categoryId',
    'topic',
    'languageId',
    'level',
    'duration',
    'durationUnit',
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => {
    const value = data[field];
    return value !== undefined && value !== null && value !== '';
  }).length;

  return {
    isValid: completedFields === totalFields,
    completedFields,
    totalFields,
  };
};

// export const validateAdvanceInformation = (
//   data: Partial<AdvanceInformationFields>
// ): ValidationResult => {
//   const requiredFields: (keyof AdvanceInformationFields)[] = [
//     'description',
//     'requirements',
//     'objectives',
//     'targetAudience',
//     'price',
//     'thumbnail',
//   ];

//   const totalFields = requiredFields.length;
//   const completedFields = requiredFields.filter((field) => {
//     const value = data[field];
//     if (Array.isArray(value)) {
//       return value.length > 0;
//     }
//     return value !== undefined && value !== null && value !== '';
//   }).length;

//   return {
//     isValid: completedFields === totalFields,
//     completedFields,
//     totalFields,
//   };
// };

// export const validateCurriculum = (
//   data: Partial<CurriculumFields>
// ): ValidationResult => {
//   const totalFields = 1; // Sections est le seul champ requis
//   let completedFields = 0;

//   if (
//     data.sections &&
//     data.sections.length > 0 &&
//     data.sections.every(
//       (section) =>
//         section.title &&
//         section.lectures &&
//         section.lectures.length > 0 &&
//         section.lectures.every(
//           (lecture) =>
//             lecture.title && lecture.content && lecture.duration && lecture.type
//         )
//     )
//   ) {
//     completedFields = 1;
//   }

//   return {
//     isValid: completedFields === totalFields,
//     completedFields,
//     totalFields,
//   };
// };

// export const validatePublish = (
//   data: Partial<PublishFields>
// ): ValidationResult => {
//   const requiredFields: (keyof PublishFields)[] = [
//     'welcomeMessage',
//     'congratulationsMessage',
//     'status',
//   ];

//   const totalFields = requiredFields.length;
//   const completedFields = requiredFields.filter((field) => {
//     const value = data[field];
//     return value !== undefined && value !== null && value !== '';
//   }).length;

//   return {
//     isValid: completedFields === totalFields,
//     completedFields,
//     totalFields,
//   };
// };

// Fonction utilitaire pour obtenir la progression globale
export const getCreateNewCourseProgress = (
  course: Course
): {
  totalProgress: number;
  stepProgress: {
    basicInformation: ValidationResult;
    // advanceInformation: ValidationResult;
    // curriculum: ValidationResult;
    // publish: ValidationResult;
  };
} => {
  const basicProgress = validateBasicInformation(course);
  // const advanceProgress = validateAdvanceInformation(course);
  // const curriculumProgress = validateCurriculum(course);
  // const publishProgress = validatePublish(course);

  const totalCompleted = basicProgress.completedFields;
  //   advanceProgress.completedFields +
  //   curriculumProgress.completedFields +
  // publishProgress.completedFields;

  const totalFields = basicProgress.totalFields;
  //   advanceProgress.totalFields +
  //   curriculumProgress.totalFields +
  // publishProgress.totalFields;

  return {
    totalProgress: Math.round((totalCompleted / totalFields) * 100),
    stepProgress: {
      basicInformation: basicProgress,
      //   advanceInformation: advanceProgress,
      //   curriculum: curriculumProgress,
      //   publish: publishProgress,
    },
  };
};

export const generateSlug = async (title: string) => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};
