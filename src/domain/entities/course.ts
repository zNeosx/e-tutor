import { CourseLevel, DurationUnit, CourseStatus } from '@prisma/client';
import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().uuid(),
  status: z.nativeEnum(CourseStatus),
  title: z.string().min(1),
  subtitle: z.string().min(1).nullable().optional(),
  categoryId: z.string().nullable().optional(),
  subCategoryId: z.string().nullable().optional(),
  topic: z.string().min(1).nullable().optional(),
  languageId: z.string().nullable().optional(),
  subLanguageId: z.string().nullable().optional(),
  level: z.nativeEnum(CourseLevel).nullable().optional(),
  duration: z.number().nullable().optional(),
  durationUnit: z.nativeEnum(DurationUnit).nullable().optional(),
  basicInformationCompleted: z.boolean().nullable().optional(),
  userId: z.string(),
  slug: z.string(),
});

export type Course = z.infer<typeof courseSchema>;

export const courseCreateSchema = courseSchema.pick({
  title: true,
});

export type CourseCreate = z.infer<typeof courseCreateSchema>;

export const courseUpdateSchema = courseSchema
  .pick({
    title: true,
    subtitle: true,
    categoryId: true,
    subCategoryId: true,
    topic: true,
    languageId: true,
    subLanguageId: true,
    level: true,
    duration: true,
    durationUnit: true,
    basicInformationCompleted: true,
  })
  .partial();
export type CourseUpdate = z.infer<typeof courseUpdateSchema>;
