'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type CsrfContextType = {
  csrfToken: string | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
};

const CsrfContext = createContext<CsrfContextType | undefined>(undefined);

export function CsrfProvider({ children }: { children: React.ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const fetchCsrfToken = async () => {
  setIsLoading(true);
  try {
    const res = await axios.get('/api/csrf');
    setCsrfToken(res.data.csrfToken);
  } catch (err) {
    console.error('CSRF 토큰 가져오기 실패', err);
    setCsrfToken(null);
  } finally {
    setIsLoading(false);
  }
};

const checkLogin = async () => {
  try {
    await axios.get('/api/session');
    setIsLoggedIn(true);
  } catch {
    setIsLoggedIn(false);
  }
};

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCsrfToken();
    }
  }, [isLoggedIn]);

  return <CsrfContext.Provider value={{ csrfToken, isLoading, refresh: fetchCsrfToken }}>{children}</CsrfContext.Provider>;
}

export function useCsrf(): CsrfContextType {
  const context = useContext(CsrfContext);
  if (!context) throw new Error('useCsrf must be used within CsrfProvider');
  return context;
}
