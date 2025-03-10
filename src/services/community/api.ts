import { PostCommentDto, PostDto } from './types';

import api from '@/lib/api';

export const GET_post = async ({ sort, page }: PostDto) => {
  const response = await api.get('/api/community/posts', { params: { sort: sort, page: page } });
  return response.data;
};

export const GET_postDetail = async (id: number) => {
  return await api.get(`/api/community/post/${id}`);
};

export const POST_comment = async ({ postId, comment }: PostCommentDto) => {
  console.log('api', postId, comment);
  return await api.post(`/api/community/comment/${postId}`, { comment });
};

export const POST_like = async (id: number) => {
  return await api.post(`api/community/post/like/${id}`);
};
