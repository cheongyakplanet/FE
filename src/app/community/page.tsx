'use client';

import PostTable from './components/post-table';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function community() {
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState('time');

  return (
    <div>
      <div className="font-bold">커뮤니티</div>
      <div>
        <p className="text-left">내가 작성한 게시글 / 등등....</p>
      </div>

      <div className="flex justify-between">
        <Tabs value={sort} onValueChange={setSort}>
          <TabsList>
            <TabsTrigger value="time">최신순</TabsTrigger>
            <TabsTrigger value="views">조회수</TabsTrigger>
            <TabsTrigger value="likes">좋아요</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          className="w-1/5"
          placeholder="검색어를 입력하세요."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <PostTable sort={sort} searchWord={searchWord} />
    </div>
  );
}
