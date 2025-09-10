import type { Metadata } from 'next';

import CommunityContent from './community-content';

export const metadata: Metadata = {
  title: '청약 커뮤니티 | 청약 후기와 정보 공유 - 청약플래닛',
  description: '청약 성공 후기, 팁, 질문을 나누는 커뮤니티입니다. 청약 전문가들과 함께 정보를 공유하고 궁금한 점을 해결하세요. 실시간 청약 뉴스와 분석도 확인하실 수 있습니다.',
  keywords: '청약커뮤니티, 청약후기, 청약팁, 청약질문, 청약정보공유, 청약성공사례, 아파트청약후기, 청약경험담, 청약토론, 청약플래닛',
  openGraph: {
    title: '청약 커뮤니티 | 청약 후기와 정보 공유 - 청약플래닛',
    description: '청약 성공 후기와 팁을 나누고, 궁금한 점을 해결하는 커뮤니티입니다.',
    url: 'https://cheongyakplanet.site/community',
    siteName: '청약플래닛',
    type: 'website',
    images: [
      {
        url: '/cheongyakplanet.png',
        width: 1200,
        height: 630,
        alt: '청약플래닛 - 청약 커뮤니티',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약 커뮤니티 | 청약 후기와 정보 공유 - 청약플래닛',
    description: '청약 성공 후기와 팁을 나누고, 궁금한 점을 해결하는 커뮤니티입니다.',
    images: ['/cheongyakplanet.png'],
  },
  alternates: {
    canonical: 'https://cheongyakplanet.site/community',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Community() {
  return <CommunityContent />;
}
