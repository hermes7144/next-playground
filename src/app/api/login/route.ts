import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import Tokens from "csrf";

const tokens = new Tokens();

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { username, password } = body;

  if (username === "admin" && password === "1234") {
    // 세션 불러오기
    const session = await getSession();

    // TOOD: 디비에서 유니크값으로 id
    session.user = { id: 1, username };

    // 최초 로그인 시에만 설정
    if (!session.sessionCreatedAt) {
      session.sessionCreatedAt = Date.now();
    }
    
    session.lastActivityAt = Date.now();

    // CSRF 시크릿 생성 및 세션 저장
    const secret = tokens.secretSync();
    session.csrfSecret = secret;

    await session.save();

    // CSRF 토큰 생성
    const csrfToken = tokens.create(secret);

    return NextResponse.json({ ok: true, csrfToken });
  }

  return NextResponse.json({ ok: false }, { status: 401 });
};
