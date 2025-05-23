'use client';

import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useProcedure() {
  const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
    axios.get('/api/csrf-token').then(res => {
      setCsrfToken(res.data.csrfToken);
    });
  }, []);


  const pathname = usePathname();

  const callProcedure = useCallback(
    async function <T>(
      procedure: string,
      params: Record<string, any>,
      isTransaction: true | false = false 
    ): Promise<T> {
      try {
      const apiPath = `/api${pathname?.toUpperCase()}`;
      
      const res = await axios[isTransaction ? 'put': 'post'](apiPath, {
        procedure,
        params,
      },{
        headers: {
        'X-CSRF-Token': csrfToken,
      },
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
    [pathname, csrfToken]
  );

  return { callProcedure };
}
