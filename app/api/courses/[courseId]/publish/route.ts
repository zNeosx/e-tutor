// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { validateForPublishing } from '@/lib/validations/course-validation';

// export async function PATCH(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const course = await prisma.course.findUnique({
//       where: { id: params.courseId },
//       include: { sections: true },
//     });

//     if (!course) {
//       return NextResponse.json({ error: 'Course not found' }, { status: 404 });
//     }

//     const validation = validateForPublishing(course);

//     if (!validation.isValid) {
//       return NextResponse.json(
//         { error: 'Missing required fields', details: validation.errors },
//         { status: 400 }
//       );
//     }

//     const publishedCourse = await prisma.course.update({
//       where: { id: params.courseId },
//       data: { status: 'PUBLISHED' },
//     });

//     return NextResponse.json(publishedCourse);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Error publishing course' },
//       { status: 500 }
//     );
//   }
// }
