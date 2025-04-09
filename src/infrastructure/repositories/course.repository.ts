import { Course, CourseCreate } from '@/src/domain/entities/course';
import { ICourseRepository } from '../../domain/repositories/course-repository.interface';
import { prisma } from '@/lib/prisma';
import {
  DatabaseOperationError,
  NotFoundError,
} from '@/src/domain/entities/errors/common';
import { generateSlug } from '@/lib/utils';

export class CourseRepository implements ICourseRepository {
  async create({
    course,
    userId,
  }: {
    course: CourseCreate;
    userId: string;
  }): Promise<Course> {
    try {
      if (!course) {
        throw new DatabaseOperationError('Course data is required');
      }

      const slug = await generateSlug(course.title);
      const createdCourse = await prisma.course.create({
        data: {
          ...course,
          userId,
          status: 'DRAFT',
          slug,
        },
      });

      if (!createdCourse) {
        throw new DatabaseOperationError('Failed to save course');
      }

      return createdCourse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('CourseRepository.create', error.stack);
      throw error;
    }
  }

  // async update(course: CourseUpdate): Promise<Course> {
  //   try {
  //     const updatedCourse = await prisma.course.update({
  //       where: { id: course.id },
  //       data: course,
  //     });
  //     return updatedCourse;
  //   } catch (error) {
  //     console.error('CourseRepository.update', error);
  //     throw error;
  //   }
  // }

  // async delete(course: Course): Promise<void> {
  //   try {
  //     await prisma.course.delete({
  //       where: { id: course.id },
  //     });
  //   } catch (error) {
  //     console.error('CourseRepository.delete', error);
  //     throw error;
  //   }
  // }

  async findById(id: string): Promise<Course | null> {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
      });

      if (!course) {
        throw new NotFoundError('Course not found');
      }

      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('CourseRepository.findById', error.stack);
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<Course | null> {
    try {
      const course = await prisma.course.findUnique({
        where: { slug },
      });

      if (!course) {
        throw new NotFoundError('Course not found');
      }

      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('CourseRepository.findBySlug', error.stack);
      throw error;
    }
  }
  // async findAll(): Promise<Course[]> {
  //   try {
  //     const courses = await prisma.course.findMany();
  //     return courses;
  //   } catch (error) {
  //     console.error('CourseRepository.findAll', error);
  //     throw error;
  //   }
  // }

  // async findByCategory(categoryId: string): Promise<Course[]> {
  //   try {
  //     const courses = await prisma.course.findMany({
  //       where: { categoryId },
  //     });
  //     return courses;
  //   } catch (error) {
  //     console.error('CourseRepository.findByCategory', error);
  //     throw error;
  //   }
  // }
}
