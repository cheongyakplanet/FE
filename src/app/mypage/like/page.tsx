'use client';

import { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Calendar, Home, Info, MapPin, Pickaxe, Tag, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

import { useGetLikeSubscriptionAll } from '@/services/subscription/hooks/useGetLikeSubscriptionAll';
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
  columnHelper.accessor('rentSecdNm', { id: 'rentSecdNm' }),
  columnHelper.accessor('rceptBgnde', { id: 'rceptBgnde' }),
  columnHelper.accessor('rceptEndde', { id: 'rceptEndde' }),
  columnHelper.accessor('totSuplyHshldco', { id: 'totSuplyHshldco' }),
];

export default function Like() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto flex h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">청약 정보를 불러오는 중입니다...</p>
          </div>
        </div>
      }
    >
      <LikeContent />
    </Suspense>
  );
}

function LikeContent() {
  const params = useSearchParams();
  const page = params.get('page');
  const router = useRouter();

  const { data: getAllSubscription } = useGetLikeSubscriptionAll();

  const table = useTable({
    data: getAllSubscription?.data,
    columns,
    totalPages: Math.ceil((getAllSubscription?.data?.length || 0) / 6) || 1,
    totalElements: getAllSubscription?.data.length || 0,
    rowId: 'id',
    defaultPageIndex: parseInt(page ?? '1'),
    defaultPagingSize: 6,
  });

  const handlePageChange = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
  };

  const pageCount = table.getPageCount();
  const currentPage = parseInt(page ?? '1');

  const MAX_PAGE_NUMBER = 5;

  const startPage = Math.max(0, Math.min(currentPage - Math.floor(MAX_PAGE_NUMBER / 2), pageCount - MAX_PAGE_NUMBER));
  const endPage = Math.min(startPage + MAX_PAGE_NUMBER, pageCount);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    return dateString ? dayjs(dateString).format('YYYY.MM.DD') : '';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-blue-700">
          <Info className="h-5 w-5" />
          <p className="font-medium">총 {getAllSubscription?.data.length || 0}건의 관심 청약 정보가 있습니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            return (
              <Card
                className="relative flex h-full cursor-pointer flex-col border-0 transition-all hover:shadow-lg"
                key={row.id}
                onClick={() => router.push(`/subscription/${row.getValue('id')}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-500" />
                      <CardTitle className="line-clamp-1 text-lg">{row.getValue('houseNm')}</CardTitle>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <div
                      className={`flex items-center truncate rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800`}
                    >
                      <Tag className="mr-1 h-3.5 w-3.5" />
                      {row.getValue('rentSecdNm')}
                    </div>
                    <div className="flex items-center rounded-full border bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                      <Users className="mr-1 h-3.5 w-3.5" />
                      {row.getValue('totSuplyHshldco') || 0}세대
                    </div>
                  </div>

                  <CardDescription className="mt-2 flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {row.getValue('region')} {row.getValue('city')} {row.getValue('district')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium">접수기간:</span>
                      <span>
                        {formatDate(row.getValue('rceptBgnde'))} ~ {formatDate(row.getValue('rceptEndde'))}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Pickaxe className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium">시행사:</span>
                      <span className="line-clamp-1">{row.getValue('bsnsMbyNm')}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="mt-auto border-t border-gray-100 p-3">
                  <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                    자세히 보기
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-3 flex h-36 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10">
            <p className="text-center text-gray-500">청약 정보가 없습니다. 다른 조건으로 검색해보세요.</p>
          </div>
        )}
      </div>

      {table.getRowModel().rows?.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  href={`/mypage/like?page=${currentPage - 1 <= 0 ? 1 : currentPage - 1}`}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: endPage - startPage }, (_, i) => i + startPage).map((pageIndex) => {
                const currentPageIndex = pageIndex + 1;

                return (
                  <PaginationItem key={currentPageIndex}>
                    <PaginationLink
                      href={`/mypage/like?page=${currentPageIndex}`}
                      isActive={currentPageIndex === currentPage}
                      onClick={() => handlePageChange(currentPageIndex)}
                    >
                      {currentPageIndex}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  href={`/mypage/like?page=${currentPage + 1 >= pageCount ? pageCount : currentPage + 1}`}
                  className={currentPage >= pageCount ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
