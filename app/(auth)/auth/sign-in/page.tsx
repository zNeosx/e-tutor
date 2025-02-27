'use client';
import AuthForm from '@/components/auth/AuthForm';
import { signInSchema } from '@/lib/validations';
import { AuthCredentials } from '@/types';
import Image from 'next/image';
import React from 'react';

const SignInPage = () => {
  const handleSignIn = async (
    data: Pick<AuthCredentials, 'email' | 'password'>
  ) => {
    return await fetch('/api/auth/signin', {
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
          src="/images/sign-in-illustration.png"
          alt="Illustration d'un personnage avec un ordinateur sur une fusée"
          fill
          className="bg-cover"
        />
      </div>
      <div className="xs:px-6 grid w-full grid-cols-6 flex-col px-3 py-10 max-lg:flex max-lg:justify-center max-lg:px-10 lg:basis-3/5 lg:items-center">
        <div className="lg:col-start-2 lg:col-end-6 2xl:col-end-5">
          <AuthForm
            type="SIGN_IN"
            schema={signInSchema}
            defaultValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
