'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Header() {
  const routes = ['home', 'signup', 'signin', 'mypage', 'community', 'subscription'];
  return (
    <header className="sticky top-0 z-[99] bg-indigo-950 shadow-lg shadow-indigo-950/60">
      <div className="mx-auto flex max-w-screen-lg justify-between gap-2 py-6">
        <Link href="/">
          <h1 className="cursor-pointer text-3xl text-white">청약플래닛</h1>
        </Link>
        <div className="flex gap-5">
          {routes.map((route) => (
            <Link
              className="animate-slide-bottom-sm cursor-pointer text-lg text-white hover:animate-slide-top-sm"
              href={`/${route === 'home' ? '' : route}`}
              key={route}
            >
              {route}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
