'use client';

import { Map } from 'react-kakao-maps-sdk';

import { Crown } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useGetPopularLocations } from '@/services/home/hooks/useGetPopularLocations';

export default function Home() {
  const { data: popularLocations } = useGetPopularLocations();

  return (
    <>
      <div className="grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-2">
          <Input placeholder="지역명을 입력해주세요." />
          <Map // 지도를 표시할 Container
            id="kakao-map"
            center={{
              // 지도의 중심좌표
              lat: 37.563685889,
              lng: 126.975584404,
            }}
            className="h-[400px] w-full rounded-sm border shadow-md"
            level={8} // 지도의 확대 레벨
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded border p-6 shadow-md">
            <span className="text-lg font-medium">인기 지역</span>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {popularLocations?.data.map((popularLocation) => {
                return (
                  <div
                    className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-yellow-300/10 p-2"
                    key={popularLocation}
                  >
                    <Crown size={20} className="stroke-yellow-500" />
                    <span className="text-sm font-medium">{popularLocation}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded border p-6 shadow-md">
            <span className="text-lg font-medium">주변 인프라</span>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-yellow-300/10 p-2">
                <Crown size={20} className="stroke-yellow-500" />
                <span className="text-sm font-medium">oo학교</span>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-lime-300/10 p-2">
                <Crown size={20} className="stroke-lime-500" />
                <span className="text-sm font-medium">ㄱㄱ병원</span>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-rose-300/10 p-2">
                <Crown size={20} className="stroke-rose-500" />
                <span className="text-sm font-medium">ㅌㅌ대학교</span>
              </div>
            </div>
          </div>
          <div className="rounded border p-6 shadow-md">
            <span className="text-lg font-medium">주변 공공시설</span>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-yellow-300/10 p-2">
                <Crown size={20} className="stroke-yellow-500" />
                <span className="text-sm font-medium">aa공원</span>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-lime-300/10 p-2">
                <Crown size={20} className="stroke-lime-500" />
                <span className="text-sm font-medium">kk문화센터</span>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-rose-300/10 p-2">
                <Crown size={20} className="stroke-rose-500" />
                <span className="text-sm font-medium">ㅇㄹ병원</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="grid grid-cols-2 gap-5">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle as="h4">가장 인기 있는 지역</CardTitle>
            <CardDescription>로그인 후 원하는 지역을 찜해보세요😉</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-5">
            <div>graph</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle as="h4">나의 관심지역 리스트</CardTitle>
          </CardHeader>
          <CardContent>
            <div>list</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle as="h4">게시판</CardTitle>
          </CardHeader>
          <CardContent>
            <div>board</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
