import { ICategoryRepository } from '@/src/domain/repositories/category-repository.interface';
import { DatabaseOperationError } from '@/src/domain/entities/errors/common';
import { CreateCategory, Category } from '@/src/domain/entities/category';
import { prisma } from '@/lib/prisma';
export class CategoryRepository implements ICategoryRepository {
  async getAll() {
    try {
      const categoriesList = await prisma.category.findMany();
      return categoriesList;
    } catch (error) {
      console.error('CATEGORY_GET_ALL', error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
      });
      return category;
    } catch (error) {
      console.error('CATEGORY_FIND_BY_ID', error);
      throw error;
    }
  }

  async save(data: CreateCategory) {
    try {
      const category = await prisma.category.create({
        data,
      });

      if (!category) {
        throw new DatabaseOperationError('Failed to save category');
      }

      return category;
    } catch (error) {
      console.error('CATEGORY_SAVE', error);
      throw error;
    }
  }

  async update(
    id: string,
    data: Partial<CreateCategory>
  ): Promise<Partial<Category>> {
    try {
      const category = await prisma.category.update({
        where: { id },
        data,
      });

      if (!category) {
        throw new DatabaseOperationError('Failed to update category');
      }

      return category;
    } catch (error) {
      console.error('CATEGORY_UPDATE', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const category = await prisma.category.delete({
        where: { id },
      });

      if (!category) {
        throw new DatabaseOperationError('Failed to delete category');
      }
    } catch (error) {
      console.error('CATEGORY_DELETE', error);
      throw error;
    }
  }
}
