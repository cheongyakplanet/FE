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

export default function community() {
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState('time');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Home className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-900">청약 커뮤니티</h1>
        </div>
        <div className="mt-2 flex animate-wave items-center gap-2 text-slate-600">
          <Users className="h-4 w-4" />
          <p>함께 나누는 청약 이야기, 지금 확인해 보세요! 👀</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs value={sort} onValueChange={setSort} className="w-full md:w-auto">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>최신순</span>
            </TabsTrigger>
            <TabsTrigger value="views" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>조회수</span>
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>좋아요</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="rounded-full pl-10"
            placeholder="제목, 내용 검색하기"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
      </div>

      <Card className="mb-6 border-0 bg-white/80 shadow-sm backdrop-blur-sm">
        <CardContent className="p-0">
          <PostTable sort={sort} searchWord={searchWord} />
        </CardContent>
      </Card>

      <NewPost />
    </div>
  );
}
