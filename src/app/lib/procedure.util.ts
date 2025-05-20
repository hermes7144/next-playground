import { executeReadProcedure, executeWriteProcedure } from '@/app/service/db.service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @param req - Next.js API 요청 객체
 * @param type - 'read' | 'write'
 * @param procedureMap - { 조회: 'SP_NAME', ... } 형식의 매핑 객체
 */
export async function handleProcedureRequest(
  req: NextRequest,
  type: 'read' | 'write',
  procedureMap: Record<string, string>
) {
  try {
    const { procedure, params } = await req.json();

    const spName = procedureMap[procedure];
    if (!spName) {
      return NextResponse.json(
        { success: false, message: `정의되지 않은 프로시저: ${procedure}` },
        { status: 400 }
      );
    }

    const handler = type === 'read' ? executeReadProcedure : executeWriteProcedure;
    const data = await handler(spName, params || {});

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(`[handleProcedureRequest] ${type.toUpperCase()} 오류:`, error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
