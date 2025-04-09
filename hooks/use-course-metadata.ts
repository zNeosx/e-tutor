import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Category } from '@/src/domain/entities/category';
import { Language } from '@/src/domain/entities/language';

interface CourseMetadata {
  categories: Category[];
  languages: Language[];
  isLoading: boolean;
  error: Error | null;
}

export const useCourseMetadata = (): CourseMetadata => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch both categories and languages in parallel
        const [categoriesResponse, languagesResponse] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/languages'),
        ]);

        if (!categoriesResponse.ok || !languagesResponse.ok) {
          throw new Error('Failed to fetch course metadata');
        }

        const [categoriesData, languagesData] = await Promise.all([
          categoriesResponse.json(),
          languagesResponse.json(),
        ]);

        setCategories(categoriesData);
        setLanguages(languagesData);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        toast({
          title: 'Error',
          description: 'Failed to load form data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return { categories, languages, isLoading, error };
};
