import { Suspense } from 'react';
import type { Metadata } from 'next';

import SubscriptionContent from './subscription-content';

export const metadata: Metadata = {
  title: '전국 청약 정보 | 지역별 아파트 청약 일정 - 청약플래닛',
  description: '전국 아파트 청약 정보를 지역별로 확인하세요. 청약 일정, 공급 세대수, 접수 기간을 한눈에 보고 놓치지 마세요. 서울, 경기, 인천 등 전국 신규 아파트 분양 정보를 실시간으로 업데이트합니다.',
  keywords: '청약정보, 아파트청약, 청약일정, 분양정보, 신규아파트, 지역별청약, 청약접수, 청약캘린더, 아파트분양, 청약플래닛',
  openGraph: {
    title: '전국 청약 정보 | 지역별 아파트 청약 일정 - 청약플래닛',
    description: '전국 아파트 청약 정보를 지역별로 확인하고 청약 일정을 놓치지 마세요. 실시간 업데이트되는 분양 정보를 제공합니다.',
    url: 'https://cheongyakplanet.site/subscription',
    siteName: '청약플래닛',
    type: 'website',
    images: [
      {
        url: '/cheongyakplanet.png',
        width: 1200,
        height: 630,
        alt: '청약플래닛 - 전국 청약 정보',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '전국 청약 정보 | 지역별 아파트 청약 일정 - 청약플래닛',
    description: '전국 아파트 청약 정보를 지역별로 확인하고 청약 일정을 놓치지 마세요.',
    images: ['/cheongyakplanet.png'],
  },
  alternates: {
    canonical: 'https://cheongyakplanet.site/subscription',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Subscription() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto flex h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">청약 정보를 불러오는 중입니다...</p>
          </div>
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  );
}
