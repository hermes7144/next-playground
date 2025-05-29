'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from './common/Button';
import { useAuth } from '@/contexts/AuthContext';

export function SessionExpireDialog() {
  const { user, timeLeftMs, logout, refresh, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasSession = user !== null;

  const handleLogout = useCallback(async () => {
    setError(null);
    try {
      await logout();
      setOpen(false);
    } catch {
      setError('로그아웃에 실패했습니다.');
    }
  }, [logout]);

  useEffect(() => {
    if (!hasSession) {
      setOpen(false);
      return;
    }
    if (timeLeftMs !== null) {
      if (timeLeftMs <= 0) {
        // 세션 만료 시 자동 로그아웃
        handleLogout();
        setOpen(false);
        return;
      }
      if (timeLeftMs <= 10 * 60 * 1000) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [timeLeftMs, hasSession, handleLogout]);

  async function extendSession() {
    setLoading(true);
    setError(null);
    try {
      await refresh();
      setOpen(false);
    } catch {
      setError('세션 연장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>세션 만료 알림</DialogTitle>
        <DialogDescription>세션 만료까지 10분 이하가 남았습니다. 저장하지 않은 작업을 완료하시기 바랍니다.</DialogDescription>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <Button onClick={extendSession} disabled={loading || isLoading}>
            {loading ? '연장 중...' : '세션 연장'}
          </Button>
          <Button preset='delete' onClick={handleLogout} disabled={loading || isLoading}>
            로그아웃
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
