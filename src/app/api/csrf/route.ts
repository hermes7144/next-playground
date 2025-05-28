import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import Tokens from 'csrf';

const tokens = new Tokens();

export async function GET() {
  const session = await getSession();

  if (!session.csrfSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const csrfToken = tokens.create(session.csrfSecret);

  return NextResponse.json({ csrfToken });
}
