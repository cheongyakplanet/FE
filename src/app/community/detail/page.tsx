'use client';

import Comment from '../components/comment';
import NewPost from '../components/newPost';

import { Suspense, useEffect, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import dayjs from 'dayjs';
import { ArrowLeft, Eye, Heart, ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetPostDetail, usePostDislike, usePostLike } from '@/services/community/hooks/useGetPost';

export default function detail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailContent />
    </Suspense>
  );
}

function DetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data } = useGetPostDetail(id as string);
  const [like, setLike] = useState(data?.likes);

  const { mutate: PostLike } = usePostLike();
  const { mutate: PostDislike } = usePostDislike();

  const updateLike = (id: string) => {
    setLike(like + 1);
    PostLike(id);
  };

  const updateDislike = (id: string) => {
    setLike(like - 1);
    PostDislike(id);
  };

  useEffect(() => {
    setLike(data?.likes);
  }, [data]);

  return (
    <div className="space-y-5">
      <NewPost />
      <Link href="/community" className="flex space-y-1 underline">
        <ArrowLeft />
        전체 글 보러가기
      </Link>
      <Card>
        <CardHeader>
          <div>
            <div>
              <CardTitle>{data?.title}</CardTitle>
              <div className="mt-3">
                {data?.username} {dayjs(data?.createdAt).format('YYYY-MM-DD')}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>{data?.content}</CardContent>
        <div className="my-4 border-t border-gray-300" />

        <CardFooter>
          <Eye />
          조회수 {data?.views}
          <Heart className="ml-3" />
          좋아요 {like}
          <div className="flex space-x-1">
            <Button onClick={() => updateLike(data?.id)} className="ml-3 bg-red-500 hover:bg-red-600">
              <ThumbsUp />
            </Button>
            <Button onClick={() => updateDislike(data?.id)} className="bg-blue-500 hover:bg-blue-600">
              <ThumbsDown />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="space-y-2">{data?.comments && <Comment postId={data.id} comments={data.comments} />}</div>
    </div>
  );
}
