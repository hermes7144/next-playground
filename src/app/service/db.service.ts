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
  params: Record<string, string | number>
) {
  const pool = await getConnectionPool();
  const transaction = new sql.Transaction(pool);

  await transaction.begin();
  const request = transaction.request();

  bindParams(request, params);

  try {
    const result = await request.execute(procedureName);
    await transaction.commit();

    return {
      rowsAffected: result.rowsAffected,
      output: result.output,
    };
  } catch (error) {
    await transaction.rollback();
    console.error('[executeWriteProcedure] 트랜잭션 롤백:', error);
    throw error;
  }
}
