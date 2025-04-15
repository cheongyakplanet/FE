'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useGetMypage } from '@/services/member/hooks/useGetMypage';

export default function Region() {
  const { data: getMypage } = useGetMypage();
  const mypage = getMypage?.data;
  const data = Array.isArray(mypage?.interestLocals)
    ? mypage.interestLocals.map((local, index) => ({
        id: index,
        interestLocal: local,
      }))
    : [];

  const table = useReactTable({
    data,
    columns: [
      {
        accessorKey: 'interestLocal',
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>관심지역</TableHead>
            <TableHead>삭제</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.original.interestLocal}</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
