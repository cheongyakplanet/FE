'use client';

import Comment from '../components/comment';
import NewPost from '../components/newPost';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ArrowLeft, Eye, ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetPostDetail, usePostLike } from '@/services/community/hooks/useGetPost';

export default function detail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data } = useGetPostDetail(id as string);
  const [like, setLike] = useState(data?.likes);

  const { mutate: PostLike } = usePostLike();

  const updateLike = (id: string) => {
    setLike(like + 1);
    PostLike(id);
  };

  useEffect(() => {
    setLike(data?.likes);
  }, [data]);

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
              <CardTitle>{data?.title}</CardTitle>
            </div>
            <div className="flex">
              <Eye />
              조회수 {data?.views}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              {data?.username} {data?.createdAt}
            </div>
            <div className="space-x-1">
              <Button onClick={() => updateLike(data?.id)} className="bg-red-500">
                <ThumbsUp />
                좋아요 {like}
              </Button>
              <Button className="bg-blue-500">
                <ThumbsDown />
                싫어요
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>{data?.content}</div>
        </CardContent>
        <CardFooter>카드 footer</CardFooter>
      </Card>
      <div className="space-y-2">
        <Comment postId={data?.postId} comments={data?.comments} />
      </div>
    </div>
  );
}
