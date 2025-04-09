import { getCurrentUser } from '@/lib/db/queries/auth';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { checkUserRole } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import ResetPasswordForm from '@/components/common/ResetPasswordForm';
import InstructorAccountSettingsForm from '@/components/instructor/InstructorAccountSettingsForm';
// import InstructorSocialProfileForm from "@/components/instructor/InstructorSocialProfileForm";

// import { getCurrentUser } from '@/lib/actions/user.action';
const InstructorSettingsPage = async () => {
  const session = await auth();
  if (!session) redirect('/auth/sign-in');

  const result = checkUserRole(session.user.role, UserRole.INSTRUCTOR);

  if (result.redirectPath) redirect(result.redirectPath);

  const { user } = await getCurrentUser();

  return (
    <section className="container-md space-y-6">
      <InstructorAccountSettingsForm user={user} />

      {/* <InstructorSocialProfileForm user={user} /> */}

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
