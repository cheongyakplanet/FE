"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PostTable from "./components/post-table";

export default function community() {
  return (
    <div>
      <div className="font-bold">커뮤니티</div>
      <div>
        <p className="text-right">검색기능</p>
        <p className="text-left">좋아요 많은 순 / 내가 작성한 게시글 / 등등....</p>
      </div>

      <Tabs defaultValue="time">
        <TabsList>
          <TabsTrigger value="time">시간순</TabsTrigger>
          <TabsTrigger value="views">많이 본 순</TabsTrigger>
          <TabsTrigger value="likes">좋아요 많은 순</TabsTrigger>
        </TabsList>
        <TabsContent value="time"><PostTable sort="times"/></TabsContent>
        <TabsContent value="views"><PostTable sort="views"/></TabsContent>
        <TabsContent value="likes"><PostTable sort="likes"/></TabsContent>
      </Tabs>
    </div>
  )
}
