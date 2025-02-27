import ResetPasswordForm from '@/components/common/ResetPasswordForm';
import InstructorAccountSettingsForm from '@/components/instructor/InstructorAccountSettingsForm';
import InstructorSocialProfileForm from '@/components/instructor/InstructorSocialProfileForm';
import { getCurrentUser } from '@/lib/actions/user.action';
const InstructorSettingsPage = async () => {
  const user = await getCurrentUser();
  return (
    <section className="container-md space-y-6">
      <InstructorAccountSettingsForm user={user} />

      <InstructorSocialProfileForm user={user} />

      <div className="flex gap-6">
        <ResetPasswordForm
          user={user}
          containerClassName="form-container basis-1/2"
          submitBtnClassName="m-0"
        />
      </div>
    </section>
  );
};

export default InstructorSettingsPage;
