'use client';

import '@/assets/styles/community.css';

import { useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { usePostComment } from '@/services/community/hooks/useGetPost';

import { useDetailPostStore } from '@/stores/community';

export default function Comment() {
  const { comments, id } = useDetailPostStore();
  const [comment, setComment] = useState('');
  const { mutate: postComment } = usePostComment();

  const handleComment = (postId: number, comment: string) => {
    postComment({ postId, comment });
    setComment('');
  };

  return (
    <div>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 작성해 주세요." />
      <Button onClick={() => handleComment(id, comment)} className="w-full">
        댓글 달기
      </Button>

      <Accordion type="multiple">
        {comments.map((comment, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger className={comment.replies?.length == 0 ? 'no-arrow' : ''}>
              {comment.content}
            </AccordionTrigger>
            {comment.replies?.length > 0 &&
              comment.replies.map((reply, index) => <AccordionContent key={index}>{reply.content}</AccordionContent>)}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
