'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

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

import { useGetPost } from '@/services/community/hooks/useGetPost';

import { useAllPostStore } from '@/stores/community';

export default function PostTable({ sort, searchWord }: { sort: string; searchWord: string }) {
  const { contents, totalPages } = useAllPostStore();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const filterContents = contents.filter(
    (content) => content.title.includes(searchWord) || content.content.includes(searchWord),
  );

  const goDetailPage = () => {
    router.push('/community/detail');
  };

  const { mutate: getPost } = useGetPost();

  useEffect(() => {
    getPost({ sort: sort, page: page - 1 });
  }, [sort, page]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>번호</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>글</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>좋아요 수</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterContents.map((content, index) => (
            <TableRow key={index} onClick={goDetailPage}>
              <TableCell>{content.id}</TableCell>
              <TableCell>{content.title}</TableCell>
              <TableCell>{content.content}</TableCell>
              <TableCell>{content.username}</TableCell>
              <TableCell>{content.createdAt}</TableCell>
              <TableCell>좋아요 수</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            ></PaginationPrevious>
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => setPage(index + 1)} isActive={index + 1 === page}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (page < totalPages) setPage(page + 1);
              }}
            ></PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
