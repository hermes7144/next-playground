import Link from 'next/link';
import React from 'react';
import { SidebarProvider, SidebarTrigger  } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Sidebar({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
      <SidebarTrigger />
    </SidebarProvider>
    // <aside className="w-64 bg-gray-800 text-white p-6">
    //     <button
    //       className="btn btn-sm btn-ghost mb-6"
    //       onClick={onClose}
    //     >
    //       닫기
    //     </button>
    //     <nav>
    //       <ul className="space-y-4">
    //         <li>
    //     <Link
    //       href="/ENTN/A/BAA002"
    //       className="hover:text-primary"
    //     >
    //       BAA002 바로가기
    //     </Link>

    //         </li>
    //         <li>
    //     <Link
    //       href="/auth/signin"
    //       className="hover:text-primary"
    //     >
    //       로그인
    //     </Link>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:text-primary">
    //             메뉴3
    //           </a>
    //         </li>
    //       </ul>
    //     </nav>
    //   </aside>
  );
}