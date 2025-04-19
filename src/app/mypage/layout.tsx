'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Info, UserCircle } from 'lucide-react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <UserCircle className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-900">마이페이지</h1>
        </div>
        <div className="mt-2 flex items-center gap-2 text-slate-600">
          <Info className="h-4 w-4" />
          <p>내 정보와 청약 활동을 관리할 수 있습니다</p>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
