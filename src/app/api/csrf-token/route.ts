import { NextResponse } from 'next/server';
import Tokens from 'csrf';

const tokens = new Tokens();

export async function GET() {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);

  const res = NextResponse.json({ csrfToken: token });
  res.cookies.set({
    name: 'csrf-secret',
    value: secret,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  });

  return res;
}
