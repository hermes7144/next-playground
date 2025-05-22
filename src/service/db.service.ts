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
  return result.recordset;
}

export async function executeWriteProcedure(
  procedureName: string,
  params: Record<string, string | number> | Record<string, string | number>[]
) {
  const pool = await getConnectionPool();

  // 다중 처리
  if (Array.isArray(params)) {
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    const results: any[] = [];

    try {
      for (const p of params) {
        const request = transaction.request();
        bindParams(request, p);
        const result = await request.execute(procedureName);
        results.push(result.recordset);
      }

      await transaction.commit();
      return {
        success: true,
        data: results
      };
    } catch (error) {
      await transaction.rollback();
      console.error('[executeWriteProcedure] 트랜잭션 롤백:', error);
      return {
        success: false,
        message: error.message || 'Unknown error'
      };
    }
  }

  // 단일 처리
  else {
    const request = pool.request();
    bindParams(request, params);
    try {
      const result = await request.execute(procedureName);
      return {
        success: true,
        data: result.recordset
      };
    } catch (error) {
      console.error('[executeWriteProcedure] 단일 처리 오류:', error);
      return {
        success: false,
        message: error.message || 'Unknown error'
      };
    }
  }
}
