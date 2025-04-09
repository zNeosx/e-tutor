import { NotFoundError } from '@/src/domain/entities/errors/common';
import { CourseRepository } from '@/src/infrastructure/repositories/course.repository';
import { NextResponse } from 'next/server';

const courseRepository = new CourseRepository();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
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
