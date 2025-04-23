'use client';

import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import { useRouter } from 'next/navigation';

import {
  Building,
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
import { useGetSubscriptionByRegion } from '@/services/home/hooks/useGetSubscriptionByRegion';

import { useTokenStore } from '@/stores/auth-store';

const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-purple-50'];
const iconColors = ['text-blue-500', 'text-green-500', 'text-purple-500'];

export default function Home() {
  const router = useRouter();
  const { data: popularLocations } = useGetPopularLocations();
  const [topPopularCity, topPopularDistrict] = popularLocations?.data[0].split(' ') ?? [];
  const { data: topPopularRegionId } = useGetSubscriptionByRegion(topPopularCity, topPopularDistrict);
  const id = topPopularRegionId?.data[0]?.id;
  const { data: getInfra } = useGetInfraBySubscription(id);
  const { data: getFacilities } = useGetFacilitiesBySubscription(id);
  const facilities = Array.isArray(getFacilities?.data) ? getFacilities.data : [];
  const facility = facilities.slice(0, 3);

  const rawStations = getInfra?.data?.stations || [];
  const rawSchools = getInfra?.data?.schools || [];

  const desiredStationCount = 2;
  const desiredSchoolCount = 1;
  const totalLimit = 3;

  const stations = rawStations.map((s: any) => ({ ...s, type: 'station' }));
  const schools = rawSchools.map((s: any) => ({ ...s, type: 'school' }));

  const selectedStations = stations.slice(0, desiredStationCount);
  const selectedSchools = schools.slice(0, desiredSchoolCount);

  let result = [...selectedStations, ...selectedSchools];
  let remaining = totalLimit - result.length;

  if (remaining > 0) {
    if (selectedStations.length < desiredStationCount) {
      const extraStations = stations.slice(desiredStationCount, desiredStationCount + remaining);
      result = [...result, ...extraStations];
      remaining -= extraStations.length;
    }

    if (remaining > 0 && selectedSchools.length < desiredSchoolCount) {
      const extraSchools = schools.slice(desiredSchoolCount, desiredSchoolCount + remaining);
      result = [...result, ...extraSchools];
    }
  }

  const { data: getMyLocation, refetch: GET_my_location } = useGetMyLocation();
  const myLocations = Array.isArray(getMyLocation?.data) ? getMyLocation.data : [];

  const { data: getPopularPost } = useGetPopularPost();
  const popularPost = getPopularPost?.data ?? [];

  const [showAllMyLocation, setShowAllMyLocation] = useState(false);
  const location = showAllMyLocation ? myLocations : myLocations.slice(0, 3);

  const [showAllPost, setShowAllPost] = useState(false);
  const post = showAllPost ? popularPost : popularPost.slice(0, 3);

  const { accessToken } = useTokenStore();
  const isSignin = !!accessToken;

  useEffect(() => {
    GET_my_location();
  }, [isSignin]);

  return (
    <div className="container mx-auto space-y-8 py-6">
      {/* 헤더 섹션 */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">쉽고 간편한 청약 플랫폼</h1>
        <p className="text-gray-600">원하는 지역의 청약 정보를 한눈에 확인하세요</p>
      </div>

      {/* 검색 및 지도 섹션 */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            지역 검색
          </CardTitle>
          <CardDescription>원하는, 지역명을 입력하여 청약 정보를 확인해보세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" placeholder="지역명을 입력해주세요 (예: 강남구, 송파구)" />
                </div>
                <Button>검색</Button>
              </div>

              <Map
                id="kakao-map"
                center={{
                  lat: 37.563685889,
                  lng: 126.975584404,
                }}
                className="h-[400px] w-full rounded-md border shadow-sm"
                level={8}
              />
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-medium">
                <Crown className="h-5 w-5 text-yellow-500" />
                인기 지역 TOP
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {popularLocations?.data.map((popularLocation, index) => (
                  <Card key={popularLocation} className="cursor-pointer border-0 transition-colors hover:bg-blue-50">
                    <CardContent className="flex items-center gap-3 p-3">
                      <Badge
                        variant="outline"
                        className="flex h-8 w-8 items-center justify-center rounded-full border-0 bg-blue-100 p-0 text-blue-600"
                      >
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{popularLocation}</p>
                        <p className="text-xs text-gray-500">청약 평균 경쟁률 13:1</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-4">
                <h3 className="mb-3 text-lg font-medium">지역 정보</h3>
                <Tabs defaultValue="infrastructure">
                  <TabsList className="mb-4 grid grid-cols-2">
                    <TabsTrigger value="infrastructure">주변 인프라</TabsTrigger>
                    <TabsTrigger value="public">공공시설</TabsTrigger>
                  </TabsList>

                  <TabsContent value="infrastructure" className="mt-0">
                    <div className="grid grid-cols-3 gap-3">
                      {result.map((item, index) =>
                        item.type === 'station' ? (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-center gap-2 rounded-md bg-orange-50 p-3 text-center"
                          >
                            <TramFront className="h-6 w-6 text-orange-500" />
                            <span className="text-sm font-medium">{item.name}역</span>
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-center gap-2 rounded-md bg-purple-50 p-3 text-center"
                          >
                            <School className="h-6 w-6 text-purple-500" />
                            <span className="text-sm font-medium">{item.schoolName}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="public" className="mt-0">
                    <div className="grid grid-cols-3 gap-3">
                      {Array.isArray(facilities) ? (
                        facility?.map((item, index) => (
                          <div
                            key={index}
                            className={`flex flex-col items-center justify-center gap-2 rounded-md ${bgColors[index]} p-3 text-center`}
                          >
                            <LandPlot className={`h-6 w-6 ${iconColors[index]}`} />
                            <span className="text-sm font-medium">{item.dgmNm}</span>
                          </div>
                        ))
                      ) : (
                        <p>주변 공공시설이 없습니다.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
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
              청약 인기 지역 순위
            </CardTitle>
            <CardDescription>로그인 후 원하는 지역을 찜해보세요😉</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex h-[200px] items-center justify-center rounded-md bg-gray-50 p-10">
              <p className="font-medium text-gray-500">청약 인기 지역 그래프가 표시됩니다</p>
            </div>
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
                  <div key={item.id} className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50">
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
    </div>
  );
}
