import { Course } from '@prisma/client';
import React from 'react';

const AdvanceInformationStep = ({ course }: { course: Course }) => {
  return (
    <div>
      <div className="cc-header border-b border-gray-50">
        <h4>Advance information {course.title}</h4>
      </div>
    </div>
  );
};

export default AdvanceInformationStep;
