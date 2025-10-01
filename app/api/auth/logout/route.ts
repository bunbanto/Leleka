import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  try {
    await api.post('/auth/logout', null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });
  } catch (error) {
    console.warn('Backend logout failed:', error);
    // навіть якщо бекенд не відповів — все одно чистимо куки
  }

  const response = NextResponse.json({ message: 'Logged out successfully' });

  const cookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 0,
  };

  response.cookies.set('accessToken', '', cookieOptions);
  response.cookies.set('refreshToken', '', cookieOptions);
  response.cookies.set('sessionId', '', cookieOptions);

  return response;
}
