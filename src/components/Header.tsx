'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();
  const userName = user?.username;
  const isLoggedIn = !!user;
  
  if (!user) return <></>;
  return (
    <header className="sticky w-full top-0 z-10 bg-white shadow-sm p-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <div className={cn("flex items-center gap-2 cursor-pointer", "pl-4 md:pl-0")}>
            <img src="/next.svg" alt="Next.js Logo" title="Next.js" className="h-8" />
            <h2 className="text-lg font-semibold text-gray-800">하이텍정보시스템</h2>
          </div>
        </Link>

        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <User />
                  <span>{userName}님</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"> {/* 드롭다운 메뉴 위치 조정 */}
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/plan" className="flex items-center">
                    <Settings  />
                    <span>플랜 정보</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/" passHref>
              <Button variant="outline">로그인</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

