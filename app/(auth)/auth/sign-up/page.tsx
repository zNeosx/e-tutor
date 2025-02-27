'use client';
import AuthForm from '@/components/auth/AuthForm';
import { signUpSchema } from '@/lib/validations';
import { AuthCredentials } from '@/types';
import Image from 'next/image';

const SignUpPage = () => {
  const handleSignUp = async (data: AuthCredentials) => {
    return await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="flex size-full flex-1">
      <div className="relative max-lg:hidden lg:basis-2/5">
        <Image
          src="/images/sign-up-illustration.png"
          alt="Illustration d'un personnage avec un ordinateur sur une fusée"
          fill
          className="bg-cover"
        />
      </div>

      <div className="xs:px-6 grid w-full grid-cols-6 flex-col px-3 py-10 max-lg:flex max-lg:justify-center max-lg:px-10 lg:basis-3/5 lg:items-center">
        <div className="lg:col-start-2 lg:col-end-6 2xl:col-end-5">
          <AuthForm
            type="SIGN_UP"
            schema={signUpSchema}
            defaultValues={{
              firstName: '',
              lastName: '',
              userName: '',
              email: '',
              password: '',
              confirmPassword: '',
              terms: false,
            }}
            onSubmit={handleSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
