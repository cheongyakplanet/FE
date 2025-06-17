import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import { Toaster } from 'sonner';

import Chatbot from '@/components/layout/chatbot';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

import ReactQueryProvider from '@/providers/react-query-provider';

const BMJUAFont = localFont({ src: '../assets/fonts/GmarketSansMedium.otf' });

export const metadata: Metadata = {
  title: '청약플래닛 - 청약 정보 종합 플랫폼',
  description:
    '청약플래닛에서 지역별 청약 정보, 청약 일정, 가점 계산기를 한 곳에서 확인하세요. 초보자도 쉽게 이용할 수 있는 청약 정보 종합 플랫폼입니다.',
  keywords: '청약, 아파트청약, 청약정보, 청약일정, 가점계산기, 부동산, 아파트, 청약플래닛',
  authors: [{ name: '청약플래닛' }],
  creator: '청약플래닛',
  publisher: '청약플래닛',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/cheongyakplanet.png',
  },
  openGraph: {
    title: '청약플래닛 - 청약 정보 종합 플랫폼',
    description: '지역별 청약 정보와 일정을 한눈에! 가점 계산기로 나의 청약 점수도 확인하세요.',
    url: 'https://cheongyakplanet.com',
    siteName: '청약플래닛',
    images: [
      {
        url: '/cheongyakplanet.png',
        width: 1200,
        height: 630,
        alt: '청약플래닛 - 청약 정보 종합 플랫폼',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약플래닛 - 청약 정보 종합 플랫폼',
    description: '지역별 청약 정보와 일정을 한눈에! 가점 계산기로 나의 청약 점수도 확인하세요.',
    images: ['/cheongyakplanet.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TM3TJS54');
            `,
          }}
        />
      </head>
      <body className={`${BMJUAFont.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TM3TJS54"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7334667748813914"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 네이버 애널리틱스 */}
        <Script src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
        <Script
          id="naver-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.wcs_add = window.wcs_add || {};
            window.wcs_add["wa"] = "11e2c56047b4300";
            if (typeof wcs !== "undefined") {
            wcs_do();
            }
            `,
          }}
        />

        <ReactQueryProvider>
          <Header />
          <main className="mx-auto mt-8 sm:mt-12 max-w-screen-lg px-2 sm:px-4">{children}</main>
          <Toaster />
          <Chatbot />
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
