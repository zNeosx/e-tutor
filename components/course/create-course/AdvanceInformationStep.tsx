import { Course } from '@prisma/client';
import React from 'react';
import AdvanceInformationStepForm from './AdvanceInformationStepForm';
const AdvanceInformationStep = ({ course }: { course: Course }) => {
  return (
    <div>
      <div className="cc-header border-b border-gray-50">
        <h4>Advance information {course.title}</h4>
      </div>
      <div className="cc-content space-y-8">
        <AdvanceInformationStepForm course={course} />
      </div>
    </div>
  );
};

export default AdvanceInformationStep;
