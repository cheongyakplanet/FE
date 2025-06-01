'use client';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { useNewPost } from '@/services/community/hooks/useGetPost';

const categories = [
  { value: 'REVIEW', label: '후기' },
  { value: 'SUBSCRIPTION_INFO', label: '청약정보' },
  { value: 'CHITCHAT', label: '잡담' },
  { value: 'INFO_SHARE', label: '정보공유' },
  { value: 'QUESTION', label: '질문' },
];

export default function post() {
  const router = useRouter();
  const { mutate: newPost } = useNewPost();
  const [newPostData, setNewPostData] = useState({ title: '', content: '' });
  const [alert, setAlert] = useState('');
  const [postCategory, setPostCategory] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPostData({
      ...newPostData,
      [e.target.name]: e.target.value,
    });
  };

  const postNewPost = () => {
    if (!checkTrim()) return;
    newPost({ ...newPostData, postCategory });
    router.push('/community');
  };

  const checkTrim = () => {
    if (newPostData.title.trim() === '' || newPostData.content.trim() === '') {
      setAlert('공백이 있는 글은 등록할 수 없습니다.');
      return false;
    } else {
      setAlert('');
      return true;
    }
  };

  return (
    <div className="flex animate-fade-in flex-col items-center">
      <div className="mb-4 text-center text-xl font-extrabold text-gray-800">이곳에 여러분의 이야기를 남겨주세요!</div>
      <div className="flex">
        <div className="mb-3 text-gray-600">
          📢 청약 정보를 나누고 소통하는 공간이에요! 예쁜 말로 서로를 배려해주세요.
        </div>
      </div>

      <Card className="mb-10 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
        <CardHeader className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800">제목</label>
          <Input
            name="title"
            value={newPostData.title}
            onChange={handleChange}
            placeholder="제목을 입력해 주세요."
            className="rounded-md border-gray-300 px-4 py-3 text-base placeholder:text-gray-400"
          />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-800">카테고리</label>
            <ToggleGroup
              type="single"
              variant="outline"
              value={postCategory}
              onValueChange={(val) => setPostCategory(val)}
              className="flex flex-wrap gap-3"
            >
              {categories.map((item) => (
                <ToggleGroupItem
                  key={item.value}
                  value={item.value}
                  className="rounded-full border px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-orange-50 data-[state=on]:border-orange-300 data-[state=on]:bg-orange-100 data-[state=on]:text-orange-900"
                >
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-800">내용</label>
            <Textarea
              name="content"
              value={newPostData.content}
              onChange={handleChange}
              placeholder="내용을 입력해 주세요."
              rows={8}
              className="rounded-md border-gray-300 px-4 py-3 text-base placeholder:text-gray-400"
            />
            {alert && <div className="mt-3 text-center text-sm text-red-500">{alert}</div>}
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-4 pt-2">
          <Button onClick={() => router.push('/community')} className="bg-orange-300 text-white hover:bg-orange-400">
            취소
          </Button>
          <Button
            className="bg-orange-300 text-white hover:bg-orange-400"
            disabled={!postCategory || !newPostData.content || !newPostData.title}
            onClick={postNewPost}
          >
            등록하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
