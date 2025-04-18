'use client';

import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import {
  ArrowLeft,
  BookmarkPlus,
  Building2,
  Calendar,
  CalendarClock,
  Clock,
  ExternalLink,
  Eye,
  Home,
  MapPin,
  Pickaxe,
  Share2,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetSubscriptionById } from '@/services/subscription/hooks/useGetSubscriptionById';

export default function SubscriptionDetail() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { data: getSubscriptionById } = useGetSubscriptionById(id as string);

  const [tab, setTab] = useState<'common' | 'price' | 'special' | 'schedule'>('common');

  const subscription = getSubscriptionById?.data;

  const schedule = [
    {
      title: '모집공고',
      date: dayjs(subscription?.rceptBgnde).format('YYYY.MM.DD'),
      isActive: true,
    },
    {
      title: '특별공급',
      date: dayjs(subscription?.spsplyRceptBgnde).format('YYYY.MM.DD'),
      isActive: dayjs().isAfter(dayjs(subscription?.spsplyRceptBgnde)),
    },
    {
      title: '1순위지역 접수',
      date: dayjs(subscription?.gnrlRnk1CrspareaRcptde).format('YYYY.MM.DD'),
      isActive: dayjs().isAfter(dayjs(subscription?.gnrlRnk1CrspareaRcptde)),
    },
    {
      title: '1순위 기타지역 접수',
      date: dayjs(subscription?.gnrlRnk1EtcAreaRcptde).format('YYYY.MM.DD'),
      isActive: dayjs().isAfter(dayjs(subscription?.gnrlRnk1EtcAreaRcptde)),
    },
    {
      title: '당첨자 발표',
      date: dayjs(subscription?.przwnerPresnatnDe).format('YYYY.MM.DD'),
      isActive: dayjs().isAfter(dayjs(subscription?.przwnerPresnatnDe)),
    },
    {
      title: '계약',
      date: dayjs(subscription?.cntrctCnclsBgnde).format('YYYY.MM.DD'),
      isActive: dayjs().isAfter(dayjs(subscription?.cntrctCnclsBgnde)),
    },
  ];

  if (!subscription)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-slate-700">청약 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );

  const isSubscriptionClosed = dayjs(subscription.rceptEndde).isBefore(dayjs());
  const daysLeft = dayjs(subscription.rceptEndde).diff(dayjs(), 'day');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 뒤로가기 버튼 */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로 돌아가기
        </Button>
      </div>

      {/* 헤더 섹션 */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{subscription.houseNm}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            {subscription.hssplyAdres}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <Eye className="h-4 w-4" />
            <span>찜하기</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            <span>공유하기</span>
          </Button>
          <Button className="gap-1 bg-blue-500 hover:bg-blue-600">
            <BookmarkPlus className="h-4 w-4" />
            <span>관심 청약 등록</span>
          </Button>
        </div>
      </div>

      {/* 지도 섹션 */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Map
            id="subscription-map"
            center={{
              lat: Number(subscription.latitude),
              lng: Number(subscription.longitude),
            }}
            className="h-full w-full rounded-xl border shadow"
            level={2}
          />
        </div>

        <div className="flex flex-col gap-4">
          {/* 청약 상태 카드 */}
          <Card className="border-2 border-blue-100 bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-blue-900">청약 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">청약 기간</span>
                  <span className="text-sm text-slate-600">
                    {dayjs(subscription.rceptBgnde).format('YYYY.MM.DD')} ~{' '}
                    {dayjs(subscription.rceptEndde).format('YYYY.MM.DD')}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-blue-600">
                      {isSubscriptionClosed ? '청약이 종료되었습니다' : `D-${daysLeft} 남았습니다`}
                    </span>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: isSubscriptionClosed ? '100%' : `${Math.min(100, 100 - (daysLeft / 30) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <Button className="w-full" disabled={isSubscriptionClosed}>
                {isSubscriptionClosed ? '청약 마감됨' : '공고 보러가기'}
              </Button>
            </CardFooter>
          </Card>

          {/* 핵심 정보 카드 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">공급 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">공급 유형</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {subscription.houseSecdNm || '공공분양'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">총 공급 세대수</span>
                </div>
                <span className="font-bold">{subscription.totSuplyHshldco}세대</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">입주 예정</span>
                </div>
                <span className="font-bold">{subscription.mvnPrearngeYm || '미정'}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pickaxe className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">시행사</span>
                </div>
                <span className="text-sm font-medium">{subscription.bsnsMbyNm}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">시공사</span>
                </div>
                <span className="text-sm font-medium">{subscription.cnstrctEntrpsNm}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="common" className="mt-6" onValueChange={(value) => setTab(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="common">기본정보</TabsTrigger>
          <TabsTrigger value="price">가격정보</TabsTrigger>
          <TabsTrigger value="special">특별공급</TabsTrigger>
          <TabsTrigger value="schedule">전체일정</TabsTrigger>
        </TabsList>

        <TabsContent value="common">
          <Card>
            <CardHeader>
              <CardTitle>기본정보</CardTitle>
              <CardDescription>사업 정보 및 공급 개요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium text-slate-900">사업정보</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-600">주택 구분</span>
                        <span className="font-medium">{subscription.houseSecdNm || '공공분양'}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-600">공급 위치</span>
                        <span className="font-medium">{subscription.hssplyAdres}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-600">시행사</span>
                        <span className="font-medium">{subscription.bsnsMbyNm}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-600">시공사</span>
                        <span className="font-medium">{subscription.cnstrctEntrpsNm}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium text-slate-900">공급 개요</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-600">총 세대수</span>
                        <span className="font-medium">{subscription.totSuplyHshldco}세대</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-600">일반 공급</span>
                        <span className="font-medium">{subscription.supplyTarget[0].supplyCountNormal || '-'}세대</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-600">특별 공급</span>
                        <span className="font-medium">
                          {subscription.specialSupplyTarget[0].supplyCountTotal || '-'}세대
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">입주 예정</span>
                        <span className="font-medium">{subscription.mvnPrearngeYm || '미정'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="price">
          <Card>
            <CardHeader>
              <CardTitle>가격정보</CardTitle>
              <CardDescription>주택 유형별 가격 및 상세 정보</CardDescription>
            </CardHeader>
            <CardContent>
              {subscription.priceInfo && subscription.priceInfo.length > 0 ? (
                <div className="space-y-6">
                  {subscription.priceInfo.map((price: any, index: number) => (
                    <div className="rounded-lg border p-4" key={index}>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-medium text-slate-900">{price.housingType || '일반형'}</h3>
                        <Badge>{price.supplyAmount || subscription.totSuplyHshldco}세대</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-3">
                          <span className="text-xs text-slate-500">전용면적</span>
                          <span className="text-lg font-bold">{price.exclusiveArea || '-'}㎡</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-3">
                          <span className="text-xs text-slate-500">분양가</span>
                          <span className="text-lg font-bold">{price.supplyAmount || '37890'}만원</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-3">
                          <span className="text-xs text-slate-500">층수</span>
                          <span className="text-lg font-bold">{price.floorInfo || '-'}</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-3">
                          <span className="text-xs text-slate-500">해당 타입</span>
                          <span className="text-lg font-bold">{price.housingType || '59A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-between gap-2 rounded-lg border p-6">
                  <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-foreground">주택 타입</span>
                    <span className="text-lg font-bold">
                      {subscription.priceInfo && subscription.priceInfo.length > 0
                        ? subscription.priceInfo[0].housingType
                        : '59A'}
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-foreground">분양가 (만원)</span>
                    <span className="text-lg font-bold">37890만원</span>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-foreground">입주예정</span>
                    <span className="text-lg font-bold">{subscription.mvnPrearngeYm || '미정'}</span>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-foreground">청약 방식</span>
                    <span className="text-lg font-bold">청약통장으로 청약(청약금 없음)</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special">
          <Card>
            <CardHeader>
              <CardTitle>특별공급</CardTitle>
              <CardDescription>특별공급 정보 및 자격요건</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">특별공급 세대수</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4">
                    <span className="text-sm text-slate-600">다자녀가구</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {subscription.specialSupplyTarget[0].supplyCountMultichild || '-'}
                    </span>
                    <span className="text-xs text-slate-400">세대</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4">
                    <span className="text-sm text-slate-600">신혼부부</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {subscription.specialSupplyTarget[0].supplyCountNewlywed || '-'}
                    </span>
                    <span className="text-xs text-slate-400">세대</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4">
                    <span className="text-sm text-slate-600">생애최초</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {subscription.specialSupplyTarget[0].supplyCountFirst || '-'}
                    </span>
                    <span className="text-xs text-slate-400">세대</span>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border p-4">
                  <h3 className="mb-4 text-lg font-medium">자격요건 안내</h3>
                  <p className="text-sm text-slate-600">
                    특별공급 신청자격 및 당첨자 선정방법 등 구체적인 사항은 공고문을 통해 반드시 확인하시기 바랍니다.
                  </p>
                  <div className="mt-4">
                    <Button variant="outline">
                      <Link href={subscription.pblancUrl} target="_blank" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        특별공급 공고문 확인하기
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>전체일정</CardTitle>
              <CardDescription>청약부터 계약까지 주요 일정을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-6">
                <div className="space-y-6">
                  {schedule.map((item, index) => (
                    <div key={item.title} className="flex items-start gap-6 border-b pb-4 last:border-0">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          item.isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-600">{item.date}</span>
                            {item.isActive && <Badge className="bg-blue-100 text-blue-800">완료</Badge>}
                          </div>
                        </div>

                        <div className="mt-2 text-sm text-slate-500">
                          {item.title === '모집공고' && '청약 신청 조건 및 주택 정보 확인이 가능합니다.'}
                          {item.title === '특별공급' && '다자녀, 신혼부부 등 특별공급 신청일입니다.'}
                          {item.title === '1순위지역 접수' && '해당 지역 1순위 청약 신청일입니다.'}
                          {item.title === '1순위 기타지역 접수' && '기타지역 1순위 청약 신청일입니다.'}
                          {item.title === '당첨자 발표' && '청약 당첨자 발표 및 동호수 배정일입니다.'}
                          {item.title === '계약' && '분양계약 체결 기간입니다.'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
