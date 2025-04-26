'use client';

import MyMenu from './components/my-menu';

import { redirect } from 'next/navigation';

import { BellRing, Building, CheckCircle, Home, Info, ListChecks, Settings, UserCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

import { useGetMypage } from '@/services/member/hooks/useGetMypage';

import { useTokenStore } from '@/stores/auth-store';

// export const metadata: Metadata = {
//   title: '마이페이지 | 청약 알리미',
//   description: '나의 청약 정보와 관심 목록을 확인하세요',
// };

export default function MyPage() {
  const token = useTokenStore((state) => state);

  const { data: me } = useGetMypage();
  console.log(me?.data);

  if (!token.accessToken) {
    redirect('/signin');
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* 프로필 카드 */}
        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">내 프로필</CardTitle>
            </div>
            <CardDescription>내 계정 정보와 청약 자격을 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-blue-50">
                <div className="flex h-full w-full items-center justify-center">
                  <UserCircle className="h-10 w-10 text-blue-500" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{me?.data.username || '사용자'}</h3>
                  <Badge variant="outline" className="border-blue-200 bg-blue-50 text-xs text-blue-700">
                    일반회원
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{me?.data.email}</p>
              </div>
            </div>

            <Separator className="my-4" />
          </CardContent>
          <CardFooter className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">정보 연동하기</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>정보 연동하기</DialogTitle>
                </DialogHeader>
                {/* 정보 연동 카드 */}
                <Card className="border border-blue-100 bg-blue-50/50 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 font-medium text-slate-900">
                      <Info className="h-5 w-5 text-blue-500" />
                      정보 연동 하기
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      청약 맞춤 정보와 금융 시뮬레이션을 위한 정보를 연동해보세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md bg-white p-4 text-sm text-slate-700">
                      본 서비스는 아래의 공공데이터 및 금융 정보를 자동으로 불러와 맞춤 청약
                      <span className="mx-1">•</span>
                      금융 시뮬레이션을 제공합니다.
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        className="border-blue-200 data-[state=checked]:bg-blue-500 data-[state=checked]:text-slate-50"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        금융정보 연동 <span className="text-xs text-slate-500">(Codef API)</span>
                      </label>
                    </div>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">정보 연동하기</Button>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        <MyMenu />
      </div>

      {/* 청약 정보 카드 */}
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">청약 현황</CardTitle>
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5 text-slate-500" />
            </Button>
          </div>
          <CardDescription>내가 관심있는 청약 정보를 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">관심 청약</span>
                <Badge>3</Badge>
              </div>
              <p className="mt-2 text-2xl font-bold text-blue-600">3</p>
              <p className="mt-1 text-xs text-slate-500">최근 추가: 2023.09.15</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">청약 알림</span>
                <Badge variant="destructive">2</Badge>
              </div>
              <p className="mt-2 text-2xl font-bold text-red-500">2</p>
              <p className="mt-1 text-xs text-slate-500">마감 임박: 2건</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">관심 지역</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-700">4</p>
              <p className="mt-1 text-xs text-slate-500">서울, 경기 외 2곳</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">게시글</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-700">5</p>
              <p className="mt-1 text-xs text-slate-500">댓글: 12</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Building className="mt-0.5 h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">다음 청약 일정</h4>
                <p className="mt-1 text-sm text-blue-700">서울 강남 헤리티지 아파트</p>
                <p className="text-xs text-blue-600">청약 시작: 2023.10.15</p>
                <Button size="sm" className="mt-2 h-8 bg-blue-600 hover:bg-blue-700">
                  청약 상세 보기
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            모든 청약 정보 보기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
