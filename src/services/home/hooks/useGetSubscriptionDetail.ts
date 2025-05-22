import { GET_subscription_detail } from '../api';
import { SubscriptionDetailDto } from '../types';

import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api-types';

export const useGetSubscriptionDetail = (id?: number) =>
  useQuery({
    // ——— queryKey를 options 객체 내부로 이동 ————————————————————————
    queryKey: [GET_subscription_detail.name, id],
    // ——— queryFn, enabled, select 등 ——————————————————————————————
    enabled: !!id,
    queryFn: () => GET_subscription_detail(id!),
    select: (res: ApiResponse<SubscriptionDetailDto>) => res.data, // SubscriptionDetailDto만 반환
  });
