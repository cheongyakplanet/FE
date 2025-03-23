'use client';

import '@/assets/styles/community.css';

import { useEffect, useState } from 'react';

import Dayjs from 'dayjs';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { usePostComment } from '@/services/community/hooks/useGetPost';

interface Comments {
  content: string;
  createdAt: string;
  createdBy: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  createdAt: string;
  createdBy: string;
  content: string;
}

export default function Comment({ postId, comments: initComments }: { postId: string; comments: Comments[] }) {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comments[]>(initComments);
  const { mutate: postComment } = usePostComment();

  const handleComment = (content: string) => {
    const newComment = { content, createdAt: '', createdBy: '', replies: [] };

    setComments((prev) => [...prev, newComment]);

    postComment(
      { postId, content },
      {
        onError: () => {
          setComments((prev) => prev.filter((c) => c.content !== newComment.content));
        },
      },
    );
    setContent('');
  };

  useEffect(() => {
    setComments(initComments);
  }, [initComments]);

  return (
    <div>
      <div className="relative w-full">
        💬 한마디 남겨주세요!
        <Textarea
          className="h-16 resize-none rounded-2xl pr-20"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 작성해 주세요."
        />
        <Button onClick={() => handleComment(content)} className="absolute bottom-3 right-3 rounded-2xl">
          댓글 달기
        </Button>
      </div>
      <div className="my-4 border-t border-gray-300" />
      <div className="text-lg">🧡 소중한 의견들이 도착했어요 🧡</div>

      <div className="mt-4 pl-4">
        <Accordion type="multiple">
          {comments?.map((comment: Comments, index: number) => (
            <AccordionItem className="mt-2" key={index} value={index.toString()}>
              <div className="flex gap-2">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="https://github.com/woo427.png" alt="smile" />
                  <AvatarFallback>smile</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex">
                    <p>{comment.createdBy}</p>
                    <p className="ml-3 text-gray-500">{Dayjs(comment.createdAt).format('YYYY-MM-DD')}</p>
                  </div>
                  <AccordionTrigger
                    className={comment.replies?.length == 0 ? 'no-arrow pointer-events-none cursor-default' : ''}
                  >
                    {comment.content}
                  </AccordionTrigger>
                </div>
              </div>
              {comment.replies?.length > 0 &&
                comment.replies.map((reply: Reply, index: number) => (
                  <AccordionContent key={index} className="pl-10">
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src="https://github.com/woo427.png" alt="smile" />
                        <AvatarFallback>smile</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex">
                          <p>{reply.createdBy}</p>
                          <p className="ml-3 text-gray-500">{Dayjs(reply.createdAt).format('YYYY-MM-DD')}</p>
                        </div>
                        <p>{reply.content}</p>
                      </div>
                    </div>
                  </AccordionContent>
                ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
