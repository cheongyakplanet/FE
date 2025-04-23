import { FacilitiesDto, PopularPostDto } from './types';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api-types';

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

/** 지역명으로 청약 검색 */
export const GET_subscription_by_region = async (city: string, district: string) => {
  return await api.get('/api/info/subscription/list', { params: { region: city, city: district } });
};

/** 청약 물건의 주변 인프라 */
export const GET_infra_by_subscription = async (id: string) => {
  return await api.get(`/api/info/subscription/${id}/detail/infra`, { params: { id: id } });
};

/** 청약 물건의 주변 공공시설 */
export const GET_facilities_by_subscription = async (id: string): Promise<ApiResponse<FacilitiesDto[]>> => {
  return await api.get(`/api/info/subscription/${id}/detail/facilities`);
};
