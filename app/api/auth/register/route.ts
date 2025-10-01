import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';

import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('/auth/register', body);

    const { accessToken, refreshToken, sessionId } = apiRes.data.data;

    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    // Ставимо куки напряму
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 900,
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 3600,
    });

    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 3600,
    });

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const status = axiosError.response?.status ?? 500;
    const message = axiosError.response?.data?.message ?? 'Помилка реєстрації';

    return NextResponse.json({ error: message }, { status });
  }
}
