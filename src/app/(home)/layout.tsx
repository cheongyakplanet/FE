import React from 'react';

import Script from 'next/script';

import { KAKAO_MAP_API } from '@/components/kakaomap';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-R9QB2QT9S4" strategy="beforeInteractive" />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R9QB2QT9S4');
        `}
      </Script>

      <Script src={KAKAO_MAP_API} strategy="beforeInteractive" />
      {children}
    </>
  );
}
