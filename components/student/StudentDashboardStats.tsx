import { getDashboardCoursesStats } from '@/lib/actions/course.action';
import React from 'react';

const StudentDashboardStats = async () => {
  const stats = await getDashboardCoursesStats();

  console.log('stats', stats);
  return (
    <div>
      <h4>Tableau de bord</h4>
    </div>
  );
};

export default StudentDashboardStats;
