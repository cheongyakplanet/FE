import Link from 'next/link';

import { Heart, Map, NotebookPen, UserRoundCog } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

const myMenu = [
  {
    icon: <Heart size="20" />,
    title: '찜 목록',
    url: '/mypage/like',
  },
  {
    icon: <NotebookPen size="18" />,
    title: '내 게시글',
    url: '/mypage/posts',
  },
  {
    icon: <Map size="20" />,
    title: '관심 지역',
    url: '/mypage/region',
  },
  {
    icon: <UserRoundCog size="20" />,
    title: '내 정보',
    url: '/mypage/info',
  },
];

interface MyMenuProps {
  size?: 'md' | 'lg';
}
export default function MyMenu({ size = 'lg' }: MyMenuProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>내 메뉴</CardTitle>
      </CardHeader>
      <CardContent className={cn({ ['gap-5']: size === 'lg' }, { ['gap-1']: size === 'md' }, 'grid grid-cols-3')}>
        {myMenu.map((menu) => (
          <Link href={menu.url} key={menu.title}>
            <div className="flex animate-slide-bottom-sm cursor-pointer flex-col items-center justify-between gap-1 rounded-lg bg-indigo-50 px-4 pb-2 pt-3 text-indigo-950 shadow-md shadow-indigo-950/40 hover:animate-slide-top-sm hover:bg-indigo-300">
              {menu.icon}
              <span>{menu.title}</span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
