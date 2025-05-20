export const createProcedureFetcher = (callProcedureFn: any) => {
  return async ([method, procName, params]: [string, string, object]) => {
    const result = await callProcedureFn(method, procName, params);
    return result?.[0]; // 단건 결과 반환
  };
};
