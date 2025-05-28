// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicPaths = ['/auth/signin', '/api/auth', '/favicon.ico', '/robots.txt'];

  const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(path));

  if (isPublic) {
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get('session-id');

  // 세션 정보가 없으면 로그인 페이지로 강제 리다이렉트
  if (!sessionCookie) {
    // 현재 URL을 저장했다가 로그인 후 돌아오도록 `redirect` 쿼리를 설정
    const loginUrl = new URL('/auth/signin', req.url);

    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 세션이 있으면 그대로 요청 통과
  return NextResponse.next();
}

// matcher를 통해 미들웨어가 적용될 경로 패턴을 제한할 수도 있습니다.
// 예를 들어 "/login", "/auth" 등은 제외하고, 그 외 모든 경로에 미들웨어를 적용:
export const config = {
  matcher: ['/((?!login|auth|api|_next|favicon.ico).*)'],
};
