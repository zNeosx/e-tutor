import React from 'react';
import CreateNewCourseTab from '@/components/course/CreateNewCourseTab';

export default async function CourseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="container-md space-y-8 overflow-hidden bg-white">
      <CreateNewCourseTab slug={slug} />
    </section>
  );
}
