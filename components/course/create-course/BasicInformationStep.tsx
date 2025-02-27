import BasicInformationStepForm from './BasicInformationStepForm';

const BasicInformationStep = () => {
  return (
    <div>
      <div className="cc-header border-b border-gray-50">
        <h4>Basic information</h4>
      </div>
      <div className="cc-content space-y-8">
        <BasicInformationStepForm />
      </div>
    </div>
  );
};

export default BasicInformationStep;
