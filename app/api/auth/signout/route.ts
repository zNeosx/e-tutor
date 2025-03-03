import { signOut } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await signOut({ redirect: false });

    return NextResponse.json(
      { success: true, message: 'Successfully logged out' },
      { status: 200 }
    );
  } catch (error) {
    console.error('SIGNOUT_ERROR:', error);
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
