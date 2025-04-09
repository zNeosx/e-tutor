import { Course, CourseCreate, CourseUpdate } from '../entities/course';

export interface ICourseRepository {
  create({
    course,
    userId,
  }: {
    course: CourseCreate;
    userId: string;
  }): Promise<Course>;
  update(course: CourseUpdate): Promise<Course>;
  // delete(course: Course): Promise<void>;
  findById(id: string): Promise<Course | null>;
  findBySlug(slug: string): Promise<Course | null>;
  // findAll(): Promise<Course[]>;
  // findByCategory(categoryId: string): Promise<Course[]>;
}
