import { redirect } from 'next/navigation';

import { GET_subscription_by_id } from '@/services/subscription/api';

interface Props {
  params: Promise<{ id: string }>;
}

// Utility function to generate URL slug from subscription name
function generateSlug(houseNm: string): string {
  return houseNm
    .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .toLowerCase();
}

export default async function SubscriptionRedirect({ params }: Props) {
  const { id } = await params;

  try {
    // Fetch subscription data to get the house name for slug generation
    const response = await GET_subscription_by_id(id);
    const subscription = response.data.data;

    if (subscription?.houseNm) {
      const slug = generateSlug(subscription.houseNm);
      // Redirect to new SEO-friendly URL
      redirect(`/subscription/${id}/${slug}`);
    }
  } catch (error) {
    console.error('Failed to redirect to SEO URL:', error);
  }

  // Fallback redirect if subscription data is not available
  redirect('/subscription');
}