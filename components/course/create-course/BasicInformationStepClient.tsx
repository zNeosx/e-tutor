'use client';

import { Category, Language } from '@prisma/client';
import BasicInformationStepForm from './BasicInformationStepForm';

interface BasicInformationStepClientProps {
  categories: Category[];
  languages: Language[];
}

const BasicInformationStepClient = ({
  categories,
  languages,
}: BasicInformationStepClientProps) => {
  return (
    <div>
      <div className="cc-header border-b border-gray-50">
        <h4>Basic information</h4>
      </div>
      <div className="cc-content space-y-8">
        <BasicInformationStepForm
          categories={categories}
          languages={languages}
        />
      </div>
    </div>
  );
};

export default BasicInformationStepClient;
