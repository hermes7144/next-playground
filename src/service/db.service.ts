// service/db.service.ts
import { getConnectionPool, sql } from '../lib/mssql';
import { bindParams } from '../lib/sql.util';

export async function executeProcedure(
  procedureName: string,
  params: Record<string, string | number>
) {
  const pool = await getConnectionPool();
  const request = pool.request();

  bindParams(request, params);

  const result = await request.execute(procedureName);
  return result.recordsets;
}

export async function executeTxnProcedure(
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
      for (const p of params) {
        const request = transaction.request();
        bindParams(request, p);
        await request.execute(procedureName);
      }
      
      await transaction.commit();
      return [];
    }

    // ── 단일 처리 ──
    else {
      const request = transaction.request();
      bindParams(request, params);

      const execResult = await request.execute(procedureName);
      const result = execResult.recordset?.[0];

      if (result?.retCode === 'NG') {
        throw new Error(result.retValue || 'Unknown error');
      }

      await transaction.commit();

      if (result?.retCode === 'OK') {
        return result.retValue ?? null;
      }

      return result; 
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
