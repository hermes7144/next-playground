import { handleProcedureRequest } from '@/lib/procedure.util';
import { NextRequest } from 'next/server';

const procedureMap: Record<string, string> = {
  조회: 'uwindb1.입학행정_입시공통_기준정보확정관리_확정상태',
  확정처리: 'uwindb1.입학행정_입시공통_기준정보확정관리_확정처리',
  컬럼헤더: "uwindb1.입학행정_입시관리학부_전형관리_입학전형사정대장_컬럼헤더",
  등록: "uwindb1.입학행정_입시관리학부_면접관리_면접구술고사결시대상자_등록",
  전형료JSON: "uwindb1.입학행정_입시관리학부_기준정보관리_전형료관리_등록_JSON",
  RAISE: "uwindb1.입학행정_입시공통_기준정보확정관리_확정처리_RAISERROR",
  SELECT: "uwindb1.입학행정_입시공통_기준정보확정관리_확정처리_SELECT_RETURN"
  
};

export async function POST(req: NextRequest) {
  return handleProcedureRequest(req, 'post', procedureMap);
}

export async function PUT(req: NextRequest) {
  return handleProcedureRequest(req, 'put', procedureMap);
}

