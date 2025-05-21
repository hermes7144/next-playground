import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { username, password } = body;

  // 사용자 인증 로직
  if (username === "admin" && password === "1234") {
    const session = await getSession(req);
    console.log('session', session);

    
    session.user = { id: 1, username };
    await session.save();

    

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 401 });
};
