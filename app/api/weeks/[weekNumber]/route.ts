import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';
import { api } from '../../api';

interface WeekNumberProps {
  params: Promise<{ weekNumber: string }>;
}

export async function GET(request: NextRequest, { params }: WeekNumberProps) {
  try {
    const cookieStore = await cookies();
    const { weekNumber } = await params;
    const accessToken = cookieStore.get('accessToken')?.value;
    const { data } = await api.get(`weeks/${weekNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    return NextResponse.json(
      { error: error.response?.data.error || 'Failed to fetch current week' },
      { status: error.response?.status || 500 }
    );
  }
}
