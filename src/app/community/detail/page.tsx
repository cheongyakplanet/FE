'use client';

import Comment from '../components/comment';
import NewPost from '../components/newPost';

import { Suspense, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import dayjs from 'dayjs';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  MessageCircle,
  Send,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import auth from '@/lib/auth';

import { useGetPostDetail, usePostComment, usePostDislike, usePostLike } from '@/services/community/hooks/useGetPost';

export default function detail() {
  return (
    <Suspense
      fallback={
        <div className="flex h-48 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
            <p className="text-sm text-slate-500">게시글을 불러오는 중입니다...</p>
          </div>
        </div>
      }
    >
      <DetailContent />
    </Suspense>
  );
}

function DetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const memberName = auth();

  const { data } = useGetPostDetail(id as string);
  const [like, setLike] = useState(data?.likes);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const commentFormRef = useRef<HTMLDivElement>(null);

  const { mutate: PostLike } = usePostLike();
  const { mutate: PostDislike } = usePostDislike();
  const { mutate: postComment } = usePostComment();

  const updateLike = (id: string) => {
    setLike(like + 1);
    PostLike(id);
  };

  const updateDislike = (id: string) => {
    setLike(like - 1);
    PostDislike(id);
  };

  const handleComment = (content: string) => {
    if (!content.trim()) return;

    postComment(
      { postId: data?.id, content },
      {
        onSuccess: () => {
          setNewComment('');
          // 이상적으로는 여기에 댓글 목록을 새로고침하는 로직이 필요합니다.
        },
      },
    );
  };

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
    // 폼이 보이게 될 때 자동으로 스크롤
    if (!showCommentForm) {
      setTimeout(() => {
        commentFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  useEffect(() => {
    setLike(data?.likes);
  }, [data]);

  if (!data) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-slate-500">게시글이 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          onClick={() => router.push('/community')}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>목록으로 돌아가기</span>
        </Button>
      </div>

      <Card className="mb-8 border border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="outline" className="mb-2 text-xs font-normal text-slate-600">
                {data.category || '정보공유'}
              </Badge>
              <CardTitle className="text-xl font-semibold text-slate-900">{data.title}</CardTitle>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-700">
                  {data.username?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{data.username}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>{dayjs(data.createdAt).format('YYYY.MM.DD HH:mm')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Eye className="h-4 w-4" />
                <span>조회 {data.views}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="py-6">
          <div className="min-h-[200px] whitespace-pre-wrap text-slate-700">{data.content}</div>
        </CardContent>

        <Separator />

        <CardFooter className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MessageCircle className="h-4 w-4" />
            <span>{data.comments?.length || 0}개의 댓글</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm">
              <ThumbsUp className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">{like}</span>
            </div>

            <div className="flex gap-1">
              <Button
                onClick={() => updateLike(data.id)}
                size="sm"
                variant="outline"
                className="h-8 w-8 rounded-md p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => updateDislike(data.id)}
                size="sm"
                variant="outline"
                className="h-8 w-8 rounded-md p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* 댓글 영역 */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 hover:text-blue-600">
          <h3 className="text-base font-medium text-slate-900">댓글 {data.comments?.length || 0}개</h3>
        </div>

        {/* 댓글 목록 */}
        <Comment postId={data.id} comments={data.comments} />
      </div>

      <NewPost />
    </div>
  );
}
