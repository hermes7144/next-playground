'use client';

import { useCsrf } from '@/contexts/CsrfContext';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useProcedure() {
  const { csrfToken } = useCsrf();
  const pathname = usePathname();

  const callProcedure = useCallback(
    async function <T>(
      procedure: string,
      params: Record<string, any>,
      isTransaction: true | false = false 
    ): Promise<T | null> {
      if (!csrfToken) {
        console.warn('CSRF token is not loaded yet.');
        return null;
      }

      try {
        const apiPath = `/api${pathname?.toUpperCase()}`;
        const res = await axios[isTransaction ? 'put' : 'post'](apiPath, {
          procedure,
          params,
        }, {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        });

        if (!res.data.success) {
          throw new Error(res.data.message || 'Procedure failed');
        }

        return res.data;
      } catch (e: any) {
        console.error(e.response?.data?.message || e.message);
        return e.response?.data || null;
      }
    },
    [pathname, csrfToken]
  );

  return {
    callProcedure,
  };
}
