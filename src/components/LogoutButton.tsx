'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCsrf } from '@/contexts/csrf-context';

export default function LogoutButton() {
  const router = useRouter();
  const { setCsrfToken } = useCsrf();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setCsrfToken(null);
      router.push('/auth/signin'); // 로그인 페이지로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn text-sm hover:underline">
      로그아웃
    </button>
  );
}
