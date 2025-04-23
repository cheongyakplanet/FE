import { GET_subscription_by_region } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetSubscriptionByRegion = (city: string, district: string) => {
  return useQuery({
    queryKey: [GET_subscription_by_region.name, city, district],
    queryFn: () => GET_subscription_by_region(city, district),
    select: ({ data }) => data,
  });
};
