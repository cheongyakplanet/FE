'use client';

import '@/assets/styles/community.css';

import { useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { usePostComment } from '@/services/community/hooks/useGetPost';

interface Comments {
  content: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
}

export default function Comment({ postId, comments }: { postId: string; comments: Comments[] }) {
  const [content, setContent] = useState('');
  const { mutate: postComment } = usePostComment();

  const handleComment = (postId: string, content: string) => {
    postComment({ postId, content });
    setContent('');
  };

  return (
    <div>
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="댓글을 작성해 주세요." />
      <Button onClick={() => handleComment(postId, content)} className="w-full">
        댓글 달기
      </Button>

      <Accordion type="multiple">
        {comments?.map((comment: Comments, index: number) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger className={comment.replies?.length == 0 ? 'no-arrow' : ''}>
              {comment.content}
            </AccordionTrigger>
            {comment.replies?.length > 0 &&
              comment.replies.map((reply: Reply, index: number) => (
                <AccordionContent key={index}>{reply.content}</AccordionContent>
              ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
