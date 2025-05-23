'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-6 overflow-auto">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn btn-primary mb-4"
          >
            사이드바 열기
          </button>
        )}
        {children}
      </main>
    </div>
  );
}

