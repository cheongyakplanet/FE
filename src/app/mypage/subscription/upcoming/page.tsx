'use client';

import { useRouter } from 'next/navigation';

import { Building } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useGetUpcomingSubscription } from '@/services/subscription/hooks/useGetUpcomingSubscription';

export default function Upcoming() {
  const router = useRouter();

  const { data: upcomingSub } = useGetUpcomingSubscription();
  const data = upcomingSub?.data;

  return (
    <div>
      {data?.map((sub) => (
        <div key={sub.id} className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Building className="mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">다음 청약 일정</h4>
              <p className="mt-1 text-sm text-blue-700">{sub?.houseNm}</p>
              <p className="text-xs text-blue-600">청약 시작: {sub?.rceptBgnde}</p>
              <Button
                onClick={() => router.push(`/subscription/${sub.subscriptionId}`)}
                size="sm"
                className="mt-2 h-8 bg-blue-600 hover:bg-blue-700"
              >
                청약 상세 보기
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
