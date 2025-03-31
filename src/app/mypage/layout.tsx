'use client';

import MyMenu from './components/my-menu';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Info } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { useGetMypage } from '@/services/member/hooks/useGetMypage';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { data: mypage } = useGetMypage();
  console.log(mypage);
  return (
    <section className="grid grid-cols-6 gap-5">
      <div className="col-span-2 flex flex-col gap-5">
        <Card className="flex flex-col items-center gap-2 p-3">
          <Avatar className="h-[100px] w-[100px] border shadow-md">
            <AvatarImage src="https://github.com/injulme.png" alt="@injulme" />
            <AvatarFallback>{mypage?.data.username}</AvatarFallback>
          </Avatar>
          <span>{mypage?.data.username}</span>
          <span className="text-gray-500">{mypage?.data.email}</span>
        </Card>
        <Card className="border-4 border-indigo-400 shadow-indigo-950/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium">
              <Info className="stroke-indigo-400" /> 정보 연동 하기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-wrap rounded-md bg-gray-100 p-4">
              본 서비스는 아래의 공공데이터 및 금융 정보를 자동으로 불러와 맞춤 청약
              <pre className="inline-block">&#183;</pre>
              금융 시뮬레이션을 제공합니다.
            </div>
            <div className="my-2 flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                금융정보 연동{' '}
                <span className="text-xs text-gray-500">(Codef API를 통해 연소득 / 대출 / 신용점수 조회)</span>
              </label>
            </div>
            <Button className="w-full">정보 연동</Button>
          </CardContent>
        </Card>

        {pathname !== '/mypage' && <MyMenu size="md" />}
      </div>
      <div className="col-span-4">{children}</div>
    </section>
  );
}
