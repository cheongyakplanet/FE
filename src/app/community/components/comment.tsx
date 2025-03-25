'use client';

import '@/assets/styles/community.css';

import { useEffect, useState } from 'react';

import Dayjs from 'dayjs';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import auth from '@/lib/auth';

import { usePostComment, usePostReply } from '@/services/community/hooks/useGetPost';

interface Comments {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string | undefined;
  replies: Reply[];
}

interface Reply {
  id: string;
  createdAt: string;
  createdBy: string | undefined;
  content: string;
}

export default function Comment({ postId, comments: initComments }: { postId: string; comments: Comments[] }) {
  const today = new Date();
  const memberName = auth();

  const [content, setContent] = useState('');
  const [reply, setReply] = useState('');
  const [comments, setComments] = useState<Comments[]>(initComments);
  const { mutate: postComment } = usePostComment();
  const { mutate: postReply } = usePostReply();
  const [showReply, setShowReply] = useState<string | null>('');

  const handleComment = (content: string) => {
    const newComment = {
      id: '',
      content,
      createdAt: Dayjs(today).format('YYYY-MM-DD'),
      createdBy: memberName,
      replies: [],
    };
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

  const toggleReply = (id: string) => {
    setShowReply((prev) => (prev === id ? null : id));
  };

  const handleReply = async (reply: string, commentId: string) => {
    const newReply = { id: '', createdAt: Dayjs(today).format('YYYY-MM-DD'), createdBy: memberName, content: reply };
    const updateComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
    );
    setComments(updateComments);
    postReply({ commentId, content: reply });
    setReply('');
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
                <div className="w-full">
                  <div className="flex">
                    <p>{comment.createdBy}</p>
                    <p className="ml-3 text-gray-500">{Dayjs(comment.createdAt).format('YYYY-MM-DD')}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <AccordionTrigger
                      className={comment.replies?.length == 0 ? 'no-arrow pointer-events-none cursor-default' : ''}
                    >
                      {comment.content}
                    </AccordionTrigger>
                    <div className="flex">
                      <button onClick={() => toggleReply(comment.id)} className="ml-10 text-sm hover:underline">
                        [답글 달기]
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {showReply === comment.id && (
                <div className="relative mb-3 pl-10">
                  <Textarea
                    className="h-16 resize-none rounded-2xl pr-20"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="댓글을 작성해 주세요."
                  />
                  <Button
                    onClick={() => handleReply(reply, comment.id)}
                    className="absolute bottom-3 right-3 rounded-2xl"
                  >
                    댓글 달기
                  </Button>
                </div>
              )}
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
