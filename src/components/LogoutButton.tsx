'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button onClick={logout}       
    className="flex items-center w-full px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      <LogOut className="mr-2 h-4 w-4" />
      <span>로그아웃</span>
    </button>
  );
}
