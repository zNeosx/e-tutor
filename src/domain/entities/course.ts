import { CourseLevel, DurationUnit, CourseStatus } from '@prisma/client';
import { z } from 'zod';
import { categorySchema } from './category';
import { languageSchema } from './language';

export const courseSchema = z.object({
  id: z.string().uuid(),
  status: z.nativeEnum(CourseStatus),
  title: z.string().min(1),
  subtitle: z.string().nullable(),
  category: categorySchema.nullable(),
  subCategory: categorySchema.nullable(),
  topic: z.string().nullable(),
  language: languageSchema.nullable(),
  subLanguage: languageSchema.nullable(),
  level: z.nativeEnum(CourseLevel).nullable(),
  duration: z.number().nullable(),
  durationUnit: z.nativeEnum(DurationUnit).nullable(),
  basicInformationCompleted: z.boolean().nullable(),
  userId: z.string(),
  slug: z.string(),
  thumbnail: z.string().nullable(),
  trailer: z.string().nullable(),
  description: z.string().nullable(),
  whatYouWillLearn: z.array(z.string()).nullable(),
  targetAudience: z.array(z.string()).nullable(),
  requirements: z.array(z.string()).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Course = z.infer<typeof courseSchema>;

export const courseCreateSchema = z.object({
  title: z.string(),
});

export type CourseCreate = z.infer<typeof courseCreateSchema>;

export const basicInformationSchema = z.object({
  title: z.string(),
  subtitle: z.string().nullable(),
  categoryId: z.string(),
  subCategoryId: z.string().nullable(),
  topic: z.string().nullable(),
  languageId: z.string(),
  subLanguageId: z.string().nullable(),
  level: z.nativeEnum(CourseLevel).nullable(),
  duration: z.number().nullable(),
  durationUnit: z.nativeEnum(DurationUnit).nullable(),
});

export const basicInformationRequiredSchema = basicInformationSchema.pick({
  title: true,
  subtitle: true,
  categoryId: true,
  topic: true,
  languageId: true,
  level: true,
  duration: true,
  durationUnit: true,
});

export type BasicInformation = z.infer<typeof basicInformationSchema>;
export type BasicInformationRequired = z.infer<
  typeof basicInformationRequiredSchema
>;

export const advanceInformationSchema = z.object({
  thumbnail: z.string().nullable(),
  trailer: z.string().nullable(),
  description: z.string().nullable(),
  whatYouWillLearn: z.array(z.string()).nullable(),
  targetAudience: z.array(z.string()).nullable(),
  requirements: z.array(z.string()).nullable(),
});
export const courseUpdateSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  topic: z.string().optional(),
  languageId: z.string().optional(),
  subLanguageId: z.string().optional(),
  level: z.nativeEnum(CourseLevel).optional(),
  duration: z.number().optional(),
  durationUnit: z.nativeEnum(DurationUnit).optional(),
  slug: z.string().optional(),
  thumbnail: z.string().optional(),
  trailer: z.string().optional(),
  description: z.string().optional(),
  whatYouWillLearn: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
});

export type CourseUpdate = z.infer<typeof courseUpdateSchema>;
