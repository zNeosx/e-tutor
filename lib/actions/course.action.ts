'use server';

import { auth } from '@/auth';
import { prisma } from '../prisma';

export async function getCourses() {
  const session = await auth();

  if (!session)
    return {
      success: false,
      error: 'Unauthorized',
    };

  return await prisma.course.findMany();
}

export async function getDashboardCoursesStats() {
  const session = await auth();

  if (!session)
    return {
      success: false,
      error: 'Unauthorized',
    };

  try {
    const allCourses = await prisma.course.count();

    const activeCourses = 0;

    const completedCourses = 0;

    const courseInstructor = await prisma.instructor.count();

    return {
      success: true,
      data: {
        allCourses,
        activeCourses,
        completedCourses,
        courseInstructor,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
