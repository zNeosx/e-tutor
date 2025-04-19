import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
});

// export type Category = z.infer<typeof categorySchema>;

export const createCategorySchema = categorySchema.omit({ id: true });
export type CreateCategory = z.infer<typeof createCategorySchema>;
