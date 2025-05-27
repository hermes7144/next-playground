import { executeProcedure, executeTxnProcedure } from '@/service/db.service';
import Tokens from 'csrf';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './session';

const tokens = new Tokens();

export async function handleProcedureRequest(req: NextRequest, type: 'post' | 'put', procedureMap: Record<string, string>) {
  try {
    const session = await getSession();
    if (!session.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const secret = session.csrfSecret;
    if (!secret) {
      return new Response(JSON.stringify({ message: 'CSRF 비밀키가 없습니다.' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    const csrfToken = req.headers.get('x-csrf-token');
    if (!csrfToken) {
      return new Response(JSON.stringify({ message: 'CSRF 토큰이 없습니다.' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    const valid = tokens.verify(secret, csrfToken);
    if (!valid) {
      return new Response(JSON.stringify({ message: 'CSRF 토큰 검증 실패' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    // 4. 요청 본문 처리
    const { procedure, params } = await req.json();

    const spName = procedureMap[procedure];
    if (!spName) {
      return NextResponse.json({ success: false, message: `정의되지 않은 프로시저: ${procedure}` }, { status: 400 });
    }

    const handler = type === 'post' ? executeProcedure : executeTxnProcedure;

    const result = await handler(spName, params || {});

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(`[handleProcedureRequest] ${type.toUpperCase()} 오류:`, error);
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}
