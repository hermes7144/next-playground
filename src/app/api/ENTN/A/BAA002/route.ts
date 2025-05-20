import { handleProcedureRequest } from '@/app/lib/procedure.util';
import { NextRequest } from 'next/server';

const procedureMap: Record<string, string> = {
  조회: 'uwindb1.입학행정_입시공통_기준정보확정관리_확정상태',
  확정처리: 'uwindb1.입학행정_입시공통_기준정보확정관리_확정처리',
};

export async function POST(req: NextRequest) {
  return handleProcedureRequest(req, 'read', procedureMap);
}

export async function PUT(req: NextRequest) {
  return handleProcedureRequest(req, 'write', procedureMap);
}
