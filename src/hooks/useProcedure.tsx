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
    params: Record<string, unknown> | Record<string, unknown>[],
    isTransaction: true | false = false
  ): Promise<T> {
    if (!csrfToken) {
      throw new Error('CSRF token is not loaded yet.');
    }

    const apiPath = `/api${pathname?.toUpperCase()}`;
    const res = await axios[isTransaction ? 'put' : 'post'](
      apiPath,
      { procedure, params },
      { headers: { 'X-CSRF-Token': csrfToken } }
    );

    return res.data;
  },
  [pathname, csrfToken]
);

  return { callProcedure };
}
