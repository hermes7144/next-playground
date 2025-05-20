'use client';

// import { usePathname } from 'next/navigation';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface ProcedureResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export function useProcedure() {
  const pathname = usePathname();

  const callProcedure = useCallback(
    async function <T>(
      method: 'post' | 'put',
      procedure: string,
      params: Record<string, any>
    ): Promise<T> {
      const apiPath = `/api${pathname.toUpperCase()}`;
      
      const res = await axios[method]<ProcedureResponse<T>>(apiPath, {
        procedure,
        params,
      });

      if (!res.data.success) {
        throw new Error(res.data.message || 'Procedure failed');
      }

      return res.data.data;
    },
    [pathname]
  );

  return { callProcedure };
}
