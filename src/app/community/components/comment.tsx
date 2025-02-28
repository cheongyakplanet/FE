'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Comment() {
  const [comment, setComment] = useState('');

  const handleComment = () => {
    setComment("");
  }

  return (
    <div>
      <Textarea 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="댓글을 작성해 주세요." />
      <Button 
        onClick={handleComment}
        className="w-full">댓글 달기</Button>

      <div>{comment}</div>
    </div>
  );
}
