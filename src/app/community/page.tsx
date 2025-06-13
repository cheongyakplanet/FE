'use client';

import NewPost from './components/newPost';
import PostTable from './components/post-table';

import { useState } from 'react';

import { Clock, Eye, Home, MessageSquare, Search, ThumbsUp, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Community() {
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState('time');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-blue-500 md:h-6 md:w-6" />
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">청약 커뮤니티</h1>
        </div>
        <div className="mt-2 flex animate-wave items-center gap-2 text-slate-600">
          <Users className="h-4 w-4" />
          <p className="text-sm md:text-base">함께 나누는 청약 이야기, 지금 확인해 보세요! 👀</p>
        </div>
      </div>

      <div className="mb-6 space-y-4 md:flex md:flex-row md:items-center md:justify-between md:space-y-0 md:gap-4">
        <Tabs value={sort} onValueChange={setSort} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 md:flex md:w-auto md:space-x-1">
            <TabsTrigger value="time" className="flex items-center gap-1 md:gap-2">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">최신순</span>
            </TabsTrigger>
            <TabsTrigger value="views" className="flex items-center gap-1 md:gap-2">
              <Eye className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">조회수</span>
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex items-center gap-1 md:gap-2">
              <ThumbsUp className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">좋아요</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="rounded-full pl-10 text-sm md:text-base"
            placeholder="제목, 내용 검색하기"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
      </div>

      <Card className="mb-6 border-0 bg-white/80 shadow-sm backdrop-blur-sm">
        <CardContent className="p-0 md:p-6">
          <PostTable sort={sort} searchWord={searchWord} />
        </CardContent>
      </Card>

      <NewPost />
    </div>
  );
}
