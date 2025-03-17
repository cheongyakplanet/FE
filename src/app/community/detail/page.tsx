'use client';

import Comment from '../components/comment';
import NewPost from '../components/newPost';

import { useState } from 'react';

import Link from 'next/link';

import { ArrowLeft, Eye, ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { usePostLike } from '@/services/community/hooks/useGetPost';

import { useDetailPostStore } from '@/stores/community';

export default function detail() {
  const detailPostStore = useDetailPostStore();

  const { mutate: postLike } = usePostLike();

  const [like, setLike] = useState(detailPostStore.likes);
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const updateLike = () => {
    setLike(like + 1);
    setIsLikeClicked(true);
    postLike(detailPostStore.id);
  };

  return (
    <div className="space-y-10">
      <NewPost />
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
              <Button onClick={updateLike} className="bg-red-500" disabled={isLikeClicked}>
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
