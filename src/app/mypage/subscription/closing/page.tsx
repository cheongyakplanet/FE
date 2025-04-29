'use client';

import { useRouter } from 'next/navigation';

import { Building } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useGetClosingSubscription } from '@/services/subscription/hooks/useGetClosingSubscription';

export default function Closing() {
  const router = useRouter();

  const { data: closingSub } = useGetClosingSubscription();
  const data = closingSub?.data;

  return (
    <div>
      {data?.map((sub) => (
        <div key={sub.id} className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <Building className="mt-0.5 h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-medium text-red-700">다음 청약 일정</h4>
              <p className="mt-1 text-sm text-red-600">{sub?.houseNm}</p>
              <p className="text-xs text-red-500">청약 시작: {sub?.rceptBgnde}</p>
              <Button
                onClick={() => router.push(`/subscription/${sub.subscriptionId}`)}
                size="sm"
                className="mt-2 h-8 bg-red-500 hover:bg-red-600"
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
