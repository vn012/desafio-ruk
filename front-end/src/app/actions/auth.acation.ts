'use server';
import { cookies } from 'next/headers';
import { signInService } from '@/services/auth.service';

export async function signInAction(email: string, password: string) {
  const { accessToken } = await signInService(email, password);

  const cookieStore = cookies();
  (await cookieStore).set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}
