'use client';

import { Fragment, Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Award, Calendar, Home, Info, ListFilter, MapPin, Pickaxe, Search, Tag, Users, X } from 'lucide-react';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import useTable from '@/hooks/useTable';

import { useGetAllSubscription } from '@/services/subscription/hooks/useGetAllSubscription';
import { useGetCityList } from '@/services/subscription/hooks/useGetCityList';
import { useGetRegionList } from '@/services/subscription/hooks/useGetRegionList';
import { useGetSubscriptionByRegion } from '@/services/subscription/hooks/useGetSubscriptionByRegion';
import { SubscriptionListDto } from '@/services/subscription/types';

let hasPushedAd = false;
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
  const pageParam = params.get('page');
  const router = useRouter();

  const [page, setPage] = useState(Number(pageParam ?? '1'));

  // 지역 검색 상태
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isRegionSearch, setIsRegionSearch] = useState(false);

  // 지역 데이터 조회
  const { data: regionList } = useGetRegionList();
  const { data: cityList } = useGetCityList(selectedRegion);

  // 청약 데이터 조회 (전체 또는 지역별)
  const { data: getAllSubscription, isLoading: isLoadingAll } = useGetAllSubscription(parseInt(page ?? '0'), 6);
  const { data: regionSubscription, isLoading: isLoadingRegion } = useGetSubscriptionByRegion(
    selectedRegion,
    selectedCity,
  );

  // 현재 표시할 데이터 결정
  const currentData =
    isRegionSearch && regionSubscription
      ? {
          content: regionSubscription.data || [],
          totalPages: Math.ceil((regionSubscription.data?.length || 0) / 6),
          totalElements: regionSubscription.data?.length || 0,
          currentPage: 1,
          size: 6,
        }
      : getAllSubscription?.data;

  const isLoading = isRegionSearch ? isLoadingRegion : isLoadingAll;

  const table = useTable({
    data: currentData?.content || [],
    columns,
    totalPages: getAllSubscription?.data.totalPages || 0,
    totalElements: getAllSubscription?.data.totalElements || 0,
    rowId: 'id',
    defaultPageIndex: parseInt(page ?? '1'),
    defaultPagingSize: 6,
  });

  const rows = table.getRowModel().rows;

  const handlePageChange = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
  };

  const pageCount = table.getPageCount();
  const currentPage = parseInt(page ?? '1');

  const MAX_PAGE_NUMBER = 5;

  const startPage = Math.max(0, Math.min(currentPage - Math.floor(MAX_PAGE_NUMBER / 2), pageCount - MAX_PAGE_NUMBER));
  const endPage = Math.min(startPage + MAX_PAGE_NUMBER, pageCount);

  // 지역 선택 핸들러
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedCity(''); // 지역 변경시 도시 초기화
    setIsRegionSearch(false); // 검색 상태 초기화
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  // 지역 검색 실행
  const handleRegionSearch = () => {
    if (selectedRegion && selectedCity) {
      setIsRegionSearch(true);
      // URL 파라미터 업데이트
      router.push(
        `/subscription?region=${encodeURIComponent(selectedRegion)}&city=${encodeURIComponent(selectedCity)}`,
      );
    }
  };

  // 검색 초기화
  const handleResetSearch = () => {
    setSelectedRegion('');
    setSelectedCity('');
    setIsRegionSearch(false);
    router.push('/subscription');
  };

  // URL 파라미터에서 지역 정보 로드
  useEffect(() => {
    const regionParam = params.get('region');
    const cityParam = params.get('city');

    if (regionParam && cityParam) {
      setSelectedRegion(decodeURIComponent(regionParam));
      setSelectedCity(decodeURIComponent(cityParam));
      setIsRegionSearch(true);
    }
  }, [params]);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    return dateString ? dayjs(dateString).format('YYYY.MM.DD') : '';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">청약 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-6">
      {/* ───────────── 상단 헤더 ───────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-900">맞춤 청약 리스트</h1>
        </div>
        <div className="mt-2 flex animate-wave items-center gap-2 text-slate-600">
          <ListFilter className="h-4 w-4" />
          <p>관심 지역의 청약 정보를 확인하고 신청해보세요!</p>
        </div>
      </div>

      {/* ───────────── 지역 검색 필터 ───────────── */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">지역별 검색</h3>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          {/* 시/도 선택 */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">시/도</label>
            <Select value={selectedRegion} onValueChange={handleRegionChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="시/도를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {regionList?.data?.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 시/군/구 선택 */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">시/군/구</label>
            <Select value={selectedCity} onValueChange={handleCityChange} disabled={!selectedRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="시/군/구를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {cityList?.data?.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 검색 버튼 */}
          <div className="flex gap-2">
            <Button
              onClick={handleRegionSearch}
              disabled={!selectedRegion || !selectedCity}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="mr-2 h-4 w-4" />
              검색
            </Button>
            {isRegionSearch && (
              <Button variant="outline" onClick={handleResetSearch} className="border-gray-300">
                <X className="mr-2 h-4 w-4" />
                초기화
              </Button>
            )}
          </div>
        </div>

        {isRegionSearch && (
          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-700">
              <strong>
                {selectedRegion} {selectedCity}
              </strong>{' '}
              지역의 청약 정보를 표시하고 있습니다.
            </p>
          </div>
        )}
      </div>

      {/* ───────────── 총 개수 알림 ───────────── */}
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-blue-700">
          <Info className="h-5 w-5" />
          <p className="font-medium">
            {isRegionSearch
              ? `${selectedRegion} ${selectedCity} 지역에서 ${currentData?.totalElements || 0}건의 청약 정보가 있습니다.`
              : `총 ${currentData?.totalElements || 0}건의 청약 정보가 있습니다.`}
          </p>
        </div>
      </div>

      {/* ───────────── 카드형 그리드 (3열) ───────────── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rows.length ? (
          rows.map((row, idx) => (
            <Fragment key={row.id}>
              {/* ─── 개별 카드 ─── */}
              <Card
                className="relative flex h-full cursor-pointer flex-col border-0 transition-all hover:shadow-lg"
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
                    <div className="flex items-center truncate rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
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

              {/* ─── 6 번째 카드 뒤(idx === 2)에 광고 삽입 ─── */}
              {idx === 5 && (
                <div className="col-span-full flex justify-center">
                  <div>
                    {/* 
                      AdSense 스크립트: 페이지 한 번만 로드 
                      (네 번째 카드 뒤에 처음 등장할 때 실행됨)
                    */}
                    <Script
                      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7334667748813914"
                      strategy="afterInteractive"
                      crossOrigin="anonymous"
                    />
                    <div className="mx-auto w-full max-w-[356px]">
                      <ins
                        className="adsbygoogle"
                        style={{ display: 'block', width: '100%', height: '258px' }}
                        data-ad-client="ca-pub-7334667748813914"
                        data-ad-slot="8328709240"
                        data-ad-format="auto"
                      />
                    </div>
                    {/* 
                      adsbygoogle.push() 호출은 화면이 충분히 렌더링된 후 한 번만 실행 
                      (push() 자체를 새 컴포넌트로 분리하지 않고 여기서 직접 호출)
                    */}
                    <script
                      dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                          if (!window.hasPushedAd && window.adsbygoogle) {
                            try {
                              (adsbygoogle = window.adsbygoogle || []).push({});
                              window.hasPushedAd = true;
                            } catch (e) {
                              console.error(e);
                            }
                          }
                        })();`,
                      }}
                    />
                  </div>
                </div>
              )}
            </Fragment>
          ))
        ) : (
          <div className="col-span-full flex h-36 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10">
            <p className="text-center text-gray-500">청약 정보가 없습니다. 다른 조건으로 검색해보세요.</p>
          </div>
        )}
      </div>

      {/* ───────────── 페이지네이션 ───────────── */}
      {rows.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
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
                  onClick={() => {
                    if (currentPage < pageCount) handlePageChange(currentPage + 1);
                  }}
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
