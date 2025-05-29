import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session?.user) {
    // 세션이 없으면 401 Unauthorized
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const now = Date.now();
  const maxAgeMs = 30 * 60 * 1000; // 30분

  const lastActivity = session.lastActivityAt ?? session.sessionCreatedAt ?? now;
  const expiresAt = lastActivity + maxAgeMs;

  if (now > expiresAt) {
    // 세션 만료: 세션 파기
    await session.destroy();

    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  }

  // 세션 유효 → 남은 시간 계산
  const timeLeftMs = expiresAt - now;

  return NextResponse.json({
    user: session.user,
    expiresAt,
    timeLeftMs,
  });
}
