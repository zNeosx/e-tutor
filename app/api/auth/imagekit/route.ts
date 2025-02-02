import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';
import { env } from '@/env';

const imageKit = new ImageKit({
  publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
