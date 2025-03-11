import { SubscriptionDetailDto, SubscriptionListDto } from './types';

import api from '@/lib/api';

import { ApiResponse, FilterParams, PaginatedResponse } from '@/types/api-types';

/** 모든 청약 불러오기 */
export const GET_all_subscription = async ({
  params,
}: {
  params: FilterParams;
}): Promise<PaginatedResponse<SubscriptionListDto>> => {
  return await api.get('/api/info/subscription', { params });
};
/** id로 1건의 청약 물건 조회 */
export const GET_subscription_by_id = async (id: string): Promise<ApiResponse<SubscriptionDetailDto>> => {
  return await api.get(`/api/info/subscription/${id}`);
};
