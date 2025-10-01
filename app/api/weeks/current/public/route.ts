import { NextResponse } from 'next/server';

import { AxiosError } from 'axios';
import { api } from '@/app/api/api';

export async function GET() {
  try {
    const { data } = await api.get('weeks/current/public');
    if (data) return NextResponse.json(data);
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    return NextResponse.json(
      { error: error.response?.data.error || 'Not found' },
      { status: error.response?.status || 500 }
    );
  }
}
