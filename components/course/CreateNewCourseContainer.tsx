import CreateNewCourseTab from './CreateNewCourseTab';

const CreateNewCourseContainer = ({ slug }: { slug: string }) => {
  return (
    <div className="overflow-hidden bg-white">
      <CreateNewCourseTab slug={slug} />
    </div>
  );
};

export default CreateNewCourseContainer;
