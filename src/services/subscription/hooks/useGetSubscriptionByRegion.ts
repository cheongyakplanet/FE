import { GET_subscription_by_region } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetSubscriptionByRegion = (region: string, city: string) => {
  return useQuery({
    queryKey: [GET_subscription_by_region.name, region, city],
    queryFn: () => GET_subscription_by_region({ region, city }),
    select: ({ data }) => data,
    enabled: !!(region && city), // region과 city가 모두 있을 때만 실행
  });
};
