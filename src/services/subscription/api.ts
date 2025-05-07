import {
  LikeSubscriptionDto,
  LikeSubscriptionListDto,
  PriceSummaryDto,
  SubscriptionByMonthDto,
  SubscriptionDetailDto,
  SubscriptionListDto,
} from './types';

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

/** 관심 청약_1주일 이내 시작 */
export const GET_upcoming_subscription = async (): Promise<ApiResponse<LikeSubscriptionDto[]>> => {
  return await api.get('/api/info/subscription/like/upcoming');
};

/** 관심 청약_1주일 이내 종료  */
export const GET_closing_subscription = async (): Promise<ApiResponse<LikeSubscriptionDto[]>> => {
  return await api.get('/api/info/subscription/like/closing');
};

export const GET_subscription_by_month = async (
  year: string,
  month: string,
): Promise<ApiResponse<SubscriptionByMonthDto[]>> => {
  return await api.get('/api/info/subscription/bymonth', { params: { year: year, month: month } });
};

/** 관심 청약 여부 */
export const GET_like_subscription_by_id = async (subscriptionId: string) => {
  return await api.get(`/api/info/subscription/islike?id=${subscriptionId}`);
};

/** 관심 청약 추가 */
export const POST_like_subscription = async (subscriptionId: string) => {
  return await api.post(`/api/info/subscription/like/${subscriptionId}`);
};

/** 관심 청약 삭제 */
export const DELETE_like_subscription = async (subscriptionId: string) => {
  return await api.delete(`/api/info/subscription/like/${subscriptionId}`);
};

/** 관심 청약 조회 */
export const GET_like_subscription_all = async (): Promise<ApiResponse<LikeSubscriptionListDto[]>> => {
  return await api.get(`/api/info/subscription/like`);
};

/** 년,월, 지역으로 실거래가 검색 */
export const GET_price_summary = async ({
  region,
  city,
  umdNm,
}: {
  region: string;
  city: string;
  umdNm: string;
}): Promise<ApiResponse<PriceSummaryDto[]>> => {
  return await api.get(`/api/info/subscription/PriceSummary`, { params: { region, city, umdNm } });
};
