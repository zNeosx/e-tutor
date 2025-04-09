import { ILanguageRepository } from '@/src/domain/repositories/language-repository.interface';
import { DatabaseOperationError } from '@/src/domain/entities/errors/common';
import { CreateLanguage, Language } from '@/src/domain/entities/language';
import { prisma } from '@/lib/prisma';

export class LanguageRepository implements ILanguageRepository {
  async save(data: CreateLanguage) {
    try {
      const language = await prisma.language.create({
        data,
      });

      if (!language) {
        throw new DatabaseOperationError('Failed to save language');
      }

      return language;
    } catch (error) {
      console.error('LANGUAGE_SAVE', error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const language = await prisma.language.findUnique({
        where: { id },
      });
      return language;
    } catch (error) {
      console.error('LANGUAGE_FIND_BY_ID', error);
      throw error;
    }
  }

  async findByCode(code: string) {
    try {
      const language = await prisma.language.findUnique({
        where: { code },
      });
      return language;
    } catch (error) {
      console.error('LANGUAGE_FIND_BY_CODE', error);
      throw error;
    }
  }

  async update(
    id: string,
    data: Partial<CreateLanguage>
  ): Promise<Partial<Language>> {
    try {
      const language = await prisma.language.update({
        where: { id },
        data,
      });

      if (!language) {
        throw new DatabaseOperationError('Failed to update language');
      }

      return language;
    } catch (error) {
      console.error('LANGUAGE_UPDATE', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const language = await prisma.language.delete({
        where: { id },
      });

      if (!language) {
        throw new DatabaseOperationError('Failed to delete language');
      }
    } catch (error) {
      console.error('LANGUAGE_DELETE', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const languagesList = await prisma.language.findMany();
      return languagesList;
    } catch (error) {
      console.error('LANGUAGE_GET_ALL', error);
      throw error;
    }
  }
}
