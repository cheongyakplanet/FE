import { PostDto } from './types';

import api from '@/lib/api';

export const GET_post = async ({ sort, page }: PostDto) => {
  return await api.get('/api/community/posts', { params: { sort: sort, page: page } });
};

export const GET_postDetail = async (id: number) => {
  return await api.get(`/api/community/post/${id}`);
};
