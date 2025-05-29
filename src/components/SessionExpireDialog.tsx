'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Button } from './common/Button';

export function SessionExpireDialog() {
  const [open, setOpen] = useState(false);
  const [timeLeftMs, setTimeLeftMs] = useState<number | null>(null);
  const [hasSession, setHasSession] = useState<boolean>(false); // ← 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 세션 상태 가져오기
  async function fetchSession() {
    console.log('dddd');
    
    try {
      const { data } = await axios.get('/api/session');
      setHasSession(true); // 세션이 있음
      setTimeLeftMs(data.timeLeftMs);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setHasSession(false); // 세션 없음
        setOpen(false);
      }
    }
  }

  // 세션 연장 요청
  async function extendSession() {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/session/refresh');
      await fetchSession(); // 세션 상태 갱신
      setOpen(false);
    } catch (e) {
      setError('세션 연장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  // 로그아웃 처리
  async function handleLogout() {
    try {
      await axios.post('/api/logout');
      router.push('/auth/signin'); // 로그아웃 후 로그인 페이지로 이동
      setOpen(false);
      setTimeLeftMs(null);
    } catch {
      alert('로그아웃에 실패했습니다.');
    }
  }

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 60 * 1000); // 1분마다 체크
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!hasSession) return;
    if (timeLeftMs !== null && timeLeftMs <= 10 * 60 * 1000) {
      console.log('timeLeftMs', timeLeftMs);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [timeLeftMs, hasSession]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>세션 만료 알림</DialogTitle>
        <DialogDescription>세션 만료까지 10분 이하가 남았습니다. 저장하지 않은 작업을 완료하시기 바랍니다.</DialogDescription>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <Button onClick={extendSession} disabled={loading}>
            {loading ? '연장 중...' : '세션 연장'}
          </Button>
          <Button preset='delete' onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
