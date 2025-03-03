import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [categories, languages] = await Promise.all([
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      }),
      prisma.language.findMany({
        select: {
          id: true,
          name: true,
          code: true,
        },
      }),
    ]);

    return NextResponse.json({ categories, languages });
  } catch (error) {
    console.error('[COURSE_METADATA]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
