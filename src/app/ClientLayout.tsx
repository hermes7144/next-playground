'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientLayout({ children }) {
  const queryClient = new QueryClient();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='flex h-screen'>
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* 메인 콘텐츠 */}
      <main className='flex-1 p-6 overflow-auto'>
        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} className='btn btn-primary mb-4'>
            사이드바 열기
          </button>
        )}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </main>
    </div>
  );
}
