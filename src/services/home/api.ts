import api from '@/lib/api';

import { ApiResponse } from '@/types/api-types';

/** 가장 인기 있는 지역 */
export const GET_popular_locations = async (): Promise<ApiResponse<string[]>> => {
  return await api.get('/api/main/popular-locations');
};
