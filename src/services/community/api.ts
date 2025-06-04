import { NewPostDto, PostCommentDto, PostDto, PostReplyDto } from './types';

import api from '@/lib/api';

export const GET_post = async ({ sort, page }: PostDto) => {
  const response = await api.get('/api/community/posts', { params: { sort: sort, page: page } });
  return response.data.data;
};

export const GET_postDetail = async (id: string) => {
  const response = await api.get(`/api/community/post/${id}`);
  return response.data.data;
};

export const POST_comment = async ({ postId, content }: PostCommentDto) => {
  return await api.post(`/api/community/comment/${postId}`, { content });
};

export const POST_like = async (id: string) => {
  return await api.post(`api/community/post/like/${id}`);
};

export const POST_post = async ({ title, content, postCategory }: NewPostDto) => {
  return await api.post('/api/community/posts', { title, content, postCategory });
};

export const POST_reply = async ({ commentId, content }: PostReplyDto) => {
  return await api.post(`/api/community/comment/comment/${commentId}`, { content });
};

export const POST_dislike = async (id: string) => {
  return await api.post(`api/community/post/dislike/${id}`);
};
