'use client';

import { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

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

import { useGetAllSubscription } from '@/services/subscription/hooks/useGetAllSubscription';
import { SubscriptionListDto } from '@/services/subscription/types';

const columnHelper = createColumnHelper<SubscriptionListDto>();
const columns = [
  columnHelper.accessor('id', { id: 'id' }),
  columnHelper.accessor('region', { id: 'region' }),
  columnHelper.accessor('city', { id: 'city' }),
  columnHelper.accessor('district', { id: 'district' }),
  columnHelper.accessor('houseManageNo', { id: 'houseManageNo' }),
  columnHelper.accessor('houseNm', { id: 'houseNm' }),
  columnHelper.accessor('bsnsMbyNm', { id: 'bsnsMbyNm' }),
  columnHelper.accessor('houseSecdNm', { id: 'houseSecdNm' }),
  columnHelper.accessor('rceptBgnde', { id: 'rceptBgnde' }),
  columnHelper.accessor('rceptEndde', { id: 'rceptEndde' }),
  columnHelper.accessor('totSuplyHshldco', { id: 'totSuplyHshldco' }),
];

export default function Subscription() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionContent />
    </Suspense>
  );
}

function SubscriptionContent() {
  const params = useSearchParams();
  const page = params.get('page');
  const router = useRouter();

  const { data: getAllSubscription } = useGetAllSubscription(parseInt(page ?? '1'), 3);
  console.log(getAllSubscription?.data.content);

  const table = useTable({
    data: getAllSubscription?.data.content,
    columns,
    totalPages: getAllSubscription?.data.totalPages || 0,
    totalElements: getAllSubscription?.data.totalElements || 0,
    rowId: 'id',
    defaultPageIndex: parseInt(page ?? '1'),
    defaultPagingSize: 3,
  });

  const handlePageChange = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
  };

  const pageCount = table.getPageCount();
  const currentPage = parseInt(page ?? '1');

  const MAX_PAGE_NUMBER = 3;

  const startPage = Math.max(0, Math.min(currentPage - Math.floor(MAX_PAGE_NUMBER / 2), pageCount - MAX_PAGE_NUMBER));
  const endPage = Math.min(startPage + MAX_PAGE_NUMBER, pageCount);

  return (
    <section className="w-full">
      <h1>맞춤 청약 리스트</h1>
      <div className="grid grid-cols-3 gap-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Card
              className="relative cursor-pointer"
              key={row.id}
              onClick={() => router.push(`/subscription/${row.id}`)}
            >
              <CardHeader>
                <CardTitle>
                  {row.getValue('region')} {row.getValue('city')} {row.getValue('district')} {row.getValue('houseNm')}
                </CardTitle>
                <CardDescription>
                  접수일 : {row.getValue('rceptBgnde')} ~ {row.getValue('rceptEndde')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span></span>
              </CardContent>
              <CardFooter className="absolute bottom-0 left-4 right-4 border-t-2 border-t-gray-200">
                <span className="text-sm text-gray-600">{row.getValue('bsnsMbyNm')}</span>
              </CardFooter>
            </Card>
          ))
        ) : (
          <span className="h-24 text-center">No results.</span>
        )}
      </div>

      <div className="space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                href={`/subscription?page=${currentPage - 1 <= 0 ? 1 : currentPage - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              {Array.from({ length: endPage - startPage }, (_, i) => i + startPage).map((pageIndex) => {
                const currentPageIndex = pageIndex + 1;

                return (
                  <PaginationLink
                    href={`/subscription?page=${currentPageIndex}`}
                    key={currentPageIndex}
                    isActive={currentPageIndex === currentPage}
                    onClick={() => handlePageChange(currentPageIndex)}
                  >
                    {currentPageIndex}
                  </PaginationLink>
                );
              })}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                href={`/subscription?page=${currentPage + 1 >= pageCount ? pageCount : currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
