'use client';

import React, { createContext, useContext, useState, useEffect } from "react";

type CsrfContextType = {
  csrfToken: string | null;
  setCsrfToken: (token: string | null) => void;
};

const CsrfContext = createContext<CsrfContextType | undefined>(undefined);

export function CsrfProvider({ children }: { children: React.ReactNode }) {
  const [csrfToken, setCsrfTokenState] = useState<string | null>(null);

  // API에서 토큰 받아오기 함수
  const fetchCsrfToken = async () => {
    try {
      const res = await fetch('/api/csrf'); // CSRF 토큰 발급 API 주소
      if (!res.ok) throw new Error('Failed to fetch CSRF token');
      const data = await res.json();
      setCsrfTokenState(data.csrfToken);
    } catch (error) {
      console.error('CSRF 토큰 로드 실패:', error);
      setCsrfTokenState(null);
    }
  };

  // 새로고침 시 한 번 실행
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  // 외부에서 토큰 변경 필요하면 호출 가능
  const setCsrfToken = (token: string | null) => {
    setCsrfTokenState(token);
  };

  return (
    <CsrfContext.Provider value={{ csrfToken, setCsrfToken }}>
      {children}
    </CsrfContext.Provider>
  );
}

export function useCsrf(): CsrfContextType {
  const context = useContext(CsrfContext);
  if (!context) {
    throw new Error("useCsrf must be used within CsrfProvider");
  }
  return context;
}
