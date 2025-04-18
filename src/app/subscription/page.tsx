'use client';

import { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { createColumnHelper } from '@tanstack/react-table';
import { Building, Calendar, Home, Info, ListFilter, MapPin, Tag, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
      <SubscriptionContent />
    </Suspense>
  );
}

function SubscriptionContent() {
  const params = useSearchParams();
  const page = params.get('page');
  const router = useRouter();

  const { data: getAllSubscription } = useGetAllSubscription(parseInt(page ?? '1'), 6);

  const table = useTable({
    data: getAllSubscription?.data.content,
    columns,
    totalPages: getAllSubscription?.data.totalPages || 0,
    totalElements: getAllSubscription?.data.totalElements || 0,
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
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  // 주택 유형에 따른 색상 및 아이콘 결정 함수
  const getHouseTypeInfo = (houseType: string) => {
    const types: Record<string, { color: string; icon: React.ReactNode }> = {
      공공분양: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <Building className="mr-1 h-3.5 w-3.5" /> },
      민간분양: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <Building className="mr-1 h-3.5 w-3.5" />,
      },
      임대주택: {
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: <Home className="mr-1 h-3.5 w-3.5" />,
      },
      행복주택: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <Home className="mr-1 h-3.5 w-3.5" />,
      },
    };

    return (
      types[houseType] || {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: <Tag className="mr-1 h-3.5 w-3.5" />,
      }
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <ListFilter className="h-8 w-8 text-blue-500" />
          맞춤 청약 리스트
        </h1>
        <p className="text-gray-600">관심 지역의 청약 정보를 확인하고 신청해보세요.</p>
      </div>

      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-blue-700">
          <Info className="h-5 w-5" />
          <p className="font-medium">총 {getAllSubscription?.data.totalElements || 0}건의 청약 정보가 있습니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const houseType = row.getValue('houseSecdNm') as string;
            const typeInfo = getHouseTypeInfo(houseType);

            return (
              <Card
                className="relative flex h-full cursor-pointer flex-col border-0 transition-all hover:shadow-lg"
                key={row.id}
                onClick={() => router.push(`/subscription/${row.id}`)}
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
                      className={`flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeInfo.color}`}
                    >
                      {typeInfo.icon}
                      {houseType}
                    </div>
                    <div className="flex items-center rounded-full border bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                      <Users className="mr-1 h-3.5 w-3.5" />
                      {row.getValue('totSuplyHshldco')}세대
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
                      <span className="font-medium">접수기간:</span>
                      <span>
                        {formatDate(row.getValue('rceptBgnde'))} ~ {formatDate(row.getValue('rceptEndde'))}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">시행사:</span>
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
                  href={`/subscription?page=${currentPage - 1 <= 0 ? 1 : currentPage - 1}`}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: endPage - startPage }, (_, i) => i + startPage).map((pageIndex) => {
                const currentPageIndex = pageIndex + 1;

                return (
                  <PaginationItem key={currentPageIndex}>
                    <PaginationLink
                      href={`/subscription?page=${currentPageIndex}`}
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
                  href={`/subscription?page=${currentPage + 1 >= pageCount ? pageCount : currentPage + 1}`}
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
