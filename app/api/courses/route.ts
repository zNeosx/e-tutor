import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Course, CourseLevel, DurationUnit } from '@prisma/client';
import { auth } from '@/auth';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

// Define the schema directly in the API route instead of importing it
const basicInformationSchema = z.object({
  title: z.string().min(1).max(80),
  subtitle: z.string().min(1).max(120),
  category: z.string().min(1),
  subCategory: z.string().min(1).optional(),
  topic: z.string().min(1),
  language: z.string().min(1),
  subLanguage: z.string().optional(),
  level: z.nativeEnum(CourseLevel),
  duration: z.number().min(1),
  durationUnit: z.nativeEnum(DurationUnit),
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    console.log('session', session);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Validate the request body against our schema
    const validatedData = basicInformationSchema.safeParse(body);

    console.log('validatedData', validatedData);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validatedData.error },
        { status: 400 }
      );
    }

    // Create the course with basic information
    const course = await prisma.course.create({
      data: {
        title: validatedData.data.title,
        subtitle: validatedData.data.subtitle,
        categoryId: validatedData.data.category,
        subCategoryId: validatedData.data.subCategory,
        topic: validatedData.data.topic,
        languageId: validatedData.data.language,
        subLanguageId: validatedData.data.subLanguage,
        level: validatedData.data.level,
        duration: validatedData.data.duration,
        durationUnit: validatedData.data.durationUnit,
        userId: session.user.id,
        basicInformationCompleted: true,
        thumbnail: null,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json(
        { error: error., details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
