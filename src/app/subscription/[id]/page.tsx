'use client';

import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import dayjs from 'dayjs';
import { Building2, ExternalLink, Pickaxe, SquareArrowOutUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetSubscriptionById } from '@/services/subscription/hooks/useGetSubscriptionById';

export default function SubscriptionDetail() {
  const params = useParams();
  const { id } = params;
  const { data: getSubscriptionById } = useGetSubscriptionById(id as string);

  const [tab, setTab] = useState<'common' | 'price' | 'special' | 'schedule'>('common');

  const subscription = getSubscriptionById?.data;

  const schedule = [
    {
      title: '모집공고',
      date: dayjs(subscription?.rceptBgnde).format('YYYY.MM.DD'),
    },
    {
      title: '특별공급',
      date: dayjs(subscription?.spsplyRceptBgnde).format('YYYY.MM.DD'),
    },
    {
      title: '1순위지역 접수',
      date: dayjs(subscription?.gnrlRnk1CrspareaRcptde).format('YYYY.MM.DD'),
    },
    {
      title: '1순위 기타지역 접수',
      date: dayjs(subscription?.gnrlRnk1EtcAreaRcptde).format('YYYY.MM.DD'),
    },
    {
      title: '당첨자 발표',
      date: dayjs(subscription?.przwnerPresnatnDe).format('YYYY.MM.DD'),
    },
    {
      title: '계약',
      date: dayjs(subscription?.cntrctCnclsBgnde).format('YYYY.MM.DD'),
    },
  ];

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
        level={2} // 지도의 확대 레벨
      />

      <Card>
        <div className="grid grid-cols-12 gap-2">
          <CardHeader className="col-span-7">
            <CardTitle>{subscription.houseNm}</CardTitle>
            <CardDescription className="flex flex-col gap-4">
              {subscription.hssplyAdres}
              <div className="flex gap-2">
                <Button variant="outline">
                  <Link href={subscription.pblancUrl} target="_blank" className="flex items-center gap-3">
                    <ExternalLink />
                    공고 보러가기
                  </Link>
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
          <div className="col-span-5 m-6 flex flex-col rounded bg-slate-50">
            <div className="my-4">
              <span className="text-md mb-2 p-2 text-slate-800">청약 일정</span>
              <span className="text-sm text-blue-500">
                {dayjs(subscription.rceptEndde).isBefore(dayjs())
                  ? '청약이 종료되었습니다'
                  : `D-${dayjs(subscription.rceptEndde).diff(dayjs(), 'day')}`}
              </span>
            </div>
            <div className="container">
              <div className="flex grid-cols-12 flex-col md:grid">
                {schedule.map((item) => {
                  return (
                    <div className="flex md:contents" key={item.title}>
                      <div className="relative col-start-1 col-end-4 mr-10 md:mx-auto">
                        <div className="flex h-full w-4 items-center justify-center">
                          <div className="pointer-events-none h-full w-[3px] bg-gray-300"></div>
                        </div>
                        <div className="absolute top-1/2 -mt-3 flex h-4 w-4 items-center justify-center rounded-full border-4 border-gray-300 bg-slate-50 text-center shadow">
                          {/* <div className="h-[6px] w-[6px] rounded-full bg-slate-50"></div> */}
                        </div>
                      </div>
                      <div className="col-start-4 col-end-12 my-3 mr-auto flex w-full">
                        <div className="mb-1 w-[180px] text-sm font-semibold text-gray-400">{item.title}</div>
                        <span className="mb-1 text-sm font-semibold text-gray-400">{item.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*  */}
            {/*  */}
          </div>
          {/* <div className="m-6 flex flex-col rounded bg-slate-50 p-2">
            <span className="text-md mb-2 text-slate-800">청약 일정</span>
            <span className="text-sm text-slate-400">
              {subscription.rceptBgnde} ~ {subscription.rceptEndde}
            </span>
            <span className="text-md text-slate-500">
              {dayjs(subscription.rceptEndde).isBefore(dayjs())
                ? '청약이 종료되었습니다'
                : `D-${dayjs(subscription.rceptEndde).diff(dayjs(), 'day')}`}
            </span>
          </div> */}
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

      <Tabs defaultValue="common">
        <TabsList>
          <TabsTrigger value="common">기본정보</TabsTrigger>
          <TabsTrigger value="price">가격정보</TabsTrigger>
          <TabsTrigger value="special">특별공급</TabsTrigger>
          <TabsTrigger value="schedule">전체일정</TabsTrigger>
        </TabsList>

        <TabsContent value="common">
          <Card>
            <CardHeader>
              <CardTitle>기본정보</CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="price">
          <Card>
            <CardHeader>
              <CardTitle>상세정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between gap-2">
                <div className="flex w-full flex-col items-center gap-2">
                  <span className="text-foreground">주택 타입</span>
                  <span className="text-lg font-bold">{subscription.priceInfo[0].housingType}</span>
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
        </TabsContent>
      </Tabs>
    </article>
  );
}
