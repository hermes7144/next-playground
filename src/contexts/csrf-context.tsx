"use client";

import React, { createContext, useContext, useState } from "react";

type CsrfContextType = {
  csrfToken: string | null;
  setCsrfToken: (token: string) => void;
};

const CsrfContext = createContext<CsrfContextType | undefined>(undefined);

export function CsrfProvider({ children }: { children: React.ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

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
