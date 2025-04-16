'use client';

import Link from 'next/link';

import { LogOut } from 'lucide-react';

import { useTokenStore } from '@/stores/auth-store';

export default function Header() {
  const routes = ['home', 'signup', 'mypage', 'community', 'subscription', 'signin'];
  const { accessToken, logout } = useTokenStore();
  const isSignin = !!accessToken;

  return (
    <header className="sticky top-0 z-[99] bg-indigo-950 shadow-lg shadow-indigo-950/60">
      <div className="mx-auto flex max-w-screen-lg justify-between gap-2 py-6">
        <Link href="/">
          <h1 className="cursor-pointer text-3xl text-white">청약플래닛</h1>
        </Link>
        <div className="flex gap-5">
          {routes.map((route) => {
            if (route === 'signin') {
              return isSignin ? (
                <div className="flex gap-2" key="logout">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                    className="flex animate-slide-bottom-sm cursor-pointer items-center gap-2 text-white hover:animate-slide-top-sm"
                  >
                    logout
                    <LogOut size="16" />
                  </Link>
                </div>
              ) : (
                <Link
                  href="/signin"
                  key="signin"
                  className="flex animate-slide-bottom-sm cursor-pointer items-center text-white hover:animate-slide-top-sm"
                >
                  signin
                </Link>
              );
            }
            return (
              <Link
                className="flex animate-slide-bottom-sm cursor-pointer items-center text-white hover:animate-slide-top-sm"
                href={`/${route === 'home' ? '' : route}`}
                key={route}
              >
                {route}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
