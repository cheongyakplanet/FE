'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight, FilePenLine, Heart, Map, UserCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

const myMenu = [
  {
    icon: <UserCircle className="h-5 w-5" />,
    title: '내 정보',
    url: '/mypage/info',
    description: '프로필 및 계정 설정',
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: '관심 청약',
    url: '/mypage/like',
    description: '저장한 청약 목록',
    badge: '3',
  },
  {
    icon: <FilePenLine className="h-5 w-5" />,
    title: '내 게시글',
    url: '/mypage/posts',
    description: '작성한 게시글 관리',
  },
  {
    icon: <Map className="h-5 w-5" />,
    title: '관심 지역',
    url: '/mypage/region',
    description: '즐겨찾는 지역 설정',
  },
];

export default function MyMenu({ size = 'lg' }: { size?: 'lg' | 'md' | 'sm' }) {
  const pathname = usePathname();

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className={cn('pb-3', size === 'sm' && 'py-3')}>
        <CardTitle className="text-lg font-medium text-slate-900">마이 메뉴</CardTitle>
      </CardHeader>
      <CardContent className={cn('pb-4', size === 'sm' && 'pt-0')}>
        <div
          className={cn(
            'grid gap-3',
            size === 'lg' && 'grid-cols-2',
            size === 'md' && 'grid-cols-1',
            size === 'sm' && 'grid-cols-1 gap-2',
          )}
        >
          {myMenu.map((menu) => (
            <Link
              key={menu.url}
              href={menu.url}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-slate-50',
                pathname === menu.url ? 'border-blue-200 bg-blue-50 shadow-sm' : 'border-slate-200',
                size === 'sm' && 'p-2.5',
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-md',
                  pathname === menu.url ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600',
                )}
              >
                {menu.icon}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      'font-medium',
                      pathname === menu.url ? 'text-blue-900' : 'text-slate-700',
                      size === 'sm' && 'text-sm',
                    )}
                  >
                    {menu.title}
                  </p>
                  {menu.badge && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {menu.badge}
                    </Badge>
                  )}
                </div>
                {size !== 'sm' && <p className="text-xs text-slate-500">{menu.description}</p>}
              </div>

              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
