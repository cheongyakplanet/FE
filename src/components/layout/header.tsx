'use client';

import Link from 'next/link';

import { Award, Calendar, Home, LogIn, LogOut, MessageSquare, User, UserPlus } from 'lucide-react';

import { useTokenStore } from '@/stores/auth-store';

export default function Header() {
  const routes = [
    { name: '홈', path: '', icon: <Home size={18} /> },
    { name: '청약 서비스', path: 'subscription', icon: <Award size={18} /> },
    { name: '커뮤니티', path: 'community', icon: <MessageSquare size={18} /> },
    { name: '마이페이지', path: 'mypage', icon: <User size={18} /> },
  ];

  const { accessToken, logout } = useTokenStore();
  const isSignin = !!accessToken;

  return (
    <header className="sticky top-0 z-[99] bg-gradient-to-r from-indigo-950 to-indigo-900 shadow-lg shadow-indigo-950/60">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between px-4 py-4">
        <div>
          <Link href="/" className="transition-transform hover:scale-105">
            <h1 className="cursor-pointer text-3xl font-bold text-white">
              <span className="text-indigo-300">청약</span>플래닛
            </h1>
          </Link>
        </div>

        <nav className="flex items-center gap-1 md:gap-3">
          {routes.map((route) => (
            <Link
              className="group flex items-center gap-1 rounded-md px-2 py-2 text-sm text-indigo-100 transition-all hover:bg-indigo-800 md:text-base"
              href={`/${route.path}`}
              key={route.path}
            >
              <span className="text-indigo-300 group-hover:text-white">{route.icon}</span>
              <span className="hidden sm:inline">{route.name}</span>
            </Link>
          ))}

          {isSignin ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="flex items-center gap-1 rounded-md bg-indigo-700 px-3 py-2 text-sm text-white transition-colors hover:bg-indigo-600 md:text-base"
            >
              <span>로그아웃</span>
              <LogOut size={18} />
            </button>
          ) : (
            <Link
              href="/signin"
              className="flex items-center gap-1 rounded-md bg-indigo-700 px-3 py-2 text-sm text-white transition-colors hover:bg-indigo-600 md:text-base"
            >
              <span>로그인</span>
              <LogIn size={18} />
            </Link>
          )}
        </nav>
      </div>

      <div className="mx-auto max-w-screen-lg">
        <div className="scrollbar-hide flex overflow-x-auto px-4 py-2 text-xs text-indigo-200 md:text-sm">
          <Link href="/subscription/guide" className="mr-4 whitespace-nowrap hover:text-white">
            초보자 가이드
          </Link>
          <Link href="/subscription/calendar" className="mr-4 whitespace-nowrap hover:text-white">
            청약 캘린더
          </Link>
          <Link href="/subscription/calculator" className="mr-4 whitespace-nowrap hover:text-white">
            가점 계산기
          </Link>
        </div>
      </div>
    </header>
  );
}
