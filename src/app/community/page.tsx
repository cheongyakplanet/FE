'use client';

import NewPost from './components/newPost';
import PostTable from './components/post-table';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function community() {
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState('time');

  return (
    <div>
      <div className="animate-wave mb-3 text-center text-xl">함께 나누는 청약 이야기, 지금 확인해 보세요! 👀</div>

      <div className="mb-2 flex justify-between">
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
      <NewPost />
    </div>
  );
}
