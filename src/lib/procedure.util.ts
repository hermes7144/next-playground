import { executeProcedure, executeTxnProcedure } from '@/service/db.service';
import Tokens from 'csrf';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './session';

const tokens = new Tokens();

export async function handleProcedureRequest(req: NextRequest, type: 'post' | 'put', procedureMap: Record<string, string>) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
    }

    const secret = session.csrfSecret;
    const csrfToken = req.headers.get('x-csrf-token');

    if (!secret || !csrfToken || !tokens.verify(secret, csrfToken)) {
      return NextResponse.json({ message: 'CSRF 검증 실패' }, { status: 403 });
    }

    const { procedure, params } = await req.json();

    if (!procedure) {
      return NextResponse.json({ message: '프로시저 이름이 없습니다.' }, { status: 400 });
    }

    const spName = procedureMap[procedure];
    if (!spName) {
      return NextResponse.json({ message: `정의되지 않은 프로시저: ${procedure}` }, { status: 400 });
    }

    const handler = type === 'post' ? executeProcedure : executeTxnProcedure;

    const result = await handler(spName, params || {});

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(`[handleProcedureRequest] ${type.toUpperCase()} 오류:`, error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
