'use client';

import SubscriptionList from './componenets/subscription-list';

import { Suspense, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

import {
  Building2,
  Crown,
  HomeIcon,
  LandPlot,
  LineChart,
  ListFilter,
  MapPin,
  School,
  Search,
  TramFront,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetFacilitiesBySubscription } from '@/services/home/hooks/useGetFacilitiesBySubscription';
import { useGetInfraBySubscription } from '@/services/home/hooks/useGetInfraBySubscription';
import { useGetMyLocation } from '@/services/home/hooks/useGetMyLocations';
import { useGetPopularLocations } from '@/services/home/hooks/useGetPopularLocations';
import { useGetPopularPost } from '@/services/home/hooks/useGetPopularPost';
import { useGetPopularSubscription } from '@/services/home/hooks/useGetPopularSubscription';
import { useGetSubscriptionByRegion } from '@/services/home/hooks/useGetSubscriptionByRegion';
import { useGetSubscriptionDetail } from '@/services/home/hooks/useGetSubscriptionDetail';
import { useGetKakaoExchange } from '@/services/member/hooks/useGetKakaoExchange';

import { useTokenStore } from '@/stores/auth-store';

const bgColors = ['bg-blue-50', 'bg-red-50', 'bg-green-50', 'bg-purple-50', 'bg-orange-50', 'bg-pink-50'];
const iconColors = [
  'text-blue-500',
  'text-red-500',
  'text-green-500',
  'text-purple-500',
  'text-orange-500',
  'text-pink-500',
];

// 구글 애드센스 컴포넌트
function GoogleAd() {
  return (
    <>
      {/* ① AdSense 라이브러리 로드 (한 번만) */}
      <Script
        id="adsense-lib"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7334667748813914"
        crossOrigin="anonymous"
      />

      {/* ② 광고 삽입 지점 */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7334667748813914"
        data-ad-slot="6707376512"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      {/* ③ adsbygoogle.push() 한 번만 실행 */}
      <Script
        id="adsense-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({});
          `,
        }}
      />
    </>
  );
}

// SearchParamsComponent를 생성하여 useSearchParams를 사용하는 부분 분리
function SearchParamsComponent({ onStateReceived }: { onStateReceived: (state: string) => void }) {
  const searchParams = useSearchParams();
  const state = searchParams.get('state') ?? '';

  useEffect(() => {
    onStateReceived(state);
  }, [state, onStateReceived]);

  return null;
}

export default function Home() {
  const router = useRouter();

  const { data: popularSubRes } = useGetPopularSubscription();
  const popularSubId = popularSubRes?.data;

  const { data: subDetailRes } = useGetSubscriptionDetail(popularSubId);
  const subDetail = subDetailRes?.data;

  const [state, setState] = useState('');
  const { data: token } = useGetKakaoExchange(state);

  const { data: popularLocations } = useGetPopularLocations();

  const idString = popularSubId ? String(popularSubId) : '';
  const { data: getInfra } = useGetInfraBySubscription(idString);
  const stations = getInfra?.data?.stations ?? [];
  const schools = getInfra?.data?.schools ?? [];

  const { data: getFacilities } = useGetFacilitiesBySubscription(idString);
  const facilities = Array.isArray(getFacilities?.data) ? getFacilities.data : [];

  const { data: getMyLocation, refetch: GET_my_location } = useGetMyLocation();
  const myLocations = Array.isArray(getMyLocation?.data) ? getMyLocation.data : [];

  const { data: getPopularPost } = useGetPopularPost();
  const popularPost = getPopularPost?.data ?? [];

  const [showAllMyLocation, setShowAllMyLocation] = useState(false);
  const location = showAllMyLocation ? myLocations : myLocations.slice(0, 3);

  const [showAllPost, setShowAllPost] = useState(false);
  const post = showAllPost ? popularPost : popularPost.slice(0, 3);

  const updateToken = useTokenStore((state) => state.updateToken);

  const { accessToken } = useTokenStore();
  const isSignin = !!accessToken;

  useEffect(() => {
    updateToken({ ...token?.data });
  }, [token]);

  const [searchRegion, setSearchRegion] = useState('');
  const [position, setPosition] = useState({
    lat: 37.563685889,
    lng: 126.975584404,
  });

  useEffect(() => {
    if (subDetail) return;

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((pos) => {
    //     const lat = pos.coords.latitude;
    //     const lng = pos.coords.longitude;
    //     setPosition({ lat, lng });
    //   });
    // }
  }, [subDetail]);

  useEffect(() => {
    if (!searchRegion.trim()) return;

    if (typeof window !== 'undefined' && window.kakao?.maps?.load) {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(searchRegion, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = {
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            };
            setPosition(coords);
          }
        });
      });
    }
  }, [searchRegion]);

  useEffect(() => {
    if (subDetail) {
      setPosition({
        lat: parseFloat(subDetail.latitude),
        lng: parseFloat(subDetail.longitude),
      });
    }
  }, [subDetail]);

  useEffect(() => {
    GET_my_location();
  }, [isSignin]);

  return (
    <>
      {/* 구글 애드센스 스크립트 */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7334667748813914"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <div className="container mx-auto space-y-8 py-6">
        {/* useSearchParams를 사용하는 컴포넌트를 Suspense로 감싸기 */}
        <Suspense fallback={null}>
          <SearchParamsComponent onStateReceived={setState} />
        </Suspense>

        {/* 헤더 섹션 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">쉽고 간편한 청약 플랫폼</h1>
          <p className="text-gray-600">원하는 지역의 청약 정보를 한눈에 확인하세요</p>
        </div>

        {/* 인기 지역 TOP 섹션 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              인기 지역 TOP
            </CardTitle>
            <CardDescription>사용자들이 가장 관심있게 찾는 인기 지역을 확인해보세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {popularLocations?.data.map((popularLocation, index) => (
                <Card
                  key={popularLocation}
                  className="cursor-pointer border-0 transition-colors hover:bg-blue-50"
                  onClick={() => {
                    const [region, city] = popularLocation.split(' ');
                    router.push(`/subscription?region=${encodeURIComponent(region)}&city=${encodeURIComponent(city)}`);
                  }}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <Badge
                      variant="outline"
                      className="flex h-8 w-8 items-center justify-center rounded-full border-0 bg-blue-100 p-0 text-blue-600"
                    >
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium">{popularLocation}</p>
                      {/* <p className="text-xs text-gray-500">청약 평균 경쟁률 13:1</p> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 지역 검색 및 인기 청약 정보 섹션 */}
        <Card className="border-0 shadow-lg">
          {/* <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            지역 검색 및 청약 정보
          </CardTitle>
          <CardDescription>원하는 지역명을 입력하여 청약 정보를 확인해보세요</CardDescription>
        </CardHeader> */}
          <CardContent>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* 좌측: 검색 및 지도 */}
              <div className="space-y-4">
                {/* <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                    className="pl-10"
                    placeholder="지역명을 입력해주세요 (예: 강남구, 송파구)"
                  />
                </div>
                <Button>검색</Button>
              </div> */}

                <Map
                  id="kakao-map"
                  center={position}
                  className="h-[400px] w-full rounded-md border shadow-sm"
                  level={5}
                >
                  <MapMarker position={position} />
                </Map>
              </div>

              {/* 우측: 인기 청약 물건 정보 */}
              <div className="space-y-4">
                {subDetail ? (
                  <>
                    <div className="mb-4">
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
                        <Building2 className="h-5 w-5 text-green-500" />
                        인기 청약 물건 정보
                      </h3>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <h4 className="mb-2 text-lg font-semibold">{subDetail.houseNm}</h4>
                        <p className="mb-1 text-gray-600">{subDetail.hssplyAdres}</p>
                        <p className="text-sm text-gray-500">사업주체: {subDetail.bsnsMbyNm}</p>
                      </div>
                    </div>

                    <Tabs defaultValue="infrastructure">
                      <TabsList className="mb-4 grid grid-cols-2">
                        <TabsTrigger value="infrastructure">주변 인프라</TabsTrigger>
                        <TabsTrigger value="public">공공시설</TabsTrigger>
                      </TabsList>

                      <TabsContent value="infrastructure" className="mt-0">
                        <div className="flex justify-center">
                          {stations.length === 0 && schools.length === 0 ? (
                            <p className="text-xs text-gray-500">주변 인프라 정보가 없습니다.</p>
                          ) : (
                            <Marquee pauseOnHover gradient={false} speed={30}>
                              {stations.map((item, index) => (
                                <div
                                  key={`station-${index}`}
                                  className="mr-3 flex w-[160px] flex-col items-center justify-center gap-2 rounded-md bg-orange-50 p-3 text-center"
                                >
                                  <TramFront className="h-6 w-6 text-orange-500" />
                                  <span className="text-sm font-medium">{item.name}역</span>
                                  <span className="text-xs text-gray-500">{item.line}</span>
                                </div>
                              ))}
                              {schools.map((item, index) => (
                                <div
                                  key={`school-${index}`}
                                  className="mr-3 flex w-[160px] flex-col items-center justify-center gap-2 rounded-md bg-purple-50 p-3 text-center"
                                >
                                  <School className="h-6 w-6 text-purple-500" />
                                  <span className="text-sm font-medium">{item.schoolName}</span>
                                  <span className="text-xs text-gray-500">{item.category}</span>
                                </div>
                              ))}
                            </Marquee>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="public" className="mt-0">
                        <div className="flex justify-center">
                          {Array.isArray(facilities) && facilities.length > 0 ? (
                            <Marquee pauseOnHover gradient={false} speed={30}>
                              {facilities.map((item, index) => (
                                <div
                                  key={`facility-${index}`}
                                  className={`mr-3 flex w-[160px] flex-col items-center justify-center gap-2 rounded-md ${bgColors[index % 6]} p-3 text-center`}
                                >
                                  <LandPlot className={`h-6 w-6 ${iconColors[index % 6]}`} />
                                  <span className="text-sm font-medium">{item.dgmNm}</span>
                                </div>
                              ))}
                            </Marquee>
                          ) : (
                            <p className="text-xs text-gray-500">주변 공공시설 정보가 없습니다.</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                    {/* 상세 조회 버튼 추가 */}
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" onClick={() => router.push(`/subscription/${subDetail.id}`)}>
                        상세 조회
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Building2 className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                      <p className="font-medium">청약 정보를 불러오는 중...</p>
                      <p className="text-sm">잠시만 기다려주세요</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 섹션 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-0 shadow md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-500" />
                나의 관심지역 청약
              </CardTitle>
              <CardDescription>
                {isSignin ? '나의 관심지역 청약을 확인해보세요😉' : '로그인 후 원하는 지역을 찜해보세요😉'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-16 pr-16">
              {isSignin ? (
                <SubscriptionList />
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-md bg-gray-50 p-10">
                  <p className="font-medium text-gray-500">로그인 후 이용하실 수 있습니다.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <HomeIcon className="h-5 w-5 text-blue-500" />
                  나의 관심지역
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {location?.map((item, index) => (
                    <div key={item} className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-50">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border-0 bg-blue-100 p-0 text-sm font-bold text-blue-600">
                        {index + 1}
                      </span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                  {myLocations?.length > 3 ? (
                    <Button
                      variant="outline"
                      className="mt-2 w-full"
                      onClick={() => setShowAllMyLocation(!showAllMyLocation)}
                    >
                      {showAllMyLocation ? '접기' : '더보기'}
                    </Button>
                  ) : (
                    <Button variant="outline" className="mt-2 w-full" onClick={() => router.push('/mypage/region')}>
                      추가하기
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <ListFilter className="h-5 w-5 text-blue-500" />
                  인기 게시글
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {post?.map((item) => (
                    <div
                      onClick={() => router.push(`/community/detail?id=${item.id}`)}
                      key={item.id}
                      className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-50"
                    >
                      <span className="truncate font-medium">{item.title}</span>
                      <Badge variant="outline" className="shrink-0 border-0 bg-red-50 text-red-600">
                        HOT
                      </Badge>
                    </div>
                  ))}

                  <Button onClick={() => setShowAllPost(!showAllPost)} variant="outline" className="mt-2 w-full">
                    {post.length < 4 ? '더보기' : '접기'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 광고 섹션 */}
        <GoogleAd />
      </div>
    </>
  );
}
