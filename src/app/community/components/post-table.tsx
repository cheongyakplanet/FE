'use client';

import { Fragment, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Script from 'next/script';

import dayjs from 'dayjs';
import { Clock, Eye, MessageCircle, ThumbsUp, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { GoogleAd } from '@/components/ui/google-ad';

import { useGetPost, useGetPostDetail } from '@/services/community/hooks/useGetPost';

interface PostDto {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  views: number;
  likes: number;
}

const truncateText = (text: string, maxLength: number = 50): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const truncateTextMobile = (text: string, maxLength: number = 30): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export default function PostTable({ sort, searchWord }: { sort: string; searchWord: string }) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: postsData } = useGetPost({ sort: sort, page: page - 1 });

  const allPosts: PostDto[] = postsData?.content || [];
  const totalPages = postsData?.totalPages || 0;

  const filterContents = allPosts.filter(
    (post: PostDto) => post.title.includes(searchWord) || post.content.includes(searchWord),
  );

  const goDetailPage = (id: number) => {
    router.push(`/community/detail?id=${id}`);
  };

  useEffect(() => {
    setPage(1);
  }, [sort]);

  // 임시 좋아요 수 및 댓글 수를 위한 함수
  const getCategory = (id: number) => {
    const categories = ['청약정보', '후기', '질문', '정보공유', '잡담'];
    return categories[id % categories.length];
  };

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-b">
              <TableHead className="w-[60px] text-xs font-medium text-slate-600">번호</TableHead>
              <TableHead className="text-xs font-medium text-slate-600">제목</TableHead>
              <TableHead className="w-[100px] text-xs font-medium text-slate-600">작성자</TableHead>
              <TableHead className="w-[100px] text-xs font-medium text-slate-600">작성일</TableHead>
              <TableHead className="w-[100px] text-right text-xs font-medium text-slate-600">상태</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterContents?.map((post: PostDto, idx: number) => (
              <Fragment key={post.id}>
                <TableRow
                  onClick={() => goDetailPage(post.id)}
                  className="cursor-pointer border-b transition-colors hover:bg-slate-50"
                >
                  <TableCell className="py-4 text-center text-sm text-slate-500">{post.id}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-normal text-slate-600">
                          {getCategory(post.id)}
                        </Badge>
                        <span className="font-medium text-slate-800">{post.title}</span>
                      </div>
                      <p className="text-xs text-slate-500">{truncateText(post.content)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">
                        {post.username.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-600">{post.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-xs text-slate-500">
                    {dayjs(post.createdAt).format('YY.MM.DD')}
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                {idx === 1 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-4">
                      <GoogleAd 
                        adSlot="5335419243"
                        adFormat="fluid"
                        layoutKey="-gu-3+1f-3d+2z"
                        style={{ width: '100%', height: '77px' }}
                        className="mx-auto w-full max-w-[720px]"
                      />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}

            {filterContents?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                    <Users className="h-8 w-8 text-slate-200" />
                    <p>게시글이 없습니다</p>
                    <p className="text-xs">첫 번째 게시글을 작성해보세요</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Layout */}
      <div className="block space-y-4 md:hidden">

        {filterContents?.map((post: PostDto, idx: number) => (
          <Fragment key={post.id}>
            <div
              onClick={() => goDetailPage(post.id)}
              className="cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-normal text-slate-600">
                    {getCategory(post.id)}
                  </Badge>
                  <span className="text-xs text-slate-400">#{post.id}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Eye className="h-3 w-3" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="mb-2 font-medium text-slate-800 leading-tight">{post.title}</h3>
              <p className="mb-3 text-sm text-slate-500 leading-relaxed">{truncateTextMobile(post.content)}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">
                    {post.username.charAt(0)}
                  </div>
                  <span className="text-sm text-slate-600">{post.username}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {dayjs(post.createdAt).format('MM.DD')}
                </span>
              </div>
            </div>

            {idx === 1 && (
              <div className="py-4">
                <GoogleAd 
                  adSlot="5335419243"
                  adFormat="fluid"
                  layoutKey="-gu-3+1f-3d+2z"
                  style={{ width: '100%', height: '77px' }}
                  className="mx-auto w-full max-w-[720px]"
                />
              </div>
            )}
          </Fragment>
        ))}

        {filterContents?.length === 0 && (
          <div className="flex h-32 flex-col items-center justify-center gap-2 text-slate-400">
            <Users className="h-8 w-8 text-slate-200" />
            <p>게시글이 없습니다</p>
            <p className="text-xs">첫 번째 게시글을 작성해보세요</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {[...Array(totalPages || 0)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(index + 1);
                  }}
                  isActive={index + 1 === page}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < (totalPages || 0)) setPage(page + 1);
                }}
                className={page >= (totalPages?.totalPages || 0) ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
