'use server';

import { prisma } from '../prisma';

export const createInstructor = async (params: {
  data: {
    userId: string;
  };
}) => {
  const { data } = params;

  try {
    const instructor = await prisma.instructor.create({
      data,
    });

    return {
      success: true,
      data: instructor,
    };
  } catch (error) {
    console.log('CREATE_INSTRUCTOR_ERROR', error);
    return {
      success: false,
      error: error as string,
    };
  }
};
