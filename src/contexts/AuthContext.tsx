'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCsrf } from './CsrfContext';

type User = {
  id: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  timeLeftMs: number | null;   // 세션 만료까지 남은 시간 (ms)
  refresh: () => Promise<void>;
  login: (username: string, password: string, redirect?: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { refresh: refreshCsrf } = useCsrf();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeftMs, setTimeLeftMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 세션 정보 불러오기
  const fetchSession = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/session', { withCredentials: true });
      setUser(res.data.user);
      setTimeLeftMs(res.data.timeLeftMs ?? null);
    } catch {
      setUser(null);
      setTimeLeftMs(null);
    } finally {
      setIsLoading(false);
    }
  };
  // 로그인 함수
  const login = async (username: string, password: string, redirect = '/') => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        '/api/login',
        { username, password },
        { withCredentials: true }
      );
      if (data.ok) {
        await refreshCsrf(); // CSRF 토큰 재요청 및 갱신
        await fetchSession(); // 로그인 후 세션 정보 업데이트
        router.push(redirect);
      } else {
        setError(data.error || '로그인 실패');
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
    } catch (e) {
      console.warn('Logout API failed', e);
    } finally {
      await fetchSession();
      router.push('/auth/signin');
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSession();

    // 1분마다 세션 갱신해서 timeLeftMs 업데이트
    const interval = setInterval(fetchSession, 60 * 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        timeLeftMs,
        refresh: fetchSession,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
