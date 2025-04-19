import { useCourseProgressStore } from '@/lib/store/course-progress.store';

export const CourseProgress = () => {
  const { basicInformation, totalProgress } = useCourseProgressStore();

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-medium">
        Basic Information: {basicInformation.completedFields}/
        {basicInformation.totalFields}
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${totalProgress}%` }}
        />
      </div>
      <div className="text-sm font-medium">{totalProgress}%</div>
    </div>
  );
};
