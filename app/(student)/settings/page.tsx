import PasswordSettings from '@/components/student/PasswordSettings';
import StudentAccountSettings from '@/components/student/StudentAccountSettings';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

const StudentSettingsPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <StudentAccountSettings />
      </Suspense>
      <Separator />
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordSettings />
      </Suspense>
    </>
  );
};

export default StudentSettingsPage;
