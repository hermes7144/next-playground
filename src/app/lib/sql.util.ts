import { sql } from './mssql';

/**
 * request에 파라미터를 바인딩합니다.
 */
export function bindParams(
  request: any,
  params: Record<string, string | number>
) {
  for (const [key, value] of Object.entries(params)) {
    const type = typeof value === 'number' ? sql.Int : sql.VarChar;
    request.input(key, type, value);
  }
}
