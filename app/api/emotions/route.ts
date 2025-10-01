import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(request: NextRequest) {
  try {
    const resp = await api('/emotions');
    return NextResponse.json(resp.data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
