import React from 'react';

import Script from 'next/script';

const KAKAO_MAP_API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`;
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script src={KAKAO_MAP_API} strategy="beforeInteractive" />
      {children}
    </>
  );
}
