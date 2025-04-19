import { auth } from '@/auth';
import { checkAuthorization } from '@/lib/db/check';
import { courseUpdateSchema } from '@/src/domain/entities/course';
import { NotFoundError } from '@/src/domain/entities/errors/common';
import { CourseRepository } from '@/src/infrastructure/repositories/course.repository';
import { NextResponse } from 'next/server';

const courseRepository = new CourseRepository();

export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    const course = await courseRepository.findBySlug(params.slug);

    return NextResponse.json(course);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const course = await courseRepository.findBySlug(params.slug);

  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  const body = await req.json();

  const { success } = await checkAuthorization(course.userId);

  if (!success) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('body', body);

  const validatedBody = courseUpdateSchema.parse(body);

  console.log('validatedBody', validatedBody);

  const updatedCourse = await courseRepository.update({
    ...validatedBody,
    slug: course.slug,
  });

  return NextResponse.json(updatedCourse);
}
