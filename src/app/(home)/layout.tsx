import React from 'react';

import Script from 'next/script';
import { KAKAO_MAP_API } from '@/components/kakaomap';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script src={KAKAO_MAP_API} strategy="beforeInteractive" />
      {children}
    </>
  );
}
