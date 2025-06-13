'use client';

import '@/assets/styles/community.css';

import { useEffect, useState } from 'react';

import Dayjs from 'dayjs';
import { Calendar, MessageCircle, Send, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Separator } from '@/components/ui/separator';
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
    if (!content.trim()) return;

    const newComment = {
      id: '',
      content,
      createdAt: Dayjs(today).format('YYYY-MM-DD'),
      createdBy: memberName ?? '',
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
    setShowReply(null);

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
    if (!reply.trim()) return;

    const newReply = {
      id: '',
      createdAt: Dayjs(today).format('YYYY-MM-DD'),
      createdBy: memberName ?? '',
      content: reply,
    };
    const updateComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
    );
    setComments(updateComments);
    postReply({ commentId, content: reply });
    setReply('');
    setShowReply(null);
  };

  useEffect(() => {
    setComments(initComments);
  }, [initComments]);

  return (
    <div className="space-y-6">
      {/* 새 댓글 작성 폼 */}
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">새 댓글 작성</span>
          </div>
          <div className="relative">
            <Textarea
              className="min-h-24 resize-none border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:ring-slate-200"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 작성해 주세요. 마크다운 문법을 사용할 수 있습니다."
            />
            <Button
              onClick={() => handleComment(content)}
              size="sm"
              className="absolute bottom-2 right-2 h-8 gap-1 bg-slate-100 px-3 text-slate-700 hover:bg-slate-200"
              disabled={!content.trim()}
            >
              <Send className="h-3.5 w-3.5" />
              <span className="text-xs">댓글 등록</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 댓글 목록 */}
      {comments && comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment: Comments, index: number) => (
            <div key={index} className="space-y-3">
              {/* 댓글 */}
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <Avatar className="h-8 w-8 border border-slate-200">
                        <AvatarFallback className="bg-slate-100 text-sm text-slate-600">
                          {comment.createdBy?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">{comment.createdBy}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>{Dayjs(comment.createdAt).format('YY.MM.DD')}</span>
                        </div>
                      </div>
                      <div className="text-sm text-slate-700">
                        <MarkdownRenderer 
                          content={comment.content}
                          className="prose-p:mb-2 prose-p:text-sm prose-p:text-slate-700"
                        />
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReply(comment.id)}
                          className="h-7 gap-1 px-2 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MessageCircle className="h-3 w-3" />
                          {showReply === comment.id ? '취소' : '답글 달기'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* 답글 작성 폼 */}
                  {showReply === comment.id && (
                    <div className="mt-3 border-t border-slate-100 pl-11 pt-3">
                      <div className="relative">
                        <Textarea
                          className="min-h-20 resize-none border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:ring-slate-200"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="답글을 작성해 주세요. 마크다운 문법을 사용할 수 있습니다."
                        />
                        <Button
                          onClick={() => handleReply(reply, comment.id)}
                          size="sm"
                          className="absolute bottom-2 right-2 h-7 gap-1 bg-slate-100 px-3 text-xs text-slate-700 hover:bg-slate-200"
                          disabled={!reply.trim()}
                        >
                          <Send className="h-3 w-3" />
                          답글 등록
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* 답글 목록 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 space-y-3 border-t border-slate-100 pl-11 pt-3">
                      {comment.replies.map((reply: Reply, replyIdx: number) => (
                        <div key={replyIdx} className="flex items-start gap-3">
                          <div className="pt-0.5">
                            <Avatar className="h-7 w-7 border border-slate-200">
                              <AvatarFallback className="bg-slate-100 text-xs text-slate-600">
                                {reply.createdBy?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-700">{reply.createdBy}</span>
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Calendar className="h-3 w-3" />
                                <span>{Dayjs(reply.createdAt).format('YY.MM.DD')}</span>
                              </div>
                            </div>
                            <div className="text-sm text-slate-700">
                              <MarkdownRenderer 
                                content={reply.content}
                                className="prose-p:mb-1 prose-p:text-sm prose-p:text-slate-700"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
        </div>
      )}
    </div>
  );
}
