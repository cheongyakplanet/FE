'use client';

import { Suspense, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { FolderOpen, Pencil, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import useTable from '@/hooks/useTable';

import { useDeleteMypost } from '@/services/member/hooks/useDeleteMypost';
import { useGetMypost } from '@/services/member/hooks/useGetMypost';
import { MyPostDto } from '@/services/member/types';

const columnHelper = createColumnHelper<MyPostDto>();
const columns = [
  columnHelper.accessor('id', { id: 'id' }),
  columnHelper.accessor('title', { id: 'title' }),
  columnHelper.accessor('content', { id: 'content' }),
  columnHelper.accessor('username', { id: 'username' }),
  columnHelper.accessor('views', { id: 'views' }),
  columnHelper.accessor('likes', { id: 'likes' }),
  columnHelper.accessor('createdAt', { id: 'createdAt' }),
];

function PostContent() {
  const params = useSearchParams();
  const page = params.get('page');
  const { data: getMypost } = useGetMypost(parseInt(page ?? '0'), 6);

  const { mutate: deletMypost } = useDeleteMypost();

  const currentPage = parseInt(page ?? '0');

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const card = useTable({
    data: getMypost?.content,
    columns,
    totalPages: getMypost?.totalPages || 0,
    totalElements: getMypost?.totalElements || 0,
    rowId: 'id',
    defaultPageIndex: parseInt(page ?? '0'),
    defaultPagingSize: 6,
  });

  const deletePost = (id: string) => {
    deletMypost(id);
  };

  const editPost = () => {};

  return (
    <div>
      {getMypost?.content?.length! > 0 ? (
        <div>
          <div className="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {card.getRowModel().rows.map((row) => (
              <Card key={row.getValue('id')}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{row.getValue('title')}</CardTitle>

                    <div className="space-x-2">
                      <Dialog>
                        <DialogTrigger
                          onClick={() => {
                            setEditTitle(row.getValue('title'));
                            setEditContent(row.getValue('content'));
                          }}
                        >
                          <Pencil className="text-gray-500 hover:text-indigo-800" size={16} />
                        </DialogTrigger>

                        <DialogContent className="rounded-xl">
                          <DialogHeader className="mb-4">
                            <DialogTitle className="flex space-x-1 text-lg font-semibold">
                              <Pencil />
                              <p>게시글 수정</p>
                            </DialogTitle>
                            <DialogDescription className="text-xs text-gray-500">
                              {dayjs(row.getValue('createdAt')).format('YYYY-MM-DD')}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700">제목</label>
                              <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium text-gray-700">내용</label>
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                rows={4}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <DialogFooter className="mt-6 flex justify-end gap-2">
                            <Button
                              onClick={editPost}
                              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                              완료
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <button
                        onClick={() => {
                          try {
                            deletePost(row.getValue('id'));
                            toast.success('게시글이 성공적으로 삭제되었습니다!', {
                              duration: 1500,
                            });
                          } catch (e) {
                            toast.error('게시글 삭제에 실패했습니다. 다시 시도해 주세요!');
                          }
                        }}
                      >
                        <X className="text-gray-500 hover:text-indigo-800" size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <CardDescription>{row.getValue('username')}</CardDescription>
                    <CardDescription className="text-xs">
                      {dayjs(row.getValue('createdAt')).format('YYYY-MM-DD')}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>{row.getValue('content')}</CardContent>
                <CardFooter>
                  <div className="mr-2">조회수: {row.getValue('views') === null ? 0 : row.getValue('views')}</div>
                  <div>좋아요: {row.getValue('likes')}</div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    card.previousPage();
                  }}
                  href={`/mypage/posts?page=${currentPage < 1 ? 0 : currentPage - 1}`}
                ></PaginationPrevious>
              </PaginationItem>

              {Array.from({ length: card.getPageCount() }).map((_, index) => {
                const currentPageIndex = index;

                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`/mypage/posts?page=${currentPageIndex}`}
                      onClick={() => card.setPageIndex(currentPageIndex)}
                      isActive={currentPageIndex === currentPage}
                    >
                      {currentPageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    card.nextPage();
                  }}
                  href={`/mypage/posts?page=${currentPage < card.getPageCount() - 1 ? currentPage + 1 : currentPage}`}
                ></PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <FolderOpen size={90} className="mb-1 mt-20 text-gray-400" strokeWidth={1} />
            <div>등록된 게시글이 없어요.</div>
            <div className="mt-1 text-sm text-gray-500">
              {' '}
              <Link href="/community/post" className="mr-1 text-sm text-gray-500 underline hover:text-gray-600">
                [게시글 작성하기]
              </Link>
              버튼을 눌러보세요!{' '}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Posts() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostContent />
    </Suspense>
  );
}
