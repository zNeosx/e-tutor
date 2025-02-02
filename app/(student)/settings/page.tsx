import StudentAccountSettings from '@/components/student/StudentAccountSettings';
import { getCurrentUser } from '@/lib/actions/user.action';
import { Separator } from '@/components/ui/separator';
import PasswordSettings from '@/components/student/PasswordSettings';

const StudentSettingsPage = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <StudentAccountSettings user={user} />
      <Separator />
      <PasswordSettings user={user} />
    </>
  );
};

export default StudentSettingsPage;
