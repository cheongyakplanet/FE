'use client';

import MyMenu from './components/my-menu';

import { redirect, useRouter } from 'next/navigation';

import { Info, UserCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { useGetMypage } from '@/services/member/hooks/useGetMypage';
import { useGetClosingSubscription } from '@/services/subscription/hooks/useGetClosingSubscription';
import { useGetUpcomingSubscription } from '@/services/subscription/hooks/useGetUpcomingSubscription';

import { useTokenStore } from '@/stores/auth-store';

// export const metadata: Metadata = {
//   title: '마이페이지 | 청약 알리미',
//   description: '나의 청약 정보와 관심 목록을 확인하세요',
// };

export default function MyPage() {
  const token = useTokenStore((state) => state);
  const router = useRouter();

  const { data: me } = useGetMypage();

  const { data: upcomingSubscription } = useGetUpcomingSubscription();
  const upcomingSub = upcomingSubscription?.data;

  const { data: closingSubscription } = useGetClosingSubscription();
  const closingSub = closingSubscription?.data;

  if (me?.status === 'fail') {
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
                </div>
                <p className="text-sm text-slate-600">{me?.data.email}</p>
              </div>
            </div>
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
          </div>
          <CardDescription>내가 관심있는 청약 정보를 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">청약 알림</span>
                <Badge className="bg-blue-600 hover:bg-blue-500">{upcomingSub?.length}</Badge>
              </div>
              <button
                onClick={() => router.push('/mypage/subscription/upcoming')}
                className="mt-2 text-2xl font-bold text-blue-600"
              >
                {upcomingSub?.length}
              </button>
              <p className="mt-1 text-xs text-slate-500">시작 임박: {upcomingSub?.length}건</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">청약 알림</span>
                <Badge variant="destructive">{closingSub?.length}</Badge>
              </div>
              <button
                onClick={() => router.push('/mypage/subscription/closing')}
                className="mt-2 text-2xl font-bold text-red-500"
              >
                {closingSub?.length}
              </button>
              <p className="mt-1 text-xs text-slate-500">마감 임박: {closingSub?.length}건</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-100 pt-4">
          <Button
            onClick={() => router.push('/subscription')}
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
