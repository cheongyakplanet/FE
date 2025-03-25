'use client';

import { Map } from 'react-kakao-maps-sdk';

import { useParams } from 'next/navigation';

import { Building2, Pickaxe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useGetSubscriptionById } from '@/services/subscription/hooks/useGetSubscriptionById';

export default function SubscriptionDetail() {
  const params = useParams();
  const { id } = params;
  const { data: getSubscriptionById } = useGetSubscriptionById(id as string);
  console.log(getSubscriptionById?.data);
  const subscription = getSubscriptionById?.data;
  if (!subscription) return <div>loading...</div>;
  return (
    <article className="flex flex-col gap-3">
      <Map // 지도를 표시할 Container
        id="subscription-map"
        center={{
          // 지도의 중심좌표
          lat: Number(subscription.latitude),
          lng: Number(subscription.longitude),
        }}
        className="h-[400px] w-full rounded-2xl border shadow-md"
        level={3} // 지도의 확대 레벨
      />

      <Card>
        <div className="grid grid-cols-3 gap-2">
          <CardHeader className="col-span-2">
            <CardTitle>{subscription.houseNm}</CardTitle>
            <CardDescription className="flex flex-col gap-4">
              {subscription.hssplyAdres}
              <div className="flex gap-2">
                <Button variant="outline">홈페이지</Button>
                <Button variant="outline">공고문</Button>
              </div>
            </CardDescription>
          </CardHeader>
          <div className="m-6 flex flex-col rounded bg-slate-50 p-2">
            <span className="text-md mb-2 text-slate-800">청약 일정</span>
            <span className="text-lg text-blue-600">D-7</span>
            <span className="text-sm text-slate-500">청약 접수 시작까지</span>
          </div>
        </div>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-5 rounded bg-slate-50 p-3">
              <Pickaxe />
              <div className="flex flex-col">
                <span className="text-md text-slate-800">시행사</span>
                <span className="text-lg">{subscription.bsnsMbyNm}</span>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded bg-slate-50 p-3">
              <Building2 />
              <div className="flex flex-col">
                <span className="text-md text-slate-800">시공사</span>
                <span className="text-lg">{subscription.cnstrctEntrpsNm}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>기본정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-2">
            <div className="flex w-full flex-col items-center gap-2">
              <span className="text-foreground">주택 타입</span>
              <span className="text-lg font-bold">59A</span>
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex w-full flex-col items-center gap-2">
              <span className="text-foreground">분양가 (만원)</span>
              <span className="text-lg font-bold">37890만원</span>
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex w-full flex-col items-center gap-2">
              <span className="text-foreground">입주예정</span>
              <span className="text-lg font-bold">-</span>
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex w-full flex-col items-center gap-2">
              <span className="text-foreground">청약 방식</span>
              <span className="text-lg font-bold">청약통장으로 청약(청약금 없음)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
