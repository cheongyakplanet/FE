'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { createColumnHelper } from '@tanstack/react-table';

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
  const { data: getMypost } = useGetMypost(0, 5);

  const card = useTable({
    data: getMypost?.content,
    columns,
    totalPages: getMypost?.totalPages || 0,
    totalElements: getMypost?.totalElements || 0,
    rowId: 'id',
    defaultPageIndex: parseInt(page ?? '1'),
    defaultPagingSize: 5,
  });

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {card.getRowModel().rows.map((row) => (
          <Card key={row.getValue('id')}>
            <CardHeader>
              <CardTitle>{row.getValue('title')}</CardTitle>
              <CardDescription>{row.getValue('username')}</CardDescription>
              <CardDescription>{row.getValue('createdAt')}</CardDescription>
            </CardHeader>
            <CardContent>{row.getValue('content')}</CardContent>
            <CardFooter>
              <div className="mr-2">조회수: {row.getValue('views') === null ? 0 : row.getValue('views')}</div>
              <div>좋아요: {row.getValue('likes')}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 페이지네이션 */}
      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) currentPage - 1;
              }}
              href={`/mypage/posts?page=${currentPage - 1}`}
            ></PaginationPrevious>
          </PaginationItem>

          {[...Array(mypost?.totalPages)].map((_, index) => {
            const currentPageIndex = index + 1;

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/mypage/posts?page=${currentPageIndex}`}
                  onClick={() => currentPageIndex + 1}
                  isActive={index + 1 === currentPageIndex}
                >
                  {currentPageIndex}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < (mypost?.totalPages ?? 1)) setCurrentPage(currentPage + 1);
              }}
              href={`/mypage/posts?page=${currentPage}`}
            ></PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
}
