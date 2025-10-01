import { NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();

    // Створюємо об'єкт FormData для передачі в axios
    const payload = new FormData();
    for (const [key, value] of formData.entries()) {
      payload.append(key, value);
    }

    const { data } = await api.patch('users', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        // axios сам поставить правильний Content-Type з boundary
      },
      withCredentials: true,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('PATCH /users/me error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
