import { GET_popular_subscription } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetPopularSubscription = () => {
  return useQuery({
    queryKey: [GET_popular_subscription.name],
    queryFn: GET_popular_subscription,
    select: ({ data }) => data, // { status, data: number } 중 숫자만 꺼내 반환
  });
};
