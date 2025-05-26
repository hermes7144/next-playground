// service/db.service.ts
import { getConnectionPool, sql } from '../lib/mssql';
import { bindParams } from '../lib/sql.util';

export async function executeReadProcedure(
  procedureName: string,
  params: Record<string, string | number>
) {
  const pool = await getConnectionPool();
  const request = pool.request();

  bindParams(request, params);

  const result = await request.execute(procedureName);
  return result.recordsets;
}

export async function executeWriteProcedure(
  procedureName: string,
  params: Record<string, string | number> | Record<string, string | number>[]
) {
  const pool = await getConnectionPool();
  const transaction = new sql.Transaction(pool);

  // 트랜잭션 시작
  await transaction.begin();

  try {
    // ── 다중 처리 ──
    if (Array.isArray(params)) {
      const results: any[] = [];
      for (const p of params) {
        const request = transaction.request();
        bindParams(request, p);
        const result = await request.execute(procedureName);
        results.push(result.recordset);
      }
      await transaction.commit();
      return { success: true, data: results };
    }

    // ── 단일 처리 ──
    else {
      const request = transaction.request();
      bindParams(request, params);
      const result = await request.execute(procedureName);
      await transaction.commit();
      return { success: true, data: result.recordset };
    }
  } catch (error) {
    // 오류 발생 시 반드시 롤백 후 예외 던지기
    try {
      await transaction.rollback();
    } catch (rollbackError) {
      console.error('[executeWriteProcedure] 트랜잭션 롤백 중 오류:', rollbackError);
    }
    console.error('[executeWriteProcedure] 프로시저 실행 오류:', error);
    throw error;
  }
}
