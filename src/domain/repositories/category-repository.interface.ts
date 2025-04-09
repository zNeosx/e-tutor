import { CreateCategory, Category } from '../entities/category';

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
  getAll(): Promise<Category[]>;
  save(data: CreateCategory): Promise<Category>;
  update(id: string, data: Partial<CreateCategory>): Promise<Partial<Category>>;
  delete(id: string): Promise<void>;
}
