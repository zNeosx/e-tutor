import { User } from '@prisma/client';
import React from 'react';
import AccountSettingsForm from './AccountSettingsForm';

const StudentAccountSettings = ({ user }: { user: User }) => {
  return (
    <section className="student-section">
      <h4 className="mb-6">Account settings</h4>
      <AccountSettingsForm user={user} />
    </section>
  );
};

export default StudentAccountSettings;
