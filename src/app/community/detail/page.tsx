'use client';

import Comment from '../components/comment';

import Link from 'next/link';

import { ArrowLeft, Eye, ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useDetailPostStore } from '@/stores/community';

export default function detail() {
  const detailPostStore = useDetailPostStore();

  return (
    <div className="space-y-10">
      <Link href="/community" className="flex space-y-1 underline">
        <ArrowLeft />
        전체 글 보러가기
      </Link>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>{detailPostStore.title}</CardTitle>
            </div>
            <div className="flex">
              <Eye />
              조회수 {detailPostStore.views}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              {detailPostStore.username} {detailPostStore.createdAt}
            </div>
            <div className="space-x-1">
              <Button className="bg-red-500">
                <ThumbsUp />
                좋아요 {detailPostStore.likes}
              </Button>
              <Button className="bg-blue-500">
                <ThumbsDown />
                싫어요
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>{detailPostStore.content}</div>
        </CardContent>
        <CardFooter>카드 footer</CardFooter>
      </Card>
      <div className="space-y-2">
        <Comment />
      </div>
    </div>
  );
}
