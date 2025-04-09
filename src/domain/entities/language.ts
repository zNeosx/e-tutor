import { z } from 'zod';

export const languageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  code: z.string().min(1),
  flag: z.string().min(1),
});

export type Language = z.infer<typeof languageSchema>;

export const createLanguageSchema = languageSchema.omit({ id: true });
export type CreateLanguage = z.infer<typeof createLanguageSchema>;
