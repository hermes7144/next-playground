import { executeReadProcedure, executeWriteProcedure } from '@/service/db.service';
import Tokens from 'csrf';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './session';

const tokens = new Tokens();

export async function handleProcedureRequest(
  req: NextRequest,
  type: 'read' | 'write',
  procedureMap: Record<string, string>
) {
  try {


  const session = await getSession();
  if (!session.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  


    // 1. 쿠키에서 CSRF 시크릿 추출
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((c) => {
        const [key, ...v] = c.split('=');
        return [key, decodeURIComponent(v.join('='))];
      })
    );
    const secret = cookies['csrf-secret'];
    if (!secret) {
      return NextResponse.json({ success: false, message: 'CSRF secret cookie 없음' }, { status: 403 });
    }

    // 2. 헤더에서 CSRF 토큰 추출
    const token = req.headers.get('x-csrf-token');
    if (!token) {
      return NextResponse.json({ success: false, message: 'CSRF 토큰 헤더 없음' }, { status: 403 });
    }

    // 3. 토큰 검증
    if (!tokens.verify(secret, token)) {
      return NextResponse.json({ success: false, message: '잘못된 CSRF 토큰' }, { status: 403 });
    }

    // 4. 요청 본문 처리
    const { procedure, params } = await req.json();

    const spName = procedureMap[procedure];
    if (!spName) {
      return NextResponse.json(
        { success: false, message: `정의되지 않은 프로시저: ${procedure}` },
        { status: 400 }
      );
    }

    const handler = type === 'read' ? executeReadProcedure : executeWriteProcedure;

    const result = await handler(spName, params || {});

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(`[handleProcedureRequest] ${type.toUpperCase()} 오류:`, error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
