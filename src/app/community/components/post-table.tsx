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

import { useGetPost, useGetPostDetail } from '@/services/community/hooks/useGetPost';

interface PostDto {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
}

const truncateText = (text: string, maxLength: number = 10): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '....' : text;
};

export default function PostTable({ sort, searchWord }: { sort: string; searchWord: string }) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: posts } = useGetPost({ sort: sort, page: page - 1 });
  const { mutate: getPostDetail } = useGetPostDetail();

  const filterContents = (posts?.content || []).filter(
    (post: PostDto) => post.title.includes(searchWord) || post.content.includes(searchWord),
  );

  const goDetailPage = (id: number) => {
    getPostDetail(id);
    router.push('/community/detail');
  };

  useEffect(() => {
    setPage(1);
  }, [sort]);

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
          {filterContents?.map((post: PostDto) => (
            <TableRow key={post.id} onClick={() => goDetailPage(post.id)}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{truncateText(post.title)}</TableCell>
              <TableCell>{truncateText(post.content)}</TableCell>
              <TableCell>{post.username}</TableCell>
              <TableCell>{post.createdAt}</TableCell>
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

          {[...Array(posts?.totalPages)].map((_, index) => (
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
                if (page < posts?.totalPages) setPage(page + 1);
              }}
            ></PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
