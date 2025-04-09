'use client';

import { useSearchParams } from 'next/navigation';

import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { X } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function Posts() {
  const params = useSearchParams();
  const page = params.get('page');
  const { data: getMypost } = useGetMypost(parseInt(page ?? '0'), 6);

  const { mutate: deletMypost } = useDeleteMypost();

  const currentPage = parseInt(page ?? '0');

  const card = useTable({
    data: getMypost?.content,
    columns,
    totalPages: getMypost?.totalPages || 0,
    totalElements: getMypost?.totalElements || 0,
    rowId: 'id',
    defaultPageIndex: parseInt(page ?? '0'),
    defaultPagingSize: 6,
  });

  const deleteMypost = (id: string) => {
    deletMypost(id);
  };

  return (
    <div>
      <div className="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {card.getRowModel().rows.map((row) => (
          <Card key={row.getValue('id')}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{row.getValue('title')}</CardTitle>
                <button onClick={() => deleteMypost(row.getValue('id'))}>
                  <X size={16} />
                </button>
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
  );
}
