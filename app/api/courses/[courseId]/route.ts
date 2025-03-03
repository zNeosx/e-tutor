import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { basicInformationSchema } from '@/components/course/create-course/BasicInformationStepForm';
import { z } from 'zod';
import { auth } from '@/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = basicInformationSchema.parse(body);

    const course = await prisma.course.update({
      where: { id: params.courseId },
      data: {
        title: validatedData.title,
        subtitle: validatedData.subtitle,
        categoryId: validatedData.category,
        subCategoryId: validatedData.subCategory,
        topic: validatedData.topic,
        languageId: validatedData.language,
        subLanguageId: validatedData.subLanguage,
        level: validatedData.level,
        duration: validatedData.duration,
        durationUnit: validatedData.durationUnit,
        basicInformationCompleted: true,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
