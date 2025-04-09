import { CreateLanguage, Language } from '../entities/language';

export interface ILanguageRepository {
  findById(id: string): Promise<Language | null>;
  findByCode(code: string): Promise<Language | null>;
  getAll(): Promise<Language[]>;
  save(data: CreateLanguage): Promise<Language>;
  update(id: string, data: Partial<CreateLanguage>): Promise<Partial<Language>>;
  delete(id: string): Promise<void>;
}
