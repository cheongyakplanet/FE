"use client";

import { useAllPostStore } from "@/stores/community";
import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function community() {
  const {contents, totalPages, allPost} = useAllPostStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
  allPost(page - 1);
  }, [page])

  return (
    <div>
      <div className="font-bold">커뮤니티</div>
      <div>
        <p className="text-right">검색기능</p>
        <p className="text-left">좋아요 많은 순 / 내가 작성한 게시글 / 등등....</p>
      </div>
      
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
        {contents.map((content, index) => (
          <TableRow key={index}>
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
            onClick={() => { if(page > 1) setPage(page - 1) }}>
          </PaginationPrevious>
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink onClick={() => setPage(index+1)} isActive = {index+1 === page}>{index+1}</PaginationLink>
          </PaginationItem>
        ))}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem>
          <PaginationNext onClick={() => { if(page < totalPages) setPage(page + 1)} }></PaginationNext>
        </PaginationItem>

      </PaginationContent>
    </Pagination>

    </div>
  )
}
