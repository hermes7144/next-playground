import React from 'react';
import { cn } from "@/lib/utils"; // cn 함수 임포트

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-background p-4 text-right mt-8">
      <p className={cn('text-sm text-muted-foreground')}>
        &copy; {new Date().getFullYear()} (주)하이텍정보시스템
      </p>
    </footer>
  );
};

export default Footer;
