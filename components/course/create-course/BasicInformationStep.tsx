import { Course } from '@prisma/client';
import BasicInformationStepForm from './BasicInformationStepForm';

const BasicInformationStep = ({ course }: { course: Course }) => {
  return (
    <div>
      <div className="cc-header border-b border-gray-50">
        <h4>Basic information</h4>
      </div>
      <div className="cc-content space-y-8">
        <BasicInformationStepForm course={course} />
      </div>
    </div>
  );
};

export default BasicInformationStep;
