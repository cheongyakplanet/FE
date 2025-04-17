'use client';

import { useMemo, useState } from 'react';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { SquareMinus } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { MessageCircleWarning } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useDeleteRegion } from '@/services/member/hooks/useDeleteRegion';
import { useGetMypage } from '@/services/member/hooks/useGetMypage';
import { usePostInterestRegion } from '@/services/member/hooks/usePostInterestRegion';
import { useGetDistrict } from '@/services/region/hooks/useGetDistrict';
import { useGetRegion } from '@/services/region/hooks/useGetRegion';

export default function Region() {
  const { mutate: postRegion } = usePostInterestRegion();
  const { mutate: deleteRegion } = useDeleteRegion();
  const { data: getRegion } = useGetRegion();

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { data: getDistrict } = useGetDistrict(selectedCity);

  const { data: getMypage } = useGetMypage();
  const mypage = getMypage?.data;

  const data = useMemo(() => {
    return Array.isArray(mypage?.interestLocals)
      ? mypage.interestLocals.map((local, index) => {
          const [city, district] = local.split(' ');
          return {
            id: index,
            city,
            district,
          };
        })
      : [];
  }, [mypage?.interestLocals]);

  const table = useReactTable({
    data,
    columns: [
      {
        accessorKey: 'interestLocal',
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const deleteInterestRegion = (city: string, district: string) => {
    const region = city + ' ' + district;
    deleteRegion(region);
  };

  const addInterestRegion = () => {
    const region = selectedCity + ' ' + selectedDistrict;
    postRegion(region);
  };

  return (
    <div className="flex justify-center">
      <div className="mb-2 mt-5 flex rounded-xl border-2 border-slate-200 bg-amber-50 p-8 shadow-md">
        <MapPin className="mr-1" />
        <div>
          <div>나의 관심 지역 목록</div>
          <div className="text-xs text-gray-400">관심 지역을 기반으로 청약 추천이 제공됩니다.</div>

          {table.getRowModel().rows.length < 5 && (
            <div>
              <hr className="mb-2 mt-3 border-t border-gray-200" />
              <div className="mb-2 flex text-xs text-gray-500">
                <MessageCircleWarning size={16} />
                <div>최대 5개까지 등록할 수 있습니다.</div>
              </div>

              <div className="flex justify-center">
                <Select onValueChange={(value) => setSelectedCity(value)}>
                  <SelectTrigger className="h-8 w-40 text-xs">
                    <SelectValue placeholder="시/도를 선택해 주세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {getRegion?.map((region: string, index: number) => (
                      <SelectItem key={index} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSelectedDistrict(value)}>
                  <SelectTrigger className="h-8 w-40 text-xs">
                    <SelectValue placeholder="군/구를 선택해 주세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(getDistrict) &&
                      getDistrict?.map((district: string, index: number) => (
                        <SelectItem key={index} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <button onClick={addInterestRegion} className="mr-2 flex w-full items-center justify-end text-gray-600">
                  <SquarePlus size={22} strokeWidth={1} />
                </button>
              </div>
              <hr className="mt-2 border-t border-gray-200" />
            </div>
          )}

          <div className="mx-auto w-[500px]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-1/3">시/도</TableHead>
                  <TableHead className="w-1/3">군/구</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="transition-colors hover:bg-amber-100/80">
                    <TableCell className="w-1/3 py-2">{row.original.city}</TableCell>
                    <TableCell className="w-1/3 py-2">{row.original.district}</TableCell>
                    <TableCell className="w-1/3 justify-end py-2">
                      <div className="flex w-full justify-end">
                        <button onClick={() => deleteInterestRegion(row.original.city, row.original.district)}>
                          <SquareMinus size={22} strokeWidth={1} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
