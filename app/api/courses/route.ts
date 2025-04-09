import { courseCreateSchema } from '@/src/domain/entities/course';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';
import { CourseRepository } from '@/src/infrastructure/repositories/course.repository';
import { auth } from '@/auth';

const courseRepository = new CourseRepository();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    body.userId = session.user.id;

    const validatedData = courseCreateSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validatedData.error },
        { status: 400 }
      );
    }

    const course = await courseRepository.create({
      course: validatedData.data,
      userId: session.user.id,
    });
    console.log('course from route', course);

    return NextResponse.json(course);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error', error.stack);
    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
