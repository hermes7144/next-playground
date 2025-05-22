'use client';

// import { usePathname } from 'next/navigation';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';



export function useProcedure() {
  const pathname = usePathname();

  const callProcedure = useCallback(
    async function <T>(
      method: 'post' | 'put',
      procedure: string,
      params: Record<string, any>
    ): Promise<T> {
      try {
      const apiPath = `/api${pathname?.toUpperCase()}`;
      
      const res = await axios[method](apiPath, {
        procedure,
        params,
      });

      if (!res.data.success) {
        throw new Error(res.data.message || 'Procedure failed');
      }

      return res.data; 
      } catch (e) {
        console.log(e.response.data.message)
        return e.response.data;
      }

    },
    [pathname]
  );

  return { callProcedure };
}
