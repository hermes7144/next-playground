import { handleProcedureRequest } from '@/lib/procedure.util';
import { NextRequest } from 'next/server';

const procedureMap: Record<string, string> = {
  학번조회: 'uwindb1.공통행정_학사공통_학생정보_조회',
};

export async function POST(req: NextRequest) {
  return handleProcedureRequest(req, 'post', procedureMap);
}

export async function PUT(req: NextRequest) {
  return handleProcedureRequest(req, 'put', procedureMap);
}

