'use client';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useNewPost } from '@/services/community/hooks/useGetPost';
import { NewPostDto } from '@/services/community/types';

export default function post() {
  const router = useRouter();
  const { mutate: newPost } = useNewPost();
  const [newPostData, setNewPostData] = useState({ title: '', content: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPostData({
      ...newPostData,
      [e.target.name]: e.target.value,
    });
  };

  const postNewPost = (newPostData: NewPostDto) => {
    newPost(newPostData);
    router.push('/community');
  };

  return (
    <div className="animate-fade-in flex flex-col items-center">
      <div className="mb-4 text-center">게시글을 작성해 주세요!</div>
      <Card className="w-3/5">
        <CardHeader>
          <div>제목</div>
          <Input name="title" value={newPostData.title} onChange={handleChange} placeholder="제목을 입력해 주세요." />
        </CardHeader>
        <CardContent>
          <div>내용</div>
          <Textarea
            name="content"
            value={newPostData.content}
            onChange={handleChange}
            placeholder="내용을 입력해 주세요."
          />
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            onClick={() => router.push('/community')}
            className="mr-20 w-20 bg-orange-300 text-indigo-950 hover:bg-orange-400"
          >
            취소
          </Button>
          <Button
            className="w-20 bg-orange-300 text-indigo-950 hover:bg-orange-400"
            onClick={() => postNewPost(newPostData)}
          >
            등록하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
