export default function PublishCourseStep() {
  // const [errors, setErrors] = useState<Record<string, string>>({});
  // const { courseId } = useCreateCourseStepStore();

  // const handlePublish = async () => {
  //   try {
  //     const response = await fetch(`/api/courses/${courseId}/publish`, {
  //       method: 'PATCH',
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       setErrors(data.details || {});
  //       // Show error message to user
  //       return;
  //     }

  //     // Handle successful publish
  //     // Maybe redirect to course page or show success message
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  return (
    <div>
      {/* Show any validation errors */}
      {/* {Object.entries(errors).map(([field, message]) => (
        <div key={field} className="text-red-500">
          {message}
        </div>
      ))}

      <Button onClick={handlePublish}>Publish Course</Button> */}
    </div>
  );
}
