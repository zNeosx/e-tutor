import { useParams } from 'next/navigation';
import BasicInformationStepForm from './BasicInformationStepForm';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/common/Loader';
const BasicInformationStep = () => {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ['course', id],
    queryFn: () => fetch(`/api/courses/${id}`).then((res) => res.json()),
    enabled: !!id,
  });

  if (query.isLoading) {
    return <Loader />;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  const course = query.data;

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
