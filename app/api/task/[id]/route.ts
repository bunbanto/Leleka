import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;
  const body = await request.json();

  try {
    const { data } = await api.patch(`/task/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}
