import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import { Toaster } from 'sonner';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

import ReactQueryProvider from '@/providers/react-query-provider';

const BMJUAFont = localFont({ src: '../assets/fonts/GmarketSansMedium.otf' });

export const metadata: Metadata = {
  title: '청약플래닛',
  description:
    '청약플래닛에서 지역별 청약 정보, 청약 일정, 가점 계산기를 한 곳에서 확인하세요. 초보자도 쉽게 이용할 수 있는 청약 정보 종합 플랫폼입니다.',
  icons: {
    icon: '/cheongyakplanet.png',
  },
  verification: {
    other: {
      'naver-site-verification': '658bff1761a0d5eb60069ef4331ab51643304b65',
      'google-adsense-account': 'ca-pub-7334667748813914',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-7334667748813914',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${BMJUAFont.className} antialiased`}>
        <ReactQueryProvider>
          <Header />
          <main className="mx-auto mt-12 max-w-screen-lg">{children}</main>
          <Toaster />
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
