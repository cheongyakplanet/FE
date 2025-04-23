import { GET_subscription_by_my_region } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetSubscriptionByMyRegion = () => {
  return useQuery({
    queryKey: [GET_subscription_by_my_region.name],
    queryFn: GET_subscription_by_my_region,
    select: ({ data }) => data,
  });
};
