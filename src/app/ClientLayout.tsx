'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Next.js 13 app router
import Sidebar from '../components/Sidebar';

const PAGES = {
  '/ENTN/A/BAA002': 'BAA002 바로가기',
  '/auth/signin': '로그인',
  '/menu3': '메뉴3',
};

export default function ClientLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [tabs, setTabs] = useState([{ path: '/', title: '홈' }]);
  const [activeTab, setActiveTab] = useState('/');

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // 경로가 바뀌면 탭 상태를 업데이트 (사용자가 주소 직접 변경할 때 대비)
    if (!tabs.find((tab) => tab.path === pathname)) {
      setTabs([...tabs, { path: pathname, title: PAGES[pathname] || '새 탭' }]);
    }
    setActiveTab(pathname);
  }, [pathname]);

  function openTab(path) {
    if (!tabs.find((tab) => tab.path === path)) {
      setTabs([...tabs, { path, title: PAGES[path] || '새 탭' }]);
    }
    setActiveTab(path);
    router.push(path); // 페이지 이동
  }

  function closeTab(path, e) {
    e.stopPropagation();
    setTabs(tabs.filter((tab) => tab.path !== path));
    if (activeTab === path) {
      const idx = tabs.findIndex((tab) => tab.path === path);
      if (tabs.length === 1) {
        router.push('/');
      } else if (idx === 0) {
        router.push(tabs[1].path);
      } else {
        router.push(tabs[idx - 1].path);
      }
    }
  }

  return (
    <div className='flex h-screen flex-col'>
      <div className='flex flex-1'>
        {/* 사이드바 */}
        {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} openTab={openTab} />}

        {/* 메인 콘텐츠 */}
        <main className='flex-1 overflow-auto'>
          <div className='flex bg-gray-100 border-b border-gray-300'>
            {tabs.map((tab) => (
              <div
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className={`flex items-center px-4 py-2 cursor-pointer select-none ${activeTab === tab.path ? 'bg-white border-t border-l border-r rounded-t' : 'hover:bg-gray-200'}`}>
                <span>{tab.title}</span>
                {tab.path !== '/' && (
                  <button onClick={(e) => closeTab(tab.path, e)} className='ml-2 text-red-500 hover:text-red-700'>
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className='btn btn-primary mb-4'>
              사이드바 열기
            </button>
          )}
          <div className='p-6'>{children}</div>
        </main>
      </div>
    </div>
  );
}
