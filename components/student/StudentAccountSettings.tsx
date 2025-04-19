import { getCurrentUser } from '@/lib/db/queries/auth';
import AccountSettingsForm from './AccountSettingsForm';

const StudentAccountSettings = async () => {
  const { user } = await getCurrentUser();

  return (
    <section className="student-section">
      <h4 className="mb-6">Account settings</h4>
      <AccountSettingsForm user={user} />
    </section>
  );
};

export default StudentAccountSettings;
