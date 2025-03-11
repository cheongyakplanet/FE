'use client';

import { useParams } from 'next/navigation';

import { useGetSubscriptionById } from '@/services/subscription/hooks/useGetSubscriptionById';

export default function SubscriptionDetail() {
  const params = useParams();
  const { id } = params;
  const { data: getSubscriptionById } = useGetSubscriptionById(id as string);
  console.log(getSubscriptionById?.data);
  return <div>SubscriptionDetail {id}</div>;
}
