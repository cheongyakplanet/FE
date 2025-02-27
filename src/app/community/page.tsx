'use client';

import PostTable from './components/post-table';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function community() {
  const [searchWord, setSearchWord] = useState('');
  return (
    <div>
      <div className="font-bold">커뮤니티</div>
      <div>
        <p className="text-left">내가 작성한 게시글 / 등등....</p>
      </div>

      <div className="flex justify-between">
        <Tabs defaultValue="time">
          <TabsList>
            <TabsTrigger value="time">시간순</TabsTrigger>
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

      <Tabs defaultValue="time">
        <TabsContent value="time">
          <PostTable sort="times" searchWord={searchWord} />
        </TabsContent>
        <TabsContent value="views">
          <PostTable sort="views" searchWord={searchWord} />
        </TabsContent>
        <TabsContent value="likes">
          <PostTable sort="likes" searchWord={searchWord} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
