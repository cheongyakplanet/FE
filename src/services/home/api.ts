import api from '@/lib/api';

import { ApiResponse } from '@/types/api-types';
import { PopularPostDto } from './types';

/** 가장 인기 있는 지역 */
export const GET_popular_locations = async (): Promise<ApiResponse<string[]>> => {
  return await api.get('/api/main/popular-locations');
};

/** 내 관심 지역 */
export const GET_my_locations = async (): Promise<ApiResponse<string[]>> => {
  return await api.get('api/main/my-locations');
};

/** 인기 게시글 */
export const GET_popular_post = async (): Promise<ApiResponse<PopularPostDto[]>> => {
  return await api.get('/api/main/popular-content');
};
