import { getIronSession, IronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "session-id",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
};

export async function getSession(): Promise<IronSession<IronSessionData>> {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  return session;
}