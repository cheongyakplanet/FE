'use client';

import { Map } from 'react-kakao-maps-sdk';

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
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetPopularLocations } from '@/services/home/hooks/useGetPopularLocations';

export default function Home() {
  const { data: popularLocations } = useGetPopularLocations();

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
                      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-blue-50 p-3 text-center">
                        <School className="h-6 w-6 text-blue-500" />
                        <span className="text-sm font-medium">oo학교</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-center">
                        <Building className="h-6 w-6 text-green-500" />
                        <span className="text-sm font-medium">ㄱㄱ병원</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-purple-50 p-3 text-center">
                        <Building2 className="h-6 w-6 text-purple-500" />
                        <span className="text-sm font-medium">ㅌㅌ대학교</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="public" className="mt-0">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-blue-50 p-3 text-center">
                        <LandPlot className="h-6 w-6 text-blue-500" />
                        <span className="text-sm font-medium">aa공원</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-center">
                        <Building className="h-6 w-6 text-green-500" />
                        <span className="text-sm font-medium">kk문화센터</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-purple-50 p-3 text-center">
                        <Building className="h-6 w-6 text-purple-500" />
                        <span className="text-sm font-medium">ㅇㄹ병원</span>
                      </div>
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
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50">
                    <span className="font-medium">관심지역 {item}</span>
                  </div>
                ))}
                <Button variant="outline" className="mt-2 w-full">
                  더보기
                </Button>
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
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50">
                    <span className="truncate font-medium">청약 꿀팁 공유합니다 {item}</span>
                    <Badge variant="outline" className="shrink-0 border-0 bg-red-50 text-red-600">
                      HOT
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="mt-2 w-full">
                  더보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
