'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className="btn text-sm hover:underline">
      로그아웃
    </button>
  );
}
