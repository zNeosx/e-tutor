import { User } from '@prisma/client';
import ResetPasswordForm from '../common/ResetPasswordForm';

const PasswordSettings = ({ user }: { user: User }) => {
  return (
    <section className="student-section">
      <ResetPasswordForm user={user} containerClassName="max-w-xl" />
    </section>
  );
};

export default PasswordSettings;
