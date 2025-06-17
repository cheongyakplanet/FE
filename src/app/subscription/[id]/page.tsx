import type { Metadata } from 'next';
import SubscriptionDetailClient from './subscription-detail-client';
import { GET_subscription_by_id } from '@/services/subscription/api';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const response = await GET_subscription_by_id(id);
    const subscription = response.data.data;
    
    if (!subscription) {
      return {
        title: '청약 정보를 찾을 수 없습니다 - 청약플래닛',
        description: '요청하신 청약 정보를 찾을 수 없습니다. 청약플래닛에서 다른 청약 정보를 확인해보세요.',
      };
    }

    const title = `${subscription.houseNm} 청약 정보 - 청약플래닛`;
    const description = `${subscription.hssplyAdres}에 위치한 ${subscription.houseNm} 청약 정보를 확인하세요. ${subscription.rentSecdNm} ${subscription.houseDtlSecdNm}, 총 ${subscription.totalSupplyCountTotal}세대 공급. 청약기간: ${new Date(subscription.rceptBgnde).toLocaleDateString('ko-KR')} ~ ${new Date(subscription.rceptEndde).toLocaleDateString('ko-KR')}`;
    
    const images = [{
      url: '/cheongyakplanet.png',
      width: 1200,
      height: 630,
      alt: `${subscription.houseNm} 청약 정보`,
    }];

    return {
      title,
      description,
      keywords: `${subscription.houseNm}, ${subscription.region}, ${subscription.city}, ${subscription.district}, 청약, 아파트청약, ${subscription.rentSecdNm}, ${subscription.houseDtlSecdNm}, 청약정보, 청약일정, 부동산`,
      openGraph: {
        title,
        description,
        url: `https://cheongyakplanet.com/subscription/${id}`,
        siteName: '청약플래닛',
        images,
        locale: 'ko_KR',
        type: 'article',
        publishedTime: subscription.rcritPblancDe,
        authors: ['청약플래닛'],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/cheongyakplanet.png'],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://cheongyakplanet.com/subscription/${id}`,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: '청약 정보 - 청약플래닛',
      description: '청약플래닛에서 전국 청약 정보를 확인하세요. 지역별 청약 일정과 가점 계산기를 제공합니다.',
    };
  }
}

export default function SubscriptionDetail({ params }: Props) {
  return <SubscriptionDetailClient />;
}
