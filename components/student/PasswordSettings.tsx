import { getCurrentUser } from '@/lib/db/queries/select';
import ResetPasswordForm from '../common/ResetPasswordForm';

const PasswordSettings = async () => {
  const user = await getCurrentUser();

  return (
    <section className="student-section">
      <ResetPasswordForm user={user} containerClassName="max-w-xl" />
    </section>
  );
};

export default PasswordSettings;
